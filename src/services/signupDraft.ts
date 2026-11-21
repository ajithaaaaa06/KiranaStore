/**
 * Resumable Sign-Up Draft Service
 * 
 * Satisfies F14 Privacy Requirement:
 * "The wizard is resumable: if the app is closed halfway it resumes at the same step
 * (keep progress without personal data in plaintext)."
 * 
 * Encrypts in-flight wizard form values using Web Crypto AES-GCM before saving to localStorage.
 */

import { cryptoService } from './crypto';

export interface SignupDraftData {
  shopName: string;
  shopkeeperName: string;
  phone: string;
  upiId: string;
  pin?: string;
}

const STORAGE_KEY_STEP = 'vk_signup_step';
const STORAGE_KEY_PAYLOAD = 'vk_signup_draft_payload';
const STORAGE_KEY_IV = 'vk_signup_draft_iv';

export async function saveSignupDraft(step: number, data: SignupDraftData): Promise<void> {
  try {
    if (typeof window === 'undefined') return;

    // Save non-sensitive step number in plaintext
    localStorage.setItem(STORAGE_KEY_STEP, step.toString());

    // Ensure crypto active key is available
    let key = cryptoService.getActiveKey();
    if (!key) {
      key = await cryptoService.generateDataKey();
      cryptoService.setActiveKey(key);
    }

    // Encrypt sensitive draft values
    const { encryptedPayload, iv } = await cryptoService.encryptObject(data);
    localStorage.setItem(STORAGE_KEY_PAYLOAD, encryptedPayload);
    localStorage.setItem(STORAGE_KEY_IV, iv);
  } catch (err) {
    console.warn('Failed to save encrypted signup draft:', err);
  }
}

export async function loadSignupDraft(): Promise<{ step: number; data: SignupDraftData } | null> {
  try {
    if (typeof window === 'undefined') return null;

    const savedStepStr = localStorage.getItem(STORAGE_KEY_STEP);
    const payload = localStorage.getItem(STORAGE_KEY_PAYLOAD);
    const iv = localStorage.getItem(STORAGE_KEY_IV);

    if (!payload || !iv) {
      return null;
    }

    const step = savedStepStr ? parseInt(savedStepStr, 10) : 0;
    if (isNaN(step)) return null;

    // Decrypt payload into memory
    const decrypted = await cryptoService.decryptObject<SignupDraftData>({
      encryptedPayload: payload,
      iv,
    });

    return {
      step,
      data: {
        shopName: decrypted.shopName || '',
        shopkeeperName: decrypted.shopkeeperName || '',
        phone: decrypted.phone || '',
        upiId: decrypted.upiId || '',
        pin: decrypted.pin || '',
      },
    };
  } catch (err) {
    console.warn('Could not decrypt signup draft (possibly fresh session):', err);
    return null;
  }
}

export function clearSignupDraft(): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY_STEP);
    localStorage.removeItem(STORAGE_KEY_PAYLOAD);
    localStorage.removeItem(STORAGE_KEY_IV);
  } catch {}
}
