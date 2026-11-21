/**
 * Hook for Soundbox chimes and Spoken voice feedback
 */

import { useCallback, useState } from 'react';
import { soundbox } from '../lib/soundbox';
import { useI18n } from '../i18n/I18nContext';

export function useSoundbox() {
  const { language, currentLangConfig, t } = useI18n();
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('vk_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('vk_sound_enabled', String(next));
      return next;
    });
  }, []);

  const announceCreditSaved = useCallback(
    (customerName: string, amount: number) => {
      if (!soundEnabled) return;
      soundbox.playCreditChime();
      setTimeout(() => {
        const text = t.spokenCreditSaved(customerName, amount.toString(), language);
        soundbox.speak(text, currentLangConfig.speechLocale);
      }, 350);
    },
    [soundEnabled, language, currentLangConfig, t]
  );

  const announcePaymentSaved = useCallback(
    (customerName: string, amount: number) => {
      if (!soundEnabled) return;
      soundbox.playPaymentChime();
      setTimeout(() => {
        const text = t.spokenPaymentSaved(customerName, amount.toString(), language);
        soundbox.speak(text, currentLangConfig.speechLocale);
      }, 350);
    },
    [soundEnabled, language, currentLangConfig, t]
  );

  const announceBalanceQuery = useCallback(
    (customerName: string, balance: number) => {
      if (!soundEnabled) return;
      soundbox.playPaymentChime();
      setTimeout(() => {
        const text = t.spokenBalanceOwed(customerName, balance.toString(), language);
        soundbox.speak(text, currentLangConfig.speechLocale);
      }, 300);
    },
    [soundEnabled, language, currentLangConfig, t]
  );

  return {
    soundEnabled,
    toggleSound,
    announceCreditSaved,
    announcePaymentSaved,
    announceBalanceQuery,
    playWarningTone: soundbox.playWarningTone.bind(soundbox),
    playPaymentChime: soundbox.playPaymentChime.bind(soundbox),
    playCreditChime: soundbox.playCreditChime.bind(soundbox),
  };
}
