import Link from 'next/link'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { industries } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = pageMetadata({
    title: 'Industries We Work With | AvlokAI — Hyderabad',
    description:
        'How AvlokAI applies workflow automation, RAG assistants, and WhatsApp automation in IT services, e-commerce, real estate, manufacturing operations, healthcare admin, and small business.',
    path: '/industries',
})

export default function IndustriesPage() {
    return (
        <main className="bg-background pt-24 pb-14 px-5 sm:px-6">
            <JsonLd
                data={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Industries', path: '/industries' },
                ])}
            />
            <div className="max-w-5xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Industries</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Same toolkit, <span className="gradient-text">different operations</span>.
                </h1>
                <p className="text-sm sm:text-base text-muted max-w-2xl mb-8">
                    We are not six specialist practices. We build workflow automation, retrieval assistants, and
                    WhatsApp flows, and these are the places that work pays off fastest. Where a problem needs a domain
                    team we do not have, we say so.
                </p>

                {/* Detail lives in a native <details> — present in the HTML for
                    crawlers, collapsed so the page is not six screens tall. */}
                <div className="grid md:grid-cols-2 gap-3">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <article key={ind.slug} className="glass-card rounded-xl p-4 md:p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent flex-shrink-0">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <h2 className="font-display text-base font-semibold">{ind.label}</h2>
                                </div>
                                <p className="text-sm text-muted mb-3">{ind.summary}</p>
                                <details className="group">
                                    <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-wide text-accent [&::-webkit-details-marker]:hidden">
                                        What we automate <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
                                    </summary>
                                    <ul className="mt-3 space-y-1.5">
                                        {ind.examples.map((ex) => (
                                            <li key={ex} className="text-sm text-foreground flex items-start gap-2">
                                                <span className="text-accent mt-0.5" aria-hidden="true">—</span>{ex}
                                            </li>
                                        ))}
                                    </ul>
                                    {ind.note && (
                                        <p className="flex gap-2 text-xs text-muted border-t border-border mt-3 pt-3">
                                            <AlertTriangle className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span>{ind.note}</span>
                                        </p>
                                    )}
                                </details>
                            </article>
                        )
                    })}
                </div>

                <div className="glass-card rounded-xl p-6 mt-8 text-center">
                    <h2 className="font-display text-xl font-semibold mb-2">Not sure which applies?</h2>
                    <p className="text-sm text-muted mb-5 max-w-lg mx-auto">
                        Describe the workflow rather than the sector. We will tell you whether it is a good fit — including
                        when it is not.
                    </p>
                    <Link href="/contact"
                        className="px-5 sm:px-7 py-3 bg-accent hover:bg-accent-dim text-background text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        Talk to us <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </main>
    )
}
