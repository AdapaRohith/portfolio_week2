import {
    MonitorCog,
    ShoppingCart,
    Building2,
    Factory,
    Hospital,
    Smartphone,
    type LucideIcon,
} from 'lucide-react'

export interface Industry {
    label: string
    slug: string
    icon: LucideIcon
    summary: string
    examples: string[]
    note?: string
}

/**
 * Sectors we apply the same capability set to. Deliberately framed as workflow
 * automation rather than deep domain modelling — we do not claim in-house
 * computer-vision or predictive-maintenance teams.
 */
export const industries: Industry[] = [
    {
        label: 'IT Services & Software',
        slug: 'it-services',
        icon: MonitorCog,
        summary:
            'Agencies and product teams in Hyderabad run a lot of coordination by hand. We automate the parts that are rule-driven.',
        examples: [
            'Inbound lead qualification and routing into the CRM',
            'Invoice generation and payment-status reconciliation',
            'Support-ticket triage and assignment from free-text descriptions',
            'Weekly delivery digests pulled from project tooling',
        ],
    },
    {
        label: 'E-Commerce & D2C',
        slug: 'ecommerce',
        icon: ShoppingCart,
        summary:
            'Selling across a website and two or three marketplaces means the same data being re-entered in several places.',
        examples: [
            'Inventory and price sync across marketplace listings',
            'Order and delivery updates over WhatsApp with opt-in handling',
            'Review and complaint triage into a queue a human works through',
            'Returns and RTO paperwork filed automatically',
        ],
    },
    {
        label: 'Real Estate',
        slug: 'real-estate',
        icon: Building2,
        summary:
            'Portal leads decay in minutes. Most of the loss is response time, not lead quality.',
        examples: [
            'Portal, ad-form, and walk-in leads consolidated into one pipeline',
            'Instant WhatsApp acknowledgement and qualification questions',
            'Site-visit scheduling with reminders and no-show follow-up',
            'Listing detail synced across portals from one source',
        ],
    },
    {
        label: 'Manufacturing & Logistics',
        slug: 'manufacturing',
        icon: Factory,
        summary:
            'Operations work that already lives in spreadsheets, email, and WhatsApp groups, made systematic.',
        examples: [
            'Purchase order and invoice matching with an exception queue',
            'Reorder alerts driven by stock thresholds and lead times',
            'Dispatch and delivery status updates to customers',
            'Shift and maintenance-log reporting consolidated daily',
        ],
        note:
            'We build workflow and reporting automation. Sensor-driven predictive maintenance and vision-based defect detection need domain data and specialist teams — we will say so rather than quote for it.',
    },
    {
        label: 'Healthcare Operations',
        slug: 'healthcare',
        icon: Hospital,
        summary:
            'Front-desk and back-office workload around a practice, kept away from clinical data by design.',
        examples: [
            'Appointment scheduling, confirmations, and reminders',
            'Enquiry handling and routing outside clinic hours',
            'Insurance and billing paperwork with a human review step',
            'Recall and follow-up campaigns with recorded consent',
        ],
        note:
            'AvlokAI is not an accredited auditor and issues no HIPAA attestation. We do not accept protected health information from a US covered entity without an executed Business Associate Agreement.',
    },
    {
        label: 'Small Business',
        slug: 'smb',
        icon: Smartphone,
        summary:
            'Single, scoped automations for owner-run businesses — one workflow, live in weeks, handed over documented.',
        examples: [
            'Appointment reminders and confirmations',
            'Unfiltered Google review requests sent to every customer',
            'Daily sales and enquiry summaries',
            'Enquiry capture from a form or WhatsApp into a simple pipeline',
        ],
    },
]
