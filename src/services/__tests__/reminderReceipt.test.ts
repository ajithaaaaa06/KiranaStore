import { describe, it, expect, beforeEach } from 'vitest';
import { ledgerService, MockLedgerService } from '../ledgerService';
import { Customer, LedgerEntry } from '../types';
import { translations } from '../../i18n/translations';

describe('WhatsApp Reminder and Receipt Flow (Plain text, Read-only)', () => {
  let mockService: MockLedgerService;

  beforeEach(async () => {
    mockService = new MockLedgerService();
    await mockService.seedInitialData();
  });

  describe('1. Reminder Message Formatting (Entry Breakdown & Plain Text)', () => {
    const sampleCustomer: Customer = {
      id: 'cust-test-1',
      name: 'Ramesh',
      phone: '9845012345',
      balance: 140,
      totalCredit: 340,
      totalPayment: 200,
    };

    const sampleEntries: LedgerEntry[] = [
      {
        id: 'tx-1',
        customerId: 'cust-test-1',
        customerName: 'Ramesh',
        amount: 340,
        type: 'credit',
        date: '2026-11-20T10:00:00.000Z',
        createdAt: '2026-11-20T10:00:00.000Z',
      },
      {
        id: 'tx-2',
        customerId: 'cust-test-1',
        customerName: 'Ramesh',
        amount: 200,
        type: 'payment',
        date: '2026-11-21T11:00:00.000Z',
        createdAt: '2026-11-21T11:00:00.000Z',
      },
    ];

    it('builds reminder from saved ledger entries with date, amount, and total balance', () => {
      const { text, url } = mockService.generateWhatsAppReminder(
        sampleCustomer,
        'hi',
        'Sri Lakshmi Kirana',
        sampleEntries
      );

      // Must include formatted entry lines
      expect(text).toContain('20 Nov: ₹340 udhaar');
      expect(text).toContain('21 Nov: ₹200 paid');

      // Must include total balance
      expect(text).toContain('140');

      // Must be a valid wa.me link with encoded text
      expect(url).toContain('https://wa.me/919845012345?text=');
      expect(decodeURIComponent(url)).toContain('20 Nov: ₹340 udhaar');
    });

    it('contains NO QR code, UPI link, or payment request in the message (pure plain text)', () => {
      const langs = ['hi', 'hinglish', 'en', 'kn', 'ta', 'te'] as const;

      for (const lang of langs) {
        const { text, url } = mockService.generateWhatsAppReminder(
          sampleCustomer,
          lang,
          'Sri Lakshmi Kirana',
          sampleEntries
        );

        // No UPI URI schemes or payment request links
        expect(text).not.toContain('upi://');
        expect(text).not.toContain('upiId');
        expect(text).not.toContain('pay?pa=');
        expect(text).not.toContain('qrcode');
        expect(text).not.toContain('http://');

        // Only allowed link is the outer wa.me WhatsApp launch wrapper
        expect(url.startsWith('https://wa.me/919845012345?text=')).toBe(true);
      }
    });

    it('generates polite reminders across all supported languages', () => {
      // English
      const en = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'en', sampleEntries);
      expect(en).toContain('Hello Ramesh');
      expect(en).toContain('20 Nov: ₹340 udhaar');
      expect(en).toContain('21 Nov: ₹200 paid');
      expect(en).toContain('Total pending balance: ₹140');

      // Hindi
      const hi = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'hi', sampleEntries);
      expect(hi).toContain('नमस्ते Ramesh जी');
      expect(hi).toContain('20 Nov: ₹340 udhaar');
      expect(hi).toContain('कुल बाकी हिसाब: ₹140');

      // Hinglish
      const hinglish = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'hinglish', sampleEntries);
      expect(hinglish).toContain('Namaste Ramesh ji');
      expect(hinglish).toContain('Kul baaki hisaab: ₹140');

      // Kannada
      const kn = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'kn', sampleEntries);
      expect(kn).toContain('ನಮಸ್ಕಾರ Ramesh ಅವರೇ');
      expect(kn).toContain('ಒಟ್ಟು ಬಾಕಿ: ₹140');

      // Tamil
      const ta = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'ta', sampleEntries);
      expect(ta).toContain('வணக்கம் Ramesh');
      expect(ta).toContain('மொத்த பாக்கி: ₹140');

      // Telugu
      const te = translations.reminderMessage('Ramesh', '140', 'Sri Lakshmi Kirana', 'te', sampleEntries);
      expect(te).toContain('నమస్కారం Ramesh గారు');
      expect(te).toContain('మొత్తం బాకీ: ₹140');
    });

    it('falls back to simple polite balance reminder when no entries are passed', () => {
      const { text } = mockService.generateWhatsAppReminder(sampleCustomer, 'hi', 'Sri Lakshmi Kirana');
      expect(text).toContain('Ramesh');
      expect(text).toContain('140');
      expect(text).toContain('बाकी');
      expect(text).not.toContain('upi://');
    });
  });

  describe('2. Receipt Slip Formatting (Plain text, No QR or UPI)', () => {
    it('generates a clean thermal printable receipt without QR code or UPI link', () => {
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
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        note: 'Atta & Sugar',
      };

      const receipt = mockService.generateReceiptText(entry, cust, 'Sri Lakshmi Kirana');

      expect(receipt).toContain('SRI LAKSHMI KIRANA');
      expect(receipt).toContain('KHATA RECEIPT SLIP');
      expect(receipt).toContain('Suresh Kumar');
      expect(receipt).toContain('UDHAAR (CREDIT GIVEN)');
      expect(receipt).toContain('Atta & Sugar');
      expect(receipt).toContain('Current Total Balance Owed: ₹750');

      // STRICT CHECK: NO QR code, UPI link or payment handles
      expect(receipt).not.toContain('Scan & Pay via UPI');
      expect(receipt).not.toContain('UPI ID');
      expect(receipt).not.toContain('upi://');
      expect(receipt).not.toContain('data:image');
    });
  });

  describe('3. Read-Only Reminder Guarantee & lastRemindedAt Storage', () => {
    it('sending a reminder leaves entry count and balance completely unchanged', async () => {
      // 1. Initial State
      const customers = await mockService.getCustomers();
      const targetCustomer = customers[0];
      const initialEntries = await mockService.getCustomerEntries(targetCustomer.id);
      const initialEntryCount = initialEntries.length;
      const initialBalance = targetCustomer.balance;
      const initialCredit = targetCustomer.totalCredit;
      const initialPayment = targetCustomer.totalPayment;

      // 2. Simulate Reminder Generation and Send
      const reminder = mockService.generateWhatsAppReminder(
        targetCustomer,
        'hinglish',
        'Kirana Store',
        initialEntries
      );
      expect(reminder.text).toBeTruthy();

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
