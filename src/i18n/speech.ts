/**
 * Spoken Voice Templates for Voice Khata (5 Languages + Hinglish)
 * Native phrases used by speechSynthesis and Soundbox announcements.
 * Languages: Hindi (hi), Hinglish (hinglish), English (en), Kannada (kn), Tamil (ta), Telugu (te)
 */

import { LanguageCode } from '../services/types';

export interface SpeechTemplates {
  creditSaved: (customerName: string, amount: number | string) => string;
  paymentSaved: (customerName: string, amount: number | string) => string;
  balanceAnswer: (customerName: string, balance: number) => string;
  duplicateWarning: (customerName: string, amount: number | string, type: 'credit' | 'payment') => string;
  errorNotUnderstood: string;
  errorCustomerNotFound: (name: string) => string;
  errorMicPermission: string;
}

export const speechTemplates: Record<LanguageCode, SpeechTemplates> = {
  hi: {
    creditSaved: (name, amt) => `${name} को ${amt} रुपये उधार लिखा गया।`,
    paymentSaved: (name, amt) => `${name} से ${amt} रुपये जमा मिले।`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} का कुल बाकी ${balance} रुपये है।`;
      if (balance < 0) return `${name} का ${Math.abs(balance)} रुपये एडवांस जमा है।`;
      return `${name} का पूरा हिसाब चुकता है, कोई बाकी नहीं।`;
    },
    duplicateWarning: (name, amt, type) =>
      `ध्यान दें: ${name} के लिए ${amt} रुपये का ${type === 'credit' ? 'उधार' : 'जमा'} अभी-अभी दर्ज हुआ था।`,
    errorNotUnderstood: 'हिसाब समझ नहीं आया। कृपया दोबारा बोलें।',
    errorCustomerNotFound: (name) => `ग्राहक ${name} खाते में नहीं मिला।`,
    errorMicPermission: 'माइक की अनुमति नहीं मिली। कृपया सेटिंग में अनुमति दें।',
  },

  hinglish: {
    creditSaved: (name, amt) => `${name} ko ${amt} rupaye udhaar likha gaya.`,
    paymentSaved: (name, amt) => `${name} se ${amt} rupaye jama mila.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} ka baaki ${balance} rupaye hai.`;
      if (balance < 0) return `${name} ka ${Math.abs(balance)} rupaye advance jama hai.`;
      return `${name} ka saara hisaab clear hai, koi baaki nahi.`;
    },
    duplicateWarning: (name, amt, type) =>
      `Aisa entry abhi hi hua tha: ${name} ke liye ${amt} rupaye ka ${type === 'credit' ? 'udhaar' : 'jama'}.`,
    errorNotUnderstood: 'Hisaab samajh nahi aaya. Kripya dobara bolein.',
    errorCustomerNotFound: (name) => `Grahak ${name} khata mein nahi mila.`,
    errorMicPermission: 'Mic permission denied. Kripya browser mein allow karein.',
  },

  en: {
    creditSaved: (name, amt) => `Saved ${amt} rupees credit for ${name}.`,
    paymentSaved: (name, amt) => `Received ${amt} rupees payment from ${name}.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} owes ${balance} rupees pending balance.`;
      if (balance < 0) return `${name} has ${Math.abs(balance)} rupees advance deposit.`;
      return `${name} has zero pending balance, all clear.`;
    },
    duplicateWarning: (name, amt, type) =>
      `Warning: A ${amt} rupees ${type} entry for ${name} was recorded just now.`,
    errorNotUnderstood: 'Could not understand the entry. Please speak again.',
    errorCustomerNotFound: (name) => `Customer ${name} was not found.`,
    errorMicPermission: 'Microphone permission is required. Please allow access in browser.',
  },

  kn: {
    creditSaved: (name, amt) => `${name} ಅವರಿಗೆ ${amt} ರೂಪಾಯಿ ಸಾಲ ದಾಖಲಿಸಲಾಗಿದೆ.`,
    paymentSaved: (name, amt) => `${name} ಅವರಿಂದ ${amt} ರೂಪಾಯಿ ಜಮೆ ಪಡೆಯಲಾಗಿದೆ.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} ಅವರ ಒಟ್ಟು ಬಾಕಿ ${balance} ರೂಪಾಯಿ.`;
      if (balance < 0) return `${name} ಅವರ ಮುಂಗಡ ${Math.abs(balance)} ರೂಪಾಯಿ ಜಮೆ ಇದೆ.`;
      return `${name} ಅವರ ಖಾತೆ ಪೂರ್ಣ ಚುಕ್ತಾ ಆಗಿದೆ, ಯಾವುದೇ ಬಾಕಿ ಇಲ್ಲ.`;
    },
    duplicateWarning: (name, amt, type) =>
      `ಎಚ್ಚರಿಕೆ: ${name} ಅವರಿಗೆ ${amt} ರೂಪಾಯಿ ${type === 'credit' ? 'ಸಾಲ' : 'ಜಮೆ'} ಈಗಷ್ಟೇ ಆಗಿದೆ.`,
    errorNotUnderstood: 'ಹೇಳಿದ್ದು ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.',
    errorCustomerNotFound: (name) => `ಗ್ರಾಹಕ ${name} ಖಾತೆಯಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ.`,
    errorMicPermission: 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ.',
  },

  ta: {
    creditSaved: (name, amt) => `${name} அவர்களுக்கு ${amt} ரூபாய் கடன் பதிவு செய்யப்பட்டது.`,
    paymentSaved: (name, amt) => `${name} அவர்களிடமிருந்து ${amt} ரூபாய் வரவு பெறப்பட்டது.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} அவர்களின் மொத்த பாக்கி ${balance} ரூபாய்.`;
      if (balance < 0) return `${name} அவர்களின் முன்பணம் ${Math.abs(balance)} ரூபாய் உள்ளது.`;
      return `${name} அவர்களின் கணக்கு முடிந்தது, பாக்கி எதுவும் இல்லை.`;
    },
    duplicateWarning: (name, amt, type) =>
      `எச்சரிக்கை: ${name} அவர்களுக்கு ${amt} ரூபாய் பதிவு சற்று முன் செய்யப்பட்டது.`,
    errorNotUnderstood: 'விவரம் புரியவில்லை. தயவுசெய்து மீண்டும் சொல்லுங்கள்.',
    errorCustomerNotFound: (name) => `வாடிக்கையாளர் ${name} கிடைக்கவில்லை.`,
    errorMicPermission: 'மைக்ரோஃபோன் அனுமதி தேவை.',
  },

  te: {
    creditSaved: (name, amt) => `${name} గారికి ${amt} రూపాయల అప్పు నమోదు చేయబడింది.`,
    paymentSaved: (name, amt) => `${name} నుండి ${amt} రూపాయలు జమ అయ్యాయి.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} గారి మొత్తం బాకీ ${balance} రూపాయలు.`;
      if (balance < 0) return `${name} గారి అడ్వాన్స్ ${Math.abs(balance)} రూపాయలు ఉంది.`;
      return `${name} గారి ఖాతా పూర్తయింది, బాకీ ఏమీ లేదు.`;
    },
    duplicateWarning: (name, amt, type) =>
      `హెచ్చరిక: ${name} గారికి ${amt} రూపాయల ఎంట్రీ ఇప్పుడే జరిగింది.`,
    errorNotUnderstood: 'వివరాలు అర్థం కాలేదు. దయచేసి మళ్లీ చెప్పండి.',
    errorCustomerNotFound: (name) => `ఖాతాదారుడు ${name} కనిపించలేదు.`,
    errorMicPermission: 'మైక్రోఫోన్ అనుమతి అవసరం.',
  },
};

/**
 * Helper to fetch speech templates for a given language code
 */
export function getSpeechTemplates(lang: LanguageCode = 'hinglish'): SpeechTemplates {
  return speechTemplates[lang] || speechTemplates.hinglish;
}
