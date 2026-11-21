/**
 * Accuracy Benchmark Runner for Udhaar Sathi
 * 
 * Runs all phrases in /test-data/phrases.json through parseTranscript(),
 * evaluates accuracy on customer, amount, and transaction type,
 * outputs per-language metrics, checks PRD >= 90% SLA, and lists any failures.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseTranscript } from '../src/services/parser';
import { transliterateIndicToLatin } from '../src/services/customerMatcher';

interface PhraseTestCase {
  id: number;
  phrase?: string;
  text: string;
  language: string;
  customer?: string;
  expectedCustomer?: string;
  amount?: number;
  expectedAmount?: number;
  type?: 'credit' | 'payment';
  expectedType?: 'credit' | 'payment';
  dateOffset?: number;
  noise?: string;
}

interface TestResult {
  id: number;
  language: string;
  text: string;
  expectedCustomer: string;
  actualCustomer: string;
  customerOk: boolean;
  expectedAmount: number;
  actualAmount: number;
  amountOk: boolean;
  expectedType: string;
  actualType: string;
  typeOk: boolean;
  fullyOk: boolean;
  confidence: number;
  intent: string;
  dateOffsetExpected?: number;
  dateOffsetActual?: number;
}

function normalizeName(name: string): string {
  if (!name) return '';
  const transliterated = transliterateIndicToLatin(name);
  return transliterated
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
}

function matchCustomer(actual: string, expected: string): boolean {
  if (!expected) return true;
  if (!actual) return false;

  const normActual = normalizeName(actual);
  const normExpected = normalizeName(expected);

  if (normActual === normExpected) return true;
  if (normActual.includes(normExpected) || normExpected.includes(normActual)) return true;

  // Check individual tokens
  const actualTokens = normActual.split(/\s+/);
  const expectedTokens = normExpected.split(/\s+/);
  return expectedTokens.some(t => t.length > 2 && actualTokens.includes(t));
}

async function runAccuracy() {
  const phrasesPath = path.resolve(process.cwd(), 'test-data/phrases.json');
  if (!fs.existsSync(phrasesPath)) {
    console.error(`Error: test-data/phrases.json not found at ${phrasesPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(phrasesPath, 'utf8');
  const testCases: PhraseTestCase[] = JSON.parse(raw);

  console.log('='.repeat(70));
  console.log(`UDHAAR SATHI ACCURACY BENCHMARK (${testCases.length} NOISY/CODE-MIXED PHRASES)`);
  console.log('='.repeat(70));

  const results: TestResult[] = [];

  for (const tc of testCases) {
    const text = tc.text || tc.phrase || '';
    const res = await parseTranscript(text);

    const expCustomer = tc.expectedCustomer || tc.customer || '';
    const expAmount = tc.expectedAmount !== undefined ? tc.expectedAmount : (tc.amount ?? 0);
    const expType = tc.expectedType || tc.type || 'credit';

    const firstEntry = res.entries && res.entries.length > 0 ? res.entries[0] : null;
    const actCustomer = firstEntry?.customerName || res.queryCustomer || res.data?.customerName || '';
    const actAmount = firstEntry?.amount ?? res.correctionAmount ?? res.data?.amount ?? 0;
    const actType = firstEntry?.type || res.data?.type || (res.intent === 'query' ? 'query' : '');

    const customerOk = matchCustomer(actCustomer, expCustomer);
    const amountOk = Number(actAmount) === Number(expAmount);
    const typeOk = actType === expType;
    const fullyOk = customerOk && amountOk && typeOk;

    results.push({
      id: tc.id,
      language: tc.language || 'mixed',
      text,
      expectedCustomer: expCustomer,
      actualCustomer: actCustomer,
      customerOk,
      expectedAmount: expAmount,
      actualAmount: actAmount,
      amountOk,
      expectedType: expType,
      actualType: actType,
      typeOk,
      fullyOk,
      confidence: res.confidence,
      intent: res.intent,
      dateOffsetExpected: tc.dateOffset,
    });
  }

  // Group by language
  const byLang: Record<string, TestResult[]> = {};
  for (const r of results) {
    if (!byLang[r.language]) byLang[r.language] = [];
    byLang[r.language].push(r);
  }

  console.log('\n--- ACCURACY BREAKDOWN BY LANGUAGE ---');
  console.log(
    'Language'.padEnd(10) +
    'Count'.padStart(6) +
    'Customer'.padStart(12) +
    'Amount'.padStart(12) +
    'Type'.padStart(10) +
    'Overall Pass'.padStart(16)
  );
  console.log('-'.repeat(70));

  let totalCustomerOk = 0;
  let totalAmountOk = 0;
  let totalTypeOk = 0;
  let totalFullyOk = 0;

  for (const [lang, items] of Object.entries(byLang)) {
    const count = items.length;
    const custOk = items.filter(i => i.customerOk).length;
    const amtOk = items.filter(i => i.amountOk).length;
    const typOk = items.filter(i => i.typeOk).length;
    const fullOk = items.filter(i => i.fullyOk).length;

    totalCustomerOk += custOk;
    totalAmountOk += amtOk;
    totalTypeOk += typOk;
    totalFullyOk += fullOk;

    const custPct = ((custOk / count) * 100).toFixed(1) + '%';
    const amtPct = ((amtOk / count) * 100).toFixed(1) + '%';
    const typPct = ((typOk / count) * 100).toFixed(1) + '%';
    const fullPct = `${fullOk}/${count} (${((fullOk / count) * 100).toFixed(1)}%)`;

    console.log(
      lang.padEnd(10) +
      String(count).padStart(6) +
      custPct.padStart(12) +
      amtPct.padStart(12) +
      typPct.padStart(10) +
      fullPct.padStart(16)
    );
  }

  console.log('-'.repeat(70));
  const total = results.length;
  const overallPct = ((totalFullyOk / total) * 100).toFixed(1);
  const custTotalPct = ((totalCustomerOk / total) * 100).toFixed(1) + '%';
  const amtTotalPct = ((totalAmountOk / total) * 100).toFixed(1) + '%';
  const typTotalPct = ((totalTypeOk / total) * 100).toFixed(1) + '%';
  const fullTotalStr = `${totalFullyOk}/${total} (${overallPct}%)`;

  console.log(
    'TOTAL'.padEnd(10) +
    String(total).padStart(6) +
    custTotalPct.padStart(12) +
    amtTotalPct.padStart(12) +
    typTotalPct.padStart(10) +
    fullTotalStr.padStart(16)
  );
  console.log('='.repeat(70));

  // Failures table
  const failures = results.filter(r => !r.fullyOk);
  if (failures.length > 0) {
    console.log(`\nFAILURES TABLE (${failures.length} issues to resolve):`);
    console.log('-'.repeat(85));
    console.log(
      'ID'.padEnd(4) +
      'Lang'.padEnd(6) +
      'Text'.padEnd(36) +
      'Issues'.padEnd(20) +
      'Details'
    );
    console.log('-'.repeat(85));

    for (const f of failures) {
      const issues: string[] = [];
      if (!f.customerOk) issues.push(`Cust(exp:${f.expectedCustomer},act:${f.actualCustomer || 'NONE'})`);
      if (!f.amountOk) issues.push(`Amt(exp:${f.expectedAmount},act:${f.actualAmount})`);
      if (!f.typeOk) issues.push(`Type(exp:${f.expectedType},act:${f.actualType})`);

      const textSnippet = f.text.length > 34 ? f.text.substring(0, 31) + '...' : f.text;
      console.log(
        String(f.id).padEnd(4) +
        f.language.padEnd(6) +
        textSnippet.padEnd(36) +
        issues.join('; ').padEnd(35)
      );
    }
    console.log('-'.repeat(85));
  } else {
    console.log('\n[PERFECT] 100% accuracy! All 50 phrases parsed customer, amount, and type with zero failures.');
  }

  const passedThreshold = Number(overallPct) >= 90.0;
  console.log(`\nPRD SLA REQUIREMENT: Target >= 90.0% accuracy`);
  console.log(`ACHIEVED ACCURACY:  ${overallPct}%`);
  console.log(`STATUS:             ${passedThreshold ? 'PASSED (>= 90%)' : 'FAILED (< 90%)'}`);

  if (!passedThreshold) {
    process.exit(1);
  }
}

runAccuracy().catch(err => {
  console.error('Accuracy benchmark error:', err);
  process.exit(1);
});
