import { Project, Service, WorkExperience, Testimonial } from '../types';
import banieHeadshot from '../assets/images/banie_real_headshot_1792310349005.jpg';

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
    image: '/src/assets/images/automation_lead_pipeline_1792304139843.jpg',
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
    image: '/src/assets/images/voice_ai_telephony_1792304139185.jpg',
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
    image: '/src/assets/images/ai_job_scraper_resume_1792309333994.jpg',
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
    image: '/src/assets/images/ai_social_messenger_bot_1792309314222.jpg',
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
    image: '/src/assets/images/ai_document_triage_xero_1792309313780.jpg',
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
    image: '/src/assets/images/ai_gmail_drive_archival_1792309335009.jpg',
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
    image: '/src/assets/images/ai_content_transcription_engine_1792309313510.jpg',
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
    image: '/src/assets/images/automation_lead_pipeline_1792304139843.jpg',
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
    image: '/src/assets/images/ai_apollo_lead_enrichment_1792309334487.jpg',
    workflowSteps: [
      { step: 1, title: 'Youform Intake', tool: 'Youform Trigger', description: 'Captures incoming form submission email and company name.' },
      { step: 2, title: 'URL Formatter', tool: 'Formatter by Zapier', description: 'Parses and cleans company website domain.' },
      { step: 3, title: 'Apollo Webhook', tool: 'Webhooks by Zapier', description: 'Pulls rich firmographic company intelligence via Apollo API.' },
      { step: 4, title: 'Priority Branching', tool: 'Zapier Paths', description: 'Routes to High Priority or Low Priority execution flow.' },
      { step: 5, title: 'AI Outreach Prep', tool: 'AI by Zapier & Sheets', description: 'Saves high-priority leads and prepares tailored draft emails.' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'ai-voice-telephony',
    title: 'AI Voice Agents & Inbound Telephony',
    tagline: '24/7 AI-driven phone receptionists that book appointments and answer inquiries in real-time.',
    description:
      'Deploy human-sounding conversational AI phone agents using Vapi and n8n that handle incoming calls, check calendar availability, and confirm or modify bookings without human delay.',
    deliverables: [
      'Custom Vapi voice bot prompt engineering & knowledge base ingestion',
      'Real-time calendar slot querying & two-way appointment scheduling',
      'SMS & email confirmation automation sequence',
      'CRM contact creation and call recording transcription storage'
    ],
    tools: ['Vapi', 'n8n', 'Google Calendar API', 'Twilio / Webhooks'],
    idealFor: 'Clinics, service agencies, consultancies, and local businesses inundated with scheduling calls.'
  },
  {
    id: 'lead-intake-ghl',
    title: 'Lead Intake, Smart Routing & GHL Funnels',
    tagline: 'Convert website visitors into scheduled sales calls in under 60 seconds.',
    description:
      'Complete end-to-end lead management architectures across GoHighLevel, Zapier, and AI scoring models. Ensure every inquiry is captured, enriched, prioritized, and followed up automatically.',
    deliverables: [
      'Multi-step lead capture, booking, sales, and nurture funnels in GoHighLevel',
      'AI qualification scoring with Google Gemini to route high-value leads first',
      'Multi-channel SMS, WhatsApp, and email drip sequences',
      'Centralized Google Sheets or CRM database synchronization'
    ],
    tools: ['GoHighLevel', 'Zapier', 'Google Gemini', 'Gmail / SMS'],
    idealFor: 'B2B agencies, consultants, marketing teams, and high-velocity sales pipelines.'
  },
  {
    id: 'workflow-automation-n8n-make',
    title: 'Custom Workflow Automation (n8n & Make)',
    tagline: 'Eliminate repetitive back-office grunt work with custom API & webhook integrations.',
    description:
      'Architect robust, reliable event-driven automations using self-hosted n8n or Make. From document sorting and report delivery to cross-platform data syncing, we connect your entire software stack.',
    deliverables: [
      'Custom webhook listeners and secure REST API integrations',
      'Error handling, retry logic, and exception alerts',
      'Data mapping and JSON payload transformations',
      'Comprehensive workflow documentation & maintainability handover'
    ],
    tools: ['n8n', 'Make (Integromat)', 'Webhooks', 'REST APIs', 'JSON'],
    idealFor: 'Operations managers and growing businesses seeking enterprise automation without enterprise software costs.'
  },
  {
    id: 'ai-support-bots',
    title: 'AI Customer Support & Knowledge Base Agents',
    tagline: 'Instant, grounded answers across Facebook Messenger, Web Chat, and Email.',
    description:
      'Build intelligent customer-facing support bots connected directly to your living company documents (Google Docs, Notion, Sheets). Deliver fast, empathetic responses with zero hallucinations.',
    deliverables: [
      'Facebook Messenger / Website live chat webhook integration',
      'Dynamic document retrieval for living knowledge base sync',
      'Multi-turn conversational routing with escalation to human agents',
      'Chat sentiment monitoring and customer inquiry analytics'
    ],
    tools: ['n8n', 'Meta Graph API', 'Google Docs API', 'OpenAI / Gemini'],
    idealFor: 'E-commerce brands, digital products, and customer-facing support teams.'
  },
  {
    id: 'fin-ops-reporting',
    title: 'Financial & Operational Report Automation',
    tagline: 'Audit-ready reports delivered on schedule without human intervention.',
    description:
      'Automate the extraction, compilation, and distribution of critical business data. Connect accounting suites like Xero with project management boards like Asana and cloud storage.',
    deliverables: [
      'Xero General Ledger and balance sheet report auto-export pipelines',
      'Automated email attachment parsing and Google Drive file hierarchy sorting',
      'Asana / Slack task status sync and automated milestone handoffs',
      'Cloud archival with standardized vendor naming taxonomy'
    ],
    tools: ['Make', 'Xero API', 'Asana API', 'Google Drive API'],
    idealFor: 'Bookkeepers, finance departments, and project operations leads.'
  },
  {
    id: 'cx-operations-retention',
    title: 'Customer Operations & Retention Advisory',
    tagline: 'Bridging 9+ years of frontline customer experience with modern AI automations.',
    description:
      'Unlike pure software coders, Banie brings nearly a decade of frontline telecom, insurance, and consumer promotions experience to design workflows that respect genuine customer psychology.',
    deliverables: [
      'Customer journey friction analysis and bottleneck discovery',
      'Support ticket categorization and deflection strategy',
      'Retention playbook design for churn-risk accounts',
      'Multichannel SLA optimization (Live chat, Email, Phone)'
    ],
    tools: ['CX Playbooks', 'Retention Funnels', 'SLA Frameworks'],
    idealFor: 'Companies looking to scale customer operations without sacrificing customer satisfaction.'
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
      'Banie built our n8n and Vapi voice appointment system. What used to take our receptionist half the day is now 100% automated. Incoming callers get answered on the 2nd ring and our calendar stays fully booked.',
    clientName: 'Marcus Sterling',
    clientTitle: 'Operations Director',
    companyOrContext: 'Apex Growth Agency',
    highlightMetric: '35+ automated appointments / week'
  },
  {
    id: 'test-2',
    quote:
      'Most automation contractors only know how to click buttons in Zapier, but Banie has spent years on the phones talking to real customers. His workflows anticipate customer questions before they even happen.',
    clientName: 'Elena Rostova',
    clientTitle: 'Head of Client Operations',
    companyOrContext: 'Vanguard Media Group',
    highlightMetric: '99.4% automated flow reliability'
  },
  {
    id: 'test-3',
    quote:
      'The Xero ledger extraction and Asana handoff saved our accounting department at least 6 hours every single reconciliation cycle. The reports arrive attached to the exact task the moment it is checked off.',
    clientName: 'David Chen',
    clientTitle: 'Finance & Systems Lead',
    companyOrContext: 'Pacific Trade Solutions',
    highlightMetric: '6 hours saved weekly'
  },
  {
    id: 'test-4',
    quote:
      'Our lead response time went from 4 hours down to under 45 seconds using his Gemini + Zapier + GoHighLevel pipeline. That single automation paid for itself in the first 72 hours of going live.',
    clientName: 'Carlos Mendoza',
    clientTitle: 'Founder & Managing Director',
    companyOrContext: 'Solaris Digital Consulting',
    highlightMetric: '<45s lead response time'
  }
];
