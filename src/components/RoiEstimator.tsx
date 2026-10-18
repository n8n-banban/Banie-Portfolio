import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TaskScenario {
  id: string;
  name: string;
  description: string;
  hoursPerWeek: number;
  automationPlatform: string;
}

const SAMPLE_TASKS: TaskScenario[] = [
  {
    id: 'lead-triage',
    name: 'Lead Intake & Routing to CRM',
    description: 'Manually reading inquiries, qualification, and routing to sales reps.',
    hoursPerWeek: 8,
    automationPlatform: 'Zapier + Gemini + GHL'
  },
  {
    id: 'voice-calls',
    name: 'Appointment Scheduling & Calendar Calls',
    description: 'Inbound phone calls to book, modify, or cancel client appointments.',
    hoursPerWeek: 12,
    automationPlatform: 'Vapi + n8n + Calendar API'
  },
  {
    id: 'gl-reports',
    name: 'Accounting & Ledger Report Exports',
    description: 'Pulling Xero transactions and attaching reports to task management tools.',
    hoursPerWeek: 6,
    automationPlatform: 'Make + Xero API + Asana'
  },
  {
    id: 'attachment-sorting',
    name: 'Email Invoicing & Attachment Archiving',
    description: 'Downloading PDF invoices from Gmail and sorting into drive folders.',
    hoursPerWeek: 5,
    automationPlatform: 'Make + Gmail + Google Drive'
  },
  {
    id: 'fb-chat-support',
    name: 'Repetitive Social Media & FAQ Support',
    description: 'Responding to basic price, hours, and catalog inquiries on live chat.',
    hoursPerWeek: 10,
    automationPlatform: 'n8n + Docs API + Meta Graph'
  }
];

interface RoiEstimatorProps {
  onApplyEstimate?: (summaryText: string) => void;
}

export const RoiEstimator: React.FC<RoiEstimatorProps> = ({ onApplyEstimate }) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([
    'lead-triage',
    'voice-calls',
    'gl-reports'
  ]);
  const [hourlyRate, setHourlyRate] = useState<number>(35);

  const toggleTask = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalHoursPerWeek = selectedTaskIds.reduce((sum, id) => {
    const task = SAMPLE_TASKS.find((t) => t.id === id);
    return sum + (task ? task.hoursPerWeek : 0);
  }, 0);

  const totalHoursPerMonth = totalHoursPerWeek * 4.33;
  const monthlySavingsDollars = Math.round(totalHoursPerMonth * hourlyRate);
  const annualSavingsDollars = monthlySavingsDollars * 12;

  const handleApplyToContact = () => {
    const selectedTaskNames = SAMPLE_TASKS.filter((t) => selectedTaskIds.includes(t.id))
      .map((t) => t.name)
      .join(', ');
    const summary = `Estimated savings: ~${Math.round(totalHoursPerMonth)} hrs/month ($${monthlySavingsDollars.toLocaleString()}/mo) across: ${selectedTaskNames}`;
    if (onApplyEstimate) {
      onApplyEstimate(summary);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#EEF4FB] dark:bg-[#071120] border-t border-slate-200 dark:border-blue-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/60 p-6 md:p-10 shadow-lg shadow-blue-950/5 dark:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Interactive Task Selector */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                <Calculator className="w-4 h-4" />
                <span>Interactive Efficiency Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                Calculate Time &amp; Cost Reclaimable With Automation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Select the manual tasks your team currently handles to calculate how much staff time Banie's custom workflows can automate.
              </p>

              {/* Task Options */}
              <div className="space-y-2.5 mb-6">
                {SAMPLE_TASKS.map((task) => {
                  const isChecked = selectedTaskIds.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-[0.99] ${
                        isChecked
                          ? 'bg-blue-50/80 dark:bg-[#0E2245] border-blue-400 dark:border-blue-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#071324] border-slate-200 dark:border-blue-950/80 hover:border-slate-300 dark:hover:border-blue-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-blue-600 text-white'
                              : 'border border-slate-400 dark:border-slate-600 bg-white dark:bg-[#040C1A]'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                            {task.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {task.description} · <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">{task.automationPlatform}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-3">
                        <div className="text-xs font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                          {task.hoursPerWeek} hrs/wk
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Team Blended Rate Slider */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060D1A] border border-slate-200 dark:border-blue-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white block">Hourly Operational Cost / Wage:</span>
                  <span className="text-slate-500 dark:text-slate-400">Average team member cost per hour</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-32 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-[#0B1830] px-2.5 py-1 rounded-md border border-slate-300 dark:border-blue-800 tabular-nums">
                    ${hourlyRate}/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Results Dashboard */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-slate-900 dark:bg-[#040C1A] text-white border border-blue-500/30 p-6 shadow-xl relative overflow-hidden">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4 pb-3 border-b border-slate-800 dark:border-blue-950">
                  Projected Reclaimed Capacity
                </div>

                <div className="space-y-6 mb-6">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Monthly Hours Saved</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                      {Math.round(totalHoursPerMonth)}{' '}
                      <span className="text-base font-sans font-normal text-slate-400">hours / mo</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 dark:border-blue-950">
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1">Est. Monthly Savings</div>
                      <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                        ${monthlySavingsDollars.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1">Annual Capacity Return</div>
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                        ${annualSavingsDollars.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800/40 text-xs text-blue-200">
                    <span className="font-semibold block mb-0.5">Instant Pipeline Payoff:</span>
                    Most custom n8n and Zapier automations cover their setup investment within the first 30 days of production.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyToContact}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/30 active:scale-95 duration-150"
                >
                  <span>Build This Workflow Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
