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
  // F16 Disambiguation
  askDisambiguationDigits: (name: string) => string;
  confirmDisambiguationChoice: (name: string) => string;
  disambiguationNotFoundRetry: string;
  askDisambiguationMoreDigits: (name: string, count: number) => string;
  // F17 Payment Request
  creditSavedWithPaymentRequest: (customerName: string, amount: number | string) => string;
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
    askDisambiguationDigits: (name) => `कौन सा ${name}? नंबर के आख़िरी चार अंक बताइए।`,
    confirmDisambiguationChoice: (name) => `${name}, ठीक है।`,
    disambiguationNotFoundRetry: 'यह नंबर नहीं मिला, फिर से बताइए।',
    askDisambiguationMoreDigits: (name, count) => `दोनों के आख़िरी चार अंक एक जैसे हैं। कृपया आख़िरी ${count} अंक बताइए।`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} को ${amt} रुपये उधार लिखा गया। पेमेंट रिक्वेस्ट तैयार है।`,
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
    askDisambiguationDigits: (name) => `Kaun sa ${name}? Number ke aakhri chaar ank bataiye.`,
    confirmDisambiguationChoice: (name) => `${name}, theek hai.`,
    disambiguationNotFoundRetry: 'Ye number nahi mila, phir se bataiye.',
    askDisambiguationMoreDigits: (name, count) => `Dono ke aakhri 4 ank same hain. Kripya aakhri ${count} ank bataiye.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} ko ${amt} rupaye udhaar likha gaya. Payment request taiyaar hai.`,
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
    askDisambiguationDigits: (name) => `Which ${name}? Please tell the last 4 digits of the phone number.`,
    confirmDisambiguationChoice: (name) => `${name}, confirmed.`,
    disambiguationNotFoundRetry: 'This number was not found, please say again.',
    askDisambiguationMoreDigits: (name, count) => `Both share the same last 4 digits. Please tell the last ${count} digits.`,
    creditSavedWithPaymentRequest: (name, amt) => `Saved ${amt} rupees credit for ${name}. Payment request is ready.`,
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
    askDisambiguationDigits: (name) => `ಯಾವ ${name}? ಫೋನ್ ನಂಬರ್‌ನ ಕೊನೆಯ ನಾಲ್ಕು ಅಂಕಿಗಳನ್ನು ತಿಳಿಸಿ.`,
    confirmDisambiguationChoice: (name) => `${name}, ಸರಿ.`,
    disambiguationNotFoundRetry: 'ಈ ಸಂಖ್ಯೆ ಕಂಡುಬಂದಿಲ್ಲ, ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.',
    askDisambiguationMoreDigits: (name, count) => `ಇಬ್ಬರ ಕೊನೆಯ 4 ಅಂಕಿಗಳು ಒಂದೇ ಇವೆ. ದಯವಿಟ್ಟು ಕೊನೆಯ ${count} ಅಂಕಿಗಳನ್ನು ತಿಳಿಸಿ.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} ಅವರಿಗೆ ${amt} ರೂಪಾಯಿ ಸಾಲ ದಾಖಲಿಸಲಾಗಿದೆ. ಪಾವತಿ ವಿನಂತಿ ಸಿದ್ಧವಾಗಿದೆ.`,
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
    askDisambiguationDigits: (name) => `எந்த ${name}? தொலைபேசி எண்ணின் கடைசி 4 இலக்கங்களைச் சொல்லுங்கள்.`,
    confirmDisambiguationChoice: (name) => `${name}, சரி.`,
    disambiguationNotFoundRetry: 'இந்த எண் பொருந்தவில்லை, மீண்டும் சொல்லுங்கள்.',
    askDisambiguationMoreDigits: (name, count) => `இருவரின் கடைசி 4 இலக்கங்களும் ஒன்றே. தயவுசெய்து கடைசி ${count} இலக்கங்களைச் சொல்லுங்கள்.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} அவர்களுக்கு ${amt} ரூபாய் கடன் பதிவு செய்யப்பட்டது. கட்டண கோரிக்கை தயாராக உள்ளது.`,
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
    askDisambiguationDigits: (name) => `ఏ ${name}? ఫోన్ నంబర్ చివరి నాలుగు అంకెలు చెప్పండి.`,
    confirmDisambiguationChoice: (name) => `${name}, సరిగ్గా ఉంది.`,
    disambiguationNotFoundRetry: 'ఈ నంబర్ సరిపోలలేదు, మళ్లీ చెప్పండి.',
    askDisambiguationMoreDigits: (name, count) => `ఇద్దరి చివరి 4 అంకెలు ఒకటే. దయచేసి చివరి ${count} అంకెలు చెప్పండి.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} గారికి ${amt} రూపాయల అప్పు నమోదు చేయబడింది. చెల్లింపు అభ్యర్థన సిద్ధంగా ఉంది.`,
  },
};

/**
 * Helper to fetch speech templates for a given language code
 */
export function getSpeechTemplates(lang: LanguageCode = 'hinglish'): SpeechTemplates {
  return speechTemplates[lang] || speechTemplates.hinglish;
}
