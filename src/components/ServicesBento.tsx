'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/services'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

export default function ServicesBento() {
    return (
        <section id="services" className="py-12 md:py-20 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">What we build</p>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6 md:mb-8">
                    <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
                        Six things we ship.
                    </h2>
                    <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dim font-medium transition-colors">
                        All services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {services.map((s) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.slug} variants={fadeUp}>
                                <Link href={`/services/${s.slug}`}
                                    className="group glass-card rounded-xl p-4 md:p-5 h-full flex flex-col transition-all hover:-translate-y-1 hover:border-accent/40">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent flex-shrink-0">
                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                        <h3 className="font-display text-base font-semibold leading-tight">{s.title}</h3>
                                        <ArrowUpRight className="h-4 w-4 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                                    </div>
                                    <p className="text-sm text-muted">{s.description}</p>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
