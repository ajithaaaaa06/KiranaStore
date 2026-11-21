/**
 * Voice Parser Service (/services/parser.ts)
 * 
 * Offline, rule-based Indic voice parser for Kirana Ledgers.
 * Supports Hindi, English, Kannada, Tamil, Telugu, and code-mixed speech.
 * 
 * Rules implemented:
 * 1. Credit keywords (hi/en/kn/ta/te + romanised)
 * 2. Payment keywords + direction resolution ("Ramesh ne 200 diye" vs "Ramesh ko 500 diya")
 * 3. Multi-entry compound sentences ("Ramesh ka 340 udhaar, kal 200 diya tha")
 * 4. Relative dates (aaj, kal, parso, do din pehle, last Monday, native equivalents)
 * 5. Corrections ("nahi 430", "sorry 500", "galat 350")
 * 6. Queries ("Ramesh ka total", "Ramesh ka baaki kitna", "how much does Ramesh owe")
 * 7. Confirm / cancel commands ("haan", "save", "theek hai" vs "nahi", "cancel", "ruko")
 * 8. Customer name extraction supporting native scripts (Devanagari, Kannada, Tamil, Telugu, Latin)
 * 9. Field-level confidence scoring (overall = minimum field confidence)
 */

import { ParsedEntry, ParsedSubEntry, TransactionType, CompoundDetails } from './types';
import { extractAmounts, normalizeIndicDigits, parseNumberPhrase } from './numberParser';
import { parsePhoneNumber } from './phoneParser';

export type ParserIntent = 'entry' | 'query' | 'correction' | 'confirm' | 'cancel' | 'register' | 'unknown';

export interface ParsedTranscriptResult {
  intent: ParserIntent;
  entries: ParsedEntry[];
  queryCustomer?: string;
  correctionAmount?: number;
  confidence: number;

  // Backward-compatible properties for UI and existing test suite:
  type: ParserIntent;
  data: ParsedEntry;
  customerName?: string;
  name?: string;
  phone?: string;
  queryType?: 'balance';
  rawTranscript: string;
  message?: string;
  isCorrection?: boolean;
  isCompound?: boolean;
  explanation?: string;
}

// ---------------------------------------------------------------------------
// KEYWORD DICTIONARIES
// ---------------------------------------------------------------------------

const CONFIRM_WORDS = new Set([
  'haan', 'ha', 'haa', 'yes', 'save', 'theek hai', 'theek', 'thik hai',
  'sahi hai', 'sahi', 'sari', 'aama', 'ஆமா', 'avunu', 'అవును', 'save karo',
  'karein', 'pakka', 'done', 'confirm', 'ok', 'okay', 'हूँ', 'हाँ', 'ठीक है',
  'ಸರಿ', 'சரி', 'సరే'
]);

const CANCEL_WORDS = new Set([
  'cancel', 'ruko', 'mat karo', 'benda', 'vendaam', 'oddu', 'వద్దు',
  'வேண்டாம்', 'beda', 'bêda', 'reject', 'hatao', 'रद्द', 'नको', 'ಬೇಡ', 'stop'
]);

const CORRECTION_TRIGGERS = [
  /^(?:nahi|nahin|no|sorry|galat|actually|badal ke|thappu|alla|illai|kaadu|गलत|नहीं|तಪ್ಪು|இல்லை|తప్పు)[,\s]+/i,
  /(?:badal ke|change to|make it|kar do|bana do)\s*$/i,
];

// Query patterns across 5 languages
const QUERY_PATTERNS = [
  /\b(?:total|baaki|bakki|kitna|balance|how much|hisaab|hisab|otti baaki|mottham baakee|tell me|batao|owe|owes)\b/i,
  /(?:बाकी|हिसाब|टोटल|कितना|बताओ)/,
  /(?:ಬಾಕಿ|ಎಷ್ಟು|ಖಾತೆ|ಒಟ್ಟು ಬಾಕಿ)/,
  /(?:மொத்தம்|மீதி|எவ்வளவு|கணக்கு)/,
  /(?:మొత్తం|బాకీ|ఎంత బాకీ|ఎంత|ఖాతా)/,
];

// Relative date patterns
interface RelativeDateMatch {
  date: string;
  label: string;
  matchedText: string;
}

// Credit keywords
const CREDIT_KEYWORDS = [
  'udhaar', 'udhar', 'उधार', 'baaki', 'बाकी', 'khata', 'खाता',
  'credit', 'borrowed', 'borrow', 'due', 'debt', 'lent',
  'owes', 'owe', 'saala', 'sala', 'ಸಾಲ',
  'kadan', 'கடன்', 'பாக்கி',
  'appu', 'అప్పు'
];

// Payment keywords
const PAYMENT_KEYWORDS = [
  // Hindi / Hinglish / English
  'diye', 'mila', 'aaya', 'aaye', 'jama', 'paid', 'payment', 'pay',
  'received', 'receive', 'wapas', 'chuka diya', 'vasool', 'clear', 'cleared',
  'settled', 'settle', 'returned', 'repaid', 'दिए', 'मिला', 'आया', 'जमा',
  'वापस', 'चुकाया', 'वसूल', 'diye hain', 'diya hai',
  // Kannada
  'kotta', 'kottu', 'kotte', 'kottaru', 'kottiddare', 'kottiddaare', 'kottidini', 'kottidare',
  'hana bandide', 'bandide', 'ಕೊಟ್ಟ', 'ಕೊಟ್ಟರು', 'ಕೊಟ್ಟಿದ್ದಾರೆ', 'ಕೊಟ್ಟಿದಾರೆ', 'ಜಮಾ', 'ವಾಪಸ್', 'ಹಣ ಬಂದಿದೆ',
  // Tamil
  'koduthaar', 'kuduthaar', 'koduthar', 'kuduthar', 'koduthaanga', 'kuduthaanga', 'koduthanga', 'kuduthanga',
  'panam vandhadhu', 'vandhadhu', 'vandhuchu', 'கொடுத்தார்', 'கொடுத்தார்கள்', 'கொடுத்தாங்க',
  'வந்தது', 'ஜமா', 'பணம் வந்தது',
  // Telugu
  'icharu', 'ichaaru', 'ichadu', 'ichhaaru', 'ichharu', 'ichindi', 'jama ayyindi', 'vachindi',
  'thirigi icharu', 'చెల్లించారు', 'ఇచ్చారు', 'వచ్చింది', 'తిరిగి ఇచ్చారు'
];

// Common prepositions & filler words to clean from customer name
const STOP_WORDS = new Set([
  'ko', 'ka', 'ke', 'ki', 'se', 'ne', 'gave', 'to', 'for', 'from',
  'in', 'on', 'at', 'kiya', 'tha', 'thi', 'the', 'hai', 'hain',
  'dene', 'wali', 'wala', 'please', 'bhai', 'ji', 'anna', 'garu',
  'avargal', 'sir', 'madam', 'store', 'kirana', 'dokan', 'account',
  'cash', 'and', 'aur', 'mattu', 'mariyu', 'matrum', 'plus', 'lekin',
  'phir', 'then', 'also', 'bhi', 'kooda', 'కూడా', 'கூட', 'ಕೂಡ',
  'rupaye', 'rupees', 'rs', 're', 'inr', 'రూపాయి', 'ರೂಪಾಯಿ', 'ரூபாய்',
  'रुपये', 'panam', 'hana', 'dabbu', 'roopayi', 'rupai', 'khatte',
  'diya', 'diye', 'mila', 'aaya', 'wapas', 'jama'
]);

// ---------------------------------------------------------------------------
// 1. RELATIVE DATE RESOLVER
// ---------------------------------------------------------------------------

/**
 * Resolves relative dates ("kal", "parso", "aaj", "do din pehle", "last monday", etc.)
 * into ISO date string using device date and context.
 */
export function resolveRelativeDate(
  text: string,
  baseDate: Date = new Date()
): RelativeDateMatch | null {
  const lower = text.toLowerCase();

  // "parso" / "day before yesterday" / "monne" / "mundhanal" / "monna"
  if (/\b(?:parso|parson|day before yesterday|monne|mundhanal|monna)\b/i.test(lower) ||
      /(?:परसों|ಮೊನ್ನೆ|முந்தாநாள்|మొన్న)/.test(lower)) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - 2);
    return {
      date: d.toISOString(),
      label: 'parso',
      matchedText: 'parso',
    };
  }

  // "N din pehle" / "N days ago"
  const daysAgoMatch = lower.match(/(?:(\d+|do|teen|chaar|two|three|four)\s*(?:din|days?|dina|naatkal|rojulu)\s*(?:pehle|ago|hinde|munbu|mundu))/i);
  if (daysAgoMatch) {
    let days = parseInt(daysAgoMatch[1], 10);
    if (isNaN(days)) {
      const map: Record<string, number> = { do: 2, two: 2, teen: 3, three: 3, chaar: 4, four: 4 };
      days = map[daysAgoMatch[1].toLowerCase()] || 2;
    }
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - days);
    return {
      date: d.toISOString(),
      label: `${days} din pehle`,
      matchedText: daysAgoMatch[0],
    };
  }

  // "last Monday", "last Sunday", "pichle somwar", etc.
  const lastDayMatch = lower.match(/\b(?:last|pichle)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|somwar|mangalwar|budhwar|guruwar|shukrawar|shaniwar|ravivar)\b/i);
  if (lastDayMatch) {
    const dayName = lastDayMatch[1].toLowerCase();
    const dayMap: Record<string, number> = {
      sunday: 0, ravivar: 0,
      monday: 1, somwar: 1,
      tuesday: 2, mangalwar: 2,
      wednesday: 3, budhwar: 3,
      thursday: 4, guruwar: 4,
      friday: 5, shukrawar: 5,
      saturday: 6, shaniwar: 6,
    };
    const targetDay = dayMap[dayName] ?? 1;
    const currentDay = baseDate.getDay();
    let diff = currentDay - targetDay;
    if (diff <= 0) diff += 7;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - diff);
    return {
      date: d.toISOString(),
      label: lastDayMatch[0],
      matchedText: lastDayMatch[0],
    };
  }

  // "kal" / "yesterday" / "ninne" / "netru" / "ninna"
  if (/\b(?:kal|yesterday|ninne|netru|ninna)\b/i.test(lower) ||
      /(?:कल|ನಿನ್ನೆ|நேற்று|నిన్న)/.test(lower)) {
    // Check if future tense is explicitly indicated
    const isFuture = /\b(?:dega|degi|aayega|dene wala|tomorrow|naale|naalai|repu)\b/i.test(lower);
    const offset = isFuture ? 1 : -1;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return {
      date: d.toISOString(),
      label: isFuture ? 'kal (tomorrow)' : 'kal',
      matchedText: 'kal',
    };
  }

  // "aaj" / "today" / "indu" / "inru" / "ee roju"
  if (/\b(?:aaj|today|indu|inru|ee roju|eerodu)\b/i.test(lower) ||
      /(?:आज|ಇಂದು|இன்று|ఈ రోజు)/.test(lower)) {
    return {
      date: baseDate.toISOString(),
      label: 'aaj',
      matchedText: 'aaj',
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// 2. DIRECTION RESOLUTION (Credit vs Payment)
// ---------------------------------------------------------------------------

function containsKeyword(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, 'i');
    return regex.test(lower);
  });
}

/**
 * Resolves whether the transaction is 'credit' (udhaar diya) or 'payment' (jama mila)
 * Distinguishes direction carefully:
 * - "Ramesh ne 200 diye" = payment (customer gave money)
 * - "Ramesh ko 500 diya" / "Ramesh ko 500 udhaar diya" = credit (shopkeeper gave credit)
 * - "Ramesh se 200 mila" = payment (received from customer)
 * - "Ramesh 500 udhaar" = credit
 * - "Ramesh 200 jama" = payment
 */
export function resolveDirection(text: string): { type: TransactionType; confidence: number } {
  const lower = text.toLowerCase();

  // Rule 2.0: Explicit credit-qualifying noun/marker (udhaar, baaki, credit, saala, kadan, appu)
  // overrides generic verb "diya tha" unless a settlement/reversal verb is present.
  const hasExplicitCreditMarker = /\b(?:udhaar|udhar|credit|borrowed|borrow|saala|sala|kadan|appu)\b/i.test(lower) ||
    /(?:उधार|खाता|ಸಾಲ|கடன்|அప్పు)/.test(lower);
  const hasSettlementReversal = /\b(?:chuka|wapas|clear|cleared|settled|settle|vasool)\b/i.test(lower) ||
    /(?:चुकाया|वापस|वसूल)/.test(lower);

  if (hasExplicitCreditMarker && !hasSettlementReversal) {
    return { type: 'credit', confidence: 0.95 };
  }

  // Rule 2.1: Explicit composite phrases
  // "ne diye" / "ne diya" / "ne jama kiya" -> Payment
  if (/\bne\s+(?:diye|diya|jama|bhar|bhara)\b/i.test(lower) ||
      /\bse\s+(?:mila|aaya|wapas|prapt)\b/i.test(lower) ||
      /\bhana\s+bandide\b/i.test(lower) ||
      /\bpanam\s+vandhadhu\b/i.test(lower) ||
      /\bjama\s+ayyindi\b/i.test(lower) ||
      /\bdiya\s+tha\b/i.test(lower)) {
    return { type: 'payment', confidence: 0.95 };
  }

  // Rule 2.2: "ko udhaar diya" / "ko diya" / "ko credit" -> Credit
  if (/\bko\s+(?:udhaar|udhar|credit|diya|de diya)\b/i.test(lower)) {
    return { type: 'credit', confidence: 0.95 };
  }

  // Rule 2.2b: Past relative date (pehle, kal, parso, ago) + "diya" without "ko" -> Customer paid in past
  if (/\b(?:kal|parso|pehle|ago|ninne|netru|ninna)\b/i.test(lower) &&
      /\b(?:diya|diye|kotta|koduthaar|kuduthaar|icharu|ichaaru|kottaru|kottiddare)\b/i.test(lower) &&
      !/\bko\b/i.test(lower)) {
    return { type: 'payment', confidence: 0.92 };
  }

  // Rule 2.3: Check explicit credit keywords
  const hasCredit = containsKeyword(lower, CREDIT_KEYWORDS);

  // Rule 2.4: Check explicit payment keywords
  const hasPayment = containsKeyword(lower, PAYMENT_KEYWORDS);

  if (hasCredit && !hasPayment) {
    return { type: 'credit', confidence: 0.95 };
  }

  if (hasPayment && !hasCredit) {
    return { type: 'payment', confidence: 0.95 };
  }

  if (hasCredit && hasPayment) {
    // If both appear, check precedence:
    // e.g. "udhaar diya" -> "udhaar" qualifies "diya", so it is credit
    if (lower.includes('udhaar') || lower.includes('udhar') || lower.includes('credit') || lower.includes('saala') || lower.includes('kadan') || lower.includes('appu')) {
      return { type: 'credit', confidence: 0.92 };
    }
    return { type: 'payment', confidence: 0.85 };
  }

  // Default in kirana ledger context is credit (udhaar is recorded most frequently)
  return { type: 'credit', confidence: 0.70 };
}

// ---------------------------------------------------------------------------
// 3. CUSTOMER NAME EXTRACTION
// ---------------------------------------------------------------------------

/**
 * Extracts and cleans customer name by removing amount, keyword, and date tokens.
 * Retains native scripts (Devanagari, Kannada, Tamil, Telugu, Latin).
 */
export function extractCustomerName(
  text: string,
  consumedSpans: { start: number; end: number }[] = []
): { name: string; confidence: number } {
  // Mask out consumed spans first (e.g. extracted amount spans)
  let working = text;
  const sortedSpans = [...consumedSpans].sort((a, b) => b.start - a.start);
  for (const span of sortedSpans) {
    working = working.slice(0, span.start) + ' ' + working.slice(span.end);
  }

  // Normalize indic digits
  let cleaned = normalizeIndicDigits(working);

  // 1. Remove multi-word phrases first
  const multiWordRemovals = [
    'diya tha', 'de diya', 'diye the', 'hana bandide', 'panam vandhadhu',
    'jama ayyindi', 'thirigi icharu', 'chuka diya', 'kadan koduthen',
    'appu ichanu', 'rupayi kottaru', 'rupayi kotte', 'vanda appu',
    'how much does', 'how much', 'otti baaki', 'mottham baakee',
    'enta baaki', 'hisaab batao', 'do din pehle', 'last monday',
    'day before yesterday'
  ];

  for (const phrase of multiWordRemovals) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, 'gi');
    cleaned = cleaned.replace(regex, ' ');
  }

  // 2. Strip digits, currency symbols, and punctuation
  cleaned = cleaned
    .replace(/[0-9₹$]/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>]/g, ' ')
    .trim();

  // 3. Single-word removals set
  const singleWordRemovals = new Set([
    ...CREDIT_KEYWORDS.filter(k => !k.includes(' ')),
    ...PAYMENT_KEYWORDS.filter(k => !k.includes(' ')),
    ...Array.from(STOP_WORDS),
    'total', 'baaki', 'kitna', 'balance', 'hisaab', 'hisab',
    'batao', 'tell me', 'kal', 'aaj', 'parso', 'yesterday', 'today',
    'ninne', 'netru', 'ninna', 'monne', 'indu', 'inru', 'pehle', 'ago',
    'diya', 'diye', 'mila', 'aaya', 'aaye', 'jama', 'paid', 'credit',
    'rupaye', 'rupees', 'rs', 're', 'inr', 'panam', 'hana', 'dabbu', 'roopayi', 'rupai',
    'ಎಷ್ಟು', 'ಬಾಕಿ', 'ಖಾತೆ', 'ಒಟ್ಟು ಬಾಕಿ', 'ಸಾಲ', 'ಕೊಟ್ಟ', 'ಕೊಟ್ಟರು', 'ಜಮಾ', 'ವಾಪಸ್',
    'மொத்தம்', 'மீதி', 'எவ்வளவு', 'கடன்', 'கொடுத்தார்', 'கொடுத்தேன்', 'வந்தது', 'ஜமா',
    'మొత్తం', 'బాకీ', 'ఎంత బాకీ', 'ఎంత', 'అప్పు', 'ఇచ్చారు', 'ఇచ్చాను', 'వచ్చింది', 'జమా',
    'बाकी', 'हिसाब', 'टोटल', 'कितना', 'उधार', 'जमा', 'मिला', 'आया', 'दिए', 'दिया', 'लिया', 'था', 'थी', 'थे', 'है', 'हैं', 'को', 'का', 'की', 'के', 'से', 'ने'
  ].map(w => w.toLowerCase()));

  // Split into tokens and filter out stopwords
  const tokens = cleaned
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => {
      if (t.length <= 1) return false;
      const lower = t.toLowerCase();
      if (singleWordRemovals.has(lower)) return false;
      if (/^\d+$/.test(lower)) return false;
      return true;
    });

  if (tokens.length === 0) {
    return { name: '', confidence: 0.5 };
  }

  // Format tokens: capitalize Latin words, leave native script intact
  const formatted = tokens
    .slice(0, 3)
    .map((tok) => {
      if (/^[a-zA-Z]+$/.test(tok)) {
        return tok.charAt(0).toUpperCase() + tok.slice(1).toLowerCase();
      }
      return tok;
    })
    .join(' ');

  const confidence = formatted.length >= 2 ? 0.95 : 0.60;
  return { name: formatted, confidence };
}

// ---------------------------------------------------------------------------
// 4. MULTI-ENTRY COMPOUND SENTENCE SPLITTING
// ---------------------------------------------------------------------------

/**
 * Splits a compound multi-entry transcript into individual transaction clauses.
 * Worked example: "Ramesh ka 340 udhaar, kal 200 diya tha"
 * -> Clause 1: "Ramesh ka 340 udhaar" (credit 340 today)
 * -> Clause 2: "kal 200 diya tha" (payment 200 yesterday)
 */
function splitCompoundClauses(transcript: string): string[] {
  // Check for common clause boundaries:
  // 1. Punctuation: commas, semicolons
  // 2. Conjunctions: aur, and, mattu, matrum, mariyu, plus, lekin
  const delimiterPattern = /[,;]|\b(?:aur|and|mattu|matrum|mariyu|plus|lekin)\b/i;

  if (delimiterPattern.test(transcript)) {
    const rawParts = transcript.split(delimiterPattern).map((p) => p.trim()).filter(Boolean);
    if (rawParts.length >= 2) {
      const partsWithAmounts = rawParts.filter((p) => extractAmounts(p).length > 0);
      if (partsWithAmounts.length >= 2) {
        return rawParts;
      }
    }
  }

  return [transcript];
}

// ---------------------------------------------------------------------------
// 5. MAIN PARSER FUNCTION: parseTranscript
// ---------------------------------------------------------------------------

/**
 * Parses spoken transcript into structured ledger result.
 * Offline, rule-based, pure TypeScript.
 * 
 * @param transcript Spoken text from speech-to-text
 * @param previousContext Optional previously parsed entry (for voice corrections)
 */
export async function parseTranscript(
  transcript: string,
  previousContext?: ParsedEntry | any
): Promise<ParsedTranscriptResult> {
  const trimmed = transcript.trim();
  const now = new Date();

  // Helper for constructing backward-compatible result object
  const buildResult = (
    intent: ParserIntent,
    entries: ParsedEntry[],
    confidence: number,
    extra: Partial<ParsedTranscriptResult> = {}
  ): ParsedTranscriptResult => {
    const primaryEntry: ParsedEntry = entries[0] || {
      customerName: extra.customerName || extra.queryCustomer || 'Customer',
      amount: extra.correctionAmount || 0,
      type: 'credit',
      date: now.toISOString(),
      confidence,
      rawTranscript: trimmed,
    };

    return {
      intent,
      type: intent,
      entries,
      data: primaryEntry,
      confidence,
      rawTranscript: trimmed,
      ...extra,
    };
  };

  if (!trimmed) {
    return buildResult('unknown', [], 0, {
      message: 'Kuch sunayi nahi diya (No speech heard)',
    });
  }

  const lower = trimmed.toLowerCase();

  // -------------------------------------------------------------------------
  // RULE 7: CONFIRM & CANCEL WORDS
  // -------------------------------------------------------------------------
  const cleanPunct = lower.replace(/[.,!?]/g, '').trim();
  if (CONFIRM_WORDS.has(cleanPunct)) {
    return buildResult('confirm', [], 0.95);
  }

  if (CANCEL_WORDS.has(cleanPunct)) {
    return buildResult('cancel', [], 0.95);
  }

  const amountsInText = extractAmounts(trimmed);
  if ((cleanPunct === 'nahi' || cleanPunct === 'no' || cleanPunct === 'reject') && amountsInText.length === 0) {
    return buildResult('cancel', [], 0.95);
  }

  // -------------------------------------------------------------------------
  // RULE 5: CORRECTIONS ("nahi 430", "sorry 500", "galat 350", "actually 600")
  // -------------------------------------------------------------------------
  const isCorrectionTrigger = CORRECTION_TRIGGERS.some((rgx) => rgx.test(lower));
  if (isCorrectionTrigger && amountsInText.length > 0) {
    const correctionAmt = amountsInText[0].value;
    const prevCust = previousContext?.customerName || '';
    const prevType = previousContext?.type || 'credit';
    const prevDate = previousContext?.date || now.toISOString();

    const correctedEntry: ParsedEntry = {
      customerName: prevCust || 'Customer',
      amount: correctionAmt,
      type: prevType,
      date: prevDate,
      confidence: 0.95,
      rawTranscript: trimmed,
      isLowConfidence: false,
    };

    return buildResult('correction', [correctedEntry], 0.95, {
      correctionAmount: correctionAmt,
      isCorrection: true,
      customerName: prevCust,
    });
  }

  // -------------------------------------------------------------------------
  // RULE: VOICE CUSTOMER REGISTRATION (F15)
  // e.g. "Naya customer Suresh, number 98450 12345", "Suresh ka number 9845012345 add karo"
  // -------------------------------------------------------------------------
  const REGISTER_PATTERNS = [
    /\b(?:naya|naye|new|add|register|create)\s+(?:customer|grahak|khata|account)\b/i,
    /\b(?:add|jodo|register)\s+(?:karo|kijiye|karna)\b/i,
    /\b(?:add|register)\s+customer\b/i,
    /\b(?:number|phone|mobile)\s+(?:add|save)\s+karo\b/i,
    /(?:नया\s+ग्राहक|नया\s+कस्टमर|नया\s+खाता|ऐड\s+करो|जोड़ो)/i,
    /(?:ಹೊಸ\s+ಗ್ರಾಹಕ|ಹೊಸ\s+ಕಸ್ಟಮರ್|ಸೇರಿಸಿ|ನೋಂದಾಯಿಸಿ)/i,
    /(?:புதிய\s+வாடிக்கையாளர்|சேர்க்கவும்)/i,
    /(?:కొత్త\s+కస్టమర్|కొత్త\s+ఖాతాదారు|చేర్చండి)/i,
  ];

  const isRegister = REGISTER_PATTERNS.some((rgx) => rgx.test(lower));
  if (isRegister) {
    // 1. Try to extract phone number from transcript
    const parsedPhone = parsePhoneNumber(trimmed);
    const phoneDigits = parsedPhone && parsedPhone.digits.length >= 10 ? parsedPhone.digits : undefined;

    // 2. Extract customer name by stripping register triggers, phone markers and digits
    let nameText = trimmed;
    for (const pat of REGISTER_PATTERNS) {
      nameText = nameText.replace(pat, ' ');
    }
    nameText = nameText.replace(/\b(?:number|phone|mobile|no|ka|ki|ko|hai|he|naam|name)\b/gi, ' ');
    nameText = nameText.replace(/(?:नंबर|फोन|मोबाइल|का|की|को|है|ಹೆಸರು|ನಂಬರ್|ಎನ್|எண்|నంబర్|నంబరు)/g, ' ');

    if (phoneDigits) {
      nameText = nameText.replace(new RegExp(phoneDigits, 'g'), ' ');
    }
    nameText = nameText.replace(/\+?91/g, ' ');
    nameText = nameText.replace(/\d+/g, ' ');

    const { name: rawName, confidence: nameConf } = extractCustomerName(nameText);
    const cleanCustomerName = rawName || 'Customer';

    const regEntry: ParsedEntry = {
      customerName: cleanCustomerName,
      amount: 0,
      type: 'credit',
      date: now.toISOString(),
      confidence: phoneDigits ? 0.95 : Math.max(0.85, nameConf),
      rawTranscript: trimmed,
    };

    return buildResult('register', [regEntry], phoneDigits ? 0.95 : Math.max(0.85, nameConf), {
      customerName: cleanCustomerName,
      name: cleanCustomerName,
      phone: phoneDigits,
    });
  }

  // -------------------------------------------------------------------------
  // RULE 6: BALANCE QUERIES ("Ramesh ka total?", "Ramesh ka baaki kitna")
  // -------------------------------------------------------------------------
  const isQuery = QUERY_PATTERNS.some((rgx) => rgx.test(lower));
  if (isQuery && amountsInText.length === 0) {
    const { name: queryCust, confidence: nameConf } = extractCustomerName(trimmed);
    const finalCust = queryCust || 'Customer';
    const confidence = Math.min(0.92, nameConf);

    return buildResult('query', [], confidence, {
      queryCustomer: finalCust,
      customerName: finalCust,
      queryType: 'balance',
    });
  }

  // -------------------------------------------------------------------------
  // RULE 3: MULTI-ENTRY SENTENCES ("Ramesh ka 340 udhaar, kal 200 diya tha")
  // -------------------------------------------------------------------------
  const clauses = splitCompoundClauses(trimmed);

  if (clauses.length >= 2) {
    const parsedEntries: ParsedEntry[] = [];
    let sharedCustomerName = '';
    let minClauseConfidence = 1.0;

    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
      const clauseAmounts = extractAmounts(clause);
      const amountVal = clauseAmounts[0]?.value || 0;
      const amountConf = clauseAmounts[0]?.confidence || 0.5;

      const dateMatch = resolveRelativeDate(clause, now);
      const entryDate = dateMatch ? dateMatch.date : now.toISOString();
      const relativeDateLabel = dateMatch?.label || (i === 0 ? 'aaj' : undefined);

      const { type: entryType, confidence: typeConf } = resolveDirection(clause);

      const consumedSpans = clauseAmounts.map((a) => ({ start: a.start, end: a.end }));
      const { name: clauseCust, confidence: custConf } = extractCustomerName(clause, consumedSpans);

      if (clauseCust && !sharedCustomerName) {
        sharedCustomerName = clauseCust;
      }

      const clauseConf = Math.min(amountConf, typeConf, custConf);
      minClauseConfidence = Math.min(minClauseConfidence, clauseConf);

      parsedEntries.push({
        customerName: clauseCust,
        amount: amountVal,
        type: entryType,
        date: entryDate,
        relativeDateLabel,
        confidence: clauseConf,
        rawTranscript: clause,
      });
    }

    // Inherit shared customer name for clauses that lack it
    for (const entry of parsedEntries) {
      if (!entry.customerName) {
        entry.customerName = sharedCustomerName || 'Customer';
      }
    }

    if (parsedEntries.length >= 2 && parsedEntries.every((e) => (e.amount || 0) > 0)) {
      const subEntries: ParsedSubEntry[] = parsedEntries.map((e, idx) => ({
        id: `sub-${idx + 1}`,
        amount: e.amount || 0,
        type: e.type || 'credit',
        date: e.date || now.toISOString(),
        relativeDateLabel: e.relativeDateLabel,
        note: e.type === 'credit' ? 'Udhaar' : 'Jama',
      }));

      const creditSum = parsedEntries
        .filter((e) => e.type === 'credit')
        .reduce((acc, e) => acc + (e.amount || 0), 0);
      const paymentSum = parsedEntries
        .filter((e) => e.type === 'payment')
        .reduce((acc, e) => acc + (e.amount || 0), 0);
      const net = creditSum - paymentSum;

      const compoundDetails: CompoundDetails = {
        creditAmount: creditSum,
        paymentAmount: paymentSum,
        netAmount: net,
        explanation: `₹${creditSum} udhaar - ₹${paymentSum} jama = Net ₹${net}`,
      };

      const primary = {
        ...parsedEntries[0],
        entries: subEntries,
        compoundDetails,
      };

      return buildResult('entry', parsedEntries, minClauseConfidence, {
        data: primary,
        isCompound: true,
        explanation: compoundDetails.explanation,
      });
    }
  }

  // -------------------------------------------------------------------------
  // RULE 1, 2, 4, 8: SINGLE ENTRY TRANSACTION
  // -------------------------------------------------------------------------
  const dateMatch = resolveRelativeDate(trimmed, now);
  const dateIso = dateMatch ? dateMatch.date : now.toISOString();
  const dateLabel = dateMatch?.label || 'aaj';
  const dateConf = dateMatch ? 0.95 : 0.90;

  // Mask out matched relative date text so number words in it (like "do" in "do din pehle") don't get extracted as transaction amount
  let textForAmounts = trimmed;
  if (dateMatch?.matchedText) {
    const escaped = dateMatch.matchedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    textForAmounts = trimmed.replace(new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, 'i'), ' ');
  }

  // Extract amounts using Indic Number Parser
  const extractedAmounts = extractAmounts(textForAmounts);
  const primaryAmount = extractedAmounts[0]?.value || 0;
  const amountConf = extractedAmounts[0]?.confidence || 0.4;

  // Resolve direction (credit vs payment)
  const { type: txType, confidence: typeConf } = resolveDirection(trimmed);

  // Extract customer name
  const consumedSpans = extractedAmounts.map((a) => ({ start: a.start, end: a.end }));
  const { name: custName, confidence: custConf } = extractCustomerName(trimmed, consumedSpans);
  const finalCustomer = custName || 'Grahak (Customer)';

  // Calculate field-level confidence; overall confidence is the minimum
  const overallConfidence = Math.min(amountConf, typeConf, custConf, dateConf);

  const isLowConf = overallConfidence < 0.70 || primaryAmount <= 0;
  let lowConfidenceField: 'amount' | 'customer' | 'type' | undefined = undefined;
  if (isLowConf) {
    if (amountConf < 0.70 || primaryAmount <= 0) lowConfidenceField = 'amount';
    else if (custConf < 0.70) lowConfidenceField = 'customer';
    else lowConfidenceField = 'type';
  }

  if (primaryAmount <= 0 && !custName) {
    return buildResult('unknown', [], 0, {
      message: 'Hisaab samajh nahi aaya. Kripya naam aur raashi dobara bolein.',
    });
  }

  const singleEntry: ParsedEntry = {
    customerName: finalCustomer,
    amount: primaryAmount,
    type: txType,
    date: dateIso,
    relativeDateLabel: dateLabel,
    confidence: overallConfidence,
    rawTranscript: trimmed,
    isLowConfidence: isLowConf,
    lowConfidenceField,
  };

  return buildResult('entry', [singleEntry], overallConfidence);
}
