/**
 * Card Component
 * Accessible container with high contrast, rounded corners, and semantic tints.
 */

import React, { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'interactive' | 'credit' | 'payment' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-150';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantClasses = {
    // Default surface card
    default:
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100',
    // Interactive clickable card
    interactive:
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 dark:hover:border-teal-500/50 cursor-pointer active:scale-[0.99] text-slate-900 dark:text-slate-100',
    // Credit (Amber tint)
    credit:
      'bg-amber-50/70 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/50 shadow-sm text-amber-950 dark:text-amber-100',
    // Payment (Green tint)
    payment:
      'bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-600/50 shadow-sm text-emerald-950 dark:text-emerald-100',
    // Flat subtle
    flat:
      'bg-slate-100/80 dark:bg-slate-800/60 border border-transparent text-slate-900 dark:text-slate-100',
  };

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
