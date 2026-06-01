'use client'

import { motion } from 'framer-motion'
import { caseStudies } from '@/lib/case-studies'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

export default function WorkShowcase() {
    return (
        <section id="work" className="py-24 px-6 bg-card/40">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Selected work</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Outcomes, not demos.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 gap-4">
                    {caseStudies.map((c) => (
                        <motion.article key={c.title} variants={fadeUp}
                            className="group glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                            <span className="font-mono text-[11px] tracking-wide uppercase text-accent">{c.sector}</span>
                            <h3 className="font-display text-xl font-semibold mt-2 mb-2">{c.title}</h3>
                            <p className="text-sm text-muted mb-6">{c.problem}</p>
                            <div className="flex items-baseline gap-2 border-t border-border pt-5">
                                <span className="font-display text-4xl font-bold text-foreground">{c.metric}</span>
                                <span className="text-sm text-muted">{c.metricLabel}</span>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
