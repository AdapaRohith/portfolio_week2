import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { company, addressLine } from '@/lib/company'

export const metadata = pageMetadata({
    title: 'Contact AvlokAI — AI Automation, Hyderabad',
    description:
        'Tell us what workflow you are trying to fix. We reply within one working day with next steps, and scope in writing before any build begins.',
    path: '/contact',
})

export default function ContactPage() {
    return (
        <main className="bg-background pt-24 pb-14 px-5 sm:px-6">
            <JsonLd
                data={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Contact', path: '/contact' },
                ])}
            />
            <div className="max-w-5xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>

                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Contact</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Tell us what&apos;s <span className="gradient-text">breaking</span>.
                </h1>
                <p className="text-sm sm:text-base text-muted max-w-2xl mb-8">
                    Describe the workflow, the systems it touches, and roughly how often it runs. We reply within one
                    working day, and anything we quote comes as a written scope with a fixed price and a delivery window.
                </p>

                <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
                    <ContactForm />

                    <aside className="glass-card rounded-xl p-5 md:p-6 space-y-5">
                        <div>
                            <h2 className="font-display text-lg font-semibold mb-4">Reach us directly</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                                    <a href={`mailto:${company.email}`} className="text-sm text-foreground hover:text-accent transition-colors">
                                        {company.email}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                                    <a href={`tel:${company.phone}`} className="text-sm text-foreground hover:text-accent transition-colors">
                                        {company.phoneDisplay}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MessageCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                                    <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-accent transition-colors">
                                        WhatsApp
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                                    <span className="text-sm text-muted">{addressLine}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="border-t border-border pt-6">
                            <h2 className="font-display text-lg font-semibold mb-2">What happens next</h2>
                            <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
                                <li>We reply within one working day.</li>
                                <li>A 30-minute call to map the current sequence.</li>
                                <li>A written scope: deliverables, acceptance criteria, fixed price, delivery date.</li>
                            </ol>
                        </div>

                        <p className="text-xs text-muted border-t border-border pt-6">
                            Enquiry details are used only to respond to you and are handled as described in our{' '}
                            <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
                        </p>
                    </aside>
                </div>
            </div>
        </main>
    )
}
