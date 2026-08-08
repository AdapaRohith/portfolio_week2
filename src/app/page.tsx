import AutomationFlowHero from '@/components/AutomationFlowHero'
import StatsBand from '@/components/StatsBand'
import ServicesBento from '@/components/ServicesBento'
import WorkShowcase from '@/components/WorkShowcase'
import IndustriesBand from '@/components/IndustriesBand'
import ProcessTimeline from '@/components/ProcessTimeline'
import TeamSection from '@/components/TeamSection'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { faqs } from '@/lib/faq'
import { faqSchema } from '@/lib/schema'

/**
 * Server component. The homepage used to be a client component purely so two
 * buttons could scroll-into-view; those are now real links, which also means
 * the whole page renders in static HTML.
 */
export const metadata = pageMetadata({
    title: 'AvlokAI — AI Automation Agency in Hyderabad | RAG Chatbots, CRM & WhatsApp Workflows',
    description:
        'AvlokAI builds RAG chatbots, CRM and n8n workflow automation, and official WhatsApp Business Platform flows for businesses in Hyderabad and across India. Fixed-price, deployed to your own cloud, documented at handover.',
    path: '/',
})

export default function Home() {
    return (
        <main className="relative">
            <JsonLd data={faqSchema(faqs)} />
            <AutomationFlowHero />
            <StatsBand />
            <ServicesBento />
            <WorkShowcase />
            <IndustriesBand />
            <ProcessTimeline />
            <TeamSection />
            <FAQ />
            <FinalCTA />
        </main>
    )
}
