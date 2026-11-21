/**
 * PaymentRequestSheet Component (F17)
 * 
 * Instant on-device UPI payment request bottom sheet:
 * - Offline generated QR Code (qrcode-generator) with quiet zone and high contrast
 * - Displays customer name, amount, running balance, shop name, and UPI ID
 * - "WhatsApp bhejein" button opening pre-filled message (disabled when offline)
 * - "QR share karein" button sharing image via Web Share API or download fallback
 * - "Baad mein" dismiss button that never blocks the voice mic
 * - Edge case handling: customer without phone number, missing shop UPI ID, offline mode
 */

import React, { useMemo, useState } from 'react';
import {
  X,
  Share2,
  Download,
  AlertCircle,
  Phone,
  CheckCircle,
  ExternalLink,
  Store,
  QrCode,
  WifiOff,
} from 'lucide-react';
import { Customer, ShopProfile, PaymentRequest, LanguageCode } from '../services/types';
import {
  buildUpiLink,
  buildPaymentRequestWhatsAppMessage,
  buildWhatsAppUrl,
  generateQrDataUrl,
  dataUrlToBlob,
} from '../services/upiPayment';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from './ui/Toast';

export interface PaymentRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
  amount?: number;
  runningBalance?: number;
  profile: ShopProfile | null;
  paymentRequest?: PaymentRequest | null;
  onAddPhoneNumber?: () => void;
  onOpenSettings?: () => void;
  isCounterMode?: boolean; // When true, displays counter payment QR for any walk-in customer
}

export const PaymentRequestSheet: React.FC<PaymentRequestSheetProps> = ({
  isOpen,
  onClose,
  customer,
  amount = 0,
  runningBalance = 0,
  profile,
  paymentRequest,
  onAddPhoneNumber,
  onOpenSettings,
  isCounterMode = false,
}) => {
  const { isOnline } = useOnlineStatus();
  const { t, language } = useI18n();
  const { showToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  // Compute standard UPI deep-link URL
  const upiLink = useMemo(() => {
    if (!profile || !profile.upiId) return '';
    return buildUpiLink({
      upiId: profile.upiId,
      shopName: profile.shopName || 'Kirana Store',
      amount: isCounterMode ? undefined : amount > 0 ? amount : undefined,
      note: isCounterMode
        ? `Counter Payment - ${profile.shopName || 'Shop'}`
        : `Voice Khata - ${customer?.name || 'Customer'}`,
      ref: paymentRequest?.ref,
    });
  }, [profile, isCounterMode, amount, customer, paymentRequest]);

  // Generate on-device QR Code as Base64 Data URL (runs 100% offline)
  const qrDataUrl = useMemo(() => {
    if (!upiLink) return '';
    return generateQrDataUrl(upiLink, 6, 4);
  }, [upiLink]);

  // Build WhatsApp pre-filled message text
  const whatsAppMessage = useMemo(() => {
    if (!customer || !profile?.upiId) return '';
    return buildPaymentRequestWhatsAppMessage({
      customerName: customer.name,
      amountAdded: amount,
      runningBalance: runningBalance,
      shopName: profile.shopName || 'Kirana Store',
      upiId: profile.upiId,
      paymentLink: upiLink,
      lang: language as LanguageCode,
    });
  }, [customer, profile, amount, runningBalance, upiLink, language]);

  // WhatsApp click-to-chat URL
  const whatsAppUrl = useMemo(() => {
    if (!customer?.phone || !whatsAppMessage) return '';
    return buildWhatsAppUrl(customer.phone, whatsAppMessage);
  }, [customer?.phone, whatsAppMessage]);

  if (!isOpen) return null;

  // Handle WhatsApp button click
  const handleOpenWhatsApp = () => {
    if (!isOnline) {
      showToast(t('whatsappOfflineHint'), { type: 'warning' });
      return;
    }
    if (!whatsAppUrl) return;
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle Share / Download QR image
  const handleShareQr = async () => {
    if (!qrDataUrl) return;
    setIsSharing(true);

    const blob = dataUrlToBlob(qrDataUrl);
    const fileName = `${(profile?.shopName || 'kirana').replace(/\s+/g, '_')}_upi_qr.png`;

    try {
      if (blob && typeof navigator !== 'undefined' && 'canShare' in navigator) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${profile?.shopName || 'Shop'} UPI QR`,
            text: `Pay via UPI to ${profile?.shopName}: ${profile?.upiId}`,
            files: [file],
          });
          showToast(t('qrSavedToast'), { type: 'success' });
          setIsSharing(false);
          return;
        }
      }

      // Fallback: trigger download link
      const a = document.createElement('a');
      a.href = qrDataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(t('qrSavedToast'), { type: 'success' });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share/download QR:', err);
        showToast(t('qrSaveError'), { type: 'warning' });
      }
    } finally {
      setIsSharing(false);
    }
  };

  const hasUpi = Boolean(profile && profile.upiId && profile.upiId.trim().length > 0);
  const hasPhone = Boolean(customer && customer.phone && customer.phone.trim().length >= 10);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      data-testid="payment-request-sheet"
    >
      {/* Tap backdrop to dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="w-full max-w-lg mx-auto bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl flex flex-col text-white max-h-[88vh] overflow-y-auto">
        {/* Sheet Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {isCounterMode ? t('showMyQrTitle') : t('paymentRequestTitle')}
              </h3>
              <p className="text-[11px] font-semibold text-slate-400">
                {isCounterMode ? t('showMyQrDesc') : t('paymentRequestSubtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Missing Shop UPI Warning */}
        {!hasUpi && (
          <div className="my-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-bold">{t('noUpiIdWarning')}</span>
            </div>
            {onOpenSettings && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="self-start px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-transform active:scale-95"
              >
                {t('setupUpiNow')}
              </button>
            )}
          </div>
        )}

        {/* UPI QR Display Card (Offline generated, Quiet zone & High contrast) */}
        {hasUpi && (
          <div className="my-3 flex flex-col items-center">
            {/* White card with clean quiet zone and high contrast black on white QR */}
            <div className="p-4 bg-white rounded-3xl shadow-lg border border-slate-200 flex flex-col items-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="UPI QR Code"
                  data-testid="upi-qr-image"
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
                  Generating QR...
                </div>
              )}

              {/* Shop info on QR card */}
              <div className="mt-2 text-center">
                <span className="text-xs font-black text-slate-900 block truncate max-w-[200px]">
                  {profile?.shopName}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-600 block truncate max-w-[200px]">
                  {profile?.upiId}
                </span>
              </div>
            </div>

            {/* Entry Amount & Running Balance Details */}
            {!isCounterMode && customer && (
              <div className="w-full mt-3.5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('customerName')}
                  </span>
                  <span className="text-sm font-black text-white" data-testid="customer-name-label">
                    {customer.name}
                  </span>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">{t('udhaarAdded')}:</span>
                    <span className="text-sm font-black text-amber-400" data-testid="added-amount-label">
                      ₹{amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold mt-0.5">
                    {t('totalBalance')}: <span className="font-bold text-white">₹{runningBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customer without phone number warning & Add number prompt */}
        {!isCounterMode && customer && !hasPhone && (
          <div className="my-2 p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-semibold" data-testid="no-phone-warning">{t('noPhoneWarning')}</span>
            </div>
            {onAddPhoneNumber && (
              <button
                type="button"
                data-testid="add-phone-number-btn"
                onClick={onAddPhoneNumber}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs transition-transform active:scale-95"
              >
                {t('noPhoneAddNumber')}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-3 space-y-2">
          {/* 1. WhatsApp Button (Only shown if customer has phone number) */}
          {!isCounterMode && customer && hasPhone && (
            <div className="space-y-1">
              <button
                type="button"
                data-testid="send-whatsapp-btn"
                disabled={!isOnline}
                onClick={handleOpenWhatsApp}
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all min-h-[50px] ${
                  isOnline
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                }`}
              >
                <span className="text-lg">💬</span>
                <span>{t('sendWhatsAppPayment')}</span>
                {!isOnline && <WifiOff className="w-4 h-4 ml-1 text-slate-400" />}
              </button>

              <p className="text-[10px] text-center font-medium text-slate-400">
                {isOnline ? t('sendWhatsAppHint') : t('whatsappOfflineHint')}
              </p>
            </div>
          )}

          {/* 2. QR Share / Download Button */}
          {hasUpi && (
            <button
              type="button"
              data-testid="share-qr-btn"
              onClick={handleShareQr}
              disabled={isSharing}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-black text-xs flex items-center justify-center gap-2 transition-transform active:scale-98 min-h-[46px]"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>{t('shareQr')}</span>
            </button>
          )}

          {/* 3. Baad Mein (Dismiss) Button */}
          <button
            type="button"
            data-testid="dismiss-payment-request-btn"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center transition-colors min-h-[44px]"
          >
            {t('laterDismiss')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestSheet;
