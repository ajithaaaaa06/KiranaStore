/**
 * Customers (Grahak Khata Directory) Screen - Route /customers
 * 
 * 1. Search bar supporting native-script names (Devanagari, Kannada, Tamil, Telugu, English)
 *    and partial matching.
 * 2. Sorted by highest pending balance first.
 * 3. Each row: avatar initials, name, balance Amount, "last activity".
 * 4. Filter chips: All / Owes money / Settled.
 * 5. FAB-style "+ Add" is NOT needed (customers created by voice).
 * 6. Skeleton loaders & proper empty state.
 * 7. All numbers rendered using Amount component.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, User, Users, Clock, UserPlus } from 'lucide-react';
import { Customer } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { formatRelativeDate } from '../lib/format';
import { Chip, Amount, EmptyState, Skeleton, Button } from '../components/ui';
import { AddCustomerSheet } from '../components/AddCustomerSheet';
import { useI18n } from '../i18n/I18nContext';

export const CustomersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useI18n();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'settled'>('all');
  const [showAddCustomerSheet, setShowAddCustomerSheet] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const list = await ledgerService.getCustomers();
    // Strictly sort by highest balance descending
    list.sort((a, b) => b.balance - a.balance);
    setCustomers(list);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const handleRefresh = () => loadData();
    window.addEventListener('vk_refresh_data', handleRefresh);
    window.addEventListener('vk_entry_added', handleRefresh);
    window.addEventListener('vk_customer_added', handleRefresh);
    return () => {
      window.removeEventListener('vk_refresh_data', handleRefresh);
      window.removeEventListener('vk_entry_added', handleRefresh);
      window.removeEventListener('vk_customer_added', handleRefresh);
    };
  }, []);

  // Filter customers with native script and partial matching support
  const filtered = customers.filter((c) => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      const matchName = c.name.toLowerCase().includes(query);
      const matchPhone = c.phone ? c.phone.includes(query) : false;
      const matchNotes = c.notes ? c.notes.toLowerCase().includes(query) : false;
      if (!matchName && !matchPhone && !matchNotes) return false;
    }

    if (filterType === 'pending') return c.balance > 0;
    if (filterType === 'settled') return c.balance <= 0;
    return true;
  });

  // Dynamic avatar background generator based on name
  const getAvatarBg = (name: string, balance: number) => {
    if (balance > 0) return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
  };

  return (
    <div className="pb-32 pt-2 px-3.5 max-w-md mx-auto w-full">
      {/* Title Bar */}
      <div className="mb-3 px-1">
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>{t('customersTitle')}</span>
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {t('customersCountSorted', { count: customers.length })}
        </p>
      </div>

      {/* 1. Search Bar (Supports native-script names & partial matching) */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchCustomerPlaceholder')}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 shadow-sm min-h-touch"
          aria-label="Search customers by native script name or phone"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {t('clear')}
          </button>
        )}
      </div>

      {/* 2. Filter Chips: All / Owes money / Settled */}
      <div className="flex space-x-2 mb-3.5 overflow-x-auto pb-1">
        <Chip
          label={t('filterAll')}
          selected={filterType === 'all'}
          onClick={() => setFilterType('all')}
          count={customers.length}
        />
        <Chip
          label={t('filterOwes')}
          variant="credit"
          selected={filterType === 'pending'}
          onClick={() => setFilterType('pending')}
          count={customers.filter((c) => c.balance > 0).length}
        />
        <Chip
          label={t('filterSettled')}
          variant="payment"
          selected={filterType === 'settled'}
          onClick={() => setFilterType('settled')}
          count={customers.filter((c) => c.balance <= 0).length}
        />
      </div>

      {/* 3. Customer Directory List / Skeletons / Empty State */}
      <div className="space-y-2">
        {loading ? (
          // SKELETON LOADERS
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between min-h-[64px]"
              >
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" className="w-11 h-11" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="space-y-1.5 text-right flex flex-col items-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </>
        ) : filtered.length === 0 ? (
          // EMPTY STATE
          <EmptyState
            icon={<User className="w-8 h-8" />}
            title={customers.length === 0 ? t('noCustomersYet') : t('noCustomerFound')}
            description={
              customers.length === 0
                ? t('noCustomersDescription')
                : searchQuery
                ? t('noMatchingCustomerQuery', { query: searchQuery })
                : t('noCustomersInFilter')
            }
            action={
              customers.length === 0 ? (
                <div className="flex flex-col gap-2.5 w-full max-w-xs mx-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowAddCustomerSheet(true)}
                    className="min-h-[52px]"
                  >
                    <UserPlus className="w-5 h-5 mr-1" />
                    {t('addCustomerButton')}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/')}
                    className="min-h-[48px]"
                  >
                    {t('firstUdhaarVoice')}
                  </Button>
                </div>
              ) : undefined
            }
          />
        ) : (
          // CUSTOMER ROWS
          filtered.map((c) => {
            const hasPending = c.balance > 0;
            const isNewCustomer = c.totalCredit === 0 && c.totalPayment === 0;
            const initials = c.name.trim().charAt(0).toUpperCase() || 'G';
            const lastActivity = c.lastTransactionDate
              ? formatRelativeDate(c.lastTransactionDate, { lang: language })
              : 'N/A';

            return (
              <div
                key={c.id}
                onClick={() => navigate(`/customers/${c.id}`)}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] min-h-[64px] shadow-sm"
              >
                {/* Left: Avatar Initials + Name + Last Activity */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${getAvatarBg(
                      c.name,
                      c.balance
                    )}`}
                  >
                    {initials}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        {c.name}
                      </h4>
                      {isNewCustomer && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 shrink-0">
                          {t('badgeNew')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-0.5">
                      {c.phone && <span>📱 {c.phone}</span>}
                      {c.phone && <span>•</span>}
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{t('lastActivity', { date: lastActivity })}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Balance Amount + Chevron */}
                <div className="flex items-center space-x-2 text-right">
                  <div>
                    <Amount
                      value={c.balance}
                      type={hasPending ? 'credit' : 'payment'}
                      size="lg"
                      showIcon={hasPending}
                    />
                    <span
                      className={`block text-[10px] font-black uppercase tracking-wider ${hasPending
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                    >
                      {hasPending ? t('badgeOwes') : t('badgeSettled')}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Bottom Thumb Zone: "+ Add customer" Button (≥56px) */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-none">
        <button
          type="button"
          onClick={() => setShowAddCustomerSheet(true)}
          className="pointer-events-auto w-full min-h-[56px] h-14 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-black text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 border border-teal-500/50 transition-all cursor-pointer"
          aria-label="Add customer"
        >
          <UserPlus className="w-5 h-5" />
          <span>{t('addCustomerButton')}</span>
        </button>
      </div>

      {/* 5. Add Customer Sheet */}
      <AddCustomerSheet
        isOpen={showAddCustomerSheet}
        onClose={() => setShowAddCustomerSheet(false)}
        onCustomerCreated={(newCust) => {
          loadData();
          navigate(`/customers/${newCust.id}`);
        }}
        onSelectExisting={(existing) => {
          navigate(`/customers/${existing.id}`);
        }}
      />
    </div>
  );
};

export default CustomersScreen;
