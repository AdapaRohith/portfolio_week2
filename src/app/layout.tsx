import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
    title: 'AvlokAI — Intelligent Automation Solutions',
    description: 'AvlokAI engineers enterprise-grade AI automation systems that eliminate manual workflows. Production-ready solutions built for scale, reliability, and measurable ROI.',
    keywords: ['AI automation', 'workflow automation', 'n8n', 'AI systems', 'business automation', 'enterprise AI', 'intelligent automation'],
    authors: [{ name: 'AvlokAI' }],
    icons: {
        icon: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'AvlokAI — Intelligent Automation Solutions',
        description: 'Enterprise-grade AI automation systems that eliminate manual workflows and drive measurable results.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-background text-foreground">
                <Header />
                {children}
            </body>
        </html>
    )
}
