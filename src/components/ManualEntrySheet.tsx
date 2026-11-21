/**
 * ManualEntrySheet Component
 * 
 * Satisfies all requirements:
 * 1. Customer autocomplete (native-script & partial matching).
 * 2. Big numeric keypad (custom on-screen ATM/POS pad, NOT the OS keyboard).
 * 3. Credit / Payment toggle with semantic colors and icons.
 * 4. Date chips: "Aaj" / "Kal" / "Parso" / Pick date.
 * 5. Save button (min 56px touch target).
 * 6. Works 100% offline with zero mic permissions needed.
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  Calendar,
  Delete,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { Customer, TransactionType } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { formatRupees, formatRelativeDate } from '../lib/format';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from './ui/Toast';

interface ManualEntrySheetProps {
  customers: Customer[];
  onSave: (entry: {
    customerName: string;
    amount: number;
    type: TransactionType;
    date: string;
    notes?: string;
  }) => void;
  onClose: () => void;
}

export const ManualEntrySheet: React.FC<ManualEntrySheetProps> = ({
  customers,
  onSave,
  onClose,
}) => {
  const { language, t } = useI18n();
  const { showToast } = useToast();

  // 1. Customer State & Autocomplete
  const [customerName, setCustomerName] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [matchingSuggestions, setMatchingSuggestions] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 2. Custom Numeric Keypad Amount String
  const [amountStr, setAmountStr] = useState<string>('0');

  // 3. Transaction Type (Credit vs Payment)
  const [type, setType] = useState<TransactionType>('credit');

  // 4. Date Selection ("Aaj" | "Kal" | "Parso" | "custom")
  const [dateOption, setDateOption] = useState<'aaj' | 'kal' | 'parso' | 'custom'>('aaj');
  const [customDate, setCustomDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // 5. Notes
  const [notes, setNotes] = useState('');

  // Handle Autocomplete Filtering
  useEffect(() => {
    const trimmed = customerName.trim().toLowerCase();
    if (!trimmed) {
      setMatchingSuggestions([]);
      return;
    }

    const matches = customers.filter((c) => {
      const matchName = c.name.toLowerCase().includes(trimmed);
      const matchPhone = c.phone ? c.phone.includes(trimmed) : false;
      return matchName || matchPhone;
    });

    setMatchingSuggestions(matches.slice(0, 4));
  }, [customerName, customers]);

  // Keypad Handlers
  const handleKeyPress = (val: string) => {
    setAmountStr((prev) => {
      if (prev === '0') return val === '00' ? '0' : val;
      if (prev.length >= 7) return prev; // Max ₹99,99,999
      return prev + val;
    });
  };

  const handleBackspace = () => {
    setAmountStr((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleClear = () => {
    setAmountStr('0');
  };

  const handleAddPreset = (delta: number) => {
    const current = parseFloat(amountStr) || 0;
    setAmountStr((current + delta).toString());
  };

  // Compute final ISO date based on chip selection
  const computeFinalDate = (): string => {
    const now = new Date();
    if (dateOption === 'aaj') return now.toISOString();
    if (dateOption === 'kal') {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      return d.toISOString();
    }
    if (dateOption === 'parso') {
      const d = new Date(now);
      d.setDate(d.getDate() - 2);
      return d.toISOString();
    }
    return new Date(customDate).toISOString();
  };

  const numericAmount = parseFloat(amountStr) || 0;
  const isCredit = type === 'credit';

  const handleSave = () => {
    const trimmedName = (selectedCustomer ? selectedCustomer.name : customerName).trim();
    if (!trimmedName) {
      showToast('Grahak ka naam darj karein', { type: 'warning' });
      return;
    }
    if (numericAmount <= 0) {
      showToast('Rakam (Amount) ₹0 se zyada honi chahiye', { type: 'warning' });
      return;
    }

    onSave({
      customerName: trimmedName,
      amount: numericAmount,
      type,
      date: computeFinalDate(),
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-entry-title"
    >
      <div className="w-full max-w-md max-h-[94vh] overflow-y-auto bg-slate-900 border-t border-slate-700 rounded-t-3xl p-4 sm:p-5 shadow-2xl flex flex-col animate-slide-up text-white">
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />

        {/* Title */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span
            id="manual-entry-title"
            className="text-xs font-black uppercase tracking-wider text-slate-400"
          >
            Manual Entry (Bina Aawaz Entry)
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. CUSTOMER AUTOCOMPLETE */}
        <div className="mb-3 relative">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <User className="w-3.5 h-3.5 text-teal-400" />
            Grahak Ka Naam (Customer Autocomplete)
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setSelectedCustomer(null);
                setShowDropdown(true);
              }}
              placeholder="Grahak ka naam likhein..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-base font-black text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 min-h-touch"
            />
            {customerName && (
              <button
                type="button"
                onClick={() => {
                  setCustomerName('');
                  setSelectedCustomer(null);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown Suggestions */}
          {showDropdown && matchingSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl z-20 overflow-hidden divide-y divide-slate-700">
              {matchingSuggestions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCustomer(c);
                    setCustomerName(c.name);
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-700/80 text-left transition-colors min-h-[48px]"
                >
                  <div>
                    <span className="font-bold text-sm text-white block">{c.name}</span>
                    {c.phone && <span className="text-[11px] text-slate-400">📱 {c.phone}</span>}
                  </div>
                  <span className="text-xs font-black text-amber-400">
                    ₹{c.balance.toLocaleString('en-IN')} baaki
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. CREDIT / PAYMENT TOGGLE (Min 56px touch target) */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => setType('credit')}
            className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-sm transition-all min-h-[56px] active:scale-95 ${isCredit
              ? 'bg-amber-950/90 text-amber-300 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
              : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
          >
            <ArrowUpRight className="w-5 h-5 text-amber-400" />
            <span>{t.creditGiven[language]}</span>
          </button>

          <button
            type="button"
            onClick={() => setType('payment')}
            className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-sm transition-all min-h-[56px] active:scale-95 ${!isCredit
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
              : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
          >
            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
            <span>{t.paymentReceived[language]}</span>
          </button>
        </div>

        {/* 3. BIG AMOUNT DISPLAY */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-center mb-3">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 mb-0.5">
            <span>Rakam (Amount in ₹)</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div
            className={`text-4xl xs:text-5xl font-black tracking-tight my-1 ${isCredit ? 'text-amber-400' : 'text-emerald-400'
              }`}
          >
            {formatRupees(numericAmount)}
          </div>

          {/* Quick Increment Pills */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleAddPreset(50)}
              className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200"
            >
              +₹50
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset(100)}
              className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200"
            >
              +₹100
            </button>
            <button
              type="button"
              onClick={() => handleAddPreset(500)}
              className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200"
            >
              +₹500
            </button>
          </div>
        </div>

        {/* 4. CUSTOM BIG NUMERIC KEYPAD (Atm / POS Style, NOT the OS Keyboard) */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyPress(digit)}
              className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-2xl font-black text-white shadow-sm transition-transform active:scale-95 min-h-[56px] flex items-center justify-center select-none"
            >
              {digit}
            </button>
          ))}

          {/* Backspace Button */}
          <button
            type="button"
            onClick={handleBackspace}
            className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 shadow-sm transition-transform active:scale-95 min-h-[56px] flex items-center justify-center select-none"
            aria-label="Backspace"
          >
            <Delete className="w-6 h-6 text-amber-400" />
          </button>
        </div>

        {/* 5. DATE CHIPS: Aaj / Kal / Parso / Pick Date */}
        <div className="mb-3">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            Tarikh (Date)
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => setDateOption('aaj')}
              className={`py-2 px-2 rounded-xl text-xs font-black min-h-touch transition-all ${dateOption === 'aaj'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              Aaj (Today)
            </button>

            <button
              type="button"
              onClick={() => setDateOption('kal')}
              className={`py-2 px-2 rounded-xl text-xs font-black min-h-touch transition-all ${dateOption === 'kal'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              Kal (Yest)
            </button>

            <button
              type="button"
              onClick={() => setDateOption('parso')}
              className={`py-2 px-2 rounded-xl text-xs font-black min-h-touch transition-all ${dateOption === 'parso'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              Parso
            </button>

            <button
              type="button"
              onClick={() => setDateOption('custom')}
              className={`py-2 px-2 rounded-xl text-xs font-black min-h-touch transition-all ${dateOption === 'custom'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              Pick date
            </button>
          </div>

          {/* Custom Date Input if "Pick date" selected */}
          {dateOption === 'custom' && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
            />
          )}
        </div>

        {/* 6. OPTIONAL NOTE */}
        <div className="mb-4">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Vivaran / Note (e.g. Doodh, Cheeni, Dal)"
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* 7. SAVE BUTTON (Min 56px touch target) */}
        <button
          type="button"
          onClick={handleSave}
          data-testid="manual-save-button"
          disabled={numericAmount <= 0 || !customerName.trim()}
          className={`w-full flex items-center justify-center gap-2 rounded-2xl font-black text-lg transition-all min-h-[56px] shadow-xl active:scale-95 mt-auto ${numericAmount > 0 && customerName.trim()
            ? isCredit
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-amber-700/30 ring-2 ring-amber-400/40'
              : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-700/30 ring-2 ring-emerald-400/40'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
        >
          <Check className="w-6 h-6" />
          <span>✓ {t.confirmAndSave[language]}</span>
        </button>
      </div>
    </div>
  );
};

export default ManualEntrySheet;
