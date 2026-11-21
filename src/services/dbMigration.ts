/**
 * Udhaar Sathi DB Migration & Seeding Utility
 * 
 * Takes plaintext demo/pitch datasets (or user imports),
 * encrypts the sensitive fields using the active Web Crypto key,
 * and writes the encrypted records into the real IndexedDB stores.
 */

import {
  getDB,
  EncryptedCustomerRecord,
  EncryptedEntryRecord,
  EncryptedProfileRecord,
  EncryptedPaymentRequestRecord,
} from './db';
import { cryptoService } from './crypto';
import { Customer, LedgerEntry, ShopProfile, PaymentRequest, EntrySource } from './types';
import { cleanPhoneNumber } from '../lib/formatters';

/**
 * Encrypts a customer entity into an IndexedDB record
 */
export async function encryptCustomerEntity(customer: Customer): Promise<EncryptedCustomerRecord> {
  const sensitiveData = {
    name: customer.name,
    phone: customer.phone ? cleanPhoneNumber(customer.phone) : '',
    notes: customer.notes || '',
    phoneVerified: customer.phoneVerified ?? false,
    lastRemindedAt: customer.lastRemindedAt,
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
    phoneVerified?: boolean;
    lastRemindedAt?: string;
  }>({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv,
  });

  return {
    id: record.id,
    name: sensitive.name,
    phone: sensitive.phone ? cleanPhoneNumber(sensitive.phone) : undefined,
    phoneVerified: sensitive.phoneVerified ?? false,
    notes: sensitive.notes,
    lastRemindedAt: sensitive.lastRemindedAt,
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
    source: entry.source || 'voice',
    paymentRef: entry.paymentRef,
  };

  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);

  return {
    id: entry.id,
    customerId: entry.customerId,
    type: entry.type,
    date: entry.date,
    createdAt: entry.createdAt,
    synced: entry.synced ?? true,
    source: entry.source || 'voice',
    paymentRef: entry.paymentRef,
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
    source?: EntrySource;
    paymentRef?: string;
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
    source: sensitive.source || record.source || 'voice',
    paymentRef: sensitive.paymentRef || record.paymentRef,
  };
}

/**
 * Encrypts a ShopProfile entity into an IndexedDB record
 */
export async function encryptProfileEntity(profile: ShopProfile): Promise<EncryptedProfileRecord> {
  const sensitiveData = {
    shopName: profile.shopName,
    shopkeeperName: profile.shopkeeperName,
    phone: cleanPhoneNumber(profile.phone),
    upiId: profile.upiId,
  };

  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);

  return {
    id: 'current',
    createdAt: profile.createdAt || new Date().toISOString(),
    updatedAt: profile.updatedAt || new Date().toISOString(),
    encryptedPayload,
    iv,
  };
}

/**
 * Decrypts an IndexedDB profile record back into a full ShopProfile entity
 */
export async function decryptProfileEntity(record: EncryptedProfileRecord): Promise<ShopProfile> {
  const sensitive = await cryptoService.decryptObject<{
    shopName: string;
    shopkeeperName: string;
    phone: string;
    upiId: string;
  }>({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv,
  });

  return {
    shopName: sensitive.shopName,
    shopkeeperName: sensitive.shopkeeperName,
    phone: cleanPhoneNumber(sensitive.phone),
    upiId: sensitive.upiId,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

/**
 * Encrypts a PaymentRequest entity into an IndexedDB record
 */
export async function encryptPaymentRequestEntity(
  req: PaymentRequest
): Promise<EncryptedPaymentRequestRecord> {
  const sensitiveData = {
    amount: req.amount,
    paidAmount: req.paidAmount,
    link: req.link,
  };

  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);

  return {
    ref: req.ref,
    entryId: req.entryId,
    customerId: req.customerId,
    status: req.status,
    createdAt: req.createdAt || new Date().toISOString(),
    expiresAt: req.expiresAt,
    paidAt: req.paidAt,
    encryptedPayload,
    iv,
  };
}

/**
 * Decrypts an IndexedDB payment request record back into a full PaymentRequest entity
 */
export async function decryptPaymentRequestEntity(
  record: EncryptedPaymentRequestRecord
): Promise<PaymentRequest> {
  const sensitive = await cryptoService.decryptObject<{
    amount: number;
    paidAmount?: number;
    link?: string;
  }>({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv,
  });

  return {
    ref: record.ref,
    entryId: record.entryId,
    customerId: record.customerId,
    amount: sensitive.amount,
    status: record.status,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
    paidAt: record.paidAt,
    paidAmount: sensitive.paidAmount,
    link: sensitive.link,
  };
}

/**
 * Seeds the pitch demo dataset (12 customers, ~60 entries across 14 days)
 * fully encrypted into the real DB.
 */
export async function seedPitchDemoDataToDB(): Promise<void> {
  const { PITCH_CUSTOMERS, PITCH_ENTRIES } = await import('./demoDataset');
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
