/**
 * Voice Khata IndexedDB Layer (via 'idb' library)
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
import { TransactionType } from './types';

export const DB_NAME = 'VoiceKhataDB';
export const DB_VERSION = 1;

export interface EncryptedCustomerRecord {
  id: string;
  createdAt?: string;
  lastTransactionDate?: string;
  encryptedPayload: string; // Base64 ciphertext containing { name, phone, notes }
  iv: string;               // Base64 12-byte IV
}

export interface EncryptedEntryRecord {
  id: string;
  customerId: string;
  type: TransactionType;
  date: string;            // ISO String for indexing
  createdAt: string;       // ISO String
  synced?: boolean;
  encryptedPayload: string; // Base64 ciphertext containing { customerName, amount, note, notes, rawTranscript }
  iv: string;               // Base64 12-byte IV
}

export interface MetaRecord {
  key: string;
  value: any;
}

export interface VoiceKhataDBSchema extends DBSchema {
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
}

// In-Memory Mock Store for Node.js / Headless environments without window.indexedDB
class InMemoryDBMock {
  private customers = new Map<string, EncryptedCustomerRecord>();
  private entries = new Map<string, EncryptedEntryRecord>();
  private settings = new Map<string, { key: string; value: any }>();
  private meta = new Map<string, MetaRecord>();

  private getStore(name: string): Map<string, any> {
    switch (name) {
      case 'customers': return this.customers;
      case 'entries': return this.entries;
      case 'settings': return this.settings;
      case 'meta': return this.meta;
      default: throw new Error(`Unknown store: ${name}`);
    }
  }

  public async get(storeName: string, key: string) {
    return this.getStore(storeName).get(key) || undefined;
  }

  public async put(storeName: string, value: any, key?: string) {
    const k = key || value.id || value.key;
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
    return [];
  }

  public transaction() {
    return {
      done: Promise.resolve(),
    };
  }

  public close() {}
}

let dbInstance: IDBPDatabase<VoiceKhataDBSchema> | InMemoryDBMock | null = null;

/**
 * Opens or retrieves the singleton VoiceKhataDB instance
 */
export async function getDB(): Promise<IDBPDatabase<VoiceKhataDBSchema> | InMemoryDBMock> {
  if (dbInstance) {
    return dbInstance;
  }

  // Check if browser IndexedDB is available
  const isIndexedDBAvailable = typeof indexedDB !== 'undefined' && typeof window !== 'undefined';

  if (!isIndexedDBAvailable) {
    dbInstance = new InMemoryDBMock();
    return dbInstance;
  }

  try {
    dbInstance = await openDB<VoiceKhataDBSchema>(DB_NAME, DB_VERSION, {
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
      },
      blocked() {
        console.warn('VoiceKhataDB database upgrade blocked: please close other tabs.');
      },
      blocking() {
        if (dbInstance && 'close' in dbInstance) {
          dbInstance.close();
          dbInstance = null;
        }
      },
    });

    return dbInstance;
  } catch (err) {
    console.warn('Failed to open browser IndexedDB, falling back to in-memory store:', err);
    dbInstance = new InMemoryDBMock();
    return dbInstance;
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
