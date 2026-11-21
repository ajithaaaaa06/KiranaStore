/**
 * Comprehensive Multi-Language Localization System for Voice Khata
 * Supported languages: Hindi, Hinglish, English, Kannada, Tamil, Telugu
 * Built with lightweight zero-dependency JSON dictionaries.
 */

import { LanguageCode, LanguageOption, LedgerEntry } from '../services/types';
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
      let entriesBlock = '';
      if (entries && entries.length > 0) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        entriesBlock = sorted
          .map((e) => {
            const d = new Date(e.date);
            const day = d.getDate();
            const month = monthNames[d.getMonth()] || 'Nov';
            const typeStr = e.type === 'credit' ? 'udhaar' : 'paid';
            return `${day} ${month}: ₹${e.amount.toLocaleString('en-IN')} ${typeStr}`;
          })
          .join('\n');
      }

      if (entriesBlock) {
        switch (lang) {
          case 'hi':
            return `नमस्ते ${name} जी,\n${shopName} से आपका हिसाब:\n${entriesBlock}\n--------------------\nकुल बाकी हिसाब: ₹${amount}\nकृपया सुविधानुसार भुगतान कर दें।\nधन्यवाद! 🙏`;
          case 'kn':
            return `ನಮಸ್ಕಾರ ${name} ಅವರೇ,\n${shopName} ನಿಂದ ನಿಮ್ಮ ಲೆಕ್ಕ:\n${entriesBlock}\n--------------------\nಒಟ್ಟು ಬಾಕಿ: ₹${amount}\nದಯವಿಟ್ಟು ಅನುಕೂಲವಾದಾಗ ಪಾವತಿಸಿ.\nಧನ್ಯವಾದಗಳು! 🙏`;
          case 'ta':
            return `வணக்கம் ${name},\n${shopName} கடையில் உங்கள் கணக்கு:\n${entriesBlock}\n--------------------\nமொத்த பாக்கி: ₹${amount}\nதயவுசெய்து விரைவில் செலுத்தவும்.\nநன்றி! 🙏`;
          case 'te':
            return `నమస్కారం ${name} గారు,\n${shopName} లో మీ లెక్క:\n${entriesBlock}\n--------------------\nమొత్తం బాకీ: ₹${amount}\nదయచేసి వీలైనంత త్వరగా చెల్లించండి.\nధನ್ಯవాదాలు! 🙏`;
          case 'en':
            return `Hello ${name},\nAccount statement from ${shopName}:\n${entriesBlock}\n--------------------\nTotal pending balance: ₹${amount}\nPlease settle at your convenience.\nThank you! 🙏`;
          case 'hinglish':
          default:
            return `Namaste ${name} ji,\n${shopName} se aapka hisaab:\n${entriesBlock}\n--------------------\nKul baaki hisaab: ₹${amount}\nKripya suvidhanusar bhej dein.\nDhanyawad! 🙏`;
        }
      }

      switch (lang) {
        case 'hi':
          return `नमस्ते ${name} जी, आपके किराना खाते का बाकी ₹${amount} है। कृपया सुविधानुसार चुका दें। धन्यवाद - ${shopName}`;
        case 'kn':
          return `ನಮಸ್ಕಾರ ${name} ಅವರೇ, ನಿಮ್ಮ ಕಿರಾಣಿ ಖಾತೆಯ ಬಾಕಿ ಮೊತ್ತ ₹${amount}. ದಯವಿಟ್ಟು ಪಾವತಿಸಿ. ಧನ್ಯವಾದಗಳು - ${shopName}`;
        case 'ta':
          return `வணக்கம் ${name}, உங்கள் மளிகைக் கடை பாக்கித் தொகை ₹${amount}. தயவுசெய்து செலுத்தவும். நன்றி - ${shopName}`;
        case 'te':
          return `నమస్కారం ${name} గారు, మీ కిరాణా ఖాతా బకాయి ₹${amount}. దయచేసి చెల్లించండి. ಧನ್ಯವಾದಗಳು - ${shopName}`;
        case 'en':
          return `Hello ${name}, this is a gentle reminder that your pending balance at ${shopName} is ₹${amount}. Thank you!`;
        case 'hinglish':
        default:
          return `Namaste ${name} ji, aapke kirana khata ka baaki balance ₹${amount} hai. Kripya samay par chuka dein. Dhanyawad - ${shopName}`;
      }
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
