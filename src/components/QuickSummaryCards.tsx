/**
 * Quick Summary Cards
 * Big numbers, high-contrast, Indian rupee grouping, and color + icon semantics.
 */

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { formatRupees } from '../lib/format';
import { DailySummary } from '../services/types';
import { useI18n } from '../i18n/I18nContext';

interface QuickSummaryCardsProps {
  summary: DailySummary;
  totalPendingBalance: number;
}

export const QuickSummaryCards: React.FC<QuickSummaryCardsProps> = ({
  summary,
  totalPendingBalance,
}) => {
  const { language, t } = useI18n();

  return (
    <section className="px-4 py-3 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {t('todaySummary')}
        </h2>
        <span className="text-xs font-semibold text-slate-500">
          {t('entriesCount', { count: summary.transactionCount })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Today's Credit Given */}
        <div className="bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-600/30 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
              <span className="p-1 rounded-md bg-rose-500/20 text-rose-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              {t('creditGiven')}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-rose-400 tracking-tight">
              {formatRupees(summary.totalCreditGiven, { lang: language })}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              {t('creditGivenTodaySub')}
            </p>
          </div>
        </div>

        {/* Today's Payment Received */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-600/30 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                <ArrowDownLeft className="w-3.5 h-3.5" />
              </span>
              {t('paymentReceived')}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-black text-emerald-400 tracking-tight">
              {formatRupees(summary.totalPaymentReceived, { lang: language })}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              {t('paymentReceivedTodaySub')}
            </p>
          </div>
        </div>
      </div>

      {/* Total Pending Udhaar Banner (Net Market Credit) */}
      <div className="mt-2.5 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400">
              {t('balanceOwed')} ({t('marketPending')})
            </span>
          </div>
        </div>
        <span className="text-lg font-black text-amber-400">
          {formatRupees(totalPendingBalance, { lang: language })}
        </span>
      </div>
    </section>
  );
};
