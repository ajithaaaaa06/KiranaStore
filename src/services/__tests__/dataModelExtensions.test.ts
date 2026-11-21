import { describe, it, expect, beforeEach } from 'vitest';
import { RealLedgerService } from '../ledgerService';
import { getDB, resetDatabase, DB_NAME, DB_VERSION } from '../db';
import { cryptoService } from '../crypto';
import { cleanPhoneNumber } from '../../lib/formatters';
import { openDB } from 'idb';

describe('Data Model Extensions & Security Hardening (F14-F20)', () => {
  let service: RealLedgerService;

  beforeEach(async () => {
    await resetDatabase();
    service = new RealLedgerService();
    await service.init();
  });

  describe('1. IndexedDB Schema Migration (v1 -> v2)', () => {
    it('preserves existing v1 stores and data during migration to v2', async () => {
      // 1. Seed some existing customer and entry data
      const { customer, entry } = await service.addEntry(
        {
          customerId: '',
          amount: 1500,
          type: 'credit',
          date: new Date().toISOString(),
          note: 'Pre-migration credit entry',
        },
        'Ramesh Kumar'
      );

      const db = await getDB();

      // Verify v1 data exists before checking v2 stores
      const preCustomer = await db.get('customers', customer.id);
      const preEntry = await db.get('entries', entry.id);
      expect(preCustomer).toBeDefined();
      expect(preEntry).toBeDefined();

      // Verify that version is 2
      expect(DB_VERSION).toBe(2);

      // Verify that new stores 'profile' and 'paymentRequests' exist
      if ('objectStoreNames' in db) {
        expect(db.objectStoreNames.contains('profile')).toBe(true);
        expect(db.objectStoreNames.contains('paymentRequests')).toBe(true);
      }

      // Existing data must survive migration and decrypt cleanly
      const fetchedCustomer = await service.getCustomerById(customer.id);
      expect(fetchedCustomer).not.toBeNull();
      expect(fetchedCustomer?.name).toBe('Ramesh Kumar');
      expect(fetchedCustomer?.balance).toBe(1500);

      const fetchedEntries = await service.getCustomerEntries(customer.id);
      expect(fetchedEntries.length).toBe(1);
      expect(fetchedEntries[0].amount).toBe(1500);
    });
  });

  describe('2. Encrypted Round-Trip for New Records', () => {
    it('encrypts ShopProfile sensitive fields (name, phone, upi) and decrypts in memory', async () => {
      const savedProfile = await service.saveProfile({
        shopName: 'Sri Balaji General Stores',
        shopkeeperName: 'Venkatesh Murthy',
        phone: '+91 98450 11223',
        upiId: 'balaji@okaxis',
      });

      expect(savedProfile.shopName).toBe('Sri Balaji General Stores');
      expect(savedProfile.shopkeeperName).toBe('Venkatesh Murthy');
      expect(savedProfile.phone).toBe('9845011223'); // Normalised 10 digits
      expect(savedProfile.upiId).toBe('balaji@okaxis');
      expect(savedProfile.createdAt).toBeDefined();
      expect(savedProfile.updatedAt).toBeDefined();

      // Inspect raw record in IndexedDB store to verify encryption
      const db = await getDB();
      const rawProfile: any = await db.get('profile', 'current');
      expect(rawProfile).toBeDefined();
      expect(rawProfile.id).toBe('current');
      expect(typeof rawProfile.encryptedPayload).toBe('string');
      expect(rawProfile.iv).toBeDefined();

      // Plaintext privacy check: sensitive fields MUST NOT be present in raw store
      expect(rawProfile.shopName).toBeUndefined();
      expect(rawProfile.shopkeeperName).toBeUndefined();
      expect(rawProfile.phone).toBeUndefined();
      expect(rawProfile.upiId).toBeUndefined();

      // Round-trip decryption in memory
      const retrieved = await service.getProfile();
      expect(retrieved).not.toBeNull();
      expect(retrieved?.shopName).toBe('Sri Balaji General Stores');
      expect(retrieved?.shopkeeperName).toBe('Venkatesh Murthy');
      expect(retrieved?.phone).toBe('9845011223');
      expect(retrieved?.upiId).toBe('balaji@okaxis');
    });

    it('encrypts PaymentRequest amount and decrypts in memory while keeping ref and status indexable', async () => {
      const { customer } = await service.addEntry(
        { customerId: '', amount: 650, type: 'credit', date: new Date().toISOString() },
        'Pooja Akka'
      );

      const req = await service.createPaymentRequest({
        customerId: customer.id,
        amount: 650,
        expiryMinutes: 120,
        link: 'upi://pay?pa=shop@upi&am=650',
      });

      expect(req.ref).toMatch(/^([a-zA-Z0-9]{16}|pay_)/);
      expect(req.amount).toBe(650);
      expect(req.status).toBe('pending');
      expect(req.expiresAt).toBeDefined();

      // Inspect raw record in IndexedDB store
      const db = await getDB();
      const rawReq: any = await db.get('paymentRequests', req.ref);
      expect(rawReq).toBeDefined();
      expect(rawReq.ref).toBe(req.ref);
      expect(rawReq.status).toBe('pending'); // Indexable in plaintext
      expect(rawReq.customerId).toBe(customer.id);
      expect(typeof rawReq.encryptedPayload).toBe('string');
      expect(rawReq.iv).toBeDefined();

      // Sensitive amount MUST NOT be stored in plaintext
      expect(rawReq.amount).toBeUndefined();
      expect(rawReq.link).toBeUndefined();

      // Round-trip decryption in memory
      const pending = await service.getPendingPaymentRequests();
      const found = pending.find((p) => p.ref === req.ref);
      expect(found).toBeDefined();
      expect(found?.amount).toBe(650);
      expect(found?.status).toBe('pending');
      expect(found?.link).toBe('upi://pay?pa=shop@upi&am=650');
    });
  });

  describe('3. Idempotent Payment Settlement (markPaymentRequestPaid)', () => {
    it('creates exactly one payment entry when called multiple times with the same ref', async () => {
      // 1. Create a customer with 1000 credit
      const { customer } = await service.addEntry(
        { customerId: '', amount: 1000, type: 'credit', date: new Date().toISOString() },
        'Ramesh Kumar'
      );
      expect(customer.balance).toBe(1000);

      // 2. Create payment request for 600
      const req = await service.createPaymentRequest({
        customerId: customer.id,
        amount: 600,
      });

      // 3. First call to markPaymentRequestPaid
      const firstResult = await service.markPaymentRequestPaid(req.ref, 600);
      expect(firstResult.status).toBe('paid');
      expect(firstResult.isNewPayment).toBe(true);
      expect(firstResult.entry).toBeDefined();
      expect(firstResult.entry?.amount).toBe(600);
      expect(firstResult.entry?.type).toBe('payment');
      expect(firstResult.entry?.source).toBe('upi');
      expect(firstResult.entry?.paymentRef).toBe(req.ref);

      // Balance should now be 1000 - 600 = 400
      let updatedBal = await service.getCustomerBalance(customer.id);
      expect(updatedBal).toBe(400);

      let customerEntries = await service.getCustomerEntries(customer.id);
      expect(customerEntries.length).toBe(2); // 1 credit + 1 payment

      // 4. Second call to markPaymentRequestPaid with identical ref (Idempotency test)
      const secondResult = await service.markPaymentRequestPaid(req.ref, 600);
      expect(secondResult.status).toBe('paid');
      expect(secondResult.isNewPayment).toBe(false);

      // 5. Verify NO duplicate entry was created and balance did not change
      updatedBal = await service.getCustomerBalance(customer.id);
      expect(updatedBal).toBe(400);

      customerEntries = await service.getCustomerEntries(customer.id);
      expect(customerEntries.length).toBe(2); // Still exactly 2 entries

      // 6. Third call with no amount provided uses original amount and remains idempotent
      const thirdResult = await service.markPaymentRequestPaid(req.ref);
      expect(thirdResult.status).toBe('paid');
      expect(thirdResult.isNewPayment).toBe(false);
      expect(await service.getCustomerBalance(customer.id)).toBe(400);
    });
  });

  describe('4. Phone Normalization & Suffix Disambiguation (findCustomersByPhoneSuffix)', () => {
    it('normalizes Indian phone numbers to 10 digits', () => {
      expect(cleanPhoneNumber('9845012345')).toBe('9845012345');
      expect(cleanPhoneNumber('+91 98450 12345')).toBe('9845012345');
      expect(cleanPhoneNumber('09845012345')).toBe('9845012345');
      expect(cleanPhoneNumber('91-9845012345')).toBe('9845012345');
      expect(cleanPhoneNumber('')).toBe('');
    });

    it('disambiguates between two Rameshes by the last 4 digits of their phone numbers', async () => {
      // Demo dataset has Ramesh Kumar (ends in 2345) and Ramesh Gowda (ends in 9887)
      await service.seedPitchDemoData();

      // Query suffix '2345'
      const match2345 = await service.findCustomersByPhoneSuffix('2345');
      expect(match2345.length).toBe(1);
      expect(match2345[0].name).toContain('Ramesh Kumar');
      expect(cleanPhoneNumber(match2345[0].phone)).toBe('9845012345');

      // Query suffix '9887'
      const match9887 = await service.findCustomersByPhoneSuffix('9887');
      expect(match9887.length).toBe(1);
      expect(match9887[0].name).toContain('Ramesh Gowda');
      expect(cleanPhoneNumber(match9887[0].phone)).toBe('9845099887');
    });

    it('finds both customers when two distinct customers share the same last 4 digits', async () => {
      // Demo dataset has Sunita Bai (9845568899) and Abdul Bhai (9731238899) both ending in 8899
      await service.seedPitchDemoData();

      const sharedMatches = await service.findCustomersByPhoneSuffix('8899');
      expect(sharedMatches.length).toBe(2);

      const names = sharedMatches.map((c) => c.name);
      expect(names.some((n) => n.includes('Sunita'))).toBe(true);
      expect(names.some((n) => n.includes('Abdul'))).toBe(true);
    });

    it('handles noisy or non-matching suffixes gracefully', async () => {
      await service.seedPitchDemoData();

      // Non-matching suffix
      const noMatch = await service.findCustomersByPhoneSuffix('0000');
      expect(noMatch).toEqual([]);

      // Suffix with spaces or dashes is normalized
      const formattedSuffix = await service.findCustomersByPhoneSuffix(' 23-45 ');
      expect(formattedSuffix.length).toBe(1);
      expect(formattedSuffix[0].name).toContain('Ramesh Kumar');

      // Empty suffix returns empty array
      const emptySuffix = await service.findCustomersByPhoneSuffix('');
      expect(emptySuffix).toEqual([]);
    });

    it('looks up customer by exact phone and updates customer phone verification', async () => {
      await service.seedPitchDemoData();

      // Lookup by phone
      const found = await service.getCustomerByPhone('+91 98450-12345');
      expect(found).not.toBeNull();
      expect(found?.name).toContain('Ramesh Kumar');

      // Update phone and set phoneVerified = true
      const updated = await service.updateCustomerPhone(found!.id, '9998887777', true);
      expect(updated.phone).toBe('9998887777');
      expect(updated.phoneVerified).toBe(true);

      const reFetched = await service.getCustomerById(found!.id);
      expect(reFetched?.phone).toBe('9998887777');
      expect(reFetched?.phoneVerified).toBe(true);
    });
  });
});
