'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BadgeCheck, ArrowLeft, Mail, Scale, FileText, AlertTriangle, Clock } from 'lucide-react'

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-accent-dim/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Return to Home</span>
                    </Link>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-accent">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display">
                            Terms of Service <span className="text-muted">—</span> <span className="gradient-text">AvlokAI</span>
                        </h1>
                    </div>

                    <p className="text-muted text-lg mb-12 border-l-2 border-accent/30 pl-6 italic">
                        By using AvlokAI services you agree to the following terms and conditions.
                    </p>

                    <div className="grid gap-8">
                        {/* Terms Section */}
                        <section className="glass-card p-8 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <BadgeCheck className="w-5 h-5 text-accent" />
                                <h2 className="text-2xl font-semibold">User Agreement</h2>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    {
                                        icon: FileText,
                                        title: 'Service Automation',
                                        text: 'The service automates messaging and workflow tasks.'
                                    },
                                    {
                                        icon: AlertTriangle,
                                        title: 'Platform Compliance',
                                        text: 'Users are responsible for complying with WhatsApp and email platform policies.'
                                    },
                                    {
                                        icon: Clock,
                                        title: 'Service Availability',
                                        text: 'The service is provided without guarantees of uninterrupted availability.'
                                    },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                            <p className="text-muted leading-relaxed">{item.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Contact */}
                        <section className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-accent" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
                            <p className="text-muted mb-4">Questions regarding these terms? Reach out to our business team.</p>
                            <a
                                href="mailto:avlokaibusiness@gmail.com"
                                className="text-xl font-bold text-accent hover:brightness-110 transition-all underline underline-offset-8 decoration-accent/30 hover:decoration-accent"
                            >
                                avlokaibusiness@gmail.com
                            </a>
                        </section>
                    </div>

                    <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center">
                        <p className="text-sm text-muted">
                            © {new Date().getFullYear()} AvlokAI. All rights reserved.
                        </p>
                        <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center opacity-50">
                            <Scale className="w-4 h-4" />
                        </div>
                    </footer>
                </motion.div>
            </div>
        </main>
    )
}
