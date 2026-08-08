export interface FaqItem {
    question: string
    answer: string
}

/**
 * Written to be lifted verbatim into an AI answer: every answer is
 * self-contained, names concrete frameworks and tools, and states real
 * timelines instead of adjectives. Rendered expanded, not behind an accordion,
 * and marked up as FAQPage.
 */
export const faqs: readonly FaqItem[] = [
    {
        question: 'What does AvlokAI actually build?',
        answer:
            'AvlokAI is an AI automation agency based in Hyderabad, Telangana. We build three things: retrieval-augmented (RAG) chatbots that answer from your own documents and databases, CRM and back-office workflow automations orchestrated in n8n, and WhatsApp Business API workflows for lead follow-up, reminders, and customer support. Each engagement ends with a system running in your own accounts and infrastructure, with the workflows documented and handed over.',
    },
    {
        question: 'How long does it take to get a first automation live?',
        answer:
            'A single scoped workflow — for example WhatsApp lead follow-up wired into an existing CRM — typically goes live in 2 to 3 weeks from a signed scope. A multi-step system involving a RAG chatbot over your own document set, or integration across three or more systems, typically takes 4 to 8 weeks. We scope in writing before starting and bill against milestones, not hours.',
    },
    {
        question: 'Which Hyderabad industries benefit most from AI automation?',
        answer:
            'In Hyderabad the clearest fits are IT services and product companies (lead qualification, invoice reconciliation, bug triage), e-commerce and D2C brands (inventory sync across marketplaces, review triage, order updates), real estate (portal lead capture and instant follow-up), and manufacturing and logistics operations around Medchal, Patancheru, and Jeedimetla (supply-chain visibility and reordering). The common factor is high-volume, rule-heavy work that already happens over WhatsApp, email, and spreadsheets.',
    },
    {
        question: 'Is my business data safe with an AI automation agency?',
        answer:
            'Ask any agency three questions: which sub-processors touch your data, whether a data-processing agreement is on offer, and who is accountable for a breach. We publish our sub-processor list on our privacy page, we sign a data-processing agreement covering India\'s Digital Personal Data Protection Act 2023, and our founding team comes from vulnerability assessment and penetration testing (VAPT) and digital forensics — so access scoping, secret handling, and audit logging are part of the build rather than an afterthought. By default we deploy into your cloud accounts and your API keys, so data does not sit with us.',
    },
    {
        question: 'Which LLM and automation tools do you build on?',
        answer:
            'We build on n8n for workflow orchestration, the Anthropic and OpenAI APIs for language models, vector stores such as pgvector and Qdrant for retrieval, and the official WhatsApp Business Platform (Cloud API) for messaging. We work inside the CRM you already use — HubSpot, Zoho, Salesforce, or a database you own. We do not resell a black-box platform; you keep the accounts and the workflow definitions.',
    },
    {
        question: 'Is bulk WhatsApp broadcasting allowed, and how do you handle it?',
        answer:
            'Not in the way it is usually sold. The WhatsApp Business Platform requires documented opt-in from each recipient and pre-approved message templates for business-initiated messages, and unofficial broadcast tools get numbers permanently banned. Promotional messaging in India also falls under TRAI\'s TCCCPA and DLT registration regime. We only build on the official API, we implement opt-in capture and opt-out handling as part of the workflow, and we will not build unsolicited bulk messaging.',
    },
    {
        question: 'Can you automate Google review requests without breaking Google\'s policy?',
        answer:
            'Yes, with one design constraint we do not negotiate on: review requests go to every eligible customer, not only the ones predicted to be happy. Google prohibits review gating — filtering by sentiment before asking — and prohibits incentivised reviews. A gated flow puts the client\'s Business Profile at risk, so we build unfiltered request flows only.',
    },
    {
        question: 'Do you work with healthcare or patient data?',
        answer:
            'We build scheduling, reminder, and back-office workflow tooling that supports a healthcare provider\'s own compliance programme. AvlokAI is not an accredited auditor and does not issue HIPAA attestations or certifications. We do not accept protected health information from a US covered entity without an executed Business Associate Agreement, and for Indian providers we work to the Digital Personal Data Protection Act 2023. If your project depends on a certifying audit, you need an accredited assessor, not an automation agency.',
    },
    {
        question: 'How is a project priced?',
        answer:
            'Fixed-price against a written scope, billed across milestones — typically a scoping and design milestone, a build milestone, and a handover milestone. Change requests are quoted before work starts on them. Ongoing support and monitoring, if you want it, is a separate monthly retainer. We publish no rate card because a WhatsApp reminder flow and a multi-source RAG system are not comparable pieces of work; we quote after a scoping call.',
    },
    {
        question: 'Do you work with clients outside Hyderabad?',
        answer:
            'Yes. We are based in Hyderabad and work on-site with clients in Telangana and Andhra Pradesh, and remotely with clients elsewhere in India and abroad. Delivery, review calls, and handover documentation are the same either way.',
    },
]
