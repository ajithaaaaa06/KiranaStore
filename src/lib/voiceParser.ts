/**
 * Smart Voice Parser for Kirana Ledgers
 * Handles Indic number words, code-mixed Hinglish/English/Kannada/Tamil/Telugu,
 * relative dates ('kal', 'parso'), self-corrections ('nahi, 430'),
 * and balance query intents ('Ramesh ka total?').
 */

import { ParsedVoiceCommand, TransactionType } from '../services/types';

// Indic & English spoken number words to numeric values
const NUMBER_WORDS: Record<string, number> = {
  // English
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
  
  // Hindi / Hinglish numbers
  ek: 1, do: 2, teen: 3, chaar: 4, char: 4, paanch: 5, panch: 5, chhah: 6, che: 6, saat: 7, aath: 8, ath: 8, nau: 9,
  das: 10, dus: 10, gyaarah: 11, baarah: 12, terah: 13, chaudah: 14, pandrah: 15, solah: 16,
  satrah: 17, athaarah: 18, unnees: 19, bees: 20, ikkis: 21, baais: 22, teees: 23, chaubees: 24,
  pachees: 25, chhabbees: 26, sattaais: 27, atthaais: 28, untees: 29, tees: 30, ikattees: 31,
  battis: 32, taintis: 33, chauntis: 34, paittees: 35, chattis: 36, saintis: 37, adhtis: 38,
  untaalis: 39, chaalis: 40, iktalis: 41, bayalis: 42, tetalis: 43, chavalis: 44, paintalis: 45,
  chhialis: 46, saintalis: 47, adhtalis: 48, unchaas: 49, pachaas: 50, pachas: 50,
  saath: 60, sath: 60, sattar: 70, assi: 80, nabbe: 90,
  sau: 100, so: 100,
  dedh: 150, // "dedh sau"
  dhai: 250, // "dhai sau"
  hazaar: 1000, hazar: 1000, hajar: 1000, k: 1000,

  // Kannada numbers
  ondu: 1, eradu: 2, mooru: 3, naalku: 4, aidu: 5, aaru: 6, elu: 7, entu: 8, ombhatthu: 9, hatthu: 10,
  ippatthu: 20, moovatthu: 30, naalvatthu: 40, aivatthu: 50, aravatthu: 60, eppatthu: 70, embhatthu: 80, thombhatthu: 90,
  nooru: 100, noora: 100, saavira: 1000,

  // Tamil numbers
  ondru: 1, irandu: 2, moondru: 3, naangu: 4, aindhu: 5, yezhu: 7, ettu: 8, onbadhu: 9, patthu: 10,
  irubadhu: 20, muppadhu: 30, naarpadhu: 40, aimbadhu: 50, arupadhu: 60, ezhubadhu: 70, enbadhu: 80, thonnooru: 90,
  nooru_ta: 100, aayiram: 1000,

  // Telugu numbers
  okati: 1, rendu: 2, moodu: 3, naalugu: 4, aidu_te: 5, yedu: 7, enimidi: 8, tommidi: 9, padi: 10,
  iravai: 20, muppai: 30, nalabhai: 40, yaabhai: 50, aravai: 60, debbhai: 70, enabhai: 80, tombhai: 90,
  vanda: 100, veyyi: 1000,
};

/**
 * Extracts a numeric amount from a spoken text containing digits or number words
 */
export function extractAmount(text: string): { amount?: number; remainingText: string } {
  let normalized = text.toLowerCase().trim();

  // Replace common Indic idiomatic compounds first
  normalized = normalized
    .replace(/\bdedh\s+(?:sau|so)\b/gi, '150')
    .replace(/\bdhai\s+(?:sau|so)\b/gi, '250')
    .replace(/\bdedh\s+(?:hazaar|hazar|hajar)\b/gi, '1500')
    .replace(/\bdhai\s+(?:hazaar|hazar|hajar)\b/gi, '2500')
    .replace(/\bsawa\s+(?:sau|so)\b/gi, '125')
    .replace(/\bpaune\s+(?:sau|so)\b/gi, '75');

  // 1. Direct Arabic digits (e.g. "500", "₹1200", "340.50", "430")
  const digitRegex = /(?:₹|rs\.?|rupees?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)/i;
  const digitMatch = normalized.match(digitRegex);
  if (digitMatch && digitMatch[1]) {
    const rawNum = digitMatch[1].replace(/,/g, '');
    const num = parseFloat(rawNum);
    if (!isNaN(num) && num > 0) {
      const remaining = normalized.replace(digitMatch[0], '').trim();
      return { amount: num, remainingText: remaining };
    }
  }

  // 2. Multi-word Indic numbers like "teen sau chaalis" (340), "paanch sau" (500), "ek hazaar" (1000)
  const tokens = normalized.split(/\s+/);
  let total = 0;
  let currentGroup = 0;
  const matchedTokens: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const cleanWord = tokens[i].replace(/[^a-z0-9_]/g, '');
    const val = NUMBER_WORDS[cleanWord];

    if (val !== undefined) {
      matchedTokens.push(tokens[i]);
      if (val === 1000) {
        currentGroup = (currentGroup === 0 ? 1 : currentGroup) * 1000;
        total += currentGroup;
        currentGroup = 0;
      } else if (val === 100) {
        currentGroup = (currentGroup === 0 ? 1 : currentGroup) * 100;
      } else if (cleanWord === 'dedh') {
        currentGroup = 150;
      } else if (cleanWord === 'dhai') {
        currentGroup = 250;
      } else {
        currentGroup += val;
      }
    } else {
      if (currentGroup > 0 || total > 0) {
        total += currentGroup;
        currentGroup = 0;
      }
    }
  }
  total += currentGroup;

  if (total > 0 && matchedTokens.length > 0) {
    let remaining = normalized;
    for (const t of matchedTokens) {
      remaining = remaining.replace(t, '');
    }
    return { amount: total, remainingText: remaining.trim() };
  }

  return { amount: undefined, remainingText: normalized };
}

/**
 * Checks for correction phrases: "nahi, 430", "sorry 500", "correction 350"
 */
function checkForCorrection(transcript: string): { isCorrection: boolean; correctedAmount?: number } {
  const lower = transcript.toLowerCase();
  const correctionTriggers = [
    /nahi[,]?\s*(\d+|[a-z\s]+)/i,
    /sorry[,]?\s*(\d+|[a-z\s]+)/i,
    /correction[,]?\s*(\d+|[a-z\s]+)/i,
    /badal\s+ke[,]?\s*(\d+|[a-z\s]+)/i,
    /change\s+to[,]?\s*(\d+|[a-z\s]+)/i,
    /no[,]?\s+(\d+)/i,
  ];

  for (const regex of correctionTriggers) {
    const match = lower.match(regex);
    if (match && match[1]) {
      const extracted = extractAmount(match[1]);
      if (extracted.amount) {
        return { isCorrection: true, correctedAmount: extracted.amount };
      }
    }
  }

  return { isCorrection: false };
}

/**
 * Checks for relative dates like "kal" (yesterday), "parso", "aaj"
 */
function extractRelativeDate(text: string): { date?: string; label?: string; textWithoutDate: string } {
  const lower = text.toLowerCase();
  const now = new Date();

  // "kal" or "yesterday" -> yesterday
  if (/\b(kal|yesterday|ninne|netru|ninna)\b/i.test(lower)) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const cleaned = lower.replace(/\b(kal|yesterday|ninne|netru|ninna)\b/gi, '').trim();
    return { date: yesterday.toISOString(), label: 'kal', textWithoutDate: cleaned };
  }

  // "parso" -> 2 days ago
  if (/\b(parso|day before yesterday)\b/i.test(lower)) {
    const parso = new Date(now);
    parso.setDate(now.getDate() - 2);
    const cleaned = lower.replace(/\b(parso|day before yesterday)\b/gi, '').trim();
    return { date: parso.toISOString(), label: 'parso', textWithoutDate: cleaned };
  }

  // "aaj" or "today" -> today
  if (/\b(aaj|today|indu|inru|ee roju)\b/i.test(lower)) {
    const cleaned = lower.replace(/\b(aaj|today|indu|inru|ee roju)\b/gi, '').trim();
    return { date: now.toISOString(), label: 'aaj', textWithoutDate: cleaned };
  }

  return { date: now.toISOString(), label: undefined, textWithoutDate: text };
}

/**
 * Determines transaction type: credit (udhaar) vs payment (jama)
 */
function determineTransactionType(text: string): TransactionType {
  const lower = text.toLowerCase();

  // Payment keywords (jama / paid / received / diya tha / diye)
  const paymentKeywords = [
    'jama', 'mila', 'aaya', 'aaye', 'diye', 'ne diye', 'ne diya', 'diya tha', 'de diya', 'paid', 'payment', 
    'received', 'clear', 'settled', 'hana bandide', 'panam vandhadhu', 'jama ayyindi',
    'chuka diya', 'vasool'
  ];

  for (const kw of paymentKeywords) {
    if (lower.includes(kw)) {
      return 'payment';
    }
  }

  // Default is credit / udhaar (shopkeepers most frequently record credit given)
  return 'credit';
}

/**
 * Checks if the utterance is a balance inquiry
 * e.g. "Ramesh ka total?", "Suresh ka kitna baaki hai?", "Pooja balance?"
 */
function isBalanceQuery(text: string): boolean {
  const lower = text.toLowerCase();
  const queryPatterns = [
    /\btotal\b/i,
    /\bbaaki\b/i,
    /\bkitna\b/i,
    /\bbalance\b/i,
    /\bhow much\b/i,
    /\bhisaab\b/i,
    /\bhisab\b/i,
    /\bbakki\b/i,
    /\botti baaki\b/i,
    /\bmottham baakee\b/i,
  ];

  return queryPatterns.some((pattern) => pattern.test(lower));
}

/**
 * Clean and extract customer name from the utterance
 */
function extractCustomerName(text: string): string {
  // Strip common filler words, markers, and prepositions
  let cleaned = text
    .replace(/\b(ko|ka|ke|ki|se|ne|gave|gave to|owes|credit|udhaar|jama|mila|diye|diya|tha|hai|rupaye|rs|cash|account|khata|total|baaki|kitna|yesterday|today|kal|parso)\b/gi, ' ')
    .replace(/[?,.!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Words that shouldn't be names
  const stopWords = ['please', 'bhai', 'ji', 'sir', 'madam', 'store', 'kirana', 'dokan'];
  const parts = cleaned.split(' ').filter(p => p.length > 1 && !stopWords.includes(p.toLowerCase()));

  if (parts.length > 0) {
    // Capitalize first letter of each part
    return parts
      .slice(0, 3)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  }

  return cleaned || 'Customer';
}

/**
 * Main parser function: converts spoken transcript to structured command
 */
export function parseVoiceTranscript(
  transcript: string,
  previousContext?: ParsedVoiceCommand
): ParsedVoiceCommand {
  const trimmed = transcript.trim();
  if (!trimmed) {
    return {
      rawTranscript: '',
      intent: 'unknown',
      confidence: 0,
    };
  }

  // 1. Check for immediate correction: "nahi, 430"
  const correction = checkForCorrection(trimmed);
  if (correction.isCorrection && previousContext && previousContext.customerName) {
    return {
      rawTranscript: trimmed,
      intent: 'correction',
      customerName: previousContext.customerName,
      amount: correction.correctedAmount || previousContext.amount,
      type: previousContext.type || 'credit',
      date: previousContext.date,
      confidence: 0.95,
      correctionOfPrevious: true,
    };
  }

  // 2. Check for balance inquiry: "Ramesh ka total?"
  if (isBalanceQuery(trimmed)) {
    const nameText = trimmed.replace(/\b(ka|ki|ke|ko|se|total|baaki|kitna|balance|hisaab|hisab|hai|batao|tell me)\b/gi, '').trim();
    const customerName = extractCustomerName(nameText);

    return {
      rawTranscript: trimmed,
      intent: 'query_balance',
      customerName: customerName || 'Ramesh',
      confidence: 0.9,
    };
  }

  // 2.5 Check for Compound Multi-clause entry:
  // e.g. "Ramesh ka 340 udhaar, kal 200 diya tha" -> 340 credit, 200 payment yesterday -> Net 140
  const lower = trimmed.toLowerCase();
  if (
    (lower.includes('udhaar') || lower.includes('credit')) &&
    (lower.includes('diya tha') || lower.includes('jama') || lower.includes('paid'))
  ) {
    const parts = lower.split(/[,;\s]+(?:aur|and)?\s*(?=kal|parso|\d+|[a-z]+ diya tha|jama)/i);
    if (parts.length >= 2 || lower.includes('kal') || lower.includes(',')) {
      // Find credit part and payment part
      const creditMatch = lower.match(/(?:(?:ka|ko)\s*)?(\d+|[a-z\s]+?)\s*(?:udhaar|credit)/i);
      const paymentMatch = lower.match(/(?:kal|parso|aaj)?\s*(\d+|[a-z\s]+?)\s*(?:diya tha|jama|mila|paid)/i);

      if (creditMatch && paymentMatch) {
        const creditAmt = extractAmount(creditMatch[1]).amount;
        const paymentAmt = extractAmount(paymentMatch[1]).amount;

        if (creditAmt && paymentAmt) {
          const net = creditAmt - paymentAmt;
          const cust = extractCustomerName(lower.replace(creditMatch[0], '').replace(paymentMatch[0], ''));

          return {
            rawTranscript: trimmed,
            intent: 'add_transaction',
            customerName: cust || 'Customer',
            amount: Math.max(0, net),
            type: net >= 0 ? 'credit' : 'payment',
            date: new Date().toISOString(),
            notes: `Spoken: ₹${creditAmt} udhaar, ₹${paymentAmt} diya tha (Net: ₹${Math.abs(net)})`,
            confidence: 0.96,
            compoundDetails: {
              creditAmount: creditAmt,
              paymentAmount: paymentAmt,
              netAmount: net,
              explanation: `₹${creditAmt} udhaar - ₹${paymentAmt} diya tha = Net ₹${net}`,
            },
          };
        }
      }
    }
  }

  // 3. Extract relative dates ("kal 200 diya tha")
  const { date, label: relativeDateLabel, textWithoutDate } = extractRelativeDate(trimmed);

  // 4. Extract amount
  const { amount, remainingText } = extractAmount(textWithoutDate);

  // 5. Determine credit vs payment
  const type = determineTransactionType(trimmed);

  // 6. Extract customer name
  const customerName = extractCustomerName(remainingText);

  const isValidAmount = amount !== undefined && amount > 0;
  const confidence = isValidAmount ? (customerName ? 0.92 : 0.75) : 0.4;

  return {
    rawTranscript: trimmed,
    intent: 'add_transaction',
    customerName: customerName || 'Grahak (Customer)',
    amount: amount || 0,
    type,
    date,
    relativeDateLabel,
    confidence,
  };
}
