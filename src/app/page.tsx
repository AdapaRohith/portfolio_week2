'use client'

import { useRef } from 'react'
import SplineScene from '@/components/SplineScene'
import Hero from '@/components/Hero'
import FlowDiagram from '@/components/FlowDiagram'
import AutomationWizard from '@/components/AutomationWizard'
import DemoPlayground from '@/components/DemoPlayground'
import ProcessFlow from '@/components/ProcessFlow'
import Constraints from '@/components/Constraints'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'
import TeamSection from '@/components/TeamSection'
import FinalCTA from '@/components/FinalCTA'

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
            {/* Spline 3D background for hero */}
            <div className="absolute inset-0 h-screen">
                <SplineScene scene="https://prod.spline.design/wRG53E29NQRjhXoT/scene.splinecode" />
            </div>

            {/* Hero Section */}
            <Hero onPrimaryCTA={scrollToWizard} onSecondaryCTA={scrollToDiagram} />

            {/* Interactive System Diagram */}
            <div ref={diagramRef}>
                <FlowDiagram />
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

            {/* Testimonials */}
            <StaggerTestimonials />

            {/* Meet the Team */}
            <TeamSection />

            {/* Final CTA */}
            <FinalCTA />

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted">
                        © {new Date().getFullYear()} AvlokAI. All rights reserved.
                    </p>
                    <p className="text-sm text-muted">
                        Engineered with precision. Delivered with purpose.
                    </p>
                </div>
            </footer>
        </main>
    )
}
