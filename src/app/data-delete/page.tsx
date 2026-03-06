'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, ArrowLeft, Mail, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function DataDeletion() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 right-[-10%] w-[30%] h-[40%] bg-accent-dim/10 rounded-full blur-[120px]" />
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
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display">
                            Data Deletion <span className="text-muted">—</span> <span className="gradient-text">Instructions</span>
                        </h1>
                    </div>

                    <p className="text-muted text-lg mb-12 border-l-2 border-accent/30 pl-6 italic">
                        AvlokAI is committed to transparent data management. Follow the instructions below to request complete removal of your data.
                    </p>

                    <div className="grid gap-8">
                        {/* Process Section */}
                        <section className="glass-card p-8 rounded-2xl">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <ShieldAlert className="w-6 h-6 text-accent" />
                                Deletion Request Process
                            </h2>
                            <p className="text-muted text-lg leading-relaxed mb-8">
                                Users can request deletion of their personal data by emailing
                                <a href="mailto:avlokaibusiness@gmail.com" className="text-foreground font-semibold hover:text-accent transition-colors ml-1 underline decoration-accent/30 underline-offset-4">
                                    avlokaibusiness@gmail.com
                                </a>.
                            </p>

                            <div className="bg-accent/5 border border-accent/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-accent" />
                                </div>
                                <p className="text-muted">
                                    <span className="text-foreground font-semibold block mb-1">Permanent Removal Policy</span>
                                    All stored messaging and contact information will be permanently removed within 7 days of your request verification.
                                </p>
                            </div>
                        </section>

                        {/* Confirmation Details */}
                        <section className="glass-card p-8 rounded-2xl border-l-4 border-accent">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                What gets removed?
                            </h2>
                            <ul className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Associated Phone Numbers',
                                    'Message Histories',
                                    'Email Communication logs',
                                    'Personal Identifiers in Workflows',
                                    'API Access Tokens',
                                    'Custom Automation Contexts'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted">
                                        <div className="w-2 h-2 rounded-full bg-accent/40" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Direct Contact CTA */}
                        <div className="glass-card p-10 rounded-2xl text-center group hover:border-accent/30 transition-all">
                            <Mail className="w-12 h-12 text-accent mx-auto mb-6 opacity-80 group-hover:scale-110 transition-transform" />
                            <h2 className="text-2xl font-semibold mb-2">Need Help?</h2>
                            <p className="text-muted mb-8 max-w-md mx-auto">
                                If you have any questions regarding your data privacy or the deletion process, please reach out to our team.
                            </p>
                            <a
                                href="mailto:avlokaibusiness@gmail.com"
                                className="inline-block py-4 px-10 rounded-full bg-accent text-background font-bold text-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>

                    <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center">
                        <p className="text-sm text-muted">
                            © {new Date().getFullYear()} AvlokAI. All rights reserved.
                        </p>
                        <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center opacity-50">
                            <Trash2 className="w-4 h-4 text-accent" />
                        </div>
                    </footer>
                </motion.div>
            </div>
        </main>
    )
}
