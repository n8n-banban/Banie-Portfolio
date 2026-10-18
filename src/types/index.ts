export interface Project {
  id: string;
  title: string;
  category: 'n8n' | 'Make' | 'Zapier' | 'GoHighLevel' | 'AI & Voice';
  platforms: string[];
  summary: string;
  trigger: string;
  actions: string[];
  businessImpact: string;
  featured?: boolean;
  image?: string;
  workflowSteps: {
    step: number;
    title: string;
    tool: string;
    description: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  idealFor: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  accountType: string;
  location?: string;
  highlights: string[];
  skillsLeveraged: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  companyOrContext: string;
  highlightMetric: string;
}
