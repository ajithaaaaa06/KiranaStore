/**
 * Real Encrypted Ledger Service Implementation
 * 
 * Backed by IndexedDB ('idb') and Web Crypto (AES-256 GCM):
 * 1. Encrypts sensitive fields (customer name, phone, amount, note, rawTranscript)
 * 2. Unencrypted IDs, timestamps, and types stored for indexing ('by-customerId', 'by-date')
 * 3. Dynamic balance computation: Customer balance = sum(credit entries) - sum(payment entries)
 * 4. PIN protection with PBKDF2 (200k iterations, SHA-256, 16-byte salt)
 * 5. Full backwards compatibility with InMemoryLedgerService
 */

import {
  Customer,
  LedgerEntry,
  TodaySummary,
  DailySummary,
  ILedgerService,
  LanguageCode,
  TransactionType,
  DayChartData,
  ShopProfile,
  PaymentRequest,
  PaymentRequestStatus,
  EntrySource,
} from './types';
import { translations } from '../i18n/translations';
import { cleanPhoneNumber } from '../lib/formatters';
import { getDB, EncryptedCustomerRecord, EncryptedEntryRecord, DB_NAME } from './db';
import { cryptoService } from './crypto';
import { generatePaymentRef } from './paymentRef';
import {
  encryptCustomerEntity,
  decryptCustomerEntity,
  encryptEntryEntity,
  decryptEntryEntity,
  encryptProfileEntity,
  decryptProfileEntity,
  encryptPaymentRequestEntity,
  decryptPaymentRequestEntity,
  seedPitchDemoDataToDB,
} from './dbMigration';

// Seed demo dataset reflecting typical Kirana customers in Bengaluru
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ramesh Bhai (Plumber)',
    phone: '9845012345', // ends in 2345
    phoneVerified: true,
    totalCredit: 2400,
    totalPayment: 1000,
    balance: 1400,
    lastTransactionDate: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    notes: 'Near cross road 2',
  },
  {
    id: 'cust-2',
    name: 'Pooja Akka (Teacher)',
    phone: '9880198765',
    phoneVerified: true,
    totalCredit: 850,
    totalPayment: 500,
    balance: 350,
    lastTransactionDate: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    notes: 'School street',
  },
  {
    id: 'cust-3',
    name: 'Suresh Tailor',
    phone: '9741234567',
    phoneVerified: true,
    totalCredit: 1600,
    totalPayment: 800,
    balance: 800,
    lastTransactionDate: new Date(Date.now() - 3600000 * 48).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: 'cust-4',
    name: 'Anil Sharma',
    phone: '9900118899', // ends in 8899 (shared suffix with Sunita Bai)
    phoneVerified: true,
    totalCredit: 1200,
    totalPayment: 1200,
    balance: 0,
    lastTransactionDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: 'cust-5',
    name: 'Venkatesh Rao',
    phone: '9448123987',
    phoneVerified: true,
    totalCredit: 3450,
    totalPayment: 1300,
    balance: 2150,
    lastTransactionDate: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    notes: 'Tea stall neighbor',
  },
  {
    id: 'cust-6',
    name: 'Ramesh Gowda',
    phone: '9845099887', // ends in 9887 (different from Ramesh Bhai 2345)
    phoneVerified: true,
    totalCredit: 650,
    totalPayment: 200,
    balance: 450,
    lastTransactionDate: new Date(Date.now() - 3600000 * 20).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    notes: 'Near temple',
  },
  {
    id: 'cust-7',
    name: 'Sunita Bai',
    phone: '9845568899', // ends in 8899 (shared suffix with Anil Sharma)
    phoneVerified: true,
    totalCredit: 1500,
    totalPayment: 500,
    balance: 1000,
    lastTransactionDate: new Date(Date.now() - 3600000 * 15).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
];

const INITIAL_ENTRIES: LedgerEntry[] = [
  {
    id: 'tx-0',
    customerId: 'cust-1',
    customerName: 'Ramesh Bhai (Plumber)',
    amount: 1900,
    type: 'credit',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    rawTranscript: 'Ramesh 1900 udhaar',
    synced: true,
  },
  {
    id: 'tx-1',
    customerId: 'cust-1',
    customerName: 'Ramesh Bhai (Plumber)',
    amount: 500,
    type: 'credit',
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    rawTranscript: 'Ramesh ko 500 udhaar diya',
    synced: true,
  },
  {
    id: 'tx-3',
    customerId: 'cust-1',
    customerName: 'Ramesh Bhai (Plumber)',
    amount: 1000,
    type: 'payment',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    rawTranscript: 'Ramesh se 1000 jama mila',
    synced: true,
  },
  {
    id: 'tx-2a',
    customerId: 'cust-2',
    customerName: 'Pooja Akka (Teacher)',
    amount: 500,
    type: 'credit',
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    rawTranscript: 'Pooja 500 udhaar',
    synced: true,
  },
  {
    id: 'tx-2',
    customerId: 'cust-2',
    customerName: 'Pooja Akka (Teacher)',
    amount: 350,
    type: 'credit',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    rawTranscript: 'Pooja 350 udhaar',
    synced: true,
  },
  {
    id: 'tx-2b',
    customerId: 'cust-2',
    customerName: 'Pooja Akka (Teacher)',
    amount: 500,
    type: 'payment',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    rawTranscript: 'Pooja 500 jama',
    synced: true,
  },
];

/**
 * Real Encrypted Ledger Service
 */
export class RealLedgerService implements ILedgerService {
  private isInitialized = false;

  /**
   * Initializes database keys and schema
   */
  public async init(): Promise<void> {
    if (this.isInitialized) return;

    const db = await getDB();

    // 1. Key Management Check
    const wrappedKeyMeta = await db.get('meta', 'data_key_wrapped');
    const unprotectedKeyMeta = await db.get('meta', 'data_key_unprotected');

    if (wrappedKeyMeta) {
      // PIN is configured! App stays locked until unlockWithPin is executed.
      if (!cryptoService.isUnlocked()) {
        cryptoService.lock();
        this.isInitialized = true;
        return;
      }
    } else if (unprotectedKeyMeta) {
      // Unprotected key exists: import and activate
      const dataKey = await cryptoService.importRawKey(unprotectedKeyMeta.value);
      cryptoService.setActiveKey(dataKey);
    } else {
      // First run: generate fresh random 256-bit AES-GCM data key
      const freshKey = await cryptoService.generateDataKey();
      const rawBase64 = await cryptoService.exportRawKey(freshKey);
      await db.put('meta', { key: 'data_key_unprotected', value: rawBase64 });
      cryptoService.setActiveKey(freshKey);
    }

    // 2. Check if database is empty; if so, populate pitch demo data ONLY if explicitly in ?demo=1 mode
    const custCount = await db.count('customers');
    if (custCount === 0) {
      const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1';

      if (isDemo) {
        await seedPitchDemoDataToDB();
      }
      // On first run and in production, customer list must be empty. No pre-seeded demo data!
    }

    this.isInitialized = true;
  }

  // --- PIN Security Methods ---

  public async isPinSet(): Promise<boolean> {
    const db = await getDB();
    const wrapped = await db.get('meta', 'data_key_wrapped');
    return !!wrapped;
  }

  public isUnlocked(): boolean {
    return cryptoService.isUnlocked();
  }

  public async unlockWithPin(pin: string): Promise<boolean> {
    const db = await getDB();
    const wrappedMeta = await db.get('meta', 'data_key_wrapped');
    if (!wrappedMeta) {
      // No PIN is set; already open
      return true;
    }

    const dataKey = await cryptoService.unwrapDataKeyWithPin(wrappedMeta.value, pin);
    if (dataKey) {
      cryptoService.setActiveKey(dataKey);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('vk_pin_lock_state_changed', { detail: { locked: false } }));
      }
      return true;
    }
    return false;
  }

  public async setPin(newPin: string): Promise<void> {
    await this.init();
    const dataKey = cryptoService.getActiveKey();
    if (!dataKey) {
      throw new Error('Cannot set PIN: Key is locked');
    }

    const wrapped = await cryptoService.wrapDataKeyWithPin(dataKey, newPin);
    const db = await getDB();
    await db.put('meta', { key: 'data_key_wrapped', value: wrapped });
    await db.delete('meta', 'data_key_unprotected');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vk_pin_lock_state_changed', { detail: { hasPin: true, locked: false } }));
    }
  }

  public async removePin(currentPin: string): Promise<boolean> {
    const unlocked = await this.unlockWithPin(currentPin);
    if (!unlocked) return false;

    const dataKey = cryptoService.getActiveKey();
    if (!dataKey) return false;

    const db = await getDB();
    const rawBase64 = await cryptoService.exportRawKey(dataKey);
    await db.put('meta', { key: 'data_key_unprotected', value: rawBase64 });
    await db.delete('meta', 'data_key_wrapped');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vk_pin_lock_state_changed', { detail: { hasPin: false, locked: false } }));
    }
    return true;
  }

  public lockApp(): void {
    cryptoService.lock();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vk_pin_lock_state_changed', { detail: { locked: true } }));
    }
  }

  public async resetAppAndWipeData(): Promise<void> {
    const db = await getDB();
    await db.clear('customers');
    await db.clear('entries');
    await db.clear('settings');
    await db.clear('meta');

    // Generate fresh unprotected key
    const freshKey = await cryptoService.generateDataKey();
    const rawBase64 = await cryptoService.exportRawKey(freshKey);
    await db.put('meta', { key: 'data_key_unprotected', value: rawBase64 });
    cryptoService.setActiveKey(freshKey);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vk_pin_lock_state_changed', { detail: { hasPin: false, locked: false } }));
    }
  }

  // --- Seed Data Operations ---

  public async seedInitialData(): Promise<void> {
    const db = await getDB();
    await db.clear('customers');
    await db.clear('entries');

    for (const c of INITIAL_CUSTOMERS) {
      const rec = await encryptCustomerEntity(c);
      await db.put('customers', rec);
    }

    for (const e of INITIAL_ENTRIES) {
      const rec = await encryptEntryEntity(e);
      await db.put('entries', rec);
    }
  }

  public async seedPitchDemoData(): Promise<void> {
    await seedPitchDemoDataToDB();
  }

  // --- Ledger Operations ---

  /**
   * Retrieves all customers with dynamically computed balances from entries,
   * sorted by highest pending udhaar first (balance descending).
   */
  public async getCustomers(): Promise<Customer[]> {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];

    const db = await getDB();
    const [rawCustomers, rawEntries] = await Promise.all([
      db.getAll('customers'),
      db.getAll('entries'),
    ]);

    // Decrypt entries to compute exact balances
    const customerBalanceMap = new Map<string, { totalCredit: number; totalPayment: number }>();
    for (const encEntry of rawEntries) {
      try {
        const decrypted = await decryptEntryEntity(encEntry);
        const current = customerBalanceMap.get(decrypted.customerId) || { totalCredit: 0, totalPayment: 0 };
        if (decrypted.type === 'credit') {
          current.totalCredit += decrypted.amount;
        } else {
          current.totalPayment += decrypted.amount;
        }
        customerBalanceMap.set(decrypted.customerId, current);
      } catch {
        // Skip un-decryptable entry
      }
    }

    // Decrypt customers and attach calculated balances
    const customers: Customer[] = [];
    for (const encCust of rawCustomers) {
      try {
        const balanceInfo = customerBalanceMap.get(encCust.id) || { totalCredit: 0, totalPayment: 0 };
        const customer = await decryptCustomerEntity(encCust, {
          totalCredit: balanceInfo.totalCredit,
          totalPayment: balanceInfo.totalPayment,
          balance: balanceInfo.totalCredit - balanceInfo.totalPayment,
        });
        customers.push(customer);
      } catch {
        // Skip un-decryptable customer
      }
    }

    return customers.sort((a, b) => b.balance - a.balance);
  }

  /**
   * Retrieves a customer by ID with computed balance
   */
  public async getCustomerById(id: string): Promise<Customer | null> {
    await this.init();
    if (!cryptoService.isUnlocked()) return null;

    const db = await getDB();
    const encCust = await db.get('customers', id);
    if (!encCust) return null;

    // Get customer entries to calculate balance
    const encEntries = await db.getAllFromIndex('entries', 'by-customerId', id);
    let totalCredit = 0;
    let totalPayment = 0;

    for (const ee of encEntries) {
      try {
        const entry = await decryptEntryEntity(ee);
        if (entry.type === 'credit') totalCredit += entry.amount;
        else totalPayment += entry.amount;
      } catch {}
    }

    return await decryptCustomerEntity(encCust, {
      totalCredit,
      totalPayment,
      balance: totalCredit - totalPayment,
    });
  }

  /**
   * Computes customer balance dynamically: sum(credit) - sum(payment)
   */
  public async getCustomerBalance(customerId: string): Promise<number> {
    await this.init();
    if (!cryptoService.isUnlocked()) return 0;

    const db = await getDB();
    const encEntries = await db.getAllFromIndex('entries', 'by-customerId', customerId);

    let balance = 0;
    for (const ee of encEntries) {
      try {
        const entry = await decryptEntryEntity(ee);
        if (entry.type === 'credit') balance += entry.amount;
        else balance -= entry.amount;
      } catch {}
    }

    return balance;
  }

  /**
   * Finds matching customers by search query (transliteration, fuzzy matching, phonetic)
   */
  public async findCustomers(query: string): Promise<Customer[]> {
    const allCustomers = await this.getCustomers();
    const cleanQuery = query.trim();
    if (!cleanQuery) return allCustomers;

    const { findCustomers: findMatchingCustomers } = await import('./customerMatcher');
    const matchResult = findMatchingCustomers(cleanQuery, allCustomers);
    if (matchResult.candidates.length > 0) {
      return matchResult.candidates.map((c) => c.customer);
    }

    const lower = cleanQuery.toLowerCase();
    return allCustomers.filter((c) => {
      const matchName = c.name.toLowerCase().includes(lower);
      const matchPhone = c.phone ? c.phone.includes(lower) : false;
      return matchName || matchPhone;
    });
  }

  public async findCustomerByName(nameQuery: string): Promise<Customer | null> {
    const matches = await this.findCustomers(nameQuery);
    return matches.length > 0 ? matches[0] : null;
  }

  public async findOrCreateCustomer(name: string, phone?: string): Promise<Customer> {
    await this.init();
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error('Customer name cannot be empty');
    }
    const all = await this.getCustomers();
    // 1. Direct exact or case-insensitive match
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;

    // 2. High-confidence auto_select match (exact transliteration or identical phonetic name)
    const { findCustomers: findMatchingCustomers } = await import('./customerMatcher');
    const matchResult = findMatchingCustomers(trimmed, all);
    if (matchResult.action === 'auto_select' && matchResult.topScore >= 0.98 && matchResult.selectedCustomer) {
      return matchResult.selectedCustomer;
    }

    const newCust: Customer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: phone || '',
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const db = await getDB();
    const encRec = await encryptCustomerEntity(newCust);
    await db.put('customers', encRec);
    return newCust;
  }

  public async addCustomer(customerData: { name: string; phone?: string; notes?: string }): Promise<Customer> {
    await this.init();
    const trimmed = customerData.name.trim();
    const cleanPhone = customerData.phone ? cleanPhoneNumber(customerData.phone) : '';
    const newCust: Customer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: cleanPhone,
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      notes: customerData.notes || '',
    };

    const db = await getDB();
    const encRec = await encryptCustomerEntity(newCust);
    await db.put('customers', encRec);
    return newCust;
  }

  public async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const existing = await this.getCustomerById(id);
    if (!existing) {
      throw new Error(`Customer with id ${id} not found`);
    }

    const updated: Customer = { ...existing, ...updates };
    const db = await getDB();
    const encRec = await encryptCustomerEntity(updated);
    await db.put('customers', encRec);
    return updated;
  }

  // --- Shop Profile Operations ---

  public async getProfile(): Promise<ShopProfile | null> {
    await this.init();
    if (!this.isUnlocked()) return null;
    const db = await getDB();
    const raw = await db.get('profile', 'current');
    if (!raw) return null;
    return await decryptProfileEntity(raw);
  }

  public async saveProfile(
    profileData: Omit<ShopProfile, 'createdAt' | 'updatedAt'> & { createdAt?: string; updatedAt?: string }
  ): Promise<ShopProfile> {
    await this.init();
    const db = await getDB();
    const existingRaw = await db.get('profile', 'current');
    const now = new Date().toISOString();
    const createdAt = existingRaw?.createdAt || profileData.createdAt || now;
    const profile: ShopProfile = {
      shopName: profileData.shopName.trim(),
      shopkeeperName: profileData.shopkeeperName.trim(),
      phone: cleanPhoneNumber(profileData.phone),
      upiId: profileData.upiId.trim(),
      createdAt,
      updatedAt: now,
    };
    const encrypted = await encryptProfileEntity(profile);
    await db.put('profile', encrypted);
    await db.put('settings', { key: 'shopName', value: profile.shopName });
    return profile;
  }

  // --- Customer Phone Operations & Suffix Disambiguation ---

  public async updateCustomerPhone(
    customerId: string,
    phone: string,
    verified: boolean = false
  ): Promise<Customer> {
    await this.init();
    const normalizedPhone = cleanPhoneNumber(phone);
    return await this.updateCustomer(customerId, {
      phone: normalizedPhone,
      phoneVerified: verified,
    });
  }

  public async findCustomersByPhoneSuffix(suffix: string): Promise<Customer[]> {
    await this.init();
    const cleanSuffix = suffix.replace(/\D/g, '');
    if (!cleanSuffix) return [];
    const all = await this.getCustomers();
    return all.filter((c) => c.phone && cleanPhoneNumber(c.phone).endsWith(cleanSuffix));
  }

  public async getCustomerByPhone(phone: string): Promise<Customer | null> {
    await this.init();
    const clean = cleanPhoneNumber(phone);
    if (!clean) return null;
    const all = await this.getCustomers();
    return all.find((c) => c.phone && cleanPhoneNumber(c.phone) === clean) || null;
  }

  // --- Payment Requests & UPI Operations ---

  public async createPaymentRequest(input: {
    entryId?: string;
    customerId: string;
    amount: number;
    expiryMinutes?: number;
    link?: string;
    ref?: string;
  }): Promise<PaymentRequest> {
    await this.init();
    const now = new Date();
    const ref = input.ref || generatePaymentRef();
    const expiresAt = new Date(now.getTime() + (input.expiryMinutes ?? 1440) * 60000).toISOString();
    const req: PaymentRequest = {
      ref,
      entryId: input.entryId,
      customerId: input.customerId,
      amount: input.amount,
      status: 'pending',
      createdAt: now.toISOString(),
      expiresAt,
      link: input.link,
    };
    const encrypted = await encryptPaymentRequestEntity(req);
    const db = await getDB();
    await db.put('paymentRequests', encrypted);
    return req;
  }

  public async getPendingPaymentRequests(): Promise<PaymentRequest[]> {
    await this.init();
    if (!this.isUnlocked()) return [];
    const db = await getDB();
    const rawList = await db.getAll('paymentRequests');
    const result: PaymentRequest[] = [];
    for (const raw of rawList) {
      if (raw.status === 'pending') {
        const req = await decryptPaymentRequestEntity(raw);
        result.push(req);
      }
    }
    return result;
  }

  public async markPaymentRequestPaid(
    ref: string,
    paidAmount?: number,
    paidAt?: string
  ): Promise<{ paymentRequest: PaymentRequest; entry?: LedgerEntry; isNewPayment: boolean } & PaymentRequest> {
    await this.init();
    const db = await getDB();
    const raw = await db.get('paymentRequests', ref);
    if (!raw) {
      throw new Error(`Payment request with ref ${ref} not found`);
    }
    const existingReq = await decryptPaymentRequestEntity(raw);

    // Idempotency: calling twice with same ref creates only one payment entry
    if (existingReq.status === 'paid') {
      const entries = await this.getCustomerEntries(existingReq.customerId);
      const matchedEntry = entries.find((e) => e.paymentRef === ref);
      return Object.assign(
        {
          paymentRequest: existingReq,
          entry: matchedEntry,
          isNewPayment: false,
        },
        existingReq
      );
    }

    const paidTimestamp = paidAt || new Date().toISOString();
    const actualAmount = paidAmount !== undefined ? paidAmount : existingReq.amount;

    existingReq.status = 'paid';
    existingReq.paidAt = paidTimestamp;
    existingReq.paidAmount = actualAmount;

    const encrypted = await encryptPaymentRequestEntity(existingReq);
    await db.put('paymentRequests', encrypted);

    // Record payment automatically in ledger
    const { entry: newEntry } = await this.addEntry({
      customerId: existingReq.customerId,
      amount: actualAmount,
      type: 'payment',
      date: paidTimestamp,
      note: `UPI Online Payment (Ref: ${ref})`,
      source: 'upi',
      paymentRef: ref,
    });

    return Object.assign(
      {
        paymentRequest: existingReq,
        entry: newEntry,
        isNewPayment: true,
      },
      existingReq
    );
  }

  public async checkDuplicateEntry(
    customerQuery: string,
    amount: number,
    type: TransactionType,
    withinMs: number = 600000
  ): Promise<boolean> {
    const entries = await this.getEntries();
    const { isDuplicateEntry } = await import('./customerMatcher');
    return isDuplicateEntry(
      {
        customerId: customerQuery,
        customerName: customerQuery,
        amount,
        type,
      },
      entries,
      withinMs
    );
  }

  /**
   * Adds a new entry encrypted into the real DB and updates customer lastTransactionDate
   */
  public async addEntry(
    entryData: Omit<LedgerEntry, 'id' | 'createdAt'>,
    customerName?: string
  ): Promise<{ entry: LedgerEntry; customer: Customer; isDuplicate?: boolean }> {
    await this.init();

    // Ensure customer exists
    let customer = await this.getCustomerById(entryData.customerId);
    if (!customer) {
      const name = customerName || entryData.customerName || 'Grahak';
      customer = await this.findOrCreateCustomer(name);
      entryData.customerId = customer.id;
    }

    const isDuplicate = await this.checkDuplicateEntry(
      customer.name,
      entryData.amount,
      entryData.type,
      300000
    );

    const newEntry: LedgerEntry = {
      ...entryData,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      customerName: customer.name,
      synced: true,
    };

    const db = await getDB();

    // 1. Encrypt and save entry record
    const encEntry = await encryptEntryEntity(newEntry);
    await db.put('entries', encEntry);

    // 2. Update customer lastTransactionDate
    customer.lastTransactionDate = newEntry.date;
    const encCust = await encryptCustomerEntity(customer);
    await db.put('customers', encCust);

    // 3. Return updated customer with fresh balance
    const freshCustomer = await this.getCustomerById(customer.id);

    return {
      entry: newEntry,
      customer: freshCustomer || customer,
      isDuplicate,
    };
  }

  public async addTransaction(
    data: Omit<LedgerEntry, 'id' | 'createdAt'>
  ): Promise<{ transaction: LedgerEntry; customer: Customer; isDuplicate: boolean }> {
    const res = await this.addEntry(data, data.customerName);
    return {
      transaction: res.entry,
      customer: res.customer,
      isDuplicate: !!res.isDuplicate,
    };
  }

  public async updateEntry(id: string, updates: Partial<LedgerEntry>): Promise<LedgerEntry> {
    await this.init();
    const db = await getDB();
    const encEntry = await db.get('entries', id);
    if (!encEntry) {
      throw new Error(`LedgerEntry with id ${id} not found`);
    }

    const existing = await decryptEntryEntity(encEntry);
    const updated: LedgerEntry = { ...existing, ...updates };

    const reEncrypted = await encryptEntryEntity(updated);
    await db.put('entries', reEncrypted);
    return updated;
  }

  public async deleteEntry(id: string): Promise<void> {
    await this.init();
    const db = await getDB();
    await db.delete('entries', id);
  }

  public async deleteTransaction(id: string): Promise<void> {
    return this.deleteEntry(id);
  }

  public async getCustomerEntries(customerId: string): Promise<LedgerEntry[]> {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];

    const db = await getDB();
    const encEntries = await db.getAllFromIndex('entries', 'by-customerId', customerId);

    const decryptedList: LedgerEntry[] = [];
    for (const ee of encEntries) {
      try {
        decryptedList.push(await decryptEntryEntity(ee));
      } catch {}
    }

    return decryptedList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  public async getEntries(options?: { customerId?: string; limit?: number }): Promise<LedgerEntry[]> {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];

    const db = await getDB();
    let encEntries: EncryptedEntryRecord[] = [];

    if (options?.customerId) {
      encEntries = await db.getAllFromIndex('entries', 'by-customerId', options.customerId);
    } else {
      encEntries = await db.getAll('entries');
    }

    const decryptedList: LedgerEntry[] = [];
    for (const ee of encEntries) {
      try {
        decryptedList.push(await decryptEntryEntity(ee));
      } catch {}
    }

    decryptedList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (options?.limit) {
      return decryptedList.slice(0, options.limit);
    }
    return decryptedList;
  }

  public async getTransactions(options?: { customerId?: string; limit?: number }): Promise<LedgerEntry[]> {
    return this.getEntries(options);
  }

  public async getTodaySummary(targetDateStr?: string): Promise<TodaySummary> {
    await this.init();
    const todayISO = (targetDateStr ? new Date(targetDateStr) : new Date())
      .toISOString()
      .split('T')[0];

    const entries = await this.getEntries();
    const dayEntries = entries.filter((e) => e.date.split('T')[0] === todayISO);

    let credit = 0;
    let payment = 0;
    const activeCustomerIds = new Set<string>();

    for (const e of dayEntries) {
      activeCustomerIds.add(e.customerId);
      if (e.type === 'credit') credit += e.amount;
      else payment += e.amount;
    }

    return {
      date: todayISO,
      totalCredit: credit,
      totalPayment: payment,
      netBalance: credit - payment,
      entryCount: dayEntries.length,
      activeCustomers: activeCustomerIds.size,
    };
  }

  public async getLast7DaysSummary(): Promise<DayChartData[]> {
    await this.init();
    const entries = await this.getEntries();
    const result: DayChartData[] = [];
    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const isoDate = d.toISOString().split('T')[0];
      const dayEntries = entries.filter((e) => e.date.split('T')[0] === isoDate);

      let credit = 0;
      let payment = 0;
      for (const e of dayEntries) {
        if (e.type === 'credit') credit += e.amount;
        else payment += e.amount;
      }

      const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : dayNames[d.getDay()];

      result.push({
        date: isoDate,
        dayLabel,
        credit,
        payment,
        net: credit - payment,
      });
    }

    return result;
  }

  public async getTopPendingCustomers(limit: number = 5): Promise<Customer[]> {
    const customers = await this.getCustomers();
    return customers
      .filter((c) => c.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, limit);
  }

  public async getDailySummary(targetDateStr?: string): Promise<DailySummary> {
    const s = await this.getTodaySummary(targetDateStr);
    return {
      ...s,
      totalCreditGiven: s.totalCredit,
      totalPaymentReceived: s.totalPayment,
      netBalanceChange: s.netBalance,
      transactionCount: s.entryCount,
      activeCustomersCount: s.activeCustomers,
    };
  }

  public generateWhatsAppReminder(
    customer: Customer,
    lang: LanguageCode,
    shopName: string = 'Kirana Store',
    entries?: LedgerEntry[]
  ): { text: string; url: string } {
    const amountStr = customer.balance.toLocaleString('en-IN');
    const text = translations.reminderMessage(customer.name, amountStr, shopName, lang, entries);
    const phone = cleanPhoneNumber(customer.phone);
    const url = phone
      ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    return { text, url };
  }

  public generateReceiptText(entry?: LedgerEntry, customer?: Customer, shopName: string = 'Kirana Store'): string {
    const cust = customer || { name: 'Customer', phone: '', balance: 0, totalCredit: 0, totalPayment: 0, id: '' };
    const isCredit = entry?.type === 'credit';
    const typeLabel = isCredit ? 'UDHAAR (CREDIT GIVEN)' : 'JAMA (PAYMENT RECEIVED)';
    const dateFormatted = entry?.date ? new Date(entry.date).toLocaleString('en-IN') : new Date().toLocaleString('en-IN');
    const amt = entry?.amount !== undefined ? entry.amount.toLocaleString('en-IN') : '0';

    return `
========================================
       ${shopName.toUpperCase()}
           KHATA RECEIPT SLIP
========================================
Date: ${dateFormatted}
Customer: ${cust.name}
Phone: ${cust.phone || 'N/A'}
----------------------------------------
Transaction Type: ${typeLabel}
Amount: ₹${amt}
${entry?.note ? `Note: ${entry.note}` : ''}
----------------------------------------
Current Total Balance Owed: ₹${cust.balance?.toLocaleString('en-IN') || '0'}
========================================
   Thank you for shopping with us!
   Powered by Voice Khata PWA
========================================
    `.trim();
  }

  public async exportData(): Promise<string> {
    const customers = await this.getCustomers();
    const entries = await this.getEntries();
    return JSON.stringify(
      { customers, entries, exportedAt: new Date().toISOString() },
      null,
      2
    );
  }

  public async exportCSV(): Promise<string> {
    const customers = await this.getCustomers();
    const entries = await this.getEntries();
    const rows: string[] = [];

    rows.push('# VOICE KHATA TRANSACTIONS');
    rows.push('Transaction ID,Date,Customer ID,Customer Name,Type,Amount (INR),Note,Created At');

    for (const e of entries) {
      const cust = customers.find((c) => c.id === e.customerId);
      const custName = cust ? cust.name : (e.customerName || 'Unknown');
      const safeNote = (e.note || '').replace(/"/g, '""');
      rows.push(`"${e.id}","${e.date}","${e.customerId}","${custName}","${e.type}","${e.amount}","${safeNote}","${e.createdAt}"`);
    }

    rows.push('');
    rows.push('# CUSTOMERS SUMMARY');
    rows.push('Customer ID,Name,Phone,Balance Owed (INR),Total Udhaar (INR),Total Jama (INR),Created At');
    for (const c of customers) {
      rows.push(`"${c.id}","${c.name}","${c.phone || ''}","${c.balance}","${c.totalCredit}","${c.totalPayment}","${c.createdAt}"`);
    }

    return rows.join('\r\n');
  }

  public async importAll(jsonData: string): Promise<void> {
    const parsed = JSON.parse(jsonData);
    const db = await getDB();
    await db.clear('customers');
    await db.clear('entries');

    if (Array.isArray(parsed.customers)) {
      for (const c of parsed.customers) {
        const encCust = await encryptCustomerEntity(c);
        await db.put('customers', encCust);
      }
    }

    if (Array.isArray(parsed.entries)) {
      for (const e of parsed.entries) {
        const encEntry = await encryptEntryEntity(e);
        await db.put('entries', encEntry);
      }
    }
  }

  public async clearAllData(): Promise<void> {
    const db = await getDB();
    await db.clear('customers');
    await db.clear('entries');
    await db.clear('profile');
    await db.clear('paymentRequests');
  }
}

/**
 * In-Memory Ledger Service (Retained for test harness backward compatibility)
 */
export class InMemoryLedgerService implements ILedgerService {
  private customers: Customer[] = [];
  private entries: LedgerEntry[] = [];
  private profile: ShopProfile | null = null;
  private paymentRequests: PaymentRequest[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;
    const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1';
    if (isDemo) {
      await this.seedPitchDemoData();
    } else {
      this.customers = [];
      this.entries = [];
    }
    this.isInitialized = true;
  }

  public async seedInitialData(): Promise<void> {
    this.customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
    this.entries = JSON.parse(JSON.stringify(INITIAL_ENTRIES));
  }

  public async seedPitchDemoData(): Promise<void> {
    const { PITCH_CUSTOMERS, PITCH_ENTRIES } = await import('./demoDataset');
    this.customers = JSON.parse(JSON.stringify(PITCH_CUSTOMERS));
    this.entries = JSON.parse(JSON.stringify(PITCH_ENTRIES));
  }

  public async getCustomers(): Promise<Customer[]> {
    await this.init();
    return [...this.customers].sort((a, b) => b.balance - a.balance);
  }

  public async getCustomerById(id: string): Promise<Customer | null> {
    await this.init();
    return this.customers.find((c) => c.id === id) || null;
  }

  public async findCustomers(query: string): Promise<Customer[]> {
    await this.init();
    const cleanQuery = query.trim();
    if (!cleanQuery) return this.getCustomers();

    const { findCustomers: findMatchingCustomers } = await import('./customerMatcher');
    const matchResult = findMatchingCustomers(cleanQuery, this.customers);
    if (matchResult.candidates.length > 0) {
      return matchResult.candidates.map((c) => c.customer);
    }

    const lower = cleanQuery.toLowerCase();
    return this.customers.filter((c) => {
      const matchName = c.name.toLowerCase().includes(lower);
      const matchPhone = c.phone ? c.phone.includes(lower) : false;
      return matchName || matchPhone;
    });
  }

  public async findCustomerByName(nameQuery: string): Promise<Customer | null> {
    const matches = await this.findCustomers(nameQuery);
    return matches.length > 0 ? matches[0] : null;
  }

  public async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    await this.init();
    const idx = this.customers.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Customer with id ${id} not found`);
    const updated: Customer = { ...this.customers[idx], ...updates };
    this.customers[idx] = updated;
    return updated;
  }

  // --- Shop Profile Operations ---

  public async getProfile(): Promise<ShopProfile | null> {
    await this.init();
    return this.profile ? JSON.parse(JSON.stringify(this.profile)) : null;
  }

  public async saveProfile(
    profileData: Omit<ShopProfile, 'createdAt' | 'updatedAt'> & { createdAt?: string; updatedAt?: string }
  ): Promise<ShopProfile> {
    await this.init();
    const now = new Date().toISOString();
    const createdAt = this.profile?.createdAt || profileData.createdAt || now;
    this.profile = {
      shopName: profileData.shopName.trim(),
      shopkeeperName: profileData.shopkeeperName.trim(),
      phone: cleanPhoneNumber(profileData.phone),
      upiId: profileData.upiId.trim(),
      createdAt,
      updatedAt: now,
    };
    return JSON.parse(JSON.stringify(this.profile));
  }

  // --- Customer Phone Operations & Suffix Disambiguation ---

  public async updateCustomerPhone(
    customerId: string,
    phone: string,
    verified: boolean = false
  ): Promise<Customer> {
    await this.init();
    const cust = this.customers.find((c) => c.id === customerId);
    if (!cust) throw new Error(`Customer with id ${customerId} not found`);
    cust.phone = cleanPhoneNumber(phone);
    cust.phoneVerified = verified;
    return JSON.parse(JSON.stringify(cust));
  }

  public async findCustomersByPhoneSuffix(suffix: string): Promise<Customer[]> {
    await this.init();
    const cleanSuffix = suffix.replace(/\D/g, '');
    if (!cleanSuffix) return [];
    return this.customers
      .filter((c) => c.phone && cleanPhoneNumber(c.phone).endsWith(cleanSuffix))
      .map((c) => JSON.parse(JSON.stringify(c)));
  }

  public async getCustomerByPhone(phone: string): Promise<Customer | null> {
    await this.init();
    const clean = cleanPhoneNumber(phone);
    if (!clean) return null;
    const cust = this.customers.find((c) => c.phone && cleanPhoneNumber(c.phone) === clean);
    return cust ? JSON.parse(JSON.stringify(cust)) : null;
  }

  // --- Payment Requests & UPI Operations ---

  public async createPaymentRequest(input: {
    entryId?: string;
    customerId: string;
    amount: number;
    expiryMinutes?: number;
    link?: string;
    ref?: string;
  }): Promise<PaymentRequest> {
    await this.init();
    const now = new Date();
    const ref = input.ref || generatePaymentRef();
    const expiresAt = new Date(now.getTime() + (input.expiryMinutes ?? 1440) * 60000).toISOString();
    const req: PaymentRequest = {
      ref,
      entryId: input.entryId,
      customerId: input.customerId,
      amount: input.amount,
      status: 'pending',
      createdAt: now.toISOString(),
      expiresAt,
      link: input.link,
    };
    this.paymentRequests.push(JSON.parse(JSON.stringify(req)));
    return req;
  }

  public async getPendingPaymentRequests(): Promise<PaymentRequest[]> {
    await this.init();
    return this.paymentRequests
      .filter((p) => p.status === 'pending')
      .map((p) => JSON.parse(JSON.stringify(p)));
  }

  public async markPaymentRequestPaid(
    ref: string,
    paidAmount?: number,
    paidAt?: string
  ): Promise<{ paymentRequest: PaymentRequest; entry?: LedgerEntry; isNewPayment: boolean } & PaymentRequest> {
    await this.init();
    const existingReq = this.paymentRequests.find((p) => p.ref === ref);
    if (!existingReq) {
      throw new Error(`Payment request with ref ${ref} not found`);
    }

    // Idempotency: calling twice with same ref creates only one payment entry
    if (existingReq.status === 'paid') {
      const entries = await this.getCustomerEntries(existingReq.customerId);
      const matchedEntry = entries.find((e) => e.paymentRef === ref);
      return Object.assign(
        {
          paymentRequest: existingReq,
          entry: matchedEntry,
          isNewPayment: false,
        },
        existingReq
      );
    }

    const paidTimestamp = paidAt || new Date().toISOString();
    const actualAmount = paidAmount !== undefined ? paidAmount : existingReq.amount;

    existingReq.status = 'paid';
    existingReq.paidAt = paidTimestamp;
    existingReq.paidAmount = actualAmount;

    const { entry: newEntry } = await this.addEntry({
      customerId: existingReq.customerId,
      amount: actualAmount,
      type: 'payment',
      date: paidTimestamp,
      note: `UPI Online Payment (Ref: ${ref})`,
      source: 'upi',
      paymentRef: ref,
    });

    return Object.assign(
      {
        paymentRequest: existingReq,
        entry: newEntry,
        isNewPayment: true,
      },
      existingReq
    );
  }

  public async checkDuplicateEntry(
    customerQuery: string,
    amount: number,
    type: TransactionType,
    withinMs: number = 600000
  ): Promise<boolean> {
    await this.init();
    const { isDuplicateEntry } = await import('./customerMatcher');
    return isDuplicateEntry(
      { customerId: customerQuery, customerName: customerQuery, amount, type },
      this.entries,
      withinMs
    );
  }

  public async findOrCreateCustomer(name: string, phone?: string): Promise<Customer> {
    await this.init();
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error('Customer name cannot be empty');
    }
    const all = await this.getCustomers();
    // 1. Direct exact or case-insensitive match
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;

    // 2. High-confidence auto_select match (exact transliteration or identical phonetic name)
    const { findCustomers: findMatchingCustomers } = await import('./customerMatcher');
    const matchResult = findMatchingCustomers(trimmed, all);
    if (matchResult.action === 'auto_select' && matchResult.topScore >= 0.98 && matchResult.selectedCustomer) {
      return matchResult.selectedCustomer;
    }

    const newCustomer: Customer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: phone || '',
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  public async addCustomer(customerData: { name: string; phone?: string; notes?: string }): Promise<Customer> {
    await this.init();
    const trimmed = customerData.name.trim();
    const cleanPhone = customerData.phone ? cleanPhoneNumber(customerData.phone) : '';
    const newCustomer: Customer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: cleanPhone,
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      notes: customerData.notes || '',
    };

    this.customers.push(newCustomer);
    return JSON.parse(JSON.stringify(newCustomer));
  }

  public async getCustomerBalance(customerId: string): Promise<number> {
    const customer = await this.getCustomerById(customerId);
    return customer ? customer.balance : 0;
  }

  public async addEntry(
    entryData: Omit<LedgerEntry, 'id' | 'createdAt'>,
    customerName?: string
  ): Promise<{ entry: LedgerEntry; customer: Customer; isDuplicate?: boolean }> {
    await this.init();

    let customer = await this.getCustomerById(entryData.customerId);
    if (!customer) {
      const name = customerName || entryData.customerName || 'Grahak';
      customer = await this.findOrCreateCustomer(name);
      entryData.customerId = customer.id;
    }

    const isDuplicate = this.entries.some(
      (e) =>
        e.customerId === entryData.customerId &&
        e.amount === entryData.amount &&
        e.type === entryData.type &&
        Date.now() - new Date(e.date).getTime() < 300000
    );

    const newEntry: LedgerEntry = {
      ...entryData,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      customerName: customer.name,
      synced: true,
    };

    if (entryData.type === 'credit') {
      customer.totalCredit += entryData.amount;
    } else {
      customer.totalPayment += entryData.amount;
    }
    customer.balance = customer.totalCredit - customer.totalPayment;
    customer.lastTransactionDate = newEntry.date;

    this.entries.unshift(newEntry);
    return { entry: newEntry, customer, isDuplicate };
  }

  public async updateEntry(id: string, updates: Partial<LedgerEntry>): Promise<LedgerEntry> {
    await this.init();
    const idx = this.entries.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`LedgerEntry with id ${id} not found`);

    const existing = this.entries[idx];
    const updated = { ...existing, ...updates };
    this.entries[idx] = updated;

    const cust = this.customers.find((c) => c.id === existing.customerId);
    if (cust) {
      const custEntries = this.entries.filter((e) => e.customerId === cust.id);
      let credit = 0;
      let payment = 0;
      for (const e of custEntries) {
        if (e.type === 'credit') credit += e.amount;
        else payment += e.amount;
      }
      cust.totalCredit = credit;
      cust.totalPayment = payment;
      cust.balance = credit - payment;
    }

    return updated;
  }

  public async getCustomerEntries(customerId: string): Promise<LedgerEntry[]> {
    await this.init();
    return this.entries
      .filter((e) => e.customerId === customerId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  public async getEntries(options?: { customerId?: string; limit?: number }): Promise<LedgerEntry[]> {
    await this.init();
    let res = [...this.entries];
    if (options?.customerId) {
      res = res.filter((e) => e.customerId === options.customerId);
    }
    res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (options?.limit) return res.slice(0, options.limit);
    return res;
  }

  public async deleteEntry(id: string): Promise<void> {
    await this.init();
    this.entries = this.entries.filter((e) => e.id !== id);
  }

  public async getTodaySummary(targetDateStr?: string): Promise<TodaySummary> {
    await this.init();
    const todayISO = (targetDateStr ? new Date(targetDateStr) : new Date())
      .toISOString()
      .split('T')[0];

    const dayEntries = this.entries.filter((e) => e.date.split('T')[0] === todayISO);
    let credit = 0;
    let payment = 0;
    const activeCustomerIds = new Set<string>();

    for (const e of dayEntries) {
      activeCustomerIds.add(e.customerId);
      if (e.type === 'credit') credit += e.amount;
      else payment += e.amount;
    }

    return {
      date: todayISO,
      totalCredit: credit,
      totalPayment: payment,
      netBalance: credit - payment,
      entryCount: dayEntries.length,
      activeCustomers: activeCustomerIds.size,
    };
  }

  public async getLast7DaysSummary(): Promise<DayChartData[]> {
    await this.init();
    const result: DayChartData[] = [];
    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const isoDate = d.toISOString().split('T')[0];
      const dayEntries = this.entries.filter((e) => e.date.split('T')[0] === isoDate);

      let credit = 0;
      let payment = 0;
      for (const e of dayEntries) {
        if (e.type === 'credit') credit += e.amount;
        else payment += e.amount;
      }

      const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : dayNames[d.getDay()];

      result.push({
        date: isoDate,
        dayLabel,
        credit,
        payment,
        net: credit - payment,
      });
    }

    return result;
  }

  public async getTopPendingCustomers(limit: number = 5): Promise<Customer[]> {
    await this.init();
    return this.customers
      .filter((c) => c.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, limit);
  }

  public generateWhatsAppReminder(
    customer: Customer,
    lang: LanguageCode,
    shopName: string = 'Kirana Store',
    entries?: LedgerEntry[]
  ): { text: string; url: string } {
    const amountStr = customer.balance.toLocaleString('en-IN');
    const text = translations.reminderMessage(customer.name, amountStr, shopName, lang, entries);
    const phone = cleanPhoneNumber(customer.phone);
    const url = phone
      ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    return { text, url };
  }

  public generateReceiptText(entry?: LedgerEntry, customer?: Customer, shopName: string = 'Kirana Store'): string {
    const cust = customer || { name: 'Customer', phone: '', balance: 0, totalCredit: 0, totalPayment: 0, id: '' };
    const isCredit = entry?.type === 'credit';
    const typeLabel = isCredit ? 'UDHAAR (CREDIT GIVEN)' : 'JAMA (PAYMENT RECEIVED)';
    const dateFormatted = entry?.date ? new Date(entry.date).toLocaleString('en-IN') : new Date().toLocaleString('en-IN');
    const amt = entry?.amount !== undefined ? entry.amount.toLocaleString('en-IN') : '0';

    return `
========================================
       ${shopName.toUpperCase()}
           KHATA RECEIPT SLIP
========================================
Date: ${dateFormatted}
Customer: ${cust.name}
Phone: ${cust.phone || 'N/A'}
----------------------------------------
Transaction Type: ${typeLabel}
Amount: ₹${amt}
${entry?.note ? `Note: ${entry.note}` : ''}
----------------------------------------
Current Total Balance Owed: ₹${cust.balance?.toLocaleString('en-IN') || '0'}
========================================
   Thank you for shopping with us!
   Powered by Voice Khata PWA
========================================
    `.trim();
  }

  public async exportData(): Promise<string> {
    await this.init();
    return JSON.stringify(
      { customers: this.customers, entries: this.entries, exportedAt: new Date().toISOString() },
      null,
      2
    );
  }

  public async exportCSV(): Promise<string> {
    await this.init();
    const rows: string[] = [];
    rows.push('# VOICE KHATA TRANSACTIONS');
    rows.push('Transaction ID,Date,Customer ID,Customer Name,Type,Amount (INR),Note,Created At');
    for (const e of this.entries) {
      const cust = this.customers.find((c) => c.id === e.customerId);
      const custName = cust ? cust.name : ((e as unknown as { customerName?: string }).customerName || 'Unknown');
      const safeNote = (e.note || '').replace(/"/g, '""');
      rows.push(`"${e.id}","${e.date}","${e.customerId}","${custName}","${e.type}","${e.amount}","${safeNote}","${e.createdAt}"`);
    }
    rows.push('');
    rows.push('# CUSTOMERS SUMMARY');
    rows.push('Customer ID,Name,Phone,Balance Owed (INR),Total Udhaar (INR),Total Jama (INR),Created At');
    for (const c of this.customers) {
      rows.push(`"${c.id}","${c.name}","${c.phone || ''}","${c.balance}","${c.totalCredit}","${c.totalPayment}","${c.createdAt}"`);
    }
    return rows.join('\r\n');
  }

  public async clearAllData(): Promise<void> {
    this.customers = [];
    this.entries = [];
    this.profile = null;
    this.paymentRequests = [];
  }
}

// Export singleton instance of RealLedgerService as default ledgerService
export const ledgerService: RealLedgerService = new RealLedgerService();
export { InMemoryLedgerService as MockLedgerService };
