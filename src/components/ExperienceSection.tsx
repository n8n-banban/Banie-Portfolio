import React, { useState } from 'react';
import { WORK_EXPERIENCES, PERSONAL_INFO, CORE_SKILLS } from '../data/portfolioData';
import {
  GraduationCap,
  CheckCircle2,
  Layers
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'skills'>('timeline');

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#EEF4FB] dark:bg-[#071120] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
              03. Background &amp; Domain Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight [text-wrap:balance]">
              Work Experience &amp; Operational Foundation
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Over 9 years of frontline customer operations in telecommunications, insurance, and international consumer campaigns. This human experience is the foundation for automations that actually work in the real world.
            </p>
          </div>

          {/* View Mode Toggle (Timeline vs Skills Matrix) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/80 dark:bg-[#0A162B] border border-slate-300 dark:border-blue-900/60 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 active:scale-95 ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Career Timeline
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 active:scale-95 ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Skills Architecture
            </button>
          </div>
        </div>

        {activeTab === 'timeline' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Career Timeline */}
            <div className="lg:col-span-8 space-y-6">
              {WORK_EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-6 md:p-7 relative transition-all duration-200 hover:border-blue-400/50 shadow-sm"
                >
                  {/* Top Bar Metadata (Unboxed) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                      <span className="font-bold">{exp.company}</span>
                      <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                      <span className="text-slate-800 dark:text-slate-300 font-sans font-medium">{exp.role}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  {/* Account Type and Scope */}
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-3 border-b border-slate-200 dark:border-blue-950">
                    {exp.accountType}
                  </div>

                  {/* Key Operational Responsibilities */}
                  <div className="space-y-2 mb-5">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Leveraged */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-blue-950 font-mono">
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase">Focus:</span>
                    {exp.skillsLeveraged.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span className="text-slate-700 dark:text-slate-300 text-[11px]">{skill}</span>
                        {sIdx < exp.skillsLeveraged.length - 1 && (
                          <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right 4 Cols: Education & CX Advantage Callout */}
            <div className="lg:col-span-4 space-y-6">
              {/* Education Card */}
              <div className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-6 shadow-sm">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4 font-semibold">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Academic Education</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {PERSONAL_INFO.education.degree}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  {PERSONAL_INFO.education.institution}
                </p>

                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200 dark:border-blue-950">
                  {PERSONAL_INFO.education.period} · Graduated
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Business administration background provides deep insight into operational workflows, profit-and-loss drivers, customer lifecycle stages, and administrative efficiency.
                </p>
              </div>

              {/* The CX Advantage Card */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-[#0B1A36] dark:via-[#09152B] dark:to-[#040C18] border border-blue-200 dark:border-blue-900/60 p-6 shadow-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                  The Operator's Advantage
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Why Frontline CX Makes Superior Automations
                </h4>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                  <p>
                    Many automations fail not because the code broke, but because the engineer didn't understand how real customers react to delays, robotic phrasing, or broken handoffs.
                  </p>
                  <p>
                    Having resolved thousands of billing disputes, mobile data outages, and account updates since 2016, Banie builds workflows that account for edge cases, customer confusion, and true human behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Skills Matrix View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SKILLS.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-blue-950">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {group.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-blue-950 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  {group.items.length} verified competencies
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
