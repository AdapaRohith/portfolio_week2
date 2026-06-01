'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '@/lib/industries'
import { inView } from '@/lib/motion'

export default function IndustriesBand() {
    return (
        <section id="industries" className="py-20 px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-5xl mx-auto text-center">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Industries</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-8">
                    Built for your sector.
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <span key={ind.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                                {ind.label}
                            </span>
                        )
                    })}
                </div>
                <Link href="/industries" className="inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors">
                    Explore industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </motion.div>
        </section>
    )
}
