import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { AddWorkflowModal } from './AddWorkflowModal';
import { ArrowRight, ChevronRight, Workflow, Plus, Upload, Camera } from 'lucide-react';

interface ProjectsSectionProps {
  onContactClick?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>(PROJECTS);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load custom projects
      const stored = localStorage.getItem('banie-custom-workflows');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAllProjects([...parsed, ...PROJECTS]);
      }

      // Load custom workflow screenshots
      const storedImages = localStorage.getItem('banie-workflow-images');
      if (storedImages) {
        setCustomImages(JSON.parse(storedImages));
      }
    } catch {
      // Storage fallback
    }
  }, []);

  const handleAddWorkflow = (newProject: Project) => {
    const updated = [newProject, ...allProjects];
    setAllProjects(updated);
    try {
      const stored = localStorage.getItem('banie-custom-workflows');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('banie-custom-workflows', JSON.stringify([newProject, ...existing]));
    } catch {
      // ignore
    }
  };

  const handleCardImageUpload = (file: File) => {
    if (!targetProjectId || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const updated = { ...customImages, [targetProjectId]: result };
        setCustomImages(updated);
        try {
          localStorage.setItem('banie-workflow-images', JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const categories = ['All', 'n8n', 'Make', 'Zapier', 'AI & Voice'];

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => {
          if (selectedCategory === 'n8n') return p.platforms.includes('n8n') || p.category === 'n8n';
          if (selectedCategory === 'Make') return p.platforms.includes('Make') || p.category === 'Make';
          if (selectedCategory === 'Zapier') return p.platforms.includes('Zapier') || p.category === 'Zapier';
          if (selectedCategory === 'AI & Voice') return p.platforms.includes('Vapi') || p.category === 'AI & Voice';
          return true;
        });

  return (
    <section id="projects" className="py-20 md:py-28 relative bg-[#F4F7FB] dark:bg-[#060D1A] transition-colors duration-300">
      {/* Hidden File Input for Card Image Replacement */}
      <input
        ref={cardFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleCardImageUpload(file);
        }}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
              03. Portfolio &amp; Implementations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight [text-wrap:balance]">
              Projects &amp; Production Automations
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Live automated pipelines resolving real business bottlenecks—from AI voice receptionists and smart CRM intake to multi-path Asana workflows and automated financial ledger delivery.
            </p>
          </div>

          {/* Action Row: Category Filter Tabs + "+ Add Workflow" Button */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/80 dark:bg-[#0A162B] border border-slate-300 dark:border-blue-900/60 shrink-0 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 active:scale-95 whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-blue-900/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Direct "+ Add Workflow" Trigger Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm active:scale-95 transition-all whitespace-nowrap shrink-0"
              title="Add a new workflow to your portfolio"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Workflow</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => {
            const storedCustom = customImages[project.id];
            const projectImage =
              storedCustom && !storedCustom.startsWith('/src/assets/')
                ? storedCustom
                : project.image;
            return (
              <div
                key={project.id}
                onClick={() => setActiveProject({ ...project, image: projectImage })}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 hover:border-blue-500/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/10 dark:hover:shadow-blue-950/40 active:scale-[0.99] relative"
              >
                <div>
                  {/* Visual Thumbnail with One-Click Screenshot Upload Badge */}
                  {projectImage && (
                    <div className="mb-5 rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-[#060D1A] border border-slate-200 dark:border-blue-950 relative group/thumb">
                      <img
                        src={projectImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                      {/* Quick Screenshot Change Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTargetProjectId(project.id);
                          cardFileInputRef.current?.click();
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-blue-600 text-white text-[10px] opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center gap-1 shadow-md"
                        title="Upload your own workflow screenshot"
                      >
                        <Camera className="w-3 h-3" />
                        <span className="hidden sm:inline">Upload Screenshot</span>
                      </button>
                    </div>
                  )}

                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-2.5">
                    <span className="font-semibold">{project.category}</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{project.platforms[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Event Trigger & Outcome Preview */}
                  <div className="space-y-2 mb-5">
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="font-mono uppercase text-slate-400 dark:text-slate-500 mr-1.5 text-[10px]">Trigger:</span>
                      <span className="text-slate-700 dark:text-slate-300">{project.trigger}</span>
                    </div>
                    <div className="text-[11px] text-blue-700 dark:text-sky-300 font-medium">
                      <span className="font-mono uppercase text-blue-500 dark:text-blue-400 mr-1.5 text-[10px]">Outcome:</span>
                      <span>{project.businessImpact}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between">
                  {/* Platforms list */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[70%]">
                    {project.platforms.slice(0, 3).map((p, idx) => (
                      <React.Fragment key={p}>
                        <span>{p}</span>
                        {idx < Math.min(project.platforms.length, 3) - 1 && (
                          <span className="text-slate-400 dark:text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.platforms.length > 3 && (
                      <span className="text-slate-400">+{project.platforms.length - 3}</span>
                    )}
                  </div>

                  {/* Inspect Action */}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect Flow</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-[#0B1A36] dark:via-[#0E2245] dark:to-[#0B1A36] border border-blue-200 dark:border-blue-900/60 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Have a custom workflow or integration requirement?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Banie builds custom webhooks, n8n orchestrations, Make pipelines, and AI agents adapted to your exact data schema.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Request Custom Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onContactClick={onContactClick}
      />

      {/* Add New Workflow Modal */}
      <AddWorkflowModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWorkflow={handleAddWorkflow}
      />
    </section>
  );
};
