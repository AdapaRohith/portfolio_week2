'use client'

import { motion } from 'framer-motion'
import { scenarios, SCENARIOS_DISCLAIMER } from '@/lib/case-studies'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

export default function WorkShowcase() {
    return (
        <section id="work" className="py-12 md:py-20 px-5 sm:px-6 bg-card/40">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">
                    Representative scenarios
                </p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3">
                    The shape of the work.
                </h2>
                <p className="text-sm text-muted max-w-2xl mb-6 md:mb-8">{SCENARIOS_DISCLAIMER}</p>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 gap-3">
                    {scenarios.map((s) => (
                        <motion.article key={s.title} variants={fadeUp}
                            className="glass-card rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-accent/40">
                            <span className="font-mono text-[10px] tracking-wide uppercase text-accent">{s.sector}</span>
                            <h3 className="font-display text-lg font-semibold mt-1 mb-2">{s.title}</h3>
                            <p className="text-sm text-muted mb-3">{s.problem}</p>
                            <p className="text-sm text-foreground border-t border-border pt-3">
                                <span className="font-mono text-[10px] uppercase tracking-wide text-muted mr-2">We build</span>
                                {s.approach}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
