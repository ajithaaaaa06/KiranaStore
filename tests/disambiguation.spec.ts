import { test, expect } from '@playwright/test';

// Setup Mock Speech Recognition for Disambiguation Tests
async function setupDisambiguationMocks(page: any) {
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

test.describe('F16: Customer Disambiguation by Last 4 Digits & Voice Resolution', () => {
  test.beforeEach(async ({ page }) => {
    await setupDisambiguationMocks(page);
    await page.setViewportSize({ width: 360, height: 640 });
  });

  // (a) an entry for "Ramesh" resolved by spoken last 4 digits
  test('a. Entry for "Ramesh" resolved by spoken last 4 digits (2345 -> Ramesh Kumar)', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await expect(micButton).toBeVisible({ timeout: 10000 });
    await micButton.click();

    // Speak ambiguous entry for "Ramesh"
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ko 500 udhaar diya');
    });

    // Disambiguation sheet opens asking "Kaun sa Ramesh?"
    const dialog = page.getByTestId('disambiguation-dialog');
    await expect(dialog).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Kaun sa Ramesh/i)).toBeVisible();
    await expect(page.getByText('••••••2345')).toBeVisible();
    await expect(page.getByText('••••••9887')).toBeVisible();

    // Shopkeeper speaks the last 4 digits of Ramesh Kumar: "2345"
    const sheetMic = page.getByTestId('disambiguation-mic-button');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('2345');
    });

    // Disambiguation sheet closes and ConfirmEntrySheet opens for Ramesh Kumar with ₹500
    await expect(dialog).not.toBeVisible({ timeout: 6000 });
    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Ramesh Kumar/i).first()).toBeVisible();
    await expect(page.getByText('500').first()).toBeVisible();
  });

  // (b) resolved by tap on candidate card
  test('b. Entry for "Ramesh" resolved by tapping candidate card (Ramesh Gowda)', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ne 350 diye');
    });

    const dialog = page.getByTestId('disambiguation-dialog');
    await expect(dialog).toBeVisible({ timeout: 6000 });

    // Tap second card: Ramesh Gowda
    const gowdaCard = page.getByTestId('candidate-card-1');
    await expect(gowdaCard).toBeVisible();
    await gowdaCard.click();

    // Continues to ConfirmEntrySheet for Ramesh Gowda with ₹350
    await expect(dialog).not.toBeVisible();
    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Ramesh Gowda/i).first()).toBeVisible();
  });

  // (c) wrong digits then tap
  test('c. Wrong digits spoken warns once then resolves by tap', async ({ page }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ko 200 udhaar diya');
    });

    const dialog = page.getByTestId('disambiguation-dialog');
    await expect(dialog).toBeVisible({ timeout: 6000 });

    // Speak wrong digits "9999" (not matching 2345 or 9887)
    const sheetMic = page.getByTestId('disambiguation-mic-button');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('9999');
    });

    // Warning message appears: "Ye number nahi mila"
    await expect(page.getByText(/Ye number nahi mila/i)).toBeVisible({ timeout: 4000 });

    // Tapping first card (Ramesh Kumar) still works cleanly
    const kumarCard = page.getByTestId('candidate-card-0');
    await kumarCard.click();

    await expect(dialog).not.toBeVisible();
    const confirmButton = page.getByTestId('confirm-save-button');
    await expect(confirmButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Ramesh Kumar/i).first()).toBeVisible();
  });

  // (d) balance query for an ambiguous name
  test('d. Balance query for ambiguous name ("Ramesh ka total?") resolved by spoken digits', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    // Query balance for ambiguous name
    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ka total?');
    });

    // Disambiguation sheet asks which Ramesh
    const dialog = page.getByTestId('disambiguation-dialog');
    await expect(dialog).toBeVisible({ timeout: 6000 });

    // Speak last 4 digits for Ramesh Gowda: "9887"
    const sheetMic = page.getByTestId('disambiguation-mic-button');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('9887');
    });

    // Opens Balance Answer Card for Ramesh Gowda!
    await expect(dialog).not.toBeVisible();
    await expect(page.getByText(/Ramesh Gowda/i).first()).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Kul Baaki|Total Balance|Baaki/i).first()).toBeVisible();
  });

  // (e) correction flow still works after disambiguation
  test('e. Correction flow ("nahi, 430") preserves disambiguated customer', async ({
    page,
  }) => {
    await page.goto('/?demo=1');
    await page.waitForLoadState('domcontentloaded');

    const micButton = page.getByTestId('giant-mic-button');
    await micButton.click();

    await page.evaluate(() => {
      (window as any).__triggerSpeech('Ramesh ko 500 udhaar diya');
    });

    const dialog = page.getByTestId('disambiguation-dialog');
    await expect(dialog).toBeVisible({ timeout: 6000 });

    // Resolve to Ramesh Kumar via digits "2345"
    const sheetMic = page.getByTestId('disambiguation-mic-button');
    await sheetMic.click();
    await page.evaluate(() => {
      (window as any).__triggerSpeech('2345');
    });

    await expect(dialog).not.toBeVisible();

    // Confirm sheet open with Ramesh Kumar and 500
    const saveButton = page.getByTestId('confirm-save-button');
    await expect(saveButton).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/Ramesh Kumar/i).first()).toBeVisible();

    // Spoken correction while confirm sheet is open: "nahi, 430"
    await page.evaluate(() => {
      (window as any).__triggerSpeech('nahi, 430');
    });

    // Amount updates to ₹430 while customer remains Ramesh Kumar
    await expect(page.getByText('430').first()).toBeVisible({ timeout: 4000 });
    await expect(page.getByText(/Ramesh Kumar/i).first()).toBeVisible();

    // Save transaction
    await saveButton.click();
    await expect(saveButton).not.toBeVisible();
  });
});
