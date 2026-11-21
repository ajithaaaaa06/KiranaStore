import { describe, it, expect, beforeEach } from 'vitest';
import { RealLedgerService, InMemoryLedgerService } from '../ledgerService';
import { resetDatabase, getDB } from '../db';
import { findCustomers } from '../customerMatcher';

describe('Add Customer Directly Flow (Zero Entries, ₹0 Balance, Encryption & Duplicate Detection)', () => {
  describe('1. In-Memory Service: Customer added with no entries and ₹0 balance', () => {
    let service: InMemoryLedgerService;

    beforeEach(async () => {
      service = new InMemoryLedgerService();
      await service.init();
    });

    it('creates a customer without recording any udhaar or payment', async () => {
      const initialCustomers = await service.getCustomers();
      const initialEntries = await service.getEntries();
      expect(initialCustomers.length).toBe(0);
      expect(initialEntries.length).toBe(0);

      // Add customer directly without any transaction
      const newCustomer = await service.addCustomer({
        name: 'Mukesh Sharma',
        phone: '9876543210',
      });

      expect(newCustomer).toBeDefined();
      expect(newCustomer.id).toBeTruthy();
      expect(newCustomer.name).toBe('Mukesh Sharma');
      expect(newCustomer.phone).toBe('9876543210');
      expect(newCustomer.balance).toBe(0);
      expect(newCustomer.totalCredit).toBe(0);
      expect(newCustomer.totalPayment).toBe(0);

      // Verify zero entries exist in customer timeline and ledger
      const entries = await service.getCustomerEntries(newCustomer.id);
      expect(entries).toEqual([]);
      expect(entries.length).toBe(0);

      const allEntries = await service.getEntries();
      expect(allEntries.length).toBe(0);
    });

    it('customer list updates immediately and reflects newly added customer with ₹0 balance', async () => {
      await service.addCustomer({ name: 'Pooja Devi', phone: '9845012345' });

      const updatedList = await service.getCustomers();
      expect(updatedList.length).toBe(1);
      expect(updatedList[0].name).toBe('Pooja Devi');
      expect(updatedList[0].phone).toBe('9845012345');
      expect(updatedList[0].balance).toBe(0);
    });

    it('detects duplicate or similar customer names via customerMatcher', async () => {
      await service.addCustomer({ name: 'Ramesh Kumar', phone: '9876543210' });
      const allCustomers = await service.getCustomers();

      // Test exact match
      const exactMatch = findCustomers('Ramesh Kumar', allCustomers);
      expect(exactMatch.action).toBe('auto_select');
      expect(exactMatch.selectedCustomer?.name).toBe('Ramesh Kumar');

      // Test case-insensitive
      const caseMatch = findCustomers('ramesh kumar', allCustomers);
      expect(caseMatch.action).toBe('auto_select');
      expect(caseMatch.selectedCustomer?.name).toBe('Ramesh Kumar');

      // Test prefix/similar candidate
      const partialMatch = findCustomers('Ramesh', allCustomers);
      expect(partialMatch.candidates.length).toBeGreaterThan(0);
      expect(partialMatch.candidates[0].customer.name).toBe('Ramesh Kumar');

      // Test phone duplicate checking
      const phoneDuplicate = allCustomers.find(
        (c) => c.phone && c.phone.slice(-10) === '9876543210'
      );
      expect(phoneDuplicate).toBeDefined();
      expect(phoneDuplicate?.name).toBe('Ramesh Kumar');
    });

    it('allows recording udhaar and payment after customer was created', async () => {
      const cust = await service.addCustomer({ name: 'Sunil Traders' });
      expect(cust.balance).toBe(0);

      // Add udhaar entry
      const creditRes = await service.addEntry(
        {
          customerId: cust.id,
          customerName: cust.name,
          amount: 350,
          type: 'credit',
          date: new Date().toISOString(),
          note: 'Rice bag',
        },
        cust.name
      );
      expect(creditRes.customer.balance).toBe(350);

      // Add payment entry
      const paymentRes = await service.addEntry(
        {
          customerId: cust.id,
          customerName: cust.name,
          amount: 200,
          type: 'payment',
          date: new Date().toISOString(),
          note: 'Cash paid',
        },
        cust.name
      );
      expect(paymentRes.customer.balance).toBe(150);

      const timeline = await service.getCustomerEntries(cust.id);
      expect(timeline.length).toBe(2);
    });
  });

  describe('2. Real Encrypted Ledger DB: Customer encryption & decryption', () => {
    let service: RealLedgerService;

    beforeEach(async () => {
      await resetDatabase();
      service = new RealLedgerService();
      await service.init();
    });

    it('encrypts name and phone in IndexedDB and does not store plaintext', async () => {
      const newCust = await service.addCustomer({
        name: 'Secret Customer',
        phone: '9988776655',
        notes: 'VIP customer',
      });

      expect(newCust.id).toBeDefined();
      expect(newCust.name).toBe('Secret Customer');
      expect(newCust.balance).toBe(0);

      // Read raw record directly from IndexedDB
      const db = await getDB();
      const rawRecord: any = await db.get('customers', newCust.id);

      expect(rawRecord).toBeDefined();
      expect(rawRecord.id).toBe(newCust.id);

      // Verify plaintext name and phone are NOT stored in the database record
      expect(rawRecord.name).toBeUndefined();
      expect(rawRecord.phone).toBeUndefined();
      expect(rawRecord.notes).toBeUndefined();

      // Verify encrypted payload and IV exist
      expect(rawRecord.encryptedPayload).toBeDefined();
      expect(typeof rawRecord.encryptedPayload).toBe('string');
      expect(rawRecord.iv).toBeDefined();
      expect(typeof rawRecord.iv).toBe('string');

      // Verify transparent decryption via service
      const retrieved = await service.getCustomerById(newCust.id);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.name).toBe('Secret Customer');
      expect(retrieved?.phone).toBe('9988776655');
      expect(retrieved?.balance).toBe(0);
      expect(retrieved?.totalCredit).toBe(0);
      expect(retrieved?.totalPayment).toBe(0);
    });
  });
});
