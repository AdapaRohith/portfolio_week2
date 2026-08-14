import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingPhonePopup from '@/components/FloatingPhonePopup'
import JsonLd from '@/components/JsonLd'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SITE_URL } from '@/lib/company'
import { organizationSchema, websiteSchema } from '@/lib/schema'

/**
 * Root metadata is deliberately canonical-free. It used to carry
 * `alternates: { canonical: SITE_URL }`, which every route inherited unless it
 * overrode it — including `not-found`, so a 404 response shipped a canonical
 * pointing at the homepage. That is the exact signal that turns wrong URLs into
 * soft-404 duplicates of home in the index. Canonicals are now issued only by
 * `pageMetadata`, which every real page calls.
 *
 * `title.template` remains as a fallback only; `pageMetadata` opts out of it via
 * `{ absolute }`. See the note there.
 */
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'AvlokAI — AI Automation Agency in Hyderabad',
        template: '%s | AvlokAI',
    },
    description:
        'AvlokAI is an AI automation agency in Hyderabad. We build RAG chatbots, CRM and n8n workflow automation, and official WhatsApp Business Platform flows — deployed into your own cloud accounts by a team from a VAPT and digital-forensics background.',
    applicationName: 'AvlokAI',
    authors: [{ name: 'AvlokAI' }],
    creator: 'AvlokAI',
    publisher: 'AvlokAI',
    manifest: '/manifest.webmanifest',
    formatDetection: { telephone: false, address: false, email: false },
    icons: {
        icon: '/AvlokAi.png',
        apple: '/apple-touch-icon.png',
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

/**
 * Separate export because `themeColor` and `viewport` moved out of the metadata
 * object in Next 14. The two entries tint the mobile browser chrome to match
 * whichever scheme the inline script below resolves to.
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fafafa' },
        { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ],
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
