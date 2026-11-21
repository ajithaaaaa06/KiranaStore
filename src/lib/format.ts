/**
 * Indian Rupee (INR) and Relative Date Formatting Utility
 * Strictly follows Indian digit grouping (e.g. ₹1,24,500)
 * and localized relative dates ("Aaj", "Kal", "Parso" + English, Kannada, Tamil, Telugu).
 */

export type RelativeDateLang = 'hinglish' | 'hi' | 'en' | 'kn' | 'ta' | 'te';
export type NumeralScript = 'latin' | 'native';

export const NATIVE_DIGIT_MAP: Record<string, string[]> = {
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  kn: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  ta: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
};

/**
 * Returns BCP-47 locale tag for a supported language code
 */
export function getLocaleForLang(lang: string = 'en'): string {
  switch (lang) {
    case 'hi':
      return 'hi-IN';
    case 'kn':
      return 'kn-IN';
    case 'ta':
      return 'ta-IN';
    case 'te':
      return 'te-IN';
    case 'en':
    case 'hinglish':
    default:
      return 'en-IN';
  }
}

/**
 * Converts Western Latin digits 0-9 into regional Indic script digits
 */
export function convertToNativeDigits(text: string, lang: string): string {
  const digits = NATIVE_DIGIT_MAP[lang];
  if (!digits) return text;
  return text.replace(/[0-9]/g, (d) => digits[parseInt(d, 10)]);
}

export interface FormatRupeesOptions {
  showSign?: boolean;
  showSymbol?: boolean;
  decimals?: number;
  lang?: string;
  numeralScript?: NumeralScript;
}

/**
 * Formats a number with standard Indian digit grouping (lakhs & crores).
 * E.g. 124500 -> "₹1,24,500"
 */
export function formatRupees(
  amount: number,
  options: FormatRupeesOptions = {}
): string {
  const {
    showSign = false,
    showSymbol = true,
    decimals = 0,
    lang = 'en',
    numeralScript = 'latin',
  } = options;

  if (isNaN(amount) || amount === null || amount === undefined) {
    const zeroStr = showSymbol ? '₹0' : '0';
    return numeralScript === 'native' ? convertToNativeDigits(zeroStr, lang) : zeroStr;
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Format with en-IN locale for Indian number grouping
  let formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(absAmount);

  if (numeralScript === 'native') {
    formattedNumber = convertToNativeDigits(formattedNumber, lang);
  }

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

/**
 * Formats an ISO string or Date object into shopkeeper-friendly relative dates:
 * "Today" / "Yesterday" / "Day before yesterday" in each supported language.
 */
export function formatRelativeDate(
  dateInput: string | Date | number,
  options: {
    lang?: RelativeDateLang;
    includeTime?: boolean;
    numeralScript?: NumeralScript;
  } = {}
): string {
  const { lang = 'hinglish', includeTime = false, numeralScript = 'latin' } = options;

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
    // Standard Date formatted using target locale
    const isSameYear = target.getFullYear() === now.getFullYear();
    const locale = getLocaleForLang(lang);
    dayLabel = target.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: isSameYear ? undefined : 'numeric',
    });
    if (numeralScript === 'native') {
      dayLabel = convertToNativeDigits(dayLabel, lang);
    }
  }

  if (includeTime) {
    const locale = getLocaleForLang(lang);
    let timeStr = target.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    if (numeralScript === 'native') {
      timeStr = convertToNativeDigits(timeStr, lang);
    }
    return `${dayLabel}, ${timeStr}`;
  }

  return dayLabel;
}

/**
 * Formats a date combining relative day ("Today", "Yesterday", "Day before") with day and month:
 * e.g. "Yesterday, 20 Nov" or "Today, 21 Nov"
 */
export function formatFullRelativeDate(
  dateInput: string | Date | number,
  options: { lang?: RelativeDateLang; numeralScript?: NumeralScript } = {}
): string {
  const { lang = 'hinglish', numeralScript = 'latin' } = options;
  if (!dateInput) return '';

  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);

  const rel = formatRelativeDate(target, { lang, numeralScript });
  const locale = getLocaleForLang(lang);
  let dayMonth = target.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  });
  if (numeralScript === 'native') {
    dayMonth = convertToNativeDigits(dayMonth, lang);
  }

  return `${rel}, ${dayMonth}`;
}
