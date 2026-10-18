import React, { useEffect, useState, useRef } from 'react';
import { Project } from '../types';
import { X, CheckCircle2, ArrowRight, Workflow, Camera, Upload, Check } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick?: () => void;
  onUpdateImage?: (projectId: string, imageUrl: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
  onUpdateImage
}) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(project?.image);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentImage(project?.image);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCurrentImage(dataUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);

        try {
          const stored = localStorage.getItem('banie-workflow-images');
          const existing = stored ? JSON.parse(stored) : {};
          existing[project.id] = dataUrl;
          localStorage.setItem('banie-workflow-images', JSON.stringify(existing));
        } catch {
          // ignore
        }

        if (onUpdateImage) {
          onUpdateImage(project.id, dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Hidden File Picker */}
      <input
        ref={modalFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-[#030812]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200 dark:border-blue-900/80 shadow-2xl z-10 p-6 sm:p-8 transition-colors duration-300"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-90"
          aria-label="Close Case Study Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata (Clean Unboxed) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3 font-semibold">
          <span>Case Study</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
          <span>{project.category} Architecture</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
          <span>Production Deployed</span>
        </div>

        <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 pr-10">
          {project.title}
        </h2>

        {/* Tech Platforms List */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono mb-6 pb-6 border-b border-slate-200 dark:border-blue-950">
          <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px]">Ecosystem:</span>
          {project.platforms.map((platform, idx) => (
            <React.Fragment key={platform}>
              <span className="text-blue-600 dark:text-blue-400 font-medium">{platform}</span>
              {idx < project.platforms.length - 1 && <span className="text-slate-400 dark:text-slate-600">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Featured Image with Interactive Upload Trigger */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              Workflow Architecture Diagram / Screenshot
            </span>
            <button
              type="button"
              onClick={() => modalFileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#0E2040] hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 transition-all active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Upload Your Screenshot</span>
            </button>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            onClick={() => modalFileInputRef.current?.click()}
            className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 aspect-video relative bg-slate-100 dark:bg-[#060D1A] ${
              isDragging
                ? 'border-blue-500 ring-2 ring-blue-500'
                : 'border-slate-200 dark:border-blue-950 hover:border-blue-400'
            }`}
            title="Click or drop your real workflow screenshot here"
          >
            {currentImage ? (
              <img
                src={currentImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Upload className="w-8 h-8 mb-2 text-blue-500" />
                <span className="text-sm">Click to upload workflow diagram screenshot</span>
              </div>
            )}

            {/* Drag overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white z-20">
                <Upload className="w-10 h-10 mb-2 animate-bounce text-blue-400" />
                <span className="text-sm font-semibold">Drop your workflow screenshot here</span>
              </div>
            )}

            {/* Success toast */}
            {uploadSuccess && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg flex items-center gap-1.5 z-20">
                <Check className="w-4 h-4" />
                <span>Screenshot saved to portfolio!</span>
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-medium shadow-md">
                <Camera className="w-3.5 h-3.5 text-blue-400" />
                <span>Change Screenshot</span>
              </span>
            </div>
          </div>
        </div>

        {/* Executive Overview */}
        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
              System Objective &amp; Architecture
            </h3>
            <p className="text-base text-slate-800 dark:text-slate-200">{project.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-blue-900/60">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Event Trigger
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">{project.trigger}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-blue-900/60">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Business Outcome
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">{project.businessImpact}</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Workflow Pipeline Visualization */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 font-semibold">
            <Workflow className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Workflow Node Execution Sequence</span>
          </h3>

          <div className="space-y-3">
            {project.workflowSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-700 transition-colors"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold shrink-0">
                  0{step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</span>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">{step.tool}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Actions Breakdown */}
        <div className="mb-8 p-5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-blue-900/60">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-semibold">
            Key Execution Operations
          </h4>
          <ul className="space-y-2">
            {project.actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-blue-950">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900 rounded-xl transition-colors active:scale-95"
          >
            Close Overview
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onContactClick) onContactClick();
              const contactElem = document.getElementById('contact');
              if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
          >
            <span>Discuss Building a Similar Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
