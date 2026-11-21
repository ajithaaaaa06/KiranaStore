/**
 * useSpeak Hook - Hardened Speech Synthesis
 * 
 * Satisfies all PRD & Engineering Requirements:
 * 1. Voice Selection Fallback Chain:
 *    - Exact Language (e.g. kn-IN)
 *    - Same Language Prefix (e.g. kn)
 *    - Same Language Family:
 *      * Dravidian: Kannada (kn), Tamil (ta), Telugu (te), Malayalam (ml)
 *      * Indo-Aryan: Hindi (hi), Marathi (mr), Gujarati (gu), Bengali (bn), Punjabi (pa)
 *    - Hindi (hi-IN)
 *    - English (en-IN / en-*)
 * 2. Voice Cache:
 *    - Caches resolved voices in a typed Map to avoid repeated DOM lookups
 * 3. Voice Unavailable Fallback:
 *    - If no voice exists on the device/browser, displays the text prominently with a
 *      visible VolumeX "Voice not available" badge instead of failing silently
 * 4. Soundbox Mode:
 *    - Dual-tone payment/credit chime before speech
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { soundbox } from '../lib/soundbox';
import { useI18n } from '../i18n/I18nContext';
import { LanguageCode } from '../services/types';

export interface UseSpeakOptions {
  speed?: number;         // 0.7 to 1.3
  pitch?: number;         // 0.8 to 1.2
  soundboxMode?: boolean;   // plays chime before speech
  chimeType?: 'payment' | 'credit' | 'neutral';
  locale?: string;
}

export interface VoiceUnavailableNotice {
  text: string;
  show: boolean;
}

const STORAGE_KEY_SPEED = 'vk_speech_rate';
const STORAGE_KEY_MUTED = 'vk_sound_muted';

// Global cache for resolved speech synthesis voices across renders
const voiceCache = new Map<string, SpeechSynthesisVoice | null>();

// Language Family Definitions
const DRAVIDIAN_FAMILY = new Set(['kn', 'ta', 'te', 'ml']);
const INDO_ARYAN_FAMILY = new Set(['hi', 'mr', 'gu', 'bn', 'pa', 'ur', 'or', 'as']);

export function useSpeak() {
  const { language, currentLangConfig } = useI18n();

  // Speech Rate State (0.7x - 1.3x)
  const [speed, setSpeedState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SPEED);
    const parsed = saved ? parseFloat(saved) : 1.05;
    return isNaN(parsed) ? 1.05 : Math.max(0.7, Math.min(1.3, parsed));
  });

  // Mute State
  const [isMuted, setIsMutedState] = useState<boolean>(() => {
    const savedMuted = localStorage.getItem(STORAGE_KEY_MUTED);
    const savedEnabled = localStorage.getItem('vk_sound_enabled');
    if (savedMuted !== null) return savedMuted === 'true';
    if (savedEnabled !== null) return savedEnabled !== 'true';
    return false;
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceNotice, setVoiceNotice] = useState<VoiceUnavailableNotice>({ text: '', show: false });
  const lastSpokenRef = useRef<{ text: string; options?: UseSpeakOptions } | null>(null);
  const noticeTimerRef = useRef<any>(null);

  // Load and cache available speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        voiceCache.clear(); // Invalidate cache when system voices change
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Update speed setting
  const setSpeed = useCallback((newSpeed: number) => {
    const clamped = Math.max(0.7, Math.min(1.3, Math.round(newSpeed * 100) / 100));
    setSpeedState(clamped);
    localStorage.setItem(STORAGE_KEY_SPEED, clamped.toString());
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_MUTED, String(next));
      localStorage.setItem('vk_sound_enabled', String(!next));
      if (next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  // Stop current speaking
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  /**
   * Selects voice using rigorous fallback chain and caches the result:
   * 1. Exact match (e.g. kn-IN)
   * 2. Language prefix match (e.g. kn)
   * 3. Same language family (Dravidian or Indo-Aryan)
   * 4. Hindi (hi-IN)
   * 5. English (en-IN or en-*)
   */
  const getBestVoice = useCallback(
    (targetLocale: string): SpeechSynthesisVoice | null => {
      if (availableVoices.length === 0) return null;

      const cacheKey = targetLocale.toLowerCase();
      if (voiceCache.has(cacheKey)) {
        return voiceCache.get(cacheKey) || null;
      }

      const targetLower = targetLocale.toLowerCase();
      const prefix = targetLower.split('-')[0];

      // 1. Exact match (e.g. "kn-IN", "hi-IN", "ta-IN")
      const exact = availableVoices.find((v) => v.lang.toLowerCase() === targetLower);
      if (exact) {
        voiceCache.set(cacheKey, exact);
        return exact;
      }

      // 2. Language prefix match (e.g. "kn", "hi", "ta")
      const prefixMatch = availableVoices.find((v) =>
        v.lang.toLowerCase().startsWith(prefix)
      );
      if (prefixMatch) {
        voiceCache.set(cacheKey, prefixMatch);
        return prefixMatch;
      }

      // 3. Same Language Family Match
      let familyMatch: SpeechSynthesisVoice | undefined;
      if (DRAVIDIAN_FAMILY.has(prefix)) {
        familyMatch = availableVoices.find((v) => {
          const vPrefix = v.lang.toLowerCase().split('-')[0];
          return DRAVIDIAN_FAMILY.has(vPrefix);
        });
      } else if (INDO_ARYAN_FAMILY.has(prefix)) {
        familyMatch = availableVoices.find((v) => {
          const vPrefix = v.lang.toLowerCase().split('-')[0];
          return INDO_ARYAN_FAMILY.has(vPrefix);
        });
      }

      if (familyMatch) {
        voiceCache.set(cacheKey, familyMatch);
        return familyMatch;
      }

      // 4. Hindi fallback
      const hindiFallback = availableVoices.find((v) =>
        v.lang.toLowerCase().startsWith('hi')
      );
      if (hindiFallback) {
        voiceCache.set(cacheKey, hindiFallback);
        return hindiFallback;
      }

      // 5. English fallback (en-IN first, then any en)
      const indianEnglish = availableVoices.find((v) =>
        v.lang.toLowerCase() === 'en-in'
      );
      if (indianEnglish) {
        voiceCache.set(cacheKey, indianEnglish);
        return indianEnglish;
      }

      const anyEnglish = availableVoices.find((v) =>
        v.lang.toLowerCase().startsWith('en')
      );
      if (anyEnglish) {
        voiceCache.set(cacheKey, anyEnglish);
        return anyEnglish;
      }

      // 6. Any voice if available
      const fallbackVoice = availableVoices[0] || null;
      voiceCache.set(cacheKey, fallbackVoice);
      return fallbackVoice;
    },
    [availableVoices]
  );

  /**
   * Displays visual voice unavailable banner when text-to-speech voice is missing
   */
  const showVoiceUnavailableNotice = useCallback((spokenText: string) => {
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    setVoiceNotice({ text: spokenText, show: true });
    noticeTimerRef.current = setTimeout(() => {
      setVoiceNotice({ text: '', show: false });
    }, 4500);
  }, []);

  /**
   * Main Speak Method
   */
  const speak = useCallback(
    (text: string, options: UseSpeakOptions = {}) => {
      if (isMuted || !text.trim()) return;

      lastSpokenRef.current = { text, options };

      const {
        speed: customSpeed = speed,
        pitch = 1.0,
        soundboxMode = false,
        chimeType = 'neutral',
        locale = currentLangConfig.speechLocale || 'hi-IN',
      } = options;

      const triggerUtterance = () => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
          showVoiceUnavailableNotice(text);
          return;
        }

        try {
          window.speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = locale;
          utterance.rate = customSpeed;
          utterance.pitch = pitch;

          const voice = getBestVoice(locale);
          if (voice) {
            utterance.voice = voice;
          } else {
            // Voice not found: notify user visibly
            showVoiceUnavailableNotice(text);
          }

          utterance.onstart = () => setIsSpeaking(true);
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => {
            setIsSpeaking(false);
            showVoiceUnavailableNotice(text);
          };

          window.speechSynthesis.speak(utterance);
        } catch {
          setIsSpeaking(false);
          showVoiceUnavailableNotice(text);
        }
      };

      if (soundboxMode) {
        if (chimeType === 'payment') {
          soundbox.playPaymentChime();
        } else if (chimeType === 'credit') {
          soundbox.playCreditChime();
        } else {
          soundbox.playPaymentChime();
        }
        setTimeout(triggerUtterance, 300);
      } else {
        triggerUtterance();
      }
    },
    [isMuted, speed, currentLangConfig.speechLocale, getBestVoice, showVoiceUnavailableNotice]
  );

  const speakSoundbox = useCallback(
    (text: string, options: Omit<UseSpeakOptions, 'soundboxMode'> = {}) => {
      speak(text, { ...options, soundboxMode: true });
    },
    [speak]
  );

  const speakBalance = useCallback(
    async (customerName: string, balance: number, lang?: LanguageCode) => {
      const activeLang = lang || language;
      const { getSpeechTemplates } = await import('../i18n/speech');
      const templates = getSpeechTemplates(activeLang);
      const text = templates.balanceAnswer(customerName, balance);
      speak(text, { soundboxMode: true, chimeType: 'payment' });
    },
    [language, speak]
  );

  const speakConfirmation = useCallback(
    async (
      customerName: string,
      amount: number | string,
      type: 'credit' | 'payment',
      lang?: LanguageCode
    ) => {
      const activeLang = lang || language;
      const { getSpeechTemplates } = await import('../i18n/speech');
      const templates = getSpeechTemplates(activeLang);
      const text =
        type === 'credit'
          ? templates.creditSaved(customerName, amount)
          : templates.paymentSaved(customerName, amount);
      speak(text, { soundboxMode: true, chimeType: type });
    },
    [language, speak]
  );

  const replay = useCallback(() => {
    if (lastSpokenRef.current) {
      const { text, options } = lastSpokenRef.current;
      speak(text, options);
    }
  }, [speak]);

  return {
    speak,
    speakSoundbox,
    speakBalance,
    speakConfirmation,
    replay,
    stopSpeaking,
    isSpeaking,
    speed,
    setSpeed,
    isMuted,
    toggleMute,
    availableVoices,
    voiceNotice,
    clearVoiceNotice: () => setVoiceNotice({ text: '', show: false }),
  };
}

export default useSpeak;
