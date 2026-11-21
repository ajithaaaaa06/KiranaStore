/**
 * Udhaar Sathi PIN Lock Screen
 * 
 * Displayed on app startup if a 4-6 digit security PIN is configured.
 * Features:
 * - Large tactile numeric keypad (minimum 56px - 64px tap targets)
 * - Visual PIN dot indicators (4-6 digits)
 * - Shake animation on incorrect PIN
 * - "Forgot PIN" dialog explaining Privacy by Design (AES-256 encryption means no backdoor/recovery)
 * - Confirmation flow to reset app & wipe data if PIN is forgotten
 */

import React, { useState, useEffect } from 'react';
import { Lock, Delete, RotateCcw, AlertTriangle, ShieldAlert, KeyRound, Check } from 'lucide-react';
import { ledgerService } from '../services/ledgerService';
import { useI18n } from '../i18n/I18nContext';

interface PinLockScreenProps {
  onUnlock: () => void;
  onResetApp?: () => void;
}

export const PinLockScreen: React.FC<PinLockScreenProps> = ({ onUnlock, onResetApp }) => {
  const { t } = useI18n();
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [confirmResetStep, setConfirmResetStep] = useState<boolean>(false);

  // Auto-attempt unlock when 4 to 6 digits are typed
  useEffect(() => {
    if (pin.length >= 4) {
      handleAttemptUnlock(pin);
    }
  }, [pin]);

  const handleDigit = (digit: string) => {
    if (pin.length >= 6 || isVerifying) return;
    setErrorMsg(null);
    setPin((prev) => prev + digit);
  };

  const handleBackspace = () => {
    if (isVerifying) return;
    setErrorMsg(null);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isVerifying) return;
    setErrorMsg(null);
    setPin('');
  };

  const handleAttemptUnlock = async (candidatePin: string) => {
    setIsVerifying(true);
    try {
      const success = await ledgerService.unlockWithPin(candidatePin);
      if (success) {
        onUnlock();
      } else {
        // If length reached 6 and failed, or 4 failed
        if (candidatePin.length >= 4) {
          triggerError(t('pinIncorrect'));
        }
      }
    } catch {
      triggerError(t('pinIncorrect'));
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setPin('');
    }, 600);
  };

  const handleWipeAndReset = async () => {
    await ledgerService.resetAppAndWipeData();
    setShowForgotModal(false);
    setConfirmResetStep(false);
    if (onResetApp) {
      onResetApp();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col justify-between p-6 select-none animate-fadeIn">
      {/* Top Header & Privacy Badge */}
      <div className="w-full max-w-sm mx-auto text-center pt-8">
        <div className="w-16 h-16 rounded-3xl bg-teal-500/20 border border-teal-500/40 text-teal-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-teal-500/10">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          Udhaar Sathi Locked 🔒
        </h1>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          {t('pinLockedNotice')}
        </p>
      </div>

      {/* Middle: PIN Dots & Error Animation */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center my-4">
        {/* Visual Dots */}
        <div
          className={`flex items-center gap-4 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  isFilled
                    ? 'bg-teal-400 border-teal-400 scale-110 shadow-md shadow-teal-500/50'
                    : 'bg-slate-800/80 border-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Status / Error Message */}
        <div className="h-8 mt-3 flex items-center justify-center text-center px-4">
          {errorMsg ? (
            <p className="text-xs font-black text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          ) : isVerifying ? (
            <p className="text-xs font-bold text-teal-400 animate-pulse">
              Verifying encryption key...
            </p>
          ) : (
            <p className="text-[11px] font-medium text-slate-500">
              4 se 6 anko ka PIN dalein
            </p>
          )}
        </div>
      </div>

      {/* Bottom: Large Numeric Keypad & Forgot PIN */}
      <div className="w-full max-w-xs mx-auto pb-6 space-y-4">
        {/* 3x4 Grid */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleDigit(d)}
              className="h-16 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-90 border border-slate-700 text-2xl font-black text-white flex items-center justify-center shadow-sm transition-all"
            >
              {d}
            </button>
          ))}

          {/* Clear Button */}
          <button
            type="button"
            onClick={handleClear}
            className="h-16 rounded-2xl bg-slate-800/40 hover:bg-slate-800 active:scale-90 border border-slate-800 text-xs font-black text-slate-400 flex items-center justify-center transition-all"
          >
            CLEAR
          </button>

          {/* Zero Button */}
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-16 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-90 border border-slate-700 text-2xl font-black text-white flex items-center justify-center shadow-sm transition-all"
          >
            0
          </button>

          {/* Backspace Button */}
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Backspace"
            className="h-16 rounded-2xl bg-slate-800/40 hover:bg-slate-800 active:scale-90 border border-slate-800 text-slate-300 flex items-center justify-center transition-all"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        {/* Forgot PIN Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setShowForgotModal(true);
              setConfirmResetStep(false);
            }}
            className="text-xs font-bold text-slate-400 hover:text-teal-400 transition-colors py-2 px-4 rounded-xl"
          >
            PIN bhool gaye? (Forgot PIN)
          </button>
        </div>
      </div>

      {/* Forgot PIN / Privacy Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-lg font-black text-white">
                Privacy by Design 🔒
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t('pinCryptoLockDesc')}
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Data recover nahi ho sakta</span>
              </p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Agar aap PIN bhool gaye hain, toh mathematical encryption ki wajah se data ko recover karna asambhav hai.
              </p>
            </div>

            {confirmResetStep ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-black text-rose-400 text-center">
                  Kya aap sach me saara data delete karke app reset karna chahte hain?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmResetStep(false)}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all min-h-[48px]"
                  >
                    Nahi, Wapas
                  </button>
                  <button
                    type="button"
                    onClick={handleWipeAndReset}
                    className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white transition-all min-h-[48px]"
                  >
                    {t('yesReset')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-xs font-black text-white transition-all min-h-[48px]"
                >
                  PIN Yaad Hai, Wapas Jayein
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetStep(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/60 text-xs font-bold text-rose-300 transition-all min-h-[48px]"
                >
                  Reset App & Delete Data
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinLockScreen;
