/**
 * Disambiguation Sheet Component (/components/DisambiguationSheet.tsx)
 * 
 * F16: Spoken Customer Disambiguation by Last 4 Digits & Tap Fallback:
 * - Speaks: "Kaun sa Ramesh? Number ke aakhri chaar ank bataiye."
 * - Opens mic automatically to listen for:
 *   1. Last 4 digits (in any of 5 languages, native or latin, digit-by-digit or multipliers)
 *   2. Fuller name ("Ramesh Gowda") or surname / distinctive token ("Gowda", "Kumar", "Plumber")
 *   3. Ordinals ("pehla", "doosra", "first", "second", Kannada, Tamil, Telugu)
 * - Highlights candidates on large cards:
 *   - Full name, masked phone with last 4 digits highlighted (••••••2345), balance, last activity
 *   - Customers with no phone show "No number saved" chip
 * - Fallbacks:
 *   - Wrong digits: says once "Ye number nahi mila, phir se bataiye", then falls back to tapping only
 *   - Two candidates with identical last 4 digits: asks for last 6 digits, then full number
 *   - Silence/noise: retries once, then leaves cards on screen for tapping
 *   - Tapping any card selects that customer immediately
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Customer } from '../services/types';
import { useI18n } from '../i18n/I18nContext';
import { useSpeak } from '../hooks/useSpeak';
import { speechTemplates } from '../i18n/speech';
import { resolveDisambiguationChoice } from '../services/customerMatcher';
import { lastDigits } from '../services/phoneParser';
import { formatRupees, formatRelativeDate } from '../lib/formatters';
import {
  Users,
  Mic,
  MicOff,
  X,
  AlertCircle,
  Clock,
  ArrowRight,
  Volume2,
} from 'lucide-react';

export interface DisambiguationSheetProps {
  isOpen: boolean;
  spokenName: string;
  candidates: Customer[];
  onSelect: (customer: Customer) => void;
  onCancel: () => void;
}

export const DisambiguationSheet: React.FC<DisambiguationSheetProps> = ({
  isOpen,
  spokenName,
  candidates,
  onSelect,
  onCancel,
}) => {
  const { language, t, currentLangConfig } = useI18n();
  const { speak, isSpeaking } = useSpeak();

  const [digitsNeeded, setDigitsNeeded] = useState<number>(4);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);
  const hasSpokenPromptRef = useRef<boolean>(false);

  // Stop Web Speech listening
  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
  }, []);

  // Handle customer chosen (via speech or tap)
  const handleSelectCustomer = useCallback(
    (customer: Customer) => {
      stopListening();
      // Confirm selection aloud: "Ramesh Gowda, theek hai"
      const confirmText =
        speechTemplates[language]?.confirmDisambiguationChoice(customer.name) ||
        `${customer.name}, theek hai`;
      speak(confirmText, { locale: currentLangConfig.speechLocale });
      onSelect(customer);
    },
    [language, currentLangConfig.speechLocale, speak, onSelect, stopListening]
  );

  // Start speech recognition listening
  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in browser');
      return;
    }

    stopListening();

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 5;
      recognition.lang = currentLangConfig.speechLocale || 'hi-IN';

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        setStatusMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i][0];
          if (event.results[i].isFinal) {
            final += item.transcript + ' ';
          } else {
            interim += item.transcript + ' ';
          }
        }

        const candidateText = (final || interim).trim();
        setInterimTranscript(candidateText);

        if (final.trim()) {
          processTranscript(final.trim());
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Disambiguation speech error:', err);
        setIsListening(false);
        isListeningRef.current = false;
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Failed to start SpeechRecognition:', e);
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, [currentLangConfig.speechLocale, stopListening]);

  // Process transcript to resolve disambiguation choice
  const processTranscript = useCallback(
    (transcript: string) => {
      const clean = transcript.trim();
      if (!clean) return;

      const resolution = resolveDisambiguationChoice(
        clean,
        candidates,
        language,
        digitsNeeded
      );

      if (resolution.status === 'matched') {
        handleSelectCustomer(resolution.customer);
        return;
      }

      if (resolution.status === 'need_more_digits') {
        setDigitsNeeded(resolution.digitsNeeded);
        const moreDigitsPrompt =
          speechTemplates[language]?.askDisambiguationMoreDigits(
            spokenName,
            resolution.digitsNeeded
          ) ||
          `Dono ke aakhri 4 ank same hain. Kripya aakhri ${resolution.digitsNeeded} ank bataiye.`;
        setStatusMessage(moreDigitsPrompt);
        speak(moreDigitsPrompt, { locale: currentLangConfig.speechLocale });
        // Re-listen with next digits
        setTimeout(() => {
          startListening();
        }, 1200);
        return;
      }

      if (resolution.status === 'no_match') {
        if (retryCount === 0) {
          setRetryCount(1);
          const retryPrompt =
            speechTemplates[language]?.disambiguationNotFoundRetry ||
            'Ye number nahi mila, phir se bataiye.';
          setStatusMessage(retryPrompt);
          speak(retryPrompt, { locale: currentLangConfig.speechLocale });
          setTimeout(() => {
            startListening();
          }, 1200);
        } else {
          // After 1 retry, stop listening and leave cards on screen for tapping
          stopListening();
          setStatusMessage(
            t('disambiguateRetryToast') ||
              'Ye number nahi mila. Kripya card par tap karein.'
          );
        }
        return;
      }
    },
    [
      candidates,
      language,
      digitsNeeded,
      retryCount,
      spokenName,
      currentLangConfig.speechLocale,
      speak,
      t,
      handleSelectCustomer,
      startListening,
      stopListening,
    ]
  );

  // On sheet open: speak question and start listening
  useEffect(() => {
    if (isOpen) {
      setDigitsNeeded(4);
      setRetryCount(0);
      setStatusMessage(null);
      setInterimTranscript('');
      hasSpokenPromptRef.current = false;

      // Speak prompt: "Kaun sa Ramesh? Number ke aakhri chaar ank bataiye."
      const question =
        speechTemplates[language]?.askDisambiguationDigits(spokenName) ||
        `Kaun sa ${spokenName}? Number ke aakhri chaar ank bataiye.`;

      speak(question, { locale: currentLangConfig.speechLocale });
      hasSpokenPromptRef.current = true;

      // Open mic automatically (delayed slightly to prevent TTS loopback)
      const micTimer = setTimeout(() => {
        startListening();
      }, 900);

      return () => {
        clearTimeout(micTimer);
        stopListening();
      };
    } else {
      stopListening();
    }
  }, [isOpen, spokenName, language, currentLangConfig.speechLocale, speak, startListening, stopListening]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-testid="disambiguation-dialog"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('whichCustomerTitle', { name: spokenName }) || `Kaun sa ${spokenName}?`}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t('tellLast4DigitsSubtitle') || 'Number ke aakhri 4 ank bataiye ya card tap karein'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopListening();
              onCancel();
            }}
            aria-label="Close"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Cards List */}
        <div className="px-5 py-4 overflow-y-auto space-y-3 max-h-[50vh]">
          {candidates.map((cust, idx) => {
            const hasPhone = Boolean(cust.phone);
            const phoneSuffix = hasPhone ? lastDigits(cust.phone!, digitsNeeded) : null;
            const balanceOwed = cust.balance > 0;
            const balanceAdvance = cust.balance < 0;

            return (
              <button
                key={cust.id}
                type="button"
                data-testid={`candidate-card-${idx}`}
                onClick={() => handleSelectCustomer(cust)}
                className="w-full text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-500 rounded-2xl p-4 transition-all shadow-sm active:scale-[0.98] flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-[11px] font-black text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-base font-black text-slate-900 dark:text-white truncate">
                      {cust.name}
                    </h4>
                  </div>

                  {/* Masked Phone Number & Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {hasPhone ? (
                      <span className="inline-flex items-center font-mono text-xs font-bold tracking-wider text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                        ••••••
                        <span className="text-teal-600 dark:text-teal-400 font-black">
                          {phoneSuffix}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <AlertCircle className="w-3 h-3" />
                        {t('noNumberSavedChip') || 'No number saved'}
                      </span>
                    )}

                    {/* Balance */}
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        balanceOwed
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : balanceAdvance
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-200/60 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {balanceOwed
                        ? `${t('credit')} ${formatRupees(cust.balance)}`
                        : balanceAdvance
                        ? `${t('advancePayment')} ${formatRupees(Math.abs(cust.balance))}`
                        : `${t('allSettled')} ₹0`}
                    </span>
                  </div>

                  {/* Last Activity / Notes */}
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 pt-0.5 truncate">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>
                      {cust.lastTransactionDate
                        ? `${t('active')} ${formatRelativeDate(cust.lastTransactionDate, { lang: language })}`
                        : cust.notes || t('noRecentActivity')}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Status & Audio Feedback Banner */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-2">
          {statusMessage ? (
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 text-center animate-in fade-in">
              {statusMessage}
            </p>
          ) : isListening ? (
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 animate-pulse">
              <Mic className="w-4 h-4" />
              <span>
                {interimTranscript
                  ? `"${interimTranscript}"`
                  : t('listeningDigitsPrompt')}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <MicOff className="w-3.5 h-3.5" />
              <span>{t('tapCardOrMic')}</span>
            </div>
          )}

          {/* Controls: Big Mic Button & Quick Hint Chips */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              data-testid="disambiguation-mic-button"
              aria-label="Speak digits or name"
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white ring-4 ring-rose-500/20 animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Hint Chips */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 text-[11px] font-semibold text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-400">{t('trySpeaking')}</span>
            {candidates.slice(0, 3).map((c, i) => (
              <span
                key={c.id}
                className="bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300"
              >
                {c.phone ? `•••• ${lastDigits(c.phone, 4)}` : `"${i === 0 ? t('first') : t('second')}"`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisambiguationSheet;
