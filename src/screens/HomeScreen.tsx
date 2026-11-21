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

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuickSummaryCards } from '../components/QuickSummaryCards';
import { GiantMicHero } from '../components/GiantMicHero';
import { LiveTranscriptBanner } from '../components/LiveTranscriptBanner';
import { RecentTransactionsList } from '../components/RecentTransactionsList';
import { ConfirmEntrySheet } from '../components/ConfirmEntrySheet';
import { BalanceAnswerCard } from '../components/BalanceAnswerCard';
import { ManualEntrySheet } from '../components/ManualEntrySheet';
import { Customer, LedgerEntry, DailySummary, ParsedEntry, TransactionType, ConfirmEntryData } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { parseTranscript } from '../services/parser';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSoundbox } from '../hooks/useSoundbox';
import { useSpeak } from '../hooks/useSpeak';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from '../components/ui/Toast';
import { useSettings } from '../hooks/useSettings';
import { DebugLatencyBadge, LatencyMetrics } from '../components/DebugLatencyBadge';
import { VolumeX, AlertCircle } from 'lucide-react';

interface HomeScreenProps {
  onSelectCustomer?: (customerId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCustomer }) => {
  const navigate = useNavigate();
  const { language, currentLangConfig } = useI18n();
  const { settings } = useSettings();
  const { announceCreditSaved, announcePaymentSaved } = useSoundbox();
  const { speakBalance, voiceNotice, clearVoiceNotice } = useSpeak();
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

  const [queryCustomer, setQueryCustomer] = useState<Customer | null>(null);
  const [queryTransactions, setQueryTransactions] = useState<LedgerEntry[]>([]);
  const [showQuerySheet, setShowQuerySheet] = useState(false);
  const [queryResponseTime, setQueryResponseTime] = useState<number | undefined>(undefined);

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

      for (const item of items) {
        const customer = await ledgerService.findOrCreateCustomer(item.customerName);
        await ledgerService.addEntry(
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
      }

      // Audio Feedback for single entry (multi-entry plays sound inside sheet)
      const primary = items[0];
      if (items.length === 1) {
        if (primary.type === 'credit') {
          announceCreditSaved(primary.customerName, primary.amount);
        } else {
          announcePaymentSaved(primary.customerName, primary.amount);
        }
        showToast(
          `${primary.customerName} ko ${primary.type === 'credit' ? 'udhaar' : 'jama'} likha gaya!`,
          { type: 'success' }
        );
      } else {
        showToast(`${items.length} hisaab entries safalta se save ho gayi!`, {
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
    [parsedDraft, announceCreditSaved, announcePaymentSaved, showToast, refreshData]
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
        // Query balance for customer
        const matched = await ledgerService.findCustomerByName(targetName);
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
          const latency = Math.round(performance.now() - queryStart);
          setQueryResponseTime(latency);
          setLatencyMetrics((prev) => ({ ...prev, queryResponseTimeMs: latency }));
          setQueryCustomer(newCust);
          setQueryTransactions([]);
          setShowQuerySheet(true);
          speakBalance(newCust.name, 0, language);
        }
      } else if (result.intent === 'entry' || result.type === 'entry') {
        // Transaction intent: open confirm sheet
        setParsedDraft(result.data);

        // Check for duplicate warning if similar entry in last 10 min
        const matched = await ledgerService.findCustomerByName(result.data.customerName || '');
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
        showToast(result.message || 'Hisaab samajh nahi aaya. Kripya dobara bolein.', {
          type: 'warning',
        });
      }
    },
    [parsedDraft, showConfirmSheet, showQuerySheet, handleConfirmTransaction, speakBalance, language, showToast]
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
      )}

      {/* 6. Balance Query Bottom Sheet (Answer Card) */}
      {showQuerySheet && queryCustomer && (
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
      )}

      {/* 7. Manual Entry Sheet (Fallback when noise is high) */}
      {showManualEntry && (
        <ManualEntrySheet
          customers={customers}
          onSave={handleManualSave}
          onClose={() => setShowManualEntry(false)}
        />
      )}

      {/* 8. SLA Latency & Telemetry Badge (?debug=1) */}
      <DebugLatencyBadge metrics={latencyMetrics} />
    </div>
  );
};
export default HomeScreen;
