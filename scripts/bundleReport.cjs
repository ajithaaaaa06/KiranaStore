"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/bundleReport.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var zlib = __toESM(require("zlib"), 1);
function formatKb(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}
function runBundleReport() {
  const distDir = path.resolve(process.cwd(), "dist");
  const assetsDir = path.join(distDir, "assets");
  if (!fs.existsSync(assetsDir)) {
    console.error("Error: dist/assets not found. Run npm run build first.");
    process.exit(1);
  }
  const indexHtmlPath = path.join(distDir, "index.html");
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
  const initialScripts = /* @__PURE__ */ new Set();
  const scriptRegex = /src=["']\/assets\/([^"']+\.js)["']/g;
  let match;
  while ((match = scriptRegex.exec(indexHtml)) !== null) {
    initialScripts.add(match[1]);
  }
  const preloadRegex = /href=["']\/assets\/([^"']+\.js)["']/g;
  while ((match = preloadRegex.exec(indexHtml)) !== null) {
    initialScripts.add(match[1]);
  }
  const files = fs.readdirSync(assetsDir).filter((f) => !f.endsWith(".gz") && !f.endsWith(".br"));
  const metrics = [];
  for (const file of files) {
    const fullPath = path.join(assetsDir, file);
    const content = fs.readFileSync(fullPath);
    const gzipped = zlib.gzipSync(content, { level: 9 });
    const brotlied = zlib.brotliCompressSync(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      }
    });
    fs.writeFileSync(fullPath + ".gz", gzipped);
    fs.writeFileSync(fullPath + ".br", brotlied);
    const isInitial = initialScripts.has(file);
    metrics.push({
      name: file,
      isInitialHomeRoute: isInitial,
      rawBytes: content.length,
      gzipBytes: gzipped.length,
      brotliBytes: brotlied.length
    });
  }
  metrics.sort((a, b) => {
    if (a.isInitialHomeRoute !== b.isInitialHomeRoute) {
      return a.isInitialHomeRoute ? -1 : 1;
    }
    return b.gzipBytes - a.gzipBytes;
  });
  console.log("=".repeat(86));
  console.log("UDHAAR SATHI PRODUCTION BUNDLE & CODE-SPLITTING AUDIT");
  console.log("=".repeat(86));
  console.log(
    "Asset Chunk".padEnd(38) + "Type".padEnd(12) + "Raw Size".padStart(11) + "Gzip".padStart(12) + "Brotli".padStart(12)
  );
  console.log("-".repeat(86));
  let totalHomeJsRaw = 0;
  let totalHomeJsGzip = 0;
  let totalHomeJsBrotli = 0;
  for (const m of metrics) {
    const typeLabel = m.isInitialHomeRoute ? "Home Initial" : "Lazy Split";
    if (m.isInitialHomeRoute && m.name.endsWith(".js")) {
      totalHomeJsRaw += m.rawBytes;
      totalHomeJsGzip += m.gzipBytes;
      totalHomeJsBrotli += m.brotliBytes;
    }
    console.log(
      m.name.padEnd(38) + typeLabel.padEnd(12) + formatKb(m.rawBytes).padStart(11) + formatKb(m.gzipBytes).padStart(12) + formatKb(m.brotliBytes).padStart(12)
    );
  }
  console.log("=".repeat(86));
  console.log("\n--- HOME ROUTE INITIAL JAVASCRIPT BUDGET AUDIT ---");
  console.log(`Raw Home JS:        ${formatKb(totalHomeJsRaw)}`);
  console.log(`Gzip Home JS:       ${formatKb(totalHomeJsGzip)}`);
  console.log(`Brotli Home JS:     ${formatKb(totalHomeJsBrotli)}`);
  console.log(`Budget Limit:       150.00 KB Gzip`);
  const budgetBytes = 150 * 1024;
  const isWithinBudget = totalHomeJsGzip <= budgetBytes;
  const marginKb = ((budgetBytes - totalHomeJsGzip) / 1024).toFixed(2);
  console.log(`Budget Status:      ${isWithinBudget ? `PASSED (${marginKb} KB headroom under 150KB limit)` : "FAILED"}`);
  console.log("=".repeat(86));
  if (!isWithinBudget) {
    console.error(`ERROR: Home route JS exceeds 150KB gzipped budget!`);
    process.exit(1);
  }
}
runBundleReport();
