/**
 * Bundle Size and Compression Audit for Voice Khata
 * 
 * Analyzes production dist/ output:
 * 1. Pre-compresses assets to Gzip (.gz) and Brotli (.br)
 * 2. Identifies all chunks loaded on the initial Home Route
 * 3. Enforces the PRD budget: Home-route JS < 150KB gzipped
 * 4. Prints full code-splitting and compression audit table
 */

import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

interface AssetMetric {
  name: string;
  isInitialHomeRoute: boolean;
  rawBytes: number;
  gzipBytes: number;
  brotliBytes: number;
}

function formatKb(bytes: number): string {
  return (bytes / 1024).toFixed(2) + ' KB';
}

function runBundleReport() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const assetsDir = path.join(distDir, 'assets');

  if (!fs.existsSync(assetsDir)) {
    console.error('Error: dist/assets not found. Run npm run build first.');
    process.exit(1);
  }

  // Parse dist/index.html to find exact initial home-route JS files
  const indexHtmlPath = path.join(distDir, 'index.html');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  const initialScripts = new Set<string>();
  const scriptRegex = /src=["']\/assets\/([^"']+\.js)["']/g;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(indexHtml)) !== null) {
    initialScripts.add(match[1]);
  }
  const preloadRegex = /href=["']\/assets\/([^"']+\.js)["']/g;
  while ((match = preloadRegex.exec(indexHtml)) !== null) {
    initialScripts.add(match[1]);
  }

  const files = fs.readdirSync(assetsDir).filter(f => !f.endsWith('.gz') && !f.endsWith('.br'));
  const metrics: AssetMetric[] = [];

  for (const file of files) {
    const fullPath = path.join(assetsDir, file);
    const content = fs.readFileSync(fullPath);

    // Compute Gzip & Brotli
    const gzipped = zlib.gzipSync(content, { level: 9 });
    const brotlied = zlib.brotliCompressSync(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    });

    // Write pre-compressed files to dist/assets for CDN zero-cost serving
    fs.writeFileSync(fullPath + '.gz', gzipped);
    fs.writeFileSync(fullPath + '.br', brotlied);

    const isInitial = initialScripts.has(file);

    metrics.push({
      name: file,
      isInitialHomeRoute: isInitial,
      rawBytes: content.length,
      gzipBytes: gzipped.length,
      brotliBytes: brotlied.length,
    });
  }

  // Sort: Initial home-route first, then by gzip size descending
  metrics.sort((a, b) => {
    if (a.isInitialHomeRoute !== b.isInitialHomeRoute) {
      return a.isInitialHomeRoute ? -1 : 1;
    }
    return b.gzipBytes - a.gzipBytes;
  });

  console.log('='.repeat(86));
  console.log('VOICE KHATA PRODUCTION BUNDLE & CODE-SPLITTING AUDIT');
  console.log('='.repeat(86));
  console.log(
    'Asset Chunk'.padEnd(38) +
    'Type'.padEnd(12) +
    'Raw Size'.padStart(11) +
    'Gzip'.padStart(12) +
    'Brotli'.padStart(12)
  );
  console.log('-'.repeat(86));

  let totalHomeJsRaw = 0;
  let totalHomeJsGzip = 0;
  let totalHomeJsBrotli = 0;

  for (const m of metrics) {
    const typeLabel = m.isInitialHomeRoute ? 'Home Initial' : 'Lazy Split';
    if (m.isInitialHomeRoute && m.name.endsWith('.js')) {
      totalHomeJsRaw += m.rawBytes;
      totalHomeJsGzip += m.gzipBytes;
      totalHomeJsBrotli += m.brotliBytes;
    }

    console.log(
      m.name.padEnd(38) +
      typeLabel.padEnd(12) +
      formatKb(m.rawBytes).padStart(11) +
      formatKb(m.gzipBytes).padStart(12) +
      formatKb(m.brotliBytes).padStart(12)
    );
  }

  console.log('='.repeat(86));
  console.log('\n--- HOME ROUTE INITIAL JAVASCRIPT BUDGET AUDIT ---');
  console.log(`Raw Home JS:        ${formatKb(totalHomeJsRaw)}`);
  console.log(`Gzip Home JS:       ${formatKb(totalHomeJsGzip)}`);
  console.log(`Brotli Home JS:     ${formatKb(totalHomeJsBrotli)}`);
  console.log(`Budget Limit:       150.00 KB Gzip`);

  const budgetBytes = 150 * 1024;
  const isWithinBudget = totalHomeJsGzip <= budgetBytes;
  const marginKb = ((budgetBytes - totalHomeJsGzip) / 1024).toFixed(2);

  console.log(`Budget Status:      ${isWithinBudget ? `PASSED (${marginKb} KB headroom under 150KB limit)` : 'FAILED'}`);
  console.log('='.repeat(86));

  if (!isWithinBudget) {
    console.error(`ERROR: Home route JS exceeds 150KB gzipped budget!`);
    process.exit(1);
  }
}

runBundleReport();
