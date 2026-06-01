'use client'

import { useRef } from 'react'
import Link from 'next/link'
import AutomationFlowHero from '@/components/AutomationFlowHero'
import StatsBand from '@/components/StatsBand'
import ServicesBento from '@/components/ServicesBento'
import WorkShowcase from '@/components/WorkShowcase'
import IndustriesBand from '@/components/IndustriesBand'
import ProcessTimeline from '@/components/ProcessTimeline'
import TeamSection from '@/components/TeamSection'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
    const workRef = useRef<HTMLDivElement>(null)

    const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    const scrollToWork = () => workRef.current?.scrollIntoView({ behavior: 'smooth' })

    return (
        <main className="relative">
            <AutomationFlowHero onPrimaryCTA={scrollToContact} onSecondaryCTA={scrollToWork} />
            <StatsBand />
            <ServicesBento />
            <div ref={workRef}><WorkShowcase /></div>
            <IndustriesBand />
            <ProcessTimeline />
            <TeamSection />
            <Testimonials />
            <FinalCTA />

            <footer className="py-12 px-6 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <div>
                            <h3 className="font-display text-sm font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">Home</Link></li>
                                <li><Link href="/services" className="text-sm text-muted hover:text-foreground transition-colors">Services</Link></li>
                                <li><Link href="/industries" className="text-sm text-muted hover:text-foreground transition-colors">Industries</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-display text-sm font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="https://catalogue.avlokai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">Catalogue</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-display text-sm font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="/privacy" className="text-sm text-muted hover:text-foreground transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-sm text-muted hover:text-foreground transition-colors">Terms of Service</Link></li>
                                <li><Link href="/data-delete" className="text-sm text-muted hover:text-foreground transition-colors">Data Deletion</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-display text-sm font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li><a href="mailto:avlokaibusiness@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors">avlokaibusiness@gmail.com</a></li>
                                <li><a href="tel:+919346672015" className="text-sm text-muted hover:text-foreground transition-colors">+91 93466 72015</a></li>
                                <li><a href="https://www.linkedin.com/company/avlokai/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">LinkedIn</a></li>
                                <li><a href="https://www.instagram.com/avlok.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted">© {new Date().getFullYear()} AvlokAI. All rights reserved.</p>
                        <p className="font-mono text-xs text-muted">Engineered with precision.</p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
