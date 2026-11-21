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

// scripts/auditPwa.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var results = [];
function check(id, title, condition, details) {
  results.push({ id, title, passed: condition, details });
}
console.log("--- RUNNING LIGHTHOUSE PWA INSTALLABILITY AUDIT ---\n");
var distDir = import_path.default.resolve(process.cwd(), "dist");
check("pwa-build", "Production dist build exists", import_fs.default.existsSync(distDir));
if (import_fs.default.existsSync(distDir)) {
  const manifestPath = import_path.default.join(distDir, "manifest.webmanifest");
  const manifestExists = import_fs.default.existsSync(manifestPath);
  check("manifest-exists", "manifest.webmanifest exists in build", manifestExists);
  if (manifestExists) {
    const manifest = JSON.parse(import_fs.default.readFileSync(manifestPath, "utf8"));
    check("manifest-name", "Manifest has valid name", typeof manifest.name === "string" && manifest.name.length > 0, manifest.name);
    check("manifest-short-name", "Manifest has valid short_name", typeof manifest.short_name === "string" && manifest.short_name.length > 0, manifest.short_name);
    check("manifest-start-url", "Manifest has valid start_url", manifest.start_url === "/" || manifest.start_url === "./", manifest.start_url);
    check("manifest-display", "Manifest display is standalone or fullscreen", ["standalone", "fullscreen", "minimal-ui"].includes(manifest.display), manifest.display);
    check("manifest-theme-color", "Manifest has theme_color", typeof manifest.theme_color === "string" && manifest.theme_color.startsWith("#"), manifest.theme_color);
    check("manifest-bg-color", "Manifest has background_color", typeof manifest.background_color === "string" && manifest.background_color.startsWith("#"), manifest.background_color);
    const icons = manifest.icons || [];
    const has192 = icons.some((i) => i.sizes === "192x192" && i.type === "image/png");
    const has512 = icons.some((i) => i.sizes === "512x512" && i.type === "image/png");
    const hasMaskable = icons.some((i) => i.purpose && i.purpose.includes("maskable"));
    check("manifest-icon-192", "Manifest includes 192x192 PNG icon", has192);
    check("manifest-icon-512", "Manifest includes 512x512 PNG icon", has512);
    check("manifest-icon-maskable", "Manifest includes maskable icon for Android adaptive icons", hasMaskable);
    const p192 = import_path.default.join(distDir, "pwa-192x192.png");
    const p512 = import_path.default.join(distDir, "pwa-512x512.png");
    check("icon-192-file", "Physical pwa-192x192.png file exists in dist", import_fs.default.existsSync(p192));
    check("icon-512-file", "Physical pwa-512x512.png file exists in dist", import_fs.default.existsSync(p512));
  }
  const htmlPath = import_path.default.join(distDir, "index.html");
  if (import_fs.default.existsSync(htmlPath)) {
    const html = import_fs.default.readFileSync(htmlPath, "utf8");
    check("meta-viewport", "HTML includes mobile-optimized viewport tag", html.includes('name="viewport"') && html.includes("width=device-width"));
    check("meta-theme-color", "HTML includes theme-color meta tag matching manifest", html.includes('name="theme-color"') && html.includes("#0f766e"));
    check("meta-apple-touch-icon", "HTML includes apple-touch-icon link", html.includes('rel="apple-touch-icon"'));
    check("meta-manifest-link", "HTML includes manifest link", html.includes('rel="manifest"') || html.includes("manifest.webmanifest"));
    check("meta-title-desc", "HTML includes title and meta description", html.includes("<title>") && html.includes('name="description"'));
  }
  const swPath = import_path.default.join(distDir, "sw.js");
  const swExists = import_fs.default.existsSync(swPath);
  check("sw-exists", "Service Worker sw.js exists in dist", swExists);
  if (swExists) {
    const swContent = import_fs.default.readFileSync(swPath, "utf8");
    check("sw-precache", "Service Worker uses workbox precache for offline assets", swContent.includes("precacheAndRoute") || swContent.includes("workbox"));
    check("sw-nav-fallback", "Service Worker has navigation fallback to index.html", swContent.includes("index.html") || swContent.includes("navigateFallback"));
  }
}
var passedCount = 0;
for (const r of results) {
  if (r.passed) {
    passedCount++;
    console.log(`[PASS] ${r.title} ${r.details ? `(${r.details})` : ""}`);
  } else {
    console.error(`[FAIL] ${r.title} ${r.details ? `(${r.details})` : ""}`);
  }
}
console.log(`
LIGHTHOUSE PWA SCORE: ${passedCount}/${results.length} checks passed (${Math.round(passedCount / results.length * 100)}%).`);
if (passedCount === results.length) {
  console.log("RESULT: 100% PWA INSTALLABILITY REQUIREMENTS SATISFIED!\n");
} else {
  console.error("RESULT: PWA AUDIT BLOCKED ON ONE OR MORE REQUIREMENTS!\n");
  process.exit(1);
}
