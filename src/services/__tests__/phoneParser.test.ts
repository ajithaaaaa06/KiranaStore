/**
 * Test Suite for /services/phoneParser.ts (F15)
 * 
 * Verifies >= 60 table-driven cases:
 * 1. Typed Latin digits (clean, spaced, hyphenated, dotted)
 * 2. Devanagari, Kannada, Tamil, and Telugu native digits
 * 3. Spoken English digit-by-digit
 * 4. Spoken Hindi digit-by-digit
 * 5. Spoken Kannada digit-by-digit
 * 6. Spoken Tamil digit-by-digit
 * 7. Spoken Telugu digit-by-digit
 * 8. Multipliers (double, triple, dabal, treepal, native)
 * 9. Country codes (+91, plus nine one, 91 prefix, leading 0)
 * 10. ASR noise and filler words
 * 11. Invalid lengths (9 digits, 11 digits, 8 digits) - confidence < 0.5 & issues filled
 * 12. Invalid first digit (1-5) - confidence < 0.5 & issues filled
 * 13. Helpers: maskPhone, lastDigits, formatPhone, phoneSpokenText
 */

import { describe, it, expect } from 'vitest';
import {
  parsePhoneNumber,
  extractDigitSequence,
  maskPhone,
  lastDigits,
  formatPhone,
  phoneSpokenText,
} from '../phoneParser';

describe('Phone Parser Service (F15)', () => {
  describe('1. Typed Latin digits with delimiters', () => {
    const cases = [
      { input: '9845012345', expected: '9845012345' },
      { input: '98450 12345', expected: '9845012345' },
      { input: '98450-12345', expected: '9845012345' },
      { input: '98450.12345', expected: '9845012345' },
      { input: '98450, 12345', expected: '9845012345' },
      { input: '(98450) 12345', expected: '9845012345' },
      { input: '984 501 2345', expected: '9845012345' },
      { input: '9 8 4 5 0 1 2 3 4 5', expected: '9845012345' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 1.${idx + 1}: parses "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.confidence).toBeGreaterThanOrEqual(0.95);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('2. Native script digits', () => {
    const cases = [
      // Devanagari (० - ९)
      { input: '९८४५०१२३४५', expected: '9845012345', desc: 'Devanagari full' },
      { input: '९८४५० १२३४५', expected: '9845012345', desc: 'Devanagari spaced' },
      { input: '९८४५०-१२३४५', expected: '9845012345', desc: 'Devanagari hyphenated' },
      // Kannada (೦ - ೯)
      { input: '೯೮೪೫೦೧೨೩೪೫', expected: '9845012345', desc: 'Kannada full' },
      { input: '೯೮೪೫೦ ೧೨೩೪೫', expected: '9845012345', desc: 'Kannada spaced' },
      // Tamil (௦ - ௯)
      { input: '௯௮௪௫௦௧௨௩௪௫', expected: '9845012345', desc: 'Tamil full' },
      { input: '௯௮௪௫௦ ௧௨௩௪௫', expected: '9845012345', desc: 'Tamil spaced' },
      // Telugu (౦ - ౯)
      { input: '౯౮౪౫౦౧౨౩౪౫', expected: '9845012345', desc: 'Telugu full' },
      { input: '౯౮౪౫౦ ౧౨౩౪౫', expected: '9845012345', desc: 'Telugu spaced' },
    ];

    cases.forEach(({ input, expected, desc }, idx) => {
      it(`Case 2.${idx + 1}: parses ${desc} "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('3. Spoken English digits', () => {
    const cases = [
      { input: 'nine eight four five zero one two three four five', expected: '9845012345' },
      { input: 'nine eight four five oh one two three four five', expected: '9845012345' },
      { input: 'seven six five four three two one zero nine eight', expected: '7654321098' },
      { input: 'eight seven six five four three two one zero nine', expected: '8765432109' },
      { input: 'six nine eight seven six five four three two one', expected: '6987654321' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 3.${idx + 1}: parses English speech "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('4. Spoken Hindi digits (Romanised & Devanagari)', () => {
    const cases = [
      { input: 'nau aath chaar paanch shunya ek do teen char paanch', expected: '9845012345' },
      { input: 'nau aath char panch soonya ek do teen char panch', expected: '9845012345' },
      { input: 'saat chhe paanch char teen do ek shunya nau aath', expected: '7654321098' },
      { input: 'aath saat chhe paanch char teen do ek shunya nau', expected: '8765432109' },
      { input: 'नौ आठ चार पाँच शून्य एक दो तीन चार पाँच', expected: '9845012345' },
      { input: 'सात छह पाँच चार तीन दो एक शून्य नौ आठ', expected: '7654321098' },
      { input: 'आठ सात छह पांच चार तीन दो एक शून्य नौ', expected: '8765432109' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 4.${idx + 1}: parses Hindi speech "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('5. Spoken Kannada digits', () => {
    const cases = [
      { input: 'ombattu entu naalku aidu sonne ondu eradu mooru naalku aidu', expected: '9845012345' },
      { input: 'eelu aaru aidu naalku mooru eradu ondu sonne ombattu entu', expected: '7654321098' },
      { input: 'ಒಂಬತ್ತು ಎಂಟು ನಾಲ್ಕು ಐದು ಸೊನ್ನೆ ಒಂದು ಎರಡು ಮೂರು ನಾಲ್ಕು ಐದು', expected: '9845012345' },
      { input: 'ಏಳು ಆರು ಐದು ನಾಲ್ಕು ಮೂರು ಎರಡು ಒಂದು ಸೊನ್ನೆ ಒಂಬತ್ತು ಎಂಟು', expected: '7654321098' },
      { input: 'ಎಂಟು ಏಳು ಆರು ಐದು ನಾಲ್ಕು ಮೂರು ಎರಡು ಒಂದು ಸೊನ್ನೆ ಒಂಬತ್ತು', expected: '8765432109' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 5.${idx + 1}: parses Kannada speech "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('6. Spoken Tamil digits', () => {
    const cases = [
      { input: 'onbadhu ettu naangu aindhu poojyam ondru irandu moondru naangu aindhu', expected: '9845012345' },
      { input: 'eezhu aaru aindhu naangu moondru irandu onnu poojyam onbadhu ettu', expected: '7654321098' },
      { input: 'ஒன்பது எட்டு நான்கு ஐந்து பூஜ்யம் ஒன்று இரண்டு மூன்று நான்கு ஐந்து', expected: '9845012345' },
      { input: 'ஏழு ஆறு ஐந்து நான்கு மூன்று இரண்டு ஒன்று பூஜ்யம் ஒன்பது எட்டு', expected: '7654321098' },
      { input: 'எட்டு ஏழு ஆறு ஐந்து நான்கு மூன்று இரண்டு ஒன்று பூஜ்யம் ஒன்பது', expected: '8765432109' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 6.${idx + 1}: parses Tamil speech "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('7. Spoken Telugu digits', () => {
    const cases = [
      { input: 'tommidi enimidi naalugu aidu sunna okati rendu moodu naalugu aidu', expected: '9845012345' },
      { input: 'eedu aaru aidu naalugu moodu rendu okati sunna tommidi enimidi', expected: '7654321098' },
      { input: 'తొమ్మిది ఎనిమిది నాలుగు ఐదు సున్నా ఒకటి రెండు మూడు నాలుగు ఐదు', expected: '9845012345' },
      { input: 'ఏడు ఆరు ఐదు నాలుగు మూడు రెండు ఒకటి సున్నా తొమ్మిది ఎనిమిది', expected: '7654321098' },
      { input: 'ఎనిమిది ఏడు ఆరు ఐదు నాలుగు మూడు రెండు ఒకటి సున్నా తొమ్మిది', expected: '8765432109' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 7.${idx + 1}: parses Telugu speech "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('8. Repeat multipliers (double / triple)', () => {
    const cases = [
      { input: '984 double five zero one two three four', expected: '9845501234' },
      { input: '984 dabal paanch zero one two three four', expected: '9845501234' },
      { input: '98 triple nine one two three four five', expected: '9899912345' },
      { input: '98 treepal 9 1 2 3 4 5', expected: '9899912345' },
      { input: 'नौ आठ डबल पाँच शून्य एक दो तीन चार पाँच', expected: '9855012345' },
      { input: '९८ ट्रिपल ९ १२३४५', expected: '9899912345' },
      { input: 'ಒಂಬತ್ತು ಎಂಟು ಡಬಲ್ ಐದು ಸೊನ್ನೆ ಒಂದು ಎರಡು ಮೂರು ನಾಲ್ಕು ಐದು', expected: '9855012345' },
      { input: 'ஒன்பது எட்டு டபுள் ஐந்து பூஜ்யம் ஒன்று இரண்டு மூன்று நான்கு ஐந்து', expected: '9855012345' },
      { input: 'తొమ్మిది ఎనిమిది డబుల్ ఐదు సున్నా ఒకటి రెండు మూడు నాలుగు ఐదు', expected: '9855012345' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 8.${idx + 1}: handles multiplier in "${input}"`, () => {
        const digits = extractDigitSequence(input);
        expect(digits).toBe(expected);
      });
    });
  });

  describe('9. Country codes and leading zero stripping', () => {
    const cases = [
      { input: '+91 9845012345', expected: '9845012345' },
      { input: '+91-98450-12345', expected: '9845012345' },
      { input: '919845012345', expected: '9845012345' },
      { input: '09845012345', expected: '9845012345' },
      { input: 'plus nine one 9845012345', expected: '9845012345' },
      { input: 'प्लस नौ एक ९८४५०१२३४५', expected: '9845012345' },
      { input: 'ಪ್ಲಸ್ ಒಂಬತ್ತು ಒಂದು ೯೮೪೫೦೧೨೩೪೫', expected: '9845012345' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 9.${idx + 1}: strips prefix from "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('10. ASR noise and filler words', () => {
    const cases = [
      { input: 'customer phone number 98450 12345', expected: '9845012345' },
      { input: 'umm number hai 98450 12345', expected: '9845012345' },
      { input: 'wo phone no 984 50 1 2345 likho', expected: '9845012345' },
      { input: 'arre mobile number daalo 9845012345', expected: '9845012345' },
      { input: 'grahak ka number 9845012345 hai', expected: '9845012345' },
      { input: 'सुरेश का फोन नंबर ९८४५० १२३४५', expected: '9845012345' },
      { input: 'ಸುರೇಶ್ ಮೊಬೈಲ್ ನಂಬರ್ ೯೮೪೫೦ ೧೨೩೪೫', expected: '9845012345' },
      { input: 'சுரேஷ் போன் நம்பர் ௯௮௪௫௦ ௧௨௩௪௫', expected: '9845012345' },
      { input: 'సురేష్ మొబైల్ నంబర్ ౯౮౪౫౦ ౧౨౩౪౫', expected: '9845012345' },
    ];

    cases.forEach(({ input, expected }, idx) => {
      it(`Case 10.${idx + 1}: ignores fillers in "${input}"`, () => {
        const res = parsePhoneNumber(input);
        expect(res).not.toBeNull();
        expect(res?.digits).toBe(expected);
        expect(res?.issues).toHaveLength(0);
      });
    });
  });

  describe('11. Invalid lengths and non-mobile first digits (SLA: confidence < 0.5, issues filled)', () => {
    it('11.1 rejects 9 digits (1 digit missing)', () => {
      const res = parsePhoneNumber('984501234');
      expect(res).not.toBeNull();
      expect(res?.digits).toBe('984501234');
      expect(res?.confidence).toBeLessThan(0.5);
      expect(res?.issues.some((i) => i.includes('9 digits'))).toBe(true);
    });

    it('11.2 rejects 11 digits without 0 prefix', () => {
      const res = parsePhoneNumber('98450123456');
      expect(res).not.toBeNull();
      expect(res?.confidence).toBeLessThan(0.5);
      expect(res?.issues.some((i) => i.includes('11 digits'))).toBe(true);
    });

    it('11.3 rejects 8 digits', () => {
      const res = parsePhoneNumber('98450123');
      expect(res).not.toBeNull();
      expect(res?.confidence).toBeLessThan(0.5);
      expect(res?.issues.length).toBeGreaterThan(0);
    });

    it('11.4 rejects first digit < 6 (e.g. 5845012345)', () => {
      const res = parsePhoneNumber('5845012345');
      expect(res).not.toBeNull();
      expect(res?.confidence).toBeLessThan(0.5);
      expect(res?.issues.some((i) => i.includes('start with 6, 7, 8, or 9'))).toBe(true);
    });

    it('11.5 rejects first digit 1 (e.g. 1845012345)', () => {
      const res = parsePhoneNumber('1845012345');
      expect(res).not.toBeNull();
      expect(res?.confidence).toBeLessThan(0.5);
      expect(res?.issues.some((i) => i.includes('start with 6, 7, 8, or 9'))).toBe(true);
    });

    it('11.6 returns null for empty text', () => {
      expect(parsePhoneNumber('')).toBeNull();
      expect(parsePhoneNumber('   ')).toBeNull();
    });
  });

  describe('12. Helper formatting functions', () => {
    it('12.1 formatPhone formats to 5+5 group', () => {
      expect(formatPhone('9845012345')).toBe('98450 12345');
    });

    it('12.2 lastDigits extracts last n digits', () => {
      expect(lastDigits('9845012345')).toBe('2345');
      expect(lastDigits('9845012345', 2)).toBe('45');
    });

    it('12.3 maskPhone masks leading 6 digits with bullets', () => {
      expect(maskPhone('9845012345')).toBe('••••••2345');
    });

    it('12.4 phoneSpokenText generates slow pairs with pauses', () => {
      const hiSpoken = phoneSpokenText('9845012345', 'hi');
      expect(hiSpoken).toBe('नौ आठ, चार पाँच, शून्य एक, दो तीन, चार पाँच');

      const enSpoken = phoneSpokenText('9845012345', 'en');
      expect(enSpoken).toBe('nine eight, four five, zero one, two three, four five');

      const knSpoken = phoneSpokenText('9845012345', 'kn');
      expect(knSpoken).toBe('ಒಂಬತ್ತು ಎಂಟು, ನಾಲ್ಕು ಐದು, ಸೊನ್ನೆ ಒಂದು, ಎರಡು ಮೂರು, ನಾಲ್ಕು ಐದು');

      const taSpoken = phoneSpokenText('9845012345', 'ta');
      expect(taSpoken).toBe('ஒன்பது எட்டு, நான்கு ஐந்து, பூஜ்யம் ஒன்று, இரண்டு மூன்று, நான்கு ஐந்து');

      const teSpoken = phoneSpokenText('9845012345', 'te');
      expect(teSpoken).toBe('తొమ్మిది ఎనిమిది, నాలుగు ఐదు, సున్నా ఒకటి, రెండు మూడు, నాలుగు ఐదు');
    });
  });
});
