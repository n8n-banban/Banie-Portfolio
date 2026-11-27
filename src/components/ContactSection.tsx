import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
}

const CALENDLY_URL = 'https://calendly.com/banienecesario21/30min';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialMessage = ''
}) => {
  const [copiedContext, setCopiedContext] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  const copyContextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContext(true);
    setTimeout(() => setCopiedContext(false), 2000);
  };

  // Listen to Calendly postMessage events to clear loading state
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.profile_page_viewed' || e.data?.event === 'calendly.event_type_viewed') {
        setWidgetLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Load Calendly widget script and initialize inline embed
  useEffect(() => {
    const container = calendlyContainerRef.current;
    if (!container) return;

    const buildEmbedUrl = () => {
      const params = new URLSearchParams({
        hide_gdpr_banner: '1',
        primary_color: '2563eb'
      });
      return `${CALENDLY_URL}?${params.toString()}`;
    };

    const mountWidget = () => {
      if (!window.Calendly || !calendlyContainerRef.current) return false;
      calendlyContainerRef.current.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: buildEmbedUrl(),
        parentElement: calendlyContainerRef.current,
        ...(initialService || initialMessage
          ? {
              prefill: {
                customAnswers: {
                  a1: [initialService, initialMessage].filter(Boolean).join(' — ')
                }
              },
              utm: {
                utmSource: 'portfolio',
                utmContent: initialService || 'strategy_call'
              }
            }
          : {})
      });
      setWidgetLoaded(true);
      return true;
    };

    if (mountWidget()) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    const onScriptLoad = () => {
      if (!mountWidget()) {
        setUseIframeFallback(true);
        setWidgetLoaded(true);
      }
    };

    const onScriptError = () => {
      setUseIframeFallback(true);
      setWidgetLoaded(true);
    };

    if (existingScript) {
      existingScript.addEventListener('load', onScriptLoad);
      existingScript.addEventListener('error', onScriptError);
      return () => {
        existingScript.removeEventListener('load', onScriptLoad);
        existingScript.removeEventListener('error', onScriptError);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);
    document.body.appendChild(script);

    // Fallback timeout in case external script is blocked
    const fallbackTimer = window.setTimeout(() => {
      if (!window.Calendly) {
        setUseIframeFallback(true);
        setWidgetLoaded(true);
      }
    }, 3500);

    return () => {
      window.clearTimeout(fallbackTimer);
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [initialService, initialMessage]);

  const fallbackIframeSrc = `${CALENDLY_URL}?embed_domain=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname || 'localhost' : 'localhost'
  )}&embed_type=Inline&hide_gdpr_banner=1&primary_color=2563eb`;

  const inquirySummary = [initialService, initialMessage].filter(Boolean).join(' — ');

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#F4F7FB] dark:bg-[#060D1A] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
            05. Get In Touch &amp; Book
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            Let's automate your repetitive operations.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Pick a convenient date and time directly on my Calendly calendar to schedule a 30-minute discovery call.
          </p>
        </div>

        {/* Inline Calendly Booking Widget */}
        <div>
          <div className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-4 sm:p-6 shadow-xl shadow-blue-950/5 dark:shadow-2xl relative">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-blue-950">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Book a Strategy Consultation
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    30-minute 1-on-1 workflow audit · Instant calendar confirmation via Calendly
                  </p>
                </div>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-[#0E2040] hover:bg-blue-100 dark:hover:bg-blue-900/70 border border-blue-200 dark:border-blue-800/70 rounded-lg transition-all active:scale-95 self-start sm:self-center shrink-0"
                >
                  <span>Open in Calendly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Selected Service / ROI Context Banner (if navigated from Services or ROI Estimator) */}
              {inquirySummary && (
                <div className="mb-4 p-3 rounded-xl bg-blue-50/90 dark:bg-[#0E2245] border border-blue-200 dark:border-blue-800/70 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div className="text-xs text-slate-700 dark:text-slate-200 min-w-0">
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        Selected Discussion Context:
                      </span>
                      <span className="break-words">{inquirySummary}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyContextToClipboard(inquirySummary)}
                    className="p-1.5 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shrink-0"
                    title="Copy details for booking notes"
                    aria-label="Copy discussion details"
                  >
                    {copiedContext ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Responsive Inline Calendly Container */}
              <div className="relative w-full rounded-xl overflow-hidden bg-white border border-slate-200/80 dark:border-blue-900/60">
                {!widgetLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-600 z-10 p-6 text-center">
                    <CalendarIcon className="w-8 h-8 text-blue-600 animate-pulse mb-3" />
                    <p className="text-sm font-semibold text-slate-800">
                      Loading Banie's live Calendly schedule...
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      30-minute strategy call availability
                    </p>
                  </div>
                )}

                {useIframeFallback ? (
                  <iframe
                    src={fallbackIframeSrc}
                    title="Schedule a 30-Minute Strategy Consultation with Banie Necesario"
                    className="w-full min-w-[280px] min-h-[680px] h-[720px] sm:h-[680px] border-0 block"
                    loading="lazy"
                  />
                ) : (
                  <div
                    ref={calendlyContainerRef}
                    className="calendly-inline-widget w-full min-w-[280px] min-h-[680px] h-[720px] sm:h-[680px]"
                  />
                )}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
