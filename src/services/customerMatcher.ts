/**
 * Customer Matcher Service (/services/customerMatcher.ts)
 * 
 * Offline, pure TypeScript customer search, disambiguation, and duplicate detection:
 * 1. Name normalization: lowercase, strip honorifics (bhai, ji, anna, akka, sir, madam, aunty, uncle, shri),
 *    collapse repeated vowels/consonants, and transliterate native scripts (Devanagari, Kannada, Tamil, Telugu).
 * 2. Fuzzy matching: Levenshtein distance + Jaro-Winkler similarity.
 * 3. Indian phonetic key: Soundex variant adapted for Indian names (Ramesh/Ramesha/Rameshh).
 * 4. Ranked candidate scoring with thresholds:
 *    - ≥ 0.92: auto_select (if single clear match)
 *    - 0.60 - 0.92: disambiguate (show disambiguation sheet with candidate options)
 *    - < 0.60: create_new (offer "Add new customer")
 * 5. Partial name matching: "Ramesh" matches both "Ramesh Kumar" and "Ramesh Gowda".
 * 6. isDuplicateEntry: checks for duplicate (same customer + amount + type) within 10 minutes.
 */

import { Customer, LedgerEntry, TransactionType, LanguageCode } from './types';
import { extractDigitSequence } from './phoneParser';

// ---------------------------------------------------------------------------
// 1. HONORIFICS LIST
// ---------------------------------------------------------------------------

const HONORIFICS = new Set([
  'bhai', 'ji', 'anna', 'akka', 'sir', 'madam', 'aunty', 'auntie',
  'uncle', 'shri', 'sri', 'shree', 'garu', 'avargal', 'sahab',
  'saheb', 'seth', 'sethji', 'didi', 'bhabhi', 'chettan', 'chechi'
]);

// ---------------------------------------------------------------------------
// 2. COMPACT INDIC TRANSLITERATION TABLE
// ---------------------------------------------------------------------------

// Maps Devanagari, Kannada, Tamil, and Telugu Unicode code points to Latin
interface IndicCharMap {
  vowels: Record<number, string>;
  matras: Record<number, string>;
  consonants: Record<number, string>;
  halant: number;
  anusvara: number;
  visarga: number;
}

// Devanagari (0x0900 - 0x097F)
const DEVANAGARI_MAP: IndicCharMap = {
  halant: 0x094D,
  anusvara: 0x0902,
  visarga: 0x0903,
  vowels: {
    0x0905: 'a', 0x0906: 'a', 0x0907: 'i', 0x0908: 'i',
    0x0909: 'u', 0x090A: 'u', 0x090B: 'ri', 0x090F: 'e',
    0x0910: 'ai', 0x0913: 'o', 0x0914: 'au',
  },
  matras: {
    0x093E: 'a', 0x093F: 'i', 0x0940: 'i', 0x0941: 'u',
    0x0942: 'u', 0x0943: 'ri', 0x0947: 'e', 0x0948: 'ai',
    0x094B: 'o', 0x094C: 'au',
  },
  consonants: {
    0x0915: 'k', 0x0916: 'kh', 0x0917: 'g', 0x0918: 'gh', 0x0919: 'ng',
    0x091A: 'ch', 0x091B: 'chh', 0x091C: 'j', 0x091D: 'jh', 0x091E: 'ny',
    0x091F: 't', 0x0920: 'th', 0x0921: 'd', 0x0922: 'dh', 0x0923: 'n',
    0x0924: 't', 0x0925: 'th', 0x0926: 'd', 0x0927: 'dh', 0x0928: 'n',
    0x092A: 'p', 0x092B: 'ph', 0x092C: 'b', 0x092D: 'bh', 0x092E: 'm',
    0x092F: 'y', 0x0930: 'r', 0x0932: 'l', 0x0935: 'v', 0x0936: 'sh',
    0x0937: 'sh', 0x0938: 's', 0x0939: 'h', 0x0958: 'q', 0x0959: 'kh',
    0x095A: 'gh', 0x095B: 'z', 0x095C: 'r', 0x095D: 'rh', 0x095E: 'f',
  },
};

// Kannada (0x0C80 - 0x0CFF)
const KANNADA_MAP: IndicCharMap = {
  halant: 0x0CCD,
  anusvara: 0x0C82,
  visarga: 0x0C83,
  vowels: {
    0x0C85: 'a', 0x0C86: 'a', 0x0C87: 'i', 0x0C88: 'i',
    0x0C89: 'u', 0x0C8A: 'u', 0x0C8B: 'ri', 0x0C8E: 'e',
    0x0C8F: 'e', 0x0C90: 'ai', 0x0C92: 'o', 0x0C93: 'o', 0x0C94: 'au',
  },
  matras: {
    0x0CBE: 'a', 0x0CBF: 'i', 0x0CC0: 'i', 0x0CC1: 'u',
    0x0CC2: 'u', 0x0CC3: 'ri', 0x0CC6: 'e', 0x0CC7: 'e',
    0x0CC8: 'ai', 0x0CCA: 'o', 0x0CCB: 'o', 0x0CCC: 'au',
  },
  consonants: {
    0x0C95: 'k', 0x0C96: 'kh', 0x0C97: 'g', 0x0C98: 'gh', 0x0C99: 'ng',
    0x0C9A: 'ch', 0x0C9B: 'chh', 0x0C9C: 'j', 0x0C9D: 'jh', 0x0C9E: 'ny',
    0x0C9F: 't', 0x0CA0: 'th', 0x0CA1: 'd', 0x0CA2: 'dh', 0x0CA3: 'n',
    0x0CA4: 't', 0x0CA5: 'th', 0x0CA6: 'd', 0x0CA7: 'dh', 0x0CA8: 'n',
    0x0CAA: 'p', 0x0CAB: 'ph', 0x0CAC: 'b', 0x0CAD: 'bh', 0x0CAE: 'm',
    0x0CAF: 'y', 0x0CB0: 'r', 0x0CB1: 'r', 0x0CB2: 'l', 0x0CB3: 'l',
    0x0CB5: 'v', 0x0CB6: 'sh', 0x0CB7: 'sh', 0x0CB8: 's', 0x0CB9: 'h',
  },
};

// Tamil (0x0B80 - 0x0BFF)
const TAMIL_MAP: IndicCharMap = {
  halant: 0x0BCD,
  anusvara: 0x0B82,
  visarga: 0x0B83,
  vowels: {
    0x0B85: 'a', 0x0B86: 'a', 0x0B87: 'i', 0x0B88: 'i',
    0x0B89: 'u', 0x0B8A: 'u', 0x0B8E: 'e', 0x0B8F: 'e',
    0x0B90: 'ai', 0x0B92: 'o', 0x0B93: 'o', 0x0B94: 'au',
  },
  matras: {
    0x0BBE: 'a', 0x0BBF: 'i', 0x0BC0: 'i', 0x0BC1: 'u',
    0x0BC2: 'u', 0x0BC6: 'e', 0x0BC7: 'e', 0x0BC8: 'ai',
    0x0BCA: 'o', 0x0BCB: 'o', 0x0BCC: 'au',
  },
  consonants: {
    0x0B95: 'k', 0x0B99: 'ng', 0x0B9A: 's', 0x0B9E: 'ny',
    0x0B9F: 't', 0x0BA3: 'n', 0x0BA4: 't', 0x0BA8: 'n',
    0x0BAA: 'p', 0x0BAE: 'm', 0x0BAF: 'y', 0x0BB0: 'r',
    0x0BB1: 'r', 0x0BB2: 'l', 0x0BB3: 'l', 0x0BB4: 'zh',
    0x0BB5: 'v', 0x0BB6: 'sh', 0x0BB7: 'sh', 0x0BB8: 's',
    0x0BB9: 'h', 0x0BA9: 'n', 0x0B9C: 'j',
  },
};

// Telugu (0x0C00 - 0x0C7F)
const TELUGU_MAP: IndicCharMap = {
  halant: 0x0C4D,
  anusvara: 0x0C02,
  visarga: 0x0C03,
  vowels: {
    0x0C05: 'a', 0x0C06: 'a', 0x0C07: 'i', 0x0C08: 'i',
    0x0C09: 'u', 0x0C0A: 'u', 0x0C0B: 'ri', 0x0C0E: 'e',
    0x0C0F: 'e', 0x0C10: 'ai', 0x0C12: 'o', 0x0C13: 'o', 0x0C14: 'au',
  },
  matras: {
    0x0C3E: 'a', 0x0C3F: 'i', 0x0C40: 'i', 0x0C41: 'u',
    0x0C42: 'u', 0x0C46: 'e', 0x0C47: 'e', 0x0C48: 'ai',
    0x0C4A: 'o', 0x0C4B: 'o', 0x0C4C: 'au',
  },
  consonants: {
    0x0C15: 'k', 0x0C16: 'kh', 0x0C17: 'g', 0x0C18: 'gh', 0x0C19: 'ng',
    0x0C1A: 'ch', 0x0C1B: 'chh', 0x0C1C: 'j', 0x0C1D: 'jh', 0x0C1E: 'ny',
    0x0C1F: 't', 0x0C20: 'th', 0x0C21: 'd', 0x0C22: 'dh', 0x0C23: 'n',
    0x0C24: 't', 0x0C25: 'th', 0x0C26: 'd', 0x0C27: 'dh', 0x0C28: 'n',
    0x0C2A: 'p', 0x0C2B: 'ph', 0x0C2C: 'b', 0x0C2D: 'bh', 0x0C2E: 'm',
    0x0C2F: 'y', 0x0C30: 'r', 0x0C31: 'r', 0x0C32: 'l', 0x0C33: 'l',
    0x0C35: 'v', 0x0C36: 'sh', 0x0C37: 'sh', 0x0C38: 's', 0x0C39: 'h',
  },
};

function getIndicScriptMap(code: number): IndicCharMap | null {
  if (code >= 0x0900 && code <= 0x097F) return DEVANAGARI_MAP;
  if (code >= 0x0C80 && code <= 0x0CFF) return KANNADA_MAP;
  if (code >= 0x0B80 && code <= 0x0BFF) return TAMIL_MAP;
  if (code >= 0x0C00 && code <= 0x0C7F) return TELUGU_MAP;
  return null;
}

/**
 * Transliterates Devanagari, Kannada, Tamil, and Telugu text to Latin characters.
 * Accurately handles consonants, halants, matras, anusvara, and Indian schwa deletion.
 */
export function transliterateIndicToLatin(text: string): string {
  if (!text) return '';
  // Normalize common Indic auspicious prefixes / honorifics in names (Shri / Sri)
  let working = text
    .replace(/[శशಶஶ]్రీ/g, 'sri')
    .replace(/[शశಶஶ]्रि/g, 'sri');

  let result = '';

  for (let i = 0; i < working.length; i++) {
    const code = working.charCodeAt(i);
    const scriptMap = getIndicScriptMap(code);

    if (!scriptMap) {
      result += working.charAt(i);
      continue;
    }

    // 1. Independent Vowels
    if (scriptMap.vowels[code]) {
      result += scriptMap.vowels[code];
      continue;
    }

    // 2. Anusvara / Chandrabindu
    if (code === scriptMap.anusvara || code === 0x0901) {
      result += 'n';
      continue;
    }

    // 3. Visarga
    if (code === scriptMap.visarga) {
      result += 'h';
      continue;
    }

    // 4. Consonant
    let cons = scriptMap.consonants[code];
    if (cons) {
      // Special Tamil phonetic rule: intervocalic க (k) is voiced as 'g' (e.g. முருகன் -> Murugan)
      if (code === 0x0B95 && result.length > 0) {
        const lastChar = result.charAt(result.length - 1);
        if (/[aeiour]/.test(lastChar)) {
          cons = 'g';
        }
      }

      const nextCode = i + 1 < working.length ? working.charCodeAt(i + 1) : 0;
      const isNextHalant = nextCode === scriptMap.halant;
      const nextMatra = scriptMap.matras[nextCode];

      if (isNextHalant) {
        result += cons;
        i++; // skip halant
      } else if (nextMatra) {
        result += cons + nextMatra;
        i++; // skip matra
      } else {
        // Consonant followed by another letter, space, or end of word
        // In modern Indic names, word-final consonant drops inherent 'a'
        const isEndOfWord = i + 1 >= working.length || /\s|[.,!?]/.test(working.charAt(i + 1));
        if (isEndOfWord) {
          result += cons;
        } else {
          result += cons + 'a';
        }
      }
      continue;
    }

    // 5. Standalone matra (rare fallback)
    if (scriptMap.matras[code]) {
      result += scriptMap.matras[code];
      continue;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 3. NAME NORMALIZATION
// ---------------------------------------------------------------------------

/**
 * Normalises a customer name:
 * 1. Strips parenthetical descriptors like "(Plumber)", "(Electrician)"
 * 2. Transliterates native scripts (Devanagari, Kannada, Tamil, Telugu) to Latin
 * 3. Lowercases and strips punctuation
 * 4. Strips honorifics (bhai, ji, anna, akka, sir, madam, aunty, uncle, shri)
 * 5. Collapses repeated vowels (aa->a, ee->e, oo->u, ii->i, uu->u)
 * 6. Collapses repeated consonants (Rameshh -> ramesh)
 */
export function normalizeName(name: string): string {
  if (!name) return '';

  // 1. Remove parenthetical descriptions
  let s = name.replace(/\([^)]*\)/g, ' ');

  // 2. Transliterate native Indic scripts
  s = transliterateIndicToLatin(s);

  // 3. Lowercase & strip non-alphanumeric punctuation
  s = s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  // 4. Tokenize and filter out honorifics
  const tokens = s.split(/\s+/).filter(Boolean);
  const filteredTokens = tokens.filter((tok) => !HONORIFICS.has(tok));
  const base = filteredTokens.length > 0 ? filteredTokens.join(' ') : tokens.join(' ');

  // 5. Collapse repeated vowels: aa->a, ee->e, oo->u, ii->i, uu->u
  let collapsed = base
    .replace(/aa+/g, 'a')
    .replace(/ee+/g, 'e')
    .replace(/ii+/g, 'i')
    .replace(/oo+/g, 'u')
    .replace(/uu+/g, 'u');

  // 6. Collapse repeated consonants (e.g. "Rameshh" -> "ramesh", "Sureesh" -> "suresh")
  collapsed = collapsed.replace(/([b-df-hj-np-tv-z])\1+/g, '$1');

  return collapsed.trim();
}

// ---------------------------------------------------------------------------
// 4. INDIAN PHONETIC KEY (Soundex Variant for Indian Names)
// ---------------------------------------------------------------------------

/**
 * Computes an Indian phonetic key (Soundex-like code tailored for Indian names).
 * Maps phonetic variations like:
 * - Ramesh / Ramesha / Rameshh / ರಮೇಶ್ / ரமேஷ் / రమేష్ -> RMS
 * - Suresh / Sureesh -> SRS
 * - Venkatesh / Wenkatesh -> VNTS
 * - Pooja / Puja -> PJ
 */
export function getIndianPhoneticKey(name: string): string {
  const norm = normalizeName(name);
  if (!norm) return '';

  // Take first word of the name for primary phonetic indexing
  let word = norm.split(/\s+/)[0] || '';
  if (!word) return '';

  // Indian phonetic transformations
  word = word
    .replace(/ph/g, 'f')
    .replace(/bh/g, 'b')
    .replace(/dh/g, 'd')
    .replace(/th/g, 't')
    .replace(/kh/g, 'k')
    .replace(/gh/g, 'g')
    .replace(/ch/g, 's')
    .replace(/sh/g, 's')
    .replace(/w/g, 'v')
    .replace(/z/g, 's')
    .replace(/c([eiy])/g, 's$1')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks');

  // Strip trailing vowels/endings common in Indic speech (a, h, an, ar)
  word = word.replace(/(?:a|h|an|ar)$/g, '');

  if (word.length === 0) return '';

  const firstChar = word.charAt(0).toUpperCase();

  // Consonant mapping
  const charCode = (c: string): string => {
    switch (c) {
      case 'b': case 'f': case 'p': case 'v':
        return '1';
      case 'c': case 'g': case 'j': case 'k': case 'q': case 's': case 'x': case 'z':
        return '2';
      case 'd': case 't':
        return '3';
      case 'l':
        return '4';
      case 'm': case 'n':
        return '5';
      case 'r':
        return '6';
      default:
        return '0'; // vowels and h, w
    }
  };

  let code = firstChar;
  let prevCode = charCode(word.charAt(0));

  for (let i = 1; i < word.length; i++) {
    const curCode = charCode(word.charAt(i));
    if (curCode !== '0' && curCode !== prevCode) {
      code += curCode;
      prevCode = curCode;
    }
  }

  // Pad or trim to 4 characters
  return (code + '000').slice(0, 4);
}

// ---------------------------------------------------------------------------
// 5. FUZZY MATCHING ALGORITHMS (Levenshtein & Jaro-Winkler)
// ---------------------------------------------------------------------------

/**
 * Standard Levenshtein edit distance
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: a.length + 1 }, (_, i) => i);

  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      const val = b.charAt(i - 1) === a.charAt(j - 1)
        ? row[j - 1]
        : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
}

/**
 * Normalized Levenshtein similarity [0.0, 1.0]
 */
export function levenshteinSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(a, b);
  return Math.max(0, 1 - dist / maxLen);
}

/**
 * Jaro distance algorithm [0.0, 1.0]
 */
export function jaroSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0.0;

  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1).fill(false);
  const s2Matches = new Array(len2).fill(false);

  let matches = 0;
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);
    for (let j = start; j < end; j++) {
      if (s2Matches[j]) continue;
      if (s1.charAt(i) !== s2.charAt(j)) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1.charAt(i) !== s2.charAt(k)) {
      transpositions++;
    }
    k++;
  }

  const m = matches;
  return (m / len1 + m / len2 + (m - transpositions / 2) / m) / 3.0;
}

/**
 * Jaro-Winkler similarity algorithm [0.0, 1.0]
 * Rewards common prefixes up to 4 characters.
 */
export function jaroWinklerSimilarity(s1: string, s2: string, prefixScale = 0.1): number {
  const jaro = jaroSimilarity(s1, s2);
  if (jaro < 0.7) return jaro;

  let prefix = 0;
  const maxPrefix = Math.min(4, Math.min(s1.length, s2.length));
  for (let i = 0; i < maxPrefix; i++) {
    if (s1.charAt(i) === s2.charAt(i)) {
      prefix++;
    } else {
      break;
    }
  }

  return jaro + prefix * prefixScale * (1 - jaro);
}

// ---------------------------------------------------------------------------
// 5. COMBINED MATCH SCORING
// ---------------------------------------------------------------------------

export type CustomerMatchType = 'exact' | 'partial' | 'phonetic' | 'fuzzy' | 'phone';

export interface CustomerMatchCandidate {
  customer: Customer;
  score: number;
  matchType: CustomerMatchType;
}

export interface CustomerMatchResult {
  action: 'auto_select' | 'disambiguate' | 'create_new';
  candidates: CustomerMatchCandidate[];
  selectedCustomer: Customer | null;
  topScore: number;
}

/**
 * Computes a comprehensive match score between a search query and a customer record.
 */
export function computeCustomerMatchScore(
  query: string,
  customer: Customer
): { score: number; matchType: CustomerMatchType } {
  const rawQuery = query.trim();
  if (!rawQuery) return { score: 0, matchType: 'fuzzy' };

  // 1. Phone number match
  const cleanPhoneQuery = rawQuery.replace(/[^0-9]/g, '');
  if (cleanPhoneQuery.length >= 4 && customer.phone) {
    const cleanCustomerPhone = customer.phone.replace(/[^0-9]/g, '');
    if (cleanCustomerPhone.includes(cleanPhoneQuery) || cleanPhoneQuery === cleanCustomerPhone) {
      return { score: 1.0, matchType: 'phone' };
    }
  }

  const normQuery = normalizeName(rawQuery);
  const normCustomer = normalizeName(customer.name);

  // 2. Exact match on normalized name (case/script/honorific insensitive)
  if (normQuery === normCustomer) {
    return { score: 1.0, matchType: 'exact' };
  }

  // 3. Partial Token Match (e.g. "Ramesh" in "Ramesh Kumar" or "Ramesh Gowda")
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);
  const customerTokens = normCustomer.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 1 && customerTokens.length > 1) {
    const singleQuery = queryTokens[0];
    const tokenMatch = customerTokens.some((tok) => tok === singleQuery);
    if (tokenMatch) {
      // Partial name matches receive 0.90 so that:
      // a) It qualifies as a strong match (>0.60)
      // b) Multiple candidates trigger the disambiguation sheet (0.60 - 0.92)
      return { score: 0.90, matchType: 'partial' };
    }
  }

  if (queryTokens.length > 1 && customerTokens.length >= queryTokens.length) {
    const allTokensMatch = queryTokens.every((qTok) =>
      customerTokens.some((cTok) => cTok === qTok || jaroWinklerSimilarity(qTok, cTok) >= 0.90)
    );
    if (allTokensMatch) {
      return { score: 0.94, matchType: 'partial' };
    }
  }

  // 4. Phonetic Key Match (e.g. Ramesh / Ramesha / Rameshh)
  let hasPhoneticMatch = false;
  if (queryTokens.length === customerTokens.length) {
    const queryPhonetic = queryTokens.map(getIndianPhoneticKey).join('-');
    const customerPhonetic = customerTokens.map(getIndianPhoneticKey).join('-');
    hasPhoneticMatch = Boolean(queryPhonetic && queryPhonetic === customerPhonetic);
  } else if (queryTokens.length === 1) {
    const qPhonetic = getIndianPhoneticKey(queryTokens[0]);
    hasPhoneticMatch = customerTokens.some((cTok) => getIndianPhoneticKey(cTok) === qPhonetic);
  }

  // 5. String Similarity (Jaro-Winkler + Levenshtein)
  const jwSim = jaroWinklerSimilarity(normQuery, normCustomer);
  const levSim = levenshteinSimilarity(normQuery, normCustomer);

  let combinedScore = 0.65 * jwSim + 0.35 * levSim;

  if (hasPhoneticMatch) {
    // Phonetic bonus brings close phonetic matches like Ramesha -> Ramesh to >= 0.93
    combinedScore = Math.max(combinedScore, 0.93);
    return { score: Math.min(0.99, Number(combinedScore.toFixed(2))), matchType: 'phonetic' };
  }

  return {
    score: Number(combinedScore.toFixed(2)),
    matchType: 'fuzzy',
  };
}

// ---------------------------------------------------------------------------
// 6. MAIN FIND CUSTOMERS (Thresholds & Disambiguation)
// ---------------------------------------------------------------------------

/**
 * Finds matching customers ranked by score with decision thresholds:
 * - ≥ 0.92: auto_select (if single clear match)
 * - 0.60 - 0.92: disambiguate (shows disambiguation sheet)
 * - < 0.60: create_new (offer "Add new customer")
 * 
 * When partial names match multiple candidates (e.g. "Ramesh" -> "Ramesh Kumar" & "Ramesh Gowda"),
 * returns both candidates with action 'disambiguate'.
 */
export function findCustomers(
  query: string,
  customers: Customer[]
): CustomerMatchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      action: 'create_new',
      candidates: [],
      selectedCustomer: null,
      topScore: 0,
    };
  }

  // Score all customers
  const ranked: CustomerMatchCandidate[] = [];
  for (const c of customers) {
    const { score, matchType } = computeCustomerMatchScore(trimmed, c);
    if (score >= 0.55) {
      ranked.push({ customer: c, score, matchType });
    }
  }

  // Sort by score descending, then by customer balance descending
  ranked.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.customer.balance - a.customer.balance;
  });

  if (ranked.length === 0 || ranked[0].score < 0.60) {
    return {
      action: 'create_new',
      candidates: ranked,
      selectedCustomer: null,
      topScore: ranked[0]?.score || 0,
    };
  }

  const topCandidate = ranked[0];
  const runnerUp = ranked[1];

  // Check if spoken query is a single first name shared by several customers
  const queryTokens = normalizeName(trimmed).split(/\s+/).filter(Boolean);
  const isSharedFirstName =
    queryTokens.length === 1 &&
    ranked.filter((r) =>
      normalizeName(r.customer.name).split(/\s+/).includes(queryTokens[0])
    ).length >= 2;

  // Single clear winner ≥ 0.92:
  // Must NOT be a shared first name (e.g. "Ramesh" with Ramesh Kumar and Ramesh Gowda),
  // and either no runner-up or lead > 0.10 over runner-up.
  if (topCandidate.score >= 0.92 && !isSharedFirstName) {
    if (!runnerUp || topCandidate.score - runnerUp.score > 0.10) {
      return {
        action: 'auto_select',
        candidates: ranked,
        selectedCustomer: topCandidate.customer,
        topScore: topCandidate.score,
      };
    }
  }

  // Disambiguate when multiple candidates are close (within 0.10) or score is in 0.60 - 0.92 range or shared first name
  return {
    action: 'disambiguate',
    candidates: ranked,
    selectedCustomer: topCandidate.customer,
    topScore: topCandidate.score,
  };
}

// ---------------------------------------------------------------------------
// 7. DUPLICATE TRANSACTION DETECTION
// ---------------------------------------------------------------------------

export interface DuplicateCheckEntry {
  customerId?: string;
  customerName?: string;
  amount: number;
  type: TransactionType;
  date?: string;
}

/**
 * Checks if a transaction is a duplicate:
 * Same customer + same amount + same type within 10 minutes (default 600,000 ms).
 */
export function isDuplicateEntry(
  entry: DuplicateCheckEntry,
  existingEntries: LedgerEntry[],
  withinMs: number = 600000 // 10 minutes
): boolean {
  if (!entry || !entry.amount) return false;

  const targetName = entry.customerName ? normalizeName(entry.customerName) : '';
  const targetId = entry.customerId || '';
  const entryTime = entry.date ? new Date(entry.date).getTime() : Date.now();

  return existingEntries.some((existing) => {
    // 1. Amount match
    if (Math.abs(existing.amount - entry.amount) >= 0.01) {
      return false;
    }

    // 2. Type match
    if (existing.type !== entry.type) {
      return false;
    }

    // 3. Time match (within 10 minutes)
    const existingTime = new Date(existing.date || existing.createdAt).getTime();
    if (Math.abs(entryTime - existingTime) > withinMs) {
      return false;
    }

    // 4. Customer match (by ID or normalized name or phonetic match)
    if (targetId && existing.customerId === targetId) {
      return true;
    }

    const existingNormName = normalizeName(existing.customerName || '');
    if (targetName && existingNormName) {
      if (targetName === existingNormName) return true;
      if (jaroWinklerSimilarity(targetName, existingNormName) >= 0.90) return true;
    }

    return false;
  });
}

// ---------------------------------------------------------------------------
// 8. F16: DISAMBIGUATION RESOLUTION (PHONE SUFFIX, NAME, ORDINALS)
// ---------------------------------------------------------------------------

export interface OrdinalMapping {
  index: number;
  words: string[];
}

export const ORDINAL_MAP: OrdinalMapping[] = [
  {
    index: 0, // First / Pehla
    words: [
      'first', '1st', 'one', 'pehla', 'pehli', 'pehle', 'ek', 'number one',
      'modala', 'modalane', 'modalaneya', 'ondu', 'ಮೊದಲ', 'ಮೊದಲನೆಯ', 'ಒಂದು',
      'mudal', 'mudhal', 'mudhalaavathu', 'onnu', 'ஒன்று', 'முதல்', 'முதலாவது',
      'modati', 'modata', 'okati', 'మొదటి', 'ఒకటి'
    ],
  },
  {
    index: 1, // Second / Doosra
    words: [
      'second', '2nd', 'two', 'doosra', 'doosri', 'doosre', 'do', 'number two',
      'eradu', 'eradane', 'eradaneya', 'ಎರಡನೆಯ', 'ಎರಡು',
      'irandavathu', 'irandu', 'இரண்டாவது', 'இரண்டு',
      'rendava', 'rendu', 'రెండవ', 'రెండు'
    ],
  },
  {
    index: 2, // Third / Teesra
    words: [
      'third', '3rd', 'three', 'teesra', 'teesri', 'teesre', 'teen',
      'muru', 'murane', 'muraneya', 'ಮೂರನೆಯ', 'ಮೂರು',
      'moondravathu', 'moondru', 'மூன்றாவது', 'மூன்று',
      'moodava', 'moodu', 'మూడవ', 'మూడు'
    ],
  },
  {
    index: 3, // Fourth / Chautha
    words: [
      'fourth', '4th', 'four', 'chautha', 'chauthi', 'chauthe', 'char',
      'nalku', 'naalku', 'nalkane', 'nalkaneya', 'ನಾಲ್ಕನೆಯ', 'ನಾಲ್ಕು',
      'naangavathu', 'naangu', 'நான்காவது', 'நான்கு',
      'naalgava', 'naalugu', 'నాలుగవ', 'నాలుగు'
    ],
  },
];

export type DisambiguationResolution =
  | {
      status: 'matched';
      customer: Customer;
      method: 'digits' | 'name' | 'ordinal';
      matchedValue: string;
    }
  | {
      status: 'need_more_digits';
      digitsNeeded: number;
      matchingCandidates: Customer[];
    }
  | {
      status: 'no_match';
      rawQuery: string;
    };

/**
 * Resolves which candidate customer the shopkeeper intended:
 * 1. Spoken digits suffix (last 4 digits in any of 5 languages via phoneParser)
 * 2. Fuller name ("Ramesh Gowda") or surname / distinctive token ("Gowda", "Kumar", "Plumber")
 * 3. Ordinals ("pehla", "doosra", "first", "second", Kannada, Tamil, Telugu)
 * 4. Two candidates sharing same last 4 digits -> requests 6 digits (need_more_digits)
 */
export function resolveDisambiguationChoice(
  speechTranscript: string,
  candidates: Customer[],
  language: LanguageCode = 'hi',
  requiredDigitsCount: number = 4
): DisambiguationResolution {
  const trimmed = speechTranscript.trim();
  if (!trimmed || candidates.length === 0) {
    return { status: 'no_match', rawQuery: speechTranscript };
  }

  // 1. Spoken / Typed digits matching
  const extractedDigits = extractDigitSequence(trimmed);
  if (extractedDigits.length >= 3) {
    const targetSuffix = extractedDigits.slice(-requiredDigitsCount);

    const suffixMatches = candidates.filter((c) => {
      if (!c.phone) return false;
      const cleanPhone = c.phone.replace(/\D/g, '');
      return (
        cleanPhone.endsWith(targetSuffix) ||
        cleanPhone.endsWith(extractedDigits) ||
        (extractedDigits.length <= cleanPhone.length && cleanPhone.endsWith(extractedDigits)) ||
        (cleanPhone.length >= targetSuffix.length && extractedDigits.endsWith(cleanPhone.slice(-requiredDigitsCount)))
      );
    });

    if (suffixMatches.length === 1) {
      return {
        status: 'matched',
        customer: suffixMatches[0],
        method: 'digits',
        matchedValue: targetSuffix,
      };
    }

    if (suffixMatches.length > 1) {
      // Two candidates share the same last 4 digits
      // Ask for last 6 digits, then full number. Never choose silently.
      if (requiredDigitsCount < 10) {
        const nextDigits = requiredDigitsCount === 4 ? 6 : 10;
        return {
          status: 'need_more_digits',
          digitsNeeded: nextDigits,
          matchingCandidates: suffixMatches,
        };
      } else {
        // At 10 digits (full phone), check exact match
        const exact = suffixMatches.find((c) => c.phone?.replace(/\D/g, '') === extractedDigits);
        if (exact) {
          return {
            status: 'matched',
            customer: exact,
            method: 'digits',
            matchedValue: extractedDigits,
          };
        }
        return {
          status: 'need_more_digits',
          digitsNeeded: 10,
          matchingCandidates: suffixMatches,
        };
      }
    }

    // If pure digits were spoken (4+ digits) but matched zero candidates:
    if (extractedDigits.length >= 4) {
      return { status: 'no_match', rawQuery: speechTranscript };
    }
  }

  // 2. Ordinals matching
  const normSpeech = normalizeName(trimmed);
  const speechTokens = normSpeech.split(/\s+/).filter(Boolean);

  for (const ord of ORDINAL_MAP) {
    const isOrdinalMatch = ord.words.some((word) => {
      const normWord = normalizeName(word);
      return (
        normSpeech === normWord ||
        speechTokens.includes(normWord) ||
        trimmed.toLowerCase().includes(word.toLowerCase())
      );
    });

    if (isOrdinalMatch && ord.index < candidates.length) {
      return {
        status: 'matched',
        customer: candidates[ord.index],
        method: 'ordinal',
        matchedValue: ord.words[0],
      };
    }
  }

  // 3. Fuller Name or Distinctive Surname / Token Matching
  const nameMatches: Customer[] = [];

  for (const candidate of candidates) {
    const normCandName = normalizeName(candidate.name);
    const candTokens = normCandName.split(/\s+/).filter(Boolean);
    const notesTokens = candidate.notes ? normalizeName(candidate.notes).split(/\s+/).filter(Boolean) : [];
    const allCandTokens = [...candTokens, ...notesTokens];

    // Full name match (exact or high Jaro-Winkler)
    if (normCandName === normSpeech || jaroWinklerSimilarity(normCandName, normSpeech) >= 0.88) {
      nameMatches.push(candidate);
      continue;
    }

    // Distinctive tokens: tokens unique to this candidate among the candidates list
    const distinctiveTokens = allCandTokens.filter((token) => {
      if (token.length <= 2) return false;
      const appearsInOthers = candidates.some((other) => {
        if (other.id === candidate.id) return false;
        const otherTokens = [
          ...normalizeName(other.name).split(/\s+/),
          ...(other.notes ? normalizeName(other.notes).split(/\s+/) : []),
        ];
        return otherTokens.includes(token);
      });
      return !appearsInOthers;
    });

    const matchesDistinctive = distinctiveTokens.some((dTok) =>
      speechTokens.includes(dTok) ||
      normSpeech.includes(dTok) ||
      jaroWinklerSimilarity(dTok, normSpeech) >= 0.90
    );

    if (matchesDistinctive) {
      nameMatches.push(candidate);
    }
  }

  if (nameMatches.length === 1) {
    return {
      status: 'matched',
      customer: nameMatches[0],
      method: 'name',
      matchedValue: nameMatches[0].name,
    };
  }

  return { status: 'no_match', rawQuery: speechTranscript };
}
