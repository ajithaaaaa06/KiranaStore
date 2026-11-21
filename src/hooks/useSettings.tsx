/**
 * Typed useSettings Hook & SettingsProvider
 * 
 * Manages persistent user preferences in localStorage:
 * - shopName: Kirana shop name
 * - uiLanguage: Screen & buttons language (English, Hindi, Kannada, Tamil, Telugu, Hinglish)
 * - speechLanguage: Voice recognition & speech synthesis language
 * - speechSpeed: Soundbox speaking rate (0.7x - 1.3x)
 * - muteReplies: Whether soundbox speaks totals aloud or plays chimes only
 * - theme: 'light' | 'high-contrast'
 * - asrEngine: 'browser' | 'bhashini' | 'sarvam' (UI stubbed for Indic hackathon)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { LanguageCode } from '../services/types';

export type ThemeMode = 'light' | 'high-contrast';
export type ASREngine = 'browser' | 'bhashini' | 'sarvam';

export interface AppSettings {
  shopName: string;
  uiLanguage: LanguageCode;
  speechLanguage: LanguageCode;
  speechSpeed: number;
  muteReplies: boolean;
  theme: ThemeMode;
  asrEngine: ASREngine;
  requireCustomerPhone: boolean;
  autoOpenPaymentRequest: boolean;
}

export const SETTINGS_STORAGE_KEY = 'voice_khata_settings';
export const LEGACY_SHOP_NAME_KEY = 'vk_shop_name';
export const LEGACY_LANG_KEY = 'voice_khata_lang';
export const LEGACY_SPEED_KEY = 'voice_khata_speech_speed';
export const LEGACY_MUTED_KEY = 'voice_khata_speech_muted';
export const LEGACY_THEME_KEY = 'voice_khata_theme';

const DEFAULT_SETTINGS: AppSettings = {
  shopName: 'Apna Kirana Khata',
  uiLanguage: 'hinglish',
  speechLanguage: 'hi',
  speechSpeed: 1.0,
  muteReplies: false,
  theme: 'light',
  asrEngine: 'browser',
  requireCustomerPhone: true,
  autoOpenPaymentRequest: true,
};

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
  toggleTheme: () => void;
  toggleMute: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettingsState] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback to legacy keys if present
    }

    // Check legacy individual keys for backwards compatibility
    const legacyShop = localStorage.getItem(LEGACY_SHOP_NAME_KEY);
    const legacyLang = localStorage.getItem(LEGACY_LANG_KEY) as LanguageCode | null;
    const legacySpeed = localStorage.getItem(LEGACY_SPEED_KEY);
    const legacyMuted = localStorage.getItem(LEGACY_MUTED_KEY);
    const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY) as ThemeMode | null;

    return {
      shopName: legacyShop || DEFAULT_SETTINGS.shopName,
      uiLanguage: legacyLang || DEFAULT_SETTINGS.uiLanguage,
      speechLanguage: legacyLang || DEFAULT_SETTINGS.speechLanguage,
      speechSpeed: legacySpeed ? parseFloat(legacySpeed) : DEFAULT_SETTINGS.speechSpeed,
      muteReplies: legacyMuted === 'true',
      theme: legacyTheme || DEFAULT_SETTINGS.theme,
      asrEngine: DEFAULT_SETTINGS.asrEngine,
      requireCustomerPhone: DEFAULT_SETTINGS.requireCustomerPhone,
      autoOpenPaymentRequest: DEFAULT_SETTINGS.autoOpenPaymentRequest,
    };
  });

  // Apply theme class to document root immediately
  useEffect(() => {
    if (settings.theme === 'high-contrast') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('high-contrast');
    }
  }, [settings.theme]);

  // Persist settings whenever changed
  const persistSettings = useCallback((newSettings: AppSettings) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
      // Sync legacy keys so independent hooks/modules stay coherent
      localStorage.setItem(LEGACY_SHOP_NAME_KEY, newSettings.shopName);
      localStorage.setItem(LEGACY_LANG_KEY, newSettings.uiLanguage);
      localStorage.setItem(LEGACY_SPEED_KEY, newSettings.speechSpeed.toString());
      localStorage.setItem(LEGACY_MUTED_KEY, newSettings.muteReplies.toString());
      localStorage.setItem(LEGACY_THEME_KEY, newSettings.theme);
    } catch (e) {
      console.warn('Could not persist settings to localStorage:', e);
    }
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      setSettingsState((prev) => {
        const next = { ...prev, [key]: value };
        persistSettings(next);
        return next;
      });
    },
    [persistSettings]
  );

  const updateSettings = useCallback(
    (partial: Partial<AppSettings>) => {
      setSettingsState((prev) => {
        const next = { ...prev, ...partial };
        persistSettings(next);
        return next;
      });
    },
    [persistSettings]
  );

  const resetSettings = useCallback(() => {
    setSettingsState(DEFAULT_SETTINGS);
    persistSettings(DEFAULT_SETTINGS);
  }, [persistSettings]);

  const toggleTheme = useCallback(() => {
    setSettingsState((prev) => {
      const nextTheme: ThemeMode = prev.theme === 'light' ? 'high-contrast' : 'light';
      const next = { ...prev, theme: nextTheme };
      persistSettings(next);
      return next;
    });
  }, [persistSettings]);

  const toggleMute = useCallback(() => {
    setSettingsState((prev) => {
      const next = { ...prev, muteReplies: !prev.muteReplies };
      persistSettings(next);
      return next;
    });
  }, [persistSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
        toggleTheme,
        toggleMute,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
