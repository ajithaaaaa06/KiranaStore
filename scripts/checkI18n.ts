import fs from 'fs';
import path from 'path';

const localesDir = path.resolve(__dirname, '../src/i18n/locales');
const languages = ['en', 'hi', 'kn', 'ta', 'te', 'hinglish'] as const;

const devanagariRegex = /[\u0900-\u097F]/;

let hasErrors = false;

// 1. Load all dictionaries
const dicts: Record<string, Record<string, string>> = {};
for (const lang of languages) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] Missing dictionary file: ${filePath}`);
    process.exit(1);
  }
  dicts[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// 2. Compute union of all keys
const allKeys = new Set<string>();
for (const lang of languages) {
  for (const key of Object.keys(dicts[lang])) {
    allKeys.add(key);
  }
}

console.log(`Auditing i18n across ${languages.length} languages (${allKeys.size} total keys)...`);

// 3. Check for missing keys in every dictionary
for (const lang of languages) {
  const missing: string[] = [];
  for (const key of allKeys) {
    if (dicts[lang][key] === undefined) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    console.error(`[FAIL] Language '${lang}' is missing ${missing.length} keys:`, missing);
    hasErrors = true;
  } else {
    console.log(`[PASS] Language '${lang}' has all ${allKeys.size} keys.`);
  }
}

// 4. Check that non-Hindi dictionaries contain NO Devanagari characters
for (const lang of languages) {
  if (lang === 'hi') continue;
  const devanagariEntries: { key: string; val: string }[] = [];
  for (const [key, val] of Object.entries(dicts[lang])) {
    if (devanagariRegex.test(val)) {
      devanagariEntries.push({ key, val });
    }
  }
  if (devanagariEntries.length > 0) {
    console.error(
      `[FAIL] Language '${lang}' contains ${devanagariEntries.length} Devanagari entries:`,
      devanagariEntries
    );
    hasErrors = true;
  } else {
    console.log(`[PASS] Language '${lang}' has zero Devanagari characters.`);
  }
}

if (hasErrors) {
  console.error('\n[FAILED] i18n check failed. Please resolve the errors above.');
  process.exit(1);
} else {
  console.log('\n[SUCCESS] All i18n dictionaries are complete and strictly validated!');
  process.exit(0);
}
