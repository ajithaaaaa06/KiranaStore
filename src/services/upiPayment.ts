/**
 * UPI Payment and QR Code Utilities for Voice Khata (F17)
 * 
 * Offline-first, on-device UPI deep link generation, QR codes,
 * and multi-language WhatsApp message formatting.
 */

import qrcode from 'qrcode-generator';
import { LanguageCode } from './types';
export { generatePaymentRef } from './paymentRef';

export interface UpiLinkOptions {
  upiId: string;
  shopName: string;
  amount?: number;
  note?: string;
  ref?: string;
}

export interface PaymentRequestMessageOptions {
  customerName: string;
  amountAdded: number;
  runningBalance: number;
  shopName: string;
  upiId: string;
  paymentLink?: string;
  lang?: LanguageCode;
}

/**
 * Builds a standard UPI deep-link URL:
 * upi://pay?pa=<upiId>&pn=<shopName>&am=<amount>&cu=INR&tn=<note>&tr=<paymentRef>
 * URL-encodes every value. Amounts are formatted with 2 decimals (e.g. 500.00).
 */
export function buildUpiLink(options: UpiLinkOptions): string {
  const { upiId, shopName, amount, note, ref } = options;
  const cleanUpiId = (upiId || '').trim();
  const cleanShopName = (shopName || '').trim();

  const params: string[] = [];
  params.push(`pa=${encodeURIComponent(cleanUpiId)}`);
  params.push(`pn=${encodeURIComponent(cleanShopName)}`);

  if (amount !== undefined && amount !== null && !isNaN(amount) && amount > 0) {
    params.push(`am=${amount.toFixed(2)}`);
  }

  params.push(`cu=INR`);

  if (note && note.trim().length > 0) {
    params.push(`tn=${encodeURIComponent(note.trim())}`);
  }

  if (ref && ref.trim().length > 0) {
    params.push(`tr=${encodeURIComponent(ref.trim())}`);
  }

  return `upi://pay?${params.join('&')}`;
}

/**
 * Builds polite, concise WhatsApp message text across 5 Indic languages + Hinglish.
 * Contains: customer greeting, amount added, running balance, shop name, plain text UPI ID,
 * and payment link if available.
 */
export function buildPaymentRequestWhatsAppMessage(options: PaymentRequestMessageOptions): string {
  const {
    customerName,
    amountAdded,
    runningBalance,
    shopName,
    upiId,
    paymentLink,
    lang = 'hinglish',
  } = options;

  const formattedAmount = `₹${amountAdded.toFixed(2)}`;
  const formattedBalance = `₹${runningBalance.toFixed(2)}`;
  const cleanShopName = shopName.trim() || 'Kirana Store';
  const cleanUpi = upiId.trim();

  let body = '';
  let paymentText = '';

  switch (lang) {
    case 'hi':
      body = `नमस्ते ${customerName} जी, ${cleanShopName} पर आपका ${formattedAmount} का उधार दर्ज हुआ है। आपका कुल बाकी ${formattedBalance} है।\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nभुगतान लिंक: ${paymentLink}` : '';
      break;

    case 'kn':
      body = `ನಮಸ್ಕಾರ ${customerName} ಅವರೇ, ${cleanShopName} ನಲ್ಲಿ ನಿಮ್ಮ ${formattedAmount} ಸಾಲ ದಾಖಲಾಗಿದೆ. ನಿಮ್ಮ ಒಟ್ಟು ಬಾಕಿ ${formattedBalance}.\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nಪಾವತಿ ಲಿಂಕ್: ${paymentLink}` : '';
      break;

    case 'ta':
      body = `வணக்கம் ${customerName}, ${cleanShopName} இல் உங்கள் ${formattedAmount} கடன் சேர்க்கப்பட்டுள்ளது. உங்கள் மொத்த நிலுவை ${formattedBalance}.\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nகட்டண இணைப்பு: ${paymentLink}` : '';
      break;

    case 'te':
      body = `నమస్కారం ${customerName} గారు, ${cleanShopName} లో మీ ${formattedAmount} అప్పు నమోదైంది. మీ మొత్తం బాకీ ${formattedBalance}.\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nచెల్లింపు లింక్: ${paymentLink}` : '';
      break;

    case 'en':
      body = `Hello ${customerName}, ${formattedAmount} credit has been added at ${cleanShopName}. Your total pending balance is ${formattedBalance}.\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nPayment link: ${paymentLink}` : '';
      break;

    case 'hinglish':
    default:
      body = `Namaste ${customerName} ji, ${cleanShopName} par aapka ${formattedAmount} ka udhaar darj hua hai. Aapka kul baaki ${formattedBalance} hai.\n\nUPI ID: ${cleanUpi}`;
      paymentText = paymentLink ? `\nPayment link: ${paymentLink}` : '';
      break;
  }

  return (body + paymentText + '\n\n- Voice Khata').trim();
}

/**
 * Builds a direct WhatsApp click-to-chat URL:
 * https://wa.me/91<phone>?text=<encoded>
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const cleanPhone = digits.length > 10 && digits.startsWith('91') ? digits.slice(2) : digits;
  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates an on-device QR Code data URL (base64 image) using qrcode-generator.
 * Works completely offline with zero external network requests.
 */
export function generateQrDataUrl(
  text: string,
  cellSize: number = 6,
  margin: number = 4
): string {
  try {
    const qr = qrcode(0, 'M') as any;
    qr.addData(text);
    qr.make();
    if (typeof qr.createDataURL === 'function') {
      return qr.createDataURL(cellSize, margin);
    }
    const svgTag = qr.createSvgTag(cellSize, margin);
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgTag)}`;
  } catch (err) {
    console.error('Failed to generate QR data URL:', err);
    return '';
  }
}

/**
 * Generates an SVG string of the QR Code.
 */
export function generateQrSvg(
  text: string,
  cellSize: number = 6,
  margin: number = 4
): string {
  try {
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    return qr.createSvgTag(cellSize, margin);
  } catch (err) {
    console.error('Failed to generate QR SVG:', err);
    return '';
  }
}

/**
 * Converts a data URL to a binary Blob for navigator.share or download.
 */
export function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  } catch (e) {
    console.error('Failed to convert dataUrl to Blob:', e);
    return null;
  }
}
