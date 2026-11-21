/**
 * Live Transcript Banner Component
 * Placed immediately above the Hero Mic.
 * Updates in real time as interim speech results arrive.
 * Shows graceful fallback messages when unsupported or permission denied.
 */

import React from 'react';
import { Sparkles, X, Volume2, AlertCircle, Keyboard } from 'lucide-react';
import { ParsedEntry } from '../services/types';
import { Amount } from './ui/Amount';
import { Badge } from './ui/Badge';

interface LiveTranscriptBannerProps {
  transcript: string;
  interimTranscript: string;
  parsedEntry?: ParsedEntry | null;
  isListening: boolean;
  isProcessing: boolean;
  errorMessage?: string | null;
  onClear: () => void;
  onOpenManualEntry?: () => void;
}

export const LiveTranscriptBanner: React.FC<LiveTranscriptBannerProps> = ({
  transcript,
  interimTranscript,
  parsedEntry,
  isListening,
  isProcessing,
  errorMessage,
  onClear,
  onOpenManualEntry,
}) => {
  const currentText = interimTranscript || transcript;

  // If there's an error and no text, show error banner with immediate 1-tap manual fallback
  if (errorMessage && !currentText) {
    return (
      <div className="px-3.5 py-1.5 max-w-md mx-auto w-full animate-slide-up">
        <div className="bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-700/60 rounded-2xl p-3.5 flex flex-col gap-2.5 text-red-900 dark:text-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <p className="text-sm font-bold leading-snug">{errorMessage}</p>
          </div>
          {onOpenManualEntry && (
            <button
              onClick={onOpenManualEntry}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm min-h-touch transition-transform active:scale-95 shadow-md"
            >
              <Keyboard className="w-5 h-5" />
              <span>Likh kar darj karein (Type instead)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // If listening but no words heard yet
  if (isListening && !currentText) {
    return (
      <div className="px-3.5 py-1.5 max-w-md mx-auto w-full animate-fade-in">
        <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-700/50 rounded-2xl p-3 text-center">
          <p className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span>Sun rahe hain... Apni bhasha me bolein</span>
          </p>
        </div>
      </div>
    );
  }

  // If no text to show, don't render empty container
  if (!currentText && !parsedEntry) return null;

  return (
    <div className="px-3.5 py-1.5 max-w-md mx-auto w-full animate-slide-up">
      <div className="bg-white dark:bg-slate-900 border-2 border-primary/40 dark:border-primary/50 rounded-2xl p-3.5 shadow-md relative overflow-hidden">
        {/* Top Label & Clear */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-400 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" />
            {isListening ? 'Streaming Speech...' : isProcessing ? 'Processing Speech...' : 'Heard Voice'}
          </span>
          <button
            onClick={onClear}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
            aria-label="Clear transcript"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Spoken Transcript (>= 18px font size) */}
        <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
          &ldquo;{currentText}&rdquo;
          {interimTranscript && (
            <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse" />
          )}
        </p>

        {/* Live Parsed Tags Preview if available */}
        {parsedEntry && typeof parsedEntry.amount === 'number' && parsedEntry.amount > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{parsedEntry.customerName || 'Grahak'}</Badge>
            <Amount value={parsedEntry.amount} type={parsedEntry.type || 'credit'} size="sm" />
            <Badge variant={parsedEntry.type === 'credit' ? 'credit' : 'payment'}>
              {parsedEntry.type === 'credit' ? 'Udhaar Diya' : 'Jama Mila'}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
export default LiveTranscriptBanner;
