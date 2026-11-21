/**
 * Voice Khata Web Crypto Service
 * 
 * Hardware-backed/standard Web Crypto API:
 * 1. AES-GCM 256 for all record encryption.
 * 2. Fresh random 12-byte IV per record stored alongside ciphertext.
 * 3. Key derivation: PBKDF2 with 200,000 iterations, SHA-256, 16-byte random salt.
 * 4. Key wrapping/unwrapping for 4-6 digit PIN protection.
 * 5. Field-level encryption:
 *    - Customers: 'name', 'phone', 'notes'
 *    - Entries: 'customerName', 'amount', 'note', 'notes', 'rawTranscript'
 *    Plaintext retained only for IDs and timestamps for indexing.
 */

// Helper: cross-platform Base64 conversion
export function bufferToBase64(buf: ArrayBuffer | Uint8Array): string {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < u8.length; i++) {
    binary += String.fromCharCode(u8[i]);
  }
  return btoa(binary);
}

export function base64ToBuffer(b64: string): Uint8Array {
  const binary = atob(b64);
  const u8 = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    u8[i] = binary.charCodeAt(i);
  }
  return u8;
}

export interface EncryptedPayload {
  encryptedPayload: string; // Base64 ciphertext
  iv: string;               // Base64 12-byte IV
}

export interface WrappedKeyMetadata {
  wrappedKey: string; // Base64 wrapped raw data key
  salt: string;       // Base64 16-byte salt for PBKDF2
  iv: string;         // Base64 12-byte IV for AES-GCM wrapKey
  iterations: number; // 200,000
}

export class CryptoService {
  private activeDataKey: CryptoKey | null = null;
  private isLockedState: boolean = false;
  private readonly PBKDF2_ITERATIONS = 200000;

  private get subtle(): SubtleCrypto {
    if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
      return globalThis.crypto.subtle;
    }
    throw new Error('Web Crypto API (crypto.subtle) is not available in this environment');
  }

  /**
   * Generates a fresh random 12-byte IV for AES-GCM
   */
  public generateIV(): Uint8Array {
    return globalThis.crypto.getRandomValues(new Uint8Array(12));
  }

  /**
   * Generates a fresh random 16-byte salt for PBKDF2
   */
  public generateSalt(): Uint8Array {
    return globalThis.crypto.getRandomValues(new Uint8Array(16));
  }

  /**
   * Generates a new 256-bit AES-GCM data encryption key
   */
  public async generateDataKey(): Promise<CryptoKey> {
    return await this.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true, // extractable so it can be wrapped or stored
      ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
    );
  }

  /**
   * Derives an AES-GCM wrapping key from a PIN using PBKDF2 (200k iterations, SHA-256)
   */
  public async deriveWrappingKeyFromPin(pin: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const pinBuffer = encoder.encode(pin.trim());

    // 1. Import raw PIN bytes as PBKDF2 key
    const baseKey = await this.subtle.importKey(
      'raw',
      pinBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // 2. Derive AES-GCM key with 200,000 iterations
    return await this.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as BufferSource,
        iterations: this.PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['wrapKey', 'unwrapKey', 'encrypt', 'decrypt']
    );
  }

  /**
   * Wraps the current data key using a PIN
   */
  public async wrapDataKeyWithPin(dataKey: CryptoKey, pin: string): Promise<WrappedKeyMetadata> {
    const salt = this.generateSalt();
    const iv = this.generateIV();
    const wrappingKey = await this.deriveWrappingKeyFromPin(pin, salt);

    const wrappedBuffer = await this.subtle.wrapKey(
      'raw',
      dataKey,
      wrappingKey,
      { name: 'AES-GCM', iv: iv as BufferSource }
    );

    return {
      wrappedKey: bufferToBase64(wrappedBuffer),
      salt: bufferToBase64(salt),
      iv: bufferToBase64(iv),
      iterations: this.PBKDF2_ITERATIONS,
    };
  }

  /**
   * Unwraps a wrapped data key using the given PIN.
   * Throws or returns null if PIN is incorrect (AES-GCM tag mismatch).
   */
  public async unwrapDataKeyWithPin(meta: WrappedKeyMetadata, pin: string): Promise<CryptoKey | null> {
    try {
      const salt = base64ToBuffer(meta.salt);
      const iv = base64ToBuffer(meta.iv);
      const wrappedKeyBytes = base64ToBuffer(meta.wrappedKey);

      const wrappingKey = await this.deriveWrappingKeyFromPin(pin, salt);

      const dataKey = await this.subtle.unwrapKey(
        'raw',
        wrappedKeyBytes as BufferSource,
        wrappingKey,
        { name: 'AES-GCM', iv: iv as BufferSource },
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
      );

      return dataKey;
    } catch {
      // AES-GCM tag check failed = Wrong PIN
      return null;
    }
  }

  /**
   * Encrypts arbitrary serializable object into base64 ciphertext + base64 12-byte IV
   */
  public async encryptObject(obj: any, customKey?: CryptoKey): Promise<EncryptedPayload> {
    const key = customKey || this.activeDataKey;
    if (!key) {
      throw new Error('Cannot encrypt: Data encryption key is locked or not initialized');
    }

    const iv = this.generateIV();
    const encoder = new TextEncoder();
    const plaintextBytes = encoder.encode(JSON.stringify(obj));

    const ciphertext = await this.subtle.encrypt(
      { name: 'AES-GCM', iv: iv as BufferSource },
      key,
      plaintextBytes
    );

    return {
      encryptedPayload: bufferToBase64(ciphertext),
      iv: bufferToBase64(iv),
    };
  }

  /**
   * Decrypts ciphertext + IV into original object
   */
  public async decryptObject<T = any>(payload: EncryptedPayload, customKey?: CryptoKey): Promise<T> {
    const key = customKey || this.activeDataKey;
    if (!key) {
      throw new Error('Cannot decrypt: Data encryption key is locked or not initialized');
    }

    const iv = base64ToBuffer(payload.iv);
    const ciphertext = base64ToBuffer(payload.encryptedPayload);

    const decryptedBytes = await this.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as BufferSource },
      key,
      ciphertext as BufferSource
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBytes));
  }

  // --- Session & Memory Key State ---

  public setActiveKey(key: CryptoKey | null) {
    this.activeDataKey = key;
    this.isLockedState = key === null;
  }

  public getActiveKey(): CryptoKey | null {
    return this.activeDataKey;
  }

  public isUnlocked(): boolean {
    return this.activeDataKey !== null;
  }

  public lock(): void {
    this.activeDataKey = null;
    this.isLockedState = true;
  }

  /**
   * Exports a CryptoKey to raw Base64 (used for unprotected local storage when PIN is disabled)
   */
  public async exportRawKey(key: CryptoKey): Promise<string> {
    const raw = await this.subtle.exportKey('raw', key);
    return bufferToBase64(raw);
  }

  /**
   * Imports a raw Base64 string into a CryptoKey
   */
  public async importRawKey(base64Raw: string): Promise<CryptoKey> {
    const raw = base64ToBuffer(base64Raw);
    return await this.subtle.importKey(
      'raw',
      raw as BufferSource,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
    );
  }
}

// Singleton crypto instance
export const cryptoService = new CryptoService();
