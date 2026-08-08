import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { services, serviceBySlug } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

/**
 * One indexable page per capability. Before this, the entire indexable surface
 * was three pages, none of which could rank for the terms in the site's own
 * keyword list.
 */
export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const service = serviceBySlug(params.slug)
    if (!service) return {}
    return pageMetadata({
        title: service.metaTitle,
        description: service.metaDescription,
        path: `/services/${service.slug}`,
    })
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = serviceBySlug(params.slug)
    if (!service) notFound()

    const Icon = service.icon
    const others = services.filter((s) => s.slug !== service.slug).slice(0, 3)

    return (
        <main className="bg-background pt-24 pb-14 px-5 sm:px-6">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: service.title, path: `/services/${service.slug}` },
                    ]),
                    serviceSchema(service),
                ]}
            />
            <div className="max-w-4xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-foreground">{service.title}</span>
                </nav>

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">{service.title}</h1>
                <p className="text-sm sm:text-base text-muted mb-8">{service.intro}</p>

                <section className="mb-8">
                    <h2 className="font-display text-xl font-semibold mb-4">What you get</h2>
                    <dl className="grid sm:grid-cols-2 gap-3">
                        {service.deliverables.map((d) => (
                            <div key={d.name} className="glass-card rounded-xl p-4">
                                <dt className="font-display text-sm font-semibold mb-1">{d.name}</dt>
                                <dd className="text-sm text-muted">{d.detail}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="grid sm:grid-cols-2 gap-3 mb-8">
                    <div className="glass-card rounded-xl p-4">
                        <h2 className="font-mono text-[10px] uppercase tracking-wide text-muted mb-2">Built with</h2>
                        <ul className="flex flex-wrap gap-1.5">
                            {service.stack.map((tool) => (
                                <li key={tool} className="font-mono text-[10px] text-foreground border border-border rounded-full px-2 py-0.5">
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                        <h2 className="font-mono text-[10px] uppercase tracking-wide text-muted mb-2">Delivery window</h2>
                        <p className="text-sm text-foreground">{service.timeline}</p>
                    </div>
                </section>

                {service.note && (
                    <p className="flex gap-2 text-sm text-muted border border-border rounded-xl p-4 mb-8">
                        <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{service.note}</span>
                    </p>
                )}

                <section className="glass-card rounded-xl p-6 mb-8 text-center">
                    <h2 className="font-display text-xl font-semibold mb-2">Want this scoped?</h2>
                    <p className="text-sm text-muted mb-5 max-w-lg mx-auto">
                        Describe what happens today and which systems it touches. You get a written scope with a fixed
                        price and a delivery date before any build starts.
                    </p>
                    <Link href="/contact"
                        className="px-5 sm:px-7 py-3 bg-accent hover:bg-accent-dim text-background text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </section>

                <section>
                    <h2 className="font-display text-base font-semibold mb-3">Also from AvlokAI</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {others.map((s) => (
                            <li key={s.slug}>
                                <Link href={`/services/${s.slug}`}
                                    className="glass-card rounded-xl p-4 block h-full transition-all hover:-translate-y-1 hover:border-accent/40">
                                    <span className="font-display text-sm font-semibold">{s.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    )
}
