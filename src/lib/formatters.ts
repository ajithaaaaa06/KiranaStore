/**
 * Indian Rupee (INR) and Date formatting utilities
 * Adheres to Indian number grouping (e.g. ₹1,24,500) and readable relative dates.
 */

export { formatRupees, formatRelativeDate } from './format';

/**
 * Formats a number with Indian grouping: 1,24,500
 */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);

  // Format using Indian locale
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(absVal);

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Formats an ISO date string to a human-readable Indian shopkeeper format:
 * 'Aaj' (Today), 'Kal' (Yesterday), or '21 Nov 2026'
 */
export function formatDate(isoDate: string, lang: string = 'hinglish'): string {
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

    // Default formatted date
    return target.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: target.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return isoDate;
  }
}

/**
 * Formats time in 12-hour AM/PM format (e.g. "02:30 PM")
 */
export function formatTime(isoDate: string): string {
  try {
    const target = new Date(isoDate);
    return target.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
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
  return digits;
}
