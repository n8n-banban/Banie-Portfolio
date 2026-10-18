import React from 'react';
import { BrandLogo } from './BrandLogo';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040914] dark:bg-[#030712] border-t border-slate-800 dark:border-blue-950/80 py-12 text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-800 dark:border-blue-950/80">
          {/* Brand Wordmark (Name as Logo) */}
          <div>
            <BrandLogo size="md" />
            <p className="mt-2 text-xs text-slate-400 max-w-sm leading-relaxed">
              Automating business workflows, intelligent lead routing, and customer operations architectures.
            </p>
          </div>

          {/* Direct Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <a href="#services" className="hover:text-blue-400 transition-colors active:scale-95">Services</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors active:scale-95">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors active:scale-95">Projects</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors active:scale-95">Testimonials</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors active:scale-95">Contact</a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 dark:bg-[#0B1830] border border-slate-800 dark:border-blue-900/60 hover:border-slate-700 text-slate-300 hover:text-white transition-colors active:scale-90"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-slate-300 transition-colors">
              {PERSONAL_INFO.phoneFormatted}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-slate-300 transition-colors">
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
