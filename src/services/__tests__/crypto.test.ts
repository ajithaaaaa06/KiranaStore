import { describe, it, expect, beforeEach } from 'vitest';
import { CryptoService, bufferToBase64, base64ToBuffer } from '../crypto';

describe('Web Crypto Service (AES-GCM 256 & PBKDF2)', () => {
  let crypto: CryptoService;

  beforeEach(() => {
    crypto = new CryptoService();
  });

  it('generates a 256-bit AES-GCM data key and fresh 12-byte IVs', async () => {
    const key = await crypto.generateDataKey();
    expect(key).toBeDefined();
    expect(key.algorithm.name).toBe('AES-GCM');

    const iv1 = crypto.generateIV();
    const iv2 = crypto.generateIV();
    expect(iv1.length).toBe(12);
    expect(iv2.length).toBe(12);
    expect(bufferToBase64(iv1)).not.toBe(bufferToBase64(iv2));
  });

  it('round-trip encrypts and decrypts customer sensitive data', async () => {
    const key = await crypto.generateDataKey();
    crypto.setActiveKey(key);

    const originalData = {
      name: 'Ramesh Bhai (Plumber)',
      phone: '9845012345',
      notes: 'Near cross road 2',
    };

    const encrypted = await crypto.encryptObject(originalData);
    expect(encrypted.encryptedPayload).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    // Ciphertext should not contain plaintext
    expect(encrypted.encryptedPayload).not.toContain('Ramesh');
    expect(encrypted.encryptedPayload).not.toContain('9845012345');

    const decrypted = await crypto.decryptObject(encrypted);
    expect(decrypted).toEqual(originalData);
  });

  it('round-trip encrypts and decrypts ledger entry sensitive data', async () => {
    const key = await crypto.generateDataKey();
    crypto.setActiveKey(key);

    const entryData = {
      customerName: 'Pooja Akka (Teacher)',
      amount: 450,
      note: 'Doodh aur bread udhaar',
      rawTranscript: 'Pooja chaar sau pachaas udhaar',
    };

    const encrypted = await crypto.encryptObject(entryData);
    expect(encrypted.encryptedPayload).not.toContain('450');
    expect(encrypted.encryptedPayload).not.toContain('Pooja');

    const decrypted = await crypto.decryptObject(encrypted);
    expect(decrypted).toEqual(entryData);
  });

  it('generates unique IV for every encryption call (no IV reuse)', async () => {
    const key = await crypto.generateDataKey();
    crypto.setActiveKey(key);

    const sample = { amount: 500 };
    const enc1 = await crypto.encryptObject(sample);
    const enc2 = await crypto.encryptObject(sample);

    expect(enc1.iv).not.toBe(enc2.iv);
    expect(enc1.encryptedPayload).not.toBe(enc2.encryptedPayload);
  });

  it('PIN Protection: PBKDF2 wraps data key, fails on wrong PIN, succeeds on correct PIN', async () => {
    const dataKey = await crypto.generateDataKey();
    const correctPin = '7890';
    const wrongPin = '1234';

    // 1. Wrap data key with correct PIN
    const wrappedMeta = await crypto.wrapDataKeyWithPin(dataKey, correctPin);
    expect(wrappedMeta.wrappedKey).toBeDefined();
    expect(wrappedMeta.salt).toBeDefined();
    expect(wrappedMeta.iv).toBeDefined();
    expect(wrappedMeta.iterations).toBe(200000);

    // 2. Attempt unwrap with wrong PIN -> fails (AES-GCM tag mismatch)
    const failedKey = await crypto.unwrapDataKeyWithPin(wrappedMeta, wrongPin);
    expect(failedKey).toBeNull();

    // 3. Attempt unwrap with correct PIN -> succeeds
    const recoveredKey = await crypto.unwrapDataKeyWithPin(wrappedMeta, correctPin);
    expect(recoveredKey).not.toBeNull();

    // 4. Verify recovered key can decrypt payload encrypted by original key
    crypto.setActiveKey(dataKey);
    const payload = await crypto.encryptObject({ secret: 'Kirana Secret Vault' });

    crypto.setActiveKey(recoveredKey);
    const decrypted = await crypto.decryptObject(payload);
    expect(decrypted.secret).toBe('Kirana Secret Vault');
  });

  it('throws an error when attempting to encrypt or decrypt while locked', async () => {
    crypto.lock();
    expect(crypto.isUnlocked()).toBe(false);

    await expect(crypto.encryptObject({ name: 'Secret' })).rejects.toThrow(
      'Cannot encrypt: Data encryption key is locked or not initialized'
    );
  });
});
