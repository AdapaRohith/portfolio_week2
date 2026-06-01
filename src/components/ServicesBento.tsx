'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/services'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

const spanClass = (i: number) => (i === 0 ? 'md:col-span-2' : '')

export default function ServicesBento() {
    return (
        <section id="services" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">What we build</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Automation, by domain.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid md:grid-cols-3 gap-4">
                    {services.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.slug} variants={fadeUp}
                                className={`group glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40 ${spanClass(i)}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </div>
                                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                                <p className="text-sm text-muted mb-4">{s.description}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="font-mono text-[11px] text-muted border border-border rounded-full px-2.5 py-1">{h}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </motion.div>
                <div className="mt-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors">
                        View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
