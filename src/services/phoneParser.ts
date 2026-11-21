/**
 * Phone Number Voice & Text Parser (/services/phoneParser.ts)
 * 
 * Pure TypeScript, 100% offline rule-based parser for Indian mobile phone numbers.
 * Supports:
 * - Latin and native Indic script digits (Devanagari, Kannada, Tamil, Telugu)
 * - Digit-by-digit speech across 5 languages (English, Hindi, Kannada, Tamil, Telugu)
 * - Multiplier words: "double" / "dabal" (x2), "triple" / "treepal" (x3)
 * - Prefix stripping: "+91", "plus nine one", "91" (when 12 digits), leading "0" (when 11 digits)
 * - ASR noise & filler handling ("number", "phone", "hai", "umm", "wo")
 * - Validation: exactly 10 digits, first digit 6 to 9.
 * - Masking, formatting and slow TTS pair generation with pauses.
 */

import { LanguageCode } from './types';

export interface ParsedPhoneNumber {
  digits: string;      // Extracted digit sequence
  formatted: string;   // e.g. "98450 12345"
  confidence: number;  // 1.0 (valid/typed), 0.95 (valid spoken), 0.3 (invalid/incomplete)
  issues: string[];    // Explanations for errors or length mismatches
}

// ---------------------------------------------------------------------------
// NATIVE SCRIPT DIGIT MAPS
// ---------------------------------------------------------------------------

const NATIVE_DIGIT_MAP: Record<string, string> = {
  // Devanagari (० - ९)
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  // Kannada (೦ - ೯)
  '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4',
  '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9',
  // Tamil (௦ - ௯)
  '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4',
  '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',
  // Telugu (౦ - ౯)
  '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4',
  '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
};

// ---------------------------------------------------------------------------
// SPOKEN DIGIT WORD DICTIONARY ACROSS 5 INDIC LANGUAGES
// ---------------------------------------------------------------------------

const SPOKEN_DIGIT_MAP: Record<string, string> = {
  // 0 - Zero
  'zero': '0', 'oh': '0', 'o': '0', 'zeros': '0', 'zeroes': '0',
  'shunya': '0', 'soonya': '0', 'shunyaa': '0', 'शून्य': '0',
  'sonne': '0', 'soone': '0', 'ಸೊನ್ನೆ': '0', // TODO_REVIEW: Check colloquial Kannada "soone" variant
  'poojyam': '0', 'pujyam': '0', 'poojiyam': '0', 'பூஜ்யம்': '0', 'பூஜ்ஜியம்': '0', // TODO_REVIEW: Check colloquial Tamil "poojiyam"
  'sunna': '0', 'soonna': '0', 'సున్నా': '0',

  // 1 - One
  'one': '1', 'won': '1',
  'ek': '1', 'aek': '1', 'ik': '1', 'एक': '1',
  'ondu': '1', 'wondu': '1', 'ಒಂದು': '1',
  'ondru': '1', 'onnu': '1', 'ஒன்று': '1', 'ஒன்னு': '1', // TODO_REVIEW: Spoken Tamil "onnu" vs formal "ondru"
  'okati': '1', 'vokati': '1', 'ఒకటి': '1',

  // 2 - Two
  'two': '2', 'to': '2', 'too': '2',
  'do': '2', 'doo': '2', 'dow': '2', 'दो': '2',
  'eradu': '2', 'yeradu': '2', 'ಎರಡು': '2',
  'irandu': '2', 'rendu': '2', 'இரண்டு': '2', 'ரெண்டு': '2',
  'moodu_dummy': '3', // placeholder
  // Telugu rendu
  'రెండు': '2',

  // 3 - Three
  'three': '3', 'tree': '3',
  'teen': '3', 'tin': '3', 'तीन': '3',
  'mooru': '3', 'muru': '3', 'ಮೂರು': '3',
  'moondru': '3', 'moonu': '3', 'மூன்று': '3', 'மூணு': '3',
  'moodu': '3', 'mudu': '3', 'మూడు': '3',

  // 4 - Four
  'four': '4', 'for': '4', 'fore': '4',
  'char': '4', 'chaar': '4', 'चार': '4',
  'naalku': '4', 'nalku': '4', 'ನಾಲ್ಕು': '4',
  'naangu': '4', 'naalu': '4', 'நான்கு': '4', 'நாலு': '4',
  'naalugu': '4', 'nalugu': '4', 'నాలుగు': '4',

  // 5 - Five
  'five': '5',
  'paanch': '5', 'panch': '5', 'पांच': '5', 'पाँच': '5',
  'aidu': '5', 'aydu': '5', 'ಐದು': '5', 'ఐదు': '5',
  'aindhu': '5', 'anju': '5', 'anchu': '5', 'ஐந்து': '5', 'அஞ்சு': '5',
  // Telugu aidu covered by 'aidu' / 'aydu'

  // 6 - Six
  'six': '6',
  'chhe': '6', 'chhah': '6', 'che': '6', 'cheh': '6', 'छह': '6', 'छः': '6', 'छे': '6',
  'aaru': '6', 'aru': '6', 'ಆರು': '6', 'ஆறு': '6', 'ఆరు': '6',

  // 7 - Seven
  'seven': '7',
  'saat': '7', 'sat': '7', 'सात': '7',
  'eelu': '7', 'yelu': '7', 'ಏಳು': '7',
  'eezhu': '7', 'yezhu': '7', 'ஏழு': '7',
  'eedu': '7', 'yedu': '7', 'ఏడు': '7',

  // 8 - Eight
  'eight': '8', 'ate': '8',
  'aath': '8', 'ath': '8', 'आठ': '8',
  'entu': '8', 'yentu': '8', 'ಎಂಟು': '8',
  'ettu': '8', 'எட்டு': '8',
  'enimidi': '8', 'yenimidi': '8', 'ఎనిమిది': '8',

  // 9 - Nine
  'nine': '9',
  'nau': '9', 'no': '9', 'nav': '9', 'नौ': '9',
  'ombattu': '9', 'ombatu': '9', 'ಒಂಬತ್ತು': '9',
  'onbadhu': '9', 'onbathu': '9', 'ombadhu': '9', 'ஒன்பது': '9',
  'tommidi': '9', 'తొమ్మిది': '9',
};

// ---------------------------------------------------------------------------
// REPEAT MULTIPLIER WORDS
// ---------------------------------------------------------------------------

const REPEAT_DOUBLE_WORDS = new Set([
  'double', 'dabal', 'dubble', 'dabbel', 'डबल', 'ಡಬಲ್', 'டபுள்', 'డబుల్',
]);

const REPEAT_TRIPLE_WORDS = new Set([
  'triple', 'treepal', 'tripple', 'tripal', 'ट्रिपल', 'ಟ್ರಿಪಲ್', 'டிரிபிள்', 'ట్రిపుల్',
]);

// ---------------------------------------------------------------------------
// ASR FILLER WORDS TO IGNORE
// ---------------------------------------------------------------------------

const FILLER_WORDS = new Set([
  'number', 'no', 'ph', 'phone', 'mobile', 'ka', 'ki', 'ke', 'ko', 'hai', 'he',
  'daalo', 'likho', 'add', 'karo', 'kariye', 'kijiye',
  'umm', 'um', 'wo', 'arre', 'are', 'ha', 'haa', 'na', 'hisaab', 'grahak', 'customer',
  'nambar', 'namber', 'నంబర్', 'நம்பர்', 'ನಂಬರ್', 'नंबर', 'फोन',
  'matlab', 'bolo', 'batao', 'bataiye',
]);

/**
 * Extracts digits only from a transcript or typed string, in spoken/entered order.
 * Handles written digits (0-9, native), spoken words, repeat multipliers, and noisy gaps.
 */
export function extractDigitSequence(text: string): string {
  if (!text) return '';

  let raw = text.trim();

  // Normalize native digits to Latin '0'-'9'
  for (const [nativeChar, latinDigit] of Object.entries(NATIVE_DIGIT_MAP)) {
    raw = raw.split(nativeChar).join(latinDigit);
  }

  // Pre-clean punctuation commonly present in typed phone numbers: dashes, dots, spaces, commas
  // But preserve word boundaries for spoken digit tokens
  // e.g. "98450-12345" -> "98450 12345"
  raw = raw.replace(/[-.,/()]/g, ' ');

  // Handle multi-word country code phrases first
  raw = raw.replace(/\bplus\s+(?:nine\s+one|91)\b/gi, '+91 ');
  raw = raw.replace(/प्लस\s+नौ\s+एक/gi, '+91 ');
  raw = raw.replace(/ಪ್ಲಸ್\s+ಒಂಬತ್ತು\s+ಒಂದು/gi, '+91 ');

  const tokens = raw.split(/\s+/).filter(Boolean);
  let result = '';
  let pendingMultiplier = 1;

  for (let i = 0; i < tokens.length; i++) {
    const rawToken = tokens[i];
    const token = rawToken.toLowerCase();

    // Check if token is a repeat multiplier word
    if (REPEAT_DOUBLE_WORDS.has(token)) {
      pendingMultiplier = 2;
      continue;
    }
    if (REPEAT_TRIPLE_WORDS.has(token)) {
      pendingMultiplier = 3;
      continue;
    }

    // Check if token is an ASR filler word
    if (FILLER_WORDS.has(token)) {
      continue;
    }

    // Check if token contains literal Latin digits (e.g. "98450", "984", "9")
    if (/^\+?\d+$/.test(token)) {
      const pureDigits = token.replace(/\D/g, '');
      if (pureDigits) {
        if (pendingMultiplier > 1 && pureDigits.length === 1) {
          result += pureDigits.repeat(pendingMultiplier);
        } else {
          result += pureDigits;
        }
        pendingMultiplier = 1;
      }
      continue;
    }

    // Check if token matches a spoken digit word
    const digitValue = SPOKEN_DIGIT_MAP[token];
    if (digitValue !== undefined) {
      result += digitValue.repeat(pendingMultiplier);
      pendingMultiplier = 1;
      continue;
    }

    // Reset multiplier if non-digit word encountered
    pendingMultiplier = 1;
  }

  return result;
}

/**
 * Normalises phone prefix rules:
 * - If string starts with "91" and has 12 digits, strip "91" if remaining 10 starts with 6-9
 * - If string starts with "0" and has 11 digits, strip "0" if remaining 10 starts with 6-9
 */
function normalizePrefixes(digits: string): string {
  let cleaned = digits;

  // 12 digits with 91 country code prefix (e.g. 919845012345)
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    const without91 = cleaned.substring(2);
    if (/^[6-9]/.test(without91)) {
      cleaned = without91;
    }
  }

  // 11 digits with leading 0 (e.g. 09845012345)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    const withoutZero = cleaned.substring(1);
    if (/^[6-9]/.test(withoutZero)) {
      cleaned = withoutZero;
    }
  }

  return cleaned;
}

/**
 * Formats a 10-digit phone number into 5 + 5 grouped format: "98450 12345"
 */
export function formatPhone(phone: string): string {
  const clean = (phone || '').replace(/\D/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return clean;
}

/**
 * Returns last N digits (default 4): e.g. "2345"
 */
export function lastDigits(phone: string, n: number = 4): string {
  const clean = (phone || '').replace(/\D/g, '');
  return clean.slice(-n);
}

/**
 * Returns masked phone number: "••••••2345" (6 bullets + last 4 digits)
 */
export function maskPhone(phone: string): string {
  const clean = (phone || '').replace(/\D/g, '');
  if (!clean) return '••••••••••';
  if (clean.length <= 4) {
    return '•'.repeat(Math.max(0, 10 - clean.length)) + clean;
  }
  const last4 = clean.slice(-4);
  const bulletCount = Math.max(0, clean.length - 4);
  return '•'.repeat(bulletCount) + last4;
}

/**
 * Main phone parser function.
 * Validates 10-digit Indian mobile number starting with 6 to 9.
 * Never silently fixes wrong lengths (returns issues + confidence < 0.5 for 9 or 11 digits).
 */
export function parsePhoneNumber(text: string): ParsedPhoneNumber | null {
  if (!text || !text.trim()) return null;

  const rawDigits = extractDigitSequence(text);
  if (!rawDigits) {
    return {
      digits: '',
      formatted: '',
      confidence: 0,
      issues: ['No digits found in input'],
    };
  }

  const normalized = normalizePrefixes(rawDigits);
  const issues: string[] = [];

  // Check length
  if (normalized.length !== 10) {
    if (normalized.length === 9) {
      issues.push('Phone number has 9 digits (1 digit missing). Please speak or enter 10 digits.');
    } else if (normalized.length === 11) {
      issues.push('Phone number has 11 digits (1 extra digit). Indian mobile numbers must be 10 digits.');
    } else {
      issues.push(`Expected 10 digits, found ${normalized.length} digits.`);
    }
  }

  // Check first digit rule (6 to 9 for Indian mobiles)
  if (normalized.length > 0 && !/^[6-9]/.test(normalized)) {
    issues.push(`Indian mobile numbers must start with 6, 7, 8, or 9 (starts with ${normalized[0]}).`);
  }

  const isValid = issues.length === 0;
  const isDirectlyTyped = /^\d{10}$/.test(text.trim().replace(/[- ]/g, ''));

  return {
    digits: normalized,
    formatted: formatPhone(normalized),
    confidence: isValid ? (isDirectlyTyped ? 1.0 : 0.95) : 0.3,
    issues,
  };
}

// ---------------------------------------------------------------------------
// SLOW TTS DIGIT-BY-DIGIT SPOKEN TEXT GENERATOR
// ---------------------------------------------------------------------------

const DIGIT_NAMES_FOR_SPEECH: Record<LanguageCode, string[]> = {
  hi: ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ'],
  hinglish: ['shunya', 'ek', 'do', 'teen', 'char', 'paanch', 'chhe', 'saat', 'aath', 'nau'],
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  kn: ['ಸೊನ್ನೆ', 'ಒಂದು', 'ಎರಡು', 'ಮೂರು', 'ನಾಲ್ಕು', 'ಐದು', 'ಆರು', 'ಏಳು', 'ಎಂಟು', 'ಒಂಬತ್ತು'],
  ta: ['பூஜ்யம்', 'ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து', 'ஆறு', 'ஏழு', 'எட்டு', 'ஒன்பது'],
  te: ['సున్నా', 'ఒకటి', 'రెండు', 'మూడు', 'నాలుగు', 'ఐదు', 'ఆరు', 'ఏడు', 'ఎనిమిది', 'తొమ్మిది'],
};

/**
 * Generates slow, digit-by-digit text for speech synthesis, grouped in pairs with natural pauses:
 * e.g. for "9845012345":
 * Hindi: "नौ आठ, चार पाँच, शून्य एक, दो तीन, चार पाँच"
 * English: "nine eight, four five, zero one, two three, four five"
 */
export function phoneSpokenText(phone: string, lang: LanguageCode = 'hi'): string {
  const clean = (phone || '').replace(/\D/g, '');
  if (!clean) return '';

  const langNames = DIGIT_NAMES_FOR_SPEECH[lang] || DIGIT_NAMES_FOR_SPEECH.hi;
  const pairs: string[] = [];

  for (let i = 0; i < clean.length; i += 2) {
    const d1 = parseInt(clean[i], 10);
    const name1 = !isNaN(d1) ? langNames[d1] || String(d1) : '';

    if (i + 1 < clean.length) {
      const d2 = parseInt(clean[i + 1], 10);
      const name2 = !isNaN(d2) ? langNames[d2] || String(d2) : '';
      pairs.push(`${name1} ${name2}`.trim());
    } else {
      pairs.push(name1);
    }
  }

  // Comma creates natural breath pause in speech synthesis
  return pairs.join(', ');
}
