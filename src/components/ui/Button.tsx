/**
 * Accessible Button Component
 * Min tap targets: lg (56px), xl (64px).
 * Variants: primary (deep teal), secondary, ghost, danger.
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  // Base classes with high contrast, bold fonts, and touch minimums
  const baseClasses =
    'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-150 select-none active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  // Minimum touch sizes: lg is 56px, xl is 64px
  const sizeClasses = {
    lg: 'min-h-touch text-base px-6 py-3.5 gap-2.5',
    xl: 'min-h-touch-lg text-lg px-8 py-4 gap-3',
  };

  // Semantic color variants
  const variantClasses = {
    // Primary: Deep Teal
    primary:
      'bg-primary hover:bg-primary-800 text-white shadow-md shadow-primary/25 focus:ring-primary dark:bg-primary-600 dark:hover:bg-primary-500',
    // Secondary: High contrast border & surface
    secondary:
      'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm focus:ring-slate-400',
    // Ghost: Subtle hover
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400',
    // Danger: High-contrast Alert Red
    danger:
      'bg-danger hover:bg-danger-700 text-white shadow-md shadow-danger/25 focus:ring-danger',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}

      <span>{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
