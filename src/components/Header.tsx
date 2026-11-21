/**
 * Top App Header Bar
 * - Shop name (editable with local persistence)
 * - Language chip showing current speech language
 * - OnlineBadge
 * - Soundbox & Settings shortcuts
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Globe, Edit2, Check, Settings, RotateCcw, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useSettings } from '../hooks/useSettings';
import { useSoundbox } from '../hooks/useSoundbox';
import { useToast } from './ui/Toast';
import { ledgerService } from '../services/ledgerService';
import { OnlineBadge } from './ui/OnlineBadge';

interface HeaderProps {
  onOpenLanguagePicker: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLanguagePicker }) => {
  const { currentLangConfig } = useI18n();
  const { settings, updateSetting } = useSettings();
  const { soundEnabled, toggleSound, playPaymentChime } = useSoundbox();
  const { showToast } = useToast();

  // Detect Demo Mode (?demo=1 in URL or stored in localStorage)
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1') {
      localStorage.setItem('vk_demo_mode', 'true');
      return true;
    }
    if (urlParams.get('demo') === '0') {
      localStorage.removeItem('vk_demo_mode');
      return false;
    }
    return localStorage.getItem('vk_demo_mode') === 'true';
  });

  const [isResettingDemo, setIsResettingDemo] = useState(false);

  // Editable Shop Name synced with typed useSettings hook & local profile
  const shopName = settings.shopName;
  const [isEditingShopName, setIsEditingShopName] = useState(false);
  const [editInput, setEditInput] = useState(shopName);

  useEffect(() => {
    // Initial fetch from encrypted profile
    ledgerService.getProfile().then((p) => {
      if (p?.shopName) {
        updateSetting('shopName', p.shopName);
        setEditInput(p.shopName);
      }
    });

    const handleProfileUpdated = (e: any) => {
      const p = e?.detail;
      if (p?.shopName) {
        updateSetting('shopName', p.shopName);
        setEditInput(p.shopName);
      }
    };
    const handleShopNameUpdated = (e: any) => {
      if (typeof e?.detail === 'string') {
        updateSetting('shopName', e.detail);
        setEditInput(e.detail);
      }
    };

    window.addEventListener('vk_profile_updated', handleProfileUpdated);
    window.addEventListener('vk_shop_name_updated', handleShopNameUpdated);

    return () => {
      window.removeEventListener('vk_profile_updated', handleProfileUpdated);
      window.removeEventListener('vk_shop_name_updated', handleShopNameUpdated);
    };
  }, []);

  useEffect(() => {
    setEditInput(shopName);
  }, [shopName]);

  const handleSaveShopName = async () => {
    const trimmed = editInput.trim() || 'Apna Kirana Khata';
    updateSetting('shopName', trimmed);
    setIsEditingShopName(false);

    try {
      const existing = await ledgerService.getProfile();
      if (existing) {
        await ledgerService.saveProfile({
          ...existing,
          shopName: trimmed,
        });
      }
    } catch (err) {
      console.warn('Could not update profile shop name:', err);
    }
  };

  const handleResetDemo = async () => {
    if (isResettingDemo) return;
    setIsResettingDemo(true);
    try {
      if (ledgerService.seedPitchDemoData) {
        await ledgerService.seedPitchDemoData();
      }
      showToast('Demo reset! 12 grahak aur 62 entries reseeded clean.', {
        type: 'success',
        duration: 3000,
      });
      window.dispatchEvent(new CustomEvent('vk_refresh_data'));
      window.dispatchEvent(new CustomEvent('vk_entry_added'));
    } catch (err) {
      console.error('Failed to reset demo dataset:', err);
      showToast('Error resetting demo dataset', { type: 'error' });
    } finally {
      setIsResettingDemo(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3.5 py-2.5 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left: Shop Name (Editable) */}
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-lg font-black tracking-tight">₹</span>
          </div>

          {isEditingShopName ? (
            <div className="flex items-center gap-1.5 flex-1 max-w-[190px]">
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveShopName()}
                autoFocus
                className="w-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white px-2 py-1 rounded-lg border border-primary focus:outline-none"
              />
              <button
                onClick={handleSaveShopName}
                className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-800 shrink-0"
                aria-label="Save shop name"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setEditInput(shopName);
                setIsEditingShopName(true);
              }}
              className="flex items-center gap-1.5 cursor-pointer group min-w-0"
              title="Click to change shop name"
            >
              <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[140px] xs:max-w-[170px]">
                {shopName}
              </h1>
              <Edit2 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-primary shrink-0 transition-opacity" />
            </div>
          )}
        </div>

        {/* Right Controls: OnlineBadge, Speech Language Chip, Soundbox, Settings */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Online Badge */}
          <OnlineBadge />

          {/* Current Speech Language Chip */}
          <button
            onClick={onOpenLanguagePicker}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-300 dark:border-teal-700/60 text-teal-800 dark:text-teal-300 text-xs font-bold transition-all min-h-[38px]"
            aria-label={`Speech language: ${currentLangConfig.nativeLabel}`}
            title="Change speech & app language"
          >
            <Globe className="w-3.5 h-3.5 text-primary dark:text-teal-400 shrink-0" />
            <span className="truncate max-w-[70px]">{currentLangConfig.nativeLabel}</span>
          </button>

          {/* Soundbox Voice Chime Toggle */}
          <button
            onClick={() => {
              toggleSound();
              if (!soundEnabled) playPaymentChime();
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              soundEnabled
                ? 'bg-primary/10 text-primary dark:text-primary-400 border border-primary/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
            aria-label={soundEnabled ? 'Mute soundbox voice' : 'Enable soundbox voice'}
            title="Soundbox Voice Chimes"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-primary dark:text-primary-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Settings Route Link */}
          <Link
            to="/settings"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Demo Mode Top Bar (?demo=1) with 1-Tap "Reset Demo" Button */}
      {isDemoMode && (
        <div className="max-w-md mx-auto mt-2 pt-1.5 pb-0.5 border-t border-amber-500/25 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Pitch Demo Mode</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 font-mono font-normal">
              ?demo=1
            </span>
          </div>

          <button
            onClick={handleResetDemo}
            disabled={isResettingDemo}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
            title="One-tap restore: resets 12 customers & 62 entries across 14 days"
            aria-label="Reset demo dataset"
          >
            <RotateCcw className={`w-3 h-3 ${isResettingDemo ? 'animate-spin' : ''}`} />
            <span>{isResettingDemo ? 'Resetting...' : 'Reset Demo'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
