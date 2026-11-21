/**
 * Accessible Toast Notification System
 * Lightweight, zero-dependency toast provider and hook for user feedback.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (title: string, options?: { type?: ToastType; description?: string; duration?: number }) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, options?: { type?: ToastType; description?: string; duration?: number }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
      const newToast: ToastMessage = {
        id,
        title,
        type: options?.type || 'info',
        description: options?.description,
        duration: options?.duration || 3000,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, newToast.duration);
      }
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Toast Floating Container */}
      <div
        className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="w-full max-w-sm pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl flex items-start gap-3 animate-slide-up"
            role="status"
          >
            <span className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-payment dark:text-payment-dark" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-danger" />
              )}
              {toast.type === 'warning' && (
                <AlertCircle className="w-5 h-5 text-credit dark:text-credit-dark" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-primary dark:text-primary-400" />
              )}
            </span>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
