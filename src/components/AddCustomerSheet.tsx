/**
 * AddCustomerSheet Component
 * 
 * Allows creating a customer directly without recording any udhaar or payment.
 * 1. Name (required) with mic button to speak name in selected language.
 * 2. Phone (optional, 10-digit Indian number validation).
 * 3. Fuzzy duplicate detection using customerMatcher:
 *    If similar customer exists, offers disambiguation ("Ramesh Kumar already exists. Use this one?").
 * 4. Encrypted storage via ledgerService.addCustomer (AES-256-GCM).
 * 5. Starts with ₹0 balance and empty timeline.
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Mic,
  MicOff,
  UserPlus,
  Phone,
  User,
  AlertTriangle,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Customer } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { findCustomers } from '../services/customerMatcher';
import { useI18n } from '../i18n/I18nContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useToast } from './ui/Toast';
import { formatRupees } from '../lib/format';

export interface AddCustomerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerCreated: (customer: Customer) => void;
  onSelectExisting?: (customer: Customer) => void;
}

export const AddCustomerSheet: React.FC<AddCustomerSheetProps> = ({
  isOpen,
  onClose,
  onCustomerCreated,
  onSelectExisting,
}) => {
  const { language, currentLangConfig, t } = useI18n();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [similarCustomer, setSimilarCustomer] = useState<Customer | null>(null);
  const [isListeningName, setIsListeningName] = useState(false);

  // Speech Recognition hook for speaking customer name
  const { startListening, stopListening, isListening, transcript, interimTranscript } = useSpeechRecognition({
    locale: currentLangConfig.speechLocale,
    uiLanguage: language,
    onTranscriptComplete: (finalTranscript: string) => {
      if (finalTranscript) {
        setName(finalTranscript.trim());
      }
      setIsListeningName(false);
    },
  });

  useEffect(() => {
    if (isListeningName && (interimTranscript || transcript)) {
      setName((transcript || interimTranscript).trim());
    }
  }, [isListeningName, transcript, interimTranscript]);

  // Toggle voice dictation for name
  const handleToggleListening = () => {
    if (isListening || isListeningName) {
      stopListening();
      setIsListeningName(false);
    } else {
      setName('');
      setErrorMessage(null);
      setIsListeningName(true);
      startListening();
    }
  };

  // Reset fields when sheet opens/closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setPhone('');
      setErrorMessage(null);
      setSimilarCustomer(null);
      setIsListeningName(false);
      stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Clean phone input to digits only
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    setErrorMessage(null);
  };

  const handleSave = async (forceCreate = false) => {
    const trimmedName = name.trim();
    setErrorMessage(null);

    if (!trimmedName) {
      setErrorMessage(t('enterCustomerNameError'));
      return;
    }

    let cleanPhoneDigits = '';
    if (phone.trim()) {
      cleanPhoneDigits = phone.replace(/\D/g, '').slice(-10);
      if (cleanPhoneDigits.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhoneDigits)) {
        setErrorMessage(t('invalidPhoneError'));
        return;
      }
    }

    // Fuzzy duplicate checking before saving
    if (!forceCreate) {
      const allCustomers = await ledgerService.getCustomers();

      // 1. Check exact phone match
      if (cleanPhoneDigits) {
        const phoneMatch = allCustomers.find(
          (c) => c.phone && c.phone.replace(/\D/g, '').slice(-10) === cleanPhoneDigits
        );
        if (phoneMatch) {
          setSimilarCustomer(phoneMatch);
          return;
        }
      }

      // 2. Fuzzy name matching
      const matchResult = findCustomers(trimmedName, allCustomers);
      if (matchResult.action !== 'create_new' && matchResult.selectedCustomer) {
        setSimilarCustomer(matchResult.selectedCustomer);
        return;
      }
    }

    // Proceed to create
    setIsSaving(true);
    try {
      const newCustomer = await ledgerService.addCustomer({
        name: trimmedName,
        phone: cleanPhoneDigits || undefined,
      });

      showToast(`New customer added: ${newCustomer.name}`, { type: 'success' });
      window.dispatchEvent(new CustomEvent('vk_customer_added', { detail: newCustomer }));
      onCustomerCreated(newCustomer);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || t('errorSavingCustomer'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleChooseExisting = () => {
    if (similarCustomer) {
      if (onSelectExisting) {
        onSelectExisting(similarCustomer);
      }
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-customer-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl p-5 shadow-2xl flex flex-col animate-slide-up text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 id="add-customer-sheet-title" className="text-lg font-black tracking-tight">
                {t('addNewCustomerTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {t('addNewCustomerSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="mb-3.5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Similar customer / Disambiguation Warning */}
        {similarCustomer && (
          <div className="mb-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black text-amber-900 dark:text-amber-200">
                  {similarCustomer.name} {t('customerAlreadyExists')}
                </h4>
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mt-0.5">
                  {t('similarCustomerWarning')}
                </p>
              </div>
            </div>

            {/* Existing Customer Card */}
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-center justify-between">
              <div>
                <span className="font-black text-sm block">{similarCustomer.name}</span>
                {similarCustomer.phone && (
                  <span className="text-xs text-slate-500 font-semibold">
                    📱 +91 {similarCustomer.phone}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Balance</span>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                  {formatRupees(similarCustomer.balance)}
                </span>
              </div>
            </div>

            {/* Disambiguation Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleChooseExisting}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs transition-all active:scale-95 shadow-sm min-h-[44px]"
              >
                ✓ {t('useThisOne')}
              </button>

              <button
                type="button"
                onClick={() => handleSave(true)}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-black text-xs transition-all active:scale-95 min-h-[44px]"
              >
                {t('createAnyway')}
              </button>
            </div>
          </div>
        )}

        {/* 1. Customer Name Input (Required) with Mic Button */}
        <div className="space-y-1.5 mb-3.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{t('customerName')} *</span>
          </label>

          <div className="relative flex items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage(null);
                setSimilarCustomer(null);
              }}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-4 pr-14 py-3.5 text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
              autoFocus
            />

            {/* Mic Button to Speak Name */}
            <button
              type="button"
              onClick={handleToggleListening}
              className={`absolute right-2 p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isListening || isListeningName
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900'
              }`}
              title="Speak name"
              aria-label="Speak customer name"
            >
              {isListening || isListeningName ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>

          {(isListening || isListeningName) && (
            <p className="text-[11px] font-bold text-rose-500 animate-pulse pl-1">
              🎙️ {t('speakNamePrompt')}
            </p>
          )}
        </div>

        {/* 2. Customer Phone Input (Optional) */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{t('phone')} ({t('noteOptional')})</span>
            </label>
            <span className="text-[10px] font-bold text-slate-400">10 digits</span>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-xs font-black text-slate-400">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="98765 43210"
              maxLength={10}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 font-mono tracking-wider transition-colors"
            />
          </div>
          <p className="text-[11px] text-slate-400 font-semibold pl-1">
            {t('phoneHelpText')}
          </p>
        </div>

        {/* 3. Action Buttons (Min 56px touch target for Save) */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all min-h-[48px] active:scale-95"
          >
            {t('cancel')}
          </button>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isSaving || !name.trim()}
            className={`py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all min-h-[56px] shadow-lg active:scale-95 ${
              isSaving || !name.trim()
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-700/30'
            }`}
          >
            {isSaving ? (
              <span>{t('saving')}</span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>{t('saveCustomer')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerSheet;
