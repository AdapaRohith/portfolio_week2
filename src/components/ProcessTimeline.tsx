'use client'

import { motion } from 'framer-motion'
import { Search, Map, Wrench, TrendingUp, type LucideIcon } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Step { n: string; title: string; desc: string; duration: string; icon: LucideIcon }

// Durations are stated because "fast delivery" is not information — a named
// window is, and it is what buyers and AI answers both quote back.
const steps: Step[] = [
    { n: '01', title: 'Map', duration: 'Week 1', desc: 'The sequence you run today, the systems it touches, and where it breaks — written down.', icon: Search },
    { n: '02', title: 'Scope', duration: 'Week 1–2', desc: 'Data flows, failure handling, acceptance criteria, a fixed price, and a delivery date.', icon: Map },
    { n: '03', title: 'Build', duration: 'Week 2–6', desc: 'Incremental delivery in your own accounts, with a human-in-the-loop path for edge cases.', icon: Wrench },
    { n: '04', title: 'Hand over', duration: 'Final week', desc: 'Workflow definitions, credentials in your vault, a runbook, and a walkthrough.', icon: TrendingUp },
]

export default function ProcessTimeline() {
    return (
        <section className="py-12 md:py-20 px-5 sm:px-6 bg-card/40">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">How we work</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-6 md:mb-8">
                    Four steps, two to six weeks.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {steps.map((s) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.n} variants={fadeUp} className="glass-card rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent flex-shrink-0">
                                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                    <span className="font-mono text-[10px] text-muted">{s.n}</span>
                                </div>
                                <h3 className="font-display text-base font-semibold">{s.title}</h3>
                                <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-1.5">{s.duration}</p>
                                <p className="text-xs sm:text-sm text-muted">{s.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
