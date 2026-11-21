/**
 * Customer Ledger Detail Screen (/customers/:id)
 * 
 * 1. Header with big balance: customer name, phone, giant balance Amount component.
 * 2. Timeline of entries grouped by date, credit vs payment with icons.
 * 3. Action buttons: "Send WhatsApp reminder", "Print receipt", "Add payment" (opens mic pre-filled).
 * 4. Empty states and skeleton loaders.
 * 5. All numbers rendered using Amount component.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Send,
  Printer,
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
  Mic,
  Calendar,
  CheckCircle2,
  Wallet,
  Clock,
  Plus,
  MessageCircle,
} from 'lucide-react';
import { Customer, LedgerEntry, TransactionType } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { formatRelativeDate, formatFullRelativeDate } from '../lib/format';
import { formatTime } from '../lib/formatters';
import { Button, Card, Amount, EmptyState, Skeleton, BottomSheet, useToast } from '../components/ui';
import { ReminderSheet } from '../components/ReminderSheet';
import { ReceiptModal } from '../components/ReceiptModal';
import { useI18n } from '../i18n/I18nContext';
import { useSpeak } from '../hooks/useSpeak';
import { useSettings } from '../hooks/useSettings';

export const CustomerDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useI18n();
  const { settings } = useSettings();
  const { speakBalance, speakConfirmation } = useSpeak();
  const { showToast } = useToast();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Reminder Sheet & Receipt Modal States
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Add Payment Modal State (Pre-filled for this customer)
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<TransactionType>('payment');
  const [paymentNote, setPaymentNote] = useState('');

  // Load customer and their ledger entries
  const loadCustomerData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const cust = await ledgerService.getCustomerById(id);
    if (cust) {
      setCustomer(cust);
      const custEntries = await ledgerService.getCustomerEntries(id);
      setEntries(custEntries);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadCustomerData();
  }, [loadCustomerData]);

  // Handle Adding Payment for this customer
  const handleSavePayment = async () => {
    if (!customer || !paymentAmount) return;
    const val = parseFloat(paymentAmount);
    if (isNaN(val) || val <= 0) {
      showToast(t('enterValidAmount'), { type: 'warning' });
      return;
    }

    await ledgerService.addEntry(
      {
        customerId: customer.id,
        customerName: customer.name,
        amount: val,
        type: paymentType,
        date: new Date().toISOString(),
        note: paymentNote.trim() || undefined,
        rawTranscript: `Payment: ${customer.name} ₹${val}`,
      },
      customer.name
    );

    speakConfirmation(customer.name, val, paymentType, language);
    showToast(`${customer.name}: ₹${val} ${paymentType === 'payment' ? t('payment') : t('credit')} - ${t('entrySavedSuccess')}`, {
      type: 'success',
    });

    setPaymentAmount('');
    setPaymentNote('');
    setIsPaymentSheetOpen(false);
    await loadCustomerData();
  };

  // Handle Delete Entry
  const handleDeleteEntry = async (entryId: string) => {
    if (confirm(t('deleteEntryConfirm'))) {
      await ledgerService.deleteEntry(entryId);
      showToast(t('entryDeletedToast'), { type: 'info' });
      await loadCustomerData();
    }
  };

  // Group entries by date
  const groupedEntries = entries.reduce<Record<string, LedgerEntry[]>>((acc, entry) => {
    const dateKey = entry.date.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(entry);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedEntries).sort((a, b) => b.localeCompare(a));

  if (loading) {
    return (
      <div className="pb-32 pt-2 px-3.5 max-w-md mx-auto w-full space-y-4">
        {/* Skeleton Header */}
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-12 h-12" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-36 w-full rounded-3xl" />
        <div className="space-y-3 pt-2">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="pb-32 pt-6 px-3.5 max-w-md mx-auto w-full">
        <EmptyState
          icon={<Wallet className="w-8 h-8" />}
          title={t('customerNotFoundTitle')}
          description={t('customerNotFoundDesc')}
          action={
            <Button variant="primary" size="lg" onClick={() => navigate('/customers')}>
              {t('viewCustomersList')}
            </Button>
          }
        />
      </div>
    );
  }

  const hasPending = customer.balance > 0;

  return (
    <div className="pb-32 pt-2 px-3.5 max-w-md mx-auto w-full">
      {/* 1. Header with Back Button */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/customers')}
            className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-transform active:scale-95 shadow-sm min-h-[44px] min-w-[44px]"
            aria-label="Back to customers list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {customer.name}
            </h2>
            {customer.phone && (
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                📱 +91 {customer.phone}
              </p>
            )}
            {customer.lastRemindedAt && (
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <MessageCircle className="w-3 h-3" />
                <span>{t('lastReminder')}: {formatFullRelativeDate(customer.lastRemindedAt, { lang: language })}</span>
              </p>
            )}
          </div>
        </div>

        {/* Listen Balance Button */}
        <button
          onClick={() => speakBalance(customer.name, customer.balance, language)}
          className="p-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 text-xs font-bold active:scale-95 min-h-[44px]"
          title="Speak balance aloud"
        >
          <Mic className="w-4 h-4 text-amber-500" />
          <span>{t('listenBalance')}</span>
        </button>
      </div>

      {/* 2. Header with Big Balance Card */}
      <div
        className={`rounded-3xl p-5 text-center mb-4 border transition-all ${
          hasPending
            ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50/40 dark:from-amber-950/70 dark:via-slate-900 dark:to-slate-900 border-amber-300 dark:border-amber-500/40 shadow-md'
            : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 dark:from-emerald-950/70 dark:via-slate-900 dark:to-slate-900 border-emerald-300 dark:border-emerald-500/40 shadow-md'
        }`}
      >
        <span
          className={`text-xs font-black uppercase tracking-wider block mb-1 ${
            hasPending ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {hasPending ? t('outstandingUdhaar') : t('allSettled')}
        </span>

        {/* Giant Balance Amount Component */}
        <div className="my-1 flex items-center justify-center">
          <Amount
            value={customer.balance}
            size="hero"
            type={hasPending ? 'credit' : 'payment'}
            showIcon={hasPending}
          />
        </div>

        <p
          className={`text-sm font-bold ${
            hasPending ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-600 dark:text-emerald-300'
          }`}
        >
          {hasPending ? t('amountToReceive') : t('zeroBalance')}
        </p>

        {/* Breakdown of Credit vs Payment */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{t('totalCreditLabel')}</span>
            <Amount value={customer.totalCredit} type="credit" size="sm" />
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{t('totalPaymentLabel')}</span>
            <Amount value={customer.totalPayment} type="payment" size="sm" />
          </div>
        </div>

        {customer.lastRemindedAt && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t('lastReminder')}:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {formatFullRelativeDate(customer.lastRemindedAt, { lang: language })}
            </span>
          </div>
        )}
      </div>

      {/* 3. Primary Action Buttons (Min 56px touch target) */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {/* Send WhatsApp Reminder */}
        <button
          onClick={() => setIsReminderOpen(true)}
          disabled={!hasPending}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl font-black text-xs transition-all min-h-[56px] border ${
            hasPending
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600 shadow-md active:scale-95'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60'
          }`}
        >
          <Send className="w-5 h-5 mb-1" />
          <span>{t('whatsappReminder')}</span>
        </button>

        {/* Print / Copy Receipt */}
        <button
          onClick={() => setIsReceiptOpen(true)}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs text-slate-700 dark:text-slate-200 transition-all min-h-[56px] shadow-sm active:scale-95"
        >
          <Printer className="w-5 h-5 mb-1 text-blue-500" />
          <span>{t('printReceipt')}</span>
        </button>

        {/* Add Payment Button (Pre-filled for this customer) */}
        <button
          onClick={() => {
            setPaymentType('payment');
            setIsPaymentSheetOpen(true);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white border border-teal-600 font-black text-xs transition-all min-h-[56px] shadow-md active:scale-95"
        >
          <Plus className="w-5 h-5 mb-1" />
          <span>{t('addPayment')}</span>
        </button>
      </div>

      {/* 4. Timeline of Entries (Grouped by Date) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-500" />
            {t('khataTimeline')} ({entries.length} {t('entries')})
          </span>
          <span className="text-[11px] font-semibold text-slate-400">{t('latestFirst')}</span>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={<Calendar className="w-8 h-8" />}
            title={t('noEntriesYet')}
            description={t('noEntriesCustomerDesc')}
            action={
              <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setPaymentType('credit');
                    setIsPaymentSheetOpen(true);
                  }}
                  className="flex-1 min-h-[48px]"
                >
                  {t('addUdhaar')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setPaymentType('payment');
                    setIsPaymentSheetOpen(true);
                  }}
                  className="flex-1 min-h-[48px]"
                >
                  {t('addPayment')}
                </Button>
              </div>
            }
          />
        ) : (
          sortedDateKeys.map((dateKey) => {
            const dayEntries = groupedEntries[dateKey];
            const dateLabel = formatFullRelativeDate(dateKey, { lang: language });

            return (
              <div key={dateKey} className="space-y-2">
                {/* Date Group Header */}
                <div className="sticky top-0 z-10 py-1 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-teal-500" />
                    {dateLabel}
                  </span>
                </div>

                {/* Day Entries List */}
                <div className="space-y-2 pl-2 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                  {dayEntries.map((entry) => {
                    const isCredit = entry.type === 'credit';
                    return (
                      <div
                        key={entry.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isCredit
                                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                            }`}
                          >
                            {isCredit ? (
                              <ArrowUpRight className="w-5 h-5" />
                            ) : (
                              <ArrowDownLeft className="w-5 h-5" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-900 dark:text-white">
                                {isCredit ? t('creditGiven') : t('paymentReceived')}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400">
                                {formatTime(entry.date)}
                              </span>
                            </div>

                            {entry.note && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {t('noteOptional')}: {entry.note}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Amount & Delete Action */}
                        <div className="flex items-center space-x-2">
                          <Amount
                            value={entry.amount}
                            type={isCredit ? 'credit' : 'payment'}
                            size="md"
                            showIcon={false}
                          />

                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                            aria-label="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Add Entry Bottom Sheet (Pre-filled for this customer) */}
      <BottomSheet
        isOpen={isPaymentSheetOpen}
        onClose={() => setIsPaymentSheetOpen(false)}
        title={`${customer.name} - ${t('addEntry')}`}
      >
        <div className="space-y-4 pt-1">
          {/* Credit vs Payment Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentType('credit')}
              className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-sm min-h-[52px] ${
                paymentType === 'credit'
                  ? 'bg-amber-500 text-amber-950 border-amber-500 ring-2 ring-amber-400/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>{t('creditGiven')}</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentType('payment')}
              className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-black text-sm min-h-[52px] ${
                paymentType === 'payment'
                  ? 'bg-emerald-500 text-emerald-950 border-emerald-500 ring-2 ring-emerald-400/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>{t('paymentReceived')}</span>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1 block">
              {t('amountInRupees')}
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="0"
              autoFocus
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-3xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Note Input */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1 block">
              {t('noteOptional')}
            </label>
            <input
              type="text"
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              placeholder={t('notePlaceholder')}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Save Button */}
          <Button
            variant="primary"
            size="xl"
            fullWidth
            onClick={handleSavePayment}
            disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
            className="min-h-[56px] text-base"
          >
            ✓ {t('saveEntry')}
          </Button>
        </div>
      </BottomSheet>

      {/* 6. WhatsApp Reminder Sheet with Multi-Language Templates */}
      <ReminderSheet
        customer={customer}
        entries={entries}
        shopName={settings.shopName}
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        onCustomerUpdated={(updated) => setCustomer(updated)}
      />

      {/* 7. Printable Khata Receipt Modal (58mm Thermal & A4 Friendly) */}
      <ReceiptModal
        customer={customer}
        entries={entries}
        shopName={settings.shopName}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
};

export default CustomerDetailScreen;
