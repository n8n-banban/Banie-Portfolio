import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#F4F7FB] dark:bg-[#060D1A] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
            04. Client &amp; Stakeholder Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            Client Testimonials
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real feedback on service quality, responsiveness, and customer care.
          </p>
        </div>

        {/* Testimonials Layout */}
        <div className={TESTIMONIALS.length === 1 ? 'max-w-3xl' : 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-7 lg:p-8 relative hover:border-blue-400/50 transition-colors shadow-sm"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-blue-950">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-sky-300">
                    <span className="font-semibold">{t.highlightMetric}</span>
                  </div>
                  <Quote className="w-5 h-5 text-blue-500/30 dark:text-blue-400/40" />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-200 dark:border-blue-950 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.clientName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{t.clientTitle}</span>
                    {t.companyOrContext && (
                      <>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-slate-700 dark:text-slate-300">{t.companyOrContext}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
