import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Phone, Mail, Check, Copy, Camera, Upload, RotateCcw } from 'lucide-react';

export const Hero: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(PERSONAL_INFO.profileImage);
  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('banie-custom-profile-photo');
      if (stored && (stored.startsWith('data:image/') || stored.includes('banie_real_headshot'))) {
        setProfilePhoto(stored);
        setIsCustomPhoto(true);
      } else if (stored) {
        // Clear old AI placeholder if present from prior turns
        localStorage.removeItem('banie-custom-profile-photo');
        setProfilePhoto(PERSONAL_INFO.profileImage);
        setIsCustomPhoto(false);
      }
    } catch {
      // Local storage fallback
    }
  }, []);

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

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setProfilePhoto(result);
        setIsCustomPhoto(true);
        try {
          localStorage.setItem('banie-custom-profile-photo', result);
        } catch {
          // storage quota safeguard
        }
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleResetPhoto = () => {
    setProfilePhoto(PERSONAL_INFO.profileImage);
    setIsCustomPhoto(false);
    try {
      localStorage.removeItem('banie-custom-profile-photo');
    } catch {
      // ignore
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden transition-colors duration-300">
      {/* Hidden File Picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload personal photo"
      />

      {/* Background Subtle Ambient Navy Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[350px] bg-indigo-500/10 dark:bg-blue-900/25 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">
            {/* Clean Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4 font-semibold">
              <span>{PERSONAL_INFO.name}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Workflow and AI Automation Specialist</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Customer Operations</span>
            </div>

            {/* Oversized Headline with Balanced Wrap */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6 [text-wrap:balance]">
              Building intelligent workflows that connect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-blue-400">
                AI agents, voice systems,
              </span>{' '}
              and frontline customer operations.
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {PERSONAL_INFO.summary}
            </p>

            {/* Primary & Secondary Actions with updated labels: Experiences & My Services */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95 whitespace-nowrap shrink-0 duration-150"
              >
                <span>Experiences</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0D1C36] dark:hover:bg-[#13264A] border border-slate-300/80 dark:border-blue-900/60 rounded-xl transition-all active:scale-95 whitespace-nowrap shrink-0 duration-150"
              >
                <span>My Services</span>
              </a>
            </div>

            {/* Direct Contact Action Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-blue-950 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono active:scale-95"
                  title="Direct Call"
                >
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{PERSONAL_INFO.phoneFormatted}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-blue-950 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors active:scale-90"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono active:scale-95"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-blue-950 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors active:scale-90"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Picture with Corporate Headshot + Direct Upload Feature */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl bg-white/80 dark:bg-[#0B172E]/90 border border-slate-200/90 dark:border-blue-900/60 p-3 sm:p-4 shadow-xl shadow-blue-950/5 dark:shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50">
              
              {/* Upload Prompt Action Bar */}
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Profile Photo</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800/80 rounded-md transition-all active:scale-95"
                    title="Upload your exact picture"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Picture</span>
                  </button>

                  {isCustomPhoto && (
                    <button
                      type="button"
                      onClick={handleResetPhoto}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Reset to default image"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Media Container with Interactive Drag & Drop + Click to Pick */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group cursor-pointer relative aspect-[3/4] max-h-[460px] rounded-xl overflow-hidden bg-slate-100 dark:bg-[#060D1A] border transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2'
                    : 'border-slate-200 dark:border-blue-950'
                }`}
                title="Click or drag & drop your picture here"
              >
                <img
                  src={profilePhoto}
                  alt="Banie Bacolod Necesario - Workflow and AI Automation Specialist"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Drag-over overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
                    <Upload className="w-10 h-10 mb-2 animate-bounce text-blue-400" />
                    <span className="text-sm font-semibold">Drop your picture here</span>
                  </div>
                )}

                {/* Upload Success Toast */}
                {uploadSuccess && (
                  <div className="absolute top-3 left-3 right-3 bg-emerald-600 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 z-20 animate-in fade-in">
                    <Check className="w-4 h-4" />
                    <span>Photo uploaded &amp; saved!</span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium shadow-md border border-slate-700">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Click to change picture</span>
                  </span>
                </div>

                {/* Contrast Scrim for Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Media Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-900/90 dark:bg-[#060E1C]/90 backdrop-blur-md border border-slate-700/60 dark:border-blue-900/60 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white tracking-wide">
                      {PERSONAL_INFO.name}
                    </span>
                    <span className="text-[11px] font-mono text-blue-400">
                      Manila, PH · GMT+8
                    </span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Workflow &amp; AI Automation Specialist · Customer Operations
                  </div>
                </div>
              </div>

              {/* Verified Competency Strip */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#071120] border border-slate-200 dark:border-blue-950 text-slate-700 dark:text-slate-300">
                  <div className="text-slate-500 uppercase text-[9px] mb-0.5">Primary Focus</div>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold truncate" title="Workflow and AI Automation Specialist">
                    Workflow and AI Automation Specialist
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#071120] border border-slate-200 dark:border-blue-950 text-slate-700 dark:text-slate-300">
                  <div className="text-slate-500 uppercase text-[9px] mb-0.5">Background</div>
                  <div className="text-slate-800 dark:text-slate-200 font-semibold truncate">Customer Ops Since 2016</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Proof Row (Below Hero Split) */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-blue-950 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0B172E] border border-slate-200 dark:border-blue-900/50 shadow-sm transition-all hover:border-blue-400/40">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mb-1">
              9+ <span className="text-blue-600 dark:text-blue-400 text-lg font-sans">Years</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              Frontline customer service &amp; account ops experience since 2016
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0B172E] border border-slate-200 dark:border-blue-900/50 shadow-sm transition-all hover:border-blue-400/40">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mb-1">
              9 <span className="text-blue-600 dark:text-blue-400 text-lg font-sans">Pipelines</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              Production automations across n8n, Make, Zapier, and GHL
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0B172E] border border-slate-200 dark:border-blue-900/50 shadow-sm transition-all hover:border-blue-400/40">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mb-1">
              &lt; 45 <span className="text-blue-600 dark:text-blue-400 text-lg font-sans">Sec</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              Automated inbound lead triage, scoring, and response speed
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#0B172E] border border-slate-200 dark:border-blue-900/50 shadow-sm transition-all hover:border-blue-400/40">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mb-1">
              24 / 7 <span className="text-blue-600 dark:text-blue-400 text-lg font-sans">Voice AI</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
              Autonomous appointment booking &amp; customer call routing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
