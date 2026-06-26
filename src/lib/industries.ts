import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Industry { label: string; icon: LucideIcon; description: string }

export const industries: Industry[] = [
    {
        label: 'IT Services',
        icon: MonitorCog,
        description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards across your development lifecycle.',
    },
    {
        label: 'E-Commerce',
        icon: ShoppingCart,
        description: 'Omnichannel inventory sync, AI review analysis, automated order fulfillment, and pricing intelligence to scale online retail.',
    },
    {
        label: 'Manufacturing',
        icon: Factory,
        description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility that cut unplanned downtime.',
    },
    {
        label: 'Healthcare',
        icon: Hospital,
        description: 'Patient scheduling, insurance claims processing, and HIPAA compliance auditing so clinical staff can focus on care.',
    },
    {
        label: 'Real Estate',
        icon: Building2,
        description: 'AI lead management, multi-portal listing sync, and site-progress milestone tracking across the full property lifecycle.',
    },
    {
        label: 'SMB',
        icon: Smartphone,
        description: 'Affordable, ready-to-deploy automations: WhatsApp broadcasts, review requests, appointment reminders, and daily sales summaries.',
    },
]
