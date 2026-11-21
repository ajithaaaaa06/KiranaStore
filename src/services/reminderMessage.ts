import { LanguageCode, LedgerEntry } from './types';

export interface BuildReminderOptions {
  customerName: string;
  amount: string | number;
  shopName?: string;
  lang?: LanguageCode;
  entries?: LedgerEntry[];
  now?: Date | string | number;
}

/**
 * Formats a timestamp into device local time string: "20 Nov 2026, 5:30 PM"
 */
export function formatReminderDateTime(dateInput?: string | Date | number): string {
  if (!dateInput) return '';
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) return '';

  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()] || 'Jan';
  const year = d.getFullYear();

  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

/**
 * Formats phone number with +91 country prefix for 10-digit Indian numbers.
 */
export function formatWhatsAppPhone(phone?: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  if (digits.length > 10) {
    return `+91${digits.slice(-10)}`;
  }
  return `+91${digits}`;
}

/**
 * Constructs WhatsApp wa.me URL with encoded message.
 */
export function buildWhatsAppReminderUrl(phone: string, text: string): string {
  const formattedPhone = formatWhatsAppPhone(phone);
  const encodedText = encodeURIComponent(text);
  if (!formattedPhone) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}

/**
 * Generates a clean plain-text reminder/receipt message in the selected language.
 * Structure:
 *   Hello *<Customer Name>*,
 *   This is a reminder from <Shop Name>.
 *
 *   20 Nov 2026, 5:30 PM - Udhaar ₹340
 *   21 Nov 2026, 11:10 AM - Payment ₹200
 *
 *   *Total pending: ₹140*
 *   Date: 22 Nov 2026, 7:04 PM
 *
 *   Thank you!
 *
 * WhatsApp bold (*text*) is applied ONLY to customer name and total pending balance.
 * Read-only: Does NOT mutate any ledger entry or customer balance.
 */
export function buildReminderMessage(options: BuildReminderOptions): string {
  const {
    customerName,
    amount,
    shopName = 'Kirana Store',
    lang = 'en',
    entries,
    now = new Date(),
  } = options;

  const formattedAmount =
    typeof amount === 'number'
      ? amount.toLocaleString('en-IN')
      : String(amount).trim();

  const currentDateTime = formatReminderDateTime(now);

  // Format entries block (sorted chronologically, limited to the last 10 entries)
  let entriesBlock = '';
  if (entries && entries.length > 0) {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const last10 = sorted.length > 10 ? sorted.slice(-10) : sorted;

    entriesBlock = last10
      .map((e) => {
        const dt = formatReminderDateTime(e.date);
        const typeLabel = e.type === 'credit' ? 'Udhaar' : 'Payment';
        const formattedEntryAmt = Number(e.amount).toLocaleString('en-IN');
        return `${dt} - ${typeLabel} ₹${formattedEntryAmt}`;
      })
      .join('\n');
  }

  const entriesSection = entriesBlock ? `\n\n${entriesBlock}` : '';

  switch (lang) {
    case 'hi':
      return `नमस्ते *${customerName}*,\nयह ${shopName} से एक अनुस्मारक है।${entriesSection}\n\n*कुल बाकी: ₹${formattedAmount}*\nदिनांक: ${currentDateTime}\n\nधन्यवाद!`;

    case 'kn':
      return `ನಮಸ್ಕಾರ *${customerName}*,\nಇದು ${shopName} ನಿಂದ ಜ್ಞಾಪನೆ.${entriesSection}\n\n*ಒಟ್ಟು ಬಾಕಿ: ₹${formattedAmount}*\nದಿನಾಂಕ: ${currentDateTime}\n\nಧನ್ಯವಾದಗಳು!`;

    case 'ta':
      return `வணக்கம் *${customerName}*,\nஇது ${shopName} இலிருந்து நினைவூட்டல்.${entriesSection}\n\n*மொத்த பாக்கி: ₹${formattedAmount}*\nதேதி: ${currentDateTime}\n\nநன்றி!`;

    case 'te':
      return `నమస్కారం *${customerName}*,\nఇది ${shopName} నుండి రిమైండర్.${entriesSection}\n\n*మొత్తం బాకీ: ₹${formattedAmount}*\nతేదీ: ${currentDateTime}\n\nధన్యవాదాలు!`;

    case 'hinglish':
      return `Hello *${customerName}*,\nYeh ${shopName} se reminder hai.${entriesSection}\n\n*Kul baaki: ₹${formattedAmount}*\nDate: ${currentDateTime}\n\nDhanyawad!`;

    case 'en':
    default:
      return `Hello *${customerName}*,\nThis is a reminder from ${shopName}.${entriesSection}\n\n*Total pending: ₹${formattedAmount}*\nDate: ${currentDateTime}\n\nThank you!`;
  }
}
