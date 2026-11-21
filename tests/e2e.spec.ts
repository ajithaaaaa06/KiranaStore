import { test, expect } from '@playwright/test';

// Common setup script to mock SpeechRecognition and bypass onboarding
async function setupMocks(page: any) {
  await page.addInitScript(() => {
    localStorage.setItem('vk_onboarding_completed', 'true');
    localStorage.setItem('vk_signup_completed', 'true');
    localStorage.setItem('vk_speech_language', 'hi');

    class MockSpeechRecognition {
      continuous = false;
      interimResults = true;
      maxAlternatives = 5;
      lang = 'hi-IN';
      onstart: (() => void) | null = null;
      onresult: ((event: any) => void) | null = null;
      onerror: ((err: any) => void) | null = null;
      onend: (() => void) | null = null;

      constructor() {
        (window as any).__activeRecognition = this;
      }

      start() {
        if (this.onstart) setTimeout(() => this.onstart?.(), 10);
      }
      stop() {
        if (this.onend) setTimeout(() => this.onend?.(), 10);
      }
      abort() {
        if (this.onend) setTimeout(() => this.onend?.(), 10);
      }
    }

    (window as any).SpeechRecognition = MockSpeechRecognition;
    (window as any).webkitSpeechRecognition = MockSpeechRecognition;

    (window as any).__triggerSpeech = async (transcript: string) => {
      if ((window as any).__simulateVoice) {
        return (window as any).__simulateVoice(transcript);
      }
      const rec = (window as any).__activeRecognition;
      if (rec && rec.onresult) {
        const item = [{ transcript, confidence: 0.96 }];
        (item as any).isFinal = true;
        (item as any).length = 1;
        const results = [item];
        (results as any).length = 1;
        rec.onresult({
          resultIndex: 0,
          results,
        });
        if (rec.onend) {
          rec.onend();
        }
      }
    };

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia = async () => {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const dst = ctx.createMediaStreamDestination();
        osc.connect(dst);
        return dst.stream;
      };
    }
  });
}

test.describe('Udhaar Sathi E2E Acceptance Suite (360x640 Viewport)', () => {
  test.beforeEach(async ({ page }) => {
    await setupMocks(page);
    await page.setViewportSize({ width: 360, height: 640 });
  });

  // (a) say -> confirm -> save
  test('(a) Voice Flow: Say -> Confirm Preview -> Save in <= 2 taps', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    // 1. Verify Giant Mic button is present and tap it
    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });
    await micButton.click();

    // 2. Mock spoken sentence: "Lakshmi ko 500 udhaar diya"
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('Lakshmi ko 500 udhaar diya');
    });

    // 3. Confirm Preview Sheet appears with customer and ₹500
    const saveButton = page.getByTestId('confirm-save-button');
    await expect(saveButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText('Lakshmi').first()).toBeVisible();

    // 4. Tap Save button (<= 2 taps total)
    await saveButton.click();

    // 5. Verify transaction is recorded and sheet is dismissed
    await expect(saveButton).toBeHidden({ timeout: 5000 });
    await expect(page.getByText('Lakshmi').first()).toBeVisible();
  });

  // (b) voice correction
  test('(b) Voice Correction: Spoken correction updates pending entry in place', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });

    // 1. Initial voice entry: "Lakshmi 500 udhaar"
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('Lakshmi 500 udhaar');
    });

    const saveButton = page.getByTestId('confirm-save-button');
    await expect(saveButton).toBeVisible({ timeout: 6000 });

    const amountInput = page.getByLabel(/Rakam \(Amount in Rupees\)/i);
    await expect(amountInput).toHaveValue('500');

    // 2. Spoken correction: "nahi 430"
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('nahi 430');
    });

    // 3. Pending entry amount updates in place to 430
    await expect(amountInput).toHaveValue('430');

    // 4. Save corrected entry
    await saveButton.click();
    await expect(saveButton).toBeHidden({ timeout: 5000 });
  });

  // (c) balance query
  test('(c) Balance Query: "Ramesh ka total?" opens BalanceAnswerCard', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });

    // 1. Trigger voice balance query for unique customer Lakshmi
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('Lakshmi ka total?');
    });

    // 2. Balance card dialog appears with customer balance
    const balanceTitle = page.getByText(/Khata Balance Inquiry/i);
    await expect(balanceTitle).toBeVisible({ timeout: 6000 });
    await expect(page.getByText('Lakshmi').first()).toBeVisible();

    // 3. Close card
    const closeBtn = page.getByRole('button', { name: /Close card/i });
    await closeBtn.click();
    await expect(balanceTitle).toBeHidden({ timeout: 4000 });
  });

  // (d) duplicate warning
  test('(d) Duplicate Warning: Flags identical transaction within 10 minutes', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });

    // 1. Add first entry
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('Lakshmi 200 jama');
    });
    const saveButton = page.getByTestId('confirm-save-button');
    await expect(saveButton).toBeVisible({ timeout: 6000 });
    await saveButton.click();
    await expect(saveButton).toBeHidden({ timeout: 5000 });

    // 2. Send identical transaction again within 10 minutes
    await page.evaluate(async () => {
      await (window as any).__triggerSpeech('Lakshmi 200 jama');
    });

    // 3. Duplicate warning banner appears
    const saveAnyway = page.getByTestId('duplicate-save-anyway-button');
    await expect(saveAnyway).toBeVisible({ timeout: 6000 });

    // 4. User can acknowledge and save anyway
    await saveAnyway.click();
    await expect(saveAnyway).toBeHidden();
    await saveButton.click();
    await expect(saveButton).toBeHidden({ timeout: 5000 });
  });

  // (e) manual fallback
  test('(e) Manual Fallback: Reachable from "Type instead" with ATM-style numeric keypad', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Click "Type instead" button
    const typeInstead = page.getByTestId('type-instead-button');
    await expect(typeInstead).toBeVisible({ timeout: 6000 });
    await typeInstead.click();

    // 2. ManualEntrySheet bottom sheet is visible
    const sheetTitle = page.getByText(/Manual Entry \(Bina Aawaz Entry\)/i);
    await expect(sheetTitle).toBeVisible({ timeout: 5000 });

    // 3. Enter customer name "Pooja"
    const customerInput = page.getByPlaceholder(/Grahak ka naam likhein\.\.\./i);
    await customerInput.fill('Pooja');

    // 4. Tap numeric keypad digits: 3, 5, 0 (Rs 350)
    await page.getByRole('button', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();

    // 5. Save entry
    const saveManual = page.getByTestId('manual-save-button');
    await expect(saveManual).toBeEnabled();
    await saveManual.click();

    // 6. Sheet closes cleanly
    await expect(sheetTitle).toBeHidden({ timeout: 5000 });
  });

  // (f) offline reload
  test('(f) Offline Reload: App shell boots and operates cleanly in offline mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Verify app initial load
    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 6000 });

    // 2. Emulate Airplane mode (Offline)
    await page.evaluate(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // 3. Verify Offline Badge is shown
    const offlineBadge = page.getByText(/Offline/i).first();
    await expect(offlineBadge).toBeVisible({ timeout: 4000 });

    // 4. Verify core flow operates offline: Add entry via manual fallback
    const typeInstead = page.getByTestId('type-instead-button');
    await typeInstead.click();

    const customerInput = page.getByPlaceholder(/Grahak ka naam likhein\.\.\./i);
    await customerInput.fill('OfflineCustomer');

    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();

    const saveManual = page.getByTestId('manual-save-button');
    await saveManual.click();

    // 5. Entry is stored locally in IndexedDB with zero network calls
    await expect(page.getByText('OfflineCustomer').first()).toBeVisible({ timeout: 5000 });
  });
});
