/**
 * Test Suite for F14 Profile Validators & Spoken Parser
 * 
 * Verifies >= 25 cases:
 * 1. validateShopName
 * 2. validateShopkeeperName
 * 3. validatePhoneNumber (Indian mobile rules, 10 digits starting with 6-9)
 * 4. validateUpiId (NPCI VPA regex)
 * 5. parseSpokenUpiId (converts spoken "at", "at the rate", "at-the-rate", "एट", "एट द रेट" into @)
 * 6. isTrivialPin & validatePinStrength (4-6 digits, rejects 0000, 1234, 4321, 2580, etc.)
 */

import { describe, it, expect } from 'vitest';
import {
  validateShopName,
  validateShopkeeperName,
  validatePhoneNumber,
  validateUpiId,
  parseSpokenUpiId,
  isTrivialPin,
  validatePinStrength,
} from '../../lib/profileValidators';

describe('F14 Profile Validators & Spoken Parser', () => {
  describe('validateShopName', () => {
    it('1. accepts valid shop name', () => {
      const res = validateShopName('Sri Balaji Kirana Store');
      expect(res.isValid).toBe(true);
    });

    it('2. rejects empty shop name', () => {
      const res = validateShopName('');
      expect(res.isValid).toBe(false);
      expect(res.error).toBeDefined();
    });

    it('3. rejects whitespace only shop name', () => {
      const res = validateShopName('   ');
      expect(res.isValid).toBe(false);
    });

    it('4. rejects single character shop name', () => {
      const res = validateShopName('A');
      expect(res.isValid).toBe(false);
    });

    it('5. rejects shop name exceeding 60 characters', () => {
      const longName = 'A'.repeat(61);
      const res = validateShopName(longName);
      expect(res.isValid).toBe(false);
    });
  });

  describe('validateShopkeeperName', () => {
    it('6. accepts valid shopkeeper name', () => {
      const res = validateShopkeeperName('Ramesh Kumar');
      expect(res.isValid).toBe(true);
    });

    it('7. rejects empty shopkeeper name', () => {
      const res = validateShopkeeperName('');
      expect(res.isValid).toBe(false);
    });

    it('8. rejects single character shopkeeper name', () => {
      const res = validateShopkeeperName('R');
      expect(res.isValid).toBe(false);
    });

    it('9. rejects shopkeeper name exceeding 60 characters', () => {
      const longName = 'R'.repeat(65);
      const res = validateShopkeeperName(longName);
      expect(res.isValid).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('10. accepts clean 10-digit Indian mobile number starting with 9', () => {
      const res = validatePhoneNumber('9845012345');
      expect(res.isValid).toBe(true);
      expect(res.cleanPhone).toBe('9845012345');
    });

    it('11. accepts 10-digit numbers starting with 8, 7, 6', () => {
      expect(validatePhoneNumber('8765432109').isValid).toBe(true);
      expect(validatePhoneNumber('7654321098').isValid).toBe(true);
      expect(validatePhoneNumber('6543210987').isValid).toBe(true);
    });

    it('12. normalizes +91 prefix and punctuation', () => {
      const res = validatePhoneNumber('+91 98450-12345');
      expect(res.isValid).toBe(true);
      expect(res.cleanPhone).toBe('9845012345');
    });

    it('13. normalizes leading 0', () => {
      const res = validatePhoneNumber('09845012345');
      expect(res.isValid).toBe(true);
      expect(res.cleanPhone).toBe('9845012345');
    });

    it('14. rejects phone number with less than 10 digits', () => {
      const res = validatePhoneNumber('984501234');
      expect(res.isValid).toBe(false);
    });

    it('15. rejects phone number starting with invalid digits (1-5)', () => {
      const res = validatePhoneNumber('5545012345');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('must start with 6, 7, 8, or 9');
    });

    it('16. rejects non-numeric alphabetic input', () => {
      const res = validatePhoneNumber('notanumber');
      expect(res.isValid).toBe(false);
    });
  });

  describe('validateUpiId', () => {
    it('17. accepts valid standard UPI ID', () => {
      expect(validateUpiId('ramesh@oksbi').isValid).toBe(true);
      expect(validateUpiId('balaji.kirana@icici').isValid).toBe(true);
      expect(validateUpiId('9845012345@paytm').isValid).toBe(true);
      expect(validateUpiId('store-owner@okhdfcbank').isValid).toBe(true);
    });

    it('18. rejects UPI ID without @ symbol', () => {
      const res = validateUpiId('rameshoksbi');
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('must include an "@"');
    });

    it('19. rejects UPI ID without bank handle after @', () => {
      const res = validateUpiId('ramesh@');
      expect(res.isValid).toBe(false);
    });

    it('20. rejects UPI ID with invalid characters or spaces', () => {
      expect(validateUpiId('ramesh kumar@oksbi').isValid).toBe(false);
      expect(validateUpiId('ramesh#@oksbi').isValid).toBe(false);
    });

    it('21. rejects empty UPI ID', () => {
      expect(validateUpiId('').isValid).toBe(false);
    });
  });

  describe('parseSpokenUpiId', () => {
    it('22. parses spoken "at the rate"', () => {
      expect(parseSpokenUpiId('ramesh at the rate oksbi')).toBe('ramesh@oksbi');
    });

    it('23. parses spoken "at the rate of"', () => {
      expect(parseSpokenUpiId('kirana at the rate of sbi')).toBe('kirana@sbi');
    });

    it('24. parses spoken "at"', () => {
      expect(parseSpokenUpiId('sribalaji at paytm')).toBe('sribalaji@paytm');
    });

    it('25. parses spoken Hindi "एट द रेट"', () => {
      expect(parseSpokenUpiId('ramesh एट द रेट sbi')).toBe('ramesh@sbi');
    });

    it('26. parses spoken Hindi "एट"', () => {
      expect(parseSpokenUpiId('sharma एट icici')).toBe('sharma@icici');
    });

    it('27. strips internal spaces and lowercases', () => {
      expect(parseSpokenUpiId(' Ramesh Kumar at OK HDFC Bank ')).toBe('rameshkumar@okhdfcbank');
    });

    it('28. handles empty or null input gracefully', () => {
      expect(parseSpokenUpiId('')).toBe('');
    });
  });

  describe('isTrivialPin & validatePinStrength', () => {
    it('29. rejects repeated digit PINs (0000, 1111, 999999)', () => {
      expect(isTrivialPin('0000')).toBe(true);
      expect(isTrivialPin('1111')).toBe(true);
      expect(isTrivialPin('999999')).toBe(true);
      expect(validatePinStrength('1111').isValid).toBe(false);
    });

    it('30. rejects sequential ascending PINs (1234, 2345, 123456)', () => {
      expect(isTrivialPin('1234')).toBe(true);
      expect(isTrivialPin('2345')).toBe(true);
      expect(isTrivialPin('123456')).toBe(true);
      expect(validatePinStrength('1234').isValid).toBe(false);
    });

    it('31. rejects sequential descending PINs (4321, 654321)', () => {
      expect(isTrivialPin('4321')).toBe(true);
      expect(isTrivialPin('654321')).toBe(true);
      expect(validatePinStrength('4321').isValid).toBe(false);
    });

    it('32. rejects known common patterns (2580, 1379)', () => {
      expect(isTrivialPin('2580')).toBe(true);
      expect(isTrivialPin('1379')).toBe(true);
      expect(validatePinStrength('2580').isValid).toBe(false);
    });

    it('33. accepts strong 4 to 6 digit non-trivial PINs', () => {
      expect(validatePinStrength('8492').isValid).toBe(true);
      expect(validatePinStrength('719304').isValid).toBe(true);
      expect(validatePinStrength('3951').isValid).toBe(true);
    });

    it('34. rejects PINs shorter than 4 digits or longer than 6 digits', () => {
      expect(validatePinStrength('123').isValid).toBe(false);
      expect(validatePinStrength('1234567').isValid).toBe(false);
    });

    it('35. rejects non-numeric PINs', () => {
      expect(validatePinStrength('abcd').isValid).toBe(false);
    });
  });
});
