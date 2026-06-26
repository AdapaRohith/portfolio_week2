'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const faqs = [
    {
        q: 'What is AvlokAI?',
        a: 'AvlokAI is an AI automation agency that designs and ships production-grade AI systems for enterprises and growing businesses. We eliminate manual workflows by building custom automation pipelines — not off-the-shelf chatbots — engineered specifically for your operations.',
    },
    {
        q: 'Which industries does AvlokAI serve?',
        a: 'We deliver automation across six sectors: IT & software, e-commerce & retail, manufacturing & logistics, healthcare & pharma, real estate & construction, and SMB micro-automations. Each engagement is tailored to the operational realities and compliance requirements of that sector.',
    },
    {
        q: 'How is AvlokAI different from off-the-shelf AI chatbots?',
        a: 'Off-the-shelf chatbots handle conversation. AvlokAI builds end-to-end automation systems — multi-step workflows that connect your CRM, ERP, databases, and third-party APIs. The result is a system that executes operations autonomously, not one that just answers questions.',
    },
    {
        q: 'How long does it take to ship an automation?',
        a: 'Most engagements move from discovery audit to first production deployment in 2–4 weeks. We use incremental delivery — shipping working modules while the next is in development — so you see measurable results quickly rather than waiting for a big-bang launch.',
    },
    {
        q: 'What does a typical engagement cost?',
        a: 'Pricing depends on scope, complexity, and integrations required. We offer a free workflow audit to identify the highest-ROI automation opportunities and provide a clear estimate before any commitment. Contact us to get started.',
    },
    {
        q: 'Is the AI system maintained after delivery?',
        a: 'Yes. Every system ships with post-deployment monitoring and iteration based on real production data. We treat automation as a continuously improving system, not a one-time project — and offer optional ongoing support and optimization plans.',
    },
]

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

export default function FaqSection() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section className="py-24 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="max-w-3xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">FAQ</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Common questions.
                </h2>
                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div key={f.q} className="glass-card rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={open === i}
                                aria-controls={`faq-answer-${i}`}
                            >
                                <span className="font-display font-semibold pr-4">{f.q}</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-muted flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        id={`faq-answer-${i}`}
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <p className="px-6 pb-6 text-muted text-sm leading-relaxed">{f.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
