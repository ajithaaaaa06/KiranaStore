/**
 * Bottom Tab Bar Component (3 Primary Tabs)
 * 1. Home (Hero Mic) -> /
 * 2. Customers (Khata list) -> /customers
 * 3. Summary (Today's hisaab) -> /summary
 *
 * Guaranteed 56px min tap targets, high contrast active state.
 * Persistent layout that never overlaps the hero mic button.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mic, Users, BookOpen } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const BottomNavBar: React.FC = () => {
  const { t } = useI18n();

  // Localized tab labels from JSON dictionaries
  const tabs = [
    {
      to: '/',
      id: 'home',
      label: t('navHome'),
      icon: Mic,
    },
    {
      to: '/customers',
      id: 'customers',
      label: t('navCustomers'),
      icon: Users,
    },
    {
      to: '/summary',
      id: 'summary',
      label: t('navSummary'),
      icon: BookOpen,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 safe-area-pb shadow-sheet transition-colors"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.id}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 min-h-touch active:scale-95 ${
                  isActive
                    ? 'text-primary dark:text-primary-400 bg-teal-50 dark:bg-teal-950/60 font-black shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold'
                }`
              }
              aria-label={tab.label}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-6 h-6 transition-transform ${
                      isActive ? 'scale-110 text-primary dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span className="text-xs mt-1 tracking-tight truncate max-w-[100px]">
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNavBar;
