# SEO & GEO Audit — avlokai.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every SEO and GEO issue found in the avlokai.com audit — converting the homepage to SSR, enriching structured data, adding FAQ, and expanding thin content.

**Architecture:** Next.js App Router project. Pages that are `'use client'` get rendered client-side only — crawlers see an empty shell. The fix is to keep interactive child components as client components while making parent page files server components. All structured data (JSON-LD) moves to `<head>`. New `FaqSection` component adds both user-facing FAQ content and `FAQPage` schema for GEO.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, Schema.org JSON-LD.

## Global Constraints

- Do NOT commit or push to git — user will handle that.
- Do NOT change visual design, colors, or layout of any existing section.
- All new/modified TypeScript must pass `tsc --noEmit` without errors.
- Follow existing code style: `'use client'` at top of client files, named exports for data, default exports for components.
- Keep all existing `aria-*` attributes; add new ones where noted.
- Run `npm run build` after each task to confirm no regressions.

---

### Task 1: Update robots.txt and sitemap.xml

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Produces: nothing downstream depends on these files within the codebase.

- [ ] **Step 1: Update robots.txt to explicitly allow AI crawlers**

Replace the entire contents of `public/robots.txt` with:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GoogleExtendedBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://avlokai.com/sitemap.xml
```

- [ ] **Step 2: Update sitemap.xml to add `<lastmod>` to every URL**

Replace the entire contents of `public/sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://avlokai.com/</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://avlokai.com/services</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://avlokai.com/industries</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://avlokai.com/privacy</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://avlokai.com/terms</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://avlokai.com/data-delete</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Verify**

Open `public/robots.txt` and `public/sitemap.xml` — confirm both look correct. No build step needed for static public files.

---

### Task 2: Convert homepage to server component

**Files:**
- Modify: `src/app/page.tsx` — remove `'use client'`, `useRef`, prop callbacks; remove `div ref={workRef}` wrapper
- Modify: `src/components/AutomationFlowHero.tsx` — remove props; handle scroll internally via `document.getElementById`

**Interfaces:**
- `AutomationFlowHero` — remove `Props` interface and all prop usage. Component becomes self-contained.
- Consumes: `WorkShowcase` already has `id="work"` on its section; `FinalCTA` already has `id="contact"` on its section.
- Produces: `page.tsx` becomes a React Server Component (no `'use client'`).

- [ ] **Step 1: Remove `'use client'`, `useRef`, scroll handlers, and `workRef` from `src/app/page.tsx`**

Replace the entire file with:

```tsx
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
    return (
        <main className="relative">
            <AutomationFlowHero />
            <StatsBand />
            <ServicesBento />
            <WorkShowcase />
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
```

- [ ] **Step 2: Remove props from `AutomationFlowHero` — handle scroll internally**

Replace the entire contents of `src/components/AutomationFlowHero.tsx` with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AutomationFlow from './AutomationFlow'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function AutomationFlowHero() {
    const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section className="relative min-h-[100svh] flex items-center px-6 pt-24 lg:pt-0">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={staggerContainer} initial="hidden" animate="show">
                    <motion.p variants={fadeUp} className="font-mono text-xs tracking-widest uppercase text-accent mb-5">
                        AI Automation Agency
                    </motion.p>
                    <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                        Your workflow,<br /><span className="gradient-text">on autopilot.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lg text-muted max-w-md mb-8">
                        We design and ship production-grade AI systems that eliminate manual work — built for scale, reliability, and measurable ROI.
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                        <button onClick={scrollToContact}
                            className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button onClick={scrollToWork}
                            className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors">
                            See it work
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-2xl glass-card p-6 lg:p-10">
                    <AutomationFlow />
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/parzival/portfolio_week2 && npx tsc --noEmit 2>&1 | head -30
```

Expected: No errors (or only pre-existing unrelated errors).

- [ ] **Step 4: Verify SSR output contains page content**

```bash
cd /home/parzival/portfolio_week2 && npm run build 2>&1 | tail -20
```

Expected: Build succeeds. The homepage should now be a static page in the build output (not a dynamic client-only route).

---

### Task 3: Expand Organization JSON-LD and move it to `<head>`

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: expanded `jsonLd` object consumed by `<script type="application/ld+json">` in `<head>`.

- [ ] **Step 1: Update `src/app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import FloatingPhonePopup from '@/components/FloatingPhonePopup'
import { ThemeProvider } from '@/components/ThemeProvider'

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
    description: 'AvlokAI engineers enterprise-grade AI automation systems that eliminate manual workflows for IT, e-commerce, manufacturing, healthcare, real estate, and SMB sectors.',
    serviceType: 'AI Automation Agency',
    areaServed: 'Worldwide',
    knowsAbout: [
        'AI automation',
        'workflow automation',
        'business process automation',
        'AI agent development',
        'n8n automation',
        'CRM automation',
        'WhatsApp automation',
        'predictive maintenance',
        'computer vision quality control',
        'natural language processing',
        'enterprise AI integration',
        'generative AI systems',
        'omnichannel inventory management',
        'claims processing automation',
        'real estate lead automation',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Automation Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Services & Software Automation', description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce & Retail Automation', description: 'Omnichannel inventory sync, AI review analysis, order fulfillment, and pricing intelligence.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manufacturing & Logistics Automation', description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare & Pharma Automation', description: 'Patient scheduling, claims processing, and HIPAA compliance auditing.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate & Construction Automation', description: 'AI lead management, multi-portal listing sync, and site-progress tracking.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SMB Micro-Automations', description: 'WhatsApp broadcasts, review requests, appointment reminders, and daily sales summaries.' } },
        ],
    },
    sameAs: [
        'https://www.linkedin.com/company/avlokai/',
        'https://www.instagram.com/avlok.ai/',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'avlokaibusiness@gmail.com',
        telephone: '+919346672015',
        contactType: 'sales',
        availableLanguage: 'English',
    },
    foundingDate: '2024',
    founder: [
        { '@type': 'Person', name: 'Sushanth Kasturi', jobTitle: 'Founder and CEO' },
        { '@type': 'Person', name: 'Rohith', jobTitle: 'Co-Founder and CTO' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground">
                <ThemeProvider>
                    <Header />
                    {children}
                    <FloatingPhonePopup />
                </ThemeProvider>
            </body>
        </html>
    )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/parzival/portfolio_week2 && npx tsc --noEmit 2>&1 | head -20
```

Expected: No new errors.

---

### Task 4: Add `description` to industries data and expand /industries page

**Files:**
- Modify: `src/lib/industries.ts` — add `description` field to `Industry` interface and each entry
- Modify: `src/app/industries/page.tsx` — full metadata, BreadcrumbList JSON-LD, render descriptions

**Interfaces:**
- `Industry` interface gains: `description: string`
- `industries/page.tsx` consumes `ind.description` for card body text

- [ ] **Step 1: Update `src/lib/industries.ts`**

Replace the entire file with:

```ts
import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Industry { label: string; icon: LucideIcon; description: string }

export const industries: Industry[] = [
    {
        label: 'IT Services',
        icon: MonitorCog,
        description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards across your development lifecycle.',
    },
    {
        label: 'E-Commerce',
        icon: ShoppingCart,
        description: 'Omnichannel inventory sync, AI review analysis, automated order fulfillment, and pricing intelligence to scale online retail.',
    },
    {
        label: 'Manufacturing',
        icon: Factory,
        description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility that cut unplanned downtime.',
    },
    {
        label: 'Healthcare',
        icon: Hospital,
        description: 'Patient scheduling, insurance claims processing, and HIPAA compliance auditing so clinical staff can focus on care.',
    },
    {
        label: 'Real Estate',
        icon: Building2,
        description: 'AI lead management, multi-portal listing sync, and site-progress milestone tracking across the full property lifecycle.',
    },
    {
        label: 'SMB',
        icon: Smartphone,
        description: 'Affordable, ready-to-deploy automations: WhatsApp broadcasts, review requests, appointment reminders, and daily sales summaries.',
    },
]
```

- [ ] **Step 2: Update `src/app/industries/page.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { industries } from '@/lib/industries'

export const metadata: Metadata = {
    title: 'Industries We Serve | AI Automation for IT, E-Commerce, Healthcare & More | AvlokAI',
    description: 'AvlokAI delivers production-grade AI automation across IT, e-commerce, manufacturing, healthcare, real estate, and SMB — tailored to each sector\'s real operational challenges.',
    alternates: {
        canonical: 'https://avlokai.com/industries',
    },
    openGraph: {
        title: 'Industries We Serve | AvlokAI',
        description: 'AI automation tailored to your sector — IT, e-commerce, manufacturing, healthcare, real estate, and SMB.',
        url: 'https://avlokai.com/industries',
        siteName: 'AvlokAI',
        locale: 'en_US',
        type: 'website',
        images: [{ url: '/AvlokAi.png', width: 512, height: 512, alt: 'AvlokAI Industries' }],
    },
}

const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avlokai.com' },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://avlokai.com/industries' },
    ],
}

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="max-w-6xl mx-auto">
                <nav className="font-mono text-xs text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Industries</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Built for <span className="gradient-text">your sector</span>.
                </h1>
                <p className="text-lg text-muted max-w-2xl mb-14">
                    We tailor AI automation systems to the realities of each industry we serve — because manufacturing ops and e-commerce ops are not the same problem.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <div key={ind.label} className="glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-xl font-semibold mb-2">{ind.label}</h2>
                                <p className="text-sm text-muted">{ind.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
```

- [ ] **Step 3: Verify TypeScript compiles and build succeeds**

```bash
cd /home/parzival/portfolio_week2 && npx tsc --noEmit 2>&1 | head -20
```

Expected: No new errors related to the `description` field.

---

### Task 5: Add full metadata and structured data to /services page

**Files:**
- Modify: `src/app/services/page.tsx` — full metadata with canonical + OG, add `ItemList` + `BreadcrumbList` JSON-LD

**Interfaces:**
- Consumes: `services` array from `@/lib/services` (unchanged — no new fields needed)
- Produces: two JSON-LD blocks in `<head>` for the services page

- [ ] **Step 1: Update `src/app/services/page.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/lib/services'

export const metadata: Metadata = {
    title: 'AI Automation Services | IT, E-Commerce, Healthcare & Manufacturing | AvlokAI',
    description: 'Production-grade AI automation services for IT, e-commerce, manufacturing, healthcare, real estate, and SMB — engineered for scale, reliability, and measurable ROI.',
    alternates: {
        canonical: 'https://avlokai.com/services',
    },
    openGraph: {
        title: 'AI Automation Services | AvlokAI',
        description: 'Production-grade AI automation services across IT, e-commerce, manufacturing, healthcare, real estate, and SMB.',
        url: 'https://avlokai.com/services',
        siteName: 'AvlokAI',
        locale: 'en_US',
        type: 'website',
        images: [{ url: '/AvlokAi.png', width: 512, height: 512, alt: 'AvlokAI Services' }],
    },
}

const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avlokai.com' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://avlokai.com/services' },
    ],
}

const serviceListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AvlokAI AI Automation Services',
    description: 'Production-grade AI automation services engineered for enterprise scale and measurable ROI.',
    itemListElement: [
        {
            '@type': 'ListItem', position: 1,
            item: { '@type': 'Service', name: 'IT Services & Software Automation', description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards across your development lifecycle.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
        {
            '@type': 'ListItem', position: 2,
            item: { '@type': 'Service', name: 'E-Commerce & Retail Automation', description: 'Omnichannel inventory sync, AI review analysis, order fulfillment, and pricing intelligence to scale online retail.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
        {
            '@type': 'ListItem', position: 3,
            item: { '@type': 'Service', name: 'Manufacturing & Logistics Automation', description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility that cut downtime.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
        {
            '@type': 'ListItem', position: 4,
            item: { '@type': 'Service', name: 'Healthcare & Pharma Automation', description: 'Patient scheduling, claims processing, and HIPAA compliance auditing so staff focus on care.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
        {
            '@type': 'ListItem', position: 5,
            item: { '@type': 'Service', name: 'Real Estate & Construction Automation', description: 'AI lead management, multi-portal listing sync, and site-progress tracking across the property lifecycle.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
        {
            '@type': 'ListItem', position: 6,
            item: { '@type': 'Service', name: 'SMB Micro-Automations', description: 'Affordable, ready-to-deploy automations: WhatsApp broadcasts, review requests, reminders, daily summaries.', provider: { '@type': 'Organization', name: 'AvlokAI', url: 'https://avlokai.com' } },
        },
    ],
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
            />
            <div className="max-w-6xl mx-auto">
                <nav className="font-mono text-xs text-muted mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Services</p>
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Automation that <span className="gradient-text">ships</span>.
                </h1>
                <p className="text-lg text-muted max-w-2xl mb-14">
                    Production-grade AI systems tailored to your sector — engineered for scale, reliability, and measurable ROI.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((s) => {
                        const Icon = s.icon
                        return (
                            <div key={s.slug} className="glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-xl font-semibold mb-2">{s.title}</h2>
                                <p className="text-sm text-muted mb-4">{s.description}</p>
                                <ul className="space-y-2">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="text-sm text-foreground flex items-start gap-2">
                                            <span className="text-accent mt-1">—</span>{h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/parzival/portfolio_week2 && npx tsc --noEmit 2>&1 | head -20
```

Expected: No new errors.

---

### Task 6: Add Review microdata to Testimonials

**Files:**
- Modify: `src/components/Testimonials.tsx`

**Interfaces:**
- No interface changes. Adds HTML microdata attributes (`itemScope`, `itemType`, `itemProp`) to existing DOM elements.

- [ ] **Step 1: Update `src/components/Testimonials.tsx`**

Replace the entire file with:

```tsx
'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Testimonial { quote: string; name: string; role: string }

// PLACEHOLDER testimonials — replace with real client quotes before launch.
const testimonials: Testimonial[] = [
    { quote: 'They mapped our chaos and shipped automations that actually stuck. Downtime dropped within a month.', name: 'Operations Lead', role: 'Manufacturing' },
    { quote: 'The inventory sync alone paid for the engagement. No more oversells across marketplaces.', name: 'Founder', role: 'E-Commerce' },
    { quote: 'Claims that took a week now clear in hours. Our staff finally focus on patients.', name: 'Practice Manager', role: 'Healthcare' },
]

export default function Testimonials() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Testimonials</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">Trusted by operators.</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid md:grid-cols-3 gap-4">
                    {testimonials.map((t) => (
                        <motion.figure
                            key={t.quote}
                            variants={fadeUp}
                            className="glass-card rounded-2xl p-7 flex flex-col"
                            itemScope
                            itemType="https://schema.org/Review"
                        >
                            <Quote className="h-6 w-6 text-accent mb-4" aria-hidden="true" />
                            <blockquote className="text-foreground mb-6 flex-1" itemProp="reviewBody">{t.quote}</blockquote>
                            <figcaption itemScope itemType="https://schema.org/Person" itemProp="author">
                                <div className="font-display font-semibold text-sm" itemProp="name">{t.name}</div>
                                <div className="font-mono text-xs text-muted" itemProp="jobTitle">{t.role}</div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/parzival/portfolio_week2 && npx tsc --noEmit 2>&1 | head -20
```

Expected: No new errors.

---

### Task 7: Create FaqSection component and add to homepage

**Files:**
- Create: `src/components/FaqSection.tsx` — FAQ accordion with `FAQPage` JSON-LD
- Modify: `src/app/page.tsx` — import and render `<FaqSection />` before footer

**Interfaces:**
- `FaqSection` — default export, no props
- Consumed by: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/FaqSection.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const faqs = [
    {
        q: 'What is AvlokAI?',
        a: 'AvlokAI is an AI automation agency that designs and ships production-grade AI systems for enterprises and growing businesses. We eliminate manual workflows by building custom automation pipelines — not off-the-shelf chatbots — engineered specifically for your operations.',
    },
    {
        q: 'Which industries does AvlokAI serve?',
        a: 'We deliver automation across six sectors: IT & software, e-commerce & retail, manufacturing & logistics, healthcare & pharma, real estate & construction, and SMB micro-automations. Each engagement is tailored to the operational realities and compliance requirements of that sector.',
    },
    {
        q: 'How is AvlokAI different from off-the-shelf AI chatbots?',
        a: 'Off-the-shelf chatbots handle conversation. AvlokAI builds end-to-end automation systems — multi-step workflows that connect your CRM, ERP, databases, and third-party APIs. The result is a system that executes operations autonomously, not one that just answers questions.',
    },
    {
        q: 'How long does it take to ship an automation?',
        a: 'Most engagements move from discovery audit to first production deployment in 2–4 weeks. We use incremental delivery — shipping working modules while the next is in development — so you see measurable results quickly rather than waiting for a big-bang launch.',
    },
    {
        q: 'What does a typical engagement cost?',
        a: 'Pricing depends on scope, complexity, and integrations required. We offer a free workflow audit to identify the highest-ROI automation opportunities and provide a clear estimate before any commitment. Contact us to get started.',
    },
    {
        q: 'Is the AI system maintained after delivery?',
        a: 'Yes. Every system ships with post-deployment monitoring and iteration based on real production data. We treat automation as a continuously improving system, not a one-time project — and offer optional ongoing support and optimization plans.',
    },
]

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
}

export default function FaqSection() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section className="py-24 px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="max-w-3xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">FAQ</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Common questions.
                </h2>
                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div key={f.q} className="glass-card rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={open === i}
                                aria-controls={`faq-answer-${i}`}
                            >
                                <span className="font-display font-semibold pr-4">{f.q}</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-muted flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        id={`faq-answer-${i}`}
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <p className="px-6 pb-6 text-muted text-sm leading-relaxed">{f.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Add `<FaqSection />` to `src/app/page.tsx` before the footer**

In `src/app/page.tsx`, add the import at the top and insert `<FaqSection />` just before `<footer>`. The imports section becomes:

```tsx
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
import FaqSection from '@/components/FaqSection'
```

And the `<main>` body:

```tsx
<main className="relative">
    <AutomationFlowHero />
    <StatsBand />
    <ServicesBento />
    <WorkShowcase />
    <IndustriesBand />
    <ProcessTimeline />
    <TeamSection />
    <Testimonials />
    <FinalCTA />
    <FaqSection />

    <footer ...>
```

- [ ] **Step 3: Verify full build passes**

```bash
cd /home/parzival/portfolio_week2 && npm run build 2>&1 | tail -30
```

Expected: Build completes successfully. No TypeScript or bundling errors.

- [ ] **Step 4: Spot-check SSR output for homepage**

```bash
cd /home/parzival/portfolio_week2 && npm run build 2>&1 | grep -E "(page|route|error)" | head -20
```

Expected: `/` appears as a static or SSR route (not a client-only page).

---

## Self-Review

**Spec coverage check:**

| Spec item | Covered by |
|-----------|-----------|
| Homepage `'use client'` fix | Task 2 |
| Missing meta descriptions on sub-pages | Tasks 4 & 5 |
| Missing canonical URLs on sub-pages | Tasks 4 & 5 |
| JSON-LD moved to `<head>` | Task 3 |
| Sitemap `<lastmod>` | Task 1 |
| Thin `/industries` content | Task 4 |
| BreadcrumbList schema on sub-pages | Tasks 4 & 5 |
| ItemList/Service schema on /services | Task 5 |
| FAQ section + FAQPage JSON-LD | Task 7 |
| Organization `knowsAbout`/`serviceType`/`areaServed` | Task 3 |
| Testimonials Review microdata | Task 6 |
| AI crawler opt-ins in robots.txt | Task 1 |

All spec items covered. OG image (512×512) left as-is — explicitly out of scope in spec.

**Placeholder scan:** No TBD/TODO in plan code blocks.

**Type consistency:** `ind.description` added in Task 4 Step 1 and consumed in Task 4 Step 2. `AutomationFlowHero` props removed in Task 2 Step 2; `page.tsx` call updated in same task Step 1 (no props passed). `FaqSection` created in Task 7 Step 1; imported and used in Task 7 Step 2.
