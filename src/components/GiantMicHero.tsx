/**
 * Centered Giant Circular Mic Hero Component
 * - Diameter: 132px (≥ 120px required by specification)
 * - 4 States: 'idle' | 'listening' | 'processing' | 'error'
 * - Real-time animated waveform bars driven by Web Audio AnalyserNode volume
 * - 5 Language Chips: हिं | EN | ಕನ್ನಡ | தமிழ் | తెలుగు (persists in localStorage)
 * - "Type instead" button opening manual entry bottom sheet
 * - Demo Hint Chips: "Ramesh ko 500 udhaar diya", "Suresh ne 200 diye", "Ramesh ka total?"
 * - Haptic feedback on tap
 */

import React from 'react';
import { Mic, Loader2, AlertCircle, Keyboard, Sparkles, RefreshCw } from 'lucide-react';
import { SpeechState } from '../hooks/useSpeechRecognition';
import { LanguageCode } from '../services/types';
import { useI18n } from '../i18n/I18nContext';

interface GiantMicHeroProps {
  speechState: SpeechState;
  audioLevels: number[];
  errorMessage: string | null;
  onStartListening: () => void;
  onStopListening: () => void;
  onSimulateVoice: (phrase: string) => void;
  onOpenManualEntry: () => void;
  isOffline?: boolean;
}

export const GiantMicHero: React.FC<GiantMicHeroProps> = ({
  speechState,
  audioLevels,
  errorMessage,
  onStartListening,
  onStopListening,
  onSimulateVoice,
  onOpenManualEntry,
  isOffline = false,
}) => {
  const { language, setLanguage, t } = useI18n();

  // 5 Speech Languages chips: हिं (in Hindi) / HI (in other langs) / EN / ಕನ್ನಡ / தமிழ் / తెలుగు
  const languageChips: { code: LanguageCode; label: string; sub: string }[] = [
    { code: 'hi', label: language === 'hi' ? 'हिं' : 'HI', sub: 'Hindi' },
    { code: 'en', label: 'EN', sub: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ', sub: 'Kannada' },
    { code: 'ta', label: 'தமிழ்', sub: 'Tamil' },
    { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
  ];

  // Localized hint phrases for speech testing
  const hintPhrases = [
    t('hintPhrase1'),
    t('hintPhrase2'),
    t('hintPhrase3'),
  ];

  const isListening = speechState === 'listening';
  const isProcessing = speechState === 'processing';
  const isError = speechState === 'error';

  return (
    <section className="px-3.5 py-2 max-w-md mx-auto w-full flex flex-col items-center">
      {/* 1. Language Selector: Row of 5 Chips above the mic */}
      <div className="w-full mb-3">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('language')}
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            {t('speechLanguage')}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {languageChips.map((chip) => {
            const isSelected = language === chip.code;

            return (
              <button
                key={chip.code}
                onClick={() => setLanguage(chip.code)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border transition-all duration-150 min-h-touch active:scale-95 ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/30 font-black'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold'
                }`}
                aria-label={`Select ${chip.sub}`}
                aria-pressed={isSelected}
              >
                <span className="text-base font-black tracking-tight">{chip.label}</span>
                <span className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {chip.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Error message banner if state === 'error' with direct Manual Fallback button */}
      {isError && (
        <div className="w-full mb-3 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-700/60 flex flex-col gap-2.5 text-red-900 dark:text-red-200 animate-slide-up">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-bold text-sm">{errorMessage || 'Audio capture issue'}</p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                {t('micErrorFallbackNote')}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenManualEntry}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm min-h-touch transition-transform active:scale-95 shadow-md"
          >
            <Keyboard className="w-5 h-5" />
            <span>{t('typeInstead')}</span>
          </button>
        </div>
      )}

      {/* 3. The Centered Giant Circular Mic Button (≥120px) */}
      <div className="relative flex items-center justify-center my-4">
        {/* Pulsing Ripple Rings in listening state */}
        {isListening && (
          <>
            <span className="absolute w-44 h-44 rounded-full bg-red-500/15 dark:bg-red-500/20 animate-ping pointer-events-none" />
            <span className="absolute w-38 h-38 rounded-full bg-teal-500/25 dark:bg-teal-500/30 animate-pulse pointer-events-none" />
          </>
        )}

        <button
          onClick={isListening ? onStopListening : onStartListening}
          disabled={isProcessing}
          data-testid="giant-mic-button"
          className={`relative z-10 w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-2xl active:scale-95 focus:outline-none select-none ${
            isListening
              ? 'bg-gradient-to-tr from-rose-600 to-red-600 text-white ring-8 ring-rose-500/30 shadow-rose-600/50'
              : isProcessing
              ? 'bg-gradient-to-tr from-amber-600 to-amber-500 text-white ring-8 ring-amber-500/30 shadow-amber-600/40'
              : isError
              ? 'bg-gradient-to-tr from-red-600 to-rose-700 text-white ring-8 ring-red-500/30 shadow-red-600/40'
              : 'bg-gradient-to-tr from-teal-700 to-teal-600 dark:from-teal-600 dark:to-teal-500 text-white hover:from-teal-600 hover:to-teal-500 ring-8 ring-teal-500/20 shadow-teal-700/40'
          }`}
          style={{ minWidth: '128px', minHeight: '128px' }}
          aria-label={
            isListening
              ? 'Listening. Tap to stop.'
              : isProcessing
              ? 'Processing speech...'
              : 'Tap to speak ledger entry'
          }
        >
          {/* State 1: Processing */}
          {isProcessing ? (
            <>
              <Loader2 className="w-12 h-12 text-white animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-1 text-white/90">
                {t('micPromptProcessing')}
              </span>
            </>
          ) : isListening ? (
            /* State 2: Listening with real-time waveform bars */
            <>
              {/* Real-time Web Audio Volume Waveform Bars */}
              <div className="flex items-center gap-1.5 h-10 mb-1">
                {audioLevels.map((lvl, idx) => (
                  <span
                    key={idx}
                    className="w-1.5 bg-white rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(12, lvl * 38)}px`,
                      opacity: 0.85 + lvl * 0.15,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-white">
                {t('micPromptListening')}
              </span>
            </>
          ) : isError ? (
            /* State 3: Error */
            <>
              <RefreshCw className="w-10 h-10 text-white" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-1 text-white">
                {t('micPromptRetry')}
              </span>
            </>
          ) : (
            /* State 4: Idle */
            <>
              <Mic className="w-12 h-12 text-white" />
              <span className="text-[11px] font-black uppercase tracking-wider mt-1 text-white/95">
                {t('micPromptSpeak')}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Mic Action Caption */}
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center mb-3">
        {isListening
          ? t('micCaptionListening')
          : isProcessing
          ? t('micCaptionProcessing')
          : t('micCaptionIdle')}
      </p>

      {/* 4. "Type instead" Button below the mic (Highlighted when offline) */}
      <button
        onClick={onOpenManualEntry}
        data-testid="type-instead-button"
        className={`w-full flex items-center justify-between rounded-2xl font-black text-sm py-3.5 px-4 transition-all min-h-touch active:scale-[0.98] shadow-sm mb-4 border-2 ${
          isOffline
            ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-950 dark:text-teal-200 ring-4 ring-teal-500/20 shadow-md animate-pulse'
            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
        }`}
        aria-label="Manual keyboard entry"
      >
        <div className="flex items-center gap-2">
          <Keyboard className={`w-5 h-5 ${isOffline ? 'text-teal-600 dark:text-teal-400' : 'text-primary dark:text-teal-400'}`} />
          <span>{t('typeInstead')}</span>
        </div>
        {isOffline && (
          <span className="px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            {t('offlineSafe')}
          </span>
        )}
      </button>

      {/* 5. Demo Hint Chips (Tappable simulation phrases) */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t('quickDemoPhrases')}
          </span>
          <span className="text-[10px] text-slate-400">{t('tapToTest')}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {hintPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => onSimulateVoice(phrase)}
              className="w-full text-left p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all active:scale-[0.99] shadow-sm min-h-touch"
            >
              <div className="flex items-center gap-2.5">
                <Mic className="w-4 h-4 text-primary dark:text-teal-400 shrink-0" />
                <span className="text-sm">&ldquo;{phrase}&rdquo;</span>
              </div>
              <span className="text-xs font-semibold text-primary dark:text-teal-400 shrink-0">
                {t('trySpeaking')} →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GiantMicHero;
