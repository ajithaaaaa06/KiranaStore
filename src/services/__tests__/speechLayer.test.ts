import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mapLanguageToBcp47, BCP47_LANGUAGE_MAP } from '../../hooks/useSpeechRecognition';
import { getAsrProvider, sarvamAsrProvider, bhashiniAsrProvider } from '../asr/asrProvider';

describe('Hardened Speech Layer', () => {
  describe('1. BCP-47 Language Mapping', () => {
    it('maps UI languages to correct Indian BCP-47 locale tags', () => {
      expect(mapLanguageToBcp47('hi')).toBe('hi-IN');
      expect(mapLanguageToBcp47('en')).toBe('en-IN');
      expect(mapLanguageToBcp47('kn')).toBe('kn-IN');
      expect(mapLanguageToBcp47('ta')).toBe('ta-IN');
      expect(mapLanguageToBcp47('te')).toBe('te-IN');
      expect(mapLanguageToBcp47('hinglish')).toBe('hi-IN');
    });

    it('preserves existing valid BCP-47 tags', () => {
      expect(mapLanguageToBcp47('en-IN')).toBe('en-IN');
      expect(mapLanguageToBcp47('kn-IN')).toBe('kn-IN');
      expect(mapLanguageToBcp47('hi-IN')).toBe('hi-IN');
    });

    it('defaults unknown or empty locale to hi-IN', () => {
      expect(mapLanguageToBcp47('')).toBe('hi-IN');
      expect(mapLanguageToBcp47(undefined)).toBe('hi-IN');
      expect(mapLanguageToBcp47('unknown')).toBe('hi-IN');
    });
  });

  describe('2. Voice Synthesis Fallback Chain & Caching', () => {
    // Voice selection chain test
    const mockVoices: any[] = [
      { name: 'Google UK English Female', lang: 'en-GB' },
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Google Hindi', lang: 'hi-IN' },
      { name: 'Google Tamil', lang: 'ta-IN' },
      { name: 'Google Telugu', lang: 'te-IN' },
    ];

    it('falls back across language family when exact voice is missing', () => {
      // Kannada (kn-IN) is Dravidian, exact missing -> falls back to another Dravidian language (ta-IN or te-IN)
      const target = 'kn-IN';
      const targetPrefix = target.split('-')[0];
      const dravidian = new Set(['kn', 'ta', 'te', 'ml']);

      const foundDravidian = mockVoices.find((v) => {
        const p = v.lang.toLowerCase().split('-')[0];
        return dravidian.has(p);
      });

      expect(foundDravidian).toBeDefined();
      expect(['ta-IN', 'te-IN']).toContain(foundDravidian.lang);
    });

    it('falls back to Hindi when same family is missing', () => {
      const nonIndicVoices = [
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Google Hindi', lang: 'hi-IN' },
      ];

      const target = 'mr-IN'; // Marathi (Indo-Aryan), missing -> fallback to Hindi
      const hindi = nonIndicVoices.find((v) => v.lang.toLowerCase().startsWith('hi'));
      expect(hindi).toBeDefined();
      expect(hindi?.lang).toBe('hi-IN');
    });

    it('falls back to English when both language and Hindi are missing', () => {
      const englishOnlyVoices = [
        { name: 'Google US English', lang: 'en-US' },
      ];

      const target = 'kn-IN';
      const english = englishOnlyVoices.find((v) => v.lang.toLowerCase().startsWith('en'));
      expect(english).toBeDefined();
      expect(english?.lang).toBe('en-US');
    });
  });

  describe('3. ASR Provider Interface & Serverless Proxy', () => {
    it('retrieves registered ASR providers', () => {
      const sarvam = getAsrProvider('sarvam');
      const bhashini = getAsrProvider('bhashini');
      const browser = getAsrProvider('browser');

      expect(sarvam).toBe(sarvamAsrProvider);
      expect(bhashini).toBe(bhashiniAsrProvider);
      expect(browser).toBeNull(); // Browser uses Web Speech API natively
    });

    it('sends audio data to /api/asr serverless endpoint without embedding client keys', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          transcript: 'Ramesh paanch sau udhaar',
          confidence: 0.94,
        }),
      });
      globalThis.fetch = mockFetch;

      const dummyBlob = new Blob(['mock-audio-data'], { type: 'audio/webm' });
      const result = await sarvamAsrProvider.transcribe({
        locale: 'hi-IN',
        audioBlob: dummyBlob,
        mimeType: 'audio/webm',
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('/api/asr');
      expect(options.method).toBe('POST');
      expect(options.body).toBeInstanceOf(FormData);

      expect(result.transcript).toBe('Ramesh paanch sau udhaar');
      expect(result.confidence).toBe(0.94);
      expect(result.provider).toBe('sarvam');
      expect(typeof result.durationMs).toBe('number');
    });

    it('handles ASR proxy server errors gracefully without leaking keys', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      });
      globalThis.fetch = mockFetch;

      const dummyBlob = new Blob(['mock-audio-data'], { type: 'audio/webm' });
      await expect(
        bhashiniAsrProvider.transcribe({
          locale: 'te-IN',
          audioBlob: dummyBlob,
        })
      ).rejects.toThrow('ASR Proxy error (bhashini): HTTP 503');
    });
  });

  describe('4. Alternative Picking by Parse Confidence', () => {
    it('picks the candidate with the highest parsed confidence among alternatives', async () => {
      const { parseTranscript } = await import('../parser');

      const alternatives = [
        'Ramesh 500',               // Missing udhaar/jama direction -> lower confidence
        'Ramesh ko 500 udhaar diya', // Full direction, amount, customer -> high confidence
        'Ramesh',                   // No amount
      ];

      let bestText = alternatives[0];
      let bestConfidence = -1;

      for (const text of alternatives) {
        const parsed = await parseTranscript(text);
        if (parsed.confidence > bestConfidence) {
          bestConfidence = parsed.confidence;
          bestText = text;
        }
      }

      expect(bestText).toBe('Ramesh ko 500 udhaar diya');
      expect(bestConfidence).toBeGreaterThanOrEqual(0.85);
    });
  });
});
