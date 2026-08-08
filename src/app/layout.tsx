import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingPhonePopup from '@/components/FloatingPhonePopup'
import JsonLd from '@/components/JsonLd'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SITE_URL } from '@/lib/company'
import { organizationSchema, websiteSchema } from '@/lib/schema'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'AvlokAI — AI Automation Agency in Hyderabad | RAG Chatbots, CRM & WhatsApp Workflows',
        template: '%s | AvlokAI',
    },
    description:
        'AvlokAI is an AI automation agency in Hyderabad. We build RAG chatbots, CRM and n8n workflow automation, and official WhatsApp Business Platform flows — deployed into your own cloud accounts by a team from a VAPT and digital-forensics background.',
    authors: [{ name: 'AvlokAI' }],
    creator: 'AvlokAI',
    publisher: 'AvlokAI',
    icons: {
        icon: '/AvlokAi.png',
        apple: '/apple-touch-icon.png',
    },
    alternates: { canonical: SITE_URL },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-IN" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
                    }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground">
                <JsonLd data={[organizationSchema(), websiteSchema()]} />
                <ThemeProvider>
                    <Header />
                    {children}
                    <Footer />
                    <FloatingPhonePopup />
                </ThemeProvider>
            </body>
        </html>
    )
}
