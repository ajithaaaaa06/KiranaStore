/**
 * Shopkeeper Sign-Up & Shop Profile Wizard Modal (F14)
 * 
 * Local profile only: No server, no cloud account, no password.
 * 
 * Flow:
 * 1. Welcome screen with 5 Indic language chips + "Your data stays on this phone".
 * 2. Wizard with ONE field per screen, big mic button and large text field:
 *    - Step 1: Shop name ("Dukaan ka naam bataiye")
 *    - Step 2: Shopkeeper name ("Apna naam bataiye")
 *    - Step 3: Shopkeeper phone number (typed digits for now)
 *              // TODO (Prompt 24): Connect microphone voice input to the Indic phone-number parser
 *    - Step 4: UPI ID (voice-enabled with parseSpokenUpiId, "Paste", "Read back letter by letter")
 *    - Step 5: Optional PIN (4-6 digits, reject trivial PINs like 0000/1234, "Skip for now" with warning)
 * 3. Review screen showing all fields with [Edit] buttons, then "Start" button saving encrypted profile.
 * 
 * Resumable: Wizard state is encrypted with Web Crypto AES-GCM and saved to localStorage.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Edit2,
  Sparkles,
  Volume2,
  Clipboard,
  AlertTriangle,
  Lock,
  Store,
  User,
  Phone,
  CreditCard,
  KeyRound,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useSettings } from '../hooks/useSettings';
import { useSpeak } from '../hooks/useSpeak';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { ledgerService } from '../services/ledgerService';
import {
  validateShopName,
  validateShopkeeperName,
  validatePhoneNumber,
  validateUpiId,
  parseSpokenUpiId,
  validatePinStrength,
} from '../lib/profileValidators';
import { parsePhoneNumber } from '../services/phoneParser';
import { saveSignupDraft, loadSignupDraft, clearSignupDraft } from '../services/signupDraft';
import { LanguageCode } from '../services/types';

interface ShopkeeperSignupModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const ShopkeeperSignupModal: React.FC<ShopkeeperSignupModalProps> = ({ isOpen, onComplete }) => {
  const { language, setLanguage, currentLangConfig, t, supportedLanguages } = useI18n();
  const { updateSetting } = useSettings();
  const { speak, isSpeaking } = useSpeak();

  // Wizard Steps:
  // 0: Welcome + Language selection
  // 1: Shop Name
  // 2: Shopkeeper Name
  // 3: Phone Number
  // 4: UPI ID
  // 5: Security PIN (Optional)
  // 6: Review & Confirmation
  const [step, setStep] = useState<number>(0);

  // Form Fields
  const [shopName, setShopName] = useState('');
  const [shopkeeperName, setShopkeeperName] = useState('');
  const [phone, setPhone] = useState('');
  const [upiId, setUpiId] = useState('');
  const [pin, setPin] = useState('');

  // UI States
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSkipPinWarning, setShowSkipPinWarning] = useState(false);
  const [isReadingBackUpi, setIsReadingBackUpi] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);

  // Voice speech recognition for active field
  const handleTranscript = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;

      if (step === 1) {
        setShopName(clean);
        setErrorMessage(null);
      } else if (step === 2) {
        setShopkeeperName(clean);
        setErrorMessage(null);
      } else if (step === 3) {
        const parsed = parsePhoneNumber(clean);
        if (parsed?.digits) {
          setPhone(parsed.digits);
          setErrorMessage(null);
        }
      } else if (step === 4) {
        const parsed = parseSpokenUpiId(clean);
        setUpiId(parsed);
        setErrorMessage(null);
      }
    },
    [step]
  );

  const {
    speechState,
    startListening,
    stopListening,
    interimTranscript,
  } = useSpeechRecognition({
    locale: currentLangConfig.speechLocale,
    uiLanguage: language,
    onTranscriptComplete: handleTranscript,
  });

  const isListening = speechState === 'listening';

  // Load encrypted draft on mount
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    loadSignupDraft()
      .then((draft) => {
        if (!isMounted || !draft) {
          setHasLoadedDraft(true);
          return;
        }
        if (typeof draft.step === 'number' && draft.step >= 0 && draft.step <= 6) {
          setStep(draft.step);
        }
        if (draft.data) {
          if (draft.data.shopName) setShopName(draft.data.shopName);
          if (draft.data.shopkeeperName) setShopkeeperName(draft.data.shopkeeperName);
          if (draft.data.phone) setPhone(draft.data.phone);
          if (draft.data.upiId) setUpiId(draft.data.upiId);
          if (draft.data.pin) setPin(draft.data.pin);
        }
        setHasLoadedDraft(true);
      })
      .catch(() => {
        if (isMounted) setHasLoadedDraft(true);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Persist draft encrypted whenever fields or step change (after initial load)
  useEffect(() => {
    if (!isOpen || !hasLoadedDraft) return;

    saveSignupDraft(step, {
      shopName,
      shopkeeperName,
      phone,
      upiId,
      pin,
    });
  }, [isOpen, hasLoadedDraft, step, shopName, shopkeeperName, phone, upiId, pin]);

  // Spoken prompt helper on step change
  const promptSpoken = useCallback(
    (targetStep: number) => {
      let promptKey = '';
      if (targetStep === 1) promptKey = 'shopNameSpoken';
      else if (targetStep === 2) promptKey = 'ownerNameSpoken';
      else if (targetStep === 3) promptKey = 'phoneSpoken';
      else if (targetStep === 4) promptKey = 'upiSpoken';
      else if (targetStep === 5) promptKey = 'pinSpoken';

      if (promptKey) {
        const text = t(promptKey);
        if (text && text !== promptKey) {
          speak(text, { locale: currentLangConfig.speechLocale });
        }
      }
    },
    [t, speak, currentLangConfig.speechLocale]
  );

  // Trigger spoken prompt when arriving on step 1-5
  const previousStepRef = useRef<number>(step);
  useEffect(() => {
    if (!isOpen || !hasLoadedDraft) return;

    if (step >= 1 && step <= 5 && step !== previousStepRef.current) {
      promptSpoken(step);
    }
    previousStepRef.current = step;
  }, [isOpen, hasLoadedDraft, step, promptSpoken]);

  if (!isOpen) return null;

  // Toggle voice listening
  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      setErrorMessage(null);
      startListening();
    }
  };

  // Step Validation & Navigation
  const handleNext = () => {
    setErrorMessage(null);
    if (isListening) stopListening();

    if (step === 0) {
      setStep(1);
      promptSpoken(1);
      return;
    }

    if (step === 1) {
      const val = validateShopName(shopName);
      if (!val.isValid) {
        setErrorMessage(t('shopNameError'));
        return;
      }
      setStep(2);
      promptSpoken(2);
      return;
    }

    if (step === 2) {
      const val = validateShopkeeperName(shopkeeperName);
      if (!val.isValid) {
        setErrorMessage(t('ownerNameError'));
        return;
      }
      setStep(3);
      promptSpoken(3);
      return;
    }

    if (step === 3) {
      const val = validatePhoneNumber(phone);
      if (!val.isValid) {
        setErrorMessage(t('phoneError'));
        return;
      }
      if (val.cleanPhone) setPhone(val.cleanPhone);
      setStep(4);
      promptSpoken(4);
      return;
    }

    if (step === 4) {
      const val = validateUpiId(upiId);
      if (!val.isValid) {
        setErrorMessage(t('upiError'));
        return;
      }
      setStep(5);
      promptSpoken(5);
      return;
    }

    if (step === 5) {
      if (pin.trim()) {
        const val = validatePinStrength(pin.trim());
        if (!val.isValid) {
          setErrorMessage(t('pinError'));
          return;
        }
      }
      // If PIN is empty, user can either use Skip button or proceed without PIN
      setStep(6);
      return;
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    if (isListening) stopListening();
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  // Skip PIN Flow
  const handleSkipPin = () => {
    setShowSkipPinWarning(true);
  };

  const confirmSkipPin = () => {
    setPin('');
    setShowSkipPinWarning(false);
    localStorage.setItem('vk_skipped_pin_banner', 'true');
    setStep(6);
  };

  // Paste UPI ID from Clipboard
  const handlePasteUpi = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          const parsed = parseSpokenUpiId(text.trim());
          setUpiId(parsed);
          setErrorMessage(null);
        }
      }
    } catch (err) {
      console.warn('Could not read from clipboard:', err);
    }
  };

  // Read back UPI ID letter-by-letter
  const handleReadBackUpi = () => {
    if (!upiId.trim()) return;
    setIsReadingBackUpi(true);
    const spokenLetters = upiId
      .trim()
      .split('')
      .map((c) => {
        if (c === '@') return 'at the rate';
        if (c === '.') return 'dot';
        if (c === '-') return 'dash';
        if (c === '_') return 'underscore';
        return c.toLowerCase();
      })
      .join(', ');

    speak(spokenLetters, {
      locale: 'en-IN',
      speed: 0.9,
    });
    setTimeout(() => {
      setIsReadingBackUpi(false);
    }, Math.max(3000, upiId.length * 400));
  };

  // Final Review: Save Profile & Start App
  const handleSaveAndStart = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      // 1. Save Profile encrypted to DB
      const profile = await ledgerService.saveProfile({
        shopName: shopName.trim(),
        shopkeeperName: shopkeeperName.trim(),
        phone: phone.trim(),
        upiId: upiId.trim(),
      });

      // 2. Set PIN if provided
      if (pin.trim()) {
        await ledgerService.setPin(pin.trim());
        localStorage.removeItem('vk_skipped_pin_banner');
      }

      // 3. Update active settings shopName
      updateSetting('shopName', profile.shopName);

      // 4. Mark sign-up completed & clean draft
      localStorage.setItem('vk_signup_completed', 'true');
      await clearSignupDraft();

      // 5. Broadcast updates for reactive components
      window.dispatchEvent(new CustomEvent('vk_profile_updated', { detail: profile }));
      window.dispatchEvent(new CustomEvent('vk_shop_name_updated', { detail: profile.shopName }));

      onComplete();
    } catch (err) {
      console.error('Failed to save shopkeeper profile:', err);
      setErrorMessage('Could not save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // 5 Indic Language selection chips
  const indicChips: { code: LanguageCode; label: string; nativeLabel: string }[] = [
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
    { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden transition-all">
        {/* Top Progress Bar & Header */}
        <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-sm">
              ₹
            </div>
            <div>
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {step === 0
                  ? 'Voice Khata Setup'
                  : step === 6
                  ? t('reviewTitle')
                  : t('stepOf', { current: step, total: 5 })}
              </div>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {step === 0
                  ? t('signupWelcomeTitle')
                  : step === 1
                  ? t('shopNamePrompt')
                  : step === 2
                  ? t('ownerNamePrompt')
                  : step === 3
                  ? t('phonePrompt')
                  : step === 4
                  ? t('upiPrompt')
                  : step === 5
                  ? t('pinPrompt')
                  : t('reviewSubtitle')}
              </h2>
            </div>
          </div>

          {/* Dots Indicator */}
          {step > 0 && (
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === step
                      ? 'w-6 bg-teal-500'
                      : i < step
                      ? 'w-2 bg-teal-400/60 dark:bg-teal-600'
                      : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 overflow-y-auto flex-1 flex flex-col justify-center min-h-[340px]">
          {/* STEP 0: WELCOME & LANGUAGE SELECTION */}
          {step === 0 && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-teal-500/15 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
                  <Store className="w-10 h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('signupWelcomeTitle')}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
                  {t('signupWelcomeSubtitle')}
                </p>
              </div>

              {/* 5 Indic Language Chips */}
              <div className="w-full space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('chooseLanguage')}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {indicChips.map((chip) => {
                    const isSelected = language === chip.code;
                    return (
                      <button
                        key={chip.code}
                        type="button"
                        onClick={() => setLanguage(chip.code)}
                        className={`min-h-[56px] px-3 py-2.5 rounded-2xl flex flex-col items-center justify-center border text-sm font-bold transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-400 dark:ring-teal-500'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                        }`}
                      >
                        <span className="text-base leading-tight">{chip.nativeLabel}</span>
                        <span className="text-[11px] opacity-80 font-normal">{chip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Line */}
              <div className="w-full bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 rounded-2xl p-3.5 flex items-center gap-3 text-left">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <div className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  {t('dataStaysOnPhone')} 🔒
                  <p className="text-[11px] font-normal text-teal-800 dark:text-teal-300">
                    No cloud login. No server. Encrypted locally with Web Crypto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: SHOP NAME */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Store className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('shopNamePrompt')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  "{t('shopNameSpoken')}"
                </p>
              </div>

              {/* Large Input Field */}
              <div className="w-full">
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => {
                    setShopName(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder={t('shopNamePlaceholder')}
                  autoFocus
                  className="w-full min-h-[56px] text-lg sm:text-xl font-bold text-center text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-inner"
                />
              </div>

              {/* Big Hero Mic Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-label="Speak shop name"
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300 dark:ring-rose-900'
                      : 'bg-teal-600 hover:bg-teal-500 text-white ring-4 ring-teal-100 dark:ring-teal-900/50'
                  }`}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isListening
                    ? interimTranscript || 'Listening... Speak store name'
                    : 'Tap mic & speak store name'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: SHOPKEEPER NAME */}
          {step === 2 && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('ownerNamePrompt')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  "{t('ownerNameSpoken')}"
                </p>
              </div>

              {/* Large Input Field */}
              <div className="w-full">
                <input
                  type="text"
                  value={shopkeeperName}
                  onChange={(e) => {
                    setShopkeeperName(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder={t('ownerNamePlaceholder')}
                  autoFocus
                  className="w-full min-h-[56px] text-lg sm:text-xl font-bold text-center text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-inner"
                />
              </div>

              {/* Big Hero Mic Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-label="Speak your name"
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300 dark:ring-rose-900'
                      : 'bg-teal-600 hover:bg-teal-500 text-white ring-4 ring-teal-100 dark:ring-teal-900/50'
                  }`}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isListening
                    ? interimTranscript || 'Listening... Speak your name'
                    : 'Tap mic & speak your name'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: PHONE NUMBER */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Phone className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('phonePrompt')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('phoneHelper')}
                </p>
              </div>

              {/* Large Input Field */}
              <div className="w-full">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-lg font-bold text-slate-400 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setPhone(digits);
                      setErrorMessage(null);
                    }}
                    placeholder={t('phonePlaceholder')}
                    autoFocus
                    className="w-full min-h-[56px] text-lg sm:text-xl font-bold tracking-wider text-center text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-12 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-inner"
                  />
                </div>
              </div>

              {/* Big Hero Mic Button connected to Indic phone-number parser */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-label="Speak phone number"
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300 dark:ring-rose-900'
                      : 'bg-teal-600 hover:bg-teal-500 text-white ring-4 ring-teal-100 dark:ring-teal-900/50'
                  }`}
                >
                  {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isListening
                    ? interimTranscript || 'Listening... Speak 10 digits'
                    : 'Tap mic & speak 10 digits or type'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: UPI ID */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <CreditCard className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('upiPrompt')}
                </h3>
                {/* Clear helper text: Only UPI ID needed, never bank account */}
                <div className="bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 rounded-xl p-2.5 text-xs font-semibold text-teal-900 dark:text-teal-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{t('upiHelperText')}</span>
                </div>
              </div>

              {/* Large Editable Field */}
              <div className="w-full">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value.toLowerCase().trim());
                    setErrorMessage(null);
                  }}
                  placeholder={t('upiPlaceholder')}
                  autoFocus
                  className="w-full min-h-[56px] text-lg sm:text-xl font-bold text-center text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-inner"
                />
              </div>

              {/* Voice + Paste + Read-back Actions */}
              <div className="flex items-center justify-center gap-3">
                {/* Paste Button */}
                <button
                  type="button"
                  onClick={handlePasteUpi}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  {t('upiPaste')}
                </button>

                {/* Big Hero Mic Button */}
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-label="Speak UPI ID"
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300 dark:ring-rose-900'
                      : 'bg-teal-600 hover:bg-teal-500 text-white ring-4 ring-teal-100 dark:ring-teal-900/50'
                  }`}
                >
                  {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>

                {/* Read Back Letter by Letter */}
                <button
                  type="button"
                  onClick={handleReadBackUpi}
                  disabled={!upiId.trim() || isReadingBackUpi}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isReadingBackUpi ? t('upiReadingBack') : t('upiReadBack')}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isListening
                  ? interimTranscript || 'Listening... Say "ramesh at oksbi"'
                  : 'Speak e.g. "ramesh at oksbi" or paste from banking app'}
              </p>
            </div>
          )}

          {/* STEP 5: OPTIONAL PIN */}
          {step === 5 && (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('pinPrompt')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  {t('pinHelperText')}
                </p>
              </div>

              {/* Large PIN Input */}
              <div className="w-full max-w-xs">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '');
                    setPin(digits);
                    setErrorMessage(null);
                  }}
                  placeholder="••••"
                  autoFocus
                  className="w-full min-h-[56px] text-2xl font-bold tracking-widest text-center text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-inner"
                />
              </div>

              {/* Skip Warning Modal / Dialog */}
              {showSkipPinWarning ? (
                <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                      {t('pinSkipWarning')}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSkipPinWarning(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="button"
                      onClick={confirmSkipPin}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-sm"
                    >
                      {t('pinSkipConfirm')}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSkipPin}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-4 transition-colors"
                >
                  {t('pinSkip')}
                </button>
              )}
            </div>
          )}

          {/* STEP 6: REVIEW SCREEN */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {t('reviewTitle')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('reviewSubtitle')}
                </p>
              </div>

              {/* Review Field Cards */}
              <div className="space-y-2.5">
                {/* 1. Shop Name */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('shopNamePrompt')}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {shopName}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('editField')}
                  </button>
                </div>

                {/* 2. Shopkeeper Name */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('ownerNamePrompt')}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {shopkeeperName}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('editField')}
                  </button>
                </div>

                {/* 3. Phone */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('phonePrompt')}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        +91 {phone}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('editField')}
                  </button>
                </div>

                {/* 4. UPI ID */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('upiPrompt')}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {upiId}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('editField')}
                  </button>
                </div>

                {/* 5. Security PIN */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('pinPrompt')}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {pin ? `•••• (${pin.length} digits)` : 'None (Skipped)'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {t('editField')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {errorMessage && (
            <div className="mt-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl p-3 text-center">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="min-h-[56px] min-w-[56px] px-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t('prevStep')}</span>
            </button>
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 min-h-[56px] px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-[0.99] font-black text-base text-white shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>{step === 0 ? t('getStarted') : t('nextStep')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveAndStart}
              disabled={isSaving}
              className="flex-1 min-h-[56px] px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-[0.99] disabled:opacity-50 font-black text-base text-white shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isSaving ? 'Securing Ledger...' : t('startAppButton')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
