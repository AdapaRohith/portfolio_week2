'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Mail, Phone, Database, FileText, Trash2, ShieldCheck } from 'lucide-react'

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-dim/20 rounded-full blur-[100px]" />
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
                            <Shield className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display">
                            Privacy Policy <span className="text-muted">—</span> <span className="gradient-text">AvlokAI</span>
                        </h1>
                    </div>

                    <p className="text-muted text-lg mb-12 border-l-2 border-accent/30 pl-6 italic">
                        AvlokAI provides automation services for businesses. We value your privacy and are committed to protecting your data.
                    </p>

                    <div className="grid gap-8">
                        {/* Data We Collect */}
                        <section className="glass-card p-8 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="w-5 h-5 text-accent" />
                                <h2 className="text-2xl font-semibold">Data we collect</h2>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { icon: Phone, text: 'Phone numbers used for WhatsApp communication' },
                                    { icon: FileText, text: 'Message content required to operate automation workflows' },
                                    { icon: Mail, text: 'Email addresses provided by users' },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-muted">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-4 h-4 text-accent" />
                                        </div>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* How We Use Data */}
                        <section className="glass-card p-8 rounded-2xl border-l-4 border-l-accent">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="w-5 h-5 text-accent" />
                                <h2 className="text-2xl font-semibold">How we use data</h2>
                            </div>
                            <p className="text-muted leading-relaxed">
                                Data is used solely to provide automation services and respond to inquiries. We use this information to maintain
                                the integrity of our workflows and ensure your business processes run smoothly.
                            </p>
                        </section>

                        {/* Data Sharing */}
                        <section className="glass-card p-8 rounded-2xl">
                            <h2 className="text-2xl font-semibold mb-4">Data sharing</h2>
                            <p className="text-muted leading-relaxed">
                                We do not sell or share user data with third parties except when required to operate services such as WhatsApp Business APIs.
                                Your data remains within the systems necessary for the automation to function as intended.
                            </p>
                        </section>

                        {/* Data Deletion & Contact */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="glass-card p-8 rounded-2xl group hover:border-accent/40 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <Trash2 className="w-5 h-5 text-accent" />
                                    <h2 className="text-2xl font-semibold">Data deletion</h2>
                                </div>
                                <p className="text-muted mb-6">
                                    Users may request deletion of their data at any time.
                                </p>
                                <a
                                    href="mailto:avlokaibusiness@gmail.com"
                                    className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
                                >
                                    Contact Support <ArrowLeft className="w-4 h-4 rotate-180" />
                                </a>
                            </section>

                            <section className="glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                                <Mail className="w-8 h-8 text-accent mb-4" />
                                <a
                                    href="mailto:avlokaibusiness@gmail.com"
                                    className="text-xl font-bold hover:text-accent transition-colors"
                                >
                                    avlokaibusiness@gmail.com
                                </a>
                            </section>
                        </div>
                    </div>

                    <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center">
                        <p className="text-sm text-muted">
                            © {new Date().getFullYear()} AvlokAI. All rights reserved.
                        </p>
                        <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center opacity-50">
                            <Shield className="w-4 h-4" />
                        </div>
                    </footer>
                </motion.div>
            </div>
        </main>
    )
}
