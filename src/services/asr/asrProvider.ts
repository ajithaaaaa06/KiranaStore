/**
 * ASR Provider Interface & Implementations
 * 
 * Supports:
 * - 'browser': Web Speech API (Default on-device)
 * - 'sarvam': Sarvam AI (Saaras Indic Speech API) via serverless proxy /api/asr
 * - 'bhashini': Bhashini AI (Digital India Speech API) via serverless proxy /api/asr
 * 
 * Security Rule: API keys are NEVER kept on client code; all external requests
 * route through the /api/asr serverless proxy with server-side environment variables.
 */

export interface AsrOptions {
  locale: string;
  audioBlob: Blob;
  mimeType?: string;
}

export interface AsrResult {
  transcript: string;
  confidence: number;
  provider: 'browser' | 'sarvam' | 'bhashini';
  durationMs: number;
}

export interface IAsrProvider {
  id: 'browser' | 'sarvam' | 'bhashini';
  name: string;
  transcribe(options: AsrOptions): Promise<AsrResult>;
}

export class ServerlessAsrProvider implements IAsrProvider {
  public id: 'sarvam' | 'bhashini';
  public name: string;

  constructor(id: 'sarvam' | 'bhashini', name: string) {
    this.id = id;
    this.name = name;
  }

  public async transcribe({ locale, audioBlob, mimeType }: AsrOptions): Promise<AsrResult> {
    const startTime = performance.now();

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, `recording.${mimeType?.includes('webm') ? 'webm' : 'ogg'}`);
      formData.append('provider', this.id);
      formData.append('locale', locale);

      const response = await fetch('/api/asr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ASR Proxy error (${this.id}): HTTP ${response.status}`);
      }

      const data = await response.json();
      const durationMs = Math.round(performance.now() - startTime);

      return {
        transcript: data.transcript || '',
        confidence: typeof data.confidence === 'number' ? data.confidence : 0.9,
        provider: this.id,
        durationMs,
      };
    } catch (err) {
      const durationMs = Math.round(performance.now() - startTime);
      console.warn(`[ASR Provider] ${this.name} request failed or proxy offline:`, err);
      throw err;
    }
  }
}

export const sarvamAsrProvider = new ServerlessAsrProvider('sarvam', 'Sarvam AI (Saaras Indic)');
export const bhashiniAsrProvider = new ServerlessAsrProvider('bhashini', 'Bhashini AI (Digital India)');

export function getAsrProvider(id: 'browser' | 'sarvam' | 'bhashini'): IAsrProvider | null {
  if (id === 'sarvam') return sarvamAsrProvider;
  if (id === 'bhashini') return bhashiniAsrProvider;
  return null;
}
