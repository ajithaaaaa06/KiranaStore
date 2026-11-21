/**
 * Home Screen (Mic-First)
 * - 5 Language Chips above mic (हिं / EN / ಕನ್ನಡ / தமிழ் / తెలుగు)
 * - Live transcript banner with real-time streaming interim results
 * - Centered Giant Circular Mic Button (≥120px) with 4 states:
 *   idle | listening (pulsing ring + animated waveform bars via Web Audio AnalyserNode) | processing (spinner) | error
 * - "Type instead" button below mic opening manual-entry sheet
 * - Hint chips for 1-tap testing: "Ramesh ko 500 udhaar diya", "Suresh ne 200 diye", "Ramesh ka total?"
 * - Recent entries list (last 5) with Amount component, customer name, relative time
 * - Haptic feedback (navigator.vibrate) on tap start/stop
 * - Final transcript routed through parseTranscript() in /services/parser.ts
 */

import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuickSummaryCards } from '../components/QuickSummaryCards';
import { GiantMicHero } from '../components/GiantMicHero';
import { LiveTranscriptBanner } from '../components/LiveTranscriptBanner';
import { RecentTransactionsList } from '../components/RecentTransactionsList';
import { Customer, LedgerEntry, DailySummary, ParsedEntry, TransactionType, ConfirmEntryData, ShopProfile, PaymentRequest } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSoundbox } from '../hooks/useSoundbox';
import { useSpeak } from '../hooks/useSpeak';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from '../components/ui/Toast';
import { useSettings } from '../hooks/useSettings';
import type { LatencyMetrics } from '../components/DebugLatencyBadge';
import { VolumeX, AlertCircle, QrCode } from 'lucide-react';

const DebugLatencyBadge = lazy(() => import('../components/DebugLatencyBadge').then(m => ({ default: m.DebugLatencyBadge })));

const ConfirmEntrySheet = lazy(() => import('../components/ConfirmEntrySheet').then(m => ({ default: m.ConfirmEntrySheet })));
const BalanceAnswerCard = lazy(() => import('../components/BalanceAnswerCard').then(m => ({ default: m.BalanceAnswerCard })));
const ManualEntrySheet = lazy(() => import('../components/ManualEntrySheet').then(m => ({ default: m.ManualEntrySheet })));
const RegisterCustomerSheet = lazy(() => import('../components/RegisterCustomerSheet').then(m => ({ default: m.RegisterCustomerSheet })));
const DisambiguationSheet = lazy(() => import('../components/DisambiguationSheet').then(m => ({ default: m.DisambiguationSheet })));
const PaymentRequestSheet = lazy(() => import('../components/PaymentRequestSheet').then(m => ({ default: m.PaymentRequestSheet })));

interface HomeScreenProps {
  onSelectCustomer?: (customerId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCustomer }) => {
  const navigate = useNavigate();
  const { language, currentLangConfig, t } = useI18n();
  const { settings } = useSettings();
  const { announceCreditSaved, announcePaymentSaved } = useSoundbox();
  const { speak, speakBalance, voiceNotice, clearVoiceNotice } = useSpeak();
  const { showToast } = useToast();

  const handleCustomerClick = onSelectCustomer || ((id: string) => navigate(`/customers/${id}`));

  // Performance Telemetry State (?debug=1)
  const lastSpeechEndRef = useRef<number | null>(null);
  const [latencyMetrics, setLatencyMetrics] = useState<LatencyMetrics>({
    asrProvider: settings.asrEngine === 'browser' ? 'Browser Web Speech' : settings.asrEngine === 'sarvam' ? 'Sarvam AI' : 'Bhashini AI',
  });

  // App State
  const [summary, setSummary] = useState<DailySummary>({
    date: new Date().toISOString().split('T')[0],
    totalCredit: 0,
    totalPayment: 0,
    netBalance: 0,
    entryCount: 0,
    activeCustomers: 0,
    totalCreditGiven: 0,
    totalPaymentReceived: 0,
    netBalanceChange: 0,
    transactionCount: 0,
    activeCustomersCount: 0,
  });
  const [totalPendingBalance, setTotalPendingBalance] = useState(0);
  const [recentEntries, setRecentEntries] = useState<LedgerEntry[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Overlays & Sheets State
  const [parsedDraft, setParsedDraft] = useState<ParsedEntry | null>(null);
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [isDuplicateDetected, setIsDuplicateDetected] = useState(false);

  // Registration Overlay State (F15)
  const [showRegisterSheet, setShowRegisterSheet] = useState(false);
  const [registerInitialName, setRegisterInitialName] = useState('');
  const [registerInitialPhone, setRegisterInitialPhone] = useState('');
  const [registerPendingEntry, setRegisterPendingEntry] = useState<ParsedEntry | null>(null);

  // Disambiguation Overlay State (F16)
  const [showDisambiguateSheet, setShowDisambiguateSheet] = useState(false);
  const [disambiguateCandidates, setDisambiguateCandidates] = useState<Customer[]>([]);
  const [disambiguateSpokenName, setDisambiguateSpokenName] = useState('');
  const [disambiguatePendingEntry, setDisambiguatePendingEntry] = useState<ParsedEntry | null>(null);
  const [disambiguateIsQuery, setDisambiguateIsQuery] = useState(false);

  const [queryCustomer, setQueryCustomer] = useState<Customer | null>(null);
  const [queryTransactions, setQueryTransactions] = useState<LedgerEntry[]>([]);
  const [showQuerySheet, setShowQuerySheet] = useState(false);
  const [queryResponseTime, setQueryResponseTime] = useState<number | undefined>(undefined);

  // Payment Request Overlay State (F17)
  const [shopProfile, setShopProfile] = useState<ShopProfile | null>(null);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [activePaymentCustomer, setActivePaymentCustomer] = useState<Customer | null>(null);
  const [activePaymentAmount, setActivePaymentAmount] = useState<number>(0);
  const [activePaymentBalance, setActivePaymentBalance] = useState<number>(0);
  const [activePaymentRequest, setActivePaymentRequest] = useState<PaymentRequest | null>(null);
  const [isCounterQrMode, setIsCounterQrMode] = useState(false);

  // Load shop profile
  useEffect(() => {
    ledgerService.getProfile?.().then((prof) => {
      if (prof) setShopProfile(prof);
    });
    const handleProfileUpdated = (e: any) => {
      if (e?.detail) setShopProfile(e.detail);
    };
    window.addEventListener('vk_profile_updated', handleProfileUpdated);
    return () => window.removeEventListener('vk_profile_updated', handleProfileUpdated);
  }, []);

  const handleOpenCounterQr = async () => {
    const prof = shopProfile || (await ledgerService.getProfile?.()) || null;
    setShopProfile(prof);
    setActivePaymentCustomer(null);
    setActivePaymentAmount(0);
    setActivePaymentBalance(0);
    setActivePaymentRequest(null);
    setIsCounterQrMode(true);
    setShowPaymentSheet(true);
  };

  const handleAddPhoneFromPayment = () => {
    if (activePaymentCustomer) {
      setRegisterInitialName(activePaymentCustomer.name);
      setRegisterInitialPhone('');
      setRegisterPendingEntry(null);
      setShowPaymentSheet(false);
      setShowRegisterSheet(true);
    }
  };

  const { isOnline } = useOnlineStatus();
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Listen for offline banner trigger to open manual entry
  useEffect(() => {
    const handleOpenManual = () => setShowManualEntry(true);
    window.addEventListener('vk_open_manual_entry', handleOpenManual);
    return () => window.removeEventListener('vk_open_manual_entry', handleOpenManual);
  }, []);

  // Refresh data from ledgerService
  const refreshData = useCallback(async () => {
    const sum = await ledgerService.getDailySummary();
    const entries = await ledgerService.getEntries({ limit: 10 });
    const custs = await ledgerService.getCustomers();

    const pendingTotal = custs.reduce((acc, c) => acc + Math.max(0, c.balance), 0);

    setSummary(sum);
    setRecentEntries(entries);
    setCustomers(custs);
    setTotalPendingBalance(pendingTotal);
  }, []);

  useEffect(() => {
    refreshData();
    const handleRefresh = () => refreshData();
    window.addEventListener('vk_refresh_data', handleRefresh);
    window.addEventListener('vk_entry_added', handleRefresh);
    return () => {
      window.removeEventListener('vk_refresh_data', handleRefresh);
      window.removeEventListener('vk_entry_added', handleRefresh);
    };
  }, [refreshData]);

  // Confirm and Save transaction(s) from bottom sheet (supports single and stacked entries)
  const handleConfirmTransaction = useCallback(
    async (data: ConfirmEntryData | ConfirmEntryData[]) => {
      setShowConfirmSheet(false);

      const items = Array.isArray(data) ? data : [data];
      if (items.length === 0) return;

      let savedPaymentReq: PaymentRequest | null = null;
      let lastSavedCustomer: Customer | null = null;

      for (const item of items) {
        const existingCusts = await ledgerService.getCustomers();
        const existedBefore = existingCusts.some(
          (c) => c.name.trim().toLowerCase() === item.customerName.trim().toLowerCase() || c.id === item.customerId
        );
        const customer = await ledgerService.findOrCreateCustomer(item.customerName);
        if (!existedBefore) {
          showToast(`New customer added: ${customer.name}`, { type: 'success' });
        }
        const res = await ledgerService.addEntry(
          {
            customerId: customer.id,
            customerName: customer.name,
            amount: item.amount,
            type: item.type,
            date: item.date,
            note: item.notes,
            rawTranscript:
              parsedDraft?.rawTranscript || `Manual: ${item.customerName} ₹${item.amount}`,
          },
          customer.name
        );
        lastSavedCustomer = res.customer;
        if (item.type === 'credit') {
          try {
            savedPaymentReq = (await ledgerService.createPaymentRequest?.({
              entryId: res.entry.id,
              customerId: res.customer.id,
              amount: item.amount,
            })) || null;
          } catch (e) {
            console.error('Failed to create payment request:', e);
          }
        }
      }

      // Audio Feedback for single entry (multi-entry plays sound inside sheet)
      const primary = items[0];
      if (items.length === 1) {
        if (primary.type === 'credit') {
          if (settings.autoOpenPaymentRequest) {
            const { getSpeechTemplates } = await import('../i18n/speech');
            const tmpl = getSpeechTemplates(language);
            const spokenText = tmpl.creditSavedWithPaymentRequest(primary.customerName, primary.amount);
            speak(spokenText, { locale: currentLangConfig.speechLocale });
          } else {
            announceCreditSaved(primary.customerName, primary.amount);
          }
        } else {
          announcePaymentSaved(primary.customerName, primary.amount);
        }
        showToast(
          `${primary.customerName}: ${primary.type === 'credit' ? t('credit') : t('payment')} - ${t('entrySavedSuccess')}`,
          { type: 'success' }
        );

        // Auto-open payment request sheet if setting is enabled (F17)
        if (primary.type === 'credit' && settings.autoOpenPaymentRequest && lastSavedCustomer) {
          setActivePaymentCustomer(lastSavedCustomer);
          setActivePaymentAmount(primary.amount);
          setActivePaymentBalance(lastSavedCustomer.balance);
          setActivePaymentRequest(savedPaymentReq);
          setIsCounterQrMode(false);
          setShowPaymentSheet(true);
        }
      } else {
        showToast(`${items.length} ${t('multiEntriesSavedSuccess')}`, {
          type: 'success',
        });
      }

      if (lastSpeechEndRef.current) {
        const tSaved = performance.now();
        const speechToSavedMs = Math.round(tSaved - lastSpeechEndRef.current);
        setLatencyMetrics((prev) => ({ ...prev, speechToSavedMs }));
      }

      setParsedDraft(null);
      await refreshData();
    },
    [
      parsedDraft,
      announceCreditSaved,
      announcePaymentSaved,
      showToast,
      refreshData,
      settings.autoOpenPaymentRequest,
      language,
      currentLangConfig.speechLocale,
      speak,
    ]
  );

  /**
   * Final transcript handler: routes to parseTranscript() in /services/parser.ts
   */
  const handleTranscriptComplete = useCallback(
    async (finalTranscript: string, metadata?: { confidence: number; speechEndTime: number }) => {
      if (!finalTranscript.trim()) return;

      if (metadata?.speechEndTime) {
        lastSpeechEndRef.current = metadata.speechEndTime;
      }
      const tEnd = lastSpeechEndRef.current || performance.now();
      const parseStart = performance.now();
      const { parseTranscript } = await import('../services/parser');
      const result = await parseTranscript(finalTranscript, parsedDraft || undefined);
      const parseEnd = performance.now();

      const speechToParsedMs = Math.round(parseEnd - tEnd);
      setLatencyMetrics((prev) => ({
        ...prev,
        speechToParsedMs,
        confidence: metadata?.confidence ?? result.confidence,
        asrProvider: settings.asrEngine === 'browser' ? 'Browser Web Speech' : settings.asrEngine === 'sarvam' ? 'Sarvam AI' : 'Bhashini AI',
      }));

      // Handle voice confirm/cancel commands while sheets are open
      if (result.intent === 'confirm') {
        if (showConfirmSheet && parsedDraft && parsedDraft.customerName && parsedDraft.amount) {
          await handleConfirmTransaction({
            customerName: parsedDraft.customerName,
            amount: parsedDraft.amount,
            type: parsedDraft.type || 'credit',
            date: parsedDraft.date || new Date().toISOString(),
            notes: parsedDraft.notes || parsedDraft.note,
          });
          return;
        }
      } else if (result.intent === 'cancel') {
        if (showConfirmSheet) {
          setShowConfirmSheet(false);
          setParsedDraft(null);
          showToast('Radd kar diya gaya', { type: 'info' });
          return;
        }
        if (showQuerySheet) {
          setShowQuerySheet(false);
          setQueryCustomer(null);
          return;
        }
      } else if (result.intent === 'correction' && result.correctionAmount) {
        if (showConfirmSheet && parsedDraft) {
          setParsedDraft((prev) =>
            prev ? { ...prev, amount: result.correctionAmount, isLowConfidence: false } : null
          );
          showToast(`Rakam badal kar ₹${result.correctionAmount} kar di`, { type: 'success' });
          return;
        }
      }

      if (result.intent === 'query' || result.type === 'query') {
        const queryStart = performance.now();
        const targetName = result.queryCustomer || result.customerName || 'Customer';
        const allCusts = await ledgerService.getCustomers();
        const { findCustomers } = await import('../services/customerMatcher');
        const matchResult = findCustomers(targetName, allCusts);

        // Disambiguate multiple candidates (F16)
        if (matchResult.action === 'disambiguate' && matchResult.candidates.length > 1) {
          setDisambiguateCandidates(matchResult.candidates.map((c) => c.customer));
          setDisambiguateSpokenName(targetName);
          setDisambiguatePendingEntry(null);
          setDisambiguateIsQuery(true);
          setShowDisambiguateSheet(true);
          return;
        }

        const matched = matchResult.selectedCustomer || (await ledgerService.findCustomerByName(targetName));
        if (matched) {
          const custEntries = await ledgerService.getCustomerEntries(matched.id);
          const latency = Math.round(performance.now() - queryStart);
          setQueryResponseTime(latency);
          setLatencyMetrics((prev) => ({ ...prev, queryResponseTimeMs: latency }));
          setQueryCustomer(matched);
          setQueryTransactions(custEntries);
          setShowQuerySheet(true);
          speakBalance(matched.name, matched.balance, language);
        } else {
          // If customer not found yet, create temporary card
          const newCust = await ledgerService.findOrCreateCustomer(targetName);
          showToast(`New customer added: ${newCust.name}`, { type: 'success' });
          const latency = Math.round(performance.now() - queryStart);
          setQueryResponseTime(latency);
          setLatencyMetrics((prev) => ({ ...prev, queryResponseTimeMs: latency }));
          setQueryCustomer(newCust);
          setQueryTransactions([]);
          setShowQuerySheet(true);
          speakBalance(newCust.name, 0, language);
        }
      } else if (result.intent === 'register') {
        // Voice registration flow (F15)
        setRegisterInitialName(result.name || result.customerName || '');
        setRegisterInitialPhone(result.phone || '');
        setRegisterPendingEntry(null);
        setShowRegisterSheet(true);
        if (!result.phone) {
          const askText =
            t('customerNewAskPhoneSpoken', { name: result.name || t('customer') });
          speak(askText, { locale: currentLangConfig.speechLocale });
        }
        return;
      } else if (result.intent === 'entry' || result.type === 'entry') {
        const spokenCustName = result.data.customerName || '';
        const allCusts = await ledgerService.getCustomers();
        const { findCustomers } = await import('../services/customerMatcher');
        const matchResult = findCustomers(spokenCustName, allCusts);

        // If customer is not found (score < 0.60), ask for number and open RegisterCustomerSheet!
        if (matchResult.action === 'create_new') {
          const askText =
            t('customerNewAskPhoneSpoken', { name: spokenCustName });
          speak(askText, { locale: currentLangConfig.speechLocale });
          setRegisterInitialName(spokenCustName);
          setRegisterInitialPhone('');
          setRegisterPendingEntry(result.data);
          setShowRegisterSheet(true);
          return;
        }

        // Disambiguate when multiple candidates match (F16)
        if (matchResult.action === 'disambiguate' && matchResult.candidates.length > 1) {
          setDisambiguateCandidates(matchResult.candidates.map((c) => c.customer));
          setDisambiguateSpokenName(spokenCustName);
          setDisambiguatePendingEntry(result.data);
          setDisambiguateIsQuery(false);
          setShowDisambiguateSheet(true);
          return;
        }

        // Transaction intent: open confirm sheet
        setParsedDraft(result.data);

        // Check for duplicate warning if similar entry in last 10 min
        const matched = matchResult.selectedCustomer;
        if (matched && result.data.amount) {
          const isDup = await ledgerService.checkDuplicateEntry(
            matched.id,
            result.data.amount,
            result.data.type || 'credit',
            600000 // 10 minutes
          );
          setIsDuplicateDetected(isDup);
        } else {
          setIsDuplicateDetected(false);
        }

        setShowConfirmSheet(true);
      } else {
        // Unknown: inform user gracefully
        showToast(result.message || t('errorNotUnderstood'), {
          type: 'warning',
        });
      }
    },
    [parsedDraft, showConfirmSheet, showQuerySheet, handleConfirmTransaction, speakBalance, language, showToast, speak, t, currentLangConfig.speechLocale]
  );

  const handleCustomerRegistered = (newCustomer: Customer, pending?: ParsedEntry | null) => {
    setShowRegisterSheet(false);
    setRegisterPendingEntry(null);
    showToast(`New customer added: ${newCustomer.name}`, { type: 'success' });
    refreshData();
    if (pending) {
      setParsedDraft({
        ...pending,
        customerName: newCustomer.name,
      });
      setIsDuplicateDetected(false);
      setShowConfirmSheet(true);
    }
  };

  const handleSelectExistingFromRegister = (existing: Customer, pending?: ParsedEntry | null) => {
    setShowRegisterSheet(false);
    setRegisterPendingEntry(null);
    if (pending) {
      setParsedDraft({
        ...pending,
        customerName: existing.name,
      });
      setIsDuplicateDetected(false);
      setShowConfirmSheet(true);
    }
  };

  // Disambiguation resolution callback (F16)
  const handleCustomerDisambiguated = useCallback(
    async (chosen: Customer) => {
      setShowDisambiguateSheet(false);
      if (disambiguateIsQuery) {
        setDisambiguateIsQuery(false);
        const queryStart = performance.now();
        const custEntries = await ledgerService.getCustomerEntries(chosen.id);
        const latency = Math.round(performance.now() - queryStart);
        setQueryResponseTime(latency);
        setLatencyMetrics((prev) => ({ ...prev, queryResponseTimeMs: latency }));
        setQueryCustomer(chosen);
        setQueryTransactions(custEntries);
        setShowQuerySheet(true);
        speakBalance(chosen.name, chosen.balance, language);
      } else if (disambiguatePendingEntry) {
        const updatedDraft: ParsedEntry = {
          ...disambiguatePendingEntry,
          customerName: chosen.name,
        };
        setParsedDraft(updatedDraft);
        setDisambiguatePendingEntry(null);

        // Check for duplicate warning if similar entry in last 10 min
        if (disambiguatePendingEntry.amount) {
          const isDup = await ledgerService.checkDuplicateEntry(
            chosen.id,
            disambiguatePendingEntry.amount,
            disambiguatePendingEntry.type || 'credit',
            600000 // 10 minutes
          );
          setIsDuplicateDetected(isDup);
        } else {
          setIsDuplicateDetected(false);
        }

        setShowConfirmSheet(true);
      }
    },
    [disambiguateIsQuery, disambiguatePendingEntry, speakBalance, language]
  );

  // useSpeechRecognition Hook with Web Audio AnalyserNode volume levels
  const {
    speechState,
    isListening,
    isProcessing,
    transcript,
    interimTranscript,
    errorMessage,
    audioLevels,
    showNoiseWarning,
    startListening,
    stopListening,
    resetTranscript,
    simulateVoiceInput,
  } = useSpeechRecognition({
    locale: currentLangConfig.speechLocale,
    uiLanguage: language,
    asrEngine: settings.asrEngine,
    onTranscriptComplete: handleTranscriptComplete,
    onFallbackToManual: () => setShowManualEntry(true),
  });

  // Manual Entry Save
  const handleManualSave = async (entry: {
    customerName: string;
    amount: number;
    type: TransactionType;
    date: string;
    notes?: string;
  }) => {
    setShowManualEntry(false);
    await handleConfirmTransaction(entry);
  };

  // Delete transaction
  const handleDeleteEntry = async (id: string) => {
    await ledgerService.deleteEntry(id);
    showToast('Entry hata di gayi', { type: 'info' });
    await refreshData();
  };

  return (
    <div className="pb-32 pt-1">
      {/* Voice Not Available Prominent Alert */}
      {voiceNotice.show && (
        <div className="mx-4 my-2 p-3.5 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-lg flex items-center gap-3 text-white animate-fadeIn">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <VolumeX className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black tracking-wider text-amber-400 block uppercase">
              Voice Not Available (Visual Text Mode)
            </span>
            <p className="text-xs font-bold text-slate-200 truncate">
              "{voiceNotice.text}"
            </p>
          </div>
          <button
            type="button"
            onClick={clearVoiceNotice}
            className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Noise Warning Banner (Too noisy? Type instead) */}
      {showNoiseWarning && (
        <div className="mx-4 my-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/40 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-bold">Too noisy? (Dukan me shor hai?)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowManualEntry(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] shadow-sm transition-transform active:scale-95"
          >
            Type instead
          </button>
        </div>
      )}

      {/* 1. Today's Quick Summary Cards */}
      <QuickSummaryCards
        summary={summary}
        totalPendingBalance={totalPendingBalance}
      />

      {/* "Show my QR" Counter Button for in-store customers */}
      <div className="flex items-center justify-end px-4 -mt-1 mb-2 max-w-md mx-auto">
        <button
          type="button"
          data-testid="show-my-qr-btn"
          onClick={handleOpenCounterQr}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 text-xs font-black transition-all active:scale-95 shadow-sm"
          aria-label={t('showMyQr')}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{t('showMyQr')}</span>
        </button>
      </div>

      {/* 2. Live Transcript Banner Area (Above Mic) */}
      <LiveTranscriptBanner
        transcript={transcript}
        interimTranscript={interimTranscript}
        parsedEntry={parsedDraft}
        isListening={isListening}
        isProcessing={isProcessing}
        errorMessage={errorMessage}
        onClear={() => {
          resetTranscript();
          setParsedDraft(null);
        }}
        onOpenManualEntry={() => setShowManualEntry(true)}
      />

      {/* 3. Centered Giant Circular Mic Hero (≥120px) + Language Chips + Type Instead + Hint Chips */}
      <GiantMicHero
        speechState={speechState}
        audioLevels={audioLevels}
        errorMessage={errorMessage}
        onStartListening={startListening}
        onStopListening={stopListening}
        onSimulateVoice={simulateVoiceInput}
        onOpenManualEntry={() => setShowManualEntry(true)}
        isOffline={!isOnline}
      />

      {/* 4. Recent Entries List (Last 5 with Amount component & relative time) */}
      <RecentTransactionsList
        entries={recentEntries}
        onDeleteEntry={handleDeleteEntry}
        onSelectCustomer={handleCustomerClick}
      />

      {/* 5. Transaction Confirmation Bottom Sheet */}
      {showConfirmSheet && parsedDraft && (
        <Suspense fallback={null}>
          <ConfirmEntrySheet
            command={{
              ...parsedDraft,
              intent: 'add_transaction',
            }}
            isDuplicatePotential={isDuplicateDetected}
            onConfirm={handleConfirmTransaction}
            onCancel={() => {
              setShowConfirmSheet(false);
              setParsedDraft(null);
              resetTranscript();
            }}
            onOpenManual={() => {
              setShowConfirmSheet(false);
              setShowManualEntry(true);
            }}
          />
        </Suspense>
      )}

      {/* 6. Balance Query Bottom Sheet (Answer Card) */}
      {showQuerySheet && queryCustomer && (
        <Suspense fallback={null}>
          <BalanceAnswerCard
            customer={queryCustomer}
            recentTransactions={queryTransactions}
            responseTimeMs={queryResponseTime}
            onClose={() => {
              setShowQuerySheet(false);
              setQueryCustomer(null);
            }}
            onViewCustomer={handleCustomerClick}
          />
        </Suspense>
      )}

      {/* 7. Manual Entry Sheet (Fallback when noise is high) */}
      {showManualEntry && (
        <Suspense fallback={null}>
          <ManualEntrySheet
            customers={customers}
            onSave={handleManualSave}
            onClose={() => setShowManualEntry(false)}
          />
        </Suspense>
      )}

      {/* 8. Voice Customer Registration Sheet (F15) */}
      {showRegisterSheet && (
        <Suspense fallback={null}>
          <RegisterCustomerSheet
            isOpen={showRegisterSheet}
            initialName={registerInitialName}
            initialPhone={registerInitialPhone}
            pendingEntry={registerPendingEntry}
            onClose={() => {
              setShowRegisterSheet(false);
              setRegisterPendingEntry(null);
            }}
            onRegistered={handleCustomerRegistered}
            onSelectExisting={handleSelectExistingFromRegister}
          />
        </Suspense>
      )}

      {/* 9. Voice Customer Disambiguation Sheet (F16) */}
      {showDisambiguateSheet && (
        <Suspense fallback={null}>
          <DisambiguationSheet
            isOpen={showDisambiguateSheet}
            spokenName={disambiguateSpokenName}
            candidates={disambiguateCandidates}
            onSelect={handleCustomerDisambiguated}
            onCancel={() => {
              setShowDisambiguateSheet(false);
              setDisambiguatePendingEntry(null);
              setDisambiguateIsQuery(false);
            }}
          />
        </Suspense>
      )}

      {/* 10. Instant UPI Payment Request Sheet (F17) */}
      {showPaymentSheet && (
        <Suspense fallback={null}>
          <PaymentRequestSheet
            isOpen={showPaymentSheet}
            onClose={() => setShowPaymentSheet(false)}
            customer={activePaymentCustomer}
            amount={activePaymentAmount}
            runningBalance={activePaymentBalance}
            profile={shopProfile}
            paymentRequest={activePaymentRequest}
            isCounterMode={isCounterQrMode}
            onAddPhoneNumber={handleAddPhoneFromPayment}
            onOpenSettings={() => navigate('/settings')}
          />
        </Suspense>
      )}

      {/* 11. SLA Latency & Telemetry Badge (?debug=1) */}
      <Suspense fallback={null}>
        <DebugLatencyBadge metrics={latencyMetrics} />
      </Suspense>
    </div>
  );
};
export default HomeScreen;
