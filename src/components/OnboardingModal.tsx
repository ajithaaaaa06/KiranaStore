/**
 * First-Run Onboarding Modal (3 Swipeable Screens)
 * 
 * 1. Speak (Boliye): Hands-free speech input demo
 * 2. Confirm (Dekhein): 1-tap verification and self-correction
 * 3. Done (Hisaab Done): WhatsApp reminder, receipts & mic permission request
 * 
 * Features:
 * - Skippable at any step
 * - Swipe gestures (touch left/right) & pagination dots
 * - Prominent "Your data stays on this phone 🔒" privacy footer
 * - Mic permission request trigger on step 3
 */

import React, { useState, useRef } from 'react';
import {
  Mic,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
  Send,
  Printer,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useI18n();
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2
  const [isRequestingMic, setIsRequestingMic] = useState(false);
  const [micGranted, setMicGranted] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50 && currentStep < 2) {
      // Swiped Left -> Next
      setCurrentStep((prev) => prev + 1);
    } else if (diff < -50 && currentStep > 0) {
      // Swiped Right -> Back
      setCurrentStep((prev) => prev - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleComplete = () => {
    localStorage.setItem('vk_onboarding_completed', 'true');
    onClose();
  };

  // Request Microphone Permission on the last step
  const handleRequestMicAndStart = async () => {
    setIsRequestingMic(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop audio tracks after verifying permission
        stream.getTracks().forEach((track) => track.stop());
        setMicGranted(true);
      }
    } catch (err) {
      console.warn('Microphone permission dismissed or not granted:', err);
    } finally {
      setIsRequestingMic(false);
      handleComplete();
    }
  };

  const steps = [
    // Step 1: Speak (Boliye)
    {
      title: t('onboardingStep1Title'),
      badge: 'Step 1 of 3: Speak',
      description: t('onboardingStep1Desc'),
      renderVisual: () => (
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Animated Glow Rings */}
          <div className="absolute w-32 h-32 rounded-full bg-teal-500/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30">
            <Mic className="w-12 h-12" />
          </div>

          {/* Spoken example chip */}
          <div className="mt-5 px-3.5 py-2 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-700/60 text-teal-900 dark:text-teal-200 text-xs font-black shadow-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{t('hintPhrase1')}</span>
          </div>
        </div>
      ),
    },

    // Step 2: Confirm (Dekhein)
    {
      title: t('onboardingStep2Title'),
      badge: 'Step 2 of 3: Confirm',
      description: t('onboardingStep2Desc'),
      renderVisual: () => (
        <div className="py-4">
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase">{t('reviewEntryTitle')}</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-black border border-amber-500/30">
                {t('credit').toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-black text-slate-900 dark:text-white">Ramesh Kumar</p>
                <p className="text-[11px] font-bold text-slate-400">{t('today')}</p>
              </div>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">₹500</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="py-2 px-3 rounded-xl bg-emerald-600 text-white font-black text-xs text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>✓ {t('save')}</span>
              </div>
              <div className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs text-center">
                ✗ {t('cancel')}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Step 3: Done (Hisaab Done & Mic Access)
    {
      title: t('onboardingStep3Title'),
      badge: 'Step 3 of 3: Done',
      description: t('onboardingStep3Desc'),
      renderVisual: () => (
        <div className="py-4 space-y-2.5">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-xs font-black">
              <Send className="w-4 h-4 text-emerald-500" />
              <span>{t('whatsappReminder')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center gap-2 text-xs font-black">
              <Printer className="w-4 h-4 text-blue-500" />
              <span>{t('printReceipt')}</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 text-center">
            <p className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center justify-center gap-1.5">
              <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Soundbox audio confirmation!</span>
            </p>
          </div>
        </div>
      ),
    },
  ];

  const step = steps[currentStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Onboarding"
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between min-h-[460px] animate-in zoom-in-95 duration-200"
      >
        {/* Header: Skip button & Step indicator */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-xl border border-teal-500/20">
            {step.badge}
          </span>
          <button
            onClick={handleComplete}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            Skip / Chhodein ✕
          </button>
        </div>

        {/* Visual Graphic */}
        <div className="my-auto">{step.renderVisual()}</div>

        {/* Text Content */}
        <div className="text-center space-y-1.5 px-1">
          <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            {step.title}
          </h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Navigation & Action Area */}
        <div className="mt-5 space-y-3.5">
          {/* Pagination Dots */}
          <div className="flex items-center justify-center space-x-1.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentStep === idx
                    ? 'w-6 bg-teal-600'
                    : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          {currentStep < 2 ? (
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs min-h-[52px] min-w-[52px] flex items-center justify-center"
                  aria-label="Previous step"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md min-h-[52px]"
              >
                <span>{t('nextStep')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleRequestMicAndStart}
              disabled={isRequestingMic}
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md min-h-[56px]"
            >
              <Mic className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>
                {isRequestingMic
                  ? t('loading')
                  : t('grantMicAndStart')}
              </span>
            </button>
          )}

          {/* Privacy Requirement Notice */}
          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Your data stays on this phone 🔒</span>
          </div>
        </div>
      </div>
    </div>
  );
};
