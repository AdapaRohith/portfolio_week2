import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Service {
    icon: LucideIcon
    title: string
    slug: string
    description: string
    highlights: string[]
}

export const services: Service[] = [
    {
        icon: MonitorCog, title: 'IT Services & Software', slug: 'it-services',
        description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards across your development lifecycle.',
        highlights: ['Lead Qualification & Pipeline', 'Invoice & Billing Reconciliation', 'Bug Triage & Assignment', 'Performance Dashboards'],
    },
    {
        icon: ShoppingCart, title: 'E-Commerce & Retail', slug: 'ecommerce',
        description: 'Omnichannel inventory sync, AI review analysis, order fulfillment, and pricing intelligence to scale online retail.',
        highlights: ['Omnichannel Inventory Sync', 'Review Sentiment Analysis', 'Automated Fulfillment'],
    },
    {
        icon: Factory, title: 'Manufacturing & Logistics', slug: 'manufacturing',
        description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility that cut downtime.',
        highlights: ['Predictive Maintenance', 'Defect Detection (CV)', 'Supply Chain Visibility', 'Smart Reordering'],
    },
    {
        icon: Hospital, title: 'Healthcare & Pharma', slug: 'healthcare',
        description: 'Patient scheduling, claims processing, and HIPAA compliance auditing so staff focus on care.',
        highlights: ['Scheduling & Reminders', 'Claims Processing', 'HIPAA Compliance Audit'],
    },
    {
        icon: Building2, title: 'Real Estate & Construction', slug: 'real-estate',
        description: 'AI lead management, multi-portal listing sync, and site-progress tracking across the property lifecycle.',
        highlights: ['Lead Management', 'Listing Sync', 'Milestone Reminders', 'Progress Tracking'],
    },
    {
        icon: Smartphone, title: 'SMB Micro-Automations', slug: 'smb',
        description: 'Affordable, ready-to-deploy automations: WhatsApp broadcasts, review requests, reminders, daily summaries.',
        highlights: ['WhatsApp Broadcasts', 'Review Requests', 'Appointment Reminders', 'Sales Summaries'],
    },
]
