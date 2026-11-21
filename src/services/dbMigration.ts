/**
 * Voice Khata DB Migration & Seeding Utility
 * 
 * Takes plaintext demo/pitch datasets (or user imports),
 * encrypts the sensitive fields using the active Web Crypto key,
 * and writes the encrypted records into the real IndexedDB stores.
 */

import { getDB, EncryptedCustomerRecord, EncryptedEntryRecord } from './db';
import { cryptoService } from './crypto';
import { Customer, LedgerEntry } from './types';
import { PITCH_CUSTOMERS, PITCH_ENTRIES } from './demoDataset';

/**
 * Encrypts a customer entity into an IndexedDB record
 */
export async function encryptCustomerEntity(customer: Customer): Promise<EncryptedCustomerRecord> {
  const sensitiveData = {
    name: customer.name,
    phone: customer.phone || '',
    notes: customer.notes || '',
  };

  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);

  return {
    id: customer.id,
    createdAt: customer.createdAt || new Date().toISOString(),
    lastTransactionDate: customer.lastTransactionDate,
    encryptedPayload,
    iv,
  };
}

/**
 * Decrypts an IndexedDB customer record back into a full Customer entity
 */
export async function decryptCustomerEntity(
  record: EncryptedCustomerRecord,
  calculatedBalance: { totalCredit: number; totalPayment: number; balance: number } = {
    totalCredit: 0,
    totalPayment: 0,
    balance: 0,
  }
): Promise<Customer> {
  const sensitive = await cryptoService.decryptObject<{
    name: string;
    phone: string;
    notes?: string;
  }>({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv,
  });

  return {
    id: record.id,
    name: sensitive.name,
    phone: sensitive.phone,
    notes: sensitive.notes,
    createdAt: record.createdAt,
    lastTransactionDate: record.lastTransactionDate,
    totalCredit: calculatedBalance.totalCredit,
    totalPayment: calculatedBalance.totalPayment,
    balance: calculatedBalance.balance,
  };
}

/**
 * Encrypts a LedgerEntry into an IndexedDB record
 */
export async function encryptEntryEntity(entry: LedgerEntry): Promise<EncryptedEntryRecord> {
  const sensitiveData = {
    customerName: entry.customerName || '',
    amount: entry.amount,
    note: entry.note || entry.notes || '',
    notes: entry.notes || entry.note || '',
    rawTranscript: entry.rawTranscript || '',
  };

  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);

  return {
    id: entry.id,
    customerId: entry.customerId,
    type: entry.type,
    date: entry.date,
    createdAt: entry.createdAt,
    synced: entry.synced ?? true,
    encryptedPayload,
    iv,
  };
}

/**
 * Decrypts an IndexedDB entry record back into a full LedgerEntry entity
 */
export async function decryptEntryEntity(record: EncryptedEntryRecord): Promise<LedgerEntry> {
  const sensitive = await cryptoService.decryptObject<{
    customerName: string;
    amount: number;
    note?: string;
    notes?: string;
    rawTranscript?: string;
  }>({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv,
  });

  return {
    id: record.id,
    customerId: record.customerId,
    type: record.type,
    date: record.date,
    createdAt: record.createdAt,
    synced: record.synced,
    customerName: sensitive.customerName,
    amount: sensitive.amount,
    note: sensitive.note || sensitive.notes,
    notes: sensitive.notes || sensitive.note,
    rawTranscript: sensitive.rawTranscript,
  };
}

/**
 * Seeds the pitch demo dataset (12 customers, ~60 entries across 14 days)
 * fully encrypted into the real DB.
 */
export async function seedPitchDemoDataToDB(): Promise<void> {
  const db = await getDB();

  // Clear existing
  await db.clear('customers');
  await db.clear('entries');

  // Encrypt and put customers
  for (const cust of PITCH_CUSTOMERS) {
    const encryptedRecord = await encryptCustomerEntity(cust);
    await db.put('customers', encryptedRecord);
  }

  // Encrypt and put entries
  for (const entry of PITCH_ENTRIES) {
    const encryptedRecord = await encryptEntryEntity(entry);
    await db.put('entries', encryptedRecord);
  }
}
