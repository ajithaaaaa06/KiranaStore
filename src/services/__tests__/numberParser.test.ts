/**
 * Comprehensive Vitest Test Suite for Offline Number Parser (/services/__tests__/numberParser.test.ts)
 * 
 * Verifies over 100 distinct cases covering:
 * - Hindi irregular numbers (0-100 table) in Roman & Devanagari
 * - Idiomatic fractions & multipliers (dedh, dhai, sawa, paune, saadhe)
 * - Kannada spoken words, compounds, and native digits (೦-೯)
 * - Tamil spoken words, compounds, and native digits (௦-௯)
 * - Telugu spoken words, compounds, and native digits (౦-౯)
 * - Code-mixed forms ("teen sau 40", "3 sau 40", "5 hazaar 200", "5k")
 * - ASR quirks (spaced digits "3 40", commas "1,24,500", trailing currency words)
 * - Noisy variants and misspellings ("panch", "tin", "hajar", "deydh", "erdu", "mudu")
 * - Ambiguity and confidence scoring (< 0.7 vs >= 0.85)
 * - extractAmounts() multi-amount and sentence extraction
 */

import { describe, it, expect } from 'vitest';
import {
  parseNumberPhrase,
  extractAmounts,
  normalizeIndicDigits,
} from '../numberParser';

describe('numberParser Service', () => {
  // =========================================================================
  // 1. Native Indic Digits Normalization (Devanagari, Kannada, Tamil, Telugu)
  // =========================================================================
  describe('1. Native Script Digits', () => {
    it('normalizes Devanagari digit ० to 0', () => {
      expect(normalizeIndicDigits('०')).toBe('0');
    });

    it('normalizes Devanagari number ५०० (500)', () => {
      expect(parseNumberPhrase('५००')).toBe(500);
    });

    it('normalizes Devanagari number ३४० (340)', () => {
      expect(parseNumberPhrase('३४०')).toBe(340);
    });

    it('normalizes Devanagari number १२५० (1250)', () => {
      expect(parseNumberPhrase('१२५०')).toBe(1250);
    });

    it('normalizes Kannada digits ೦-೯', () => {
      expect(normalizeIndicDigits('೦೧೨೩೪೫೬೭೮೯')).toBe('0123456789');
    });

    it('normalizes Kannada number ೪೦೦ (400)', () => {
      expect(parseNumberPhrase('೪೦೦')).toBe(400);
    });

    it('normalizes Kannada number ೧೨೫೦ (1250)', () => {
      expect(parseNumberPhrase('೧೨೫೦')).toBe(1250);
    });

    it('normalizes Tamil digits ௦-௯', () => {
      expect(normalizeIndicDigits('௦௧௨௩௪௫௬௭௮௯')).toBe('0123456789');
    });

    it('normalizes Tamil number ௩௪௦ (340)', () => {
      expect(parseNumberPhrase('௩௪௦')).toBe(340);
    });

    it('normalizes Tamil number ௫௦௦ (500)', () => {
      expect(parseNumberPhrase('௫௦௦')).toBe(500);
    });

    it('normalizes Telugu digits ౦-౯', () => {
      expect(normalizeIndicDigits('౦౧౨౩౪౫౬౭౮౯')).toBe('0123456789');
    });

    it('normalizes Telugu number ౩౪౦ (340)', () => {
      expect(parseNumberPhrase('౩౪౦')).toBe(340);
    });

    it('normalizes Telugu number ౫౦౦ (500)', () => {
      expect(parseNumberPhrase('౫౦౦')).toBe(500);
    });
  });

  // =========================================================================
  // 2. Hindi 0-100 Irregular Table
  // =========================================================================
  describe('2. Hindi 0-100 Irregular Lookup Table', () => {
    it('parses "shunya" as 0', () => { expect(parseNumberPhrase('shunya')).toBe(0); });
    it('parses "ek" as 1', () => { expect(parseNumberPhrase('ek')).toBe(1); });
    it('parses "do" as 2', () => { expect(parseNumberPhrase('do')).toBe(2); });
    it('parses "teen" as 3', () => { expect(parseNumberPhrase('teen')).toBe(3); });
    it('parses "chaar" as 4', () => { expect(parseNumberPhrase('chaar')).toBe(4); });
    it('parses "paanch" as 5', () => { expect(parseNumberPhrase('paanch')).toBe(5); });
    it('parses "chhe" as 6', () => { expect(parseNumberPhrase('chhe')).toBe(6); });
    it('parses "saat" as 7', () => { expect(parseNumberPhrase('saat')).toBe(7); });
    it('parses "aath" as 8', () => { expect(parseNumberPhrase('aath')).toBe(8); });
    it('parses "nau" as 9', () => { expect(parseNumberPhrase('nau')).toBe(9); });
    it('parses "das" as 10', () => { expect(parseNumberPhrase('das')).toBe(10); });
    it('parses "gyarah" as 11', () => { expect(parseNumberPhrase('gyarah')).toBe(11); });
    it('parses "barah" as 12', () => { expect(parseNumberPhrase('barah')).toBe(12); });
    it('parses "terah" as 13', () => { expect(parseNumberPhrase('terah')).toBe(13); });
    it('parses "chaudah" as 14', () => { expect(parseNumberPhrase('chaudah')).toBe(14); });
    it('parses "pandrah" as 15', () => { expect(parseNumberPhrase('pandrah')).toBe(15); });
    it('parses "solah" as 16', () => { expect(parseNumberPhrase('solah')).toBe(16); });
    it('parses "satrah" as 17', () => { expect(parseNumberPhrase('satrah')).toBe(17); });
    it('parses "atharah" as 18', () => { expect(parseNumberPhrase('atharah')).toBe(18); });
    it('parses "unnees" as 19', () => { expect(parseNumberPhrase('unnees')).toBe(19); });
    it('parses "bees" as 20', () => { expect(parseNumberPhrase('bees')).toBe(20); });
    it('parses "ikkees" as 21', () => { expect(parseNumberPhrase('ikkees')).toBe(21); });
    it('parses "baaees" as 22', () => { expect(parseNumberPhrase('baaees')).toBe(22); });
    it('parses "pachchees" as 25', () => { expect(parseNumberPhrase('pachchees')).toBe(25); });
    it('parses "untees" as 29', () => { expect(parseNumberPhrase('untees')).toBe(29); });
    it('parses "tees" as 30', () => { expect(parseNumberPhrase('tees')).toBe(30); });
    it('parses "battees" as 32', () => { expect(parseNumberPhrase('battees')).toBe(32); });
    it('parses "paintees" as 35', () => { expect(parseNumberPhrase('paintees')).toBe(35); });
    it('parses "chaalis" as 40', () => { expect(parseNumberPhrase('chaalis')).toBe(40); });
    it('parses "chawaalees" as 44', () => { expect(parseNumberPhrase('chawaalees')).toBe(44); });
    it('parses "paintaalees" as 45', () => { expect(parseNumberPhrase('paintaalees')).toBe(45); });
    it('parses "unchaas" as 49', () => { expect(parseNumberPhrase('unchaas')).toBe(49); });
    it('parses "pachaas" as 50', () => { expect(parseNumberPhrase('pachaas')).toBe(50); });
    it('parses "baavan" as 52', () => { expect(parseNumberPhrase('baavan')).toBe(52); });
    it('parses "pachpan" as 55', () => { expect(parseNumberPhrase('pachpan')).toBe(55); });
    it('parses "chhappan" as 56', () => { expect(parseNumberPhrase('chhappan')).toBe(56); });
    it('parses "saath" as 60', () => { expect(parseNumberPhrase('saath')).toBe(60); });
    it('parses "painsath" as 65', () => { expect(parseNumberPhrase('painsath')).toBe(65); });
    it('parses "sattar" as 70', () => { expect(parseNumberPhrase('sattar')).toBe(70); });
    it('parses "pachhattar" as 75', () => { expect(parseNumberPhrase('pachhattar')).toBe(75); });
    it('parses "assee" as 80', () => { expect(parseNumberPhrase('assee')).toBe(80); });
    it('parses "pachaasee" as 85', () => { expect(parseNumberPhrase('pachaasee')).toBe(85); });
    it('parses "nabbe" as 90', () => { expect(parseNumberPhrase('nabbe')).toBe(90); });
    it('parses "pachaanve" as 95', () => { expect(parseNumberPhrase('pachaanve')).toBe(95); });
    it('parses "ninyaanve" as 99', () => { expect(parseNumberPhrase('ninyaanve')).toBe(99); });
    it('parses "sau" as 100', () => { expect(parseNumberPhrase('sau')).toBe(100); });
    it('parses Devanagari "पाँच" as 5', () => { expect(parseNumberPhrase('पाँच')).toBe(5); });
    it('parses Devanagari "पच्चीस" as 25', () => { expect(parseNumberPhrase('पच्चीस')).toBe(25); });
    it('parses Devanagari "चालीस" as 40', () => { expect(parseNumberPhrase('चालीस')).toBe(40); });
    it('parses Devanagari "सौ" as 100', () => { expect(parseNumberPhrase('सौ')).toBe(100); });
  });

  // =========================================================================
  // 3. Idiomatic Fractions (dedh, dhai, sawa, paune, saadhe)
  // =========================================================================
  describe('3. Idiomatic Fractions and Multipliers', () => {
    it('parses "dedh sau" as 150', () => { expect(parseNumberPhrase('dedh sau')).toBe(150); });
    it('parses "dedh so" as 150', () => { expect(parseNumberPhrase('dedh so')).toBe(150); });
    it('parses Devanagari "डेढ़ सौ" as 150', () => { expect(parseNumberPhrase('डेढ़ सौ')).toBe(150); });
    it('parses "dedh hazaar" as 1500', () => { expect(parseNumberPhrase('dedh hazaar')).toBe(1500); });
    it('parses "dedh lakh" as 150000', () => { expect(parseNumberPhrase('dedh lakh')).toBe(150000); });

    it('parses "dhai sau" as 250', () => { expect(parseNumberPhrase('dhai sau')).toBe(250); });
    it('parses "dhai so" as 250', () => { expect(parseNumberPhrase('dhai so')).toBe(250); });
    it('parses "dhaai sau" as 250', () => { expect(parseNumberPhrase('dhaai sau')).toBe(250); });
    it('parses Devanagari "ढाई सौ" as 250', () => { expect(parseNumberPhrase('ढाई सौ')).toBe(250); });
    it('parses "dhai hazaar" as 2500', () => { expect(parseNumberPhrase('dhai hazaar')).toBe(2500); });
    it('parses "dhai hajar" as 2500', () => { expect(parseNumberPhrase('dhai hajar')).toBe(2500); });
    it('parses "dhai lakh" as 250000', () => { expect(parseNumberPhrase('dhai lakh')).toBe(250000); });

    it('parses "sawa sau" as 125', () => { expect(parseNumberPhrase('sawa sau')).toBe(125); });
    it('parses Devanagari "सवा सौ" as 125', () => { expect(parseNumberPhrase('सवा सौ')).toBe(125); });
    it('parses "sawa do sau" as 225', () => { expect(parseNumberPhrase('sawa do sau')).toBe(225); });
    it('parses "sawa teen sau" as 325', () => { expect(parseNumberPhrase('sawa teen sau')).toBe(325); });
    it('parses "sawa hazaar" as 1250', () => { expect(parseNumberPhrase('sawa hazaar')).toBe(1250); });
    it('parses "sawa do hazaar" as 2250', () => { expect(parseNumberPhrase('sawa do hazaar')).toBe(2250); });

    it('parses "paune sau" as 75', () => { expect(parseNumberPhrase('paune sau')).toBe(75); });
    it('parses "paune do sau" as 175', () => { expect(parseNumberPhrase('paune do sau')).toBe(175); });
    it('parses "paune teen sau" as 275', () => { expect(parseNumberPhrase('paune teen sau')).toBe(275); });
    it('parses "paune chaar sau" as 375', () => { expect(parseNumberPhrase('paune chaar sau')).toBe(375); });
    it('parses "paune paanch sau" as 475', () => { expect(parseNumberPhrase('paune paanch sau')).toBe(475); });
    it('parses "paune hazaar" as 750', () => { expect(parseNumberPhrase('paune hazaar')).toBe(750); });
    it('parses "paune do hazaar" as 1750', () => { expect(parseNumberPhrase('paune do hazaar')).toBe(1750); });
    it('parses "paune teen hazaar" as 2750', () => { expect(parseNumberPhrase('paune teen hazaar')).toBe(2750); });

    it('parses "saadhe teen sau" as 350', () => { expect(parseNumberPhrase('saadhe teen sau')).toBe(350); });
    it('parses "saadhe chaar sau" as 450', () => { expect(parseNumberPhrase('saadhe chaar sau')).toBe(450); });
    it('parses "saadhe paanch sau" as 550', () => { expect(parseNumberPhrase('saadhe paanch sau')).toBe(550); });
    it('parses "saadhe teen hazaar" as 3500', () => { expect(parseNumberPhrase('saadhe teen hazaar')).toBe(3500); });
    it('parses "saadhe chaar hazaar" as 4500', () => { expect(parseNumberPhrase('saadhe chaar hazaar')).toBe(4500); });

    it('parses "teen sau chaalis" as 340', () => { expect(parseNumberPhrase('teen sau chaalis')).toBe(340); });
    it('parses "paanch sau" as 500', () => { expect(parseNumberPhrase('paanch sau')).toBe(500); });
    it('parses "do hazaar paanch sau" as 2500', () => { expect(parseNumberPhrase('do hazaar paanch sau')).toBe(2500); });
    it('parses "do hazaar paanch sau chaalis" as 2540', () => { expect(parseNumberPhrase('do hazaar paanch sau chaalis')).toBe(2540); });
    it('parses "hazaar do sau" as 1200', () => { expect(parseNumberPhrase('hazaar do sau')).toBe(1200); });
    it('parses "sau chaalis" as 140', () => { expect(parseNumberPhrase('sau chaalis')).toBe(140); });
  });

  // =========================================================================
  // 4. Kannada Numbers
  // =========================================================================
  describe('4. Kannada Spoken Numbers & Compounds', () => {
    it('parses "ondu" as 1', () => { expect(parseNumberPhrase('ondu')).toBe(1); });
    it('parses "eradu" as 2', () => { expect(parseNumberPhrase('eradu')).toBe(2); });
    it('parses "mooru" as 3', () => { expect(parseNumberPhrase('mooru')).toBe(3); });
    it('parses "naalku" as 4', () => { expect(parseNumberPhrase('naalku')).toBe(4); });
    it('parses "aidu" as 5', () => { expect(parseNumberPhrase('aidu')).toBe(5); });
    it('parses "hattu" as 10', () => { expect(parseNumberPhrase('hattu')).toBe(10); });
    it('parses "ippattu" as 20', () => { expect(parseNumberPhrase('ippattu')).toBe(20); });
    it('parses "aivattu" as 50', () => { expect(parseNumberPhrase('aivattu')).toBe(50); });
    it('parses "nooru" as 100', () => { expect(parseNumberPhrase('nooru')).toBe(100); });
    it('parses "saavira" as 1000', () => { expect(parseNumberPhrase('saavira')).toBe(1000); });
    it('parses "eradu nooru" as 200', () => { expect(parseNumberPhrase('eradu nooru')).toBe(200); });
    it('parses "mooru nooru" as 300', () => { expect(parseNumberPhrase('mooru nooru')).toBe(300); });
    it('parses "naalku nooru" as 400', () => { expect(parseNumberPhrase('naalku nooru')).toBe(400); });
    it('parses "aidu nooru" as 500', () => { expect(parseNumberPhrase('aidu nooru')).toBe(500); });
    it('parses "eradu saavira" as 2000', () => { expect(parseNumberPhrase('eradu saavira')).toBe(2000); });
    it('parses "noora aivattu" as 150', () => { expect(parseNumberPhrase('noora aivattu')).toBe(150); });
    it('parses "eradu noora ippattu" as 220', () => { expect(parseNumberPhrase('eradu noora ippattu')).toBe(220); });
    it('parses "innooru" as 200', () => { expect(parseNumberPhrase('innooru')).toBe(200); });
    it('parses "munnooru" as 300', () => { expect(parseNumberPhrase('munnooru')).toBe(300); });
    it('parses "ainnooru" as 500', () => { expect(parseNumberPhrase('ainnooru')).toBe(500); });
    it('parses Kannada script "ಎರಡು ನೂರು" as 200', () => { expect(parseNumberPhrase('ಎರಡು ನೂರು')).toBe(200); });
    it('parses Kannada script "ಮೂರು ನೂರು" as 300', () => { expect(parseNumberPhrase('ಮೂರು ನೂರು')).toBe(300); });
    it('parses Kannada script "ಐದು ನೂರು" as 500', () => { expect(parseNumberPhrase('ಐದು ನೂರು')).toBe(500); });
    it('parses Kannada script "ಎರಡು ಸಾವಿರ" as 2000', () => { expect(parseNumberPhrase('ಎರಡು ಸಾವಿರ')).toBe(2000); });
  });

  // =========================================================================
  // 5. Tamil Numbers
  // =========================================================================
  describe('5. Tamil Spoken Numbers & Compounds', () => {
    it('parses "ondru" / "onnu" as 1', () => {
      expect(parseNumberPhrase('ondru')).toBe(1);
      expect(parseNumberPhrase('onnu')).toBe(1);
    });
    it('parses "irandu" / "rendu" as 2', () => {
      expect(parseNumberPhrase('irandu')).toBe(2);
      expect(parseNumberPhrase('rendu')).toBe(2);
    });
    it('parses "moondru" / "moonu" as 3', () => {
      expect(parseNumberPhrase('moondru')).toBe(3);
      expect(parseNumberPhrase('moonu')).toBe(3);
    });
    it('parses "naangu" / "naalu" as 4', () => {
      expect(parseNumberPhrase('naangu')).toBe(4);
      expect(parseNumberPhrase('naalu')).toBe(4);
    });
    it('parses "aindhu" / "anju" as 5', () => {
      expect(parseNumberPhrase('aindhu')).toBe(5);
      expect(parseNumberPhrase('anju')).toBe(5);
    });
    it('parses "patthu" as 10', () => { expect(parseNumberPhrase('patthu')).toBe(10); });
    it('parses "irubadhu" as 20', () => { expect(parseNumberPhrase('irubadhu')).toBe(20); });
    it('parses "aimbadhu" as 50', () => { expect(parseNumberPhrase('aimbadhu')).toBe(50); });
    it('parses "aayiram" as 1000', () => { expect(parseNumberPhrase('aayiram')).toBe(1000); });
    it('parses "rendu nooru" as 200', () => { expect(parseNumberPhrase('rendu nooru')).toBe(200); });
    it('parses "moonu nooru" as 300', () => { expect(parseNumberPhrase('moonu nooru')).toBe(300); });
    it('parses "anju nooru" as 500', () => { expect(parseNumberPhrase('anju nooru')).toBe(500); });
    it('parses "rendu aayiram" as 2000', () => { expect(parseNumberPhrase('rendu aayiram')).toBe(2000); });
    it('parses "noothi ambadhu" as 150', () => { expect(parseNumberPhrase('noothi ambadhu')).toBe(150); });
    it('parses "irunooru" as 200', () => { expect(parseNumberPhrase('irunooru')).toBe(200); });
    it('parses Tamil script "இரண்டு நூறு" as 200', () => { expect(parseNumberPhrase('இரண்டு நூறு')).toBe(200); });
    it('parses Tamil script "மூன்று நூறு" as 300', () => { expect(parseNumberPhrase('மூன்று நூறு')).toBe(300); });
    it('parses Tamil script "ஐந்து நூறு" as 500', () => { expect(parseNumberPhrase('ஐந்து நூறு')).toBe(500); });
    it('parses Tamil script "இரண்டு ஆயிரம்" as 2000', () => { expect(parseNumberPhrase('இரண்டு ஆயிரம்')).toBe(2000); });
  });

  // =========================================================================
  // 6. Telugu Numbers
  // =========================================================================
  describe('6. Telugu Spoken Numbers & Compounds', () => {
    it('parses "okati" as 1', () => { expect(parseNumberPhrase('okati')).toBe(1); });
    it('parses "rendu" as 2', () => { expect(parseNumberPhrase('rendu')).toBe(2); });
    it('parses "moodu" as 3', () => { expect(parseNumberPhrase('moodu')).toBe(3); });
    it('parses "naalugu" as 4', () => { expect(parseNumberPhrase('naalugu')).toBe(4); });
    it('parses "aidu" as 5', () => { expect(parseNumberPhrase('aidu')).toBe(5); });
    it('parses "padi" as 10', () => { expect(parseNumberPhrase('padi')).toBe(10); });
    it('parses "iravai" as 20', () => { expect(parseNumberPhrase('iravai')).toBe(20); });
    it('parses "yaabhai" as 50', () => { expect(parseNumberPhrase('yaabhai')).toBe(50); });
    it('parses "vanda" as 100', () => { expect(parseNumberPhrase('vanda')).toBe(100); });
    it('parses "veye" as 1000', () => { expect(parseNumberPhrase('veye')).toBe(1000); });
    it('parses "velu" as 1000', () => { expect(parseNumberPhrase('velu')).toBe(1000); });
    it('parses "moodu vanda" as 300', () => { expect(parseNumberPhrase('moodu vanda')).toBe(300); });
    it('parses "rendu vandalu" as 200', () => { expect(parseNumberPhrase('rendu vandalu')).toBe(200); });
    it('parses "aidu vandalu" as 500', () => { expect(parseNumberPhrase('aidu vandalu')).toBe(500); });
    it('parses "rendu velu" as 2000', () => { expect(parseNumberPhrase('rendu velu')).toBe(2000); });
    it('parses "vanda yaabhai" as 150', () => { expect(parseNumberPhrase('vanda yaabhai')).toBe(150); });
    it('parses Telugu script "రెండు వందలు" as 200', () => { expect(parseNumberPhrase('రెండు వందలు')).toBe(200); });
    it('parses Telugu script "మూడు వందలు" as 300', () => { expect(parseNumberPhrase('మూడు వందలు')).toBe(300); });
    it('parses Telugu script "ఐదు వందలు" as 500', () => { expect(parseNumberPhrase('ఐదు వందలు')).toBe(500); });
    it('parses Telugu script "రెండు వేలు" as 2000', () => { expect(parseNumberPhrase('రెండు వేలు')).toBe(2000); });
  });

  // =========================================================================
  // 7. English & Code-Mixed Forms
  // =========================================================================
  describe('7. English and Code-Mixed Forms', () => {
    it('parses "teen sau 40" as 340', () => { expect(parseNumberPhrase('teen sau 40')).toBe(340); });
    it('parses "3 sau 40" as 340', () => { expect(parseNumberPhrase('3 sau 40')).toBe(340); });
    it('parses "3 sau chaalis" as 340', () => { expect(parseNumberPhrase('3 sau chaalis')).toBe(340); });
    it('parses "5 hazaar 200" as 5200', () => { expect(parseNumberPhrase('5 hazaar 200')).toBe(5200); });
    it('parses "2 hazaar 500" as 2500', () => { expect(parseNumberPhrase('2 hazaar 500')).toBe(2500); });
    it('parses "1 lakh 20 hazaar" as 120000', () => { expect(parseNumberPhrase('1 lakh 20 hazaar')).toBe(120000); });
    it('parses "10 hazaar" as 10000', () => { expect(parseNumberPhrase('10 hazaar')).toBe(10000); });
    it('parses "5k" as 5000', () => { expect(parseNumberPhrase('5k')).toBe(5000); });
    it('parses "10k" as 10000', () => { expect(parseNumberPhrase('10k')).toBe(10000); });
    it('parses "25k" as 25000', () => { expect(parseNumberPhrase('25k')).toBe(25000); });
    it('parses "one hundred" as 100', () => { expect(parseNumberPhrase('one hundred')).toBe(100); });
    it('parses "one hundred forty" as 140', () => { expect(parseNumberPhrase('one hundred forty')).toBe(140); });
    it('parses "two hundred" as 200', () => { expect(parseNumberPhrase('two hundred')).toBe(200); });
    it('parses "five hundred" as 500', () => { expect(parseNumberPhrase('five hundred')).toBe(500); });
    it('parses "one thousand five hundred" as 1500', () => { expect(parseNumberPhrase('one thousand five hundred')).toBe(1500); });
    it('parses "twenty five hundred" as 2500', () => { expect(parseNumberPhrase('twenty five hundred')).toBe(2500); });
    it('parses "three hundred and forty" as 340', () => { expect(parseNumberPhrase('three hundred and forty')).toBe(340); });
  });

  // =========================================================================
  // 8. ASR Quirks (Spaced Digits, Commas, Trailing Currency)
  // =========================================================================
  describe('8. ASR Quirks and Cleanups', () => {
    it('parses spaced digits "3 40" as 340', () => { expect(parseNumberPhrase('3 40')).toBe(340); });
    it('parses spaced digits "1 500" as 1500', () => { expect(parseNumberPhrase('1 500')).toBe(1500); });
    it('parses spaced digits "5 50" as 550', () => { expect(parseNumberPhrase('5 50')).toBe(550); });
    it('parses spaced digits "2 50" as 250', () => { expect(parseNumberPhrase('2 50')).toBe(250); });
    it('parses comma formatted "1,500" as 1500', () => { expect(parseNumberPhrase('1,500')).toBe(1500); });
    it('parses comma formatted "25,000" as 25000', () => { expect(parseNumberPhrase('25,000')).toBe(25000); });
    it('parses Indian grouping "1,24,500" as 124500', () => { expect(parseNumberPhrase('1,24,500')).toBe(124500); });
    it('parses "340 rupaye" as 340', () => { expect(parseNumberPhrase('340 rupaye')).toBe(340); });
    it('parses "340 rs" as 340', () => { expect(parseNumberPhrase('340 rs')).toBe(340); });
    it('parses "340 rupees" as 340', () => { expect(parseNumberPhrase('340 rupees')).toBe(340); });
    it('parses "₹340" as 340', () => { expect(parseNumberPhrase('₹340')).toBe(340); });
    it('parses "₹ 500" as 500', () => { expect(parseNumberPhrase('₹ 500')).toBe(500); });
    it('parses bill format "500/-" as 500', () => { expect(parseNumberPhrase('500/-')).toBe(500); });
    it('parses "500 ರೂಪಾಯಿ" as 500', () => { expect(parseNumberPhrase('500 ರೂಪಾಯಿ')).toBe(500); });
    it('parses "500 ரூபாய்" as 500', () => { expect(parseNumberPhrase('500 ரூபாய்')).toBe(500); });
    it('parses "500 రూపాయలు" as 500', () => { expect(parseNumberPhrase('500 రూపాయలు')).toBe(500); });
  });

  // =========================================================================
  // 9. Noisy Variants and Misspellings
  // =========================================================================
  describe('9. Noisy Variants and Misspellings', () => {
    it('parses "panch sau" as 500', () => { expect(parseNumberPhrase('panch sau')).toBe(500); });
    it('parses "paach sau" as 500', () => { expect(parseNumberPhrase('paach sau')).toBe(500); });
    it('parses "tin sau chalis" as 340', () => { expect(parseNumberPhrase('tin sau chalis')).toBe(340); });
    it('parses "dhai hajar" as 2500', () => { expect(parseNumberPhrase('dhai hajar')).toBe(2500); });
    it('parses "deydh sau" as 150', () => { expect(parseNumberPhrase('deydh sau')).toBe(150); });
    it('parses "savva sau" as 125', () => { expect(parseNumberPhrase('savva sau')).toBe(125); });
    it('parses "sawwa hazar" as 1250', () => { expect(parseNumberPhrase('sawwa hazar')).toBe(1250); });
    it('parses "dhai so" as 250', () => { expect(parseNumberPhrase('dhai so')).toBe(250); });
    it('parses "pone do sau" as 175', () => { expect(parseNumberPhrase('pone do sau')).toBe(175); });
    it('parses "erdu nooru" as 200', () => { expect(parseNumberPhrase('erdu nooru')).toBe(200); });
    it('parses "munu nooru" as 300', () => { expect(parseNumberPhrase('munu nooru')).toBe(300); });
    it('parses "mudu vanda" as 300', () => { expect(parseNumberPhrase('mudu vanda')).toBe(300); });
    it('returns null for "hello world"', () => { expect(parseNumberPhrase('hello world')).toBeNull(); });
    it('returns null for "ramesh"', () => { expect(parseNumberPhrase('ramesh')).toBeNull(); });
    it('returns null for empty string ""', () => { expect(parseNumberPhrase('')).toBeNull(); });
  });

  // =========================================================================
  // 10. Ambiguity and Confidence Scoring
  // =========================================================================
  describe('10. Ambiguity and Confidence Scoring (< 0.7 vs >= 0.85)', () => {
    it('assigns confidence < 0.7 to single isolated "ek" without currency', () => {
      const res = extractAmounts('Ramesh ko ek khata de');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(1);
      expect(res[0].confidence).toBeLessThan(0.7);
    });

    it('assigns confidence < 0.7 to single isolated "do" without currency', () => {
      const res = extractAmounts('Suresh bhai do hisaab');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(2);
      expect(res[0].confidence).toBeLessThan(0.7);
    });

    it('boosts confidence >= 0.85 when currency word follows small digit ("ek rupaya")', () => {
      const res = extractAmounts('Ramesh ko ek rupaya diya');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(1);
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.85);
    });

    it('assigns confidence < 0.7 to ASR spaced digits quirk without currency', () => {
      const res = extractAmounts('Suresh room 3 40');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(340);
      expect(res[0].confidence).toBeLessThan(0.7);
    });

    it('boosts confidence to >= 0.85 for spaced digits with currency marker ("3 40 rupaye")', () => {
      const res = extractAmounts('Suresh ne 3 40 rupaye diye');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(340);
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.85);
    });

    it('gives high confidence (>= 0.95) to unambiguous rupee amount "₹500"', () => {
      const res = extractAmounts('Ramesh ko ₹500 diya');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(500);
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.95);
    });
  });

  // =========================================================================
  // 11. extractAmounts() Function on Natural Kirana Utterances
  // =========================================================================
  describe('11. extractAmounts() Real Sentences & Multi-Amounts', () => {
    it('extracts "500" from "Ramesh ko 500 udhaar diya"', () => {
      const res = extractAmounts('Ramesh ko 500 udhaar diya');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(500);
      expect(res[0].start).toBe(10);
      expect(res[0].end).toBe(13);
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.85);
    });

    it('extracts "teen sau chaalis" from "Ramesh ko teen sau chaalis udhaar diya"', () => {
      const res = extractAmounts('Ramesh ko teen sau chaalis udhaar diya');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(340);
      expect(res[0].raw).toBe('teen sau chaalis');
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.85);
    });

    it('extracts both amounts from "340 udhaar, kal 200 diya tha"', () => {
      const res = extractAmounts('340 udhaar, kal 200 diya tha');
      expect(res).toHaveLength(2);
      expect(res[0].value).toBe(340);
      expect(res[0].start).toBe(0);
      expect(res[0].end).toBe(3);
      expect(res[1].value).toBe(200);
    });

    it('extracts Kannada amount from "Lakshmi ge eradu nooru kodi"', () => {
      const res = extractAmounts('Lakshmi ge eradu nooru kodi');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(200);
      expect(res[0].raw).toBe('eradu nooru');
    });

    it('extracts Tamil amount from "Murugan ku rendu nooru koduthen"', () => {
      const res = extractAmounts('Murugan ku rendu nooru koduthen');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(200);
      expect(res[0].raw).toBe('rendu nooru');
    });

    it('extracts Telugu amount from "Venkatesh ki moodu vanda ivvali"', () => {
      const res = extractAmounts('Venkatesh ki moodu vanda ivvali');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(300);
      expect(res[0].raw).toBe('moodu vanda');
    });

    it('extracts "dhai hazaar rupaye" from "Suresh ne dhai hazaar rupaye jama kiye"', () => {
      const res = extractAmounts('Suresh ne dhai hazaar rupaye jama kiye');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(2500);
      expect(res[0].confidence).toBeGreaterThanOrEqual(0.85);
    });

    it('extracts "dedh sau" from "Pooja ne dedh sau jama kiya"', () => {
      const res = extractAmounts('Pooja ne dedh sau jama kiya');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(150);
    });

    it('extracts "sawa sau" from "Ramesh ka sawa sau baki"', () => {
      const res = extractAmounts('Ramesh ka sawa sau baki');
      expect(res).toHaveLength(1);
      expect(res[0].value).toBe(125);
    });

    it('returns empty array when no amount exists in balance query', () => {
      const res = extractAmounts('Ramesh ka total kitna hai?');
      expect(res).toHaveLength(0);
    });
  });
});
