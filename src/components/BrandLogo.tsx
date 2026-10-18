import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Geometric Monogram Emblem: B & N fusion with circuit/automation node accent */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-navy-950 dark:from-slate-900 dark:via-blue-950 dark:to-[#040A14] border border-blue-500/40 dark:border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.25)] group transition-all duration-300 hover:border-blue-400"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Circuit Frame */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="8"
            stroke="url(#brandGradient)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            className="opacity-70"
          />
          {/* Integrated Monogram: Bold B and N interlocked with automation paths */}
          {/* Stem of B */}
          <path
            d="M10 8V32"
            stroke="#60A5FA"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Upper loop of B */}
          <path
            d="M10 9H18C20.7614 9 23 11.2386 23 14C23 16.7614 20.7614 19 18 19H10"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Diagonal connecting N */}
          <path
            d="M18 19L28 31"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Right vertical of N */}
          <path
            d="M28 11V31"
            stroke="#93C5FD"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Automation Node Junctions */}
          <circle cx="10" cy="8" r="2" fill="#60A5FA" />
          <circle cx="28" cy="11" r="2" fill="#93C5FD" />
          <circle cx="28" cy="31" r="2" fill="#3B82F6" />
          <circle cx="18" cy="19" r="2.2" fill="#FFFFFF" />

          <defs>
            <linearGradient id="brandGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] text-base md:text-lg">
            BANIE
          </span>
          <span className="font-light tracking-wide text-blue-600 dark:text-blue-400 font-['Plus_Jakarta_Sans'] text-base md:text-lg">
            NECESARIO
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
            AI Automation &amp; Ops
          </span>
        )}
      </div>
    </div>
  );
};
