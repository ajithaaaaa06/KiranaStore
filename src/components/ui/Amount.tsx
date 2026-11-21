/**
 * Amount Display Component
 * Formats Indian Rupee (₹) with Indian digit grouping (e.g. ₹1,24,500).
 * Semantic color & icon based on transaction type (credit/udhaar vs payment/jama).
 * Never relies on colour alone (Rule: adds icons and text labels).
 */

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Minus } from 'lucide-react';
import { formatRupees } from '../../lib/format';

export type AmountType = 'credit' | 'payment' | 'neutral' | 'danger';
export type AmountSize = 'sm' | 'md' | 'lg' | 'xl' | 'hero';

export interface AmountProps {
  value: number;
  type?: AmountType;
  size?: AmountSize;
  showIcon?: boolean;
  showTypeLabel?: boolean;
  showSign?: boolean;
  className?: string;
}

export const Amount: React.FC<AmountProps> = ({
  value,
  type = 'neutral',
  size = 'md',
  showIcon = true,
  showTypeLabel = false,
  showSign = false,
  className = '',
}) => {
  const formatted = formatRupees(value, { showSign, showSymbol: true });

  const sizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-base font-black',
    lg: 'text-xl font-black tracking-tight',
    xl: 'text-2xl font-black tracking-tight',
    hero: 'text-4xl xs:text-5xl font-black tracking-tight',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
    hero: 'w-8 h-8',
  };

  // Color semantics:
  // Credit/Udhaar Owed = Amber
  // Payment Received = Green
  const colorClasses = {
    credit: 'text-credit dark:text-credit-dark',
    payment: 'text-payment dark:text-payment-dark',
    danger: 'text-danger dark:text-danger-400',
    neutral: 'text-slate-900 dark:text-slate-100',
  };

  const typeLabels = {
    credit: 'Udhaar Owed',
    payment: 'Payment Received',
    danger: 'Alert',
    neutral: '',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${colorClasses[type]} ${className}`}>
      {showIcon && (
        <span className="shrink-0">
          {type === 'credit' && (
            <ArrowUpRight className={`${iconSizes[size]} text-credit dark:text-credit-dark`} />
          )}
          {type === 'payment' && (
            <ArrowDownLeft className={`${iconSizes[size]} text-payment dark:text-payment-dark`} />
          )}
          {type === 'danger' && (
            <Minus className={`${iconSizes[size]} text-danger`} />
          )}
        </span>
      )}

      <span className={sizeClasses[size]}>{formatted}</span>

      {showTypeLabel && typeLabels[type] && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
          ({typeLabels[type]})
        </span>
      )}
    </div>
  );
};
