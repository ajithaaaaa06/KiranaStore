/**
 * ReceiptModal Component
 * 
 * Clean printable layout:
 * - 58mm thermal-friendly width and A4-friendly (@media print styles).
 * - Displays shop name, customer name, phone, line items, balance, date/time.
 * - "Print" calls window.print().
 * - "Share" uses navigator.share() when available, with fallback to clipboard copy.
 */

import React, { useState } from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle,
  Copy,
  Receipt,
} from 'lucide-react';
import { Customer, LedgerEntry } from '../services/types';
import { useToast } from './ui/Toast';
import { useI18n } from '../i18n/I18nContext';
import { buildReminderMessage } from '../services/reminderMessage';

export interface ReceiptModalProps {
  customer: Customer;
  entries: LedgerEntry[];
  shopName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  customer,
  entries,
  shopName = 'Sri Lakshmi Kirana Store',
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const { t, language } = useI18n();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate plain text receipt using the unified message builder format
  const plainTextReceipt = buildReminderMessage({
    customerName: customer.name,
    amount: customer.balance,
    shopName,
    lang: language,
    entries,
  });

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Handle Share Action (navigator.share with clipboard fallback)
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: `${shopName} - Khata Slip (${customer.name})`,
          text: plainTextReceipt,
        });
        showToast(t('receiptSharedSuccess'), { type: 'success' });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User cancelled share dialog
      }
    }

    // Fallback: Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainTextReceipt);
      setCopied(true);
      showToast(t('receiptCopiedSuccess'), { type: 'success' });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:static"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col text-white print:border-none print:shadow-none print:p-0 print:max-h-none print:w-full print:bg-white print:text-black">
        {/* Modal Top Bar (Hidden during printing) */}
        <div className="flex items-center justify-between mb-3 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              {t('printReceipt')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center min-h-[40px] min-w-[40px]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* THERMAL PAPER SLIP (58mm Thermal & A4 Print Layout) */}
        {/* ============================================================ */}
        <div
          id="printable-receipt"
          className="receipt-thermal-paper bg-amber-50/95 dark:bg-white text-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-dashed border-slate-400 shadow-inner print:rounded-none print:border-none print:p-2 print:w-[58mm] print:mx-auto font-mono text-xs leading-relaxed whitespace-pre-wrap select-text"
        >
          {plainTextReceipt}
        </div>

        {/* Modal Action Buttons (Hidden during printing) */}
        <div className="grid grid-cols-2 gap-2 mt-4 print:hidden shrink-0">
          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm transition-all min-h-[52px] shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{t('printReceipt')}</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-black text-sm transition-all min-h-[52px] active:scale-95"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t('copied')}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{t('shareSlip')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
