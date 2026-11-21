/**
 * Comprehensive Multi-Language Localization System for Udhaar Sathi
 * Supported languages: Hindi, Hinglish, English, Kannada, Tamil, Telugu
 * Built with lightweight zero-dependency JSON dictionaries.
 */

import { LanguageCode, LanguageOption, LedgerEntry } from '../services/types';
import { buildReminderMessage } from '../services/reminderMessage';
import en from './locales/en.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import hinglish from './locales/hinglish.json';

export type TranslationKey = keyof typeof en;

export const dictionaries: Record<LanguageCode, Record<string, string>> = {
  en,
  hi,
  kn,
  ta,
  te,
  hinglish,
};

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hinglish', label: 'Hinglish', nativeLabel: 'Hinglish', speechLocale: 'hi-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'en', label: 'English', nativeLabel: 'English', speechLocale: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', speechLocale: 'te-IN' },
];

/**
 * Translation helper object for backwards compatibility
 * with direct key-lookup properties.
 */
export const translations: Record<string, any> = new Proxy(
  {
    spokenCreditSaved: (name: string, amount: string, lang: LanguageCode) => {
      switch (lang) {
        case 'hi':
        case 'hinglish':
          return `${name} ko ${amount} rupaye udhaar likha gaya`;
        case 'kn':
          return `${name} avarige ${amount} roopayi saala bariyalaagide`;
        case 'ta':
          return `${name} ukku ${amount} roobai kadan ezhudhappattadhu`;
        case 'te':
          return `${name} ku ${amount} roopayalu appu raayabadindi`;
        case 'en':
        default:
          return `Recorded ${amount} rupees credit for ${name}`;
      }
    },
    spokenPaymentSaved: (name: string, amount: string, lang: LanguageCode) => {
      switch (lang) {
        case 'hi':
        case 'hinglish':
          return `${name} se ${amount} rupaye jama prapt hue`;
        case 'kn':
          return `${name} avarinda ${amount} roopayi hana bandide`;
        case 'ta':
          return `${name} idamirundhu ${amount} roobai panam vandhadhu`;
        case 'te':
          return `${name} nundi ${amount} roopayalu jama ayyindi`;
        case 'en':
        default:
          return `Received ${amount} rupees payment from ${name}`;
      }
    },
    spokenBalanceOwed: (name: string, amount: string, lang: LanguageCode) => {
      switch (lang) {
        case 'hi':
        case 'hinglish':
          return `${name} ka kul baaki ${amount} rupaye hai`;
        case 'kn':
          return `${name} avara ottu baaki ${amount} roopayi ide`;
        case 'ta':
          return `${name} in mottha baakki ${amount} roobai`;
        case 'te':
          return `${name} yokka mottham baakee ${amount} roopayalu`;
        case 'en':
        default:
          return `${name} has a pending balance of ${amount} rupees`;
      }
    },
    // WhatsApp reminder templates
    reminderMessage: (
      name: string,
      amount: string,
      shopName: string = 'Kirana Store',
      lang: LanguageCode,
      entries?: LedgerEntry[]
    ) => {
      return buildReminderMessage({
        customerName: name,
        amount,
        shopName,
        lang,
        entries,
      });
    },
  } as any,
  {
    get: (target: any, prop: string) => {
      if (prop in target) return target[prop];
      return {
        en: dictionaries.en[prop] || '',
        hi: dictionaries.hi[prop] || '',
        kn: dictionaries.kn[prop] || '',
        ta: dictionaries.ta[prop] || '',
        te: dictionaries.te[prop] || '',
        hinglish: dictionaries.hinglish[prop] || '',
      };
    },
  }
);
