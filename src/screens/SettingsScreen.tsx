/**
 * Settings & Preferences Screen (/settings)
 * 
 * Satisfies all requirements:
 * 1. Shop name (editable with local persistence)
 * 2. UI language (JSON dictionaries, applies instantly across all screens)
 * 3. Speech language (recognition and voice output locale)
 * 4. Speech speed (0.7x - 1.3x with test audio)
 * 5. Mute replies (toggle voice output vs chime-only)
 * 6. Theme selector (Light vs High-Contrast Dark)
 * 7. Export ledger (JSON and CSV download)
 * 8. Clear all data (with confirmation) & Restore Demo Data
 * 9. ASR engine selector (Browser / Bhashini / Sarvam) - UI option stubbed for Indic Hackathon
 * 10. Persisted via typed useSettings hook in localStorage
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Download,
  RefreshCw,
  Shield,
  Globe,
  Palette,
  Gauge,
  Store,
  Check,
  Trash2,
  Mic,
  Cpu,
  FileSpreadsheet,
  FileCode,
  Sun,
  Moon,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  HardDrive,
  KeyRound,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useSettings, ASREngine, ThemeMode } from '../hooks/useSettings';
import { useSpeak } from '../hooks/useSpeak';
import { ledgerService } from '../services/ledgerService';
import { useToast } from '../components/ui/Toast';
import { LanguageCode } from '../services/types';
import { checkStoragePersistence, requestStoragePersistence } from '../services/db';

interface SettingsScreenProps {
  onOpenLanguagePicker?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const { language, setLanguage, supportedLanguages, t } = useI18n();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { speakBalance, isSpeaking } = useSpeak();
  const { showToast } = useToast();

  // Local editing states
  const [shopNameInput, setShopNameInput] = useState(settings.shopName);
  const [isSavedShopName, setIsSavedShopName] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Security & Storage Persistence States
  const [hasPinSet, setHasPinSet] = useState(false);
  const [isStoragePersisted, setIsStoragePersisted] = useState<boolean | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinModalMode, setPinModalMode] = useState<'set' | 'remove'>('set');
  const [pinInput, setPinInput] = useState('');
  const [pinConfirmInput, setPinConfirmInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Load PIN and persistence status
  React.useEffect(() => {
    const checkSecurity = async () => {
      try {
        const pinActive = await ledgerService.isPinSet();
        setHasPinSet(pinActive);
      } catch {}

      try {
        const persisted = await checkStoragePersistence();
        setIsStoragePersisted(persisted);
      } catch {}
    };

    checkSecurity();
  }, []);

  const handleRequestStoragePersistence = async () => {
    const granted = await requestStoragePersistence();
    setIsStoragePersisted(granted);
    if (granted) {
      showToast('Storage persistence granted! Offline data safe 🛡️', { type: 'success' });
    } else {
      showToast('Browser denied persistent storage. Ledger may be cleared if phone is low on disk space.', { type: 'warning' });
    }
  };

  const handleOpenSetPin = () => {
    setPinModalMode('set');
    setPinInput('');
    setPinConfirmInput('');
    setPinError(null);
    setShowPinModal(true);
  };

  const handleOpenRemovePin = () => {
    setPinModalMode('remove');
    setPinInput('');
    setPinError(null);
    setShowPinModal(true);
  };

  const handleSubmitPinModal = async () => {
    if (pinModalMode === 'set') {
      if (pinInput.length < 4 || pinInput.length > 6 || !/^\d+$/.test(pinInput)) {
        setPinError('PIN 4 se 6 anko ka hona chahiye');
        return;
      }
      if (pinInput !== pinConfirmInput) {
        setPinError('Dono PIN match nahi ho rahe');
        return;
      }
      await ledgerService.setPin(pinInput);
      setHasPinSet(true);
      setShowPinModal(false);
      showToast('Khata PIN set ho gaya! 🔒', { type: 'success' });
    } else {
      const ok = await ledgerService.removePin(pinInput);
      if (ok) {
        setHasPinSet(false);
        setShowPinModal(false);
        showToast('PIN remove ho gaya.', { type: 'info' });
      } else {
        setPinError('Galat PIN! Dubara koshish karein.');
      }
    }
  };

  const handleLockNow = () => {
    ledgerService.lockApp();
  };

  // Handle saving shop name
  const handleSaveShopName = () => {
    const trimmed = shopNameInput.trim() || 'Apna Kirana Khata';
    updateSetting('shopName', trimmed);
    setIsSavedShopName(true);
    showToast(`Dukan ka naam: "${trimmed}" save ho gaya!`, { type: 'success' });
    setTimeout(() => setIsSavedShopName(false), 2000);
  };

  // Handle UI Language switch
  const handleSelectUILanguage = (code: LanguageCode) => {
    updateSetting('uiLanguage', code);
    setLanguage(code);
    showToast(`Bhasha badal gayi: ${supportedLanguages.find((l) => l.code === code)?.nativeLabel}`, {
      type: 'info',
    });
  };

  // Handle Speech Language switch
  const handleSelectSpeechLanguage = (code: LanguageCode) => {
    updateSetting('speechLanguage', code);
    showToast(`Voice language: ${supportedLanguages.find((l) => l.code === code)?.label}`, {
      type: 'info',
    });
  };

  // Handle Theme Toggle
  const handleSelectTheme = (theme: ThemeMode) => {
    updateSetting('theme', theme);
  };

  // Handle ASR Engine Selection
  const handleSelectASREngine = (engine: ASREngine) => {
    updateSetting('asrEngine', engine);
    const engineNames = {
      browser: 'Browser On-Device (Default)',
      bhashini: 'Bhashini AI (Digital India)',
      sarvam: 'Sarvam AI (Saaras Indic)',
    };
    showToast(`Speech Engine: ${engineNames[engine]}`, { type: 'info' });
  };

  // Export JSON Ledger
  const handleExportJSON = async () => {
    setIsExporting(true);
    try {
      const dataStr = await ledgerService.exportData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice-khata-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Khata JSON backup download ho gaya!', { type: 'success' });
    } catch {
      showToast('Export failed', { type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  // Export CSV Ledger
  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvStr = ledgerService.exportCSV
        ? await ledgerService.exportCSV()
        : await ledgerService.exportData();
      const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice-khata-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Khata CSV (Excel) download ho gaya!', { type: 'success' });
    } catch {
      showToast('Export failed', { type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  // Clear All Data with Confirm Modal
  const handleClearAllData = async () => {
    const confirmMessage = t('clearConfirm');
    if (window.confirm(confirmMessage)) {
      if (ledgerService.clearAllData) {
        await ledgerService.clearAllData();
      }
      showToast(t('clearSuccess'), { type: 'success' });
    }
  };

  // Restore Sample Demo Khata
  const handleRestoreDemoData = async () => {
    if (window.confirm('Kya aap sample demo grahak aur hisaab data load karna chahte hain?')) {
      await ledgerService.seedInitialData();
      showToast(t('resetSuccess'), { type: 'success' });
    }
  };

  // Seed Rich Pitch Demo Mode (~12 Customers, ~60 Entries across 14 days)
  const handleLoadPitchDemo = async () => {
    if (ledgerService.seedPitchDemoData) {
      await ledgerService.seedPitchDemoData();
      localStorage.setItem('vk_demo_mode', 'true');
      showToast('Pitch Demo Loaded! 12 grahak & 62 entries across 14 days ready.', { type: 'success' });
    }
  };

  return (
    <div className="pb-36 pt-2 px-3.5 max-w-md mx-auto w-full space-y-4">
      {/* Title & Subtitle */}
      <div className="px-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('settingsTitle')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
          {t('settingsSubtitle')}
        </p>
      </div>

      {/* 1. Shop Name Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white block">
              {t('shopNameLabel')}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Receipts aur WhatsApp reminder me dikhega
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shopNameInput}
            onChange={(e) => setShopNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveShopName()}
            placeholder={t('shopNamePlaceholder')}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm px-3.5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500 min-h-[48px]"
          />
          <button
            onClick={handleSaveShopName}
            className={`px-4 py-3 rounded-2xl font-black text-xs transition-all min-h-[48px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
              isSavedShopName
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isSavedShopName ? 'Saved' : t('save')}</span>
          </button>
        </div>
      </div>

      {/* 2. UI Language Selector (Instant Switch) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {t('uiLanguageLabel')}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {t('uiLanguageDesc')}
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-xl border border-blue-500/20">
            {supportedLanguages.find((l) => l.code === language)?.nativeLabel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {supportedLanguages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => handleSelectUILanguage(l.code)}
                className={`p-3 rounded-2xl border text-center transition-all min-h-[56px] flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20 font-black'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 font-bold'
                }`}
              >
                <span className="text-sm leading-tight">{l.nativeLabel}</span>
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                  {l.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Speech Recognition & Voice Language */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {t('speechLanguageLabel')}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {t('speechLanguageDesc')}
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-xl border border-amber-500/20">
            {settings.speechLanguage.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {supportedLanguages.map((l) => {
            const isSelected = settings.speechLanguage === l.code;
            return (
              <button
                key={`speech-${l.code}`}
                onClick={() => handleSelectSpeechLanguage(l.code)}
                className={`p-2.5 rounded-2xl border text-center transition-all min-h-[50px] flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500 text-amber-950 border-amber-500 shadow-md font-black ring-2 ring-amber-400/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold'
                }`}
              >
                <span className="text-xs font-black">{l.nativeLabel}</span>
                <span className="text-[10px] text-slate-400">{l.speechLocale}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Soundbox Voice & Speed Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-4">
        {/* Mute replies toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div
              className={`p-2 rounded-2xl ${
                !settings.muteReplies
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-500/10 text-slate-400'
              }`}
            >
              {!settings.muteReplies ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                {t('muteRepliesLabel')}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {t('muteRepliesDesc')}
              </span>
            </div>
          </div>

          <button
            onClick={() => updateSetting('muteReplies', !settings.muteReplies)}
            className={`w-14 h-8 rounded-full transition-colors relative min-h-[32px] ${
              !settings.muteReplies ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label="Toggle voice soundbox"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform shadow-md ${
                !settings.muteReplies ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Speech Speed Presets & Slider */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-teal-500" />
              {t('speechSpeedLabel')} ({settings.speechSpeed}x)
            </span>
            <span className="text-xs font-black text-teal-600 dark:text-teal-400">
              {settings.speechSpeed <= 0.85
                ? t('speedSlow')
                : settings.speechSpeed <= 1.05
                ? t('speedNormal')
                : t('speedFast')}
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-1.5">
            {[0.8, 1.0, 1.15, 1.3].map((rate) => {
              const isActive = Math.abs(settings.speechSpeed - rate) < 0.05;
              return (
                <button
                  key={rate}
                  type="button"
                  onClick={() => updateSetting('speechSpeed', rate)}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {rate}x
                </button>
              );
            })}
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.05"
            value={settings.speechSpeed}
            onChange={(e) => updateSetting('speechSpeed', parseFloat(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
          />

          {/* Test Voice Button */}
          <button
            onClick={() => {
              speakBalance('Ramesh Bhai', 1400, settings.speechLanguage);
            }}
            disabled={settings.muteReplies || isSpeaking}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-black text-xs transition-all min-h-[50px] shadow-sm ${
              isSpeaking
                ? 'bg-amber-500 text-amber-950 border-amber-400 animate-pulse'
                : !settings.muteReplies
                ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 active:scale-95'
                : 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60'
            }`}
          >
            <Volume2 className="w-4 h-4 text-emerald-500" />
            <span>
              {isSpeaking
                ? 'Bol rahe hain...'
                : 'Test Voice: "Ramesh ka baaki ₹1,400"'}
            </span>
          </button>
        </div>
      </div>

      {/* 5. Theme Selector (Light vs High-Contrast Dark) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white block">
              {t('themeLabel')}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {t('themeDesc')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Light Theme */}
          <button
            type="button"
            onClick={() => handleSelectTheme('light')}
            className={`p-3.5 rounded-2xl border text-left transition-all min-h-[56px] flex items-center gap-3 active:scale-95 ${
              settings.theme === 'light'
                ? 'bg-teal-50 dark:bg-slate-800 border-teal-500 text-teal-900 dark:text-white shadow-sm ring-2 ring-teal-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black block">{t('themeLight')}</span>
              <span className="text-[10px] text-slate-400">Crisp daytime</span>
            </div>
          </button>

          {/* High-Contrast Theme */}
          <button
            type="button"
            onClick={() => handleSelectTheme('high-contrast')}
            className={`p-3.5 rounded-2xl border text-left transition-all min-h-[56px] flex items-center gap-3 active:scale-95 ${
              settings.theme === 'high-contrast'
                ? 'bg-slate-900 dark:bg-teal-950/60 border-teal-400 text-white shadow-sm ring-2 ring-teal-400/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="p-2 rounded-xl bg-slate-800 text-teal-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black block">{t('themeHighContrast')}</span>
              <span className="text-[10px] text-slate-400">High visibility</span>
            </div>
          </button>
        </div>
      </div>

      {/* 6. Speech Recognition Engine Selector (Stubbed for Indic hackathon) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white block">
              {t('asrEngineLabel')}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {t('asrEngineDesc')}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Browser On-Device */}
          <button
            type="button"
            onClick={() => handleSelectASREngine('browser')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all min-h-[56px] flex items-center justify-between active:scale-95 ${
              settings.asrEngine === 'browser'
                ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-white shadow-sm ring-2 ring-teal-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div>
              <span className="text-xs font-black block">Web Speech API (Browser On-Device)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Offline-capable • Zero latency • Privacy first (Active Default)
              </span>
            </div>
            {settings.asrEngine === 'browser' && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />}
          </button>

          {/* Bhashini (Digital India) */}
          <button
            type="button"
            onClick={() => handleSelectASREngine('bhashini')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all min-h-[56px] flex items-center justify-between active:scale-95 ${
              settings.asrEngine === 'bhashini'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-white shadow-sm ring-2 ring-amber-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div>
              <span className="text-xs font-black block">Bhashini AI (Digital India Speech)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Govt of India open Indic models [Stubbed option for hackathon]
              </span>
            </div>
            {settings.asrEngine === 'bhashini' && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
          </button>

          {/* Sarvam AI */}
          <button
            type="button"
            onClick={() => handleSelectASREngine('sarvam')}
            className={`w-full p-3.5 rounded-2xl border text-left transition-all min-h-[56px] flex items-center justify-between active:scale-95 ${
              settings.asrEngine === 'sarvam'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-950 dark:text-white shadow-sm ring-2 ring-purple-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div>
              <span className="text-xs font-black block">Sarvam AI (Saaras Indic Speech)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                10 Indian Languages high-accuracy ASR [Stubbed option for hackathon]
              </span>
            </div>
            {settings.asrEngine === 'sarvam' && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />}
          </button>
        </div>
      </div>

      {/* 7. Export Ledger (JSON / CSV) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 dark:text-white block">
              {t('exportLedgerLabel')}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Phone me offline backup save karein
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* JSON Export */}
          <button
            type="button"
            onClick={handleExportJSON}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-black text-xs text-slate-800 dark:text-slate-200 transition-all min-h-[56px] active:scale-95"
          >
            <FileCode className="w-4 h-4 text-blue-500" />
            <span>{t('exportJson')}</span>
          </button>

          {/* CSV Export */}
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-black text-xs text-slate-800 dark:text-slate-200 transition-all min-h-[56px] active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>{t('exportCsv')}</span>
          </button>
        </div>
      </div>

      {/* 8. Pitch Demo Mode (?demo=1) */}
      <div className="bg-white dark:bg-slate-900 border border-teal-500/40 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                Pitch Demo Mode (?demo=1)
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                12 Grahak • 62 Entries • 14 Din Ka Hisaab
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-black border border-teal-500/30">
            PITCH READY
          </span>
        </div>

        <button
          type="button"
          onClick={handleLoadPitchDemo}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md min-h-[52px]"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Seed Pitch Demo Dataset (12 Grahak, 62 Entries)</span>
        </button>
      </div>

      {/* 9. Data Security & PIN Lock (Web Crypto AES-256 GCM) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                PIN Lock & Encryption
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                AES-GCM 256 • PBKDF2 200k iterations
              </span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
              hasPinSet
                ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
            }`}
          >
            {hasPinSet ? 'PIN ACTIVE 🔒' : 'UNPROTECTED 🔓'}
          </span>
        </div>

        {hasPinSet ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleLockNow}
              className="py-3 px-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all min-h-[48px] active:scale-95 shadow-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Lock App Now</span>
            </button>
            <button
              type="button"
              onClick={handleOpenRemovePin}
              className="py-3 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all min-h-[48px] active:scale-95"
            >
              <Unlock className="w-4 h-4 text-amber-500" />
              <span>Remove PIN</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleOpenSetPin}
            className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm min-h-[48px]"
          >
            <KeyRound className="w-4 h-4" />
            <span>Set 4-6 Digit Security PIN</span>
          </button>
        )}
      </div>

      {/* 10. Storage Eviction Protection (navigator.storage.persist) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white block">
                Offline Storage Persistence
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Data eviction protection (navigator.storage.persist)
              </span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
              isStoragePersisted
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-500/30'
            }`}
          >
            {isStoragePersisted ? 'PROTECTED 🛡️' : 'STANDARD ⚠️'}
          </span>
        </div>

        {isStoragePersisted ? (
          <p className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/20 font-semibold leading-relaxed">
            ✓ Persistent storage active. Phone me disk space kam hone par bhi browser aapka khata delete nahi karega.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Warning: Browser standard storage mode me hai. Agar phone ka storage bhar jaye, toh browser offline data clear kar sakta hai.
              </span>
            </div>
            <button
              type="button"
              onClick={handleRequestStoragePersistence}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all min-h-[46px] active:scale-95 shadow-sm"
            >
              <HardDrive className="w-4 h-4" />
              <span>Request Persistent Storage</span>
            </button>
          </div>
        )}
      </div>

      {/* 11. Danger Zone & Reset */}
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-black text-rose-600 dark:text-rose-400 block">
              {t('dangerZoneLabel')}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Data clear ya demo data reset karein
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Clear all data */}
          <button
            type="button"
            onClick={handleClearAllData}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-black text-xs transition-all min-h-[56px] active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('clearAllData')}</span>
          </button>

          {/* Restore sample demo data */}
          <button
            type="button"
            onClick={handleRestoreDemoData}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all min-h-[50px] active:scale-95"
          >
            <RefreshCw className="w-4 h-4 text-amber-500" />
            <span>{t('resetDemo')}</span>
          </button>
        </div>
      </div>

      {/* 9. Local-First & Privacy Reassurance */}
      <div className="bg-gradient-to-br from-teal-50 to-white dark:from-slate-900 dark:to-slate-900/60 border border-teal-500/30 rounded-3xl p-4 shadow-sm flex items-start space-x-3">
        <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-black text-teal-800 dark:text-teal-300 block mb-0.5">
            Your data stays on this phone 🔒
          </span>
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('localFirstInfo')}
          </p>
        </div>
      </div>

      {/* 10. Replay Onboarding Guide */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 dark:text-white block">
              3-Step Guide (Onboarding)
            </span>
            <span className="text-[10px] text-slate-400">
              Speak → Confirm → Done walkthrough
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('vk_open_onboarding'))}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-black text-xs transition-all min-h-[44px] flex items-center gap-1 active:scale-95"
        >
          <span>Dekhein</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 11. Design System Styleguide Link */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black text-slate-900 dark:text-white block">
              UI Styleguide & Tokens
            </span>
            <span className="text-[10px] text-slate-400">
              360px mobile viewport verification
            </span>
          </div>
        </div>
        <Link
          to="/styleguide"
          className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs transition-all min-h-[44px] flex items-center gap-1 active:scale-95"
        >
          <span>Open</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* App Version Info */}
      <div className="text-center pt-2 pb-6">
        <p className="text-xs font-black text-slate-500">
          Voice Khata (आवाज़ खाता) v1.0.0
        </p>
        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
          Build Bengaluru 2.0 Hackathon • Made with ❤️ for Indian Kirana Stores
        </p>
      </div>

      {/* PIN Setup / Remove Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {pinModalMode === 'set' ? 'Set Security PIN' : 'Remove PIN Protection'}
                </h3>
                <p className="text-xs text-slate-500">
                  {pinModalMode === 'set' ? '4 se 6 anko ka PIN chunein' : 'Pehle apna purana PIN enter karein'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  {pinModalMode === 'set' ? 'Naya PIN (4-6 digits)' : 'Current PIN'}
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-full bg-slate-100 dark:bg-slate-800 text-center tracking-widest text-xl font-black text-slate-900 dark:text-white px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                />
              </div>

              {pinModalMode === 'set' && (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Confirm PIN
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinConfirmInput}
                    onChange={(e) => setPinConfirmInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••"
                    className="w-full bg-slate-100 dark:bg-slate-800 text-center tracking-widest text-xl font-black text-slate-900 dark:text-white px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                  />
                </div>
              )}

              {pinError && (
                <p className="text-xs font-bold text-rose-500 text-center">
                  {pinError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all min-h-[48px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitPinModal}
                className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs transition-all min-h-[48px]"
              >
                {pinModalMode === 'set' ? 'Save PIN' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
