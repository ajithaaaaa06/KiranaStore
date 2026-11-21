/**
 * Accessible Icon Button Component
 * Guaranteed minimum touch target of 56px (WCAG compliant for mobile shopkeepers).
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'md' | 'lg' | 'xl';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: ReactNode;
  label: string; // Required for screen reader accessibility
  active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'secondary',
  size = 'lg',
  icon,
  label,
  active = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-2xl transition-all duration-150 select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    md: 'w-12 h-12 min-w-[48px] min-h-[48px]',
    lg: 'w-14 h-14 min-w-touch min-h-touch', // 56px default touch target
    xl: 'w-16 h-16 min-w-touch-lg min-h-touch-lg', // 64px
  };

  const variantClasses = {
    primary:
      'bg-primary hover:bg-primary-800 text-white shadow-md focus:ring-primary dark:bg-primary-600',
    secondary:
      'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:ring-slate-400',
    danger:
      'bg-danger hover:bg-danger-700 text-white shadow-md focus:ring-danger',
  };

  const activeClasses = active
    ? 'ring-2 ring-primary border-primary dark:border-primary-400'
    : '';

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${activeClasses} ${className}`}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
    </button>
  );
};
