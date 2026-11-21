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
import { InstallAppBanner } from './components/InstallAppBanner';
import { PwaUpdateToast } from './components/PwaUpdateToast';
import { ToastProvider } from './components/ui/Toast';
import { ledgerService } from './services/ledgerService';
import { requestStoragePersistence } from './services/db';

// Lazy-load modals and non-home routes to ensure <150KB initial home JS bundle
const LanguageSelectorModal = lazy(() => import('./components/LanguageSelectorModal').then(m => ({ default: m.LanguageSelectorModal })));
const ShopkeeperSignupModal = lazy(() => import('./components/ShopkeeperSignupModal').then(m => ({ default: m.ShopkeeperSignupModal })));
const OnboardingModal = lazy(() => import('./components/OnboardingModal').then(m => ({ default: m.OnboardingModal })));
const PinLockScreen = lazy(() => import('./components/PinLockScreen').then(m => ({ default: m.PinLockScreen })));

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
  const isDemo = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('demo') === '1' || localStorage.getItem('vk_demo_mode') === 'true';
  }, []);

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showSignup, setShowSignup] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1' || localStorage.getItem('vk_demo_mode') === 'true') {
      return false;
    }
    return localStorage.getItem('vk_signup_completed') !== 'true';
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isSignupPending = localStorage.getItem('vk_signup_completed') !== 'true';
    const urlParams = new URLSearchParams(window.location.search);
    const isDemoMode = urlParams.get('demo') === '1' || localStorage.getItem('vk_demo_mode') === 'true';
    if (!isDemoMode && isSignupPending) return false;
    return localStorage.getItem('vk_onboarding_completed') !== 'true';
  });
  const [isLocked, setIsLocked] = useState(false);
  const [isCheckingLock, setIsCheckingLock] = useState(true);

  React.useEffect(() => {
    const handleOpenOnboarding = () => setShowOnboarding(true);
    const handleOpenSignup = () => setShowSignup(true);
    window.addEventListener('vk_open_onboarding', handleOpenOnboarding);
    window.addEventListener('vk_open_signup', handleOpenSignup);

    // Check lock state & persistence on load
    const checkSecurityState = async () => {
      try {
        await ledgerService.init();

        // Seed demo profile automatically in demo mode (?demo=1)
        if (isDemo) {
          localStorage.setItem('vk_signup_completed', 'true');
          const existingProfile = await ledgerService.getProfile();
          if (!existingProfile) {
            await ledgerService.saveProfile({
              shopName: 'Sri Balaji Kirana Store',
              shopkeeperName: 'Ramesh Kumar',
              phone: '9845012345',
              upiId: 'balaji.kirana@oksbi',
            });
          }
        }

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
      window.removeEventListener('vk_open_signup', handleOpenSignup);
      window.removeEventListener('vk_pin_lock_state_changed', handlePinLockEvent);
    };
  }, [isDemo]);

  const handleSignupComplete = () => {
    setShowSignup(false);
    if (localStorage.getItem('vk_onboarding_completed') !== 'true') {
      setShowOnboarding(true);
    }
  };

  if (isCheckingLock) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-teal-400 font-bold text-sm">
        Voice Khata Securing Ledger...
      </div>
    );
  }

  if (isLocked) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <PinLockScreen
          onUnlock={() => setIsLocked(false)}
          onResetApp={() => window.location.reload()}
        />
      </Suspense>
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
        <Suspense fallback={null}>
          <LanguageSelectorModal onClose={() => setShowLanguagePicker(false)} />
        </Suspense>
      )}

      {/* First-Run Shopkeeper Sign-Up Wizard (F14) */}
      {showSignup && (
        <Suspense fallback={null}>
          <ShopkeeperSignupModal
            isOpen={showSignup}
            onComplete={handleSignupComplete}
          />
        </Suspense>
      )}

      {/* First-Run Onboarding Modal (3 swipeable screens) */}
      {showOnboarding && !showSignup && (
        <Suspense fallback={null}>
          <OnboardingModal
            isOpen={showOnboarding && !showSignup}
            onClose={() => setShowOnboarding(false)}
          />
        </Suspense>
      )}
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
