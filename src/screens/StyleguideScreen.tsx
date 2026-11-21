/**
 * Hidden Styleguide Screen (/styleguide)
 * Comprehensive visual inspection showroom for all design system tokens and UI components
 * specifically testable on a 360px mobile viewport.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  Wallet,
  Check,
  Trash2,
  Share2,
  Send,
  Sparkles,
  Smartphone,
  Sun,
  Moon,
  Info,
  AlertTriangle,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  Button,
  Card,
  BottomSheet,
  Chip,
  Badge,
  IconButton,
  Amount,
  EmptyState,
  OnlineBadge,
  useToast,
} from '../components/ui';
import { formatRupees, formatRelativeDate } from '../lib/format';

export const StyleguideScreen: React.FC = () => {
  const { showToast } = useToast();

  // Controls for interactive testing
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewportMode, setViewportMode] = useState<'360' | '412' | 'full'>('360');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState<'all' | 'credit' | 'payment'>('all');
  const [isOnlinePreview, setIsOnlinePreview] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen py-6 px-3 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      {/* Top Floating Control Bar */}
      <div className="max-w-3xl mx-auto mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to App</span>
          </Link>
          <span className="text-xs font-black uppercase tracking-wider text-primary dark:text-primary-400">
            UI Styleguide
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport Frame Presets (360×640, 412×915, Full) */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewportMode('360')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewportMode === '360'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              360×640
            </button>
            <button
              onClick={() => setViewportMode('412')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewportMode === '412'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              412×915
            </button>
            <button
              onClick={() => setViewportMode('full')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewportMode === 'full'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Responsive
            </button>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            <span>{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Frame */}
      <div
        className={`mx-auto transition-all ${
          viewportMode === '360'
            ? 'w-[360px] bg-slate-50 dark:bg-slate-950 p-4 border-4 border-slate-400 dark:border-slate-700 rounded-[36px] shadow-2xl relative'
            : viewportMode === '412'
            ? 'w-[412px] bg-slate-50 dark:bg-slate-950 p-4 border-4 border-slate-400 dark:border-slate-700 rounded-[40px] shadow-2xl relative'
            : 'max-w-2xl bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-200 dark:border-slate-800'
        }`}
      >
        {viewportMode !== 'full' && (
          <div className="w-24 h-4 bg-slate-400 dark:bg-slate-700 rounded-full mx-auto mb-4" />
        )}

        <header className="mb-6">
          <Badge variant="primary" size="sm">Design System</Badge>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            Voice Khata Components
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Verified for 360px viewport width & minimum 56px touch targets.
          </p>
        </header>

        <div className="space-y-8">
          {/* 1. DESIGN TOKENS */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              1. Color Tokens
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="p-3 rounded-xl bg-primary text-white flex flex-col justify-between h-20 shadow-sm">
                <span>Primary (Deep Teal)</span>
                <span className="font-mono text-[10px] opacity-80">#0f766e</span>
              </div>
              <div className="p-3 rounded-xl bg-credit text-white flex flex-col justify-between h-20 shadow-sm">
                <span>Credit (Amber Udhaar)</span>
                <span className="font-mono text-[10px] opacity-80">#d97706</span>
              </div>
              <div className="p-3 rounded-xl bg-payment text-white flex flex-col justify-between h-20 shadow-sm">
                <span>Payment (Green Jama)</span>
                <span className="font-mono text-[10px] opacity-80">#16a34a</span>
              </div>
              <div className="p-3 rounded-xl bg-danger text-white flex flex-col justify-between h-20 shadow-sm">
                <span>Danger (High Alert)</span>
                <span className="font-mono text-[10px] opacity-80">#dc2626</span>
              </div>
            </div>
          </section>

          {/* 2. REGIONAL FONT SCRIPT DISPLAY */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              2. Noto Sans Font Subsets
            </h2>
            <Card padding="sm" className="space-y-2">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block">Devanagari (हिन्दी)</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  रमेश को ₹500 उधार दिया • आवाज खाता
                </p>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block">Kannada (ಕನ್ನಡ)</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  ರಮೇಶ್ ಅವರಿಗೆ ₹500 ಸಾಲ ನೀಡಲಾಗಿದೆ
                </p>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block">Tamil (தமிழ்)</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  ரமேஷிற்கு ₹500 கடன் கொடுக்கப்பட்டது
                </p>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block">Telugu (తెలుగు)</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  రమేష్ కి ₹500 అప్పు ఇవ్వబడింది
                </p>
              </div>
            </Card>
          </section>

          {/* 3. BUTTONS (lg: 56px, xl: 64px) */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              3. Buttons (Min 56px Target)
            </h2>
            <div className="space-y-2.5">
              <Button size="lg" fullWidth icon={<Mic className="w-5 h-5" />}>
                Primary Button (lg - 56px)
              </Button>

              <Button size="xl" fullWidth variant="primary" icon={<Sparkles className="w-6 h-6" />}>
                Hero Button (xl - 64px)
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="lg">
                  Secondary
                </Button>
                <Button variant="danger" size="lg" icon={<Trash2 className="w-4 h-4" />}>
                  Danger
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" size="lg">
                  Ghost
                </Button>
                <Button variant="primary" size="lg" loading>
                  Saving
                </Button>
              </div>
            </div>
          </section>

          {/* 4. ICON BUTTONS (Min 56px Target) */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              4. Icon Buttons (Min 56px)
            </h2>
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <IconButton variant="primary" size="lg" icon={<Mic className="w-6 h-6" />} label="Microphone" />
              <IconButton variant="secondary" size="lg" icon={<Send className="w-5 h-5 text-emerald-600" />} label="Send reminder" />
              <IconButton variant="ghost" size="lg" icon={<Share2 className="w-5 h-5 text-blue-600" />} label="Share receipt" />
              <IconButton variant="danger" size="lg" icon={<Trash2 className="w-5 h-5 text-rose-600" />} label="Delete entry" />
            </div>
          </section>

          {/* 5. AMOUNT COMPONENT */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              5. Amount (Indian Grouping & Semantics)
            </h2>
            <Card padding="md" className="space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Credit / Udhaar (Amber + ArrowUpRight)
                </span>
                <Amount value={124500} type="credit" size="xl" showTypeLabel />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Payment / Jama (Green + ArrowDownLeft)
                </span>
                <Amount value={50000} type="payment" size="lg" showTypeLabel />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Hero Big Display
                </span>
                <Amount value={3450} type="credit" size="hero" />
              </div>
            </Card>
          </section>

          {/* 6. CHIPS & BADGES */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              6. Chips & Badges
            </h2>
            <div className="space-y-3">
              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Sabhi (All)"
                  count={12}
                  selected={selectedChip === 'all'}
                  onClick={() => setSelectedChip('all')}
                />
                <Chip
                  label="Udhaar (Credit)"
                  variant="credit"
                  count={8}
                  selected={selectedChip === 'credit'}
                  onClick={() => setSelectedChip('credit')}
                />
                <Chip
                  label="Jama (Paid)"
                  variant="payment"
                  count={4}
                  selected={selectedChip === 'payment'}
                  onClick={() => setSelectedChip('payment')}
                />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="credit">Udhaar Owed</Badge>
                <Badge variant="payment">Jama Mila</Badge>
                <Badge variant="primary">Kirana Pro</Badge>
                <Badge variant="danger">High Balance</Badge>
                <Badge variant="neutral">Offline</Badge>
              </div>
            </div>
          </section>

          {/* 7. CARDS */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              7. Cards
            </h2>
            <div className="space-y-2.5">
              <Card variant="credit" padding="md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-200">
                    Udhaar Diya (Credit Card)
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl font-black text-amber-900 dark:text-amber-300 mt-1">
                  {formatRupees(2400)}
                </p>
              </Card>

              <Card variant="payment" padding="md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                    Jama Mila (Payment Card)
                  </span>
                  <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mt-1">
                  {formatRupees(1800)}
                </p>
              </Card>

              <Card variant="interactive" padding="md" onClick={() => showToast('Card clicked!', { type: 'info' })}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Interactive Card</span>
                  <span className="text-xs text-slate-400 font-semibold">Tap me →</span>
                </div>
              </Card>
            </div>
          </section>

          {/* 8. ONLINE / OFFLINE BADGE */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              8. Online / Offline Badges
            </h2>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <OnlineBadge isOnlineOverride={isOnlinePreview} />
              <button
                onClick={() => setIsOnlinePreview(!isOnlinePreview)}
                className="text-xs text-blue-600 dark:text-blue-400 underline font-semibold ml-auto"
              >
                Toggle State
              </button>
            </div>
          </section>

          {/* 9. TOAST NOTIFICATIONS */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              9. Toast Notifications
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => showToast('Entry darj kar li gayi!', { type: 'success' })}
              >
                Success Toast
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => showToast('Duplicate entry warning!', { type: 'warning' })}
              >
                Warning Toast
              </Button>
            </div>
          </section>

          {/* 10. BOTTOM SHEET TRIGGER */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              10. Bottom Sheet
            </h2>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setIsBottomSheetOpen(true)}
            >
              Open Test Bottom Sheet
            </Button>

            <BottomSheet
              isOpen={isBottomSheetOpen}
              onClose={() => setIsBottomSheetOpen(false)}
              title="Test Bottom Sheet"
            >
              <div className="space-y-4 py-2">
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  This bottom sheet complies with the requirement: slides up smoothly without hiding the hero mic or essential context.
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                  <Amount value={850} type="credit" size="xl" showTypeLabel />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setIsBottomSheetOpen(false);
                    showToast('Bottom sheet action confirmed!', { type: 'success' });
                  }}
                >
                  Confirm Action
                </Button>
              </div>
            </BottomSheet>
          </section>

          {/* 11. EMPTY STATE */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              11. Empty State
            </h2>
            <EmptyState
              icon={<Search className="w-8 h-8" />}
              title="Koi Grahak Nahi Mila"
              description="Is naam se koi grahak darj nahi hai. Naya khata shuru karne ke liye bol kar ya likh kar jodein."
              action={
                <Button size="lg" variant="primary">
                  + Naya Grahak Jodein
                </Button>
              }
            />
          </section>

          {/* 12. FORMATTERS TEST RUNNER DISPLAY */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              12. /lib/format.ts Output Verification
            </h2>
            <Card padding="md" className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">formatRupees(124500):</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatRupees(124500)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">formatRupees(500):</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatRupees(500)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">formatRelativeDate(Today):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatRelativeDate(new Date())} (Hinglish) / {formatRelativeDate(new Date(), { lang: 'en' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">formatRelativeDate(Yesterday):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatRelativeDate(new Date(Date.now() - 86400000))} (Hinglish) / {formatRelativeDate(new Date(Date.now() - 86400000), { lang: 'en' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">formatRelativeDate(2 days ago):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatRelativeDate(new Date(Date.now() - 86400000 * 2))} (Hinglish)
                </span>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
export default StyleguideScreen;
