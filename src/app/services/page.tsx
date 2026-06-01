import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Check, ExternalLink, Factory, Hospital, Map, MonitorCog, Search, ShoppingCart, Smartphone, TrendingUp, Wrench, type LucideIcon } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Our Services — AvlokAI | AI Automation Solutions for Every Business',
    description: 'Explore AvlokAI\'s full range of AI automation services: lead generation, CRM integration, workflow automation, chatbots, data pipelines, and more across 6 industry verticals.',
    alternates: {
        canonical: 'https://avlokai.com/services',
    },
    openGraph: {
        title: 'Our Services — AvlokAI',
        description: 'Full-stack AI automation services built for production. From lead qualification to predictive maintenance.',
        url: 'https://avlokai.com/services',
        type: 'website',
    },
}

const serviceCategories = [
    {
        icon: MonitorCog,
        title: 'IT Services & Software Development',
        slug: 'it-services',
        description: 'Streamline your development lifecycle with AI-powered lead qualification, automated invoicing, bug triage, performance dashboards, and resource allocation.',
        highlights: [
            'Lead Qualification & Sales Pipeline Automation',
            'Automated Invoice & Billing Reconciliation',
            'Bug Report Triage & Assignment',
            'Performance Metrics & Dashboard Generation',
            'Support Ticket Auto-Response & Escalation',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
    {
        icon: ShoppingCart,
        title: 'E-Commerce & Retail',
        slug: 'ecommerce',
        description: 'Automate omnichannel inventory sync, AI-powered review analysis, order fulfillment, and pricing intelligence to scale your online retail operations.',
        highlights: [
            'Omnichannel Inventory & Pricing Sync',
            'Review Aggregation & AI Sentiment Analysis',
            'Automated Order Fulfillment & Logistics',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
    {
        icon: Factory,
        title: 'Manufacturing & Logistics',
        slug: 'manufacturing',
        description: 'Reduce downtime and optimize supply chains with predictive maintenance, quality control via computer vision, and intelligent purchase order management.',
        highlights: [
            'Supply Chain Visibility & Tracking',
            'Predictive Maintenance Alert System',
            'Quality Control & Defect Detection',
            'Inventory Optimization & Reorder Alerts',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
    {
        icon: Hospital,
        title: 'Healthcare & Pharma',
        slug: 'healthcare',
        description: 'Automate patient scheduling, claims processing, and HIPAA compliance auditing — so your medical staff can focus on patient care.',
        highlights: [
            'Patient Appointment Scheduling & Reminders',
            'Medical Billing & Claims Processing',
            'Patient Data Compliance (HIPAA Audit)',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
    {
        icon: Building2,
        title: 'Real Estate & Construction',
        slug: 'real-estate',
        description: 'From AI-powered lead management to property listing sync and site inspection tracking, automate the full real estate lifecycle.',
        highlights: [
            'Lead Management & Property Inquiry Automation',
            'Project Milestone & Payment Reminders',
            'Property Listing Sync Across Portals',
            'Site Inspection & Progress Tracking',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
    {
        icon: Smartphone,
        title: 'SMB Micro-Automations',
        slug: 'smb',
        description: 'Affordable, ready-to-deploy automations for small businesses: WhatsApp broadcasts, Google review requests, appointment reminders, daily sales summaries, and more.',
        highlights: [
            'WhatsApp Broadcast Auto-Send',
            'Google Review Request Automation',
            'Appointment Reminders via SMS/WhatsApp',
            'Daily Sales Summary Reports',
            'Low Stock Alerts & Expense Categorization',
        ],
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
    },
]

const deliverySteps: Array<{ step: string; title: string; desc: string; icon: LucideIcon }> = [
    { step: '01', title: 'Audit', desc: 'We map your current workflows and identify automation opportunities.', icon: Search },
    { step: '02', title: 'Architect', desc: 'Custom system blueprint with data flows, edge cases, and fail-safes.', icon: Map },
    { step: '03', title: 'Build', desc: 'Incremental delivery with testing, monitoring, and human-in-the-loop.', icon: Wrench },
    { step: '04', title: 'Optimize', desc: 'Continuous performance tracking and iteration based on real data.', icon: TrendingUp },
]

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">Services</span>
                </nav>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        AI Automation <span className="gradient-text">Services</span>
                    </h1>
                    <p className="text-lg text-muted max-w-3xl mx-auto mb-8">
                        Production-grade automation systems across 6 industry verticals. Every solution is custom-built, monitored, and optimized for measurable ROI.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/industries"
                            className="inline-flex items-center gap-2 px-6 py-3 glass-card hover:bg-card-hover text-foreground text-sm font-medium rounded-lg transition-all"
                        >
                            Browse by Industry
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a
                            href="https://catalogue.avlokai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dim text-background text-sm font-medium rounded-lg transition-all"
                        >
                            View Full Catalogue
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {serviceCategories.map((service) => {
                        const Icon = service.icon

                        return (
                            <article
                                key={service.slug}
                                id={`service-${service.slug}`}
                                className={`glass-card rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 border-l-4 ${service.borderColor} group`}
                            >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4`}>
                                <Icon className={`h-6 w-6 ${service.textColor}`} aria-hidden="true" />
                            </div>

                            <h2 className="text-lg font-semibold mb-3">{service.title}</h2>

                            <p className="text-sm text-muted leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <ul className="space-y-2 mb-6">
                                {service.highlights.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${service.textColor}`} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://catalogue.avlokai.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm font-medium ${service.textColor} group-hover:underline inline-flex items-center gap-1`}
                            >
                                View in Catalogue
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </a>
                        </article>
                        )
                    })}
                </div>

                {/* How We Work Section */}
                <section className="glass-card rounded-2xl p-8 md:p-12 mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
                        How every project is <span className="gradient-text">delivered</span>
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {deliverySteps.map((item) => {
                            const Icon = item.icon

                            return (
                                <div key={item.step} className="text-center">
                                <Icon className="mx-auto mb-3 h-7 w-7 text-accent" aria-hidden="true" />
                                <span className="text-xs font-mono text-accent">{item.step}</span>
                                <h3 className="font-medium mt-1 mb-2">{item.title}</h3>
                                <p className="text-sm text-muted">{item.desc}</p>
                            </div>
                            )
                        })}
                    </div>
                </section>

                {/* Bottom CTA */}
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Ready to automate?
                    </h2>
                    <p className="text-muted mb-8 max-w-xl mx-auto">
                        Describe your workflow challenge. We&apos;ll architect a production-ready solution.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:avlokaibusiness@gmail.com"
                            className="px-8 py-4 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-all"
                        >
                            Contact Our Team
                        </a>
                        <Link
                            href="/industries"
                            className="inline-flex items-center gap-2 px-8 py-4 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-all"
                        >
                            Explore Industries
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
