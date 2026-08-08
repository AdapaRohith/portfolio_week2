import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { services } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

export const metadata = pageMetadata({
    title: 'AI Automation Services | AvlokAI — Hyderabad',
    description:
        'RAG chatbots, CRM and n8n workflow automation, official WhatsApp Business automation, lead qualification, document processing, and security reviews of existing automations.',
    path: '/services',
})

export default function ServicesPage() {
    return (
        <main className="bg-background pt-24 pb-14 px-5 sm:px-6">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                    ]),
                    ...services.map(serviceSchema),
                ]}
            />
            <div className="max-w-6xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Services</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Six things we <span className="gradient-text">actually build</span>.
                </h1>
                <p className="text-sm sm:text-base text-muted max-w-2xl mb-8">
                    Every engagement is scoped in writing, priced fixed, built in your own cloud accounts, and handed
                    over documented. Each page below says what gets delivered and how long it takes.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {services.map((s) => {
                        const Icon = s.icon
                        return (
                            <Link key={s.slug} href={`/services/${s.slug}`}
                                className="group glass-card rounded-xl p-4 md:p-5 transition-all hover:-translate-y-1 hover:border-accent/40 flex flex-col">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent flex-shrink-0">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <h2 className="font-display text-base font-semibold leading-tight">{s.title}</h2>
                                    <ArrowUpRight className="h-4 w-4 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                                </div>
                                <p className="text-sm text-muted mb-3 flex-1">{s.description}</p>
                                <ul className="flex flex-wrap gap-1.5 mb-3">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="font-mono text-[10px] text-muted border border-border rounded-full px-2 py-0.5">
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-mono text-[10px] uppercase tracking-wide text-muted border-t border-border pt-3">
                                    {s.timeline}
                                </p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
