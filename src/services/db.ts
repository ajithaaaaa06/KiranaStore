/**
 * Udhaar Sathi IndexedDB Layer (via 'idb' library)
 * 
 * Stores:
 * - 'customers': keyPath 'id' (contains encryptedPayload, iv, id, createdAt, lastTransactionDate)
 * - 'entries': keyPath 'id' (contains encryptedPayload, iv, id, customerId, type, date, createdAt, synced)
 *   - index 'by-customerId' on 'customerId'
 *   - index 'by-date' on 'date'
 * - 'settings': keyPath 'key'
 * - 'meta': keyPath 'key' (stores wrapped data key or unprotected data key, schema version)
 * 
 * Provides:
 * - Schema versioning and migration
 * - Graceful in-memory fallback for headless/Node.js testing environments
 * - Storage persistence management (navigator.storage.persist)
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { TransactionType, EntrySource, PaymentRequestStatus } from './types';

export const DB_NAME = 'UdhaarSathiDB';
export const LEGACY_DB_NAME = 'VoiceKhataDB';
export const DB_VERSION = 2;

export interface EncryptedCustomerRecord {
  id: string;
  createdAt?: string;
  lastTransactionDate?: string;
  encryptedPayload: string; // Base64 ciphertext containing { name, phone, notes, phoneVerified }
  iv: string;               // Base64 12-byte IV
}

export interface EncryptedEntryRecord {
  id: string;
  customerId: string;
  type: TransactionType;
  date: string;            // ISO String for indexing
  createdAt: string;       // ISO String
  synced?: boolean;
  source?: EntrySource;
  paymentRef?: string;
  encryptedPayload: string; // Base64 ciphertext containing { customerName, amount, note, notes, rawTranscript, source, paymentRef }
  iv: string;               // Base64 12-byte IV
}

export interface EncryptedProfileRecord {
  id: string;              // 'current'
  createdAt: string;       // ISO String
  updatedAt: string;       // ISO String
  encryptedPayload: string;// Base64 ciphertext containing { shopName, shopkeeperName, phone, upiId }
  iv: string;              // Base64 12-byte IV
}

export interface EncryptedPaymentRequestRecord {
  ref: string;             // Unique random reference id (keyPath)
  entryId?: string;        // Optional associated ledger entry id
  customerId: string;      // Customer identifier
  status: PaymentRequestStatus; // Indexable status: 'pending' | 'paid' | 'expired' | 'cancelled'
  createdAt: string;       // ISO String
  expiresAt: string;       // ISO String
  paidAt?: string;         // ISO String
  encryptedPayload: string;// Base64 ciphertext containing { amount, paidAmount, link }
  iv: string;              // Base64 12-byte IV
}

export interface MetaRecord {
  key: string;
  value: any;
}

export interface UdhaarSathiDBSchema extends DBSchema {
  customers: {
    key: string;
    value: EncryptedCustomerRecord;
  };
  entries: {
    key: string;
    value: EncryptedEntryRecord;
    indexes: {
      'by-customerId': string;
      'by-date': string;
    };
  };
  settings: {
    key: string;
    value: { key: string; value: any };
  };
  meta: {
    key: string;
    value: MetaRecord;
  };
  profile: {
    key: string;
    value: EncryptedProfileRecord;
  };
  paymentRequests: {
    key: string;
    value: EncryptedPaymentRequestRecord;
    indexes: {
      'by-ref': string;
      'by-status': string;
    };
  };
}

export type VoiceKhataDBSchema = UdhaarSathiDBSchema;

// In-Memory Mock Store for Node.js / Headless environments without window.indexedDB
class InMemoryDBMock {
  private customers = new Map<string, EncryptedCustomerRecord>();
  private entries = new Map<string, EncryptedEntryRecord>();
  private settings = new Map<string, { key: string; value: any }>();
  private meta = new Map<string, MetaRecord>();
  private profile = new Map<string, EncryptedProfileRecord>();
  private paymentRequests = new Map<string, EncryptedPaymentRequestRecord>();

  private getStore(name: string): Map<string, any> {
    switch (name) {
      case 'customers': return this.customers;
      case 'entries': return this.entries;
      case 'settings': return this.settings;
      case 'meta': return this.meta;
      case 'profile': return this.profile;
      case 'paymentRequests': return this.paymentRequests;
      default: throw new Error(`Unknown store: ${name}`);
    }
  }

  public async get(storeName: string, key: string) {
    return this.getStore(storeName).get(key) || undefined;
  }

  public async put(storeName: string, value: any, key?: string) {
    const k = key || value.ref || value.id || value.key;
    this.getStore(storeName).set(k, value);
    return k;
  }

  public async delete(storeName: string, key: string) {
    this.getStore(storeName).delete(key);
  }

  public async clear(storeName: string) {
    this.getStore(storeName).clear();
  }

  public async getAll(storeName: string) {
    return Array.from(this.getStore(storeName).values());
  }

  public async count(storeName: string) {
    return this.getStore(storeName).size;
  }

  public async getAllFromIndex(storeName: string, indexName: string, query: string) {
    if (storeName === 'entries') {
      const all = Array.from(this.entries.values());
      if (indexName === 'by-customerId') {
        return all.filter((e) => e.customerId === query);
      }
      if (indexName === 'by-date') {
        return all.filter((e) => e.date.startsWith(query));
      }
    }
    if (storeName === 'paymentRequests') {
      const all = Array.from(this.paymentRequests.values());
      if (indexName === 'by-status') {
        return all.filter((p) => p.status === query);
      }
      if (indexName === 'by-ref') {
        return all.filter((p) => p.ref === query);
      }
    }
    return [];
  }

  public transaction() {
    return {
      done: Promise.resolve(),
    };
  }

  public close() {}
}

let dbInstance: IDBPDatabase<UdhaarSathiDBSchema> | InMemoryDBMock | null = null;

/**
 * Migrates existing data from legacy localStorage keys to new Udhaar Sathi keys
 */
export function migrateLocalStorage(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const migrations: [string, string][] = [
      ['voice_khata_settings', 'udhaar_sathi_settings'],
      ['voice_khata_lang', 'udhaar_sathi_lang'],
      ['voice_khata_speech_lang', 'udhaar_sathi_speech_lang'],
      ['voice_khata_speech_speed', 'udhaar_sathi_speech_speed'],
      ['voice_khata_speech_muted', 'udhaar_sathi_speech_muted'],
      ['voice_khata_theme', 'udhaar_sathi_theme'],
      ['vk_shop_name', 'us_shop_name'],
      ['vk_demo_mode', 'us_demo_mode'],
      ['vk_signup_completed', 'us_signup_completed'],
      ['vk_onboarding_completed', 'us_onboarding_completed'],
      ['vk_skipped_pin_banner', 'us_skipped_pin_banner'],
      ['vk_sound_enabled', 'us_sound_enabled'],
      ['vk_speech_rate', 'us_speech_rate'],
      ['vk_sound_muted', 'us_sound_muted'],
      ['vk_has_custom_speech_lang', 'us_has_custom_speech_lang'],
      ['vk_pwa_install_dismissed', 'us_pwa_install_dismissed'],
    ];

    for (const [oldKey, newKey] of migrations) {
      const val = localStorage.getItem(oldKey);
      if (val !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, val);
      }
    }
  } catch {}
}

/**
 * Migrates existing data from legacy VoiceKhataDB to new UdhaarSathiDB so no data is lost
 */
export async function migrateFromLegacyDB(newDB: IDBPDatabase<UdhaarSathiDBSchema>): Promise<void> {
  if (typeof indexedDB === 'undefined') return;

  try {
    const newCustomersCount = await newDB.count('customers').catch(() => 0);
    const newEntriesCount = await newDB.count('entries').catch(() => 0);
    if (newCustomersCount > 0 || newEntriesCount > 0) {
      return;
    }

    const oldDB = await openDB<UdhaarSathiDBSchema>(LEGACY_DB_NAME, DB_VERSION).catch(() => null);
    if (!oldDB) return;

    const oldCustomerCount = await oldDB.count('customers').catch(() => 0);
    const oldEntriesCount = await oldDB.count('entries').catch(() => 0);

    if (oldCustomerCount === 0 && oldEntriesCount === 0) {
      oldDB.close();
      return;
    }

    // Copy customers
    const customers = await oldDB.getAll('customers');
    const tx = newDB.transaction(['customers', 'entries', 'meta', 'settings', 'profile'], 'readwrite');
    for (const c of customers) {
      await tx.objectStore('customers').put(c);
    }

    // Copy entries
    const entries = await oldDB.getAll('entries');
    for (const e of entries) {
      await tx.objectStore('entries').put(e);
    }

    // Copy meta
    const metaList = await oldDB.getAll('meta').catch(() => []);
    for (const m of metaList) {
      await tx.objectStore('meta').put(m);
    }

    // Copy settings
    const settingsList = await oldDB.getAll('settings').catch(() => []);
    for (const s of settingsList) {
      await tx.objectStore('settings').put(s);
    }

    // Copy profile
    const profileList = await oldDB.getAll('profile').catch(() => []);
    for (const p of profileList) {
      await tx.objectStore('profile').put(p);
    }

    await tx.done;
    oldDB.close();
  } catch (e) {
    console.warn('[Udhaar Sathi] Legacy DB migration notice:', e);
  }
}

/**
 * Opens or retrieves the singleton UdhaarSathiDB instance
 */
export async function getDB(): Promise<IDBPDatabase<UdhaarSathiDBSchema>> {
  if (dbInstance) {
    return dbInstance as unknown as IDBPDatabase<UdhaarSathiDBSchema>;
  }

  migrateLocalStorage();

  // Check if browser IndexedDB is available
  const isIndexedDBAvailable = typeof indexedDB !== 'undefined' && typeof window !== 'undefined';

  if (!isIndexedDBAvailable) {
    dbInstance = new InMemoryDBMock();
    return dbInstance as unknown as IDBPDatabase<UdhaarSathiDBSchema>;
  }

  try {
    dbInstance = await openDB<UdhaarSathiDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Store 1: customers
        if (!db.objectStoreNames.contains('customers')) {
          db.createObjectStore('customers', { keyPath: 'id' });
        }

        // Store 2: entries
        if (!db.objectStoreNames.contains('entries')) {
          const entryStore = db.createObjectStore('entries', { keyPath: 'id' });
          entryStore.createIndex('by-customerId', 'customerId', { unique: false });
          entryStore.createIndex('by-date', 'date', { unique: false });
        }

        // Store 3: settings
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        // Store 4: meta (cryptographic keys, salts, db metadata)
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }

        // Version 2 Migration: Store 5: profile & Store 6: paymentRequests
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('profile')) {
            db.createObjectStore('profile', { keyPath: 'id' });
          }

          if (!db.objectStoreNames.contains('paymentRequests')) {
            const payStore = db.createObjectStore('paymentRequests', { keyPath: 'ref' });
            payStore.createIndex('by-ref', 'ref', { unique: true });
            payStore.createIndex('by-status', 'status', { unique: false });
          }
        }
      },
      blocked() {
        console.warn('UdhaarSathiDB database upgrade blocked: please close other tabs.');
      },
      blocking() {
        if (dbInstance && 'close' in dbInstance) {
          dbInstance.close();
          dbInstance = null;
        }
      },
    });

    await migrateFromLegacyDB(dbInstance);

    return dbInstance;
  } catch (err) {
    console.warn('Failed to open browser IndexedDB, falling back to in-memory store:', err);
    dbInstance = new InMemoryDBMock();
    return dbInstance as unknown as IDBPDatabase<UdhaarSathiDBSchema>;
  }
}

/**
 * Closes the active database connection
 */
export async function closeDB(): Promise<void> {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Completely resets and clears all database records
 */
export async function resetDatabase(): Promise<void> {
  const db = await getDB();
  await db.clear('customers');
  await db.clear('entries');
  await db.clear('settings');
  await db.clear('meta');
  await db.clear('profile');
  await db.clear('paymentRequests');
}

/**
 * Storage Persistence Management:
 * Requests persistent storage from the browser so offline Khata ledger
 * is never evicted under storage pressure.
 */
export async function requestStoragePersistence(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Checks if persistent storage is already granted
 */
export async function checkStoragePersistence(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persisted) {
    try {
      return await navigator.storage.persisted();
    } catch {
      return false;
    }
  }
  return false;
}
