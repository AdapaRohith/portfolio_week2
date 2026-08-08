import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { services } from '@/lib/services'
import { company, addressLine } from '@/lib/company'
import type { FaqItem } from '@/lib/faq'

export const metadata = pageMetadata({
    title: 'AI Automation Agency in Hyderabad | AvlokAI',
    description:
        'AvlokAI is an AI automation agency based in Hyderabad, Telangana. RAG chatbots, n8n and CRM workflow automation, and official WhatsApp Business automation — fixed price, 2 to 6 weeks, deployed to your own cloud accounts.',
    path: '/ai-automation-agency-hyderabad',
})

const localFaqs: readonly FaqItem[] = [
    {
        question: 'Where in Hyderabad is AvlokAI based?',
        answer: `AvlokAI operates from ${addressLine}. We work on-site with clients across Hyderabad and Secunderabad — including HITEC City, Gachibowli, Madhapur, Kondapur, and the industrial belts around Medchal, Patancheru, and Jeedimetla — and remotely with clients elsewhere in India and abroad.`,
    },
    {
        question: 'What does an AI automation agency in Hyderabad actually charge?',
        answer:
            'We quote fixed-price against a written scope rather than publishing a rate card, because a WhatsApp reminder flow and a multi-source retrieval system are not comparable pieces of work. Billing is split across milestones — scoping and design, build, handover — and change requests are quoted before work starts on them. A scoping call is free and produces a written scope you can take to another vendor if you want to compare.',
    },
    {
        question: 'How quickly can a Hyderabad business get an automation live?',
        answer:
            'A single scoped workflow typically goes live in 2 to 3 weeks from a signed scope. Multi-system builds and retrieval assistants over your own documents typically take 4 to 8 weeks. WhatsApp projects also depend on Meta business verification, which runs on Meta’s timeline rather than ours.',
    },
    {
        question: 'Is my company data safe with a Hyderabad AI agency?',
        answer:
            'Ask for three things in writing: the sub-processor list, a data-processing agreement, and the retention period. We publish our sub-processors on our privacy page, sign a DPA covering India’s Digital Personal Data Protection Act 2023, and by default deploy into your own cloud accounts and API keys so the data never sits with us. Our founding team came from vulnerability assessment and penetration testing and digital forensics, so credential scoping and audit logging are part of the build.',
    },
    {
        question: 'Do you work with startups as well as enterprises?',
        answer:
            'Yes. The smallest engagements are a single workflow for an owner-run business; the largest are multi-system builds for companies with an internal IT team. What does not change is the process — written scope, fixed price, built in your accounts, documented at handover.',
    },
]

export default function HyderabadPage() {
    return (
        <main className="bg-background pt-24 pb-4 px-5 sm:px-6">
            <JsonLd
                data={[
                    breadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'AI Automation Agency in Hyderabad', path: '/ai-automation-agency-hyderabad' },
                    ]),
                    faqSchema(localFaqs),
                ]}
            />
            <div className="max-w-4xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>

                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Hyderabad, Telangana</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    AI automation agency in <span className="gradient-text">Hyderabad</span>.
                </h1>
                <p className="text-sm sm:text-base text-muted mb-8">
                    AvlokAI builds production automation for businesses in Hyderabad: retrieval chatbots grounded in your
                    own documents, CRM and back-office workflows orchestrated in n8n, and WhatsApp Business Platform
                    flows with opt-in handled properly. Fixed price against a written scope, typically live in two to six
                    weeks, deployed into your own cloud accounts and handed over documented.
                </p>

                <section className="mb-10">
                    <h2 className="font-display text-xl font-semibold mb-3">What we build for Hyderabad businesses</h2>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {services.map((s) => (
                            <li key={s.slug}>
                                <Link href={`/services/${s.slug}`}
                                    className="glass-card rounded-xl p-4 block h-full transition-all hover:-translate-y-1 hover:border-accent/40">
                                    <span className="font-display text-sm font-semibold block mb-1">{s.title}</span>
                                    <span className="text-sm text-muted">{s.description}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="font-display text-xl font-semibold mb-3">Why the security background matters here</h2>
                    <p className="text-sm sm:text-base text-muted mb-3">
                        Most automation work involves handing a workflow the keys to a CRM, a mailbox, and a customer
                        database, then pointing a language model at content the business does not control. That is an
                        access-control and injection problem before it is an AI problem.
                    </p>
                    <p className="text-sm sm:text-base text-muted">
                        AvlokAI was founded by an engineer from vulnerability assessment and penetration testing and
                        digital forensics. In practice that means credentials scoped to the single job a workflow does,
                        a written map of where data travels and which third parties receive it, adversarial testing of
                        anything that acts on untrusted input, and logging good enough to reconstruct what a workflow did
                        last Tuesday. We offer the same review against automations{' '}
                        <Link href="/services/secure-automation" className="text-accent hover:underline">someone else built</Link>.
                    </p>
                </section>

                <section className="glass-card rounded-xl p-6 text-center">
                    <h2 className="font-display text-xl font-semibold mb-2">Talk to us in Hyderabad</h2>
                    <p className="text-sm text-muted mb-1">{addressLine}</p>
                    <p className="text-sm text-muted mb-5">
                        <a href={`mailto:${company.email}`} className="text-accent hover:underline">{company.email}</a>
                        {' · '}
                        <a href={`tel:${company.phone}`} className="text-accent hover:underline">{company.phoneDisplay}</a>
                    </p>
                    <Link href="/contact"
                        className="px-5 sm:px-7 py-3 bg-accent hover:bg-accent-dim text-background text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </section>
            </div>

            <FAQ items={localFaqs} heading="Hyderabad questions, answered." />
        </main>
    )
}
