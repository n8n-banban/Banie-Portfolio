import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { X, Plus, Upload, Check, Workflow, Image as ImageIcon } from 'lucide-react';

interface AddWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkflow: (newProject: Project) => void;
}

export const AddWorkflowModal: React.FC<AddWorkflowModalProps> = ({
  isOpen,
  onClose,
  onAddWorkflow
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'n8n' | 'Make' | 'Zapier' | 'GoHighLevel' | 'AI & Voice'>('n8n');
  const [platformsInput, setPlatformsInput] = useState('');
  const [summary, setSummary] = useState('');
  const [trigger, setTrigger] = useState('');
  const [actionsText, setActionsText] = useState('');
  const [businessImpact, setBusinessImpact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImageUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const platforms = platformsInput
      ? platformsInput.split(',').map((p) => p.trim()).filter(Boolean)
      : [category];

    const actions = actionsText
      ? actionsText.split('\n').map((a) => a.trim()).filter(Boolean)
      : ['Workflow event triggers and executes actions automatically.'];

    const newProject: Project = {
      id: `custom-workflow-${Date.now()}`,
      title,
      category,
      platforms,
      summary,
      trigger: trigger || 'Webhook or event trigger',
      actions,
      businessImpact: businessImpact || 'Automated manual operations and improved throughput.',
      featured: true,
      image: imageUrl || undefined,
      workflowSteps: actions.map((act, idx) => ({
        step: idx + 1,
        title: `Step ${idx + 1}`,
        tool: platforms[idx % platforms.length] || category,
        description: act
      }))
    };

    onAddWorkflow(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 dark:bg-[#030812]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200 dark:border-blue-900/80 shadow-2xl z-10 p-6 sm:p-8 transition-colors duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
          <Workflow className="w-4 h-4" />
          <span>Add Sample Workflow</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
          New Workflow Showcase
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
          Add your sample automation (n8n, Make, Zapier, GoHighLevel) with your real screenshot diagram and execution details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Workflow Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Asana Lead & Production Workflow"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Primary Platform *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="n8n">n8n</option>
                <option value="Make">Make (Integromat)</option>
                <option value="Zapier">Zapier</option>
                <option value="GoHighLevel">GoHighLevel</option>
                <option value="AI & Voice">AI & Voice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tools &amp; APIs Used (comma separated)
              </label>
              <input
                type="text"
                value={platformsInput}
                onChange={(e) => setPlatformsInput(e.target.value)}
                placeholder="e.g. Zapier, Asana, Google Drive, Gmail"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Workflow Overview &amp; Objective *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of what this automated pipeline achieves..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Trigger Event
              </label>
              <input
                type="text"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="e.g. Asana task moved to 'Ready to Start'"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Business Impact / Result
              </label>
              <input
                type="text"
                value={businessImpact}
                onChange={(e) => setBusinessImpact(e.target.value)}
                placeholder="e.g. Saved 6 hours weekly, 100% automated handoff"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Workflow Steps (one per line)
            </label>
            <textarea
              rows={3}
              value={actionsText}
              onChange={(e) => setActionsText(e.target.value)}
              placeholder="Detect updated task in Asana&#10;Evaluate conditional paths&#10;Provision client folder in Google Drive&#10;Assign subtask to team"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Workflow Screenshot Upload Box */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Workflow Screenshot / Diagram
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="hidden"
            />

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileSelect(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border border-dashed p-4 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-300 dark:border-blue-900 hover:border-blue-400 bg-slate-50 dark:bg-[#071324]'
              }`}
            >
              {imageUrl ? (
                <div className="relative aspect-video max-h-48 mx-auto rounded-lg overflow-hidden border border-slate-200 dark:border-blue-950">
                  <img src={imageUrl} alt="Workflow screenshot" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Attached</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2 text-slate-500 dark:text-slate-400">
                  <Upload className="w-6 h-6 mb-1 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Click to browse or drop your workflow screenshot here
                  </span>
                  <span className="text-[10px] text-slate-400">
                    PNG, JPG, WebP from Zapier, Make, n8n, etc.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              Publish to Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
