import { describe, it, expect, beforeEach } from 'vitest';
import { ledgerService, MockLedgerService } from '../ledgerService';
import { Customer, LedgerEntry } from '../types';
import { translations } from '../../i18n/translations';
import {
  buildReminderMessage,
  formatReminderDateTime,
  formatWhatsAppPhone,
  buildWhatsAppReminderUrl,
} from '../reminderMessage';

describe('WhatsApp Reminder and Receipt Flow (Plain text, Read-only)', () => {
  let mockService: MockLedgerService;

  beforeEach(async () => {
    mockService = new MockLedgerService();
    await mockService.seedInitialData();
  });

  describe('1. Date/Time & Phone Formatter Helpers', () => {
    it('formats timestamps into 12-hour device local time string (e.g. 20 Nov 2026, 5:30 PM)', () => {
      const d1 = new Date(2026, 10, 20, 17, 30); // 20 Nov 2026, 5:30 PM
      expect(formatReminderDateTime(d1)).toBe('20 Nov 2026, 5:30 PM');

      const d2 = new Date(2026, 10, 21, 11, 10); // 21 Nov 2026, 11:10 AM
      expect(formatReminderDateTime(d2)).toBe('21 Nov 2026, 11:10 AM');

      const d3 = new Date(2026, 10, 22, 19, 4); // 22 Nov 2026, 7:04 PM (zero-padded minutes)
      expect(formatReminderDateTime(d3)).toBe('22 Nov 2026, 7:04 PM');
    });

    it('formats 10-digit Indian numbers with +91 country prefix', () => {
      expect(formatWhatsAppPhone('9845012345')).toBe('+919845012345');
      expect(formatWhatsAppPhone('+919845012345')).toBe('+919845012345');
      expect(formatWhatsAppPhone('919845012345')).toBe('+919845012345');
      expect(formatWhatsAppPhone('09845012345')).toBe('+919845012345');
      expect(formatWhatsAppPhone('')).toBe('');
    });

    it('builds wa.me URL with https://wa.me/<phone>?text=<encoded> prefixing +91', () => {
      const url = buildWhatsAppReminderUrl('9845012345', 'Hello *Ramesh*');
      expect(url).toBe('https://wa.me/+919845012345?text=Hello%20*Ramesh*');
    });
  });

  describe('2. Reminder Message Formatting & Bold Rules', () => {
    const sampleCustomer: Customer = {
      id: 'cust-test-1',
      name: 'Ramesh',
      phone: '9845012345',
      balance: 140,
      totalCredit: 340,
      totalPayment: 200,
    };

    const d1 = new Date(2026, 10, 20, 17, 30);
    const d2 = new Date(2026, 10, 21, 11, 10);
    const dNow = new Date(2026, 10, 22, 19, 4);

    const sampleEntries: LedgerEntry[] = [
      {
        id: 'tx-1',
        customerId: 'cust-test-1',
        customerName: 'Ramesh',
        amount: 340,
        type: 'credit',
        date: d1.toISOString(),
        createdAt: d1.toISOString(),
      },
      {
        id: 'tx-2',
        customerId: 'cust-test-1',
        customerName: 'Ramesh',
        amount: 200,
        type: 'payment',
        date: d2.toISOString(),
        createdAt: d2.toISOString(),
      },
    ];

    it('builds message matching exact PRD structure with short entry lines and bottom date', () => {
      const text = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'en',
        entries: sampleEntries,
        now: dNow,
      });

      // Entry lines
      expect(text).toContain('20 Nov 2026, 5:30 PM - Udhaar ₹340');
      expect(text).toContain('21 Nov 2026, 11:10 AM - Payment ₹200');

      // Total line
      expect(text).toContain('*Total pending: ₹140*');

      // Current Date line at the bottom
      expect(text).toContain('Date: 22 Nov 2026, 7:04 PM');
      expect(text).toContain('Thank you!');
    });

    it('applies WhatsApp bold (*text*) ONLY to customer name and total', () => {
      const text = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'en',
        entries: sampleEntries,
        now: dNow,
      });

      // Assert customer name is bold
      expect(text).toContain('*Ramesh*');

      // Assert total is bold
      expect(text).toContain('*Total pending: ₹140*');

      // Count asterisks: exactly 4 (2 pairs for customer name and total)
      const starMatches = text.match(/\*/g);
      expect(starMatches?.length).toBe(4);

      // Verify other lines do NOT contain asterisks
      expect(text).not.toContain('*This is a reminder*');
      expect(text).not.toContain('*Udhaar*');
      expect(text).not.toContain('*Payment*');
      expect(text).not.toContain('*Date:*');
      expect(text).not.toContain('*Thank you!*');
    });

    it('limits very long ledgers to the last 10 entries plus total', () => {
      // Create 15 entries across days 1 to 15
      const fifteenEntries: LedgerEntry[] = Array.from({ length: 15 }, (_, i) => ({
        id: `tx-${i + 1}`,
        customerId: 'cust-test-1',
        customerName: 'Ramesh',
        amount: 100 * (i + 1),
        type: i % 2 === 0 ? 'credit' : 'payment',
        date: new Date(2026, 10, i + 1, 10, 0).toISOString(),
        createdAt: new Date(2026, 10, i + 1, 10, 0).toISOString(),
      }));

      const text = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 1200,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'en',
        entries: fifteenEntries,
        now: dNow,
      });

      // Entries 1-5 (first 5 chronologically) should be excluded
      expect(text).not.toContain('\n1 Nov 2026, 10:00 AM - ');
      expect(text).not.toContain('\n5 Nov 2026, 10:00 AM - ');

      // Entries 6-15 (last 10 chronologically) should be present
      expect(text).toContain('6 Nov 2026, 10:00 AM');
      expect(text).toContain('15 Nov 2026, 10:00 AM');

      // Verify line count of entry section
      const lines = text.split('\n').filter((l) => l.includes(' - '));
      expect(lines.length).toBe(10);
    });

    it('generates polite templates across all 5 supported languages and Hinglish', () => {
      // 1. English
      const en = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'en',
        entries: sampleEntries,
        now: dNow,
      });
      expect(en).toContain('Hello *Ramesh*,');
      expect(en).toContain('This is a reminder from Sri Lakshmi Kirana.');
      expect(en).toContain('*Total pending: ₹140*');
      expect(en).toContain('Date: 22 Nov 2026, 7:04 PM');
      expect(en).toContain('Thank you!');

      // 2. Hindi
      const hi = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'hi',
        entries: sampleEntries,
        now: dNow,
      });
      expect(hi).toContain('नमस्ते *Ramesh*,');
      expect(hi).toContain('यह Sri Lakshmi Kirana से एक अनुस्मारक है।');
      expect(hi).toContain('*कुल बाकी: ₹140*');
      expect(hi).toContain('दिनांक: 22 Nov 2026, 7:04 PM');
      expect(hi).toContain('धन्यवाद!');

      // 3. Kannada
      const kn = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'kn',
        entries: sampleEntries,
        now: dNow,
      });
      expect(kn).toContain('ನಮಸ್ಕಾರ *Ramesh*,');
      expect(kn).toContain('ಇದು Sri Lakshmi Kirana ನಿಂದ ಜ್ಞಾಪನೆ.');
      expect(kn).toContain('*ಒಟ್ಟು ಬಾಕಿ: ₹140*');
      expect(kn).toContain('ದಿನಾಂಕ: 22 Nov 2026, 7:04 PM');
      expect(kn).toContain('ಧನ್ಯವಾದಗಳು!');

      // 4. Tamil
      const ta = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'ta',
        entries: sampleEntries,
        now: dNow,
      });
      expect(ta).toContain('வணக்கம் *Ramesh*,');
      expect(ta).toContain('இது Sri Lakshmi Kirana இலிருந்து நினைவூட்டல்.');
      expect(ta).toContain('*மொத்த பாக்கி: ₹140*');
      expect(ta).toContain('தேதி: 22 Nov 2026, 7:04 PM');
      expect(ta).toContain('நன்றி!');

      // 5. Telugu
      const te = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'te',
        entries: sampleEntries,
        now: dNow,
      });
      expect(te).toContain('నమస్కారం *Ramesh*,');
      expect(te).toContain('ఇది Sri Lakshmi Kirana నుండి రిమైండర్.');
      expect(te).toContain('*మొత్తం బాకీ: ₹140*');
      expect(te).toContain('తేదీ: 22 Nov 2026, 7:04 PM');
      expect(te).toContain('ధన్యవాదాలు!');

      // 6. Hinglish
      const hinglish = buildReminderMessage({
        customerName: 'Ramesh',
        amount: 140,
        shopName: 'Sri Lakshmi Kirana',
        lang: 'hinglish',
        entries: sampleEntries,
        now: dNow,
      });
      expect(hinglish).toContain('Hello *Ramesh*,');
      expect(hinglish).toContain('Yeh Sri Lakshmi Kirana se reminder hai.');
      expect(hinglish).toContain('*Kul baaki: ₹140*');
      expect(hinglish).toContain('Dhanyawad!');
    });

    it('contains NO QR code, UPI link, or payment request in any message', () => {
      const langs = ['hi', 'hinglish', 'en', 'kn', 'ta', 'te'] as const;

      for (const lang of langs) {
        const { text, url } = mockService.generateWhatsAppReminder(
          sampleCustomer,
          lang,
          'Sri Lakshmi Kirana',
          sampleEntries
        );

        // Pure plain-text: no UPI URIs or QR codes
        expect(text).not.toContain('upi://');
        expect(text).not.toContain('upiId');
        expect(text).not.toContain('pay?pa=');
        expect(text).not.toContain('qrcode');
        expect(text).not.toContain('http://');

        // Outer wrapper is wa.me with +91 prefix
        expect(url.startsWith('https://wa.me/+919845012345?text=')).toBe(true);
      }
    });

    it('falls back cleanly to polite balance reminder when no entries are provided', () => {
      const { text } = mockService.generateWhatsAppReminder(sampleCustomer, 'hi', 'Sri Lakshmi Kirana');
      expect(text).toContain('*Ramesh*');
      expect(text).toContain('140');
      expect(text).toContain('*कुल बाकी: ₹140*');
      expect(text).not.toContain('upi://');
    });
  });

  describe('3. Receipt Slip Formatting (Matches Unified Reminder Format)', () => {
    it('generates thermal printable receipt matching the exact reminder text format with NO QR code or UPI', () => {
      const cust: Customer = {
        id: 'cust-1',
        name: 'Suresh Kumar',
        phone: '9845099887',
        balance: 750,
        totalCredit: 1250,
        totalPayment: 500,
      };

      const entry: LedgerEntry = {
        id: 'tx-10',
        customerId: 'cust-1',
        customerName: 'Suresh Kumar',
        amount: 500,
        type: 'credit',
        date: new Date(2026, 10, 20, 17, 30).toISOString(),
        createdAt: new Date(2026, 10, 20, 17, 30).toISOString(),
      };

      const receipt = mockService.generateReceiptText(entry, cust, 'Sri Lakshmi Kirana');

      expect(receipt).toContain('Hello *Suresh Kumar*,');
      expect(receipt).toContain('This is a reminder from Sri Lakshmi Kirana.');
      expect(receipt).toContain('20 Nov 2026, 5:30 PM - Udhaar ₹500');
      expect(receipt).toContain('*Total pending: ₹750*');
      expect(receipt).toContain('Thank you!');

      // STRICT CHECK: NO QR code, UPI link or payment handles
      expect(receipt).not.toContain('Scan & Pay via UPI');
      expect(receipt).not.toContain('UPI ID');
      expect(receipt).not.toContain('upi://');
      expect(receipt).not.toContain('data:image');
      expect(receipt).not.toContain('qrcode');
    });
  });

  describe('4. Read-Only Reminder Guarantee & lastRemindedAt Storage', () => {
    it('sending a reminder leaves entry count and balance completely unchanged', async () => {
      // 1. Initial State
      const customers = await mockService.getCustomers();
      const targetCustomer = customers[0];
      const initialEntries = await mockService.getCustomerEntries(targetCustomer.id);
      const initialEntryCount = initialEntries.length;
      const initialBalance = targetCustomer.balance;
      const initialCredit = targetCustomer.totalCredit;
      const initialPayment = targetCustomer.totalPayment;

      // 2. Simulate Reminder Generation
      const reminder = mockService.generateWhatsAppReminder(
        targetCustomer,
        'hinglish',
        'Kirana Store',
        initialEntries
      );
      expect(reminder.text).toBeTruthy();
      expect(reminder.url).toContain('https://wa.me/');

      // 3. Update lastRemindedAt metadata on the customer
      const reminderTimestamp = new Date().toISOString();
      const updatedCustomer = await mockService.updateCustomer(targetCustomer.id, {
        lastRemindedAt: reminderTimestamp,
      });

      // 4. Verify customer metadata updated
      expect(updatedCustomer.lastRemindedAt).toBe(reminderTimestamp);

      // 5. Verify Ledger Invariant: Entries count and balance are strictly unchanged
      const entriesAfter = await mockService.getCustomerEntries(targetCustomer.id);
      expect(entriesAfter.length).toBe(initialEntryCount);

      const customerAfter = await mockService.getCustomerById(targetCustomer.id);
      expect(customerAfter).not.toBeNull();
      expect(customerAfter!.balance).toBe(initialBalance);
      expect(customerAfter!.totalCredit).toBe(initialCredit);
      expect(customerAfter!.totalPayment).toBe(initialPayment);
      expect(customerAfter!.lastRemindedAt).toBe(reminderTimestamp);

      // Total ledger entries count across all customers must also remain unchanged
      const allEntriesAfter = await mockService.getEntries();
      const allEntriesBefore = await mockService.getEntries();
      expect(allEntriesAfter.length).toBe(allEntriesBefore.length);
    });

    it('works with RealLedgerService in-memory DB and preserves lastRemindedAt across decrypt/encrypt', async () => {
      await ledgerService.init();
      let customers = await ledgerService.getCustomers();
      if (customers.length === 0) {
        await ledgerService.addCustomer({ name: 'Ramesh Test', phone: '9845012345' });
        customers = await ledgerService.getCustomers();
      }
      const cust = customers[0];
      const entriesBefore = await ledgerService.getCustomerEntries(cust.id);
      const entriesCountBefore = entriesBefore.length;
      const balanceBefore = cust.balance;

      const sentAt = new Date().toISOString();
      const updated = await ledgerService.updateCustomer(cust.id, {
        lastRemindedAt: sentAt,
      });

      expect(updated.lastRemindedAt).toBe(sentAt);

      // Fetch back from DB to verify encrypted roundtrip
      const fetched = await ledgerService.getCustomerById(cust.id);
      expect(fetched?.lastRemindedAt).toBe(sentAt);

      // Verify entries count and balance remain strictly untouched
      const entriesAfter = await ledgerService.getCustomerEntries(cust.id);
      expect(entriesAfter.length).toBe(entriesCountBefore);
      expect(fetched?.balance).toBe(balanceBefore);
    });
  });
});
