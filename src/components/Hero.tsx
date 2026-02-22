'use client'

import { motion } from 'framer-motion'

interface HeroProps {
    onPrimaryCTA: () => void
    onSecondaryCTA: () => void
}

export default function Hero({ onPrimaryCTA, onSecondaryCTA }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-start px-6 pointer-events-none">
            <div className="max-w-2xl text-left z-10 pointer-events-auto">
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6"
                >
                    We engineer AI systems that{' '}
                    <span className="gradient-text">eliminate manual work.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted max-w-2xl mb-12"
                >
                    No proof-of-concepts. No off-the-shelf chatbots.{' '}
                    <span className="text-foreground">Production-grade automation built to scale your operations.</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-start"
                >
                    <button
                        onClick={onPrimaryCTA}
                        className="px-8 py-4 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-all duration-200 hover:scale-105"
                    >
                        Design Your Automation
                    </button>
                    <button
                        onClick={onSecondaryCTA}
                        className="px-8 py-4 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-all duration-200"
                    >
                        View Live Systems
                    </button>
                </motion.div>

            </div>
        </section>
    )
}
