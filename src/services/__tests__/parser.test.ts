/**
 * Vitest Test Suite for Udhaar Sathi Parser Service (/services/parser.ts)
 * 
 * Tests PRD acceptance criteria for:
 * 1. Indic credit keywords across 5 languages + romanised
 * 2. Payment keywords & direction resolution ("ne diye" vs "ko diya")
 * 3. Multi-entry compound sentences ("Ramesh ka 340 udhaar, kal 200 diya tha")
 * 4. Relative dates (aaj, kal, parso, do din pehle, last Monday, native scripts)
 * 5. Corrections ("nahi 430", "sorry 500", "galat 350")
 * 6. Queries ("Ramesh ka total?", "Ramesh ka baaki kitna", native script queries)
 * 7. Confirm / cancel commands across 5 languages
 * 8. Customer name extraction with native scripts
 * 9. Field-level confidence scoring (overall = minimum field confidence)
 * 10. All 87 fixture phrases from /test-data/phrases.json
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  parseTranscript,
  resolveRelativeDate,
  resolveDirection,
  extractCustomerName,
  ParsedTranscriptResult,
} from '../parser';
import { ParsedEntry } from '../types';

interface PhraseFixture {
  id: number;
  text: string;
  expectedIntent: 'entry' | 'query' | 'correction' | 'confirm' | 'cancel' | 'unknown';
  expectedCustomer?: string;
  expectedAmount?: number;
  expectedType?: 'credit' | 'payment';
  expectedRelativeDate?: string;
  expectedEntriesCount?: number;
  expectedQueryCustomer?: string;
  expectedCorrectionAmount?: number;
  entries?: Array<{
    amount: number;
    type: 'credit' | 'payment';
    relativeDate?: string;
  }>;
  language?: string;
}

// Load phrases fixture file
const fixturesPath = path.resolve(process.cwd(), 'test-data/phrases.json');
const rawFixtures = fs.readFileSync(fixturesPath, 'utf8');
const fixtures: PhraseFixture[] = JSON.parse(rawFixtures);

describe('Voice Parser Service (/services/parser.ts)', () => {
  // -------------------------------------------------------------------------
  // 1. FIXTURE-BASED TEST SUITE (87 Phrases)
  // -------------------------------------------------------------------------
  describe('Test Fixtures from /test-data/phrases.json (87 phrases)', () => {
    fixtures.forEach((fixture) => {
      const expectedIntent = fixture.expectedIntent || 'entry';
      it(`[#${fixture.id}] [${expectedIntent.toUpperCase()}] "${fixture.text}"`, async () => {
        const result = await parseTranscript(fixture.text);

        // Assert intent matches
        expect(result.intent).toBe(expectedIntent);

        if (expectedIntent === 'entry') {
          expect(result.entries.length).toBeGreaterThanOrEqual(1);

          if (fixture.expectedEntriesCount) {
            expect(result.entries.length).toBe(fixture.expectedEntriesCount);
          }

          const expCust = fixture.expectedCustomer || (fixture as any).customer;
          if (expCust) {
            const cust = result.entries[0].customerName || result.data.customerName || '';
            expect(cust.length).toBeGreaterThan(0);
          }

          const expAmt = fixture.expectedAmount !== undefined ? fixture.expectedAmount : (fixture as any).amount;
          if (expAmt !== undefined) {
            const amt = result.entries[0].amount ?? result.data.amount;
            expect(amt).toBe(expAmt);
          }

          const expTyp = fixture.expectedType || (fixture as any).type;
          if (expTyp) {
            expect(result.entries[0].type).toBe(expTyp);
          }

          if (fixture.expectedRelativeDate) {
            expect(result.entries[0].relativeDateLabel).toBe(fixture.expectedRelativeDate);
          }

          if (fixture.entries && fixture.entries.length > 0) {
            for (let i = 0; i < fixture.entries.length; i++) {
              const expectedSub = fixture.entries[i];
              const actualSub = result.entries[i];
              expect(actualSub.amount).toBe(expectedSub.amount);
              expect(actualSub.type).toBe(expectedSub.type);
              if (expectedSub.relativeDate) {
                expect(actualSub.relativeDateLabel).toBe(expectedSub.relativeDate);
              }
            }
          }
        } else if (fixture.expectedIntent === 'query') {
          if (fixture.expectedQueryCustomer) {
            const qCust = result.queryCustomer || result.customerName || '';
            expect(qCust.toLowerCase()).toContain(fixture.expectedQueryCustomer.toLowerCase());
          }
        } else if (fixture.expectedIntent === 'correction') {
          if (fixture.expectedCorrectionAmount !== undefined) {
            expect(result.correctionAmount).toBe(fixture.expectedCorrectionAmount);
          }
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 2. PRD WORKED EXAMPLE: Compound Multi-Entry
  // -------------------------------------------------------------------------
  describe('PRD Worked Example: "Ramesh ka 340 udhaar, kal 200 diya tha"', () => {
    it('correctly splits compound multi-entry into today credit + yesterday payment', async () => {
      const transcript = 'Ramesh ka 340 udhaar, kal 200 diya tha';
      const result = await parseTranscript(transcript);

      expect(result.intent).toBe('entry');
      expect(result.entries.length).toBe(2);

      // Entry 1: 340 credit today
      const entry1 = result.entries[0];
      expect(entry1.customerName).toBe('Ramesh');
      expect(entry1.amount).toBe(340);
      expect(entry1.type).toBe('credit');
      expect(entry1.relativeDateLabel).toBe('aaj');

      // Entry 2: 200 payment yesterday (inherited Ramesh)
      const entry2 = result.entries[1];
      expect(entry2.customerName).toBe('Ramesh');
      expect(entry2.amount).toBe(200);
      expect(entry2.type).toBe('payment');
      expect(entry2.relativeDateLabel).toBe('kal');

      // Check subEntries in data for UI backward compatibility
      expect(Array.isArray(result.data.entries)).toBe(true);
      expect(result.data.entries?.length).toBe(2);
      expect(result.data.entries?.[0].amount).toBe(340);
      expect(result.data.entries?.[1].amount).toBe(200);

      // Check compoundDetails
      expect(result.data.compoundDetails).toBeDefined();
      expect(result.data.compoundDetails?.creditAmount).toBe(340);
      expect(result.data.compoundDetails?.paymentAmount).toBe(200);
      expect(result.data.compoundDetails?.netAmount).toBe(140);
    });
  });

  // -------------------------------------------------------------------------
  // 3. DIRECTION RESOLUTION ("ne" vs "ko" vs keywords)
  // -------------------------------------------------------------------------
  describe('Direction Resolution', () => {
    it('"Ramesh ne 200 diye" resolves to payment', async () => {
      const res = await parseTranscript('Ramesh ne 200 diye');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('payment');
      expect(res.entries[0].amount).toBe(200);
    });

    it('"Ramesh ko 500 udhaar diya" resolves to credit', async () => {
      const res = await parseTranscript('Ramesh ko 500 udhaar diya');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('credit');
      expect(res.entries[0].amount).toBe(500);
    });

    it('"Ramesh ko 500 diya" resolves to credit', async () => {
      const res = await parseTranscript('Ramesh ko 500 diya');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('credit');
      expect(res.entries[0].amount).toBe(500);
    });

    it('"Suresh se 200 mila" resolves to payment', async () => {
      const res = await parseTranscript('Suresh se 200 mila');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('payment');
      expect(res.entries[0].amount).toBe(200);
    });

    it('"Ramesh 500 udhaar" resolves to credit', async () => {
      const res = await parseTranscript('Ramesh 500 udhaar');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('credit');
      expect(res.entries[0].amount).toBe(500);
    });

    it('"Ramesh 200 jama" resolves to payment', async () => {
      const res = await parseTranscript('Ramesh 200 jama');
      expect(res.intent).toBe('entry');
      expect(res.entries[0].type).toBe('payment');
      expect(res.entries[0].amount).toBe(200);
    });
  });

  // -------------------------------------------------------------------------
  // 4. RELATIVE DATES ACROSS 5 LANGUAGES
  // -------------------------------------------------------------------------
  describe('Relative Dates Resolution', () => {
    const base = new Date('2026-11-21T12:00:00.000Z');

    it('resolves "kal" in past tense context to yesterday', () => {
      const res = resolveRelativeDate('kal 200 diya tha', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('kal');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(20);
    });

    it('resolves "kal" in future context to tomorrow', () => {
      const res = resolveRelativeDate('kal dega 500', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('kal (tomorrow)');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(22);
    });

    it('resolves "parso" to 2 days ago', () => {
      const res = resolveRelativeDate('parso 300 jama', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('parso');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(19);
    });

    it('resolves "do din pehle" to 2 days ago', () => {
      const res = resolveRelativeDate('do din pehle 400 diya', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('2 din pehle');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(19);
    });

    it('resolves Kannada "ninne" to yesterday', () => {
      const res = resolveRelativeDate('ninne 200 kottaru', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('kal');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(20);
    });

    it('resolves Tamil "netru" to yesterday', () => {
      const res = resolveRelativeDate('netru 500 koduthaar', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('kal');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(20);
    });

    it('resolves Telugu "ninna" to yesterday', () => {
      const res = resolveRelativeDate('ninna 250 icharu', base);
      expect(res).not.toBeNull();
      expect(res?.label).toBe('kal');
      const d = new Date(res!.date);
      expect(d.getDate()).toBe(20);
    });
  });

  // -------------------------------------------------------------------------
  // 5. CORRECTIONS WITH CONTEXT PRESERVATION
  // -------------------------------------------------------------------------
  describe('Corrections', () => {
    it('updates pending entry amount when "nahi 430" is spoken', async () => {
      const prevContext: ParsedEntry = {
        customerName: 'Pooja',
        amount: 500,
        type: 'credit',
        date: new Date().toISOString(),
        confidence: 0.95,
        rawTranscript: 'Pooja 500 udhaar',
      };

      const res = await parseTranscript('nahi, 430', prevContext);
      expect(res.intent).toBe('correction');
      expect(res.correctionAmount).toBe(430);
      expect(res.entries[0].amount).toBe(430);
      expect(res.entries[0].customerName).toBe('Pooja');
      expect(res.entries[0].type).toBe('credit');
    });

    it('handles spoken number words in corrections: "nahi teen sau chaalis"', async () => {
      const res = await parseTranscript('nahi, teen sau chaalis');
      expect(res.intent).toBe('correction');
      expect(res.correctionAmount).toBe(340);
    });
  });

  // -------------------------------------------------------------------------
  // 6. BALANCE QUERIES
  // -------------------------------------------------------------------------
  describe('Balance Queries', () => {
    it('"Ramesh ka total?" returns query intent with customer Ramesh', async () => {
      const res = await parseTranscript('Ramesh ka total?');
      expect(res.intent).toBe('query');
      expect(res.queryCustomer).toBe('Ramesh');
      expect(res.confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('"ರಮೇಶ್ ಬಾಕಿ" in Kannada returns query intent with customer ರಮೇಶ್', async () => {
      const res = await parseTranscript('ರಮೇಶ್ ಬಾಕಿ');
      expect(res.intent).toBe('query');
      expect(res.queryCustomer).toBe('ರಮೇಶ್');
    });

    it('"రమేష్ ఎంత బాకీ" in Telugu returns query intent with customer రమేష్', async () => {
      const res = await parseTranscript('రమేష్ ఎంత బాకీ');
      expect(res.intent).toBe('query');
      expect(res.queryCustomer).toBe('రమేష్');
    });

    it('"ரமேஷ் மொத்தம்" in Tamil returns query intent with customer ரமேஷ்', async () => {
      const res = await parseTranscript('ரமேஷ் மொத்தம்');
      expect(res.intent).toBe('query');
      expect(res.queryCustomer).toBe('ரமேஷ்');
    });
  });

  // -------------------------------------------------------------------------
  // 7. CONFIRM AND CANCEL COMMANDS
  // -------------------------------------------------------------------------
  describe('Confirm and Cancel Commands', () => {
    it('recognizes confirmation words across languages', async () => {
      const words = ['haan', 'yes', 'save', 'theek hai', 'sari', 'ஆமா', 'అవును'];
      for (const w of words) {
        const res = await parseTranscript(w);
        expect(res.intent).toBe('confirm');
      }
    });

    it('recognizes cancellation words across languages', async () => {
      const words = ['nahi', 'cancel', 'ruko', 'mat karo', 'வேண்டாம்', 'వద్దు'];
      for (const w of words) {
        const res = await parseTranscript(w);
        expect(res.intent).toBe('cancel');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 8. CUSTOMER NAME EXTRACTION WITH NATIVE SCRIPTS
  // -------------------------------------------------------------------------
  describe('Customer Name Extraction', () => {
    it('extracts Devanagari names', () => {
      const { name } = extractCustomerName('रमेश को 500 उधार दिया');
      expect(name).toBe('रमेश');
    });

    it('extracts Kannada names', () => {
      const { name } = extractCustomerName('ಸುರೇಶ್ 300 ಜಮಾ');
      expect(name).toBe('ಸುರೇಶ್');
    });

    it('extracts Tamil names', () => {
      const { name } = extractCustomerName('முருகன் 500 கடன்');
      expect(name).toBe('முருகன்');
    });

    it('extracts Telugu names', () => {
      const { name } = extractCustomerName('రమేష్ 400 అప్పు');
      expect(name).toBe('రమేష్');
    });

    it('properly strips prepositions and honorifics', () => {
      const { name } = extractCustomerName('Ramesh bhai ko 500 udhaar diya');
      expect(name).toBe('Ramesh');
    });
  });

  // -------------------------------------------------------------------------
  // 9. CONFIDENCE CALCULATION
  // -------------------------------------------------------------------------
  describe('Confidence Scoring', () => {
    it('assigns high confidence >= 0.90 for clear complete inputs', async () => {
      const res = await parseTranscript('Ramesh ko 500 udhaar diya');
      expect(res.confidence).toBeGreaterThanOrEqual(0.90);
      expect(res.entries[0].isLowConfidence).toBeFalsy();
    });

    it('marks low confidence and highlights field when amount is missing or ambiguous', async () => {
      const res = await parseTranscript('Ramesh udhaar');
      expect(res.confidence).toBeLessThan(0.70);
      expect(res.entries[0].isLowConfidence).toBe(true);
      expect(res.entries[0].lowConfidenceField).toBe('amount');
    });
  });

  // -------------------------------------------------------------------------
  // 10. VOICE CUSTOMER REGISTRATION (F15)
  // -------------------------------------------------------------------------
  describe('10. Voice Customer Registration Intent (F15)', () => {
    it('recognizes "Naya customer Suresh, number 98450 12345"', async () => {
      const res = await parseTranscript('Naya customer Suresh, number 98450 12345');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('Suresh');
      expect(res.phone).toBe('9845012345');
      expect(res.confidence).toBeGreaterThanOrEqual(0.90);
    });

    it('recognizes "Suresh ka number 9845012345 add karo"', async () => {
      const res = await parseTranscript('Suresh ka number 9845012345 add karo');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('Suresh');
      expect(res.phone).toBe('9845012345');
    });

    it('recognizes "add customer Suresh phone 98450 12345"', async () => {
      const res = await parseTranscript('add customer Suresh phone 98450 12345');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('Suresh');
      expect(res.phone).toBe('9845012345');
    });

    it('recognizes registration without phone: "Naya grahak Mahesh"', async () => {
      const res = await parseTranscript('Naya grahak Mahesh');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('Mahesh');
      expect(res.phone).toBeUndefined();
    });

    it('recognizes Kannada registration: "ಹೊಸ ಗ್ರಾಹಕ ಸುರೇಶ್ ನಂಬರ್ 98450 12345"', async () => {
      const res = await parseTranscript('ಹೊಸ ಗ್ರಾಹಕ ಸುರೇಶ್ ನಂಬರ್ 98450 12345');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('ಸುರೇಶ್');
      expect(res.phone).toBe('9845012345');
    });

    it('recognizes Tamil registration: "புதிய வாடிக்கையாளர் சுரேஷ் எண் 98450 12345"', async () => {
      const res = await parseTranscript('புதிய வாடிக்கையாளர் சுரேஷ் எண் 98450 12345');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('சுரேஷ்');
      expect(res.phone).toBe('9845012345');
    });

    it('recognizes Telugu registration: "కొత్త కస్టమర్ సురేష్ నంబర్ 98450 12345"', async () => {
      const res = await parseTranscript('కొత్త కస్టమర్ సురేష్ నంబర్ 98450 12345');
      expect(res.intent).toBe('register');
      expect(res.name).toBe('సురేష్');
      expect(res.phone).toBe('9845012345');
    });
  });
});
