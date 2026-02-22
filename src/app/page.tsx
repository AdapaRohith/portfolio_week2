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
            {/* Hero Section with Spline alongside */}
            <div className="relative min-h-screen flex items-center px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="w-full lg:w-1/2 z-10">
                    <Hero onPrimaryCTA={scrollToWizard} onSecondaryCTA={scrollToDiagram} />
                </div>

                {/* Spline 3D visualization */}
                <div className="absolute lg:relative inset-0 lg:inset-auto w-full lg:w-1/2 h-screen z-0 opacity-30 lg:opacity-100 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                        <SplineScene scene="/scene-clean.splinecode" />
                    </div>
                </div>
            </div>

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

            {/* Meet the Team */}
            <TeamSection />

            {/* Testimonials */}
            <StaggerTestimonials />

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
