/**
 * Accessible Bottom Sheet Component
 * Slides up from bottom, does not hide viewport essentials, handles Escape and clicks.
 */

import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  children: ReactNode;
  maxHeight?: string;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  showHandle = true,
  showCloseButton = true,
  children,
  maxHeight = 'max-h-[90vh]',
  className = '',
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl p-5 shadow-sheet flex flex-col animate-slide-up ${maxHeight} ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        {/* Top Handle Bar */}
        {showHandle && (
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />
        )}

        {/* Header Bar */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-3 shrink-0">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h3>
            ) : (
              title || <div />
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Close bottom sheet"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
