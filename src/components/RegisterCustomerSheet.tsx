/**
 * RegisterCustomerSheet Component (F15)
 * 
 * Flow:
 * 1. Big Name Field
 * 2. Big Phone Field (with 5+5 grouped digits "98450 12345")
 * 3. Hero Mic button listening for spoken digits via phoneParser
 * 4. Numeric keypad fallback (large touchable digit buttons)
 * 5. Read-back verification: Reads back slowly using phoneSpokenText and asks "Sahi hai?"
 *    Accepts voice: "haan/yes/sahi" to confirm, "nahi/galat" to recapture, or keypad editing.
 * 6. Phone required by default, with "Skip for now" option marking customer "No number".
 * 7. Duplicate phone check: "Ye number [Name] ka hai. Wahi hai?" with Open / Use another number.
 * 8. Saves encrypted customer via ledgerService and speaks confirmation: "[Name] ko add kar diya".
 * 9. Seamlessly continues pending transactions to TransactionConfirmSheet.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Mic,
  MicOff,
  UserPlus,
  Phone,
  User,
  Check,
  RotateCcw,
  AlertTriangle,
  Volume2,
  Delete,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Customer, ParsedEntry, LanguageCode } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { useI18n } from '../i18n/I18nContext';
import { useSpeak } from '../hooks/useSpeak';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSettings } from '../hooks/useSettings';
import { useToast } from './ui/Toast';
import {
  parsePhoneNumber,
  formatPhone,
  phoneSpokenText,
} from '../services/phoneParser';

export interface RegisterCustomerSheetProps {
  isOpen: boolean;
  initialName?: string;
  initialPhone?: string;
  pendingEntry?: ParsedEntry | null;
  onClose: () => void;
  onRegistered: (customer: Customer, pendingEntry?: ParsedEntry | null) => void;
  onSelectExisting?: (customer: Customer, pendingEntry?: ParsedEntry | null) => void;
}

export const RegisterCustomerSheet: React.FC<RegisterCustomerSheetProps> = ({
  isOpen,
  initialName = '',
  initialPhone = '',
  pendingEntry = null,
  onClose,
  onRegistered,
  onSelectExisting,
}) => {
  const { language, t, currentLangConfig } = useI18n();
  const { settings } = useSettings();
  const { speak, isSpeaking } = useSpeak();
  const { showToast } = useToast();

  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [showKeypad, setShowKeypad] = useState(false);
  const [readBackState, setReadBackState] = useState<'idle' | 'waiting_confirmation'>('idle');
  const [duplicateCustomer, setDuplicateCustomer] = useState<Customer | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Read-back verification helper
  const checkAndTriggerReadBack = useCallback(
    async (phoneDigits: string) => {
      setErrorMessage(null);

      // Check if phone already belongs to an existing customer
      const existing = await ledgerService.getCustomerByPhone(phoneDigits);
      if (existing) {
        setDuplicateCustomer(existing);
        return;
      }

      setDuplicateCustomer(null);
      setReadBackState('waiting_confirmation');

      // Vocalize slow pairs with "Sahi hai?"
      const spokenPairs = phoneSpokenText(phoneDigits, language);
      const question = `${spokenPairs}. ${t('phoneReadBackQuestion', { phone: '' }).replace('{phone}.', '').trim() || 'Sahi hai?'}`;
      speak(question, { locale: currentLangConfig.speechLocale, speed: 0.95 });
    },
    [language, currentLangConfig.speechLocale, speak, t]
  );

  // Sync props when sheet opens
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setPhone(initialPhone);
      setErrorMessage(null);
      setDuplicateCustomer(null);
      setReadBackState('idle');

      // If phone was provided upfront (10 digits), trigger readback
      if (initialPhone && initialPhone.length === 10) {
        checkAndTriggerReadBack(initialPhone);
      }
    }
  }, [isOpen, initialName, initialPhone, checkAndTriggerReadBack]);

  // Handle incoming speech transcript
  const handleTranscript = useCallback(
    async (transcript: string) => {
      const clean = transcript.trim().toLowerCase();
      if (!clean) return;

      // When waiting for read-back confirmation:
      if (readBackState === 'waiting_confirmation') {
        // Confirmation words
        if (
          clean.includes('haan') ||
          clean.includes('ha') ||
          clean.includes('yes') ||
          clean.includes('sahi') ||
          clean.includes('theek') ||
          clean.includes('save') ||
          clean.includes('confirm') ||
          clean.includes('ok') ||
          clean.includes('okay') ||
          clean.includes('ಸರಿ') ||
          clean.includes('சரி') ||
          clean.includes('సరిగ్గా')
        ) {
          handleSaveCustomer();
          return;
        }

        // Rejection / correction words
        if (
          clean.includes('nahi') ||
          clean.includes('no') ||
          clean.includes('galat') ||
          clean.includes('wrong') ||
          clean.includes('badlo') ||
          clean.includes('cancel') ||
          clean.includes('ಇಲ್ಲ') ||
          clean.includes('இல்லை') ||
          clean.includes('కాదు')
        ) {
          setReadBackState('idle');
          setPhone('');
          setErrorMessage('Number clear kar diya. Dobara boliye ya keypad use karein.');
          return;
        }
      }

      // Normal phone number parsing
      const parsed = parsePhoneNumber(transcript);
      if (parsed && parsed.digits) {
        setPhone(parsed.digits);
        if (parsed.digits.length === 10 && parsed.confidence >= 0.5) {
          checkAndTriggerReadBack(parsed.digits);
        } else if (parsed.issues.length > 0) {
          setErrorMessage(parsed.issues[0]);
        }
      }
    },
    [readBackState, checkAndTriggerReadBack]
  );

  const { speechState, startListening, stopListening, interimTranscript } = useSpeechRecognition({
    locale: currentLangConfig.speechLocale,
    uiLanguage: language,
    onTranscriptComplete: handleTranscript,
  });

  const isListening = speechState === 'listening';

  // Toggle voice recognition
  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      setErrorMessage(null);
      startListening();
    }
  };

  // Keypad button press
  const handleKeypadPress = (digit: string) => {
    setErrorMessage(null);
    setReadBackState('idle');
    setDuplicateCustomer(null);

    if (phone.length < 10) {
      const newPhone = phone + digit;
      setPhone(newPhone);
      if (newPhone.length === 10) {
        const parsed = parsePhoneNumber(newPhone);
        if (parsed?.confidence && parsed.confidence >= 0.5) {
          checkAndTriggerReadBack(newPhone);
        } else if (parsed?.issues && parsed.issues.length > 0) {
          setErrorMessage(parsed.issues[0]);
        }
      }
    }
  };

  const handleKeypadBackspace = () => {
    setErrorMessage(null);
    setReadBackState('idle');
    setDuplicateCustomer(null);
    setPhone((prev) => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    setErrorMessage(null);
    setReadBackState('idle');
    setDuplicateCustomer(null);
    setPhone('');
  };

  // Save Customer
  const handleSaveCustomer = async (skipPhone: boolean = false) => {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage('Kripya customer ka sahi naam likhein ya bolein');
      return;
    }

    const cleanPhone = skipPhone ? '' : phone.replace(/\D/g, '');

    // If phone is required by settings and not explicitly skipped
    if (!skipPhone && settings.requireCustomerPhone && cleanPhone.length !== 10) {
      setErrorMessage(t('enterCustomerPhone') + ' (10 digits)');
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    try {
      if (isListening) stopListening();

      // Check duplicate one more time before save
      if (cleanPhone) {
        const existing = await ledgerService.getCustomerByPhone(cleanPhone);
        if (existing) {
          setDuplicateCustomer(existing);
          setIsSaving(false);
          return;
        }
      }

      // Add customer via ledgerService
      const newCustomer = await ledgerService.addCustomer({
        name: trimmedName,
        phone: cleanPhone,
      });

      // Spoken confirmation
      const confirmationText =
        t('customerRegisteredSpoken', { name: newCustomer.name }) ||
        `${newCustomer.name} ko add kar diya`;
      speak(confirmationText, { locale: currentLangConfig.speechLocale });

      showToast(`Grahak "${newCustomer.name}" add ho gaya!`, { type: 'success' });

      // Notify parent & resume pending flow
      onRegistered(newCustomer, pendingEntry);
    } catch (err) {
      console.error('Failed to register customer:', err);
      setErrorMessage('Could not register customer. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden transition-all">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t('registerCustomerTitle')}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {t('registerCustomerSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto space-y-4">
          {/* Pending Entry Banner (if opened from an udhaar/payment flow) */}
          {pendingEntry && (
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                  Pending Transaction
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {pendingEntry.type === 'credit' ? 'Udhaar' : 'Jama'} ₹{pendingEntry.amount} will be saved after registration
                </span>
              </div>
            </div>
          )}

          {/* 1. Customer Name Field */}
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Customer Name / ग्राहक का नाम
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                data-testid="customer-name-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="e.g. Suresh Gowda"
                autoFocus={!initialName}
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 font-bold text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* 2. Customer Phone Field (Grouped 5+5) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {t('enterCustomerPhone')}
              </label>
              {!settings.requireCustomerPhone && (
                <span className="text-[11px] font-semibold text-slate-400">
                  (Optional)
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-bold text-slate-400 select-none">
                +91
              </span>
              <input
                type="text"
                data-testid="customer-phone-input"
                readOnly
                value={formatPhone(phone)}
                placeholder="98450 12345"
                className="w-full min-h-[56px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-12 py-3 font-mono font-bold text-lg sm:text-xl text-center text-slate-900 dark:text-white tracking-widest focus:outline-none focus:border-teal-500 shadow-inner select-none cursor-pointer"
                onClick={() => setShowKeypad(true)}
              />
              {phone && (
                <button
                  type="button"
                  onClick={handleKeypadClear}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Duplicate Phone Warning Card */}
          {duplicateCustomer && (
            <div className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200 leading-relaxed">
                  {t('duplicatePhoneWarning', { name: duplicateCustomer.name })}
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setDuplicateCustomer(null);
                    setPhone('');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  {t('useAnotherNumber')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectExisting) {
                      onSelectExisting(duplicateCustomer, pendingEntry);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-sm"
                >
                  {t('openExistingCustomer', { name: duplicateCustomer.name })}
                </button>
              </div>
            </div>
          )}

          {/* Read-Back Verification Prompt Banner */}
          {readBackState === 'waiting_confirmation' && !duplicateCustomer && (
            <div className="bg-teal-500/10 border-2 border-teal-500/30 rounded-2xl p-4 text-center space-y-3 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Confirm Spoken Number</span>
              </div>
              <div className="text-xl font-mono font-black text-slate-900 dark:text-white tracking-widest">
                {formatPhone(phone)}
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                "{t('phoneReadBackQuestion', { phone: formatPhone(phone) })}"
              </p>

              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setReadBackState('idle');
                    setPhone('');
                  }}
                  className="flex-1 min-h-[48px] px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>{t('readBackWrong')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveCustomer()}
                  className="flex-1 min-h-[48px] px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{t('readBackConfirm')}</span>
                </button>
              </div>
            </div>
          )}

          {/* Voice Input & Mic Section */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <button
              type="button"
              onClick={handleToggleMic}
              aria-label="Speak customer phone"
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
                : readBackState === 'waiting_confirmation'
                ? 'Speak "Haan" to save, or "Nahi" to change'
                : 'Tap mic & speak phone number (Hindi/Eng/Kannada/Tamil/Telugu)'}
            </span>
          </div>

          {/* Toggle Numeric Keypad */}
          <button
            type="button"
            onClick={() => setShowKeypad(!showKeypad)}
            className="w-full py-2 text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center justify-center gap-1 hover:underline select-none"
          >
            <span>{showKeypad ? 'Hide Keypad' : 'Type number on Keypad instead'}</span>
            {showKeypad ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Large Touch Numeric Keypad Fallback */}
          {showKeypad && (
            <div className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-3 border border-slate-200 dark:border-slate-700/60">
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className="min-h-[52px] rounded-2xl bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-slate-900 dark:text-white font-mono font-bold text-xl shadow-sm border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleKeypadClear}
                  className="min-h-[52px] rounded-2xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center select-none"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  className="min-h-[52px] rounded-2xl bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/40 text-slate-900 dark:text-white font-mono font-bold text-xl shadow-sm border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all flex items-center justify-center select-none"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleKeypadBackspace}
                  className="min-h-[52px] rounded-2xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center select-none"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl p-3 text-center">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleSaveCustomer(true)}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {t('skipPhoneForNow')}
          </button>

          <button
            type="button"
            onClick={() => handleSaveCustomer(false)}
            disabled={isSaving || !name.trim()}
            className="w-full sm:flex-1 min-h-[52px] px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-[0.99] disabled:opacity-50 font-black text-sm text-white shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Check className="w-5 h-5" />
            <span>{isSaving ? 'Saving...' : 'Save Customer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
