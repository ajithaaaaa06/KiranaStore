/**
 * Chip Component
 * Multi-purpose filter or selection chip with high-contrast active states.
 */

import React, { ReactNode } from 'react';

export type ChipVariant = 'default' | 'primary' | 'credit' | 'payment';

export interface ChipProps {
  label: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  count?: number | string;
  variant?: ChipVariant;
  className?: string;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  icon,
  count,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all select-none min-h-[44px] active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  // Variant classes based on selected vs unselected
  const getStyle = () => {
    if (selected) {
      switch (variant) {
        case 'credit':
          return 'bg-credit text-white shadow-sm ring-2 ring-credit/30';
        case 'payment':
          return 'bg-payment text-white shadow-sm ring-2 ring-payment/30';
        case 'primary':
        case 'default':
        default:
          return 'bg-primary text-white shadow-sm ring-2 ring-primary/30 dark:bg-primary-600';
      }
    }

    // Unselected
    return 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${getStyle()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black ${
            selected
              ? 'bg-white/20 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
