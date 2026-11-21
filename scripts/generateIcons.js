/**
 * Zero-dependency PNG and SVG icon generator for Udhaar Sathi PWA
 * Uses Node.js built-in zlib and crc32 calculation to generate 100% standard PNG files.
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Simple CRC32 implementation
function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makePngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function generatePng(size) {
  // RGBA buffer
  const width = size;
  const height = size;
  const rawData = Buffer.alloc(height * (1 + width * 4));

  const center = size / 2;
  const cornerRadius = size * 0.22;
  const safeMargin = size * 0.1;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Distance from edges for rounded rectangle
      const dx = Math.max(0, Math.abs(x - center) - (center - cornerRadius - safeMargin));
      const dy = Math.max(0, Math.abs(y - center) - (center - cornerRadius - safeMargin));
      const distFromCorner = Math.sqrt(dx * dx + dy * dy);

      if (distFromCorner > cornerRadius) {
        // Transparent outside
        rawData[pixelOffset] = 0;
        rawData[pixelOffset + 1] = 0;
        rawData[pixelOffset + 2] = 0;
        rawData[pixelOffset + 3] = 0;
      } else {
        // Gradient Teal Background (#0f766e to #042f2e)
        const t = y / height;
        let r = Math.round(15 * (1 - t) + 4 * t);
        let g = Math.round(118 * (1 - t) + 47 * t);
        let b = Math.round(110 * (1 - t) + 46 * t);

        // Center mic circle & rupee highlight
        const distFromCenter = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
        const radiusMic = size * 0.26;

        if (distFromCenter < radiusMic) {
          // Inner glowing circle (#14b8a6)
          const ringT = distFromCenter / radiusMic;
          if (distFromCenter > radiusMic * 0.85) {
            // Gold/Amber outer accent ring (#f59e0b)
            r = 245; g = 158; b = 11;
          } else {
            // Teal glow
            r = Math.round(20 + 200 * (1 - ringT));
            g = Math.round(184 + 60 * (1 - ringT));
            b = Math.round(166 + 60 * (1 - ringT));
          }
        }

        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = 255;
      }
    }
  }

  // Header chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrChunk = makePngChunk('IHDR', ihdr);
  const idatChunk = makePngChunk('IDAT', zlib.deflateSync(rawData));
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// SVG Source
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#042f2e" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#0d9488" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Base Rounded Card -->
  <rect x="24" y="24" width="464" height="464" rx="104" fill="url(#bgGrad)" filter="url(#glow)" />
  <rect x="24" y="24" width="464" height="464" rx="104" fill="none" stroke="#2dd4bf" stroke-width="4" stroke-opacity="0.4" />

  <!-- Center Halo -->
  <circle cx="256" cy="256" r="148" fill="url(#accentGrad)" opacity="0.25" />
  <circle cx="256" cy="256" r="124" fill="#0f766e" stroke="#fbbf24" stroke-width="6" stroke-dasharray="12 8" />

  <!-- Indian Rupee Symbol -->
  <text x="256" y="245" font-family="'Noto Sans', sans-serif" font-size="140" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">₹</text>

  <!-- Microphone / Soundwave Base -->
  <path d="M 216 330 C 216 352, 296 352, 296 330" fill="none" stroke="#fbbf24" stroke-width="8" stroke-linecap="round" />
  <line x1="256" y1="345" x2="256" y2="375" stroke="#fbbf24" stroke-width="8" stroke-linecap="round" />
  <line x1="230" y1="375" x2="282" y2="375" stroke="#fbbf24" stroke-width="8" stroke-linecap="round" />

  <!-- Sound Waves (Left & Right) -->
  <path d="M 170 230 A 40 40 0 0 0 170 282" fill="none" stroke="#2dd4bf" stroke-width="7" stroke-linecap="round" />
  <path d="M 146 210 A 70 70 0 0 0 146 302" fill="none" stroke="#5eead4" stroke-width="6" stroke-linecap="round" opacity="0.7" />

  <path d="M 342 230 A 40 40 0 0 1 342 282" fill="none" stroke="#2dd4bf" stroke-width="7" stroke-linecap="round" />
  <path d="M 366 210 A 70 70 0 0 1 366 302" fill="none" stroke="#5eead4" stroke-width="6" stroke-linecap="round" opacity="0.7" />
</svg>`;

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write SVG icons
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

// Write 192x192 and 512x512 PNGs
const png192 = generatePng(192);
const png512 = generatePng(512);

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png192);

console.log('Successfully generated SVG, favicon, and PNG PWA icons in /public:');
console.log(' - public/icon.svg');
console.log(' - public/favicon.svg');
console.log(' - public/pwa-192x192.png (' + png192.length + ' bytes)');
console.log(' - public/pwa-512x512.png (' + png512.length + ' bytes)');
