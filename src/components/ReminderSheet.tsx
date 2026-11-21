/**
 * ReminderSheet Component
 * 
 * 1. Preview of a polite payment reminder in chosen language (Hindi / English / Kannada / Tamil / Telugu / Hinglish).
 * 2. Editable text area for shopkeeper personalization.
 * 3. Opens https://wa.me/<phone>?text=<encoded>.
 * 4. If no phone saved, prompts user to enter it once, saves to customer profile, and proceeds.
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Phone,
  User,
  Globe,
  CheckCircle,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { Customer, LanguageCode } from '../services/types';
import { ledgerService } from '../services/ledgerService';
import { formatRupees } from '../lib/format';
import { useI18n } from '../i18n/I18nContext';
import { useToast } from './ui/Toast';

export interface ReminderSheetProps {
  customer: Customer;
  shopName?: string;
  isOpen: boolean;
  onClose: () => void;
  onCustomerUpdated?: (updated: Customer) => void;
}

// Polite reminder templates across all 5 languages + Hinglish
const REMINDER_TEMPLATES: Record<LanguageCode, (name: string, amt: string, shop: string) => string> = {
  hi: (name, amt, shop) =>
    `नमस्ते ${name} जी,\n${shop} से आपका कुल बकाया हिसाब ₹${amt} है।\nकृपया सुविधानुसार भुगतान कर दें।\nधन्यवाद! 🙏`,

  hinglish: (name, amt, shop) =>
    `Namaste ${name} ji,\n${shop} se aapka kul baaki hisaab ₹${amt} hai.\nKripya suvidhanusar bhej dein.\nDhanyawad! 🙏`,

  en: (name, amt, shop) =>
    `Hello ${name},\nGentle reminder from ${shop}: your pending balance is ₹${amt}.\nPlease settle at your convenience.\nThank you! 🙏`,

  kn: (name, amt, shop) =>
    `ನಮಸ್ಕಾರ ${name} ಅವರೇ,\n${shop} ನಲ್ಲಿ ನಿಮ್ಮ ಒಟ್ಟು ಬಾಕಿ ₹${amt} ರೂಪಾಯಿ ಇದೆ.\nದಯವಿಟ್ಟು ಅನುಕೂಲವಾದಾಗ ಪಾವತಿಸಿ.\nಧನ್ಯವಾದಗಳು! 🙏`,

  ta: (name, amt, shop) =>
    `வணக்கம் ${name} அவர்களே,\n${shop} கடையில் உங்கள் பாக்கி தொகை ₹${amt}.\nதயவுசெய்து விரைவில் செலுத்தவும்.\nநன்றி! 🙏`,

  te: (name, amt, shop) =>
    `నమస్కారం ${name} గారు,\n${shop} లో మీ మొత్తం బాకీ ₹${amt}.\nదయచేసి వీలైనంత త్వరగా చెల్లించండి.\nధన్యవాదాలు! 🙏`,
};

export const ReminderSheet: React.FC<ReminderSheetProps> = ({
  customer,
  shopName = 'Kirana Store',
  isOpen,
  onClose,
  onCustomerUpdated,
}) => {
  const { language: currentAppLang } = useI18n();
  const { showToast } = useToast();

  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentAppLang);
  const [phoneNumber, setPhoneNumber] = useState(customer.phone || '');
  const [messageText, setMessageText] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate reminder template on mount or language change
  useEffect(() => {
    const formattedBalance = customer.balance.toLocaleString('en-IN');
    const generator = REMINDER_TEMPLATES[selectedLang] || REMINDER_TEMPLATES.hinglish;
    setMessageText(generator(customer.name, formattedBalance, shopName));
  }, [selectedLang, customer.name, customer.balance, shopName]);

  if (!isOpen) return null;

  // Clean phone number (strip whitespace, hyphens, leading 0 or +91)
  const cleanPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      return digits;
    }
    if (digits.length === 10) {
      return `91${digits}`;
    }
    return digits;
  };

  const handleSendWhatsApp = async () => {
    const cleanedDigits = cleanPhone(phoneNumber);

    if (!cleanedDigits || cleanedDigits.length < 10) {
      showToast('Kripya 10-digit phone number darj karein', { type: 'warning' });
      return;
    }

    // If phone number is newly entered or changed, save to customer record
    if (cleanedDigits !== cleanPhone(customer.phone || '')) {
      try {
        const raw10 = cleanedDigits.slice(-10);
        const updated = await ledgerService.updateCustomer(customer.id, { phone: raw10 });
        if (onCustomerUpdated) {
          onCustomerUpdated(updated);
        }
        showToast('Phone number grahak profile me save ho gaya!', { type: 'success' });
      } catch {
        // ignore
      }
    }

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${cleanedDigits}?text=${encoded}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
      setCopied(true);
      showToast('Message text copy ho gaya!', { type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-sheet-title"
    >
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl flex flex-col animate-slide-up text-white">
        {/* Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span
                id="reminder-sheet-title"
                className="text-xs font-black uppercase tracking-wider text-slate-400 block"
              >
                WhatsApp Payment Reminder
              </span>
              <h3 className="text-base font-black text-white">{customer.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Balance Banner */}
        <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold text-slate-400">Total Udhaar Baaki:</span>
          <span className="text-xl font-black text-amber-400">
            {formatRupees(customer.balance)}
          </span>
        </div>

        {/* Phone Number Input (If no phone saved, let user enter it once) */}
        <div className="mb-3.5">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            WhatsApp Phone Number
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              +91
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="9876543210 (10 digits)"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-base font-black text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          {!customer.phone && (
            <p className="text-[11px] text-teal-400 font-bold mt-1">
              ✓ Ek baar darj karein, yeh grahak profile me save ho jayega.
            </p>
          )}
        </div>

        {/* Language Selection Chips for Polite Templates */}
        <div className="mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            Bhasha Chunein (Select Template Language)
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { code: 'hi', label: 'हिन्दी' },
              { code: 'hinglish', label: 'Hinglish' },
              { code: 'en', label: 'English' },
              { code: 'kn', label: 'ಕನ್ನಡ' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'te', label: 'తెలుగు' },
            ].map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelectedLang(l.code as LanguageCode)}
                className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all min-h-[38px] ${
                  selectedLang === l.code
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editable Message Textarea */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Message Preview (Aap badal sakte hain)
            </label>
            <button
              type="button"
              onClick={handleCopyText}
              className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <textarea
            rows={5}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        {/* WhatsApp Action Button (Min 56px touch target) */}
        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base transition-all min-h-[56px] shadow-lg shadow-emerald-700/30 active:scale-95 mt-auto"
        >
          <Send className="w-5 h-5" />
          <span>WhatsApp Par Bhejein</span>
        </button>
      </div>
    </div>
  );
};

export default ReminderSheet;
