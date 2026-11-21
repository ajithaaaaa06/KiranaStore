/**
 * Badge Component
 * Status indicators with semantic color schemes.
 */

import React, { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'credit' | 'payment' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center gap-1 font-bold rounded-lg uppercase tracking-wider select-none shrink-0 border';

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const variantClasses = {
    // Primary: Deep Teal
    primary:
      'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700',
    // Credit: Amber (Udhaar Owed)
    credit:
      'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    // Payment: Green (Jama Mila)
    payment:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    // Danger: Red
    danger:
      'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
    // Neutral
    neutral:
      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
