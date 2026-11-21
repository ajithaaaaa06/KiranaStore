/**
 * Serverless ASR Proxy Handler (/api/asr.ts)
 * 
 * Proxies speech recognition audio to Sarvam AI (Saarika v2) or Bhashini ULCA
 * using server-side environment variables without leaking credentials to clients.
 * 
 * Production Hardening:
 * 1. Validates HTTP method (POST only)
 * 2. Validates audio MIME type (audio/webm, audio/wav, audio/ogg, audio/mp4, audio/opus)
 * 3. Enforces 10MB maximum payload size
 * 4. Sliding-window IP rate limiter (30 requests/minute per IP)
 * 5. Strict Privacy Guarantee: NEVER logs audio chunks, binary payloads, or transcript text
 * 6. Returns uniform JSON format: { text: string, language: string }
 */

import type { IncomingMessage, ServerResponse } from 'http';

// In-memory rate-limiter: tracks request timestamps per IP
interface RateLimitRecord {
  timestamps: number[];
}
const ipRateLimits = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.RATE_LIMIT_PER_MINUTE || '30', 10);
const MAX_PAYLOAD_BYTES = 10 * 1024 * 1024; // 10 Megabytes

const ALLOWED_CONTENT_TYPES = [
  'audio/webm',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/mp4',
  'audio/mpeg',
  'audio/opus',
  'multipart/form-data',
  'application/octet-stream',
];

function maskIp(ip: string): string {
  if (!ip) return 'unknown';
  if (ip.includes('.')) {
    const parts = ip.split('.');
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.*.*` : ip;
  }
  return ip.slice(0, 8) + '::****';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  const validTimestamps = record.timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  ipRateLimits.set(ip, { timestamps: validTimestamps });

  // Periodically cleanup stale entries
  if (ipRateLimits.size > 2000) {
    for (const [key, rec] of ipRateLimits.entries()) {
      if (rec.timestamps.every(t => now - t > RATE_LIMIT_WINDOW_MS)) {
        ipRateLimits.delete(key);
      }
    }
  }

  return true;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const startTime = Date.now();
  const rawIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    '127.0.0.1';
  const maskedIp = maskIp(rawIp);

  // 1. HTTP Method Check
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed. Only POST is supported.' }));
    return;
  }

  // 2. IP Rate Limiting Check
  if (!checkRateLimit(rawIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WINDOW} requests per minute allowed.`,
      })
    );
    return;
  }

  // 3. Content-Type Check
  const contentType = (req.headers['content-type'] || '').toLowerCase();
  const isTypeValid = ALLOWED_CONTENT_TYPES.some(t => contentType.includes(t));
  if (!isTypeValid) {
    res.writeHead(415, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: `Unsupported Media Type: '${contentType}'. Expected audio format (webm, wav, ogg, mp4).`,
      })
    );
    return;
  }

  // 4. Content-Length Header Pre-check
  const contentLengthHeader = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLengthHeader > MAX_PAYLOAD_BYTES) {
    res.writeHead(413, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Payload Too Large. Audio size must not exceed 10MB.' }));
    return;
  }

  // 5. Read incoming stream buffer safely
  const chunks: Buffer[] = [];
  let totalBytes = 0;

  try {
    for await (const chunk of req) {
      totalBytes += chunk.length;
      if (totalBytes > MAX_PAYLOAD_BYTES) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload Too Large. Audio size exceeded 10MB limit.' }));
        return;
      }
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to read audio request stream.' }));
    return;
  }

  if (totalBytes === 0) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Audio payload was empty.' }));
    return;
  }

  const audioBuffer = Buffer.concat(chunks);
  const targetLanguage =
    (req.headers['x-language'] as string) ||
    (new URL(req.url || '', `http://${req.headers.host || 'localhost'}`).searchParams.get('language')) ||
    'hi-IN';

  // 6. Upstream Proxy to ASR Provider
  const sarvamKey = process.env.SARVAM_API_KEY?.trim();
  const bhashiniKey = process.env.BHASHINI_API_KEY?.trim();

  if (!sarvamKey && !bhashiniKey) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error:
          'ASR Service Unavailable: Neither SARVAM_API_KEY nor BHASHINI_API_KEY is configured in deployment environment.',
      })
    );
    return;
  }

  try {
    let transcriptText = '';
    let detectedLanguage = targetLanguage;

    // --- Provider A: Sarvam AI (Saarika v2) ---
    if (sarvamKey) {
      const formData = new FormData();
      const mime = contentType.split(';')[0].trim() || 'audio/webm';
      const fileBlob = new Blob([audioBuffer], { type: mime });
      formData.append('file', fileBlob, 'audio.webm');
      formData.append('model', 'saarika:v2');
      formData.append('language_code', targetLanguage);

      const upstreamRes = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': sarvamKey,
        },
        body: formData,
      });

      if (!upstreamRes.ok) {
        const errorDetails = await upstreamRes.text().catch(() => '');
        throw new Error(`Sarvam API returned HTTP ${upstreamRes.status}: ${errorDetails}`);
      }

      const data: any = await upstreamRes.json();
      transcriptText = data?.transcript || '';
      detectedLanguage = data?.language_code || targetLanguage;
    }
    // --- Provider B: Bhashini AI (Digital India) Fallback ---
    else if (bhashiniKey) {
      const bhashiniUserId = process.env.BHASHINI_USER_ID?.trim() || '';
      const bhashiniPipelineId = process.env.BHASHINI_PIPELINE_ID?.trim() || '';

      const payload = {
        pipelineTasks: [
          {
            taskType: 'asr',
            config: {
              language: {
                sourceLanguage: targetLanguage.split('-')[0],
              },
            },
          },
        ],
        inputData: {
          audio: [
            {
              audioContent: audioBuffer.toString('base64'),
            },
          ],
        },
      };

      const upstreamRes = await fetch(
        'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: bhashiniKey,
            ...(bhashiniUserId && { 'ulca-user-id': bhashiniUserId }),
            ...(bhashiniPipelineId && { 'ulca-pipeline-id': bhashiniPipelineId }),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!upstreamRes.ok) {
        throw new Error(`Bhashini API returned HTTP ${upstreamRes.status}`);
      }

      const data: any = await upstreamRes.json();
      transcriptText =
        data?.pipelineResponse?.[0]?.output?.[0]?.source ||
        data?.output?.[0]?.source ||
        '';
    }

    const durationMs = Date.now() - startTime;
    // Privacy compliant log: only metadata, NO audio, NO transcript
    console.log(
      `[ASR Proxy] IP: ${maskedIp} | Size: ${audioBuffer.length}B | Status: 200 | Time: ${durationMs}ms`
    );

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    });
    res.end(
      JSON.stringify({
        text: transcriptText,
        language: detectedLanguage,
      })
    );
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    // Operational error log without leaking sensitive payload
    console.error(
      `[ASR Proxy Error] IP: ${maskedIp} | Size: ${audioBuffer.length}B | Time: ${durationMs}ms | Message: ${error?.message || 'Upstream error'}`
    );

    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: 'Upstream ASR service temporarily unavailable.',
      })
    );
  }
}
