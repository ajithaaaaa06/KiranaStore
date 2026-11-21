/**
 * Empty State Component
 * Displayed when no ledger entries or customers match filters.
 */

import React, { ReactNode } from 'react';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-primary dark:text-primary-400 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-1">
        {title}
      </h3>

      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[280px] mb-5">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  );
};
