/**
 * Language Selector Bottom Sheet Modal
 * Switch speech and UI language across Hindi, Hinglish, English, Kannada, Tamil, Telugu.
 */

import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { LanguageCode } from '../services/types';

interface LanguageSelectorModalProps {
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  onClose,
}) => {
  const { language, setLanguage, supportedLanguages } = useI18n();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl animate-slide-up">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4" />

        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Choose Language (भाषा चुनें)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Options Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;

            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all min-h-[56px] text-left ${
                  isSelected
                    ? 'bg-blue-600/20 text-white border-blue-500 ring-2 ring-blue-500/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div>
                  <p className="text-base font-bold">{lang.nativeLabel}</p>
                  <p className="text-xs text-slate-400 font-medium">{lang.label}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
