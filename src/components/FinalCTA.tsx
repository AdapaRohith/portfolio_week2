'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { inView } from '@/lib/motion'

const GMAIL = 'https://mail.google.com/mail/u/0/?fs=1&to=avlokaibusiness@gmail.com&su=Automation%20Project%20Inquiry&tf=cm'

export default function FinalCTA() {
    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-soft pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-3xl mx-auto text-center relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    Describe your workflow.<br /><span className="gradient-text">We&apos;ll architect the solution.</span>
                </h2>
                <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
                    No lengthy discovery. Share your operational challenge and get a tailored automation blueprint.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={GMAIL} target="_blank" rel="noopener noreferrer"
                        className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4" aria-hidden="true" /> Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a href="tel:+919346672015"
                        className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" aria-hidden="true" /> Call us
                    </a>
                    <a href="https://wa.me/message/PMRZLGVTFGGEB1" target="_blank" rel="noopener noreferrer"
                        className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-border">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
