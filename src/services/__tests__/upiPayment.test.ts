import { describe, it, expect } from 'vitest';
import {
  generatePaymentRef,
  buildUpiLink,
  buildPaymentRequestWhatsAppMessage,
  buildWhatsAppUrl,
  generateQrDataUrl,
  generateQrSvg,
  dataUrlToBlob,
} from '../upiPayment';
import { LanguageCode } from '../types';

describe('UPI Payment & QR Utilities (F17)', () => {
  describe('generatePaymentRef', () => {
    it('generates a 16-character alphanumeric reference', () => {
      const ref = generatePaymentRef();
      expect(ref).toBeDefined();
      expect(ref.length).toBe(16);
      expect(ref).toMatch(/^[a-zA-Z0-9]{16}$/);
    });

    it('contains no personal data or hyphens', () => {
      const ref = generatePaymentRef();
      expect(ref.includes('-')).toBe(false);
      expect(ref.includes(' ')).toBe(false);
    });

    it('generates unique random references across multiple calls', () => {
      const set = new Set<string>();
      for (let i = 0; i < 50; i++) {
        set.add(generatePaymentRef());
      }
      expect(set.size).toBe(50);
    });
  });

  describe('buildUpiLink', () => {
    it('builds standard UPI link with all parameters correctly encoded', () => {
      const link = buildUpiLink({
        upiId: 'ramesh@oksbi',
        shopName: 'Raju & Sons Kirana',
        amount: 500,
        note: 'Udhaar Sathi Udhaar',
        ref: 'a1b2c3d4e5f60718',
      });

      expect(link.startsWith('upi://pay?')).toBe(true);
      expect(link).toContain('pa=ramesh%40oksbi');
      expect(link).toContain('pn=Raju%20%26%20Sons%20Kirana');
      expect(link).toContain('am=500.00');
      expect(link).toContain('cu=INR');
      expect(link).toContain('tn=Udhaar%20Sathi%20Udhaar');
      expect(link).toContain('tr=a1b2c3d4e5f60718');
    });

    it('formats amounts strictly with two decimal places', () => {
      const linkInt = buildUpiLink({ upiId: 'shop@upi', shopName: 'Shop', amount: 350 });
      expect(linkInt).toContain('am=350.00');

      const linkDecimal = buildUpiLink({ upiId: 'shop@upi', shopName: 'Shop', amount: 142.5 });
      expect(linkDecimal).toContain('am=142.50');

      const linkFloat = buildUpiLink({ upiId: 'shop@upi', shopName: 'Shop', amount: 99.99 });
      expect(linkFloat).toContain('am=99.99');
    });

    it('handles special characters in shop name and notes safely', () => {
      const link = buildUpiLink({
        upiId: 'store+pay@axis',
        shopName: 'Lakshmi & Co. (Near Temple/Station)',
        note: 'Rice 5kg + Oil 1L #45',
      });

      expect(link).toContain('pa=store%2Bpay%40axis');
      expect(link).toContain('pn=Lakshmi%20%26%20Co.%20(Near%20Temple%2FStation)');
      expect(link).toContain('tn=Rice%205kg%20%2B%20Oil%201L%20%2345');
    });

    it('omits amount parameter when amount is 0 or undefined for counter QR', () => {
      const counterLink = buildUpiLink({
        upiId: 'counter@upi',
        shopName: 'General Store',
      });

      expect(counterLink).not.toContain('am=');
      expect(counterLink).toContain('pa=counter%40upi');
      expect(counterLink).toContain('pn=General%20Store');
      expect(counterLink).toContain('cu=INR');
    });
  });

  describe('buildPaymentRequestWhatsAppMessage', () => {
    const baseOptions = {
      customerName: 'Ramesh Bhai',
      amountAdded: 500,
      runningBalance: 840,
      shopName: 'Sri Lakshmi Store',
      upiId: 'lakshmi@oksbi',
      paymentLink: 'upi://pay?pa=lakshmi@oksbi&am=500.00&cu=INR',
    };

    const languages: LanguageCode[] = ['hi', 'hinglish', 'en', 'kn', 'ta', 'te'];

    it.each(languages)('generates valid polite message in %s', (lang) => {
      const msg = buildPaymentRequestWhatsAppMessage({ ...baseOptions, lang });

      expect(msg).toContain('Ramesh Bhai');
      expect(msg).toContain('₹500.00');
      expect(msg).toContain('₹840.00');
      expect(msg).toContain('Sri Lakshmi Store');
      expect(msg).toContain('lakshmi@oksbi');
      expect(msg).toContain('upi://pay?pa=lakshmi@oksbi&am=500.00&cu=INR');
      expect(msg.length).toBeLessThan(500); // Polite & short
    });

    it('omits payment link cleanly when not provided', () => {
      const msg = buildPaymentRequestWhatsAppMessage({
        customerName: 'Pooja',
        amountAdded: 200,
        runningBalance: 200,
        shopName: 'Store',
        upiId: 'store@upi',
      });

      expect(msg).toContain('Pooja');
      expect(msg).toContain('₹200.00');
      expect(msg).toContain('store@upi');
      expect(msg).not.toContain('Payment link:');
      expect(msg).not.toContain('भुगतान लिंक:');
    });
  });

  describe('buildWhatsAppUrl', () => {
    it('normalizes 10-digit Indian phone numbers with 91 prefix', () => {
      const url = buildWhatsAppUrl('9845012345', 'Hello');
      expect(url).toBe('https://wa.me/919845012345?text=Hello');
    });

    it('strips non-digits, country code duplicates, spaces and dashes', () => {
      const url1 = buildWhatsAppUrl('+91 98450-12345', 'Namaste');
      expect(url1).toBe('https://wa.me/919845012345?text=Namaste');

      const url2 = buildWhatsAppUrl('919845012345', 'Hello');
      expect(url2).toBe('https://wa.me/919845012345?text=Hello');
    });

    it('correctly URL-encodes multi-line messages with special symbols', () => {
      const text = 'Hello Ramesh,\nBalance: ₹500 & total: ₹840\nLink: upi://pay';
      const url = buildWhatsAppUrl('9876543210', text);
      expect(url).toContain(encodeURIComponent(text));
    });
  });

  describe('generateQrDataUrl & generateQrSvg', () => {
    it('generates a valid data URL offline', () => {
      const upi = 'upi://pay?pa=test@upi&pn=Test&am=100.00&cu=INR';
      const dataUrl = generateQrDataUrl(upi, 4, 3);
      expect(dataUrl).toBeDefined();
      expect(dataUrl.startsWith('data:image/')).toBe(true);
    });

    it('generates valid SVG tag with dimensions', () => {
      const upi = 'upi://pay?pa=test@upi&pn=Test&am=100.00&cu=INR';
      const svg = generateQrSvg(upi, 4, 3);
      expect(svg).toBeDefined();
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg.endsWith('</svg>')).toBe(true);
    });

    it('converts data URL to a binary Blob', () => {
      const upi = 'upi://pay?pa=test@upi';
      const dataUrl = generateQrDataUrl(upi);
      const blob = dataUrlToBlob(dataUrl);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob?.size).toBeGreaterThan(0);
    });
  });
});
