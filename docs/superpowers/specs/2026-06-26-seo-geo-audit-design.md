---
name: seo-geo-audit-2026-06-26
description: SEO and GEO audit findings for avlokai.com and implementation spec for all fixes in the Next.js project
metadata:
  type: project
---

# SEO & GEO Audit — avlokai.com

**Date:** 2026-06-26  
**Scope:** Full audit of the avlokai.com Next.js project; implement all findings directly (no commit/push).

---

## Audit Findings

### Critical SEO

**1. Homepage is `'use client'`**  
`src/app/page.tsx` has the `'use client'` directive. Next.js renders it entirely client-side. Google and AI crawlers receive a near-empty HTML shell. All the H1, service cards, stats, team, testimonials, case studies — invisible to crawlers without JS execution.

Fix: Extract the two interactive scroll handlers into `HomeScrollCTA.tsx` (client component). Make `page.tsx` a server component.

**2. Missing meta descriptions on sub-pages**  
`/services` has a title but no `description`. `/industries` has a title but no `description`. These pages show blank snippets in SERPs.

**3. Sub-pages missing canonical URLs**  
Neither `/services` nor `/industries` sets `alternates.canonical` in their metadata. The root layout canonical only covers `/`.

**4. JSON-LD in `<body>` not `<head>`**  
The Organization JSON-LD `<script>` is injected inside `<body>`. Best practice (and the spec) is `<head>`.

**5. Thin `/industries` page**  
Six icon + label cards with zero descriptive text. Search engines cannot index useful content; AI engines cannot cite what AvlokAI does per sector.

**6. Sitemap missing `<lastmod>`**  
`public/sitemap.xml` omits `<lastmod>` on every URL, making it harder for crawlers to prioritize re-crawls.

**7. No breadcrumb schema on sub-pages**  
Functional breadcrumb nav exists but no `BreadcrumbList` JSON-LD.

**8. No `ItemList`/`Service` schema on /services**  
Six services are displayed but have no structured data markup.

**9. OG image is square logo (512×512)**  
Twitter `summary_large_image` card expects 1200×630. Square logo renders poorly. (Out of scope for this implementation — needs design asset.)

---

### Critical GEO

**10. No FAQ section**  
AI engines (ChatGPT, Perplexity, Gemini, Claude) heavily favor Q&A-structured content for citations. No FAQ exists anywhere on the site.

Fix: New `FaqSection.tsx` component with `FAQPage` JSON-LD, placed above the footer on the homepage.

**11. Organization schema lacks GEO signals**  
Missing: `knowsAbout`, `serviceType`, `areaServed`, `hasOfferCatalog`. These fields directly feed AI knowledge graphs.

**12. Testimonials lack `Review` schema**  
Three testimonials exist but have no structured Review markup. AI engines look for social proof signals.

**13. No explicit AI crawler opt-ins in robots.txt**  
`GPTBot`, `PerplexityBot`, `ClaudeBot`, `GoogleExtendedBot` are not explicitly allowed. Some crawlers default to blocked unless listed.

---

## Design Decisions

### Homepage Server Component Split

`page.tsx` becomes a server component. The only interactive behavior is:
- "Start a project" button → scrolls to `#contact`  
- "See it work" button → scrolls to `#work`

These live in `HomeScrollCTA.tsx` (client) which receives no props and handles both buttons internally via `document.getElementById` / `querySelector`. The `workRef` approach is dropped in favor of `document.getElementById('work')` since the `#work` id already exists on `WorkShowcase`'s section.

### FAQ Content

Six questions targeting buyer-intent and AI citation queries:

1. What is AvlokAI?
2. Which industries does AvlokAI serve?
3. How is AvlokAI different from off-the-shelf chatbots?
4. How long does it take to ship an automation?
5. What does a typical engagement cost?
6. Is the AI system maintained after delivery?

FAQPage JSON-LD embedded inline on the component.

### Industries Page Descriptions

Pulled directly from the matching `services.ts` descriptions, adapted for the industry framing (what the industry gets, not what the service is).

### Organization Schema Enhancements

Add to existing jsonLd:
- `knowsAbout`: array of topic strings
- `serviceType`: "AI Automation Agency"
- `areaServed`: "Worldwide"
- `hasOfferCatalog`: list of 6 services
- `numberOfEmployees`: omit (unknown)

### Testimonials Microdata

Add `itemScope`/`itemProp` attributes for `Review` schema on each `<figure>` without breaking existing styles.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/page.tsx` | Convert to server component; add `<FaqSection />` |
| `src/components/HomeScrollCTA.tsx` | New — client component with CTA scroll buttons |
| `src/app/layout.tsx` | Move JSON-LD to `<head>`; expand Organization schema |
| `src/app/services/page.tsx` | Full metadata; `ItemList` + `BreadcrumbList` JSON-LD |
| `src/app/industries/page.tsx` | Full metadata; `BreadcrumbList` JSON-LD; descriptions |
| `src/lib/industries.ts` | Add `description` field to each industry |
| `src/components/Testimonials.tsx` | Add `Review` microdata |
| `src/components/FaqSection.tsx` | New — FAQ accordion + `FAQPage` JSON-LD |
| `public/sitemap.xml` | Add `<lastmod>` dates |
| `public/robots.txt` | Add explicit AI crawler allow rules |

---

## Out of Scope

- OG image creation (1200×630) — needs design asset
- Blog / article content — separate initiative
- Individual case study pages — separate initiative
- Real testimonial names — placeholder replacement is a content task
