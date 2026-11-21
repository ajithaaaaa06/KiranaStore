/**
 * PwaUpdateToast Component
 * 
 * Uses vite-plugin-pwa's useRegisterSW hook to listen for service worker updates.
 * When a new version is detected:
 * Displays a non-intrusive floating banner: "New version – tap to refresh"
 * Tapping triggers updateServiceWorker(true) for an instant seamless reload.
 */

import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Sparkles, RefreshCw } from 'lucide-react';

export const PwaUpdateToast: React.FC = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (import.meta.env.DEV) {
        console.log('[PWA] Service Worker registered:', r);
      }
    },
    onRegisterError(error) {
      console.warn('[PWA] Service Worker registration failed:', error);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed top-4 left-3 right-3 z-50 max-w-md mx-auto p-3.5 rounded-2xl bg-teal-950/95 border border-teal-500/50 shadow-2xl backdrop-blur-md text-white flex items-center justify-between animate-slideDown select-none">
      <div className="flex items-center gap-2.5 min-w-0 pr-2">
        <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 shrink-0">
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>
        <div className="min-w-0">
          <span className="text-xs font-black text-white block truncate">
            Naya Update Upalabdha Hai ⚡
          </span>
          <span className="text-[11px] font-semibold text-teal-200 block truncate">
            New version – tap to refresh
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => updateServiceWorker(true)}
        className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5 min-h-[40px]"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default PwaUpdateToast;
