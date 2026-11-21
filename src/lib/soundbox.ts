/**
 * Soundbox Audio Chime & Speech Synthesizer
 * 100% offline via Web Audio API & Web Speech Synthesis.
 * Gives shopkeepers the high-trust instant audio confirmation of a physical soundbox!
 */

class SoundboxService {
  private audioCtx: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Soundbox Chime for Payment Received (Upbeat 3-tone ascending C5-E5-G5)
   */
  playPaymentChime() {
    try {
      const ctx = this.getAudioContext();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.01, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.26);
      });
    } catch {
      // AudioContext may be restricted before user gesture
    }
  }

  /**
   * Soundbox Tone for Udhaar / Credit Given (Distinct 2-tone alert F4-A4)
   */
  playCreditChime() {
    try {
      const ctx = this.getAudioContext();
      const notes = [349.23, 440.0]; // F4, A4
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);

        gain.gain.setValueAtTime(0.01, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.28, now + idx * 0.14 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.32);
      });
    } catch {
      // Ignored if sound is restricted
    }
  }

  /**
   * Warning / Error tone
   */
  playWarningTone() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore
    }
  }

  /**
   * Speaks confirmation message aloud using native Web Speech Synthesis
   */
  speak(text: string, speechLocale: string = 'hi-IN', rate: number = 1.05) {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLocale;
      utterance.rate = rate; // Slightly brisk for low-latency feedback
      utterance.pitch = 1.0;

      // Find an Indian accent voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang === speechLocale || v.lang.startsWith(speechLocale.slice(0, 2))
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error fallback
    }
  }
}

export const soundbox = new SoundboxService();
