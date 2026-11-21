/**
 * Accessible Global Error Boundary Component
 * Displays a friendly "Kuch gadbad hui" reassurance screen with a Retry button.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl text-center space-y-4 animate-fade-in">
            {/* Visual Icon */}
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Title & Message */}
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Kuch Gadbad Hui
              </h1>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                Something went wrong, but don't worry!
              </p>
            </div>

            {/* Privacy & Safety Reassurance */}
            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 text-left flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-teal-900 dark:text-teal-200 leading-relaxed">
                Aapka saara khata data aapke phone me bilkul surakshit (IndexedDB) hai. Kuch khoya nahi hai.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleRetry}
                className="w-full py-4 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md min-h-[56px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Dobara Koshish Karein (Retry)</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors min-h-[48px]"
              >
                <Home className="w-4 h-4" />
                <span>Home Par Jayein</span>
              </button>
            </div>

            {/* Collapsible Technical Details for Debugging */}
            {this.state.error && (
              <div className="pt-2 text-left">
                <button
                  type="button"
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                  className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 hover:text-slate-600 py-1"
                >
                  <span>Technical Error Details</span>
                  {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {this.state.showDetails && (
                  <pre className="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-[10px] font-mono text-rose-500 overflow-x-auto max-h-32 border border-slate-200 dark:border-slate-800">
                    {this.state.error.toString()}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
