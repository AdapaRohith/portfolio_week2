'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import AutomationWizard from '@/components/AutomationWizard'
import DemoPlayground from '@/components/DemoPlayground'
import ProcessFlow from '@/components/ProcessFlow'
import Constraints from '@/components/Constraints'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'
import TeamSection from '@/components/TeamSection'
import FinalCTA from '@/components/FinalCTA'
import { ArrowRight, Building2, Factory, Hospital, MonitorCog, ShoppingCart, Smartphone, type LucideIcon } from 'lucide-react'

const industries: Array<{ label: string; icon: LucideIcon }> = [
    { label: 'IT Services', icon: MonitorCog },
    { label: 'E-Commerce', icon: ShoppingCart },
    { label: 'Manufacturing', icon: Factory },
    { label: 'Healthcare', icon: Hospital },
    { label: 'Real Estate', icon: Building2 },
    { label: 'SMB', icon: Smartphone },
]

export default function Home() {
    const wizardRef = useRef<HTMLDivElement>(null)
    const diagramRef = useRef<HTMLDivElement>(null)

    const scrollToWizard = () => {
        wizardRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToDiagram = () => {
        diagramRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className="relative">
            {/* Hero Section with Spline alongside */}
            <div className="relative min-h-[100svh] flex flex-col lg:flex-row items-center px-6 pt-24 lg:pt-0 max-w-7xl mx-auto overflow-hidden">
                <div className="w-full lg:w-1/2 z-10 order-2 lg:order-1 pb-16 lg:pb-0">
                    <Hero onPrimaryCTA={scrollToWizard} onSecondaryCTA={scrollToDiagram} />
                </div>

            </div>

            {/* Build Your Automation Wizard */}
            <div ref={wizardRef}>
                <AutomationWizard />
            </div>

            {/* Demo Playground */}
            <DemoPlayground />

            {/* Process & Thinking */}
            <ProcessFlow />

            {/* Constraints & Philosophy */}
            <Constraints />

            {/* Industries We Serve Banner */}
            <section className="py-16 px-6 bg-card/50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Industries we <span className="gradient-text">transform</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto mb-8">
                        From IT services and e-commerce to healthcare and manufacturing — we build automation systems tailored to your sector.
                    </p>
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
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/industries"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dim text-background text-sm font-medium rounded-lg transition-all"
                        >
                            Explore Industries
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-6 py-3 glass-card hover:bg-card-hover text-foreground text-sm font-medium rounded-lg transition-all"
                        >
                            View Services
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <TeamSection />

            {/* Testimonials */}
            <StaggerTestimonials />

            {/* Final CTA */}
            <FinalCTA />

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        {/* Company */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">Home</Link></li>
                                <li><Link href="/services" className="text-sm text-muted hover:text-foreground transition-colors">Services</Link></li>
                                <li><Link href="/industries" className="text-sm text-muted hover:text-foreground transition-colors">Industries</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="https://catalogue.avlokai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                                        Catalogue
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="/privacy" className="text-sm text-muted hover:text-foreground transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-sm text-muted hover:text-foreground transition-colors">Terms of Service</Link></li>
                                <li><Link href="/data-delete" className="text-sm text-muted hover:text-foreground transition-colors">Data Deletion</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="mailto:avlokaibusiness@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors">
                                        avlokaibusiness@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+919346672015" className="text-sm text-muted hover:text-foreground transition-colors">
                                        +91 93466 72015
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/avlokai/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/avlok.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted">
                            © {new Date().getFullYear()} AvlokAI. All rights reserved.
                        </p>
                        <p className="text-sm text-muted">
                            Engineered with precision. Delivered with purpose.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}

