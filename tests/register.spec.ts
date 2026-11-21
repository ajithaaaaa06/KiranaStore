import { test, expect } from '@playwright/test';

// Setup Mock Speech Recognition for Voice Registration Tests
async function setupRegisterMocks(page: any) {
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

test.describe('F15: Voice Registration of New Customers with Phone Number', () => {
  test.beforeEach(async ({ page }) => {
    await setupRegisterMocks(page);
    await page.setViewportSize({ width: 360, height: 640 });
  });

  // 1. Register by one sentence: "Naya customer Suresh, number 98459 12345"
  test('1. Register by one sentence with name and phone', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Click Giant Mic
    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });
    await micButton.click();

    // Trigger complete registration voice command with fresh non-duplicate phone
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Naya customer Suresh, number 98459 12345');
    });

    // RegisterCustomerSheet appears with prefilled name and phone
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId('customer-name-input')).toHaveValue('Suresh');
    await expect(page.getByTestId('customer-phone-input')).toHaveValue('98459 12345');

    // Confirm via read-back button
    const confirmButton = page.getByRole('button', { name: /yes, correct|haan, sahi hai/i });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // Verify sheet closes and customer is registered
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  // 2. Register with a missing number then ask for it:
  // "Deepak ko 400 udhaar diya" -> "Deepak naya hai. Number bataiye" -> speak number -> confirm -> continue to confirm sheet
  test('2. Missing customer on transaction prompts for phone then continues transaction', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    // Speak udhaar for non-existent customer "Deepak"
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Deepak ko 400 udhaar diya');
    });

    // RegisterCustomerSheet opens with Deepak and Pending Transaction banner
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId('customer-name-input')).toHaveValue('Deepak');
    await expect(page.getByText('Pending Transaction')).toBeVisible();

    // Speak phone number
    const sheetMic = page.getByLabel('Speak customer phone');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('9876543210');
    });

    await expect(page.getByTestId('customer-phone-input')).toHaveValue('98765 43210', { timeout: 4000 });

    // Confirm phone read-back
    const confirmButton = page.getByRole('button', { name: /yes, correct|haan, sahi hai/i });
    await confirmButton.click();

    // After registration, continues straight to TransactionConfirmSheet for Deepak ₹400!
    const saveTransactionButton = page.getByTestId('confirm-save-button');
    await expect(saveTransactionButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText('Deepak').first()).toBeVisible();

    // Save transaction
    await saveTransactionButton.click();
    await expect(saveTransactionButton).not.toBeVisible();
  });

  // 3. Duplicate phone number: warns "Ye number [Existing Name] ka hai. Wahi hai?"
  test('3. Duplicate phone detection warns and allows opening existing customer', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    // Attempt to register a new customer with Ramesh Kumar's seeded phone number (9845012345)
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Naya customer Mahesh, number 98450 12345');
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 6000 });

    // Verify duplicate warning displays Ramesh Kumar
    await expect(page.getByText(/Ramesh Kumar/i).first()).toBeVisible({ timeout: 4000 });
    await expect(page.getByRole('button', { name: /open|kholein/i }).first()).toBeVisible();
  });

  // 4. Misheard number corrected: speak wrong -> "Nahi" -> speak correct -> "Haan"
  test('4. Misheard number corrected via voice', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Naya customer Vikas');
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId('customer-name-input')).toHaveValue('Vikas');

    // Speak first (wrong) number
    const sheetMic = page.getByLabel('Speak customer phone');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('9811111111');
    });

    await expect(page.getByTestId('customer-phone-input')).toHaveValue('98111 11111', { timeout: 4000 });

    // Click "No, Change"
    const wrongButton = page.getByRole('button', { name: /no, change|nahi, badlo/i });
    await expect(wrongButton).toBeVisible();
    await wrongButton.click();

    // Phone field is cleared
    await expect(page.getByTestId('customer-phone-input')).toHaveValue('');

    // Speak corrected number (fresh non-duplicate phone)
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('9845912345');
    });

    await expect(page.getByTestId('customer-phone-input')).toHaveValue('98459 12345', { timeout: 4000 });

    // Confirm and Save
    const confirmButton = page.getByRole('button', { name: /yes, correct|haan, sahi hai/i });
    await confirmButton.click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  // 5. Manual keypad fallback: tap numeric keypad buttons to enter phone number
  test('5. Manual numeric keypad fallback', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Naya customer Sunita');
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 6000 });

    // Open keypad
    const keypadToggle = page.getByRole('button', { name: /type number on keypad instead/i });
    await keypadToggle.click();

    // Tap keypad digits: 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
    const digits = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
    for (const d of digits) {
      await page.getByRole('button', { name: d, exact: true }).click();
    }

    // Verify phone field has formatted 98765 43210
    await expect(page.getByTestId('customer-phone-input')).toHaveValue('98765 43210');

    // Confirm read-back
    const confirmButton = page.getByRole('button', { name: /yes, correct|haan, sahi hai/i });
    await confirmButton.click();

    // Verify modal dismissed and customer registered
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
