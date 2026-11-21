import { describe, it, expect, beforeEach } from 'vitest';
import { RealLedgerService } from '../ledgerService';
import { getDB, resetDatabase } from '../db';
import { cryptoService } from '../crypto';

describe('Real Encrypted Ledger DB Service', () => {
  let service: RealLedgerService;

  beforeEach(async () => {
    await resetDatabase();
    service = new RealLedgerService();
    await service.init();
  });

  it('performs CRUD operations with transparent encryption/decryption', async () => {
    // 1. Create entry for new customer
    const { entry, customer } = await service.addEntry(
      {
        customerId: '',
        amount: 500,
        type: 'credit',
        date: new Date().toISOString(),
        note: 'Atta aur cheeni',
      },
      'Ganesh Provision'
    );

    expect(entry.id).toBeDefined();
    expect(entry.amount).toBe(500);
    expect(customer.name).toBe('Ganesh Provision');
    expect(customer.balance).toBe(500);

    // 2. Fetch customer by ID
    const fetchedCust = await service.getCustomerById(customer.id);
    expect(fetchedCust).not.toBeNull();
    expect(fetchedCust?.name).toBe('Ganesh Provision');
    expect(fetchedCust?.balance).toBe(500);

    // 3. Update entry amount
    const updated = await service.updateEntry(entry.id, { amount: 650 });
    expect(updated.amount).toBe(650);

    const reCalculatedBalance = await service.getCustomerBalance(customer.id);
    expect(reCalculatedBalance).toBe(650);

    // 4. Delete entry
    await service.deleteEntry(entry.id);
    const balanceAfterDelete = await service.getCustomerBalance(customer.id);
    expect(balanceAfterDelete).toBe(0);
  });

  it('dynamically computes customer balance from entries: balance = sum(credit) - sum(payment)', async () => {
    const cust = await service.findOrCreateCustomer('Mahesh Kumar', '9876543210');

    // Credit 1000
    await service.addEntry({
      customerId: cust.id,
      amount: 1000,
      type: 'credit',
      date: new Date().toISOString(),
    });

    // Payment 400
    await service.addEntry({
      customerId: cust.id,
      amount: 400,
      type: 'payment',
      date: new Date().toISOString(),
    });

    // Credit 250
    const { entry: credit2 } = await service.addEntry({
      customerId: cust.id,
      amount: 250,
      type: 'credit',
      date: new Date().toISOString(),
    });

    // Net balance: 1000 - 400 + 250 = 850
    let balance = await service.getCustomerBalance(cust.id);
    expect(balance).toBe(850);

    // Delete credit of 250 -> balance becomes 600
    await service.deleteEntry(credit2.id);
    balance = await service.getCustomerBalance(cust.id);
    expect(balance).toBe(600);
  });

  it('verifies that sensitive fields are stored as ciphertext in raw IndexedDB records', async () => {
    const { entry, customer } = await service.addEntry(
      {
        customerId: '',
        amount: 850,
        type: 'credit',
        date: new Date().toISOString(),
        note: 'Confidential Kirana Note',
      },
      'Sita Devi'
    );

    const db = await getDB();

    // 1. Inspect raw customer record in IndexedDB store
    const rawCustomer: any = await db.get('customers', customer.id);
    expect(rawCustomer).toBeDefined();
    expect(rawCustomer.encryptedPayload).toBeDefined();
    expect(typeof rawCustomer.encryptedPayload).toBe('string');
    expect(rawCustomer.iv).toBeDefined();
    // Sensitive fields MUST NOT be present in raw plaintext record:
    expect(rawCustomer.name).toBeUndefined();
    expect(rawCustomer.phone).toBeUndefined();
    expect(rawCustomer.notes).toBeUndefined();

    // 2. Inspect raw entry record in IndexedDB store
    const rawEntry: any = await db.get('entries', entry.id);
    expect(rawEntry).toBeDefined();
    expect(rawEntry.encryptedPayload).toBeDefined();
    expect(typeof rawEntry.encryptedPayload).toBe('string');
    expect(rawEntry.iv).toBeDefined();
    // Sensitive fields MUST NOT be present in raw plaintext record:
    expect(rawEntry.amount).toBeUndefined();
    expect(rawEntry.customerName).toBeUndefined();
    expect(rawEntry.note).toBeUndefined();
    expect(rawEntry.rawTranscript).toBeUndefined();

    // Plaintext fields retained strictly for indexing and sorting:
    expect(rawEntry.id).toBe(entry.id);
    expect(rawEntry.customerId).toBe(customer.id);
    expect(rawEntry.type).toBe('credit');
    expect(rawEntry.date).toBe(entry.date);
  });

  it('computes accurate Today Summary across credit and payment entries', async () => {
    await service.clearAllData();
    const today = new Date().toISOString();
    const c1 = await service.findOrCreateCustomer('Customer A');
    const c2 = await service.findOrCreateCustomer('Customer B');

    await service.addEntry({
      customerId: c1.id,
      amount: 1200,
      type: 'credit',
      date: today,
    });

    await service.addEntry({
      customerId: c2.id,
      amount: 300,
      type: 'payment',
      date: today,
    });

    const summary = await service.getTodaySummary();
    expect(summary.totalCredit).toBe(1200);
    expect(summary.totalPayment).toBe(300);
    expect(summary.netBalance).toBe(900);
    expect(summary.entryCount).toBe(2);
    expect(summary.activeCustomers).toBe(2);
  });

  it('supports full PIN protection lifecycle on the real database', async () => {
    // 1. Set PIN '4321'
    await service.setPin('4321');
    expect(await service.isPinSet()).toBe(true);

    // 2. Lock app
    service.lockApp();
    expect(service.isUnlocked()).toBe(false);

    // When locked, getCustomers returns empty
    const lockedCustomers = await service.getCustomers();
    expect(lockedCustomers).toEqual([]);

    // 3. Unlock with wrong PIN -> fails
    const wrongAttempt = await service.unlockWithPin('9999');
    expect(wrongAttempt).toBe(false);
    expect(service.isUnlocked()).toBe(false);

    // 4. Unlock with correct PIN -> succeeds
    const correctAttempt = await service.unlockWithPin('4321');
    expect(correctAttempt).toBe(true);
    expect(service.isUnlocked()).toBe(true);

    // 5. Data is once again accessible
    const unlockedCustomers = await service.getCustomers();
    expect(Array.isArray(unlockedCustomers)).toBe(true);
  });
});
