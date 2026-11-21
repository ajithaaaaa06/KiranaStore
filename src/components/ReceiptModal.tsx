/**
 * ReceiptModal Component
 * 
 * Clean printable layout:
 * - 58mm thermal-friendly width and A4-friendly (@media print styles).
 * - Displays shop name, customer name, phone, line items, balance, date/time.
 * - "Print" calls window.print().
 * - "Share" uses navigator.share() when available, with fallback to clipboard copy.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle,
  Copy,
  Receipt,
  Store,
  Calendar,
  QrCode,
} from 'lucide-react';
import { Customer, LedgerEntry } from '../services/types';
import { formatRupees, formatFullRelativeDate } from '../lib/format';
import { formatTime } from '../lib/formatters';
import { useToast } from './ui/Toast';
import { ledgerService } from '../services/ledgerService';
import { buildUpiLink, generateQrDataUrl } from '../services/upiPayment';

export interface ReceiptModalProps {
  customer: Customer;
  entries: LedgerEntry[];
  shopName?: string;
  upiId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  customer,
  entries,
  shopName = 'Sri Lakshmi Kirana Store',
  upiId: propUpiId,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [loadedUpiId, setLoadedUpiId] = useState<string>('');

  useEffect(() => {
    if (propUpiId) {
      setLoadedUpiId(propUpiId);
    } else if (isOpen) {
      ledgerService.getProfile?.().then((prof) => {
        if (prof?.upiId) {
          setLoadedUpiId(prof.upiId);
        }
      });
    }
  }, [propUpiId, isOpen]);

  const activeUpiId = propUpiId || loadedUpiId;

  const qrDataUrl = useMemo(() => {
    if (!activeUpiId) return '';
    const link = buildUpiLink({
      upiId: activeUpiId,
      shopName,
      amount: customer.balance > 0 ? customer.balance : undefined,
      note: `Khata - ${customer.name}`,
    });
    return generateQrDataUrl(link, 4, 3);
  }, [activeUpiId, shopName, customer.balance, customer.name]);

  if (!isOpen) return null;

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const currentTimeFormatted = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Generate plain text receipt for sharing or copying
  const plainTextReceipt = `
========================================
       ${shopName.toUpperCase()}
           KHATA RECEIPT SLIP
========================================
Date: ${currentDateFormatted}, ${currentTimeFormatted}
Customer: ${customer.name}
Phone: ${customer.phone ? `+91 ${customer.phone}` : 'N/A'}
----------------------------------------
STATEMENT (RECENT TRANSACTIONS):
${entries
  .slice(0, 5)
  .map(
    (e) =>
      `${new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}: ${
        e.type === 'credit' ? 'Udhaar' : 'Jama'
      } - ₹${e.amount.toLocaleString('en-IN')}${e.note ? ` (${e.note})` : ''}`
  )
  .join('\n')}
----------------------------------------
Total Udhaar: ₹${customer.totalCredit.toLocaleString('en-IN')}
Total Jama:   ₹${customer.totalPayment.toLocaleString('en-IN')}
----------------------------------------
*BALANCE OWED: ₹${customer.balance.toLocaleString('en-IN')}*
${activeUpiId ? `----------------------------------------\nScan & Pay via UPI:\nUPI ID: ${activeUpiId}\n` : ''}========================================
   Thank you for shopping with us!
   Powered by Voice Khata PWA
========================================
  `.trim();

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
        showToast('Receipt share ho gayi!', { type: 'success' });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User cancelled share dialog
      }
    }

    // Fallback: Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(plainTextReceipt);
      setCopied(true);
      showToast('Receipt text clipboard me copy ho gaya!', { type: 'success' });
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
              Printable Khata Receipt
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
          className="receipt-thermal-paper bg-amber-50/95 dark:bg-white text-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-dashed border-slate-400 shadow-inner print:rounded-none print:border-none print:p-2 print:w-[58mm] print:mx-auto font-mono text-xs leading-tight"
        >
          {/* Header */}
          <div className="text-center pb-2.5 border-b border-dashed border-slate-400">
            <h2 className="text-sm font-black tracking-tight uppercase">
              {shopName}
            </h2>
            <p className="text-[10px] text-slate-600 mt-0.5">
              KHATA STATEMENT SLIP
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {currentDateFormatted} • {currentTimeFormatted}
            </p>
          </div>

          {/* Customer Metadata */}
          <div className="py-2.5 border-b border-dashed border-slate-400 space-y-0.5">
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">Grahak:</span>
              <span className="font-black text-slate-900">{customer.name}</span>
            </div>
            {customer.phone && (
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span>+91 {customer.phone}</span>
              </div>
            )}
          </div>

          {/* Line Items Statement */}
          <div className="py-2.5 border-b border-dashed border-slate-400">
            <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">
              Pichle Hisaab (Recent Entries):
            </span>
            <div className="space-y-1">
              {entries.slice(0, 5).map((e) => {
                const isCredit = e.type === 'credit';
                return (
                  <div key={e.id} className="flex justify-between items-start text-[11px]">
                    <div>
                      <span className="font-bold">
                        {isCredit ? '[UDHAAR]' : '[JAMA]'}
                      </span>{' '}
                      <span className="text-slate-600">
                        {formatFullRelativeDate(e.date)}
                      </span>
                      {e.note && (
                        <span className="block text-[10px] text-slate-500 italic pl-1">
                          - {e.note}
                        </span>
                      )}
                    </div>
                    <span className="font-black">
                      ₹{e.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Totals */}
          <div className="py-2.5 border-b-2 border-slate-900 space-y-1">
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Kul Udhaar:</span>
              <span>₹{customer.totalCredit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Kul Jama:</span>
              <span>₹{customer.totalPayment.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-1 border-t border-slate-300 text-slate-900">
              <span>KUL BAAKI:</span>
              <span className="text-base font-black">
                ₹{customer.balance.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* UPI Payment QR Slip Section */}
          {activeUpiId && qrDataUrl && (
            <div className="py-2.5 border-b border-dashed border-slate-400 text-center flex flex-col items-center">
              <span className="text-[10px] font-black uppercase text-slate-700 block mb-1">
                Scan to Pay via UPI
              </span>
              <img
                src={qrDataUrl}
                alt="UPI Payment QR"
                className="w-24 h-24 mx-auto my-1 border border-slate-300 p-1 bg-white rounded"
              />
              <span className="text-[10px] font-bold text-slate-800 font-mono block">
                UPI ID: {activeUpiId}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-3 text-[10px] text-slate-500 space-y-0.5">
            <p className="font-bold">Vyapar ke liye dhanyawad! 🙏</p>
            <p>Powered by Voice Khata PWA</p>
          </div>
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
            <span>Print Receipt</span>
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
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Slip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
