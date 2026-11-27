import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Service } from '../types';
import {
  PhoneCall,
  GitBranch,
  Workflow,
  Bot,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ai-voice-telephony':
        return <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'lead-intake-ghl':
        return <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'workflow-automation-n8n-make':
        return <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'ai-support-bots':
        return <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'fin-ops-reporting':
        return <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'cx-operations-retention':
        return <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const handleInquire = (service: Service) => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#EEF4FB] dark:bg-[#071120] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
            01. Specialized Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3 [text-wrap:balance]">
            My Services
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Practical AI workflows, CRM pipelines, and customer operations built to cut manual work and convert leads faster.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 hover:border-blue-500/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/10 dark:hover:shadow-blue-950/40"
            >
              <div>
                {/* Header with Icon and Clean Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-[#0E2245] border border-blue-200/80 dark:border-blue-800/60 group-hover:border-blue-400 transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Production Grade
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-3 leading-normal">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mb-5 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Included
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Best For & Stack Metadata */}
                <div className="pt-3.5 border-t border-slate-200 dark:border-blue-900/60 mb-4 space-y-2.5">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">Best For</div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">{service.idealFor}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">Stack</div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.tools.map((tool, idx) => (
                        <React.Fragment key={tool}>
                          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{tool}</span>
                          {idx < service.tools.length - 1 && (
                            <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button with active click scale */}
                <button
                  type="button"
                  onClick={() => handleInquire(service)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#0E2040] hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl transition-all duration-200 active:scale-95"
                >
                  <span>Inquire About This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
