'use client'

import { motion } from 'framer-motion'
import { Search, Map, Wrench, TrendingUp, type LucideIcon } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Step { n: string; title: string; desc: string; icon: LucideIcon }

const steps: Step[] = [
    { n: '01', title: 'Audit', desc: 'We map your workflows and find the highest-ROI automation opportunities.', icon: Search },
    { n: '02', title: 'Architect', desc: 'A custom system blueprint with data flows, edge cases, and fail-safes.', icon: Map },
    { n: '03', title: 'Build', desc: 'Incremental delivery with testing, monitoring, and human-in-the-loop.', icon: Wrench },
    { n: '04', title: 'Optimize', desc: 'Continuous tracking and iteration based on real production data.', icon: TrendingUp },
]

export default function ProcessTimeline() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">How we work</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    From audit to autopilot.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((s) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.n} variants={fadeUp} className="relative glass-card rounded-2xl p-6">
                                <span className="font-mono text-xs text-accent">{s.n}</span>
                                <span className="absolute top-6 right-6 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <h3 className="font-display text-lg font-semibold mt-3 mb-2">{s.title}</h3>
                                <p className="text-sm text-muted">{s.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
