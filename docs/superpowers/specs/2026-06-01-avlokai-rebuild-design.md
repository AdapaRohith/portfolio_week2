# AvlokAI Site Rebuild — Design

**Date:** 2026-06-01
**Project:** portfolio_week2 (AvlokAI — AI automation agency marketing/portfolio site)
**Goal:** Rebuild the site from scratch with a completely new, motion-led interactive design. Remove all 3D/Spline. Replace the dead Spline hero with a code-built animated automation flow. Add a Work/case-studies section and a stats band. Keep the neutral zinc base + light/dark, introduce a single electric-blue accent. Build using the ui-ux-pro-max skill for design intelligence.

---

## 1. Design Direction

**Motion-led interactive.** The hero centerpiece is a bespoke animated automation flow (nodes connect, data pulses travel along edges, stages light up in sequence and react to scroll) built in SVG + framer-motion — no Spline, no external 3D. Story-scroll sections animate in below. Neutral zinc canvas, single electric-blue accent, refined typography, consistent motion system with a `prefers-reduced-motion` fallback throughout.

## 2. Tech Stack & Cleanup

**Keep:**
- Next.js 14 (App Router), Tailwind CSS 3, framer-motion (already installed), lucide-react, clsx, tailwind-merge.
- The existing zinc/slate light+dark token engine: `ThemeProvider`, the no-flash inline script in `layout.tsx`, the Header Sun/Moon toggle. Reuse as-is.

**Add:**
- Electric-blue accent tokens (see §3).
- `Space Grotesk` display font + keep `Inter` (body) + `JetBrains Mono` (labels/eyebrows/metrics), all via the existing Google Fonts `@import` in `globals.css`.

**Delete (3D removal):**
- npm deps: `@splinetool/react-spline`, `@splinetool/runtime`.
- Components: `src/components/SplineScene.tsx`, `src/components/ScrollSplineSection.tsx`, `src/components/MilkyGalaxy.tsx`.
- Assets: `public/*.splinecode` (e.g. `scene-clean.splinecode`).
- The old `src/components/FlowDiagram/` (react-flow based: `index.tsx`, `CustomNode.tsx`, `NodePanel.tsx`) is replaced by the new hero flow. Remove it and the `@xyflow/react` dep once nothing imports it.
- Remove `.spline-neutral` CSS rules from `globals.css` (no longer needed).

**Decision — old components:** `AnimatedGrid.tsx`, `Constraints.tsx`, `DemoPlayground.tsx`, `AutomationWizard.tsx`, `ProcessFlow.tsx`, `Hero.tsx`, `ui/stagger-testimonials.tsx` are superseded by the new section components. Replace `Hero`, `ProcessFlow` (→ `ProcessTimeline`), and testimonials. `DemoPlayground` and `AutomationWizard` are interactive toys not part of the new IA — remove from the home page; delete the files if no other page imports them. `AnimatedGrid` may be reused as a subtle background texture behind a section (optional, keep if used).

## 3. Palette & Typography

**Accent tokens** added to both theme sets in `globals.css` (existing zinc neutrals unchanged):

| Token | Light (`:root`) | Dark (`.dark`) |
|---|---|---|
| `--accent` | `#2563eb` (blue-600) | `#3b82f6` (blue-500) |
| `--accent-dim` | `#1d4ed8` (blue-700) | `#60a5fa` (blue-400) |
| `--accent-soft` | `rgba(37,99,235,0.08)` | `rgba(59,130,246,0.12)` |

`--accent` replaces the current ink-neutral accent. Tailwind `accent`/`accent-dim` tokens already map to these vars; add `accent-soft` to `tailwind.config.js`. CTAs become blue; links, focus rings, and flow pulses use accent. `gradient-text` utility regains a subtle role: `linear-gradient(135deg, var(--accent), var(--accent-dim))` clipped to text, used sparingly on hero keywords.

**Fonts:**
- Display (`font-display`): `Space Grotesk` — hero headlines, section titles.
- Body (`font-sans`): `Inter`.
- Mono (`font-mono`): `JetBrains Mono` — eyebrows, stat numbers, case-study tags, nav micro-labels.

Add `font-display` to `tailwind.config.js` `fontFamily`.

**Contrast:** all text/bg pairs meet WCAG AA in both themes. Blue-600 on zinc-50 ≈ 5.2:1 (AA). Blue-500 on zinc-950 ≈ 6:1 (AA). White on blue-600 ≈ 4.6:1 (AA) for button labels. ui-ux-pro-max validates final values.

## 4. Information Architecture (Home, top → bottom)

1. **Header** — logo, nav (Services · Work · Industries · Contact), theme toggle. Reuse existing Header, update nav links + restyle.
2. **Hero** (`AutomationFlowHero`) — left: eyebrow (mono) + display headline + subhead + dual CTA (`Start a project` primary, `See it work` secondary scroll-to). Right: animated automation flow. Stacks on mobile.
3. **StatsBand** — 3–4 mono counters that count up on scroll-in. Placeholder: `40+ automations shipped`, `12,000+ hours saved`, `6 industries`, `99.9% uptime`.
4. **ServicesBento** — asymmetric bento grid of core services (rebuilt from current services data).
5. **WorkShowcase** (NEW) — responsive card grid of case studies from a `caseStudies` data array. Each card: client/sector tag (mono), title, one-line problem, result metric (big number), hover lift. Placeholder content drafted in spec §6.
6. **IndustriesBand** — compact horizontal band/marquee of industry chips with icons (rebuilt from current industries list).
7. **ProcessTimeline** — 4-step vertical/horizontal timeline: Audit → Architect → Build → Optimize, animated connector line on scroll.
8. **TeamSection** (rebuilt) — keep members data (Sushanth, Rohith, Nathaniel), new card design, neutral+accent.
9. **Testimonials** (rebuilt) — simple animated quote cards (replace the old stagger component).
10. **FinalCTA** — keep contact actions (email, call, WhatsApp, services link, socials), restyled with accent.
11. **Footer** — keep structure (Company / Resources / Legal / Contact), restyle.

**Subpages:**
- `/services`, `/industries` — visually rebuilt to match new system (bento/cards, accent, motion). Same content/data.
- `/privacy`, `/terms`, `/data-delete` — light reskin only (typography + accent tokens; no structural change).
- `/work/[slug]` detail pages — OUT OF SCOPE for v1 (home `WorkShowcase` only; cards link to `#` or anchor for now).

## 5. Component Inventory

New/rebuilt components in `src/components/`, each single-responsibility:
- `AutomationFlowHero.tsx` — hero + the animated SVG flow (may split flow into `AutomationFlow.tsx` sub-component if it grows past ~150 lines).
- `StatsBand.tsx` — counter band (intersection-observer count-up).
- `ServicesBento.tsx` — services bento grid.
- `WorkShowcase.tsx` + `src/lib/case-studies.ts` — case-study data + cards.
- `IndustriesBand.tsx`.
- `ProcessTimeline.tsx`.
- `TeamSection.tsx` (rebuild in place).
- `Testimonials.tsx` (new, replaces `ui/stagger-testimonials.tsx`).
- `FinalCTA.tsx` (rebuild in place), `Header.tsx` (restyle in place).
- `src/lib/motion.ts` — shared framer-motion variant presets + reduced-motion helper.

Shared data: extract services + industries arrays into `src/lib/` modules so home sections and subpages reuse them (currently duplicated inline).

## 6. The Animated Automation Flow (hero centerpiece)

**Approach (chosen):** SVG paths + framer-motion. Rejected alternatives: full-canvas particle mesh (less on-brand than a literal automation graph); Lottie (adds dependency + asset pipeline).

**Structure:** 5 nodes laid out left→right with slight vertical offset: `Trigger → Filter → AI → Action → Output`, each a rounded rect/pill with a lucide icon + mono label. Curved `<path>` connectors between consecutive nodes.

**Animation (loop):**
- On mount, nodes fade/scale in left-to-right (stagger).
- Pulse dots (small accent circles) animate along each connector path repeatedly using `offsetDistance`/`motion` along the path, giving a "data flowing" effect.
- Active node glows (accent box-shadow) in sequence, synced to the pulse arrival.
- Scroll reactivity: tie a framer-motion `useScroll` progress to advance/intensify the flow as the hero scrolls (subtle — e.g. pulse speed or completion ring). Keep lightweight.

**Reduced motion:** `useReducedMotion()` → render the full static graph (all nodes visible, no pulses, no glow loop).

**Performance:** pure SVG + transform/opacity animations (GPU-friendly), no heavy runtime. Lazy/`'use client'` only this component.

**Placeholder case-study data** (`src/lib/case-studies.ts`, user replaces with real):
```
[
  { sector: 'Manufacturing', title: 'Predictive maintenance pipeline', problem: 'Unplanned line downtime cost ~₹4L/month.', metric: '38%', metricLabel: 'less downtime' },
  { sector: 'E-Commerce',    title: 'Omnichannel inventory sync',     problem: 'Oversells across 4 marketplaces.',        metric: '0',  metricLabel: 'oversells / mo' },
  { sector: 'Healthcare',    title: 'Claims processing automation',   problem: 'Manual claims took 6+ days.',             metric: '5x', metricLabel: 'faster claims' },
  { sector: 'Real Estate',   title: 'Lead capture & routing',         problem: 'Leads lost across portals/WhatsApp.',     metric: '2.4x',metricLabel: 'more qualified leads' },
]
```

## 7. Motion System

`src/lib/motion.ts` exports reusable variants: `fadeUp`, `staggerContainer`, `scaleIn`, plus a `useMotionSafe()` wrapper that returns no-op variants when `useReducedMotion()` is true. Standard tokens: duration `0.5s`, ease `[0.21, 0.47, 0.32, 0.98]`, stagger `0.08s`. Sections use `whileInView` with `viewport={{ once: true, margin: '-80px' }}`.

## 8. Out of Scope / Preserved

- `src/app/api/whatsapp-brochure/route.tsx` — untouched (gold OG image).
- Real marketing copy, real metrics, real case-study content, real testimonials — placeholders provided; user replaces.
- `/work/[slug]` detail pages — future milestone.
- SEO metadata in `layout.tsx` — preserve existing (title/description/OG/jsonLd) verbatim.

## 9. Verification

- `npm run build` passes clean; no references to deleted Spline/FlowDiagram modules; `@splinetool/*` and `@xyflow/react` removed from `package.json` and no longer imported.
- Grep gate: no `splinetool`, `splinecode`, `MilkyGalaxy`, `ScrollSplineSection` imports remain in `src/`.
- Light AND dark mode visually correct on every route; theme toggle persists; no-flash intact.
- `prefers-reduced-motion` disables hero loop + section animations (static fallback renders).
- All text meets WCAG AA contrast in both themes.
- Responsive: hero stacks, bento reflows, nav collapses to mobile menu at < md.
- Lighthouse: no major regressions; hero animation does not block initial paint (it is client-only and below the fold-safe).

## 10. Build Approach

1. **ui-ux-pro-max** — generate/validate the design system: blue+zinc palette tokens, Space Grotesk + Inter + JetBrains Mono pairing, bento layout, motion guidance, accessibility/contrast check.
2. Token + font + cleanup foundation (globals.css, tailwind.config, delete Spline/FlowDiagram, prune deps).
3. Shared libs: `lib/motion.ts`, `lib/services.ts`, `lib/industries.ts`, `lib/case-studies.ts`.
4. Build sections in IA order; `AutomationFlowHero` first (validates the centerpiece), then the rest.
5. Rebuild subpages; reskin legal pages.
6. Verification gate (build + grep + visual both themes + reduced-motion + responsive).
