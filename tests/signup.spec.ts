import { test, expect } from '@playwright/test';

// Setup Mock Speech Recognition for Signup
async function setupSignupMocks(page: any) {
  await page.addInitScript(() => {
    // Clear completion flags & wipe DB to ensure first-run signup wizard appears
    localStorage.removeItem('vk_signup_completed');
    localStorage.removeItem('vk_onboarding_completed');
    localStorage.removeItem('vk_demo_mode');
    localStorage.setItem('vk_ui_language', 'en');
    try {
      indexedDB.deleteDatabase('voice_khata_db');
    } catch {}

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

    (window as any).__triggerSpeech = (transcript: string) => {
      const rec = (window as any).__activeRecognition;
      if (rec && rec.onresult) {
        const item = [{ transcript, confidence: 0.98 }];
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
  });
}

test.describe('F14: Shopkeeper Sign-Up & Shop Profile E2E', () => {
  test.beforeEach(async ({ page }) => {
    await setupSignupMocks(page);
    await page.setViewportSize({ width: 360, height: 640 });
  });

  test('Flow 1: Complete sign-up wizard by typing all fields', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('vk_signup_completed');
      localStorage.removeItem('vk_onboarding_completed');
      localStorage.removeItem('vk_demo_mode');
      window.dispatchEvent(new Event('vk_open_signup'));
    });
    await page.waitForLoadState('domcontentloaded');

    // Step 0: Welcome screen appears
    await expect(page.getByText('Voice Khata Setup')).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/data stays on this phone|isi phone par rehta hai|No cloud login/i)).toBeVisible();

    // Click "Get Started"
    await page.getByRole('button', { name: /get started|shuru karein/i }).click();

    // Step 1: Shop Name
    const shopInput = page.getByPlaceholder(/sri balaji kirana|ramesh kirana/i);
    await expect(shopInput).toBeVisible({ timeout: 4000 });
    await shopInput.fill('Gupta General Store');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 2: Shopkeeper Name
    const ownerInput = page.getByPlaceholder(/ramesh kumar/i);
    await expect(ownerInput).toBeVisible({ timeout: 4000 });
    await ownerInput.fill('Anil Gupta');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 3: Phone Number
    const phoneInput = page.getByPlaceholder(/9876543210/i);
    await expect(phoneInput).toBeVisible({ timeout: 4000 });
    await phoneInput.fill('9812345678');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 4: UPI ID
    const upiInput = page.getByPlaceholder(/ramesh@oksbi/i);
    await expect(upiInput).toBeVisible({ timeout: 4000 });
    await upiInput.fill('guptastore@icici');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 5: Optional PIN (test strong PIN)
    const pinInput = page.getByPlaceholder('••••');
    await expect(pinInput).toBeVisible({ timeout: 4000 });
    await pinInput.fill('8492');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 6: Review Screen
    await expect(page.getByText('Gupta General Store')).toBeVisible({ timeout: 4000 });
    await expect(page.getByText('Anil Gupta')).toBeVisible();
    await expect(page.getByText('+91 9812345678')).toBeVisible();
    await expect(page.getByText('guptastore@icici')).toBeVisible();

    // Tap "Start Voice Khata"
    const startButton = page.getByRole('button', { name: /start voice khata|shuru karein/i });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Verify wizard closes and top bar displays updated shop name
    await expect(page.getByText('Gupta General Store')).toBeVisible({ timeout: 6000 });
  });

  test('Flow 2: Complete sign-up wizard with mocked SpeechRecognition & spoken UPI conversion', async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('vk_signup_completed');
      localStorage.removeItem('vk_onboarding_completed');
      localStorage.removeItem('vk_demo_mode');
      window.dispatchEvent(new Event('vk_open_signup'));
    });
    await page.waitForLoadState('domcontentloaded');

    // Step 0: Welcome screen
    await expect(page.getByText('Voice Khata Setup')).toBeVisible({ timeout: 6000 });
    await page.getByRole('button', { name: /get started|shuru karein/i }).click();

    // Step 1: Speak Shop Name via Mic
    const shopMic = page.getByLabel('Speak shop name');
    await expect(shopMic).toBeVisible({ timeout: 4000 });
    await shopMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Sri Krishna Provisions');
    });
    await expect(page.getByPlaceholder(/sri balaji kirana|ramesh kirana/i)).toHaveValue('Sri Krishna Provisions', { timeout: 4000 });
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 2: Speak Shopkeeper Name via Mic
    const ownerMic = page.getByLabel('Speak your name');
    await expect(ownerMic).toBeVisible({ timeout: 4000 });
    await ownerMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Suresh Reddy');
    });
    await expect(page.getByPlaceholder(/ramesh kumar/i)).toHaveValue('Suresh Reddy', { timeout: 4000 });
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 3: Type Phone Number
    const phoneInput = page.getByPlaceholder(/9876543210/i);
    await expect(phoneInput).toBeVisible({ timeout: 4000 });
    await phoneInput.fill('9988776655');
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 4: Spoken UPI ID with "at" conversion ("suresh at oksbi" -> "suresh@oksbi")
    const upiMic = page.getByLabel('Speak UPI ID');
    await expect(upiMic).toBeVisible({ timeout: 4000 });
    await upiMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('suresh at oksbi');
    });
    await expect(page.getByPlaceholder(/ramesh@oksbi/i)).toHaveValue('suresh@oksbi', { timeout: 4000 });
    await page.getByRole('button', { name: /next|aage/i }).click();

    // Step 5: Skip PIN
    const skipButton = page.getByRole('button', { name: /skip for now|abhi skip/i });
    await expect(skipButton).toBeVisible({ timeout: 4000 });
    await skipButton.click();

    // Confirm Skip PIN in dialog
    const confirmSkipButton = page.getByRole('button', { name: /skip pin/i });
    await expect(confirmSkipButton).toBeVisible();
    await confirmSkipButton.click();

    // Step 6: Review Screen
    await expect(page.getByText('Sri Krishna Provisions')).toBeVisible({ timeout: 4000 });
    await expect(page.getByText('Suresh Reddy')).toBeVisible();
    await expect(page.getByText('+91 9988776655')).toBeVisible();
    await expect(page.getByText('suresh@oksbi')).toBeVisible();
    await expect(page.getByText(/none \(skipped\)/i)).toBeVisible();

    // Start
    const startButton = page.getByRole('button', { name: /start voice khata|shuru karein/i });
    await startButton.click();

    // Verify top bar shows "Sri Krishna Provisions"
    await expect(page.getByText('Sri Krishna Provisions')).toBeVisible({ timeout: 6000 });
  });
});
