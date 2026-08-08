'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '@/lib/industries'
import { inView } from '@/lib/motion'

export default function IndustriesBand() {
    return (
        <section id="industries" className="py-10 md:py-16 px-5 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-5xl mx-auto text-center">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Industries</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    Built for your sector.
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <Link key={ind.slug} href="/industries"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs sm:text-sm hover:border-accent/40 transition-colors">
                                <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                                {ind.label}
                            </Link>
                        )
                    })}
                </div>
                <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dim font-medium transition-colors">
                    Explore industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </motion.div>
        </section>
    )
}
