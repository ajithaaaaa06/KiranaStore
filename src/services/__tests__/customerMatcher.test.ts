/**
 * Vitest Test Suite for Customer Matcher Service (/services/customerMatcher.ts)
 * 
 * Tests PRD acceptance criteria for:
 * 1. Name normalization (lowercase, stripping honorifics, collapsing repeated vowels/consonants)
 * 2. Transliteration of native scripts (Devanagari, Kannada, Tamil, Telugu) to common Latin
 * 3. Indian phonetic key generation (Soundex variant)
 * 4. Fuzzy string matching (Levenshtein & Jaro-Winkler)
 * 5. Ranked candidate search with thresholds:
 *    - ≥ 0.92: auto_select
 *    - 0.60 - 0.92: disambiguate
 *    - < 0.60: create_new ("Add new customer")
 * 6. Partial name disambiguation ("Ramesh" matches "Ramesh Kumar" and "Ramesh Gowda")
 * 7. 10-minute duplicate entry detection (isDuplicateEntry)
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeName,
  transliterateIndicToLatin,
  getIndianPhoneticKey,
  levenshteinDistance,
  levenshteinSimilarity,
  jaroWinklerSimilarity,
  findCustomers,
  isDuplicateEntry,
} from '../customerMatcher';
import { Customer, LedgerEntry } from '../types';

describe('Customer Matcher Service (/services/customerMatcher.ts)', () => {
  // -------------------------------------------------------------------------
  // 1. NAME NORMALIZATION & HONORIFICS STRIPPING
  // -------------------------------------------------------------------------
  describe('Name Normalization & Honorifics', () => {
    it('lowercases uppercase names', () => {
      expect(normalizeName('RAMESH')).toBe('ramesh');
    });

    it('strips "bhai" honorific', () => {
      expect(normalizeName('Ramesh Bhai')).toBe('ramesh');
    });

    it('strips "ji" honorific', () => {
      expect(normalizeName('Suresh Ji')).toBe('suresh');
    });

    it('strips "anna" honorific (Kannada/Tamil/Telugu)', () => {
      expect(normalizeName('Anand Anna')).toBe('anand');
    });

    it('strips "akka" honorific', () => {
      expect(normalizeName('Lakshmi Akka')).toBe('lakshmi');
    });

    it('strips "sir" honorific', () => {
      expect(normalizeName('Kumar Sir')).toBe('kumar');
    });

    it('strips "madam" honorific', () => {
      expect(normalizeName('Pooja Madam')).toBe('puja');
    });

    it('strips "aunty" and "uncle" honorifics', () => {
      expect(normalizeName('Sunita Aunty')).toBe('sunita');
      expect(normalizeName('Rajesh Uncle')).toBe('rajesh');
    });

    it('strips "shri" prefix', () => {
      expect(normalizeName('Shri Mohan')).toBe('mohan');
    });

    it('strips parenthetical descriptions like (Plumber)', () => {
      expect(normalizeName('Ramesh Bhai (Plumber)')).toBe('ramesh');
    });
  });

  // -------------------------------------------------------------------------
  // 2. REPEATED VOWELS & CONSONANTS COLLAPSING
  // -------------------------------------------------------------------------
  describe('Vowel & Consonant Collapsing', () => {
    it('collapses "ee" to "i" in Sureesh', () => {
      expect(normalizeName('Sureesh')).toBe('suresh');
    });

    it('collapses repeated "hh" in Rameshh', () => {
      expect(normalizeName('Rameshh')).toBe('ramesh');
    });

    it('collapses "oo" to "u" so Pooja matches Puja', () => {
      expect(normalizeName('Pooja')).toBe('puja');
      expect(normalizeName('Puja')).toBe('puja');
    });

    it('collapses repeated consonants in Dippak and Sahaab', () => {
      expect(normalizeName('Dippak')).toBe('dipak');
      expect(normalizeName('Sahaab')).toBe('sahab');
    });
  });

  // -------------------------------------------------------------------------
  // 3. NATIVE SCRIPT TRANSLITERATION TO LATIN
  // -------------------------------------------------------------------------
  describe('Native Script Transliteration to Latin', () => {
    it('transliterates Devanagari "रमेश" to "ramesh"', () => {
      expect(normalizeName('रमेश')).toBe('ramesh');
    });

    it('transliterates Devanagari "सुरेश" to "suresh"', () => {
      expect(normalizeName('सुरेश')).toBe('suresh');
    });

    it('transliterates Devanagari "पूजा" to "puja"', () => {
      expect(normalizeName('पूजा')).toBe('puja');
    });

    it('transliterates Devanagari "सुनीता" to "sunita"', () => {
      expect(normalizeName('सुनीता')).toBe('sunita');
    });

    it('transliterates Kannada "ರಮೇಶ್" to "ramesh"', () => {
      expect(normalizeName('ರಮೇಶ್')).toBe('ramesh');
    });

    it('transliterates Kannada "ಸುರೇಶ್" to "suresh"', () => {
      expect(normalizeName('ಸುರೇಶ್')).toBe('suresh');
    });

    it('transliterates Kannada "ವೆಂಕಟೇಶ್" to "venkatesh"', () => {
      expect(normalizeName('ವೆಂಕಟೇಶ್')).toBe('venkatesh');
    });

    it('transliterates Tamil "ரமேஷ்" to "ramesh"', () => {
      expect(normalizeName('ரமேஷ்')).toBe('ramesh');
    });

    it('transliterates Tamil "முருகன்" to "murugan"', () => {
      expect(normalizeName('முருகன்')).toBe('murugan');
    });

    it('transliterates Tamil "செல்வம்" to "selvam"', () => {
      expect(normalizeName('செல்வம்')).toBe('selvam');
    });

    it('transliterates Telugu "రమేష్" to "ramesh"', () => {
      expect(normalizeName('రమేష్')).toBe('ramesh');
    });

    it('transliterates Telugu "సురేష్" to "suresh"', () => {
      expect(normalizeName('సురేష్')).toBe('suresh');
    });

    it('transliterates Telugu "శ్రీనివాస్" to "srinivas"', () => {
      expect(normalizeName('శ్రీనివాస్')).toBe('srinivas');
    });
  });

  // -------------------------------------------------------------------------
  // 4. INDIAN PHONETIC KEY (Soundex Variant)
  // -------------------------------------------------------------------------
  describe('Indian Phonetic Key', () => {
    it('generates identical phonetic key for Ramesh and Ramesha', () => {
      expect(getIndianPhoneticKey('Ramesh')).toBe(getIndianPhoneticKey('Ramesha'));
    });

    it('generates identical phonetic key for Ramesh and Rameshh', () => {
      expect(getIndianPhoneticKey('Ramesh')).toBe(getIndianPhoneticKey('Rameshh'));
    });

    it('generates identical phonetic key for Ramesh and Devanagari रमेश', () => {
      expect(getIndianPhoneticKey('Ramesh')).toBe(getIndianPhoneticKey('रमेश'));
    });

    it('generates identical phonetic key for Suresh and Sureesh', () => {
      expect(getIndianPhoneticKey('Suresh')).toBe(getIndianPhoneticKey('Sureesh'));
    });

    it('maps "Venkatesh" and "Wenkatesh" to identical phonetic key', () => {
      expect(getIndianPhoneticKey('Venkatesh')).toBe(getIndianPhoneticKey('Wenkatesh'));
    });
  });

  // -------------------------------------------------------------------------
  // 5. FUZZY STRING MATCHING (Levenshtein & Jaro-Winkler)
  // -------------------------------------------------------------------------
  describe('Fuzzy Matching Distance & Similarity', () => {
    it('computes exact match as distance 0 and similarity 1.0', () => {
      expect(levenshteinDistance('ramesh', 'ramesh')).toBe(0);
      expect(levenshteinSimilarity('ramesh', 'ramesh')).toBe(1.0);
      expect(jaroWinklerSimilarity('ramesh', 'ramesh')).toBe(1.0);
    });

    it('computes 1-character substitution distance as 1', () => {
      expect(levenshteinDistance('ramesh', 'romesh')).toBe(1);
      expect(jaroWinklerSimilarity('ramesh', 'romesh')).toBeGreaterThanOrEqual(0.85);
    });

    it('recognizes high similarity for minor transposition or missing letter', () => {
      const sim = jaroWinklerSimilarity('ramesh', 'ramehs');
      expect(sim).toBeGreaterThanOrEqual(0.90);
    });

    it('returns low similarity for completely different names', () => {
      expect(levenshteinSimilarity('ramesh', 'lakshmi')).toBeLessThan(0.40);
    });
  });

  // -------------------------------------------------------------------------
  // 6. CANDIDATE RANKING, DECISION THRESHOLDS & DISAMBIGUATION
  // -------------------------------------------------------------------------
  describe('findCustomers() Candidate Ranking & Thresholds', () => {
    const mockCustomers: Customer[] = [
      {
        id: 'c1',
        name: 'Ramesh Kumar',
        phone: '9845012345',
        totalCredit: 1500,
        totalPayment: 500,
        balance: 1000,
      },
      {
        id: 'c2',
        name: 'Ramesh Gowda',
        phone: '9845098765',
        totalCredit: 800,
        totalPayment: 200,
        balance: 600,
      },
      {
        id: 'c3',
        name: 'Suresh Rao',
        phone: '9448011223',
        totalCredit: 500,
        totalPayment: 500,
        balance: 0,
      },
      {
        id: 'c4',
        name: 'Pooja Sharma',
        phone: '9900112233',
        totalCredit: 1200,
        totalPayment: 0,
        balance: 1200,
      },
    ];

    it('partial name "Ramesh" matches both "Ramesh Kumar" and "Ramesh Gowda" and triggers disambiguate', () => {
      const result = findCustomers('Ramesh', mockCustomers);

      expect(result.action).toBe('disambiguate');
      expect(result.candidates.length).toBeGreaterThanOrEqual(2);
      expect(result.candidates.some((c) => c.customer.name === 'Ramesh Kumar')).toBe(true);
      expect(result.candidates.some((c) => c.customer.name === 'Ramesh Gowda')).toBe(true);
    });

    it('exact full name "Ramesh Gowda" achieves score >= 0.92 and triggers auto_select', () => {
      const result = findCustomers('Ramesh Gowda', mockCustomers);

      expect(result.action).toBe('auto_select');
      expect(result.selectedCustomer?.name).toBe('Ramesh Gowda');
      expect(result.topScore).toBeGreaterThanOrEqual(0.92);
    });

    it('phonetic spelling "Sureesh" matches "Suresh Rao" in 0.60 - 0.92 range', () => {
      const result = findCustomers('Sureesh', mockCustomers);

      expect(result.candidates.length).toBeGreaterThanOrEqual(1);
      expect(result.candidates[0].customer.name).toBe('Suresh Rao');
      expect(result.topScore).toBeGreaterThanOrEqual(0.60);
    });

    it('Devanagari query "सुरेश" matches "Suresh Rao"', () => {
      const result = findCustomers('सुरेश', mockCustomers);

      expect(result.candidates.length).toBeGreaterThanOrEqual(1);
      expect(result.candidates[0].customer.name).toBe('Suresh Rao');
      expect(result.topScore).toBeGreaterThanOrEqual(0.60);
    });

    it('phone number search "9845012345" directly matches Ramesh Kumar with 1.0', () => {
      const result = findCustomers('9845012345', mockCustomers);

      expect(result.action).toBe('auto_select');
      expect(result.selectedCustomer?.name).toBe('Ramesh Kumar');
      expect(result.topScore).toBe(1.0);
    });

    it('unmatched name "Zeeshan" scores < 0.60 and offers create_new', () => {
      const result = findCustomers('Zeeshan', mockCustomers);

      expect(result.action).toBe('create_new');
      expect(result.selectedCustomer).toBeNull();
      expect(result.topScore).toBeLessThan(0.60);
    });
  });

  // -------------------------------------------------------------------------
  // 7. 10-MINUTE DUPLICATE ENTRY DETECTION (isDuplicateEntry)
  // -------------------------------------------------------------------------
  describe('isDuplicateEntry() Detection', () => {
    const now = Date.now();
    const existingEntries: LedgerEntry[] = [
      {
        id: 'tx-1',
        customerId: 'c1',
        customerName: 'Ramesh Kumar',
        amount: 500,
        type: 'credit',
        date: new Date(now - 3 * 60 * 1000).toISOString(), // 3 mins ago
        createdAt: new Date(now - 3 * 60 * 1000).toISOString(),
      },
      {
        id: 'tx-2',
        customerId: 'c2',
        customerName: 'Suresh Rao',
        amount: 200,
        type: 'payment',
        date: new Date(now - 15 * 60 * 1000).toISOString(), // 15 mins ago
        createdAt: new Date(now - 15 * 60 * 1000).toISOString(),
      },
    ];

    it('detects duplicate for same customer + amount + type within 10 minutes', () => {
      const isDup = isDuplicateEntry(
        {
          customerId: 'c1',
          customerName: 'Ramesh Kumar',
          amount: 500,
          type: 'credit',
        },
        existingEntries,
        600000 // 10 minutes
      );

      expect(isDup).toBe(true);
    });

    it('does NOT detect duplicate if older than 10 minutes', () => {
      const isDup = isDuplicateEntry(
        {
          customerId: 'c2',
          customerName: 'Suresh Rao',
          amount: 200,
          type: 'payment',
        },
        existingEntries,
        600000 // 10 minutes
      );

      expect(isDup).toBe(false);
    });

    it('does NOT detect duplicate if amount differs', () => {
      const isDup = isDuplicateEntry(
        {
          customerId: 'c1',
          customerName: 'Ramesh Kumar',
          amount: 750,
          type: 'credit',
        },
        existingEntries,
        600000
      );

      expect(isDup).toBe(false);
    });

    it('does NOT detect duplicate if transaction type differs', () => {
      const isDup = isDuplicateEntry(
        {
          customerId: 'c1',
          customerName: 'Ramesh Kumar',
          amount: 500,
          type: 'payment', // existing is credit
        },
        existingEntries,
        600000
      );

      expect(isDup).toBe(false);
    });

    it('does NOT detect duplicate if customer differs', () => {
      const isDup = isDuplicateEntry(
        {
          customerId: 'c99',
          customerName: 'Mahesh',
          amount: 500,
          type: 'credit',
        },
        existingEntries,
        600000
      );

      expect(isDup).toBe(false);
    });

    it('matches duplicate by transliterated native-script name within 10 min', () => {
      const isDup = isDuplicateEntry(
        {
          customerName: 'रमेश कुमार', // Devanagari for Ramesh Kumar
          amount: 500,
          type: 'credit',
        },
        existingEntries,
        600000
      );

      expect(isDup).toBe(true);
    });
  });
});
