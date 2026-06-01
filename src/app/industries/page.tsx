import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { industries } from '@/lib/industries'

export const metadata: Metadata = {
    title: 'Industries We Serve | AvlokAI',
    description: 'AI automation tailored to IT, e-commerce, manufacturing, healthcare, real estate, and small business.',
}

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <nav className="font-mono text-xs text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Industries</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Built for <span className="gradient-text">your sector</span>.
                </h1>
                <p className="text-lg text-muted max-w-2xl mb-14">
                    We tailor automation systems to the realities of each industry we serve.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <div key={ind.label} className="glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-xl font-semibold">{ind.label}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
