/**
 * Shop Profile Validation and Voice Input Utilities for F14
 * 
 * Rules:
 * 1. Shop name & Shopkeeper name: 2 to 60 characters trimmed.
 * 2. Phone number: Valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).
 * 3. UPI ID: Pattern ^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$
 * 4. Spoken UPI parser: converts spoken "at", "at the rate", "at the rate of", "एट", "एट द रेट" into @
 * 5. PIN strength: 4 to 6 digits, rejects trivial/weak PINs (repeated digits, sequential sequences).
 */

import { cleanPhoneNumber } from './formatters';

export const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

/**
 * Validates shop name: 2 to 60 characters
 */
export function validateShopName(name: string): { isValid: boolean; error?: string } {
  const trimmed = (name || '').trim();
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Shop name must be at least 2 characters' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Shop name cannot exceed 60 characters' };
  }
  return { isValid: true };
}

/**
 * Validates shopkeeper name: 2 to 60 characters
 */
export function validateShopkeeperName(name: string): { isValid: boolean; error?: string } {
  const trimmed = (name || '').trim();
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Shopkeeper name must be at least 2 characters' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Shopkeeper name cannot exceed 60 characters' };
  }
  return { isValid: true };
}

/**
 * Validates Indian mobile number: 10 digits starting with 6, 7, 8, or 9
 */
export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string; cleanPhone?: string } {
  const clean = cleanPhoneNumber(phone);
  if (!clean || clean.length !== 10) {
    return { isValid: false, error: 'Phone number must be exactly 10 digits' };
  }
  if (!/^[6-9]/.test(clean)) {
    return { isValid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9' };
  }
  return { isValid: true, cleanPhone: clean };
}

/**
 * Validates UPI ID according to NPCI VPA format: ^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$
 */
export function validateUpiId(upiId: string): { isValid: boolean; error?: string } {
  const trimmed = (upiId || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'UPI ID is required' };
  }
  if (!trimmed.includes('@')) {
    return { isValid: false, error: 'UPI ID must include an "@" symbol (e.g. name@bank)' };
  }
  if (!UPI_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Invalid UPI ID format. Example: ramesh@oksbi or 9845012345@paytm' };
  }
  return { isValid: true };
}

/**
 * Parses spoken UPI ID into valid format:
 * - Converts spoken "at", "at the rate", "at the rate of", "एट", "एट द रेट" into @
 * - Cleans spaces around @ and within username
 * - Normalizes to lowercase
 */
export function parseSpokenUpiId(transcript: string): string {
  if (!transcript) return '';

  let text = transcript.trim();

  // Replace spoken variations of "@"
  // Handles: "at the rate of", "at the rate", "at-the-rate", "at", "एट द रेट", "एट"
  text = text.replace(/\bat\s+the\s+rate\s+of\b/gi, '@');
  text = text.replace(/\bat\s+the\s+rate\b/gi, '@');
  text = text.replace(/\bat-the-rate\b/gi, '@');
  text = text.replace(/\s+at\s+/gi, '@');
  text = text.replace(/\s*@\s*/g, '@');
  text = text.replace(/एट\s+द\s+रेट/gi, '@');
  text = text.replace(/\s+एट\s+/gi, '@');

  // Handle case where "at" might be directly attached or spoken like "ramesh at oksbi"
  text = text.replace(/\s+at([a-zA-Z])/gi, '@$1');

  // Remove internal spaces
  text = text.replace(/\s+/g, '');

  return text.toLowerCase();
}

/**
 * Checks if a PIN is trivial (e.g. 0000, 1111, 1234, 4321)
 */
export function isTrivialPin(pin: string): boolean {
  if (!pin || pin.length < 4 || pin.length > 6) return true;

  // 1. All identical digits (e.g. 0000, 1111, 22222, 999999)
  const first = pin[0];
  if (pin.split('').every((c) => c === first)) {
    return true;
  }

  // 2. Sequential ascending (e.g. 1234, 2345, 0123, 123456)
  const digits = pin.split('').map(Number);
  let isAscending = true;
  let isDescending = true;

  for (let i = 1; i < digits.length; i++) {
    if (digits[i] !== digits[i - 1] + 1) {
      isAscending = false;
    }
    if (digits[i] !== digits[i - 1] - 1) {
      isDescending = false;
    }
  }

  if (isAscending || isDescending) {
    return true;
  }

  // 3. Known common weak patterns
  const weakPins = new Set([
    '1212',
    '1004',
    '2580', // vertical keypad
    '0852',
    '1379', // keypad corners
    '1122',
    '1231',
    '1233',
    '1123',
  ]);

  if (weakPins.has(pin)) {
    return true;
  }

  return false;
}

/**
 * Validates PIN strength: 4 to 6 digits, rejects trivial/weak PINs
 */
export function validatePinStrength(pin: string): { isValid: boolean; error?: string } {
  if (!pin) {
    return { isValid: false, error: 'PIN cannot be empty' };
  }
  if (!/^\d+$/.test(pin)) {
    return { isValid: false, error: 'PIN must contain only numbers' };
  }
  if (pin.length < 4 || pin.length > 6) {
    return { isValid: false, error: 'PIN must be between 4 and 6 digits' };
  }
  if (isTrivialPin(pin)) {
    return {
      isValid: false,
      error: 'Too simple! Do not use repeated (e.g. 1111) or sequential (e.g. 1234) digits.',
    };
  }
  return { isValid: true };
}
