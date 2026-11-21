import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { dictionaries, SUPPORTED_LANGUAGES, TranslationKey } from '../../i18n/translations';
import { I18nProvider, useI18n, LANGUAGE_STORAGE_KEY, SPEECH_LANG_STORAGE_KEY } from '../../i18n/I18nContext';
import {
  formatRupees,
  formatRelativeDate,
  formatFullRelativeDate,
  convertToNativeDigits,
  getLocaleForLang,
  NATIVE_DIGIT_MAP,
} from '../../lib/format';
import { formatINR, formatDate } from '../../lib/formatters';
import { QuickSummaryCards } from '../../components/QuickSummaryCards';
import { RecentTransactionsList } from '../../components/RecentTransactionsList';
import { GiantMicHero } from '../../components/GiantMicHero';
import { InstallAppBanner } from '../../components/InstallAppBanner';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { LanguageCode, DailySummary } from '../types';

// Setup Mock LocalStorage for Node test environment
class MockLocalStorage {
  private store: Record<string, string> = {};
  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();
(global as any).localStorage = mockStorage;

const DEVANAGARI_REGEX = /[\u0900-\u097F]/;

const mockSummary: DailySummary = {
  date: new Date().toISOString(),
  totalCredit: 500,
  totalPayment: 200,
  netBalance: 300,
  entryCount: 3,
  activeCustomers: 2,
  totalCreditGiven: 500,
  totalPaymentReceived: 200,
  netBalanceChange: 300,
  transactionCount: 3,
  activeCustomersCount: 2,
};

describe('Dashboard Localization & Multilingual Purity Test Suite', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('1. Dictionary Completeness & Script Purity Audit', () => {
    const requiredLanguages: LanguageCode[] = ['en', 'hi', 'kn', 'ta', 'te', 'hinglish'];
    const nonHindiLanguages: LanguageCode[] = ['en', 'kn', 'ta', 'te', 'hinglish'];
    const baseKeys = Object.keys(dictionaries.en).sort() as TranslationKey[];

    it('all dictionaries have exact same key set as English', () => {
      for (const lang of requiredLanguages) {
        const dictKeys = Object.keys(dictionaries[lang]).sort();
        expect(dictKeys).toEqual(baseKeys);
        expect(dictKeys.length).toBe(baseKeys.length);
      }
    });

    it('asserts non-Hindi dictionaries contain ZERO Devanagari characters', () => {
      for (const lang of nonHindiLanguages) {
        const dict = dictionaries[lang];
        for (const [key, value] of Object.entries(dict)) {
          const hasDevanagari = DEVANAGARI_REGEX.test(value);
          expect(
            hasDevanagari,
            `Language "${lang}" key "${key}" contains Devanagari: "${value}"`
          ).toBe(false);
        }
      }
    });

    it('asserts Hindi dictionary contains authentic Devanagari text', () => {
      const hiValues = Object.values(dictionaries.hi).join(' ');
      expect(DEVANAGARI_REGEX.test(hiValues)).toBe(true);
    });
  });

  describe('2. Dashboard Rendering in Non-Hindi Languages (Zero Devanagari)', () => {
    const languagesToTest: LanguageCode[] = ['en', 'kn', 'ta', 'te'];

    const mockEntries = [
      {
        id: 'tx-1',
        customerId: 'c-1',
        customerName: 'Rajesh',
        amount: 500,
        type: 'credit' as const,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tx-2',
        customerId: 'c-2',
        customerName: 'Kavitha',
        amount: 200,
        type: 'payment' as const,
        date: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    it.each(languagesToTest)(
      'renders QuickSummaryCards in %s with ZERO Devanagari',
      (lang) => {
        mockStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        const html = renderToString(
          <I18nProvider>
            <QuickSummaryCards
              summary={mockSummary}
              totalPendingBalance={12500}
            />
          </I18nProvider>
        );

        expect(html.length).toBeGreaterThan(0);
        expect(DEVANAGARI_REGEX.test(html)).toBe(false);
      }
    );

    it.each(languagesToTest)(
      'renders RecentTransactionsList in %s with ZERO Devanagari',
      (lang) => {
        mockStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        const html = renderToString(
          <MemoryRouter>
            <I18nProvider>
              <RecentTransactionsList
                entries={mockEntries}
                onDeleteEntry={() => {}}
                onSelectCustomer={() => {}}
              />
            </I18nProvider>
          </MemoryRouter>
        );

        expect(html.length).toBeGreaterThan(0);
        expect(DEVANAGARI_REGEX.test(html)).toBe(false);
      }
    );

    it.each(languagesToTest)(
      'renders GiantMicHero in %s with ZERO Devanagari',
      (lang) => {
        mockStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        const html = renderToString(
          <I18nProvider>
            <GiantMicHero
              speechState="idle"
              audioLevels={[0, 0, 0, 0, 0]}
              errorMessage={null}
              onStartListening={() => {}}
              onStopListening={() => {}}
              onSimulateVoice={() => {}}
              onOpenManualEntry={() => {}}
            />
          </I18nProvider>
        );

        expect(html.length).toBeGreaterThan(0);
        expect(DEVANAGARI_REGEX.test(html)).toBe(false);
      }
    );

    it.each(languagesToTest)(
      'renders ErrorBoundary in %s with ZERO Devanagari',
      (lang) => {
        mockStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

        const boundary = new ErrorBoundary({ children: null });
        boundary.state = {
          hasError: true,
          error: new Error('Simulated UI crash'),
          errorInfo: null,
          showDetails: false,
        };

        const element = boundary.render() as React.ReactElement;
        const html = renderToString(element);

        expect(html.length).toBeGreaterThan(0);
        expect(DEVANAGARI_REGEX.test(html)).toBe(false);
      }
    );
  });

  describe('3. Dashboard Rendering in Hindi (Contains Devanagari)', () => {
    it('renders QuickSummaryCards in Hindi with authentic Devanagari script', () => {
      mockStorage.setItem(LANGUAGE_STORAGE_KEY, 'hi');

      const html = renderToString(
        <I18nProvider>
          <QuickSummaryCards
            summary={mockSummary}
            totalPendingBalance={12500}
          />
        </I18nProvider>
      );

      expect(DEVANAGARI_REGEX.test(html)).toBe(true);
      expect(html).toContain(dictionaries.hi.creditGiven);
      expect(html).toContain(dictionaries.hi.paymentReceived);
    });

    it('renders RecentTransactionsList in Hindi with authentic Devanagari script', () => {
      mockStorage.setItem(LANGUAGE_STORAGE_KEY, 'hi');

      const html = renderToString(
        <MemoryRouter>
          <I18nProvider>
            <RecentTransactionsList
              entries={[
                {
                  id: 'tx-1',
                  customerId: 'c-1',
                  customerName: 'Ramesh',
                  amount: 500,
                  type: 'credit',
                  date: new Date().toISOString(),
                  createdAt: new Date().toISOString(),
                },
              ]}
              onDeleteEntry={() => {}}
            />
          </I18nProvider>
        </MemoryRouter>
      );

      expect(DEVANAGARI_REGEX.test(html)).toBe(true);
      expect(html).toContain(dictionaries.hi.recentEntries);
    });
  });

  describe('4. Localized Relative Dates & Formatters', () => {
    const today = new Date().toISOString();
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    const dayBefore = new Date(Date.now() - 2 * 86400000).toISOString();

    it('formats relative dates in English, Kannada, Tamil, Telugu with ZERO Devanagari', () => {
      const nonHindiLangs: ('en' | 'kn' | 'ta' | 'te')[] = ['en', 'kn', 'ta', 'te'];

      for (const lang of nonHindiLangs) {
        const todayStr = formatRelativeDate(today, { lang });
        const yesterdayStr = formatRelativeDate(yesterday, { lang });
        const dayBeforeStr = formatRelativeDate(dayBefore, { lang });

        expect(DEVANAGARI_REGEX.test(todayStr)).toBe(false);
        expect(DEVANAGARI_REGEX.test(yesterdayStr)).toBe(false);
        expect(DEVANAGARI_REGEX.test(dayBeforeStr)).toBe(false);

        expect(todayStr.length).toBeGreaterThan(0);
        expect(yesterdayStr.length).toBeGreaterThan(0);
        expect(dayBeforeStr.length).toBeGreaterThan(0);
      }
    });

    it('formats relative dates in Hindi with Devanagari', () => {
      expect(formatRelativeDate(today, { lang: 'hi' })).toBe('आज');
      expect(formatRelativeDate(yesterday, { lang: 'hi' })).toBe('कल (बीता)');
      expect(formatRelativeDate(dayBefore, { lang: 'hi' })).toBe('परसों');
    });

    it('formats Kannada relative dates correctly', () => {
      expect(formatRelativeDate(today, { lang: 'kn' })).toBe('ಇಂದು');
      expect(formatRelativeDate(yesterday, { lang: 'kn' })).toBe('ನಿನ್ನೆ');
      expect(formatRelativeDate(dayBefore, { lang: 'kn' })).toBe('ಮೊನ್ನೆ');
    });

    it('formats Tamil relative dates correctly', () => {
      expect(formatRelativeDate(today, { lang: 'ta' })).toBe('இன்று');
      expect(formatRelativeDate(yesterday, { lang: 'ta' })).toBe('நேற்று');
      expect(formatRelativeDate(dayBefore, { lang: 'ta' })).toBe('முந்தாநாள்');
    });

    it('formats Telugu relative dates correctly', () => {
      expect(formatRelativeDate(today, { lang: 'te' })).toBe('ఈరోజు');
      expect(formatRelativeDate(yesterday, { lang: 'te' })).toBe('నిన్న');
      expect(formatRelativeDate(dayBefore, { lang: 'te' })).toBe('మొన్న');
    });
  });

  describe('5. Indian Digit Grouping & Indic Numeral Conversion', () => {
    it('strictly applies Indian number grouping (lakhs & crores)', () => {
      expect(formatRupees(124500)).toBe('₹1,24,500');
      expect(formatRupees(10000000)).toBe('₹1,00,00,000');
      expect(formatRupees(350)).toBe('₹350');
      expect(formatINR(124500)).toBe('₹1,24,500');
    });

    it('converts to native Indic digits when requested by user setting', () => {
      // Kannada digits
      const knFormatted = formatRupees(124500, { lang: 'kn', numeralScript: 'native' });
      expect(knFormatted).toBe('₹೧,೨೪,೫೦೦');
      expect(DEVANAGARI_REGEX.test(knFormatted)).toBe(false);

      // Tamil digits
      const taFormatted = formatRupees(124500, { lang: 'ta', numeralScript: 'native' });
      expect(taFormatted).toBe('₹௧,௨௪,௫௦௦');
      expect(DEVANAGARI_REGEX.test(taFormatted)).toBe(false);

      // Telugu digits
      const teFormatted = formatRupees(124500, { lang: 'te', numeralScript: 'native' });
      expect(teFormatted).toBe('₹౧,౨౪,౫౦౦');
      expect(DEVANAGARI_REGEX.test(teFormatted)).toBe(false);

      // Hindi / Devanagari digits
      const hiFormatted = formatRupees(124500, { lang: 'hi', numeralScript: 'native' });
      expect(hiFormatted).toBe('₹१,२४,५००');
      expect(DEVANAGARI_REGEX.test(hiFormatted)).toBe(true);
    });
  });

  describe('6. Language State Persistence & Speech Language Decoupling', () => {
    it('persists selected language in localStorage without requiring reload', () => {
      let currentLang: LanguageCode = 'en';
      let switchLangFn: (l: LanguageCode) => void = () => {};

      const TestComponent = () => {
        const { language, setLanguage } = useI18n();
        currentLang = language;
        switchLangFn = setLanguage;
        return <div>{language}</div>;
      };

      renderToString(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );

      expect(currentLang).toBe('en');

      // Trigger language switch
      switchLangFn('kn');
      expect(mockStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('kn');
    });

    it('speech language defaults to UI language unless explicitly separated', () => {
      let currentSpeechLang: LanguageCode = 'en';
      let switchLangFn: (l: LanguageCode) => void = () => {};

      const TestComponent = () => {
        const { speechLanguage, setLanguage } = useI18n();
        currentSpeechLang = speechLanguage;
        switchLangFn = setLanguage;
        return <div>{speechLanguage}</div>;
      };

      renderToString(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );

      expect(currentSpeechLang).toBe('en');

      // Changing UI language automatically synchronizes speech language
      switchLangFn('te');
      expect(mockStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('te');
      expect(mockStorage.getItem(SPEECH_LANG_STORAGE_KEY)).toBe('te');
    });
  });
});
