'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Testimonial { quote: string; name: string; role: string }

// PLACEHOLDER testimonials — replace with real client quotes before launch.
const testimonials: Testimonial[] = [
    { quote: 'They mapped our chaos and shipped automations that actually stuck. Downtime dropped within a month.', name: 'Operations Lead', role: 'Manufacturing' },
    { quote: 'The inventory sync alone paid for the engagement. No more oversells across marketplaces.', name: 'Founder', role: 'E-Commerce' },
    { quote: 'Claims that took a week now clear in hours. Our staff finally focus on patients.', name: 'Practice Manager', role: 'Healthcare' },
]

export default function Testimonials() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Testimonials</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">Trusted by operators.</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid md:grid-cols-3 gap-4">
                    {testimonials.map((t) => (
                        <motion.figure
                            key={t.quote}
                            variants={fadeUp}
                            className="glass-card rounded-2xl p-7 flex flex-col"
                            itemScope
                            itemType="https://schema.org/Review"
                        >
                            <Quote className="h-6 w-6 text-accent mb-4" aria-hidden="true" />
                            <blockquote className="text-foreground mb-6 flex-1" itemProp="reviewBody">{t.quote}</blockquote>
                            <figcaption itemScope itemType="https://schema.org/Person" itemProp="author">
                                <div className="font-display font-semibold text-sm" itemProp="name">{t.name}</div>
                                <div className="font-mono text-xs text-muted" itemProp="jobTitle">{t.role}</div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
