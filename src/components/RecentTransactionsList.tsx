/**
 * Recent Entries List Component
 * Shows last 5 ledger transactions with:
 * - Customer name
 * - Amount component (with Indian digit grouping & color/icon by type)
 * - Relative time (formatRelativeDate: "Aaj", "Kal", "Parso")
 * - Navigation to /customers/:id
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { LedgerEntry } from '../services/types';
import { formatRelativeDate } from '../lib/format';
import { formatTime } from '../lib/formatters';
import { Amount } from './ui/Amount';
import { Card } from './ui/Card';
import { useI18n } from '../i18n/I18nContext';

interface RecentTransactionsListProps {
  entries: LedgerEntry[];
  onDeleteEntry: (id: string) => void;
  onSelectCustomer?: (customerId: string) => void;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  entries,
  onDeleteEntry,
  onSelectCustomer,
}) => {
  const navigate = useNavigate();
  const { language, t } = useI18n();

  // Show only last 5 entries as specified
  const last5Entries = entries.slice(0, 5);

  const handleEntryClick = (customerId: string) => {
    if (onSelectCustomer) {
      onSelectCustomer(customerId);
    } else {
      navigate(`/customers/${customerId}`);
    }
  };

  return (
    <section className="px-3.5 py-3 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary dark:text-primary-400" />
          {t('recentEntries')}
        </h3>
        <span className="text-[11px] font-bold text-slate-400">
          {t('last5Entries')}
        </span>
      </div>

      {last5Entries.length === 0 ? (
        <Card padding="md" className="text-center text-slate-400 text-xs font-medium py-6">
          {t('noEntriesYetPrompt')}
        </Card>
      ) : (
        <div className="space-y-2">
          {last5Entries.map((entry, index) => {
            const isCredit = entry.type === 'credit';
            const isBrandNew = index === 0 && (Date.now() - new Date(entry.createdAt || entry.date).getTime() < 120000);

            return (
              <div
                key={entry.id}
                onClick={() => handleEntryClick(entry.customerId)}
                className={`bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] shadow-sm min-h-[64px] ${isBrandNew ? 'new-entry-highlight ring-2 ring-teal-500/40' : ''
                  }`}
              >
                {/* Left: Icon & Customer Name & Relative Date */}
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isCredit
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-credit dark:text-credit-dark border-amber-300 dark:border-amber-700/60'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-payment dark:text-payment-dark border-emerald-300 dark:border-emerald-700/60'
                      }`}
                  >
                    {isCredit ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight truncate">
                      {entry.customerName || 'Customer'}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                      <span className={isCredit ? 'text-credit dark:text-credit-dark' : 'text-payment dark:text-payment-dark'}>
                        {isCredit ? t('creditBadge') : t('paymentBadge')}
                      </span>
                      <span> • </span>
                      <span>{formatRelativeDate(entry.date, { lang: language })}</span>
                      <span> {formatTime(entry.date, language)}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Delete button */}
                <div className="flex items-center space-x-2 shrink-0">
                  <Amount
                    value={entry.amount}
                    type={entry.type}
                    size="lg"
                    showIcon={false}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEntry(entry.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Delete entry"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default RecentTransactionsList;
