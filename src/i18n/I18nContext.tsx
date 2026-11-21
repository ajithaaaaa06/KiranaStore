/**
 * Internationalization (i18n) Context Provider
 * Stores active UI language, speech recognition locale, and provides translations.
 * Fast, lightweight zero-dependency i18n backed by typed JSON dictionaries.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { LanguageCode, LanguageOption } from '../services/types';
import { SUPPORTED_LANGUAGES, translations, dictionaries, TranslationKey } from './translations';

export type TFunction = {
  (key: TranslationKey | string, params?: Record<string, string | number>): string;
} & typeof translations;

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangConfig: LanguageOption;
  t: TFunction;
  translate: (key: TranslationKey | string, params?: Record<string, string | number>) => string;
  supportedLanguages: LanguageOption[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const LANGUAGE_STORAGE_KEY = 'voice_khata_lang';

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
    return 'hinglish'; // Default familiar Hinglish for Indian kirana shopkeepers
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const currentLangConfig = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = currentLangConfig.speechLocale;
  }, [currentLangConfig]);

  // Build reactive translation lookup function combined with legacy translations object
  const translate = useMemo(() => {
    const dict = dictionaries[language] || dictionaries.hinglish || dictionaries.en;
    const fallbackDict = dictionaries.en;

    return (key: TranslationKey | string, params?: Record<string, string | number>): string => {
      let str = dict[key] || fallbackDict[key] || key;
      if (params) {
        Object.entries(params).forEach(([pKey, pVal]) => {
          str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
        });
      }
      return str;
    };
  }, [language]);

  const t = useMemo(() => {
    const fn = ((key: TranslationKey | string, params?: Record<string, string | number>) => {
      return translate(key, params);
    }) as TFunction;

    // Attach all legacy properties and functions onto t
    Object.assign(fn, translations);
    return fn;
  }, [translate]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        currentLangConfig,
        t,
        translate,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
