import type { MetadataRoute } from 'next'
import { company } from '@/lib/company'

/**
 * Generated rather than a static file so the name and description stay tied to
 * `company`. Lighthouse flags a missing manifest under installability, and the
 * `theme_color` here has to agree with the `viewport` export in the root layout.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${company.name} — AI Automation Agency in Hyderabad`,
        short_name: company.name,
        description:
            'RAG chatbots, CRM and n8n workflow automation, and official WhatsApp Business Platform flows, built in your own cloud accounts.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fafafa',
        theme_color: '#fafafa',
        lang: 'en-IN',
        categories: ['business', 'productivity'],
        icons: [
            { src: '/AvlokAi.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    }
}
