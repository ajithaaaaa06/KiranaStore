/**
 * Install App Banner Component
 * Displays beforeinstallprompt banner with simple Hindi/English copy.
 */

import React from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useI18n } from '../i18n/I18nContext';

export const InstallAppBanner: React.FC = () => {
  const { isInstallable, triggerInstall, dismissBanner } = usePWAInstall();
  const { t } = useI18n();

  if (!isInstallable) {
    return null;
  }

  return (
    <div
      role="banner"
      aria-label="Install Voice Khata on your home screen"
      className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 text-white px-3.5 py-2.5 shadow-md border-b border-teal-600/40 sticky top-0 z-40 transition-all animate-in slide-in-from-top duration-300"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: App Icon & Copy */}
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-xl font-black">₹</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-black tracking-tight flex items-center gap-1.5 truncate">
              <span>{t('installAppTitle')}</span>
              <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            </h3>
            <p className="text-[11px] font-semibold text-teal-100/90 truncate">
              {t('installAppSub')}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={triggerInstall}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black transition-transform active:scale-95 shadow-sm min-h-[44px] flex items-center gap-1.5"
            aria-label="Install Voice Khata app"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('install')}</span>
          </button>
          <button
            onClick={dismissBanner}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-teal-200 hover:text-white transition-colors"
            aria-label="Dismiss install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
