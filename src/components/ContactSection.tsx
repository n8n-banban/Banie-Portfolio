import React, { useState } from 'react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialMessage = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || SERVICES[0].title,
    timeline: 'Within 2 weeks',
    message: initialMessage || ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setSubmitted(true);
  };

  const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.service || 'Automation'}`
  )}&body=${encodeURIComponent(
    `Hi Banie,\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nService Needed: ${formData.service}\nTimeline: ${formData.timeline}\n\nProject Overview:\n${formData.message}\n\nBest regards,\n${formData.name}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F4F7FB] dark:bg-[#060D1A] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Direct Contact Info & Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                05. Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
                Let's automate your repetitive operations.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you need a full-funnel lead intake system, an autonomous n8n/Vapi phone agent, or custom API pipelines, Banie is available for freelance contracts and full-time roles.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Mobile / WhatsApp</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2040] transition-colors active:scale-90"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email Address</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2040] transition-colors active:scale-90"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#0E2040] text-blue-600 dark:text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Base Location &amp; Timezone</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              {/* Turnaround Commitment */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#0E2040] text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Guaranteed Response Window</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                    Replies delivered within 24 hours (PHT/GMT+8)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Working Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-6 sm:p-8 shadow-xl shadow-blue-950/5 dark:shadow-2xl relative">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-400 dark:border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-blue-600 dark:text-blue-400 font-semibold">{formData.name}</span>. Banie has received your request regarding{' '}
                    <span className="text-slate-900 dark:text-white font-medium">{formData.service}</span> and will respond to{' '}
                    <span className="text-blue-600 dark:text-blue-400">{formData.email}</span> shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Mail App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900 rounded-xl transition-colors active:scale-95"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-blue-950">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Schedule a Strategy Consultation
                    </h3>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      No commitment required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company or Project Name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Media Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Primary Service Needed
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title} className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom API / Webhook Integration" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                          Custom API / Webhook Integration
                        </option>
                        <option value="Full-Time Operations / Automation Role" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                          Full-Time Operations / Automation Role
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-timeline" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Target Project Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="Immediately (Urgent bottleneck)" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">Immediately (Urgent bottleneck)</option>
                      <option value="Within 2 weeks" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">Within 2 weeks</option>
                      <option value="Within 1 month" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">Within 1 month</option>
                      <option value="Exploring possibilities / Planning phase" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">Exploring possibilities / Planning phase</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Project Details or Current Friction Points
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the repetitive process you'd like automated, tools currently in use (e.g. Asana, Gmail, Sheets, GHL), and expected outcome..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 duration-150"
                    >
                      <span>Transmit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
