/**
 * BalanceAnswerCard Component
 * Shown for queries like "Ramesh ka total?":
 * - Customer name
 * - Giant balance display: "₹140 baaki" / "₹0 clear"
 * - Replay button to listen to spoken soundbox answer again
 * - Last 3 transactions list
 * - Primary Action Buttons: "Send reminder" (WhatsApp) & "View khata" (Customer profile)
 * - Dev response time badge (hidden unless ?debug=1) to verify <2s SLA target
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Send,
  User,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Volume2,
  RotateCcw,
  Clock,
  ExternalLink,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { Customer, LedgerEntry } from '../services/types';
import { formatRupees, formatFullRelativeDate } from '../lib/format';
import { ledgerService } from '../services/ledgerService';
import { useI18n } from '../i18n/I18nContext';
import { useSpeak } from '../hooks/useSpeak';
import { useSettings } from '../hooks/useSettings';
import { ReminderSheet } from './ReminderSheet';

export interface BalanceAnswerCardProps {
  customer: Customer;
  recentTransactions?: LedgerEntry[];
  responseTimeMs?: number;
  onClose: () => void;
  onViewCustomer?: (customerId: string) => void;
}

export const BalanceAnswerCard: React.FC<BalanceAnswerCardProps> = ({
  customer,
  recentTransactions = [],
  responseTimeMs,
  onClose,
  onViewCustomer,
}) => {
  const navigate = useNavigate();
  const { language, t } = useI18n();
  const { settings } = useSettings();
  const { speakBalance, isSpeaking } = useSpeak();
  const [showReminderSheet, setShowReminderSheet] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(customer);

  // Check if ?debug=1 is in URL query parameters
  const [isDebugMode, setIsDebugMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIsDebugMode(params.get('debug') === '1');
    }
  }, []);

  // WhatsApp reminder URL and text
  const { url: waUrl, text: reminderText } = ledgerService.generateWhatsAppReminder(
    customer,
    language,
    settings.shopName
  );

  const isOwed = customer.balance > 0;
  const isClear = customer.balance === 0;
  const isAdvance = customer.balance < 0;

  // Speak on replay
  const handleReplayVoice = () => {
    speakBalance(customer.name, customer.balance, language);
  };

  // Navigate to customer khata view
  const handleViewKhata = () => {
    if (onViewCustomer) {
      onViewCustomer(customer.id);
    } else {
      navigate(`/customers/${customer.id}`);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="balance-answer-title"
    >
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl flex flex-col animate-slide-up text-white">
        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />

        {/* Top Header with Customer and Close */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black">
              {customer.name.charAt(0)}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                {t('balanceInquiryTitle')}
              </span>
              <h2
                id="balance-answer-title"
                className="text-lg font-black text-white tracking-tight"
              >
                {customer.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dev Response Time Badge (Visible if ?debug=1) */}
            {isDebugMode && responseTimeMs !== undefined && (
              <span
                className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-full border ${
                  responseTimeMs < 2000
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                    : 'bg-amber-950 text-amber-300 border-amber-500/50'
                }`}
                title="Response Time Benchmark (<2s Target)"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{responseTimeMs}ms</span>
                {responseTimeMs < 2000 && <span>✓</span>}
              </span>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors min-h-touch min-w-touch"
              aria-label="Close card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GIANT BALANCE HERO CARD */}
        <div
          className={`rounded-2xl p-5 text-center mb-4 border transition-all ${
            isOwed
              ? 'bg-gradient-to-br from-amber-950/70 via-slate-800 to-slate-900 border-amber-500/50 shadow-lg shadow-amber-950/30'
              : 'bg-gradient-to-br from-emerald-950/70 via-slate-800 to-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/30'
          }`}
        >
          {/* Header row in card: Balance Label + Replay Voice Button */}
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-xs font-black uppercase tracking-wider ${
                isOwed ? 'text-amber-300' : 'text-emerald-300'
              }`}
            >
              {isOwed ? t('outstandingUdhaar') : isClear ? t('allSettled') : t('advancePayment')}
            </span>

            {/* Replay Spoken Voice Button */}
            <button
              type="button"
              onClick={handleReplayVoice}
              disabled={isSpeaking}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all min-h-[36px] active:scale-95 ${
                isSpeaking
                  ? 'bg-amber-500 text-amber-950 animate-pulse'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
              title="Replay voice"
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  <span>{t('speaking')}</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
                  <span>{t('listenReplay')}</span>
                </>
              )}
            </button>
          </div>

          {/* Giant Amount (e.g. ₹140 baaki) */}
          <div className="my-2">
            <div
              className={`text-5xl font-black tracking-tight ${
                isOwed ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {formatRupees(customer.balance)}
            </div>
            <div
              className={`text-base font-bold mt-1 ${
                isOwed ? 'text-amber-300/90' : 'text-emerald-300/90'
              }`}
            >
              {isOwed ? t('baakiOwed') : isClear ? t('allSettled') : t('advancePayment')}
            </div>
          </div>

          {/* Breakdown Pills: Total Udhaar vs Total Jama */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-300 mt-3 pt-3 border-t border-slate-700/60">
            <div className="flex items-center gap-1">
              <span className="text-slate-400">{t('totalCreditLabel')}:</span>
              <span className="text-amber-400">{formatRupees(customer.totalCredit)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">{t('totalPaymentLabel')}:</span>
              <span className="text-emerald-400">{formatRupees(customer.totalPayment)}</span>
            </div>
          </div>
        </div>

        {/* LAST 3 TRANSACTIONS LIST */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {t('recentEntriesReceipt')}
            </span>
            <span className="text-[11px] text-slate-500">{t('latestFirst')}</span>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-center text-xs text-slate-400 font-medium">
              {t('noEntriesYet')}
            </div>
          ) : (
            <div className="space-y-1.5">
              {recentTransactions.slice(0, 3).map((tx) => {
                const isCredit = tx.type === 'credit';
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs min-h-[44px]"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isCredit
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {isCredit ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-200 block">
                          {isCredit ? t('creditGiven') : t('paymentReceived')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatFullRelativeDate(tx.date, { lang: language })}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-black text-sm ${
                        isCredit ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {formatRupees(tx.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 1-TAP ACTION BUTTONS (Min 56px touch target) */}
        <div className="grid grid-cols-2 gap-2.5 mt-auto pt-2 shrink-0">
          {/* Send Reminder Button (WhatsApp) */}
          <button
            type="button"
            onClick={() => setShowReminderSheet(true)}
            disabled={!isOwed}
            className={`flex items-center justify-center gap-2 rounded-2xl font-black text-sm sm:text-base transition-all min-h-[56px] shadow-lg active:scale-95 ${
              isOwed
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
            aria-label="Send WhatsApp payment reminder"
          >
            <Send className="w-5 h-5" />
            <span>{t('sendReminder')}</span>
          </button>

          {/* View Khata Button (Customer Profile) */}
          <button
            type="button"
            onClick={handleViewKhata}
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-sm sm:text-base border-2 border-slate-700 transition-all min-h-[56px] active:scale-95"
            aria-label="View customer ledger account"
          >
            <User className="w-5 h-5 text-blue-400" />
            <span>{t('viewKhata')}</span>
          </button>
        </div>
      </div>

      {/* Reminder Sheet Modal */}
      <ReminderSheet
        customer={currentCustomer}
        shopName={settings.shopName}
        isOpen={showReminderSheet}
        onClose={() => setShowReminderSheet(false)}
        onCustomerUpdated={(updated) => setCurrentCustomer(updated)}
      />
    </div>
  );
};

export default BalanceAnswerCard;
