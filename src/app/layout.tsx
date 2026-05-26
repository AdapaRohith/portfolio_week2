import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import FloatingPhonePopup from '@/components/FloatingPhonePopup'

export const metadata: Metadata = {
    metadataBase: new URL('https://avlokai.com'),
    title: 'AvlokAI — Intelligent Automation Solutions | AI Systems That Eliminate Manual Work',
    description: 'AvlokAI engineers enterprise-grade AI automation systems that eliminate manual workflows. Production-ready solutions built for scale, reliability, and measurable ROI across IT, e-commerce, healthcare, manufacturing, and real estate.',
    keywords: [
        'AI automation agency', 'custom AI systems', 'enterprise AI automation',
        'AI integration services', 'business process automation', 'intelligent automation',
        'workflow automation', 'AI agent development', 'production-grade AI',
        'AI automation consulting', 'n8n automation', 'CRM automation',
        'AI chatbot development', 'lead generation automation', 'WhatsApp automation',
    ],
    authors: [{ name: 'AvlokAI' }],
    creator: 'AvlokAI',
    publisher: 'AvlokAI',
    icons: {
        icon: '/AvlokAi.png',
        apple: '/apple-touch-icon.png',
    },
    alternates: {
        canonical: 'https://avlokai.com',
    },
    openGraph: {
        title: 'AvlokAI — Intelligent Automation Solutions',
        description: 'Enterprise-grade AI automation systems that eliminate manual workflows and drive measurable results.',
        url: 'https://avlokai.com',
        siteName: 'AvlokAI',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/AvlokAi.png',
                width: 512,
                height: 512,
                alt: 'AvlokAI — Intelligent Automation Solutions',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AvlokAI — Intelligent Automation Solutions',
        description: 'Enterprise-grade AI automation systems that eliminate manual workflows.',
        images: ['/AvlokAi.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AvlokAI',
    url: 'https://avlokai.com',
    logo: 'https://avlokai.com/AvlokAi.png',
    description: 'AvlokAI engineers enterprise-grade AI automation systems that eliminate manual workflows.',
    sameAs: [
        'https://www.linkedin.com/company/avlokai/',
        'https://www.instagram.com/avlok.ai/',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'avlokaibusiness@gmail.com',
        telephone: '+919346672015',
        contactType: 'sales',
    },
    foundingDate: '2024',
    founder: [
        {
            '@type': 'Person',
            name: 'Sushanth Kasturi',
            jobTitle: 'Founder and CEO',
        },
        {
            '@type': 'Person',
            name: 'Rohith',
            jobTitle: 'Co-Founder and CTO',
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-background text-foreground">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Header />
                {children}
                <FloatingPhonePopup />
            </body>
        </html>
    )
}

