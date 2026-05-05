import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Industries We Serve — AvlokAI | AI Automation by Sector',
    description: 'AvlokAI builds custom AI automation systems for IT services, e-commerce, manufacturing, healthcare, real estate, and small businesses. See how we solve industry-specific challenges.',
    alternates: {
        canonical: 'https://avlokai.com/industries',
    },
    openGraph: {
        title: 'Industries We Serve — AvlokAI',
        description: 'Custom AI automation for 6 industry verticals. See real solutions for your sector.',
        url: 'https://avlokai.com/industries',
        type: 'website',
    },
}

const industries = [
    {
        id: 'it-services',
        icon: '💻',
        name: 'IT Services & Software Development',
        painPoints: 'Software companies drown in repetitive ops — manual lead qualification, timesheet auditing, ticket triage, and fragmented project dashboards. These drain engineering bandwidth and slow growth.',
        howWeDoIt: [
            { title: 'AI-Powered Lead Scoring', desc: 'Inbound leads are automatically enriched with firmographic data, scored by conversion probability, and routed to the right sales rep — no manual CRM entry.' },
            { title: 'Automated Bug Triage', desc: 'Support tickets and bug reports are classified by severity and category using NLP, then assigned to the appropriate team with contextual history attached.' },
            { title: 'Real-Time Performance Dashboards', desc: 'Data from GitHub, JIRA, and CI/CD pipelines is aggregated into executive dashboards that update automatically — eliminating weekly report compilation.' },
            { title: 'Contract & Compliance Alerts', desc: 'Contract expiration dates, NDA renewals, and SLA deadlines are monitored with automated escalation before anything lapses.' },
        ],
        examples: ['Lead Qualification & Sales Pipeline', 'Bug Report Triage & Assignment', 'Performance Metrics Dashboard', 'Support Ticket Auto-Response'],
        color: 'border-blue-500/40',
        accent: 'text-blue-400',
        bg: 'bg-blue-500/5',
    },
    {
        id: 'ecommerce',
        icon: '🛒',
        name: 'E-Commerce & Retail',
        painPoints: 'Online retailers juggle inventory across multiple channels, manage thousands of customer reviews, and coordinate fulfillment logistics — all while pricing changes hourly across competitors.',
        howWeDoIt: [
            { title: 'Omnichannel Sync Engine', desc: 'Inventory levels, pricing, and product listings stay in sync across Amazon, Flipkart, Shopify, and your own webstore in real-time — eliminating oversells and pricing mismatches.' },
            { title: 'AI Sentiment Analysis', desc: 'Customer reviews from Google, Amazon, and social platforms are aggregated and analyzed for sentiment trends, flagging issues before they become crises.' },
            { title: 'Smart Fulfillment Automation', desc: 'Orders trigger automatic label generation, warehouse assignment, and shipment tracking — with exception handling for address issues or stock shortages.' },
        ],
        examples: ['Omnichannel Inventory & Pricing Sync', 'Review Aggregation & Sentiment Analysis', 'Automated Order Fulfillment'],
        color: 'border-amber-500/40',
        accent: 'text-amber-400',
        bg: 'bg-amber-500/5',
    },
    {
        id: 'manufacturing',
        icon: '🏭',
        name: 'Manufacturing & Logistics',
        painPoints: 'Manufacturing operations lose millions to unplanned downtime, quality defects caught too late, and supply chain blind spots. Traditional monitoring can\'t keep up with the speed of modern production.',
        howWeDoIt: [
            { title: 'Predictive Maintenance', desc: 'Sensor data from equipment is continuously analyzed to predict failures before they happen — scheduling maintenance during planned downtime instead of emergency stops.' },
            { title: 'Computer Vision Quality Control', desc: 'Production line images are processed by AI models that flag defects in real-time, reducing manual inspection labor and catching issues humans miss.' },
            { title: 'Supply Chain Intelligence', desc: 'Supplier delivery data, port congestion signals, and logistics tracking are unified into a single visibility layer with delay predictions and automatic re-routing suggestions.' },
            { title: 'Smart Reorder System', desc: 'Inventory levels are monitored against demand forecasts to calculate optimal reorder points, automatically generating purchase orders when thresholds are hit.' },
        ],
        examples: ['Predictive Maintenance Alerts', 'Quality Control & Defect Detection', 'Supply Chain Visibility', 'Inventory Optimization'],
        color: 'border-slate-400/40',
        accent: 'text-slate-300',
        bg: 'bg-slate-500/5',
    },
    {
        id: 'healthcare',
        icon: '🏥',
        name: 'Healthcare & Pharma',
        painPoints: 'Healthcare providers spend excessive time on scheduling, insurance claims paperwork, and compliance documentation — time that should go to patient care. Manual processes lead to billing errors and audit risks.',
        howWeDoIt: [
            { title: 'Smart Scheduling', desc: 'Patient appointment requests are processed automatically, with calendar optimization, conflict detection, and WhatsApp/SMS reminders reducing no-shows by up to 40%.' },
            { title: 'Claims Processing Automation', desc: 'Insurance claims are validated against policy rules, coded with correct procedure codes, and submitted electronically — with automatic follow-up on denials.' },
            { title: 'HIPAA Compliance Monitoring', desc: 'Data access patterns are continuously audited, with automated alerts for unusual access, expiring certifications, and policy violations — keeping your practice audit-ready.' },
        ],
        examples: ['Patient Appointment Scheduling', 'Medical Billing & Claims', 'HIPAA Compliance Audit'],
        color: 'border-rose-500/40',
        accent: 'text-rose-400',
        bg: 'bg-rose-500/5',
    },
    {
        id: 'real-estate',
        icon: '🏗️',
        name: 'Real Estate & Construction',
        painPoints: 'Real estate operations suffer from lead leakage across inquiry channels, manual listing updates across portals, and construction progress tracking that relies on site visits and phone calls.',
        howWeDoIt: [
            { title: 'AI Lead Management', desc: 'Inquiries from portals (99acres, MagicBricks, Housing.com), WhatsApp, and calls are unified, scored, and automatically followed up — ensuring no lead falls through the cracks.' },
            { title: 'Multi-Portal Listing Sync', desc: 'Property listings are managed from a single source of truth and synced across all major portals automatically, with pricing and availability updates in real-time.' },
            { title: 'Construction Progress Intelligence', desc: 'Site photos and drone footage are analyzed by AI to track construction milestones, generate progress reports, and trigger payment milestone reminders automatically.' },
        ],
        examples: ['Lead Management & Property Inquiry', 'Property Listing Sync', 'Site Inspection Tracking', 'Milestone Payment Reminders'],
        color: 'border-emerald-500/40',
        accent: 'text-emerald-400',
        bg: 'bg-emerald-500/5',
    },
    {
        id: 'smb',
        icon: '📱',
        name: 'Small & Medium Businesses',
        painPoints: 'Small businesses need automation but can\'t afford enterprise-grade solutions. They struggle with missed follow-ups, manual bookkeeping, inconsistent social media presence, and low Google review counts.',
        howWeDoIt: [
            { title: 'Ready-to-Deploy Micro-Tasks', desc: 'Pre-built automation modules that deploy in 1-2 days — WhatsApp broadcasts, appointment reminders, Google review requests, and daily sales summaries.' },
            { title: 'Affordable Pricing', desc: 'Starting from just ₹3,000 per automation, with no monthly fees on most micro-tasks. Enterprise-quality results at SMB-friendly budgets.' },
            { title: 'No-Code Management', desc: 'Every automation comes with a simple dashboard so non-technical business owners can monitor, pause, and adjust without calling a developer.' },
        ],
        examples: ['WhatsApp Broadcast Auto-Send', 'Google Review Requests', 'Appointment Reminders', 'Daily Sales Summary', 'Low Stock Alerts'],
        color: 'border-violet-500/40',
        accent: 'text-violet-400',
        bg: 'bg-violet-500/5',
    },
]

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">Industries</span>
                </nav>

                {/* Hero */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Industries we <span className="gradient-text">transform</span>
                    </h1>
                    <p className="text-lg text-muted max-w-3xl mx-auto mb-8">
                        Every industry has unique workflows and pain points. We build automation systems tailored to your sector — not generic templates.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/services"
                            className="px-6 py-3 glass-card hover:bg-card-hover text-foreground text-sm font-medium rounded-lg transition-all"
                        >
                            View All Services →
                        </Link>
                        <a
                            href="https://catalogue.avlokai.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-accent hover:bg-accent-dim text-background text-sm font-medium rounded-lg transition-all"
                        >
                            Full Catalogue ↗
                        </a>
                    </div>
                </div>

                {/* Industry Sections */}
                <div className="space-y-16">
                    {industries.map((industry) => (
                        <section
                            key={industry.id}
                            id={industry.id}
                            className={`glass-card rounded-2xl p-8 md:p-10 border-l-4 ${industry.color}`}
                        >
                            {/* Industry Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <span className="text-4xl">{industry.icon}</span>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-semibold">{industry.name}</h2>
                                    <p className="text-muted mt-2 leading-relaxed max-w-3xl">
                                        {industry.painPoints}
                                    </p>
                                </div>
                            </div>

                            {/* How We Do It */}
                            <div className="mb-8">
                                <h3 className={`text-sm font-mono ${industry.accent} uppercase tracking-widest mb-4`}>
                                    How we do it
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {industry.howWeDoIt.map((item) => (
                                        <div key={item.title} className={`${industry.bg} rounded-xl p-5`}>
                                            <h4 className="font-medium mb-2">{item.title}</h4>
                                            <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example Automations */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs font-mono text-muted uppercase tracking-wider">Example automations:</span>
                                {industry.examples.map((example) => (
                                    <span
                                        key={example}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${industry.bg} ${industry.accent} border border-current/10`}
                                    >
                                        {example}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                                <Link
                                    href="/services"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                >
                                    ← View all services
                                </Link>
                                <a
                                    href="https://catalogue.avlokai.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm font-medium ${industry.accent} hover:underline inline-flex items-center gap-1`}
                                >
                                    View in catalogue
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Don&apos;t see your industry?
                    </h2>
                    <p className="text-muted mb-8 max-w-xl mx-auto">
                        We build custom automation for any business process. Tell us about your workflow and we&apos;ll architect a solution.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:avlokaibusiness@gmail.com"
                            className="px-8 py-4 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-all"
                        >
                            Contact Our Team
                        </a>
                        <Link
                            href="/services"
                            className="px-8 py-4 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-all"
                        >
                            Browse Services →
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
