/**
 * Indian Rupee (INR) and Relative Date Formatting Utility
 * Strictly follows Indian digit grouping (e.g. ₹1,24,500)
 * and shopkeeper friendly relative dates ("Aaj", "Kal", "Parso" + English).
 */

export interface FormatRupeesOptions {
  showSign?: boolean;
  showSymbol?: boolean;
  decimals?: number;
}

/**
 * Formats a number with standard Indian digit grouping (lakhs & crores).
 * E.g. 124500 -> "₹1,24,500"
 */
export function formatRupees(
  amount: number,
  options: FormatRupeesOptions = {}
): string {
  const { showSign = false, showSymbol = true, decimals = 0 } = options;

  if (isNaN(amount) || amount === null || amount === undefined) {
    return showSymbol ? '₹0' : '0';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Format with en-IN locale for Indian number grouping
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(absAmount);

  let prefix = '';
  if (showSign) {
    if (amount > 0) prefix = '+';
    else if (isNegative) prefix = '-';
  } else if (isNegative) {
    prefix = '-';
  }

  const symbol = showSymbol ? '₹' : '';

  return `${prefix}${symbol}${formattedNumber}`;
}

export type RelativeDateLang = 'hinglish' | 'hi' | 'en' | 'kn' | 'ta' | 'te';

/**
 * Formats an ISO string or Date object into shopkeeper-friendly relative dates:
 * "Aaj" (Today), "Kal" (Yesterday), "Parso" (Day before yesterday) or calendar date.
 */
export function formatRelativeDate(
  dateInput: string | Date | number,
  options: { lang?: RelativeDateLang; includeTime?: boolean } = {}
): string {
  const { lang = 'hinglish', includeTime = false } = options;

  if (!dateInput) return '';

  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);

  const now = new Date();

  // Reset hours to midnight for accurate calendar day comparison
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.round(
    (nowMidnight.getTime() - targetMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );

  let dayLabel = '';

  if (diffDays === 0) {
    // Today
    switch (lang) {
      case 'hi':
        dayLabel = 'आज';
        break;
      case 'kn':
        dayLabel = 'ಇಂದು';
        break;
      case 'ta':
        dayLabel = 'இன்று';
        break;
      case 'te':
        dayLabel = 'ఈరోజు';
        break;
      case 'en':
        dayLabel = 'Today';
        break;
      case 'hinglish':
      default:
        dayLabel = 'Aaj';
        break;
    }
  } else if (diffDays === 1) {
    // Yesterday
    switch (lang) {
      case 'hi':
        dayLabel = 'कल (बीता)';
        break;
      case 'kn':
        dayLabel = 'ನಿನ್ನೆ';
        break;
      case 'ta':
        dayLabel = 'நேற்று';
        break;
      case 'te':
        dayLabel = 'నిన్న';
        break;
      case 'en':
        dayLabel = 'Yesterday';
        break;
      case 'hinglish':
      default:
        dayLabel = 'Kal';
        break;
    }
  } else if (diffDays === 2) {
    // Day before yesterday
    switch (lang) {
      case 'hi':
        dayLabel = 'परसों';
        break;
      case 'kn':
        dayLabel = 'ಮೊನ್ನೆ';
        break;
      case 'ta':
        dayLabel = 'முந்தாநாள்';
        break;
      case 'te':
        dayLabel = 'మొన్న';
        break;
      case 'en':
        dayLabel = 'Day before yesterday';
        break;
      case 'hinglish':
      default:
        dayLabel = 'Parso';
        break;
    }
  } else {
    // Standard Date
    const isSameYear = target.getFullYear() === now.getFullYear();
    dayLabel = target.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: isSameYear ? undefined : 'numeric',
    });
  }

  if (includeTime) {
    const timeStr = target.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${dayLabel}, ${timeStr}`;
  }

  return dayLabel;
}

/**
 * Formats a date combining relative day ("Aaj", "Kal", "Parso") with day and month:
 * e.g. "Kal, 20 Nov" or "Aaj, 21 Nov"
 */
export function formatFullRelativeDate(
  dateInput: string | Date | number,
  options: { lang?: RelativeDateLang } = {}
): string {
  const { lang = 'hinglish' } = options;
  if (!dateInput) return '';

  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);

  const rel = formatRelativeDate(target, { lang });
  const dayMonth = target.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  return `${rel}, ${dayMonth}`;
}

