/**
 * Voice Khata Application Shell
 * 
 * Persistent Layout:
 * - Top Bar: Editable Shop Name, Current Speech Language Chip, OnlineBadge, Settings shortcut
 * - 3-Tab Bottom Navigation Bar: Home (/), Customers (/customers), Summary (/summary)
 * - Persistent layout ensures bottom nav is always visible but never overlaps the hero mic.
 *
 * Routes:
 * - / (Home - Eager Loaded)
 * - /customers (Customers Khata List - Lazy Loaded)
 * - /customers/:id (Customer Ledger History & WhatsApp - Lazy Loaded)
 * - /summary (Today's Hisaab & Daybook - Lazy Loaded)
 * - /settings (Language & Soundbox Config - Lazy Loaded)
 * - /styleguide (Component Showroom - Lazy Loaded)
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './screens/HomeScreen';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { InstallAppBanner } from './components/InstallAppBanner';
import { OnboardingModal } from './components/OnboardingModal';
import { PinLockScreen } from './components/PinLockScreen';
import { PwaUpdateToast } from './components/PwaUpdateToast';
import { ToastProvider } from './components/ui/Toast';
import { ledgerService } from './services/ledgerService';
import { requestStoragePersistence } from './services/db';

// Lazy-load all non-home routes to ensure <150KB initial home JS bundle
const CustomersScreen = lazy(() => import('./screens/CustomersScreen'));
const CustomerDetailScreen = lazy(() => import('./screens/CustomerDetailScreen'));
const SummaryScreen = lazy(() => import('./screens/SummaryScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const StyleguideScreen = lazy(() => import('./screens/StyleguideScreen'));

/**
 * Persistent Layout Wrapper
 * Keeps Top Bar and 3-tab Bottom Nav mounted across routes.
 * Content padding pb-32 ensures bottom nav NEVER overlaps the mic button.
 */
const AppLayout: React.FC = () => {
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('vk_onboarding_completed') !== 'true';
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isCheckingLock, setIsCheckingLock] = useState(true);

  React.useEffect(() => {
    const handleOpenOnboarding = () => setShowOnboarding(true);
    window.addEventListener('vk_open_onboarding', handleOpenOnboarding);

    // Check lock state & persistence on load
    const checkSecurityState = async () => {
      try {
        await ledgerService.init();
        const hasPin = await ledgerService.isPinSet();
        const unlocked = ledgerService.isUnlocked();
        setIsLocked(hasPin && !unlocked);
      } catch {
        setIsLocked(false);
      } finally {
        setIsCheckingLock(false);
      }
      requestStoragePersistence();
    };

    checkSecurityState();

    const handlePinLockEvent = (e: any) => {
      if (e?.detail?.locked !== undefined) {
        setIsLocked(e.detail.locked);
      }
    };
    window.addEventListener('vk_pin_lock_state_changed', handlePinLockEvent);

    return () => {
      window.removeEventListener('vk_open_onboarding', handleOpenOnboarding);
      window.removeEventListener('vk_pin_lock_state_changed', handlePinLockEvent);
    };
  }, []);

  if (isCheckingLock) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-teal-400 font-bold text-sm">
        Voice Khata Securing Ledger...
      </div>
    );
  }

  if (isLocked) {
    return (
      <PinLockScreen
        onUnlock={() => setIsLocked(false)}
        onResetApp={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-teal-600 selection:text-white transition-colors">
      {/* PWA Update-Available Toast ("New version - tap to refresh") */}
      <PwaUpdateToast />

      {/* PWA Install App Banner (beforeinstallprompt) */}
      <InstallAppBanner />

      {/* Top Bar: Shop Name, Language Chip, OnlineBadge */}
      <Header onOpenLanguagePicker={() => setShowLanguagePicker(true)} />

      {/* Main Content Area: pb-32 ensures bottom nav never overlaps mic button */}
      <main className="flex-1 w-full max-w-md mx-auto relative pb-28">
        <Outlet />
      </main>

      {/* Persistent 3-Tab Bottom Navigation Bar */}
      <BottomNavBar />

      {/* Global Language Selector Modal */}
      {showLanguagePicker && (
        <LanguageSelectorModal onClose={() => setShowLanguagePicker(false)} />
      )}

      {/* First-Run Onboarding Modal (3 swipeable screens) */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Home Screen is eagerly loaded */}
            <Route path="/" element={<HomeScreen />} />

            {/* Non-Home Screens are lazy-loaded with Suspense */}
            <Route
              path="/customers"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-bold">
                      Loading Grahak Khata...
                    </div>
                  }
                >
                  <CustomersScreen />
                </Suspense>
              }
            />

            <Route
              path="/customers/:id"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-bold">
                      Loading Customer Ledger...
                    </div>
                  }
                >
                  <CustomerDetailScreen />
                </Suspense>
              }
            />

            <Route
              path="/summary"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-bold">
                      Loading Hisaab Summary...
                    </div>
                  }
                >
                  <SummaryScreen />
                </Suspense>
              }
            />

            <Route
              path="/settings"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-bold">
                      Loading Settings...
                    </div>
                  }
                >
                  <SettingsScreen onOpenLanguagePicker={() => {}} />
                </Suspense>
              }
            />
          </Route>

          {/* Standalone Route for 360px Styleguide Visual Check */}
          <Route
            path="/styleguide"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen text-slate-400 font-bold">
                    Loading Styleguide...
                  </div>
                }
              >
                <StyleguideScreen />
              </Suspense>
            }
          />

          {/* Catch-all route redirects to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};
export default App;
