import { Project, Service, WorkExperience, Testimonial } from '../types';
import banieHeadshot from '../assets/images/Professional Asian Corporate Headshot.png';
import automationLeadPipelineImg from '../assets/images/automation_lead_pipeline_1792304139843.jpg';
import voiceAiTelephonyImg from '../assets/images/AI Appointment Setter Voice Agent (AI Receptionist).jpg';
import aiJobScraperResumeImg from '../assets/images/AI Job Scraper & Resume Optimizer.jpg';
import aiSocialMessengerBotImg from '../assets/images/Facebook Page AI Support Agent.jpg';
import aiDocumentTriageXeroImg from '../assets/images/Automated Xero General Ledger Report Delivery.jpg';
import aiGmailDriveArchivalImg from '../assets/images/Gmail Attachment Sorting & Cloud Archiving.jpg';
import aiContentTranscriptionImg from '../assets/images/AI Content Repurposing Engine.jpg';
import asanaMultiPathWorkflowImg from '../assets/images/Asana Multi-Path Production Workflow.jpg';
import aiApolloLeadEnrichmentImg from '../assets/images/Automated Lead Enrichment Pipeline.jpg';
import brightSmileGhlImg from '../assets/images/Bright Smile Appointment Confirmation and Reminders.jpg';

export const PERSONAL_INFO = {
  name: 'Banie Bacolod Necesario',
  firstName: 'Banie',
  lastName: 'Necesario',
  headline: 'Workflow and AI Automation Specialist · Customer Operations',
  phone: '09227295023',
  phoneFormatted: '+63 922 729 5023',
  email: 'banienecesario21@gmail.com',
  location: 'Metro Manila, Philippines (Available Globally / Remote)',
  yearsOfExperience: '9+',
  profileImage: banieHeadshot,
  education: {
    degree: 'Bachelor of Science in Business Administration',
    institution: 'City of Malabon University',
    period: '2012–2016'
  },
  summary:
    'Customer service professional with experience since 2016 across telecommunications, consumer promotions, and insurance. Skilled in customer support, billing and account changes, connectivity troubleshooting, retention, and multichannel service. Hands-on experience building workflow automations with Zapier, Make, n8n, and GoHighLevel, including API integrations, AI agents, lead routing, job scraping, resume tailoring, appointment scheduling, and sales funnels. Brings a strong understanding of customer needs and service processes to automation projects.'
};

export const CORE_SKILLS = [
  {
    category: 'Automation Platforms',
    items: ['Zapier', 'Make (Integromat)', 'n8n', 'GoHighLevel (GHL)', 'Webhooks', 'REST APIs', 'Workflow Architecture']
  },
  {
    category: 'AI & Business Workflows',
    items: ['AI Agents (Vapi, Gemini, GPT)', 'Lead Intake & Smart Routing', 'Lead Enrichment', 'Job Scraping', 'Resume Tailoring', 'AI Content Repurposing']
  },
  {
    category: 'CRM & Productivity Ecosystem',
    items: ['Google Sheets & Drive', 'Gmail Automation', 'Asana', 'Slack', 'Xero Accounting', 'Apollo.io', 'Vapi Voice AI']
  },
  {
    category: 'Funnels & Growth Pipelines',
    items: ['Lead Capture Funnels', 'Automated Booking Calendars', 'Nurture Sequences', 'Multi-Step Sales Pipelines', 'SMS/Email Cadence']
  },
  {
    category: 'Customer Operations Expertise',
    items: ['Inbound & Outbound Support', 'Multichannel Live Chat & Email', 'Billing & Account Reconciliation', 'Connectivity Troubleshooting', 'Churn Prevention & Retention']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'lead-intake-routing',
    title: 'AI-Powered Lead Intake & Smart Routing',
    category: 'Zapier',
    platforms: ['Zapier', 'Google Gemini', 'Google Sheets', 'Gmail', 'GoHighLevel'],
    summary:
      'Engineered an enterprise lead management architecture that automatically captures incoming leads, cleanses data, scores urgency with Google Gemini, and routes to appropriate sales funnels.',
    trigger: 'New lead submission via webhooks or GoHighLevel landing form',
    actions: [
      'Gemini AI analyses lead intent, budget, and qualification score',
      'Instant logging to central Google Sheets database with timestamped records',
      'Dynamic pipeline stage update and nurture sequence launch in GoHighLevel',
      'Personalized acknowledgement email dispatched via Gmail within 30 seconds'
    ],
    businessImpact: 'Reduced initial lead response time from 4+ hours to under 45 seconds, boosting booking conversion rates.',
    featured: true,
    image: automationLeadPipelineImg,
    workflowSteps: [
      { step: 1, title: 'Lead Capture', tool: 'GoHighLevel / Webhook', description: 'Receives raw form submissions and validates fields.' },
      { step: 2, title: 'AI Intent Parsing', tool: 'Google Gemini', description: 'Categorizes inquiry type, urgency tier, and qualification score.' },
      { step: 3, title: 'Data Logging', tool: 'Google Sheets API', description: 'Records structured lead data and historical attribution.' },
      { step: 4, title: 'CRM Assignment', tool: 'GoHighLevel', description: 'Assigns pipeline owner, schedules follow-up tasks, and tags lead.' },
      { step: 5, title: 'Instant Nurture', tool: 'Gmail API', description: 'Sends custom tailored onboarding emails based on inquiry topic.' }
    ]
  },
  {
    id: 'ai-appointment-setter',
    title: 'AI Appointment Setter Voice Agent (AI Receptionist)',
    category: 'AI & Voice',
    platforms: ['n8n', 'Vapi', 'Webhooks', 'REST API', 'Google Calendar'],
    summary:
      'Connected Vapi voice telephony to an n8n webhook server to deploy an autonomous conversational voice agent (AI Receptionist) capable of handling live inbound calls, slot querying, appointment booking, rescheduling, and cancellations.',
    trigger: 'Inbound customer phone call via telephony line',
    actions: [
      'Vapi natural conversational voice bot greets caller and transcribes in real-time',
      'Identifies caller intent: GetSlots, BookSlots, UpdateSlots, or CancelSlots',
      'Webhooks transmit structured intent to n8n to query Google Calendar availability',
      'Executes booking action, updates CRM, and sends instant SMS/email confirmation'
    ],
    businessImpact: '24/7 call coverage without staffing overhead, handling concurrent calls and cutting booking drop-offs.',
    featured: true,
    image: voiceAiTelephonyImg,
    workflowSteps: [
      { step: 1, title: 'Inbound Telephony', tool: 'Vapi Voice AI', description: 'Handles low-latency conversational speech with human tone.' },
      { step: 2, title: 'Intent Branching', tool: 'n8n Sub-flows', description: 'Routes to GetSlots, BookSlots, UpdateSlots, or CancelSlots.' },
      { step: 3, title: 'Slot Validation', tool: 'Google Calendar API', description: 'Verifies calendar availability in real-time.' },
      { step: 4, title: 'Event Mutation', tool: 'API Integration', description: 'Creates, modifies, or cancels calendar slot automatically.' },
      { step: 5, title: 'Call Results Logging', tool: 'n8n Call Results Node', description: 'Logs recording, transcription, and customer record in CRM.' }
    ]
  },
  {
    id: 'job-scraper-resume-tailor',
    title: 'AI Job Scraper & Resume Optimizer',
    category: 'n8n',
    platforms: ['n8n', 'Slack', 'Basic LLM Chain', 'Google Drive', 'Gmail'],
    summary:
      'Created an autonomous pipeline in n8n triggered by a Slack channel message that scrapes job opportunities across target portals, evaluates candidate alignment via Basic LLM Chain, tailors resumes to exact role requirements, and drafts submission emails.',
    trigger: 'New message or job URL shared in dedicated Slack channel',
    actions: [
      'Slack trigger initiates automated HTTP request to extract job listing text',
      'Basic LLM Chain compares scraped data against user profile & skills',
      'Copies Google Drive resume template and injects targeted keyword alignment',
      'Creates Gmail draft and notifies hiring team in Slack channel'
    ],
    businessImpact: 'Automated 90% of manual resume customization time, delivering high-matching tailored drafts in seconds.',
    featured: false,
    image: aiJobScraperResumeImg,
    workflowSteps: [
      { step: 1, title: 'Slack Trigger', tool: 'Slack Bot API', description: 'Listens for target channel messages containing job URLs.' },
      { step: 2, title: 'HTTP Scraper', tool: 'n8n HTTP Request', description: 'Scrapes live job listing text and structured metadata.' },
      { step: 3, title: 'Basic LLM Chain', tool: 'OpenRouter / Gemini AI', description: 'Aligns core candidate achievements against job requirements.' },
      { step: 4, title: 'Resume Doc Update', tool: 'Google Drive API', description: 'Generates tailored resume file in Google Drive.' },
      { step: 5, title: 'Notification & Draft', tool: 'Slack & Gmail API', description: 'Pings Slack channel and prepares outbound email draft.' }
    ]
  },
  {
    id: 'facebook-ai-agent',
    title: 'Facebook Page AI Support Agent',
    category: 'n8n',
    platforms: ['n8n', 'Webhooks', 'Google Gemini', 'Google Docs', 'Meta API'],
    summary:
      'Built a webhook-triggered AI customer support agent for Facebook Messenger that answers customer inquiries accurately using live Google Docs company documentation as its knowledge base.',
    trigger: 'Customer sends a direct message to business Facebook Page',
    actions: [
      'n8n receives Meta webhook payload containing user query and sender details',
      'Fetches latest authoritative company FAQs and policies directly from Google Docs API',
      'AI Agent with Gemini Chat Model & Window Buffer Memory grounds response in source docs',
      'Dispatches direct reply via Meta Graph API within 2 seconds'
    ],
    businessImpact: 'Maintained zero response wait time on social channels while preventing hallucinations with source grounding.',
    featured: false,
    image: aiSocialMessengerBotImg,
    workflowSteps: [
      { step: 1, title: 'Messenger Webhook', tool: 'Meta Graph API', description: 'Catches incoming customer chat messages.' },
      { step: 2, title: 'Doc Retrieval', tool: 'Google Docs API', description: 'Extracts updated operational knowledge and pricing guides.' },
      { step: 3, title: 'AI Agent & Memory', tool: 'Gemini + Window Memory', description: 'Synthesizes conversation context with factual company docs.' },
      { step: 4, title: 'HTTP Send Response', tool: 'Meta API / n8n', description: 'Delivers warm, brand-compliant response directly in chat.' }
    ]
  },
  {
    id: 'xero-ledger-delivery',
    title: 'Automated Xero General Ledger Report Delivery',
    category: 'Make',
    platforms: ['Make', 'Asana', 'Xero API', 'Google Sheets', 'Drive'],
    summary:
      'Engineered a financial operations automation in Make (Integromat) that monitors accounting task completions in Asana, calls the Xero API for General Ledger detail reports, iterates transaction lines into Google Sheets, and uploads the CSV directly to Asana.',
    trigger: 'Reconciliation task marked "Completed" in Asana project board',
    actions: [
      'Asana Watch Completed Tasks webhook triggers the scenario execution',
      'Authenticates via OAuth 2.0 with Xero API and queries GL detail reports',
      'Router & Iterator modules map line items into Google Sheets',
      'Compiles CSV report and attaches file directly to completed Asana task'
    ],
    businessImpact: 'Eliminated manual report export steps for finance leads, saving ~6 hours weekly and preventing reporting delays.',
    featured: true,
    image: aiDocumentTriageXeroImg,
    workflowSteps: [
      { step: 1, title: 'Asana Watcher', tool: 'Asana Trigger', description: 'Detects state change on target accounting task.' },
      { step: 2, title: 'Xero API Query', tool: 'Xero Integration', description: 'Fetches granular general ledger transaction records.' },
      { step: 3, title: 'Router & Iterator', tool: 'Make Router Module', description: 'Processes ledger rows and stages data into Google Sheets.' },
      { step: 4, title: 'CSV Compilation', tool: 'Make Tools Aggregator', description: 'Generates structured audit-ready CSV artifact.' },
      { step: 5, title: 'Asana Attachment', tool: 'Asana Upload API', description: 'Uploads generated ledger report directly to task comments.' }
    ]
  },
  {
    id: 'gmail-attachment-sorting',
    title: 'Gmail Attachment Sorting & Cloud Archiving',
    category: 'Make',
    platforms: ['Make', 'Gmail', 'Gemini AI', 'Google Drive', 'Google Sheets'],
    summary:
      'Automated email document triage in Make by watching incoming Gmail messages, listing attachments, utilizing Gemini AI to analyze contents and generate standardized filenames, and archiving them into structured Google Drive folders.',
    trigger: 'New email received in Gmail with attached files',
    actions: [
      'Gmail Watch Emails module monitors incoming messages and lists attachments',
      'AI file analysis module inspects invoice/contract contents and extracts metadata',
      'Generates standardized filename (Vendor_Date_Invoice#) using AI',
      'Uploads attachment to designated Google Drive folder, logs row in Google Sheets, and sends confirmation notification'
    ],
    businessImpact: 'Ended manual file downloading and misplaced attachments, ensuring 100% audit-ready cloud organization.',
    featured: false,
    image: aiGmailDriveArchivalImg,
    workflowSteps: [
      { step: 1, title: 'Watch Emails', tool: 'Gmail Watcher', description: 'Monitors inbox for attachment-bearing emails.' },
      { step: 2, title: 'Attachment List', tool: 'Gmail Attachment Module', description: 'Separates multiple files from single messages.' },
      { step: 3, title: 'AI File Analysis', tool: 'Gemini / AI Module', description: 'Extracts invoice details and generates structured filename.' },
      { step: 4, title: 'Drive Archival', tool: 'Google Drive API', description: 'Uploads renamed attachment to organized cloud directory.' },
      { step: 5, title: 'Audit Sheet Log', tool: 'Google Sheets API', description: 'Records transaction log and triggers confirmation notification.' }
    ]
  },
  {
    id: 'ai-content-repurposing',
    title: 'AI Content Repurposing Engine',
    category: 'Zapier',
    platforms: ['Zapier', 'Google Drive', 'AI by Zapier', 'Facebook Pages', 'LinkedIn'],
    summary:
      'Created an end-to-end multimedia pipeline in Zapier that detects newly uploaded audio or video files in Google Drive, generates verbatim transcripts with AI by Zapier, synthesizes multiple blog posts, and loops outputs to Facebook Pages and LinkedIn.',
    trigger: 'New video or audio file uploaded to Google Drive folder',
    actions: [
      'Google Drive trigger detects new file and filters valid media formats',
      'AI by Zapier generates accurate speech-to-text transcript from file',
      'AI by Zapier synthesizes long-form blog posts and catchy social blurbs',
      'Looping by Zapier iterates through drafts and splits paths to publish on Facebook Pages and LinkedIn'
    ],
    businessImpact: 'Cut content production turnaround time from 2 days to under 15 minutes per recording.',
    featured: false,
    image: aiContentTranscriptionImg,
    workflowSteps: [
      { step: 1, title: 'Drive File Upload', tool: 'Google Drive Trigger', description: 'Detects new master media file in designated folder.' },
      { step: 2, title: 'AI Transcription', tool: 'AI by Zapier', description: 'Transcribes audio/video stream into formatted text.' },
      { step: 3, title: 'AI Blog Generation', tool: 'AI by Zapier', description: 'Generates structured blog drafts, key takeaways, and quotes.' },
      { step: 4, title: 'Looping by Zapier', tool: 'Zapier Looper', description: 'Iterates through line items for multi-channel syndication.' },
      { step: 5, title: 'Path Syndication', tool: 'Facebook & LinkedIn APIs', description: 'Posts formatted content to Facebook Pages and LinkedIn.' }
    ]
  },
  {
    id: 'asana-lead-workflow',
    title: 'Asana Multi-Path Production Workflow',
    category: 'Zapier',
    platforms: ['Zapier', 'Asana', 'Google Drive', 'Gmail', 'AI by Zapier'],
    summary:
      'Engineered a comprehensive 5-path branched Zapier automation triggered by Asana task updates. Handles automated folder provisioning for "Ready to Start", follow-up sequences for "No response" and "Quoted", and personalized AI welcome workflows for "Approved" and "Paid and Closed".',
    trigger: 'Task status updated in Asana project management board',
    actions: [
      'Zapier detects updated task in Asana and evaluates conditional paths',
      'Path A ("Ready to Start"): Creates Google Drive lead folder and assigns "Social Media Content" subtask in Asana',
      'Path B ("No response"): Sends follow-up email via Gmail with dynamic delay filters',
      'Path C ("Quoted"): Dispatches quote follow-up and schedule reminders',
      'Path D & E ("Approved" & "Paid"): AI by Zapier composes personalized recommendations and welcome emails'
    ],
    businessImpact: 'Zero onboarding friction between sales close and creative team kickoff across 5 distinct client states.',
    featured: false,
    image: asanaMultiPathWorkflowImg,
    workflowSteps: [
      { step: 1, title: 'Asana Updated Task', tool: 'Asana Trigger', description: 'Monitors status movements on master project tasks.' },
      { step: 2, title: 'Zapier Path Splitter', tool: 'Zapier Paths Module', description: 'Branches into 5 distinct operational state routes.' },
      { step: 3, title: 'Drive Provisioning', tool: 'Google Drive API', description: 'Generates client directory structures for "Ready to Start".' },
      { step: 4, title: 'Asana Task Delegation', tool: 'Asana API', description: 'Assigns creative team subtasks with checklist.' },
      { step: 5, title: 'AI Follow-Up & Welcome', tool: 'AI by Zapier & Gmail', description: 'Drafts and dispatches personalized onboarding sequences.' }
    ]
  },
  {
    id: 'lead-enrichment-apollo',
    title: 'Automated Lead Enrichment Pipeline',
    category: 'Zapier',
    platforms: ['Zapier', 'Youform', 'Apollo API', 'Google Sheets', 'Gmail'],
    summary:
      'Configured a high-efficiency Catch Hook architecture in Zapier that receives lead submissions from Youform, formats company domains, enriches firmographics via the Apollo API, splits into High vs Low priority paths, and notifies sales reps with pre-drafted outreach.',
    trigger: 'Lead submission received from Youform',
    actions: [
      'Formatter by Zapier extracts and normalizes the company URL',
      'Webhooks by Zapier queries the Apollo API for employee count, revenue, and industry',
      'Paths by Zapier splits prospects into High Priority vs Low Priority tiers',
      'High Priority: Logs to Google Sheets, alerts sales via Gmail, and uses AI by Zapier to compose a tailored outreach draft'
    ],
    businessImpact: 'Equipped sales representatives with comprehensive prospect intelligence and AI drafts before first contact.',
    featured: false,
    image: aiApolloLeadEnrichmentImg,
    workflowSteps: [
      { step: 1, title: 'Youform Intake', tool: 'Youform Trigger', description: 'Captures incoming form submission email and company name.' },
      { step: 2, title: 'URL Formatter', tool: 'Formatter by Zapier', description: 'Parses and cleans company website domain.' },
      { step: 3, title: 'Apollo Webhook', tool: 'Webhooks by Zapier', description: 'Pulls rich firmographic company intelligence via Apollo API.' },
      { step: 4, title: 'Priority Branching', tool: 'Zapier Paths', description: 'Routes to High Priority or Low Priority execution flow.' },
      { step: 5, title: 'AI Outreach Prep', tool: 'AI by Zapier & Sheets', description: 'Saves high-priority leads and prepares tailored draft emails.' }
    ]
  },
  {
    id: 'bright-smile-appointment-reminders',
    title: 'Dental Service Appointment Confirmation with Reminders',
    category: 'GoHighLevel',
    platforms: ['GoHighLevel', 'CRM Pipelines', 'Email Automation', 'Wait Timers', 'Tagging'],
    summary:
      'Built an automated GoHighLevel appointment lifecycle workflow for Bright Smile that triggers on booking status, applies patient tracking tags, creates or updates pipeline opportunities, sends instant confirmation emails, and schedules timed 24-hour and 4-hour reminders.',
    trigger: 'Appointment Status updated (Event type is "Normal") in GoHighLevel',
    actions: [
      'Applies "bright smile booked" CRM tag immediately upon appointment creation',
      'Creates or updates the patient opportunity record inside the GoHighLevel pipeline',
      'Dispatches instant appointment confirmation email to the client',
      'Uses staggered Wait Timers (1 day & 4 hours before) to send timely email reminders'
    ],
    businessImpact: 'Eliminated manual booking follow-ups and reduced appointment no-shows with automated multi-stage reminders.',
    featured: true,
    image: brightSmileGhlImg,
    workflowSteps: [
      { step: 1, title: 'Appointment Status Trigger', tool: 'GoHighLevel Trigger', description: 'Enrolls contacts when a Normal-type appointment is booked.' },
      { step: 2, title: 'Add Tracking Tag', tool: 'GoHighLevel CRM', description: 'Applies the "bright smile booked" tag for segmentation.' },
      { step: 3, title: 'Create or Update Opportunity', tool: 'GHL Pipeline', description: 'Logs or updates the appointment stage in the sales pipeline.' },
      { step: 4, title: 'Send Confirmation Email', tool: 'GHL Email Action', description: 'Sends immediate appointment confirmation details to the contact.' },
      { step: 5, title: 'Wait 1 Day & 24h Reminder', tool: 'GHL Wait & Email', description: 'Pauses until 24 hours prior and sends the reminder email.' },
      { step: 6, title: 'Wait 4 Hours Pre-Visit', tool: 'GHL Wait Timer', description: 'Stages the final 4-hour pre-appointment reminder window.' }
    ]
  },
  {
    id: 'voice-ai-appointment-ghl',
    title: 'Voice AI Appointment in GoHighLevel',
    category: 'AI & Voice',
    platforms: ['GoHighLevel', 'Voice AI', 'Knowledge Base', 'Live Transcript', 'Post-Call'],
    summary:
      'Configured an inbound GoHighLevel Voice AI agent ("Hannah") using Jessica voice and GPT 6.1 Terra to greet HVAC service callers, diagnose heating/cooling or maintenance needs, qualify service areas, and book service appointments or estimates with knowledge-base grounding.',
    trigger: 'Inbound customer phone call to GoHighLevel Voice AI number',
    actions: [
      'Speaks first with custom greeting and natural conversational pacing ("AI speaks first")',
      'Identifies caller intent across service bookings, maintenance tune-ups, and replacement estimates',
      'Grounds answers strictly in the approved Knowledge Base with hangup and spam protection',
      'Captures caller details, callback number, live transcript, and post-call workflow triggers'
    ],
    businessImpact: 'Delivers 24/7 inbound call handling, accurate triage, and faster appointment scheduling without missed calls.',
    featured: true,
    image: '/assets/aistudio/AI_Inbound_Appointment_Setter_using_GHL_efa79453.png',
    workflowSteps: [
      { step: 1, title: 'Inbound Call & Greeting', tool: 'GHL Voice AI (Jessica)', description: 'Answers immediately with a tailored HVAC United welcome script.' },
      { step: 2, title: 'Intent & Area Triage', tool: 'GPT 6.1 Terra Prompt', description: 'Identifies service issue, replacement estimate, or callback request.' },
      { step: 3, title: 'Knowledge Base Grounding', tool: 'GHL Knowledge Base', description: 'Prevents guessing on pricing, warranties, or arrival windows.' },
      { step: 4, title: 'Call Controls & Safety', tool: 'During-Call Actions', description: 'Applies automated hangup rules and spam call filtering.' },
      { step: 5, title: 'Transcript & Post-Call Flow', tool: 'GHL Post-Call', description: 'Logs live transcript, callback info, and post-call follow-up workflows.' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'ai-voice-telephony',
    title: 'AI Voice Agents & Inbound Telephony',
    tagline: '24/7 AI receptionists that answer calls and book appointments.',
    description:
      'Conversational voice agents built with Vapi and GoHighLevel that handle inbound calls, check live calendars, and confirm bookings automatically.',
    deliverables: [
      'Vapi / GHL voice prompt & knowledge base setup',
      'Live calendar checks & two-way booking',
      'Instant SMS & email confirmations',
      'CRM logging & call transcript capture'
    ],
    tools: ['Vapi', 'GoHighLevel', 'n8n', 'Google Calendar'],
    idealFor: 'Clinics, home services, agencies & local businesses'
  },
  {
    id: 'lead-intake-ghl',
    title: 'Lead Intake, Routing & GHL Funnels',
    tagline: 'Respond to new leads in under 60 seconds and book more calls.',
    description:
      'End-to-end capture, AI qualification, and automated follow-up across GoHighLevel, Zapier, and your CRM.',
    deliverables: [
      'GHL capture, booking & nurture funnels',
      'AI lead scoring & priority routing',
      'Automated SMS, email & reminder sequences',
      'Real-time CRM & Google Sheets sync'
    ],
    tools: ['GoHighLevel', 'Zapier', 'Gemini AI', 'Gmail / SMS'],
    idealFor: 'B2B agencies, consultants & high-velocity sales teams'
  },
  {
    id: 'workflow-automation-n8n-make',
    title: 'Custom Workflow Automation (n8n, Make & Zapier)',
    tagline: 'Eliminate repetitive manual tasks across your software stack.',
    description:
      'Reliable API and webhook workflows that sync your apps, built with error alerts and clear documentation.',
    deliverables: [
      'Custom webhooks & REST API integrations',
      'Cross-platform data mapping & sync',
      'Error handling, retries & failure alerts',
      'Clean documentation & team handoff'
    ],
    tools: ['n8n', 'Make', 'Zapier', 'Webhooks / APIs'],
    idealFor: 'Operations leads & growing teams scaling efficiently'
  },
  {
    id: 'ai-support-bots',
    title: 'AI Customer Support & Chat Agents',
    tagline: 'Instant, grounded answers on Messenger, web chat, and email.',
    description:
      'Support bots connected to your live company docs to resolve common inquiries fast without guessing.',
    deliverables: [
      'Messenger, web chat & email integration',
      'Live sync with Google Docs & FAQs',
      'Smart escalation to human agents',
      'Conversation history & inquiry tracking'
    ],
    tools: ['n8n', 'Meta API', 'Google Docs', 'OpenAI / Gemini'],
    idealFor: 'E-commerce brands, SaaS & customer support teams'
  },
  {
    id: 'fin-ops-reporting',
    title: 'Financial & Operations Reporting',
    tagline: 'Audit-ready reports and organized cloud files on autopilot.',
    description:
      'Automated ledger exports, email attachment sorting, and task handoffs connecting Xero, Asana, Gmail, and Google Drive.',
    deliverables: [
      'Automated Xero ledger & CSV exports',
      'AI email attachment sorting & renaming',
      'Asana & Slack milestone handoffs',
      'Structured Google Drive & Sheets archiving'
    ],
    tools: ['Make', 'Xero API', 'Asana', 'Google Drive'],
    idealFor: 'Finance teams, bookkeepers & project managers'
  },
  {
    id: 'cx-operations-retention',
    title: 'Customer Operations & Retention Advisory',
    tagline: '9+ years of frontline CX expertise applied to your workflows.',
    description:
      'Practical workflow audits and retention systems shaped by real telecom, insurance, and multichannel support experience.',
    deliverables: [
      'Customer journey & bottleneck audit',
      'Ticket triage & self-service deflection',
      'Churn-prevention & follow-up playbooks',
      'Multichannel SLA & response optimization'
    ],
    tools: ['CX Audits', 'Retention Funnels', 'SLA Playbooks'],
    idealFor: 'Teams scaling support without sacrificing CSAT'
  }
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'concentrix-insurance',
    role: 'Customer Service Representative',
    company: 'Concentrix',
    period: '2025 – Present',
    accountType: 'Insurance Account · Inbound Customer Support',
    location: 'Metro Manila, Philippines',
    highlights: [
      'Deliver high-touch inbound support explaining complex insurance coverage, deductibles, and policy benefits with exceptional clarity.',
      'Process high-accuracy policy withdrawal requests, beneficiary updates, and requested modifications to customer financial accounts.',
      'Maintain rigorous compliance with financial privacy regulations and insurer verification standards.',
      'Identify recurring account change inquiries and formulate structured documentation that informs automated self-service logic.'
    ],
    skillsLeveraged: ['Inbound Support', 'Account Modifications', 'Financial Compliance', 'Customer Retention']
  },
  {
    id: 'tsa-telecom',
    role: 'Customer Service Representative',
    company: 'TSA Philippines',
    period: '2024 – 2025',
    accountType: 'Telecommunications Account · Broadband & Mobile',
    location: 'Metro Manila, Philippines',
    highlights: [
      'Supported customers exploring broadband tier upgrades, mobile data packages, hardware installments, and Apple/Samsung devices.',
      'Diagnosed and resolved technical connectivity issues, slow fiber/mobile data, and network routing configurations.',
      'Mastered billing deconstruction: explained proration, contract terms, and fee adjustments to diffuse customer frustration.',
      'Presented tailored retention offers and contract renewals to customers actively considering service cancellation, recovering high-risk accounts.'
    ],
    skillsLeveraged: ['Connectivity Troubleshooting', 'Retention & Churn Prevention', 'Device & Plan Advisory', 'Billing Resolution']
  },
  {
    id: 'transcosmos-promotions',
    role: 'Customer Service Representative',
    company: 'Transcosmos Asia Philippines',
    period: '2021 – 2024',
    accountType: 'Consumer Promotions Account · Marlboro, Philip Morris, Fortune, Chesterfield',
    location: 'Metro Manila, Philippines',
    highlights: [
      'Supported major international brand promotional campaigns across multichannel touchpoints: inbound/outbound calls, email, and live chat.',
      'Managed up to 3 concurrent live chat conversations simultaneously while maintaining SLA targets and high CSAT scores.',
      'Dispatched official event participation updates, winner reward notifications, and required verification documents via email.',
      'Validated contest entries, identity verification docs, and addressed promotional redemption inquiries.'
    ],
    skillsLeveraged: ['Multitasking Live Chat (3x)', 'Multichannel Operations', 'Promotions Verification', 'Outbound Campaigns']
  },
  {
    id: 'convergys-telecom',
    role: 'Customer Service Representative',
    company: 'Concentrix / Convergys',
    period: '2016 – 2021',
    accountType: 'Telecommunications Account · Inbound Billing & Support',
    location: 'Metro Manila, Philippines',
    highlights: [
      '5-year foundational tenure resolving complex inbound billing disputes, roaming adjustments, and plan changes.',
      'Guided non-technical subscribers through mobile data APN configuration, SIM activation, and router resets.',
      'Consistently ranked in the top quartile for First Contact Resolution (FCR) and Average Handling Time (AHT).',
      'Trained new team members on CRM navigation, account security protocols, and empathetic de-escalation.'
    ],
    skillsLeveraged: ['5-Year Telecom Tenacity', 'Billing Dispute Resolution', 'First Contact Resolution (FCR)', 'Technical Troubleshooting']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Banie is knowledgeable, compassionate, and friendly. Please continue hiring people like him. Great job and excellent service!',
    clientName: 'Maria Rebecca Reyes',
    clientTitle: 'AXA Customer',
    companyOrContext: '',
    highlightMetric: 'Verified Client Feedback'
  }
];
