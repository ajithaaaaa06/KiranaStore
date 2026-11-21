/**
 * Indian Rupee (INR) and Date formatting utilities
 * Adheres to Indian number grouping (e.g. ₹1,24,500) and readable relative dates.
 */

import { getLocaleForLang, convertToNativeDigits, NumeralScript } from './format';
export { formatRupees, formatRelativeDate, formatFullRelativeDate, getLocaleForLang, convertToNativeDigits } from './format';

/**
 * Formats a number with Indian grouping: 1,24,500
 */
export function formatINR(
  amount: number,
  options: { lang?: string; numeralScript?: NumeralScript } = {}
): string {
  const { lang = 'en', numeralScript = 'latin' } = options;
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);

  // Format using Indian locale
  let formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(absVal);

  if (numeralScript === 'native') {
    formatted = convertToNativeDigits(formatted, lang);
  }

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Formats an ISO date string to a human-readable Indian shopkeeper format:
 * 'Today' / 'Yesterday' / 'Day before' or localized date
 */
export function formatDate(
  isoDate: string,
  lang: string = 'hinglish',
  numeralScript: NumeralScript = 'latin'
): string {
  try {
    const target = new Date(isoDate);
    const now = new Date();

    // Check if same day
    const isToday =
      target.getDate() === now.getDate() &&
      target.getMonth() === now.getMonth() &&
      target.getFullYear() === now.getFullYear();

    if (isToday) {
      if (lang === 'hi') return 'आज';
      if (lang === 'kn') return 'ಇಂದು';
      if (lang === 'ta') return 'இன்று';
      if (lang === 'te') return 'ఈరోజు';
      if (lang === 'en') return 'Today';
      return 'Aaj';
    }

    // Check if yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      target.getDate() === yesterday.getDate() &&
      target.getMonth() === yesterday.getMonth() &&
      target.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      if (lang === 'hi') return 'कल (बीता)';
      if (lang === 'kn') return 'ನಿನ್ನೆ';
      if (lang === 'ta') return 'நேற்று';
      if (lang === 'te') return 'నిన్న';
      if (lang === 'en') return 'Yesterday';
      return 'Kal';
    }

    const locale = getLocaleForLang(lang);
    let formatted = target.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: target.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
    if (numeralScript === 'native') {
      formatted = convertToNativeDigits(formatted, lang);
    }
    return formatted;
  } catch {
    return isoDate;
  }
}

/**
 * Formats time in 12-hour AM/PM format (e.g. "02:30 PM")
 */
export function formatTime(
  isoDate: string,
  lang: string = 'en',
  numeralScript: NumeralScript = 'latin'
): string {
  try {
    const target = new Date(isoDate);
    const locale = getLocaleForLang(lang);
    let formatted = target.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    if (numeralScript === 'native') {
      formatted = convertToNativeDigits(formatted, lang);
    }
    return formatted;
  } catch {
    return '';
  }
}

/**
 * Sanitizes phone number to standard 10 digit Indian mobile format
 */
export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits.slice(-10);
}
