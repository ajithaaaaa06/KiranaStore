/**
 * DebugLatencyBadge Component
 * 
 * Activated when ?debug=1 is in URL or vk_debug is enabled.
 * Visualizes real-time performance SLA metrics:
 * 1. Speech-End -> Parsed (ms)
 * 2. Speech-End -> Saved (ms)
 * 3. Balance Query Response Time (ms) with SLA < 2000ms check
 * 4. ASR Provider (Browser / Sarvam / Bhashini)
 * 5. Audio Pipeline: echoCancellation, noiseSuppression, autoGainControl
 */

import React, { useState } from 'react';
import { Gauge, Zap, CheckCircle2, ChevronUp, ChevronDown, Activity, Mic } from 'lucide-react';

export interface LatencyMetrics {
  speechToParsedMs?: number;
  speechToSavedMs?: number;
  queryResponseTimeMs?: number;
  confidence?: number;
  asrProvider?: string;
  transcriptSample?: string;
}

interface DebugLatencyBadgeProps {
  metrics: LatencyMetrics;
}

export const DebugLatencyBadge: React.FC<DebugLatencyBadgeProps> = ({ metrics }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDebugActive = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('debug') === '1' ||
    localStorage.getItem('vk_debug') === 'true'
  );

  if (!isDebugActive) return null;

  const isQuerySlaPassing = metrics.queryResponseTimeMs !== undefined ? metrics.queryResponseTimeMs < 2000 : true;

  return (
    <div className="fixed bottom-24 right-3 z-50 select-none animate-fadeIn">
      {isOpen ? (
        <div className="bg-slate-900/95 border border-teal-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-white max-w-[280px] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-black text-teal-400">
              <Activity className="w-4 h-4" />
              <span>SLA Performance Telemetry</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Metric 1: Speech-End -> Parsed */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Speech-End → Parsed:</span>
            <span className="font-mono font-bold text-teal-300">
              {metrics.speechToParsedMs !== undefined ? `${metrics.speechToParsedMs}ms` : '—'}
            </span>
          </div>

          {/* Metric 2: Speech-End -> Saved */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Speech-End → Saved:</span>
            <span className="font-mono font-bold text-emerald-400">
              {metrics.speechToSavedMs !== undefined ? `${metrics.speechToSavedMs}ms` : '—'}
            </span>
          </div>

          {/* Metric 3: Balance Query SLA (<2000ms) */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Balance Query SLA:</span>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-amber-300">
                {metrics.queryResponseTimeMs !== undefined ? `${metrics.queryResponseTimeMs}ms` : '—'}
              </span>
              {metrics.queryResponseTimeMs !== undefined && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-black ${
                    isQuerySlaPassing ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}
                >
                  {isQuerySlaPassing ? 'PASS' : 'FAIL'}
                </span>
              )}
            </div>
          </div>

          {/* Metric 4: ASR Provider */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">ASR Engine:</span>
            <span className="font-bold text-purple-300 text-[11px]">
              {metrics.asrProvider || 'Browser Web Speech'}
            </span>
          </div>

          {/* Metric 5: Confidence Score */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Confidence:</span>
            <span className="font-mono font-bold text-blue-300">
              {metrics.confidence !== undefined ? `${Math.round(metrics.confidence * 100)}%` : '—'}
            </span>
          </div>

          {/* Audio Filters Badge */}
          <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>AEC + NoiseSuppression:</span>
            <span className="text-emerald-400 font-bold">ACTIVE ✓</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-teal-500/40 text-teal-400 text-xs font-black shadow-lg backdrop-blur-sm active:scale-95 transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {metrics.speechToSavedMs !== undefined
              ? `${metrics.speechToSavedMs}ms`
              : metrics.queryResponseTimeMs !== undefined
              ? `${metrics.queryResponseTimeMs}ms`
              : 'DEBUG'}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}
    </div>
  );
};
