/**
 * Vitest Test Suite for F16: Customer Disambiguation & Phone Suffix Matcher
 * Covers 35+ test cases:
 * - Two Rameshes (Ramesh Kumar & Ramesh Gowda)
 * - Multi-language digit suffix matching (English, Hindi, Kannada, Tamil, Telugu, romanised & native digits)
 * - Multipliers (double/triple)
 * - Fuller names and surnames
 * - Ordinals across 5 languages
 * - Two candidates sharing identical last 4 digits -> need_more_digits
 * - Customer with no phone number
 * - Wrong digits -> no_match
 * - findCustomers trigger conditions
 */

import { describe, it, expect } from 'vitest';
import {
  findCustomers,
  resolveDisambiguationChoice,
} from '../customerMatcher';
import { Customer } from '../types';

describe('F16: Customer Disambiguation & Phone Suffix Matcher', () => {
  const rameshKumar: Customer = {
    id: 'cust-1',
    name: 'Ramesh Kumar',
    phone: '9845012345', // ends in 2345
    balance: 2450,
    totalCredit: 4250,
    totalPayment: 1800,
    createdAt: '2026-11-01T10:00:00Z',
    notes: 'Plumber near cross 2',
  };

  const rameshGowda: Customer = {
    id: 'cust-2',
    name: 'Ramesh Gowda',
    phone: '9845099887', // ends in 9887
    balance: 840,
    totalCredit: 1640,
    totalPayment: 800,
    createdAt: '2026-11-05T10:00:00Z',
    notes: 'Teacher near arch',
  };

  const sureshNoPhone: Customer = {
    id: 'cust-3',
    name: 'Suresh Tailor',
    phone: undefined,
    balance: 500,
    totalCredit: 500,
    totalPayment: 0,
    createdAt: '2026-11-10T10:00:00Z',
  };

  const candidates = [rameshKumar, rameshGowda];

  describe('1. Spoken Digits Suffix Matching across Languages', () => {
    it('matches Ramesh Kumar by English digit words: "two three four five"', () => {
      const res = resolveDisambiguationChoice('two three four five', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
        expect(res.method).toBe('digits');
      }
    });

    it('matches Ramesh Kumar by Hindi digit words: "do teen char paanch"', () => {
      const res = resolveDisambiguationChoice('do teen char paanch', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
        expect(res.method).toBe('digits');
      }
    });

    it('matches Ramesh Kumar by raw digit string: "2345"', () => {
      const res = resolveDisambiguationChoice('2345', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Gowda by English digit words: "nine eight eight seven"', () => {
      const res = resolveDisambiguationChoice('nine eight eight seven', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
        expect(res.method).toBe('digits');
      }
    });

    it('matches Ramesh Gowda with multiplier in English: "nine double eight seven"', () => {
      const res = resolveDisambiguationChoice('nine double eight seven', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches Ramesh Gowda with Hindi multiplier: "nau dabal aath saat"', () => {
      const res = resolveDisambiguationChoice('nau dabal aath saat', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches Ramesh Kumar by Kannada native digits: "೨೩೪೫"', () => {
      const res = resolveDisambiguationChoice('೨೩೪೫', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Gowda by Devanagari native digits: "९८८७"', () => {
      const res = resolveDisambiguationChoice('९८८७', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches Ramesh Kumar by Telugu native digits: "౨౩౪౫"', () => {
      const res = resolveDisambiguationChoice('౨౩౪౫', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Kumar by Tamil native digits: "௨௩௪௫"', () => {
      const res = resolveDisambiguationChoice('௨௩௪௫', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Kumar by Kannada spoken words: "ಎರಡು ಮೂರು ನಾಲ್ಕು ಐದು"', () => {
      const res = resolveDisambiguationChoice('ಎರಡು ಮೂರು ನಾಲ್ಕು ಐದು', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Kumar by Tamil spoken words: "இரண்டு மூன்று நான்கு ஐந்து"', () => {
      const res = resolveDisambiguationChoice('இரண்டு மூன்று நான்கு ஐந்து', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches Ramesh Kumar by Telugu spoken words: "రెండు మూడు నాలుగు ఐదు"', () => {
      const res = resolveDisambiguationChoice('రెండు మూడు నాలుగు ఐదు', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });
  });

  describe('2. Surnames and Fuller Names', () => {
    it('matches Ramesh Gowda by full name "Ramesh Gowda"', () => {
      const res = resolveDisambiguationChoice('Ramesh Gowda', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
        expect(res.method).toBe('name');
      }
    });

    it('matches Ramesh Gowda by surname alone "Gowda"', () => {
      const res = resolveDisambiguationChoice('Gowda', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
        expect(res.method).toBe('name');
      }
    });

    it('matches Ramesh Kumar by surname alone "Kumar"', () => {
      const res = resolveDisambiguationChoice('Kumar', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
        expect(res.method).toBe('name');
      }
    });

    it('matches Ramesh Kumar by distinctive note "Plumber"', () => {
      const res = resolveDisambiguationChoice('Plumber', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('returns no_match if ambiguous first name alone "Ramesh" is spoken', () => {
      const res = resolveDisambiguationChoice('Ramesh', candidates);
      expect(res.status).toBe('no_match');
    });
  });

  describe('3. Ordinals across 5 Languages', () => {
    it('matches 1st candidate by English "first"', () => {
      const res = resolveDisambiguationChoice('first', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
        expect(res.method).toBe('ordinal');
      }
    });

    it('matches 1st candidate by Hindi "pehla"', () => {
      const res = resolveDisambiguationChoice('pehla', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
        expect(res.method).toBe('ordinal');
      }
    });

    it('matches 2nd candidate by English "second"', () => {
      const res = resolveDisambiguationChoice('second', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
        expect(res.method).toBe('ordinal');
      }
    });

    it('matches 2nd candidate by Hindi "doosra"', () => {
      const res = resolveDisambiguationChoice('doosra', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches 1st candidate by Kannada "modalaneya"', () => {
      const res = resolveDisambiguationChoice('modalaneya', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches 2nd candidate by Kannada native "ಎರಡನೆಯ"', () => {
      const res = resolveDisambiguationChoice('ಎರಡನೆಯ', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches 1st candidate by Tamil "mudal"', () => {
      const res = resolveDisambiguationChoice('mudal', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches 2nd candidate by Tamil native "இரண்டாவது"', () => {
      const res = resolveDisambiguationChoice('இரண்டாவது', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });

    it('matches 1st candidate by Telugu "modati"', () => {
      const res = resolveDisambiguationChoice('modati', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches 2nd candidate by Telugu native "రెండవ"', () => {
      const res = resolveDisambiguationChoice('రెండవ', candidates);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-2');
      }
    });
  });

  describe('4. Identical Last 4 Digits & Need More Digits', () => {
    const twinPhoneCandidates: Customer[] = [
      {
        id: 'twin-1',
        name: 'Ramesh A',
        phone: '9845012345', // last 6: 012345, last 4: 2345
        balance: 100,
        totalCredit: 100,
        totalPayment: 0,
        createdAt: '2026-11-01T10:00:00Z',
      },
      {
        id: 'twin-2',
        name: 'Ramesh B',
        phone: '9845912345', // last 6: 912345, last 4: 2345
        balance: 200,
        totalCredit: 200,
        totalPayment: 0,
        createdAt: '2026-11-02T10:00:00Z',
      },
    ];

    it('returns need_more_digits (6) when both candidates share last 4 digits: "2345"', () => {
      const res = resolveDisambiguationChoice('2345', twinPhoneCandidates, 'hi', 4);
      expect(res.status).toBe('need_more_digits');
      if (res.status === 'need_more_digits') {
        expect(res.digitsNeeded).toBe(6);
        expect(res.matchingCandidates.length).toBe(2);
      }
    });

    it('resolves twin-2 when requested last 6 digits: "912345"', () => {
      const res = resolveDisambiguationChoice('912345', twinPhoneCandidates, 'hi', 6);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('twin-2');
      }
    });

    it('resolves twin-1 when requested last 6 digits: "012345"', () => {
      const res = resolveDisambiguationChoice('012345', twinPhoneCandidates, 'hi', 6);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('twin-1');
      }
    });
  });

  describe('5. Customers with No Phone & Unmatched Digits', () => {
    it('does not match customer with no phone when digits are spoken', () => {
      const mixed = [rameshKumar, sureshNoPhone];
      const res = resolveDisambiguationChoice('2345', mixed);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-1');
      }
    });

    it('matches customer with no phone by ordinal: "second"', () => {
      const mixed = [rameshKumar, sureshNoPhone];
      const res = resolveDisambiguationChoice('second', mixed);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-3');
      }
    });

    it('matches customer with no phone by name: "Suresh"', () => {
      const mixed = [rameshKumar, sureshNoPhone];
      const res = resolveDisambiguationChoice('Suresh', mixed);
      expect(res.status).toBe('matched');
      if (res.status === 'matched') {
        expect(res.customer.id).toBe('cust-3');
      }
    });

    it('returns no_match when spoken digits do not match any candidate: "9999"', () => {
      const res = resolveDisambiguationChoice('9999', candidates);
      expect(res.status).toBe('no_match');
    });

    it('returns no_match for noise / unrelated speech: "aaj mausam achha hai"', () => {
      const res = resolveDisambiguationChoice('aaj mausam achha hai', candidates);
      expect(res.status).toBe('no_match');
    });
  });

  describe('6. findCustomers Disambiguation Trigger Thresholds', () => {
    it('triggers disambiguate for partial first name "Ramesh" with 2 candidates', () => {
      const result = findCustomers('Ramesh', [rameshKumar, rameshGowda]);
      expect(result.action).toBe('disambiguate');
      expect(result.candidates.length).toBeGreaterThanOrEqual(2);
    });

    it('triggers disambiguate when scores are within 0.10 of each other', () => {
      const custA = { ...rameshKumar, name: 'Mahesh Sharma' };
      const custB = { ...rameshGowda, name: 'Mahesh Verma' };
      const result = findCustomers('Mahesh', [custA, custB]);
      expect(result.action).toBe('disambiguate');
    });

    it('auto-selects when single customer matches with clear score lead > 0.10', () => {
      const result = findCustomers('Ramesh Kumar', [rameshKumar, rameshGowda]);
      expect(result.action).toBe('auto_select');
      expect(result.selectedCustomer?.id).toBe('cust-1');
    });
  });
});
