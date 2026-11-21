/**
 * Comprehensive Multi-Language Localization System for Voice Khata
 * Supported languages: Hindi, Hinglish, English, Kannada, Tamil, Telugu
 * Built with lightweight zero-dependency JSON dictionaries.
 */

import { LanguageCode, LanguageOption } from '../services/types';
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
  { code: 'hinglish', label: 'Hinglish', nativeLabel: 'हिंग्लिश', speechLocale: 'hi-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'en', label: 'English', nativeLabel: 'English', speechLocale: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', speechLocale: 'te-IN' },
];

/**
 * Legacy translation helper object for backwards compatibility
 * with direct key-lookup properties.
 */
export const translations = {
  // Common UI labels
  appName: {
    hinglish: hinglish.appName,
    hi: hi.appName,
    en: en.appName,
    kn: kn.appName,
    ta: ta.appName,
    te: te.appName,
  },
  tagline: {
    hinglish: hinglish.tagline,
    hi: hi.tagline,
    en: en.tagline,
    kn: kn.tagline,
    ta: ta.tagline,
    te: te.tagline,
  },
  online: {
    hinglish: hinglish.online,
    hi: hi.online,
    en: en.online,
    kn: kn.online,
    ta: ta.online,
    te: te.online,
  },
  offlineSafe: {
    hinglish: hinglish.offlineSafe,
    hi: hi.offlineSafe,
    en: en.offlineSafe,
    kn: kn.offlineSafe,
    ta: ta.offlineSafe,
    te: te.offlineSafe,
  },
  // Ledger semantics
  creditGiven: {
    hinglish: hinglish.creditGiven,
    hi: hi.creditGiven,
    en: en.creditGiven,
    kn: kn.creditGiven,
    ta: ta.creditGiven,
    te: te.creditGiven,
  },
  paymentReceived: {
    hinglish: hinglish.paymentReceived,
    hi: hi.paymentReceived,
    en: en.paymentReceived,
    kn: kn.paymentReceived,
    ta: ta.paymentReceived,
    te: te.paymentReceived,
  },
  balanceOwed: {
    hinglish: hinglish.balanceOwed,
    hi: hi.balanceOwed,
    en: en.balanceOwed,
    kn: kn.balanceOwed,
    ta: ta.balanceOwed,
    te: te.balanceOwed,
  },
  todaySummary: {
    hinglish: hinglish.todaySummary,
    hi: hi.todaySummary,
    en: en.todaySummary,
    kn: kn.todaySummary,
    ta: ta.todaySummary,
    te: te.todaySummary,
  },
  // Mic Hero prompts
  micIdlePrompt: {
    hinglish: hinglish.micIdle,
    hi: hi.micIdle,
    en: en.micIdle,
    kn: kn.micIdle,
    ta: ta.micIdle,
    te: te.micIdle,
  },
  micListeningPrompt: {
    hinglish: hinglish.micListening,
    hi: hi.micListening,
    en: en.micListening,
    kn: kn.micListening,
    ta: ta.micListening,
    te: te.micListening,
  },
  micProcessingPrompt: {
    hinglish: hinglish.micProcessing,
    hi: hi.micProcessing,
    en: en.micProcessing,
    kn: kn.micProcessing,
    ta: ta.micProcessing,
    te: te.micProcessing,
  },
  micHelpExample: {
    hinglish: '"Ramesh ko 500 udhaar diya" ya "Ramesh ka total?"',
    hi: '"रमेश को 500 उधार दिया" या "रमेश का टोटल?"',
    en: '"Ramesh gave 500 credit" or "Ramesh total balance?"',
    kn: '"ರಮೇಶ್ ಗೆ 500 ಸಾಲ ನೀಡಲಾಗಿದೆ" ಅಥವಾ "ರಮೇಶ್ ಒಟ್ಟು ಬಾಕಿ?"',
    ta: '"ரமேஷிற்கு 500 கடன்" அல்லது "ரமேஷ் மொத்த பாக்கி?"',
    te: '"రమేష్ కి 500 అప్పు" లేదా "రమేష్ మొత్తం బాకీ?"',
  },
  // Action Buttons
  confirmAndSave: {
    hinglish: 'Haan, Khata Me Likhein',
    hi: 'हाँ, खाते में लिखें',
    en: 'Confirm & Save',
    kn: 'ಹೌದು, ಖಾತೆಗೆ ಸೇರಿಸಿ',
    ta: 'ஆம், சேமிக்க',
    te: 'అవును, సేవ్ చేయండి',
  },
  cancel: {
    hinglish: hinglish.cancel,
    hi: hi.cancel,
    en: en.cancel,
    kn: kn.cancel,
    ta: ta.cancel,
    te: te.cancel,
  },
  manualEntry: {
    hinglish: 'Likh Kar Darj Karein',
    hi: 'लिखकर दर्ज करें',
    en: 'Manual Keyboard Entry',
    kn: 'ಟೈಪ್ ಮಾಡಿ ಬರೆಯಿರಿ',
    ta: 'தட்டச்சு செய்யவும்',
    te: 'టైప్ చేసి నమోదు చేయండి',
  },
  sendWhatsApp: {
    hinglish: 'WhatsApp Reminder Bhejein',
    hi: 'व्हाट्सएप रिमाइंडर भेजें',
    en: 'Send WhatsApp Reminder',
    kn: 'ವಾಟ್ಸಾಪ್ ಜ್ಞಾಪನೆ ಕಳುಹಿಸಿ',
    ta: 'வாட்ஸ்அப் நினைவூட்டல்',
    te: 'వాట్సాప్ రిమైండర్ పంపండి',
  },
  shareReceipt: {
    hinglish: 'Parchi Share Karein',
    hi: 'पर्ची शेयर करें',
    en: 'Share Receipt Slip',
    kn: 'ರಶೀದಿ ಹಂಚಿಕೊಳ್ಳಿ',
    ta: 'ரசீதை பகிர்க',
    te: 'రసీదు షೇர் చేయండి',
  },
  // Spoken feedback phrases (Soundbox voice announcements)
  spokenCreditSaved: (name: string, amount: string, lang: LanguageCode) => {
    switch (lang) {
      case 'hi':
      case 'hinglish':
        return `${name} ko ${amount} rupaye udhaar darj kiya`;
      case 'kn':
        return `${name} avarige ${amount} roopayi saala daakhalisu laagide`;
      case 'ta':
        return `${name} ku ${amount} roobai kadan padhivu seiyappattadhu`;
      case 'te':
        return `${name} ku ${amount} roopayalu appu namodu cheyabadindi`;
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
  reminderMessage: (name: string, amount: string, shopName: string = 'Kirana Store', lang: LanguageCode) => {
    switch (lang) {
      case 'hi':
        return `नमस्ते ${name} जी, आपके किराना खाते का बाकी ₹${amount} है। कृपया सुविधानुसार चुका दें। धन्यवाद - ${shopName}`;
      case 'kn':
        return `ನಮಸ್ಕಾರ ${name} ಅವರೇ, ನಿಮ್ಮ ಕಿರಾಣಿ ಖಾತೆಯ ಬಾಕಿ ಮೊತ್ತ ₹${amount}. ದಯವಿಟ್ಟು ಪಾವತಿಸಿ. ಧನ್ಯವಾದಗಳು - ${shopName}`;
      case 'ta':
        return `வணக்கம் ${name}, உங்கள் மளிகைக் கடை பாக்கித் தொகை ₹${amount}. தயவுசெய்து செலுத்தவும். நன்றி - ${shopName}`;
      case 'te':
        return `నమస్కారం ${name} గారు, మీ కిరాణా ఖాతా బకాయి ₹${amount}. దయచేసి చెల్లించండి. ధన్యవాదాలు - ${shopName}`;
      case 'en':
        return `Hello ${name}, this is a gentle reminder that your pending balance at ${shopName} is ₹${amount}. Thank you!`;
      case 'hinglish':
      default:
        return `Namaste ${name} ji, aapke kirana khata ka baaki balance ₹${amount} hai. Kripya samay par chuka dein. Dhanyawad - ${shopName}`;
    }
  }
};
