import {
    Bot,
    Workflow,
    MessageCircle,
    Filter,
    FileText,
    ShieldCheck,
    type LucideIcon,
} from 'lucide-react'

export interface Service {
    icon: LucideIcon
    title: string
    slug: string
    /** One-line summary used on cards and in meta descriptions. */
    description: string
    /** Card chips — short enough to read at a glance. */
    highlights: string[]
    /** Page title for the detail route. */
    metaTitle: string
    metaDescription: string
    /** Opening paragraph of the detail page. Plain, specific, no adjectives. */
    intro: string
    /** What actually gets built. */
    deliverables: { name: string; detail: string }[]
    /** Named tools, so the page is citable rather than generic. */
    stack: string[]
    /** Honest delivery window — see FAQ for how these are scoped. */
    timeline: string
    /** Rendered as a visible caveat where a claim needs one. */
    note?: string
}

/**
 * Positioning is capability-led, not vertical-led. The previous six-vertical
 * split implied deep domain teams (computer vision, predictive maintenance)
 * that a three-person agency cannot credibly staff; these are the things we
 * can point at and hand over.
 */
export const services: Service[] = [
    {
        icon: Bot,
        title: 'RAG Chatbots & Knowledge Assistants',
        slug: 'rag-chatbots',
        description:
            'Assistants that answer from your own documents, tickets, and databases — with citations back to the source, so answers can be checked.',
        highlights: ['Document ingestion', 'Vector search', 'Cited answers', 'Escalation to a human'],
        metaTitle: 'RAG Chatbot Development | AvlokAI — Hyderabad',
        metaDescription:
            'RAG chatbot development for businesses in India: assistants grounded in your own documents and databases, with cited answers, access controls, and human escalation. Typical delivery 4–8 weeks.',
        intro:
            'A retrieval-augmented assistant answers from a corpus you control rather than from a model’s memory. We ingest your documents, tickets, product data, or policy library, index them for retrieval, and wire an assistant that quotes the passage it answered from. When it cannot find a grounded answer, it says so and hands the conversation to a person instead of inventing one.',
        deliverables: [
            {
                name: 'Ingestion pipeline',
                detail: 'Scheduled sync from the sources you name — Drive, SharePoint, a helpdesk, a database, or a scraped internal site — with chunking and re-indexing on change.',
            },
            {
                name: 'Grounded retrieval',
                detail: 'Vector plus keyword retrieval, with per-answer citations back to the source document and page.',
            },
            {
                name: 'Access control',
                detail: 'Retrieval scoped by user or role, so an assistant cannot surface a document the asker could not open directly.',
            },
            {
                name: 'Escalation path',
                detail: 'Confidence thresholds and an explicit "I don’t have that" response, routed to a human queue on WhatsApp, email, or your helpdesk.',
            },
            {
                name: 'Evaluation set',
                detail: 'A written set of question/answer pairs from your team, run against the assistant before handover and re-runnable after any change.',
            },
        ],
        stack: ['n8n', 'Anthropic API', 'OpenAI API', 'pgvector', 'Qdrant', 'Postgres'],
        timeline: 'Typically 4 to 8 weeks from a signed scope, depending on how many sources are in play.',
    },
    {
        icon: Workflow,
        title: 'CRM & Workflow Automation',
        slug: 'crm-workflow-automation',
        description:
            'The routing, syncing, and follow-up work your team currently does by hand between CRM, inbox, sheets, and billing.',
        highlights: ['CRM sync', 'Lead routing', 'Invoice reconciliation', 'Daily digests'],
        metaTitle: 'CRM & n8n Workflow Automation | AvlokAI — Hyderabad',
        metaDescription:
            'n8n automation agency work for Indian businesses: CRM sync, lead routing, invoice reconciliation, and reporting workflows built in your own accounts and handed over documented.',
        intro:
            'Most operational drag is not a missing feature — it is a person copying a field from one system into another. We map the sequence you already run, rebuild it as an orchestrated workflow in n8n, and connect it to the CRM and tools you already pay for. The workflows live in your accounts, and you get the definitions and a runbook at handover.',
        deliverables: [
            {
                name: 'Process map',
                detail: 'A written map of the current sequence, the systems it touches, and the failure points — produced before any building starts.',
            },
            {
                name: 'Orchestrated workflows',
                detail: 'Built in n8n against your CRM (HubSpot, Zoho, Salesforce, or a database you own), with retries and dead-letter handling.',
            },
            {
                name: 'Two-way sync',
                detail: 'Records kept consistent between CRM, spreadsheets, billing, and messaging, with conflict rules agreed in writing.',
            },
            {
                name: 'Reporting',
                detail: 'Scheduled digests to email or WhatsApp — pipeline movement, exceptions that need a human, and workflow failures.',
            },
            {
                name: 'Runbook and handover',
                detail: 'Documented workflows, credentials in your vault, and a walkthrough so your team can change them without us.',
            },
        ],
        stack: ['n8n', 'HubSpot', 'Zoho', 'Salesforce', 'Postgres', 'Google Workspace'],
        timeline: 'Typically 2 to 4 weeks for a single workflow; 4 to 8 weeks across several connected systems.',
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp Business Automation',
        slug: 'whatsapp-automation',
        description:
            'Official WhatsApp Business Platform workflows — follow-up, reminders, and support — with opt-in and opt-out handled properly.',
        highlights: ['Official Cloud API', 'Opt-in capture', 'Template management', 'Opt-out handling'],
        metaTitle: 'WhatsApp Automation for Business in India | AvlokAI',
        metaDescription:
            'WhatsApp automation India: lead follow-up, appointment reminders, and support flows on the official WhatsApp Business Platform, with documented opt-in, approved templates, and opt-out handling.',
        intro:
            'WhatsApp is where most Indian businesses already talk to customers, and it is also where the compliance mistakes are. We build on the official WhatsApp Business Platform (Cloud API) only. That means documented opt-in for every recipient, pre-approved message templates for anything business-initiated, and a working opt-out path — the things that keep a number from being permanently banned.',
        deliverables: [
            {
                name: 'Number and template setup',
                detail: 'Business verification, number registration, and template drafting and submission for approval.',
            },
            {
                name: 'Opt-in capture',
                detail: 'Consent recorded at the point of collection with a timestamp and source, stored where you can produce it on request.',
            },
            {
                name: 'Conversation flows',
                detail: 'Lead follow-up, appointment reminders, order and delivery updates, and a support flow that escalates to a human.',
            },
            {
                name: 'Opt-out and suppression',
                detail: 'Stop-word handling, a suppression list honoured across every workflow, and audit logs of what was sent to whom.',
            },
        ],
        stack: ['WhatsApp Business Platform (Cloud API)', 'n8n', 'Postgres'],
        timeline: 'Typically 2 to 3 weeks once business verification is through; verification itself is on Meta’s timeline.',
        note:
            'We do not build unsolicited bulk messaging or unofficial-API broadcasting. Promotional messaging in India also falls under TRAI’s TCCCPA and DLT registration requirements, which remain the sender’s obligation.',
    },
    {
        icon: Filter,
        title: 'Lead Capture & Qualification',
        slug: 'lead-automation',
        description:
            'Every enquiry from every channel landing in one place, qualified against your criteria, routed to the right person within minutes.',
        highlights: ['Multi-channel capture', 'Deduplication', 'Qualification scoring', 'Instant routing'],
        metaTitle: 'Lead Generation & Qualification Automation | AvlokAI',
        metaDescription:
            'Lead automation for Indian businesses: capture from portals, ads, WhatsApp, and phone into one pipeline, deduplicated, qualified against your criteria, and routed within minutes.',
        intro:
            'Leads arrive from portals, ad forms, WhatsApp, and phone calls, and they leak in the gaps between them. We consolidate every channel into one pipeline, deduplicate against existing records, qualify against the criteria your sales team actually uses, and route with a response-time target you set.',
        deliverables: [
            {
                name: 'Channel consolidation',
                detail: 'Web forms, portal feeds, ad lead forms, WhatsApp, and call logs into a single normalised record.',
            },
            {
                name: 'Deduplication',
                detail: 'Matching on phone and email against your CRM before a duplicate record is ever created.',
            },
            {
                name: 'Qualification',
                detail: 'Rules plus a language model pass over free-text enquiries, scored against criteria your team signs off on.',
            },
            {
                name: 'Routing and SLA alerts',
                detail: 'Assignment by territory, product, or round-robin, with escalation when a lead goes untouched past your threshold.',
            },
        ],
        stack: ['n8n', 'Anthropic API', 'HubSpot', 'Zoho', 'WhatsApp Business Platform'],
        timeline: 'Typically 2 to 4 weeks.',
    },
    {
        icon: FileText,
        title: 'Document & Back-Office Automation',
        slug: 'document-automation',
        description:
            'Extraction, checking, and filing of the documents that move through your operation — invoices, POs, forms, claims paperwork.',
        highlights: ['Structured extraction', 'Validation rules', 'Exception queues', 'System-of-record filing'],
        metaTitle: 'Document Processing & Back-Office Automation | AvlokAI',
        metaDescription:
            'Automated document processing for Indian businesses: extract structured data from invoices, purchase orders, and forms, validate against your rules, and file into your system of record with a human exception queue.',
        intro:
            'Document work is repetitive but not risk-free, so we build it with the exception path first. Documents are parsed into structured fields, checked against your validation rules, and filed into your system of record. Anything that fails a check goes to a human queue with the reason attached — nothing is silently guessed.',
        deliverables: [
            {
                name: 'Extraction',
                detail: 'Structured fields pulled from PDFs, scans, and email attachments, with the source region retained for review.',
            },
            {
                name: 'Validation',
                detail: 'Totals, tax fields, PO matching, and duplicate detection checked against rules agreed with your finance or ops team.',
            },
            {
                name: 'Exception queue',
                detail: 'A reviewable queue for anything below threshold, with the failing check named so a person can resolve it quickly.',
            },
            {
                name: 'Filing and audit trail',
                detail: 'Records written into your ERP, accounting system, or database, with a log of what was extracted and by which run.',
            },
        ],
        stack: ['n8n', 'Anthropic API', 'Postgres', 'Google Workspace'],
        timeline: 'Typically 3 to 6 weeks, depending on document variety.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Automation Reviews',
        slug: 'secure-automation',
        description:
            'A security review of the automations you already run — credential scope, data flow, prompt-injection exposure, and logging.',
        highlights: ['Credential scoping', 'Data-flow mapping', 'Prompt-injection testing', 'Logging review'],
        metaTitle: 'AI Automation Security Review | AvlokAI — Hyderabad',
        metaDescription:
            'Security review of existing AI and n8n automations: over-scoped credentials, data flow to third-party APIs, prompt-injection exposure, and audit logging — by a team from a VAPT and digital-forensics background.',
        intro:
            'Automations accumulate access. A workflow built for one job ends up holding an admin token, piping customer records to a third-party API nobody documented, and logging nothing useful when it misfires. Our founding team comes from vulnerability assessment and penetration testing and digital forensics, so this is the review we would want run against our own builds.',
        deliverables: [
            {
                name: 'Credential and access audit',
                detail: 'Every token, scope, and service account a workflow holds, against what it actually needs.',
            },
            {
                name: 'Data-flow map',
                detail: 'Where client and customer data travels, which third parties receive it, and what is retained where.',
            },
            {
                name: 'Prompt-injection testing',
                detail: 'Adversarial inputs against assistants and document pipelines that act on untrusted content, with findings reproduced.',
            },
            {
                name: 'Logging and incident readiness',
                detail: 'Whether you could reconstruct what a workflow did last Tuesday, and what to add so you can.',
            },
        ],
        stack: ['n8n', 'Cloud IAM', 'Postgres', 'OWASP LLM Top 10'],
        timeline: 'Typically 1 to 2 weeks for a review and written findings.',
        note:
            'This is an engineering review, not a certification. AvlokAI is not an accredited auditor and does not issue attestations against HIPAA, ISO 27001, SOC 2, or any other framework.',
    },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)
