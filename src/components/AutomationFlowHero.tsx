'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AutomationFlow from './AutomationFlow'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Props { onPrimaryCTA?: () => void; onSecondaryCTA?: () => void }

export default function AutomationFlowHero({ onPrimaryCTA, onSecondaryCTA }: Props) {
    return (
        <section className="relative min-h-[100svh] flex items-center px-6 pt-24 lg:pt-0">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" animate="show">
                    <motion.p variants={fadeUp} className="font-mono text-xs tracking-widest uppercase text-accent mb-5">
                        AI Automation Agency
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                        Your workflow,<br /><span className="gradient-text">on autopilot.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lg text-muted max-w-md mb-8">
                        We design and ship production-grade AI systems that eliminate manual work — built for scale, reliability, and measurable ROI.
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                        <button onClick={onPrimaryCTA}
                            className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button onClick={onSecondaryCTA}
                            className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors">
                            See it work
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-2xl glass-card p-6 lg:p-10">
                    <AutomationFlow />
                </motion.div>
            </div>
        </section>
    )
}
