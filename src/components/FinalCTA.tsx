'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { inView } from '@/lib/motion'
import { company } from '@/lib/company'

export default function FinalCTA() {
    return (
        <section id="contact" className="py-14 md:py-24 px-5 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-soft pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-3xl mx-auto text-center relative z-10">
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                    Describe your workflow.<br /><span className="gradient-text">We&apos;ll scope it in writing.</span>
                </h2>
                <p className="text-sm sm:text-base text-muted mb-7 max-w-xl mx-auto">
                    Tell us what happens today and which systems it touches. You get a written scope with a fixed price
                    and a delivery window — no discovery retainer to get there.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {/* Was a Gmail compose link, which sent every non-Gmail user to a Google login wall. */}
                    <Link href="/contact"
                        className="px-5 sm:px-7 py-3 sm:py-3.5 bg-accent hover:bg-accent-dim text-background text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4" aria-hidden="true" /> Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a href={`tel:${company.phone}`}
                        className="px-5 sm:px-7 py-3 sm:py-3.5 glass-card hover:bg-card-hover text-foreground text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" aria-hidden="true" /> Call
                    </a>
                    <a href={company.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="px-5 sm:px-7 py-3 sm:py-3.5 glass-card hover:bg-card-hover text-foreground text-sm sm:text-base font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-border">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
