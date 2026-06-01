import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/lib/services'

export const metadata: Metadata = {
    title: 'AI Automation Services | AvlokAI',
    description: 'Production-grade AI automation services across IT, e-commerce, manufacturing, healthcare, real estate, and SMB.',
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <nav className="font-mono text-xs text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Services</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Automation that <span className="gradient-text">ships</span>.
                </h1>
                <p className="text-lg text-muted max-w-2xl mb-14">
                    Production-grade AI systems tailored to your sector — engineered for scale, reliability, and measurable ROI.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((s) => {
                        const Icon = s.icon
                        return (
                            <div key={s.slug} className="glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-xl font-semibold mb-2">{s.title}</h2>
                                <p className="text-sm text-muted mb-4">{s.description}</p>
                                <ul className="space-y-2">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="text-sm text-foreground flex items-start gap-2">
                                            <span className="text-accent mt-1">—</span>{h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
