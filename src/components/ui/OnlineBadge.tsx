/**
 * Online / Offline Safe Badge Component
 * 
 * Requirements:
 * - Green "Online"
 * - Grey "Offline – sab chalega"
 * - Shows a one-time honest note when offline explaining that browser Web Speech API
 *   may need internet, and highlights the "Type instead" option for 100% offline entry.
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle, X, Keyboard, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export interface OnlineBadgeProps {
  isOnlineOverride?: boolean;
  className?: string;
  onOpenTypeInstead?: () => void;
}

export const OnlineBadge: React.FC<OnlineBadgeProps> = ({
  isOnlineOverride,
  className = '',
  onOpenTypeInstead,
}) => {
  const { isOnline: detectedOnline, wasOffline } = useOnlineStatus();
  const online = isOnlineOverride !== undefined ? isOnlineOverride : detectedOnline;

  const [showOfflineNote, setShowOfflineNote] = useState(false);

  // Trigger one-time honest note when offline
  useEffect(() => {
    if (!online) {
      const alreadySeen = sessionStorage.getItem('vk_offline_note_seen');
      if (!alreadySeen) {
        setShowOfflineNote(true);
      }
    }
  }, [online]);

  const handleDismissNote = () => {
    setShowOfflineNote(false);
    sessionStorage.setItem('vk_offline_note_seen', 'true');
  };

  const handleGoToType = () => {
    handleDismissNote();
    if (onOpenTypeInstead) {
      onOpenTypeInstead();
    } else {
      window.dispatchEvent(new CustomEvent('vk_open_manual_entry'));
    }
  };

  return (
    <>
      {online ? (
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 select-none shadow-sm transition-all min-h-[36px] ${className}`}
          title="Internet connected. Speech recognition & WhatsApp ready."
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>Online</span>
        </div>
      ) : (
        <button
          onClick={() => setShowOfflineNote(true)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 select-none shadow-sm transition-all min-h-[36px] active:scale-95 ${className}`}
          title="Offline mode: Tap to view details"
        >
          <WifiOff className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Offline – sab chalega</span>
        </button>
      )}

      {/* Honest Offline Notice Bottom Modal */}
      {showOfflineNote && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <WifiOff className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Offline – Sab Chalega
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    Network disconnected
                  </span>
                </div>
              </div>
              <button
                onClick={handleDismissNote}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Honest Message */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Aapka pura khata safe hai aur 100% phone me hi save hota rahega.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chrome browser me aawaz pehchanna (voice mic) internet mang sakta hai. Agar mic na chale, toh bina pareshani <strong className="text-teal-600 dark:text-teal-400">"Type instead"</strong> se darj karein.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleGoToType}
                className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md min-h-[52px]"
              >
                <Keyboard className="w-4 h-4" />
                <span>"Type Instead" Khata Kholein</span>
              </button>

              <button
                onClick={handleDismissNote}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Theek Hai, Samajh Gaya
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
