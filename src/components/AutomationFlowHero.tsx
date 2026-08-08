'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AutomationFlow from './AutomationFlow'
import { fadeUp, staggerContainer } from '@/lib/motion'

/**
 * Sized to fit one viewport minus the fixed 4rem header, on phones as well as
 * desktop — hence the clamped type scale and the compact diagram card rather
 * than a full-height section that pushes everything below the fold.
 */
export default function AutomationFlowHero() {
    return (
        <section className="min-h-[calc(100svh-4rem)] mt-16 flex items-center px-5 sm:px-6 py-8">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" animate="show">
                    <motion.p variants={fadeUp} className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-3 sm:mb-4">
                        AI automation agency · Hyderabad
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="font-display font-bold leading-[1.05] tracking-tight mb-4 text-[clamp(2.25rem,7vw,4.5rem)]">
                        Automations that<br /><span className="gradient-text">hold up under audit.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted max-w-md mb-6">
                        RAG chatbots, CRM and n8n workflows, and official WhatsApp automation — built in your own cloud
                        accounts by a team that came from penetration testing and digital forensics.
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                        <Link href="/contact"
                            className="px-5 sm:px-7 py-3 sm:py-3.5 bg-accent hover:bg-accent-dim text-background text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link href="/services"
                            className="px-5 sm:px-7 py-3 sm:py-3.5 glass-card hover:bg-card-hover text-foreground text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center">
                            See what we build
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-2xl glass-card p-4 sm:p-6 lg:p-10">
                    <AutomationFlow />
                </motion.div>
            </div>
        </section>
    )
}
