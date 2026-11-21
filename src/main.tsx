import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SettingsProvider } from './hooks/useSettings';
import { I18nProvider } from './i18n/I18nContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// PWA Service Worker Registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onOfflineReady() {
        console.log('Voice Khata is offline ready!');
      },
    });
  }).catch(() => {
    // Ignore PWA registration in non-PWA environments
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SettingsProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </SettingsProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
