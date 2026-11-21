/**
 * ConfirmEntrySheet (Bottom Sheet)
 * 
 * Satisfies all Build Bengaluru 2.0 Hackathon criteria:
 * 1. Big readable preview card: Customer name, Amount (large), Type badge (UDHAAR/PAYMENT with icon), Date ("Kal, 20 Nov").
 * 2. Multi-entry stacked rows if compound parsed (e.g. "340 udhaar, kal 200 diya tha"), each editable/removable.
 * 3. Low-confidence fields highlighted with yellow outline and "Check this" (Dhyan dein) label.
 * 4. Duplicate warning banner if same customer + amount + type exists within last 10 minutes:
 *    "Aisa entry abhi hi hua tha. Phir se save karein?" with Save anyway / Cancel.
 * 5. Customer disambiguation: if multiple matches ("Ramesh" → Ramesh Kumar / Ramesh Gowda),
 *    shows tappable large options (≥56px) before preview.
 * 6. Voice-correction: "Correct by voice" button reopens mic; saying "nahi, 430" updates amount in place,
 *    animates changed field.
 * 7. Two huge buttons: ✓ Save (green) and ✗ Reject (grey). Also reacts to voice words
 *    "haan"/"yes"/"save" and "nahi"/"cancel".
 * 8. On save: success chime (Web Audio API generated tone, zero audio files), toast, and voice confirmation speech, then close.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Check,
  X,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  Users,
  UserPlus,
  Calendar,
  Mic,
  MicOff,
  Trash2,
  Plus,
  Sparkles,
  Volume2,
  Keyboard,
} from 'lucide-react';
import {
  ParsedVoiceCommand,
  TransactionType,
  Customer,
  ConfirmEntryData,
} from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { parseTranscript } from '../services/parser';
import { findCustomers as findMatchingCustomers } from '../services/customerMatcher';
import { formatRupees, formatFullRelativeDate } from '../lib/format';
import { extractAmount } from '../lib/voiceParser';
import { soundbox } from '../lib/soundbox';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from './ui/Toast';

export interface ConfirmEntrySheetProps {
  command: ParsedVoiceCommand;
  isDuplicatePotential?: boolean;
  onConfirm: (data: ConfirmEntryData | ConfirmEntryData[]) => Promise<void> | void;
  onCancel: () => void;
  onOpenManual?: () => void;
}

interface EditableSubEntry {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  relativeDateLabel?: string;
  note?: string;
  isLowConfidence?: boolean;
  lowConfidenceField?: 'amount' | 'customer' | 'type';
}

export const ConfirmEntrySheet: React.FC<ConfirmEntrySheetProps> = ({
  command,
  isDuplicatePotential = false,
  onConfirm,
  onCancel,
  onOpenManual,
}) => {
  const { language, currentLangConfig, t } = useI18n();
  const { showToast } = useToast();

  // 1. Customer State & Disambiguation
  const [customerName, setCustomerName] = useState(command.customerName || 'Customer');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [candidateCustomers, setCandidateCustomers] = useState<Customer[]>([]);
  const [showDisambiguation, setShowDisambiguation] = useState(false);

  // 2. Entries State (Single or Stacked Rows)
  const [entries, setEntries] = useState<EditableSubEntry[]>(() => {
    if (command.entries && command.entries.length > 0) {
      return command.entries.map((sub, idx) => ({
        id: sub.id || `row-${idx}`,
        amount: sub.amount,
        type: sub.type,
        date: sub.date || new Date().toISOString(),
        relativeDateLabel: sub.relativeDateLabel,
        note: sub.note,
        isLowConfidence: sub.isLowConfidence,
      }));
    }
    return [
      {
        id: 'row-primary',
        amount: command.amount || 0,
        type: command.type || 'credit',
        date: command.date || new Date().toISOString(),
        relativeDateLabel: command.relativeDateLabel,
        note: command.notes,
        isLowConfidence: command.isLowConfidence || !command.amount || command.amount <= 0,
        lowConfidenceField: command.lowConfidenceField || (!command.amount ? 'amount' : undefined),
      },
    ];
  });

  // 3. Duplicate Warning State (10-minute duplicate check)
  const [isDuplicateDetected, setIsDuplicateDetected] = useState(isDuplicatePotential);
  const [duplicateAcknowledged, setDuplicateAcknowledged] = useState(false);

  // 4. Voice Correction & Field Animation State
  const [isListeningCorrection, setIsListeningCorrection] = useState(false);
  const [animatedField, setAnimatedField] = useState<'amount' | 'type' | 'customer' | null>(null);
  const [voiceFeedbackText, setVoiceFeedbackText] = useState<string | null>(null);

  // Web Speech Recognition Reference
  const recognitionRef = useRef<any>(null);

  // Sync entries when command.amount changes from parent (e.g. spoken voice correction)
  useEffect(() => {
    if (command.amount !== undefined && command.amount > 0) {
      setEntries((prev) =>
        prev.map((e, idx) => (idx === 0 ? { ...e, amount: command.amount!, isLowConfidence: false } : e))
      );
      setAnimatedField('amount');
      const timer = setTimeout(() => setAnimatedField(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [command.amount]);

  // Search for matching customers to detect disambiguation
  useEffect(() => {
    let isMounted = true;
    const query = (command.customerName || customerName || '').trim();
    if (!query) return;

    ledgerService.getCustomers().then((allCustomers) => {
      if (!isMounted) return;
      const matchResult = findMatchingCustomers(query, allCustomers);
      const matches = matchResult.candidates.map((c) => c.customer);
      setCandidateCustomers(matches);

      if (matchResult.action === 'auto_select' && matchResult.selectedCustomer) {
        setSelectedCustomer(matchResult.selectedCustomer);
        setShowDisambiguation(false);
      } else if (matchResult.action === 'disambiguate') {
        setShowDisambiguation(true);
        setSelectedCustomer(matchResult.selectedCustomer || matches[0] || null);
      } else {
        // 'create_new' (< 0.60): offer add new customer
        setSelectedCustomer(null);
        setShowDisambiguation(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [command.customerName]);

  // Check 10-minute duplicate warning dynamically when customer or entries change
  useEffect(() => {
    let isMounted = true;
    const checkDups = async () => {
      if (entries.length === 0) return;
      const primary = entries[0];
      const targetCustomer = selectedCustomer ? selectedCustomer.id : customerName;
      
      const hasDup = await ledgerService.checkDuplicateEntry(
        targetCustomer,
        primary.amount,
        primary.type,
        600000 // 10 minutes
      );
      if (isMounted) {
        setIsDuplicateDetected(hasDup);
      }
    };
    checkDups();
    return () => {
      isMounted = false;
    };
  }, [customerName, selectedCustomer, entries]);

  // Trigger field animation (glow / pulse)
  const triggerFieldAnimation = (field: 'amount' | 'type' | 'customer') => {
    setAnimatedField(field);
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 30, 40]);
      }
    } catch {
      // ignore
    }
    setTimeout(() => {
      setAnimatedField(null);
    }, 1800);
  };

  /**
   * Voice Command Handler for Voice Correction and Voice Confirmation
   * Handles:
   * - "nahi, 430" / "430 kar do" -> updates amount in place, animates field
   * - "udhaar nahi jama" -> updates type
   * - "haan" / "yes" / "save" -> triggers save
   * - "nahi" / "cancel" -> triggers reject
   */
  const handleVoiceCorrectionTranscript = useCallback(
    async (spokenText: string) => {
      const trimmed = spokenText.trim();
      if (!trimmed) return;

      const res = await parseTranscript(trimmed, command);

      // 1. Voice Confirmation ("haan" / "yes" / "save" / "theek hai")
      if (res.intent === 'confirm') {
        setVoiceFeedbackText(t('savingByVoice'));
        handleSave();
        return;
      }

      // 2. Voice Rejection ("nahi" / "cancel" / "ruko")
      if (res.intent === 'cancel') {
        setVoiceFeedbackText(t('cancelledByVoice'));
        soundbox.playWarningTone();
        setTimeout(() => onCancel(), 400);
        return;
      }

      // 3. Amount Correction ("nahi, 430", "sorry 500", "galat 350")
      if (res.intent === 'correction' && res.correctionAmount) {
        const newAmt = res.correctionAmount;
        setEntries((prev) =>
          prev.map((e, idx) => (idx === 0 ? { ...e, amount: newAmt, isLowConfidence: false } : e))
        );
        triggerFieldAnimation('amount');
        setVoiceFeedbackText(`${t('voiceAmountUpdated')}: ₹${newAmt}`);
        soundbox.playCreditChime();
        return;
      }

      // 4. Inferred new entry details or type correction
      if (res.intent === 'entry' && res.entries.length > 0) {
        const primary = res.entries[0];
        if (primary.amount && primary.amount > 0) {
          setEntries((prev) =>
            prev.map((e, idx) =>
              idx === 0
                ? {
                    ...e,
                    amount: primary.amount || e.amount,
                    type: primary.type || e.type,
                    isLowConfidence: false,
                  }
                : e
            )
          );
          triggerFieldAnimation('amount');
          setVoiceFeedbackText(`Updated: ₹${primary.amount} ${primary.type === 'credit' ? t('credit') : t('payment')}`);
          soundbox.playCreditChime();
          return;
        }
      }

      setVoiceFeedbackText(`Heard: "${spokenText}" - Say "nahi, 430" to change amount`);
    },
    [command, onCancel]
  );

  // Start live Web Speech recognition for voice correction
  const startVoiceCorrection = useCallback(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      showToast('Aapke browser mein voice recognition upalabdh nahi hai', { type: 'warning' });
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognitionClass();
      recognition.lang = currentLangConfig.speechLocale || 'hi-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListeningCorrection(true);
        setVoiceFeedbackText('Sun rahe hain... Bolen: "nahi, 430" ya "save"');
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        handleVoiceCorrectionTranscript(text);
      };

      recognition.onerror = () => {
        setIsListeningCorrection(false);
      };

      recognition.onend = () => {
        setIsListeningCorrection(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListeningCorrection(false);
    }
  }, [currentLangConfig.speechLocale, handleVoiceCorrectionTranscript, showToast]);

  const stopVoiceCorrection = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListeningCorrection(false);
  }, []);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Quick Amount Adjustments (+/- ₹10, ₹50, ₹100)
  const adjustAmount = (index: number, delta: number) => {
    setEntries((prev) =>
      prev.map((e, idx) =>
        idx === index ? { ...e, amount: Math.max(0, e.amount + delta), isLowConfidence: false } : e
      )
    );
    triggerFieldAnimation('amount');
  };

  // Toggle Type between Credit and Payment
  const toggleType = (index: number, newType: TransactionType) => {
    setEntries((prev) =>
      prev.map((e, idx) => (idx === index ? { ...e, type: newType } : e))
    );
    triggerFieldAnimation('type');
  };

  // Remove a row in stacked entries
  const removeRow = (index: number) => {
    if (entries.length <= 1) return;
    setEntries((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Add a new row to stacked entries
  const addRow = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        amount: 100,
        type: 'credit',
        date: new Date().toISOString(),
        relativeDateLabel: 'aaj',
        note: '',
      },
    ]);
  };

  // Calculate Net totals for stacked entries
  const totalCredit = entries
    .filter((e) => e.type === 'credit')
    .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

  const totalPayment = entries
    .filter((e) => e.type === 'payment')
    .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

  const netImpact = totalCredit - totalPayment;

  /**
   * Final Save Action:
   * 1. Validates fields
   * 2. Plays Web Audio success chime
   * 3. Announces spoken confirmation via Web Speech Synthesis
   * 4. Shows Toast
   * 5. Calls onConfirm
   */
  const handleSave = async () => {
    const validEntries = entries.filter((e) => e.amount > 0);
    const finalCustName = selectedCustomer ? selectedCustomer.name : customerName.trim();

    if (!finalCustName) {
      showToast(t('enterCustomerNameError'), { type: 'warning' });
      return;
    }

    if (validEntries.length === 0) {
      showToast('Rakam (Amount) ₹0 se zyada honi chahiye', { type: 'warning' });
      return;
    }

    // Prepare confirmation data
    const payload: ConfirmEntryData[] = validEntries.map((e) => ({
      customerName: finalCustName,
      customerId: selectedCustomer?.id,
      amount: e.amount,
      type: e.type,
      date: e.date,
      notes: e.note || command.notes,
      relativeDateLabel: e.relativeDateLabel,
    }));

    // 1. Success Audio Chime via Web Audio API (Zero audio files)
    const primary = validEntries[0];
    if (primary.type === 'credit') {
      soundbox.playCreditChime();
    } else {
      soundbox.playPaymentChime();
    }

    // 2. Spoken confirmation via Soundbox
    const spokenAmount = primary.amount.toString();
    const spokenText =
      primary.type === 'credit'
        ? t.spokenCreditSaved(finalCustName, spokenAmount, language)
        : t.spokenPaymentSaved(finalCustName, spokenAmount, language);

    setTimeout(() => {
      soundbox.speak(spokenText, currentLangConfig.speechLocale);
    }, 250);

    // 3. Toast confirmation
    const typeLabel = primary.type === 'credit' ? 'Udhaar' : 'Jama';
    showToast(`${finalCustName}: ₹${primary.amount} ${typeLabel} save ho gaya! ✅`, {
      type: 'success',
    });

    // 4. Deliver confirmed entries and close
    await onConfirm(payload.length === 1 ? payload[0] : payload);
  };

  const isMultiRow = entries.length > 1;
  const primaryEntry = entries[0];
  const isCredit = primaryEntry?.type === 'credit';

  // Check if primary entry has low confidence
  const isLowConfidenceAmount =
    primaryEntry?.isLowConfidence || !primaryEntry?.amount || primaryEntry.amount <= 0;
  const isLowConfidenceCustomer =
    !customerName || customerName === 'Customer' || customerName === 'Grahak';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-sheet-title"
    >
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-slate-900 border-t border-slate-700 rounded-t-3xl p-4 sm:p-5 shadow-2xl flex flex-col animate-slide-up text-white">
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header Title with Date Badge */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <h2
              id="confirm-sheet-title"
              className="text-xs font-black uppercase tracking-wider text-slate-400"
            >
              {t('reviewEntryTitle')}
            </h2>
          </div>

          {/* Formatted Date Badge: e.g. "Kal, 20 Nov" */}
          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-teal-300 border border-teal-500/30">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            {formatFullRelativeDate(primaryEntry?.date || new Date().toISOString(), {
              lang: language,
            })}
          </span>
        </div>

        {/* 10-Minute Duplicate Warning Banner */}
        {isDuplicateDetected && !duplicateAcknowledged && (
          <div className="mb-3.5 p-3.5 rounded-2xl bg-amber-950/90 border-2 border-amber-500 text-amber-100 flex flex-col gap-2 shadow-lg animate-pulse-gentle">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-bold text-sm">
                {t('duplicateEntryWarningTitle')}
              </span>
            </div>
            <p className="text-xs text-amber-200/90 pl-7 leading-relaxed">
              {t('duplicateEntryWarningDesc')}
            </p>
            <div className="flex items-center gap-2 pt-1 pl-7 flex-wrap">
              <button
                type="button"
                data-testid="duplicate-save-anyway-button"
                onClick={() => setDuplicateAcknowledged(true)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-sm shadow-md transition-transform active:scale-95 min-h-touch flex items-center justify-center"
              >
                {t('saveAnyway')}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-600 active:scale-95 min-h-touch flex items-center justify-center"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Customer Disambiguation Section (When multiple candidates match) */}
        {showDisambiguation && candidateCustomers.length > 1 && (
          <div className="mb-3 p-3 bg-slate-800/90 border-2 border-blue-500/60 rounded-2xl shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-black uppercase tracking-wider text-blue-300">
                  {t('whichCustomerTitle')} ({candidateCustomers.length})
                </span>
              </div>
              <span className="text-[10px] text-slate-400">1-Tap Select</span>
            </div>

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {candidateCustomers.map((c) => {
                const isSelected = selectedCustomer?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCustomer(c);
                      setCustomerName(c.name);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all min-h-[56px] active:scale-[0.98] ${
                      isSelected
                        ? 'bg-blue-950/90 border-blue-400 ring-2 ring-blue-400/40 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{c.name}</div>
                        {c.phone && (
                          <div className="text-[11px] text-slate-400">📱 {c.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-400">
                        ₹{c.balance.toLocaleString('en-IN')} {t('baakiOwed')}
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5 justify-end mt-0.5">
                          <Check className="w-3 h-3" /> Chuna gaya
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Option to create a new customer instead */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCustomer(null);
                  setShowDisambiguation(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 text-xs font-bold min-h-[48px] justify-center"
              >
                <UserPlus className="w-4 h-4 text-teal-400" />
                <span>+ {t('addNewCustomerTitle')} ("{customerName}")</span>
              </button>
            </div>
          </div>
        )}

        {/* Customer Name Field (Highlighted if low confidence) */}
        <div
          className={`mb-3 rounded-2xl p-3 border transition-all ${
            animatedField === 'customer'
              ? 'ring-4 ring-blue-400 bg-blue-500/20 scale-[1.02]'
              : isLowConfidenceCustomer
              ? 'border-2 border-amber-400 ring-2 ring-amber-400/40 bg-amber-500/10'
              : 'bg-slate-800/80 border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('customerName')}</span>
            </label>

            {isLowConfidenceCustomer && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                <AlertTriangle className="w-3 h-3" /> Check this
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setSelectedCustomer(null);
              }}
              className="w-full bg-transparent text-xl font-black text-white focus:outline-none tracking-tight"
              placeholder="Customer Name (e.g. Ramesh)"
            />
            {candidateCustomers.length > 1 && !showDisambiguation && (
              <button
                type="button"
                onClick={() => setShowDisambiguation(true)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-900/60 text-blue-300 border border-blue-600/40 text-xs font-bold"
              >
                Switch ({candidateCustomers.length})
              </button>
            )}
          </div>
        </div>

        {/* MULTI-ENTRY STACKED ROWS (if multiple parsed or compound entries) */}
        {isMultiRow ? (
          <div className="mb-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Stacked Entries ({entries.length} items)
              </span>
              <button
                type="button"
                onClick={addRow}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Aur jodein
              </button>
            </div>

            {entries.map((entry, idx) => {
              const rowIsCredit = entry.type === 'credit';
              const isRowLow = entry.isLowConfidence || entry.amount <= 0;

              return (
                <div
                  key={entry.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    isRowLow
                      ? 'border-2 border-amber-400 bg-amber-500/10'
                      : 'bg-slate-800/90 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      Entry #{idx + 1}
                      {entry.relativeDateLabel && ` (${entry.relativeDateLabel})`}
                    </span>

                    {/* Type Toggle in stacked row */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleType(idx, 'credit')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 ${
                          rowIsCredit
                            ? 'bg-amber-500 text-amber-950'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" /> {t('credit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleType(idx, 'payment')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 ${
                          !rowIsCredit
                            ? 'bg-emerald-500 text-emerald-950'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        <ArrowDownLeft className="w-3.5 h-3.5" /> {t('payment')}
                      </button>

                      {/* Remove Row Button */}
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 transition-colors ml-1"
                        aria-label="Remove entry row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Amount Row Input & Quick +/- */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-2xl font-black">
                      <span className="text-slate-400">₹</span>
                      <input
                        type="number"
                        value={entry.amount || ''}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setEntries((prev) =>
                            prev.map((it, i) => (i === idx ? { ...it, amount: val } : it))
                          );
                        }}
                        className={`w-32 bg-transparent text-2xl font-black focus:outline-none ${
                          rowIsCredit ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                        placeholder="0"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => adjustAmount(idx, -50)}
                        className="px-2 py-1 rounded bg-slate-700 text-[11px] font-bold text-slate-300"
                      >
                        -50
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustAmount(idx, 50)}
                        className="px-2 py-1 rounded bg-slate-700 text-[11px] font-bold text-slate-300"
                      >
                        +50
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Live Net Calculation Banner */}
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">
                {t('credit')}: <span className="text-amber-400">₹{totalCredit}</span> | {t('payment')}:{' '}
                <span className="text-emerald-400">₹{totalPayment}</span>
              </span>
              <span className="font-black text-sm">
                Net:{' '}
                <span className={netImpact >= 0 ? 'text-amber-400' : 'text-emerald-400'}>
                  {netImpact >= 0 ? `₹${netImpact} ${t('credit')}` : `₹${Math.abs(netImpact)} ${t('payment')}`}
                </span>
              </span>
            </div>
          </div>
        ) : (
          /* SINGLE-ENTRY HERO PREVIEW CARD */
          <div className="space-y-3 mb-4">
            {/* Credit / Udhaar vs Payment / Jama Toggle Buttons (Min 56px touch target) */}
            <div
              className={`grid grid-cols-2 gap-2 transition-all ${
                animatedField === 'type'
                  ? 'ring-4 ring-emerald-400 scale-[1.02] rounded-2xl'
                  : ''
              }`}
            >
              <button
                type="button"
                onClick={() => toggleType(0, 'credit')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-base transition-all min-h-[56px] active:scale-95 ${
                  isCredit
                    ? 'bg-amber-950/90 text-amber-300 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                    : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <ArrowUpRight className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.creditGiven[language]}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleType(0, 'payment')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-base transition-all min-h-[56px] active:scale-95 ${
                  !isCredit
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                    : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <ArrowDownLeft className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.paymentReceived[language]}</span>
              </button>
            </div>

            {/* Big Readable Amount Card (with low-confidence highlight & animation) */}
            <div
              className={`rounded-2xl p-4 text-center border transition-all ${
                animatedField === 'amount'
                  ? 'ring-4 ring-emerald-400 bg-emerald-500/20 scale-[1.03] shadow-xl animate-pulse'
                  : isLowConfidenceAmount
                  ? 'border-2 border-amber-400 ring-4 ring-amber-400/30 bg-amber-500/10'
                  : 'bg-slate-800/90 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Rakam (Amount)
                </span>

                {isLowConfidenceAmount && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" /> Check this (Dhyan dein)
                  </span>
                )}
              </div>

              {/* Huge Rupee Amount Display with Indian Grouping and direct keyboard edit */}
              <div className="flex items-center justify-center my-2">
                <span className={`text-4xl font-black mr-1 ${isCredit ? 'text-amber-400' : 'text-emerald-400'}`}>₹</span>
                <input
                  type="number"
                  value={primaryEntry?.amount || ''}
                  onChange={(e) => {
                    const val = Number(e.target.value) || 0;
                    setEntries((prev) =>
                      prev.map((it, i) => (i === 0 ? { ...it, amount: val, isLowConfidence: false } : it))
                    );
                  }}
                  className={`w-48 text-center bg-transparent text-5xl font-black tracking-tight focus:outline-none focus:border-b-2 ${
                    isCredit ? 'text-amber-400 border-amber-400' : 'text-emerald-400 border-emerald-400'
                  }`}
                  placeholder="0"
                  aria-label="Rakam (Amount in Rupees)"
                />
              </div>

              {/* Quick +/- pills */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => adjustAmount(0, -50)}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-black min-h-[40px] min-w-[50px] active:scale-95"
                >
                  -₹50
                </button>
                <button
                  type="button"
                  onClick={() => adjustAmount(0, -10)}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-black min-h-[40px] min-w-[50px] active:scale-95"
                >
                  -₹10
                </button>
                <button
                  type="button"
                  onClick={() => adjustAmount(0, 50)}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-black min-h-[40px] min-w-[50px] active:scale-95"
                >
                  +₹50
                </button>
                <button
                  type="button"
                  onClick={() => adjustAmount(0, 100)}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-black min-h-[40px] min-w-[50px] active:scale-95"
                >
                  +₹100
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VOICE CORRECTION BUTTON & SIMULATION CHIPS */}
        <div className="mb-4 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={isListeningCorrection ? stopVoiceCorrection : startVoiceCorrection}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all min-h-touch active:scale-95 shadow-md ${
                isListeningCorrection
                  ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/40'
                  : 'bg-primary-600 hover:bg-primary-500 text-white'
              }`}
            >
              {isListeningCorrection ? (
                <>
                  <MicOff className="w-5 h-5" />
                  <span>{t('micCaptionListening')}</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span>{t('correctByVoice')}</span>
                </>
              )}
            </button>

            {onOpenManual && (
              <button
                type="button"
                onClick={onOpenManual}
                className="flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs min-h-touch active:scale-95 border border-slate-600"
                title="Likh kar theek karein (Type instead)"
              >
                <Keyboard className="w-4 h-4 text-teal-400" />
                <span>Type form</span>
              </button>
            )}
          </div>

          {/* Voice Feedback String */}
          {voiceFeedbackText && (
            <p className="text-xs font-bold text-teal-300 mt-2 px-1 text-center animate-fade-in flex items-center justify-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>{voiceFeedbackText}</span>
            </p>
          )}

          {/* 1-Tap Quick Simulation Chips for Hackathon Testing */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">
              Demo voice:
            </span>
            <button
              type="button"
              onClick={() => handleVoiceCorrectionTranscript('nahi, 430')}
              className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] font-bold text-slate-200"
            >
              "nahi, 430"
            </button>
            <button
              type="button"
              onClick={() => handleVoiceCorrectionTranscript('jama mila')}
              className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] font-bold text-slate-200"
            >
              "jama mila"
            </button>
            <button
              type="button"
              onClick={() => handleVoiceCorrectionTranscript('haan save karo')}
              className="px-2 py-1 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-600/40 text-[11px] font-bold"
            >
              "haan save"
            </button>
            <button
              type="button"
              onClick={() => handleVoiceCorrectionTranscript('nahi cancel')}
              className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] font-bold text-slate-300"
            >
              "cancel"
            </button>
          </div>
        </div>

        {/* TWO HUGE ACTION BUTTONS (Min 64px height, Thumb-Reachable) */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2 shrink-0">
          {/* ✗ Reject Button (Grey) */}
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg border-2 border-slate-700 transition-all min-h-[64px] active:scale-95"
            aria-label="Reject and cancel entry"
          >
            <X className="w-6 h-6 text-slate-400" />
            <span>✗ {t('cancel')}</span>
          </button>

          {/* ✓ Save Button (Huge Green Gradient) */}
          <button
            type="button"
            onClick={handleSave}
            data-testid="confirm-save-button"
            disabled={
              entries.length === 0 ||
              entries.every((e) => e.amount <= 0) ||
              !customerName.trim()
            }
            className={`flex items-center justify-center gap-2 rounded-2xl font-black text-xl transition-all min-h-[64px] shadow-xl active:scale-95 ${
              entries.some((e) => e.amount > 0) && customerName.trim()
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-600/30 hover:from-emerald-500 hover:to-green-500 ring-2 ring-emerald-400/40'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
            aria-label="Confirm and save entry"
          >
            <Check className="w-6 h-6" />
            <span>✓ {t('save')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEntrySheet;
