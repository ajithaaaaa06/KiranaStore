# Voice Khata – Comprehensive Test & Accuracy Report

**Date:** 2026-11-21  
**Project:** Voice Khata (आवाज़ खाता) – Indic Hands-Free Kirana Ledger PWA  
**Operating Environment:** Windows x64, Node.js v26.13.1, Chromium Mobile Viewport (360×640)

---

## Executive Summary

| Test Domain | Target / PRD SLA | Achieved Result | Status |
| :--- | :--- | :--- | :--- |
| **Unit Test Suite** | 100% Pass Rate across Core Services | **419 / 419 Tests Passed** (44 PRD + 375 Vitest) | **PASSED** |
| **Service Code Coverage** | > 80% Core Coverage | **85.09% Statements**, **82.28% Branch** | **PASSED** |
| **Noisy Speech Parsing Accuracy** | $\ge 90.0\%$ Overall Accuracy | **100.0%** (50 / 50 Noisy Phrases) | **PASSED** |
| **Playwright E2E Tests (360×640)** | 6 Critical Scenarios passing | **6 / 6 Scenarios Passed (100%)** | **PASSED** |
| **Parse + Confirm Latency (4× CPU)** | $< 2.0\text{s}$ ($2000\text{ms}$) SLA | **p50: 45.7ms, p95: 46.7ms, Cold: 53.7ms** | **PASSED** |
| **Balance Query Latency (4× CPU)** | $< 2.0\text{s}$ ($2000\text{ms}$) SLA | **p50: 45.4ms, p95: 45.8ms, Cold: 45.6ms** | **PASSED** |
| **Production Build** | 0 TypeScript / Bundle Errors | **Built cleanly in 3.63s** | **PASSED** |

---

## 1. Unit Test & Code Coverage Report (`npm test`)

Ran through Vitest v1.6.0 with v8 coverage instrumentation across core ledger services:

```text
 ✓ src/services/__tests__/customerMatcher.test.ts  (48 tests)
 ✓ src/services/__tests__/numberParser.test.ts    (227 tests)
 ✓ src/services/__tests__/parser.test.ts          (79 tests)
 ✓ src/services/__tests__/speechLayer.test.ts     (10 tests)
 ✓ src/services/__tests__/crypto.test.ts          (6 tests)
 ✓ src/services/__tests__/ledgerDb.test.ts        (5 tests)
 + scripts/testParser.ts                          (44 PRD acceptance tests)

TOTAL: 419 / 419 tests passing (100%)
```

### V8 Service Coverage Breakdown

| Service Module | % Stmts | % Branch | % Funcs | % Lines | Key Tested Capabilities |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `numberParser.ts` | **98.70%** | **92.23%** | **100.0%** | **98.70%** | 0–100 lookup, multi-lingual hundreds/thousands, irregulars, ASR spaced digits |
| `customerMatcher.ts`| **96.82%** | **82.12%** | **100.0%** | **96.82%** | Phonetic Soundex, Indic-to-Latin transliteration, Levenshtein, duplicate check |
| `crypto.ts` | **95.33%** | **92.30%** | **94.44%** | **95.33%** | AES-GCM 256, PBKDF2 200k iterations, SHA-256, PIN derivation |
| `parser.ts` | **93.56%** | **82.80%** | **100.0%** | **93.56%** | Credit/payment direction, multi-entry split, relative dates, corrections |
| `asrProvider.ts` | **100.0%** | **86.66%** | **100.0%** | **100.0%** | Serverless ASR proxy contract, Bhashini/Sarvam error handling |
| `demoDataset.ts` | **100.0%** | **100.0%** | **100.0%** | **100.0%** | 12 Pitch demo customers, 60 entries across 14 days, mixed scripts |
| `dbMigration.ts` | **86.98%** | **81.25%** | **80.00%** | **86.98%** | Migration from legacy plaintext IndexedDB to encrypted tables |
| **All Services Total** | **85.09%** | **82.28%** | **59.70%** | **85.09%** | Exceeds 80% coverage target |

---

## 2. Noisy / Code-Mixed Speech Accuracy Benchmark (`npm run accuracy`)

Tested against `/test-data/phrases.json` containing **50 noisy, code-mixed phrases** (10 per language: Hindi, English, Kannada, Tamil, Telugu, and mixed dialect) featuring ASR-style noise:
- Dropped words & split number spacing (`teen sau chalis`, `2 sau 50`)
- Fillers (`arre`, `wo`, `umm`, `like`, `matte`, `appa`, `adi`)
- Repeated words (`Ramesh Ramesh`)
- Mixed numeral scripts and romanized spellings

### Accuracy Results by Language

| Language | Sample Count | Customer Accuracy | Amount Accuracy | Type Accuracy | Overall Phrase Pass Rate |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Hindi (`hi`)** | 10 | 100.0% (10/10) | 100.0% (10/10) | 100.0% (10/10) | **10/10 (100.0%)** |
| **English (`en`)** | 10 | 100.0% (10/10) | 100.0% (10/10) | 100.0% (10/10) | **10/10 (100.0%)** |
| **Kannada (`kn`)** | 10 | 100.0% (10/10) | 100.0% (10/10) | 100.0% (10/10) | **10/10 (100.0%)** |
| **Tamil (`ta`)** | 10 | 100.0% (10/10) | 100.0% (10/10) | 100.0% (10/10) | **10/10 (100.0%)** |
| **Telugu (`te`)** | 10 | 100.0% (10/10) | 100.0% (10/10) | 100.0% (10/10) | **10/10 (100.0%)** |
| **OVERALL TOTAL** | **50** | **100.0% (50/50)** | **100.0% (50/50)** | **100.0% (50/50)** | **50/50 (100.0%)** |

> **PRD SLA Requirement:** Target $\ge 90.0\%$ accuracy  
> **Achieved Accuracy:** **100.0%** (0 failures across all 50 test cases)

---

## 3. Playwright End-to-End Acceptance Suite (`npm run test:e2e`)

Executed at mobile **360×640 viewport** with Google Chrome and mocked `SpeechRecognition`:

```text
Running 6 tests using 1 worker

  ok 1 tests/e2e.spec.ts › (a) Voice Flow: Say -> Confirm Preview -> Save in <= 2 taps (3.0s)
  ok 2 tests/e2e.spec.ts › (b) Voice Correction: Spoken correction updates pending entry in place (2.4s)
  ok 3 tests/e2e.spec.ts › (c) Balance Query: "Ramesh ka total?" opens BalanceAnswerCard (2.0s)
  ok 4 tests/e2e.spec.ts › (d) Duplicate Warning: Flags identical transaction within 10 minutes (3.8s)
  ok 5 tests/e2e.spec.ts › (e) Manual Fallback: Reachable from "Type instead" with ATM-style numeric keypad (1.6s)
  ok 6 tests/e2e.spec.ts › (f) Offline Reload: App shell boots and operates cleanly in offline mode (1.7s)

6 passed in 17.0s (100% Pass Rate)
```

### Scenario Validation Notes:
1. **(a) Say $\to$ Confirm $\to$ Save in $\le 2$ taps:** Single spoken sentence immediately opens bottom sheet preview with customer name, amount, type badge, and saves on primary action button.
2. **(b) Voice Correction:** Spoken "nahi 430" updates pending draft from ₹500 to ₹430 in place with yellow-to-green pulse animation.
3. **(c) Balance Query:** "Ramesh ka total?" activates `BalanceAnswerCard` modal displaying customer balance and recent transaction breakdown.
4. **(d) Duplicate Warning:** Identical entry within 10 minutes raises prominent duplicate warning banner with "Save anyway" override.
5. **(e) Manual Fallback:** "Type instead" opens accessible on-screen ATM keypad with quick date chips and auto-complete.
6. **(f) Offline Reload:** Offline dispatch retains interactive local capabilities with IndexedDB and PWA offline badge.

---

## 4. Performance & Latency Benchmark (`npm run benchmark`)

Benchmarked across 50 iterations under **simulated 4× CPU throttle**:

| Critical Operational Pipeline | Cold Start | p50 (Median) | p95 | Target SLA | Compliance |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Parse + Confirm Transaction**<br>*(parseTranscript $\to$ findCustomers $\to$ addEntry $\to$ getDailySummary)* | **53.7ms** | **45.7ms** | **46.7ms** | $< 2000\text{ms}$ | **PASSED** (42× faster than SLA) |
| **Balance Query Flow**<br>*(parseTranscript $\to$ findCustomerByName $\to$ getCustomerBalance $\to$ speechTemplate)* | **45.6ms** | **45.4ms** | **45.8ms** | $< 2000\text{ms}$ | **PASSED** (43× faster than SLA) |

---

## 5. Verification Commands

To reproduce the exact metrics locally:

```bash
# 1. Run PRD acceptance & Vitest unit tests with coverage
npm test

# 2. Run 5-language accuracy benchmark across 50 noisy phrases
npm run accuracy

# 3. Run Playwright E2E suite at 360x640 mobile viewport
npm run test:e2e

# 4. Run 4x CPU throttle performance benchmark
npm run benchmark

# 5. Verify production build
npm run build
```
