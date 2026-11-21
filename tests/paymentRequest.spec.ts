import { test, expect } from '@playwright/test';

// Setup Mock Speech Recognition and Shopkeeper Profile for Payment Request Tests
async function setupPaymentRequestMocks(page: any) {
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

test.describe('F17: Instant Payment Request Sheet & On-Device UPI QR Code', () => {
  test.beforeEach(async ({ page }) => {
    await setupPaymentRequestMocks(page);
    await page.setViewportSize({ width: 360, height: 640 });
  });

  // (a) Save udhaar -> PaymentRequestSheet appears with QR code & amount, screenshot at 360x640
  test('a. Saving udhaar opens PaymentRequestSheet with QR and amount (360x640)', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });
    await micButton.click();

    // Trigger spoken credit entry for Ramesh
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ko 500 udhaar diya');
    });

    // Disambiguation sheet opens for Ramesh
    const disambigDialog = page.getByTestId('disambiguation-dialog');
    await expect(disambigDialog).toBeVisible({ timeout: 6000 });

    // Tap candidate card (Ramesh Kumar / Ramesh Bhai)
    const candidateCard = page.getByTestId('candidate-card-0');
    await candidateCard.click();

    // Confirm entry sheet appears
    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 8000 });
    await confirmButton.click();

    // PaymentRequestSheet appears automatically
    const paymentSheet = page.getByTestId('payment-request-sheet');
    await expect(paymentSheet).toBeVisible({ timeout: 8000 });

    // Verify QR code image is generated and displayed
    const qrImage = page.getByTestId('upi-qr-image');
    await expect(qrImage).toBeVisible();

    // Verify amount is rendered
    await expect(page.getByTestId('added-amount-label')).toHaveText(/500/);

    // Verify WhatsApp and Share buttons exist
    await expect(page.getByTestId('send-whatsapp-btn')).toBeVisible();
    await expect(page.getByTestId('share-qr-btn')).toBeVisible();

    // Capture screenshot at 360x640 for submission assets
    await page.screenshot({
      path: 'test-results/payment-request-sheet-360x640.png',
      fullPage: true,
    });
  });

  // (b) Customer with no phone hides WhatsApp button and shows "Add number" prompt
  test('b. Customer with no phone hides WhatsApp button and shows Add number button', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    // Open manual entry sheet
    const typeInsteadBtn = page.getByTestId('type-instead-button');
    await expect(typeInsteadBtn).toBeVisible({ timeout: 6000 });
    await typeInsteadBtn.click();

    const nameInput = page.getByPlaceholder(/Grahak ka naam likhein/i);
    await expect(nameInput).toBeVisible({ timeout: 6000 });
    await nameInput.fill('Mohan Lal NoPhone');

    // Tap keypad digits: 4, 0, 0
    await page.getByRole('button', { name: '4', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).first().click();
    await page.getByRole('button', { name: '0', exact: true }).first().click();

    const saveManualBtn = page.getByTestId('manual-save-button');
    await saveManualBtn.click();

    // Payment sheet opens for Mohan Lal
    const paymentSheet = page.getByTestId('payment-request-sheet');
    await expect(paymentSheet).toBeVisible({ timeout: 8000 });

    // WhatsApp button must be hidden since Mohan Lal has no phone
    await expect(page.getByTestId('send-whatsapp-btn')).not.toBeVisible();

    // Must offer "Add phone number" option
    await expect(page.getByTestId('no-phone-warning')).toBeVisible();
    await expect(page.getByTestId('add-phone-number-btn')).toBeVisible();
  });

  // (c) Offline mode disables WhatsApp button with offline hint
  test('c. Offline mode disables WhatsApp button with offline hint', async ({
    page,
    context,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Suresh ko 300 udhaar');
    });

    // Confirm entry
    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 8000 });
    await confirmButton.click();

    // Payment sheet opens
    const paymentSheet = page.getByTestId('payment-request-sheet');
    await expect(paymentSheet).toBeVisible({ timeout: 8000 });

    // QR code works 100% offline
    await expect(page.getByTestId('upi-qr-image')).toBeVisible();

    // Now simulate device going offline while viewing the sheet
    await context.setOffline(true);
    await page.evaluate(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // WhatsApp button should be disabled because internet is required
    const whatsappBtn = page.getByTestId('send-whatsapp-btn');
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toBeDisabled();

    // Restore online
    await context.setOffline(false);
    await page.evaluate(() => {
      window.dispatchEvent(new Event('online'));
    });
  });

  // (d) Dismissing sheet ("Baad mein") allows next voice entry immediately without blocking
  test('d. Dismissing sheet does not block next voice entry', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Lakshmi ko 250 udhaar');
    });

    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 8000 });
    await confirmButton.click();

    const paymentSheet = page.getByTestId('payment-request-sheet');
    await expect(paymentSheet).toBeVisible({ timeout: 8000 });

    // Dismiss sheet via "Baad mein"
    const dismissBtn = page.getByTestId('dismiss-payment-request-btn');
    await dismissBtn.click();
    await expect(paymentSheet).not.toBeVisible();

    // Mic button is immediately active and clickable for the next entry
    await expect(micButton).toBeVisible();
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Suresh ne 200 diye');
    });

    // Next confirm entry sheet appears immediately
    await expect(page.getByTestId('confirm-save-button')).toBeVisible({ timeout: 8000 });
    await expect(page.getByText(/Suresh/i).first()).toBeVisible();
  });

  // (e) "Show my QR" shortcut on Home screen opens counter QR code
  test('e. Show my QR shortcut opens counter QR code for walk-in customers', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const showQrBtn = page.getByTestId('show-my-qr-btn');
    await expect(showQrBtn).toBeVisible({ timeout: 8000 });
    await showQrBtn.click();

    const paymentSheet = page.getByTestId('payment-request-sheet');
    await expect(paymentSheet).toBeVisible({ timeout: 8000 });

    // Counter mode title and QR visible
    await expect(page.getByText(/Shop Counter QR/i)).toBeVisible();
    await expect(page.getByTestId('upi-qr-image')).toBeVisible();

    // Does not show specific customer udhaar details in counter mode
    await expect(page.getByTestId('customer-name-label')).not.toBeVisible();

    // Dismiss counter QR
    await page.getByTestId('dismiss-payment-request-btn').click();
    await expect(paymentSheet).not.toBeVisible();
  });
});
