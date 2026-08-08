# avlokai.com audit remediation — status

Source: `avlokai-audit.pdf` (1 Aug 2026), 33 findings.
Build verified: `next build` passes, 19 routes, static HTML checked for canonicals, schema, and stat values.

## Assumptions made

1. **Canonical host is `https://www.avlokai.com`.** The audit says the server 301s apex → www, so www was chosen over apex. Everything — canonicals, `og:url`, sitemap, robots `Host` — now points there. If you'd rather standardise on the apex, change `SITE_URL` in `src/lib/company.ts` and flip the server redirect; nothing else needs touching.
2. **Single contact address: `hello@avlokai.com`.** All `avlokaibusiness@gmail.com` references removed.
3. **Unknown entity fields left blank on purpose.** `legalName`, `cin`, `gstin`, `address.street`, `postalCode` in `src/lib/company.ts`. They render nowhere until filled, so the site never shows a placeholder. Fill them and the footer block, Organization schema `identifier`, and the legal pages pick them up automatically.

## Fixed in code

| # | Finding | What changed |
|---|---------|--------------|
| 1 | Crawl block | `public/robots.txt` had nothing disallowed. Replaced with generated `src/app/robots.ts` on the canonical host. **Search Console check is still on you.** |
| 2 | Canonicals point at a redirecting host | `src/lib/seo.ts` builds a self-referencing canonical on the www host for every page |
| 3 | Legal pages canonicalise to homepage | Privacy/Terms/Data-deletion converted from client to server components; each now exports its own title, description, and canonical |
| 4 | Hero stats render as zeros | `StatsBand` is now a server component with no count-up. Values ship in static HTML |
| 5 | Two contact emails | Single address from `src/lib/company.ts` |
| 6 | Gmail-compose CTA | Real `/contact` page + `POST /api/contact` with validation, honeypot, rate limit, Resend delivery |
| 7 | HIPAA claims | "HIPAA Compliance Audit" removed. Healthcare framed as admin workflow tooling with an explicit "not an accredited auditor, no PHI without an executed BAA" note on `/industries`, `/terms`, and the FAQ |
| 8 | Thin privacy policy | Full rewrite: fiduciary identity, controller/processor split, legal bases, **named sub-processor table**, cross-border transfers, retention periods, safeguards, DPDP rights, Grievance Officer, children's data, breach notification, effective date |
| 9 | Three-bullet ToS | Full rewrite: scope + change control, milestones and late fees, acceptance, platform-compliance limits, IP assignment on payment, confidentiality, DPA, warranties, liability cap (12 months' fees), indemnities, termination, force majeure, arbitration seated in Hyderabad |
| 10 | Unsubstantiated metrics | All outcome percentages deleted. `/lib/case-studies.ts` is now "representative scenarios" with a visible disclaimer |
| 11 | Anonymous testimonials | Section and component deleted |
| 12 | WhatsApp compliance | Explicit opt-in/template/opt-out commitments in the service page, FAQ, and ToS §6; TRAI TCCCPA/DLT obligations named |
| 13 | Review gating | "Unfiltered, sent to every eligible customer" stated as a non-negotiable design constraint in ToS §6, FAQ, and the SMB industry copy |
| 14 | No company identity | Footer entity block + Organization schema identifiers, driven by `company.ts` |
| 15 | ₹3,000 price floor | Not present in the current codebase |
| 16 | Undated legal pages | Effective + last-updated dates from `LEGAL_EFFECTIVE_DATE` |
| 17 | Uptime claim vs ToS | Uptime stat removed; ToS §10 states the availability position properly |
| 18 | meta keywords | Deleted |
| 19 | Templated/wrong metadata | Per-page title, description, og:*, twitter:* via `pageMetadata()` |
| 20 | Zero structured data | ProfessionalService + WebSite (layout), FAQPage (home, Hyderabad), Service (services + each detail page), BreadcrumbList (every inner page) |
| 21 | 4 pages, 15 keywords | +9 indexable pages: 6 service detail pages, a Hyderabad location page, /contact, and the legal pages now indexable |
| 25 | Anchor-only nav | Header links to `/services`, `/industries`, `/ai-automation-agency-hyderabad` |
| 26 | Sitemap | Generated from route data in `src/app/sitemap.ts` — a new service can't go missing |
| 28 | Brand entity collision | `sameAs`, address, founders, and identifiers in Organization schema; `llms.txt` states explicitly that AvlokAI is unaffiliated with Avlok Kohli / AngelList |
| 29 | Competitor doing GEO properly | 10 self-contained Q&A blocks (`src/lib/faq.ts`) + 5 Hyderabad-specific ones, rendered expanded, with named frameworks and real timelines |
| 30 | llms.txt | `public/llms.txt` |
| 31 | Six deep verticals | Repositioned to six capabilities led by RAG chatbots / CRM workflows / WhatsApp. Manufacturing page now says outright that sensor-driven predictive maintenance and vision defect detection need a domain team we don't have |
| 33 | Invisible differentiator | Security background is in the H1 subhead, the team bio, a dedicated section on the Hyderabad page, a `secure-automation` service, and the FAQ |

## Layout pass (after the audit fixes)

The remediation added a lot of copy, which made every page very tall. Density pass since:

- Hero sized to exactly one viewport (`calc(100svh - 4rem)` under the fixed header), fluid `clamp()` type, buttons wrap instead of stacking.
- Section padding halved (`py-24` → `py-12 md:py-20`), cards `rounded-2xl p-7` → `rounded-xl p-4/5`, headings `text-5xl` → `text-2xl md:text-4xl`.
- FAQ and the industry detail lists are now native `<details>`. **This does not undo audit #29** — `<details>` content is present in the static HTML and is read by crawlers and LLMs; it is only visually collapsed. Verified: all 10 answers and all 6 industry lists are in the prerendered HTML, and the FAQPage schema still emits 10 `Question` nodes.
- Process timeline is 2-up on mobile instead of stacked; services grid is 3-up on desktop.
- Header nav moved from the `md` to the `lg` breakpoint — five links plus a CTA crowded at tablet width — and the menu button now covers everything below `lg`.
- Form inputs set to 16px base so iOS Safari does not zoom on focus.
- `scroll-padding-top` added so `#faq` and other anchors clear the fixed header.

## Needs you — cannot be done from the repo

**Before deploy**

1. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (see `.env.example`). Until then `/api/contact` returns 503 and the form tells visitors to email directly — deliberately, so it never fakes a success.
2. Create the `hello@avlokai.com` and `grievance@avlokai.com` mailboxes. Both are published across the site now.
3. Fill the entity fields in `src/lib/company.ts`.
4. Confirm the www redirect direction actually matches `SITE_URL`.

**Manual verification the audit asked for (#1, #26, and Search Console)**

5. `https://www.avlokai.com/robots.txt` — confirm the generated file is what's served.
6. Search Console → URL Inspection on `/`, `/services`, `/privacy`.
7. Register the www property in Search Console and submit `/sitemap.xml`.

**Legal — the audit's highest-value spend**

8. Have counsel review `/privacy` and `/terms` before relying on them. They are written to cover the gaps the audit identified (IP, liability cap, governing law, DPDP obligations, sub-processor disclosure) and are a large improvement on three bullets, but they are not a substitute for review. Two things to confirm with counsel: the liability cap basis (currently 12 months' fees) and the 8-year retention period.
9. Verify the sub-processor list in `src/lib/subprocessors.ts` matches what you actually run. It's written from the stack the site describes — correct it if anything's wrong, since it's now a published disclosure.

**Off-site (#27 — the audit rates this above every on-site fix)**

10. In order: Google Business Profile → Clutch → GoodFirms → DesignRush → LinkedIn company page (complete) → Crunchbase → TheManifest → Sortlist → IndiaMART → Justdial → F6S.

**Deferred (#22, #23, #24) — subdomain consolidation**

11. `catalogue.`, `sushanth.`, `rohith.`, `nathaniel.` still render as empty client-side documents and still split domain authority five ways. Moving them to `/catalogue/` and `/team/<name>/` in this app is a separate piece of work — the content lives outside this repo. The footer and header still link to `catalogue.avlokai.com` in the meantime.

**Not addressed**

12. #32 (nothing verifiable): needs a named client, a logo wall, or an attributable testimonial. No amount of copy fixes it — the placeholders were removed rather than replaced.
