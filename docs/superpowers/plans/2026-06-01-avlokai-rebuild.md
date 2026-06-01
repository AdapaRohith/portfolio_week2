# AvlokAI Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AvlokAI site with a motion-led interactive design — animated automation-flow hero (no Spline), work/case-studies, stats band, electric-blue accent on a neutral zinc base, Space Grotesk display type, light + dark.

**Architecture:** Reuse the existing Tailwind CSS-variable theme engine (ThemeProvider + no-flash script + toggle). Add a blue accent + Space Grotesk. Delete all Spline/react-flow code. Build focused single-responsibility section components composed on the home page, driven by shared data libs in `src/lib/` and a shared framer-motion variant module. All animation gated by `prefers-reduced-motion`.

**Tech Stack:** Next.js 14 (App Router), Tailwind 3, framer-motion, lucide-react, clsx, tailwind-merge. Fonts via Google Fonts `@import`. No new runtime dependencies; remove `@splinetool/*` and `@xyflow/react`.

**Design system (from ui-ux-pro-max):** Light — primary `#18181b`, accent `#2563eb`, bg `#fafafa`, border `#e4e4e7`. Dark — accent desaturated to `#3b82f6`/`#60a5fa`. Reduced-motion = HIGH severity (gate everything). Easing: ease-out enter, ease-in exit, never linear. No scroll-jacking.

**Verification model:** No unit tests (visual/marketing site). Each task verifies via `npm run build` (or `npx tsc --noEmit` for non-page modules) + targeted grep gates + manual visual check in both themes. Commit after each task.

---

### Task 1: Foundation — fonts + blue accent tokens + remove spline CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Update the font import (line 1 of globals.css)**

Replace the existing `@import url('...Inter...JetBrains+Mono...')` line with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

- [ ] **Step 2: Add blue accent to both token sets**

In the `:root` block, replace the `--accent` and `--accent-dim` lines and add `--accent-soft`:

```css
    --accent: #2563eb;
    --accent-dim: #1d4ed8;
    --accent-soft: rgba(37, 99, 235, 0.08);
```

In the `.dark` block, replace `--accent`/`--accent-dim` and add `--accent-soft`:

```css
    --accent: #3b82f6;
    --accent-dim: #60a5fa;
    --accent-soft: rgba(59, 130, 246, 0.12);
```

- [ ] **Step 3: Restore gradient-text as a subtle accent gradient**

Replace the current `.gradient-text` rule with:

```css
.gradient-text {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

- [ ] **Step 4: Remove the now-unused `.spline-neutral` rules**

Delete the `.spline-neutral` and `.dark .spline-neutral` blocks (added in the prior refactor).

- [ ] **Step 5: Update tailwind.config.js**

Add `'accent-soft'` to `colors` and a `display` font family. The `colors` block becomes:

```js
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                accent: 'var(--accent)',
                'accent-dim': 'var(--accent-dim)',
                'accent-soft': 'var(--accent-soft)',
                muted: 'var(--muted)',
                border: 'var(--border)',
                card: 'var(--card)',
                'card-hover': 'var(--card-hover)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build passes. (Pages still reference old components — they are replaced in later tasks; this task only changes tokens/fonts, which are backward-compatible.)

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css tailwind.config.js
git commit -m "feat: blue accent tokens + Space Grotesk display font"
```

---

### Task 2: Delete Spline + react-flow code and prune dependencies

**Files:**
- Delete: `src/components/SplineScene.tsx`, `src/components/ScrollSplineSection.tsx`, `src/components/MilkyGalaxy.tsx`
- Delete: `src/components/FlowDiagram/` (whole dir: `index.tsx`, `CustomNode.tsx`, `NodePanel.tsx`)
- Delete: `public/scene-clean.splinecode` (and any other `*.splinecode`)
- Modify: `src/app/page.tsx` (remove imports/usages of deleted components — full rewrite happens in Task 14; here just make it compile)
- Modify: `package.json`

- [ ] **Step 1: Confirm no other importers**

Run:
```bash
grep -rn "SplineScene\|ScrollSplineSection\|MilkyGalaxy\|FlowDiagram\|@splinetool\|@xyflow" src/ --include=*.tsx --include=*.ts
```
Note every file that imports them. Only `src/app/page.tsx` (and the deleted files themselves) should reference them. If another file does, handle it in this task.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/SplineScene.tsx src/components/ScrollSplineSection.tsx src/components/MilkyGalaxy.tsx
git rm -r src/components/FlowDiagram
git rm public/scene-clean.splinecode
```
(If `git rm` reports a path not tracked, delete it with the editor/`rm` instead.)

- [ ] **Step 3: Temporarily simplify page.tsx so it compiles**

In `src/app/page.tsx`, remove the imports for `SplineScene` and `FlowDiagram` and remove the JSX blocks that used them (the hero Spline `<div>` and the `<FlowDiagram />` wrapper). Leave the rest. This is a throwaway interim state — Task 14 fully rewrites this file. Just ensure no dangling references remain.

- [ ] **Step 4: Prune dependencies**

In `package.json`, remove these three lines from `dependencies`:
```
"@splinetool/react-spline": "^4.1.0",
"@splinetool/runtime": "^1.12.58",
"@xyflow/react": "^12.0.0",
```
Then run: `npm install`
Expected: lockfile updates, packages removed.

- [ ] **Step 5: Verify**

Run:
```bash
grep -rn "splinetool\|splinecode\|MilkyGalaxy\|ScrollSplineSection\|FlowDiagram\|@xyflow" src/ ; npm run build
```
Expected: grep returns ZERO matches; build passes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Spline 3D + react-flow code and deps"
```

---

### Task 3: Shared motion variants module

**Files:**
- Create: `src/lib/motion.ts`

- [ ] **Step 1: Create the motion module**

Create `src/lib/motion.ts`:

```ts
import type { Variants } from 'framer-motion'

// Shared easing + timing tokens (ease-out enter; never linear).
export const EASE = [0.21, 0.47, 0.32, 0.98] as const
export const DURATION = 0.5

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: DURATION, ease: EASE } },
}

export const staggerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

// Standard viewport config for scroll-in reveals.
export const inView = { once: true, margin: '-80px' } as const
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: shared framer-motion variant presets"
```

---

### Task 4: Shared data libs (services, industries, case studies, stats)

**Files:**
- Create: `src/lib/services.ts`, `src/lib/industries.ts`, `src/lib/case-studies.ts`, `src/lib/stats.ts`

- [ ] **Step 1: Create `src/lib/services.ts`**

```ts
import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Service {
    icon: LucideIcon
    title: string
    slug: string
    description: string
    highlights: string[]
}

export const services: Service[] = [
    {
        icon: MonitorCog, title: 'IT Services & Software', slug: 'it-services',
        description: 'AI-powered lead qualification, automated invoicing, bug triage, and performance dashboards across your development lifecycle.',
        highlights: ['Lead Qualification & Pipeline', 'Invoice & Billing Reconciliation', 'Bug Triage & Assignment', 'Performance Dashboards'],
    },
    {
        icon: ShoppingCart, title: 'E-Commerce & Retail', slug: 'ecommerce',
        description: 'Omnichannel inventory sync, AI review analysis, order fulfillment, and pricing intelligence to scale online retail.',
        highlights: ['Omnichannel Inventory Sync', 'Review Sentiment Analysis', 'Automated Fulfillment'],
    },
    {
        icon: Factory, title: 'Manufacturing & Logistics', slug: 'manufacturing',
        description: 'Predictive maintenance, computer-vision quality control, and intelligent supply-chain visibility that cut downtime.',
        highlights: ['Predictive Maintenance', 'Defect Detection (CV)', 'Supply Chain Visibility', 'Smart Reordering'],
    },
    {
        icon: Hospital, title: 'Healthcare & Pharma', slug: 'healthcare',
        description: 'Patient scheduling, claims processing, and HIPAA compliance auditing so staff focus on care.',
        highlights: ['Scheduling & Reminders', 'Claims Processing', 'HIPAA Compliance Audit'],
    },
    {
        icon: Building2, title: 'Real Estate & Construction', slug: 'real-estate',
        description: 'AI lead management, multi-portal listing sync, and site-progress tracking across the property lifecycle.',
        highlights: ['Lead Management', 'Listing Sync', 'Milestone Reminders', 'Progress Tracking'],
    },
    {
        icon: Smartphone, title: 'SMB Micro-Automations', slug: 'smb',
        description: 'Affordable, ready-to-deploy automations: WhatsApp broadcasts, review requests, reminders, daily summaries.',
        highlights: ['WhatsApp Broadcasts', 'Review Requests', 'Appointment Reminders', 'Sales Summaries'],
    },
]
```

- [ ] **Step 2: Create `src/lib/industries.ts`**

```ts
import { MonitorCog, ShoppingCart, Factory, Hospital, Building2, Smartphone, type LucideIcon } from 'lucide-react'

export interface Industry { label: string; icon: LucideIcon }

export const industries: Industry[] = [
    { label: 'IT Services', icon: MonitorCog },
    { label: 'E-Commerce', icon: ShoppingCart },
    { label: 'Manufacturing', icon: Factory },
    { label: 'Healthcare', icon: Hospital },
    { label: 'Real Estate', icon: Building2 },
    { label: 'SMB', icon: Smartphone },
]
```

- [ ] **Step 3: Create `src/lib/case-studies.ts`** (placeholder content — user replaces with real)

```ts
export interface CaseStudy {
    sector: string
    title: string
    problem: string
    metric: string
    metricLabel: string
}

// PLACEHOLDER data — replace with real client outcomes before launch.
export const caseStudies: CaseStudy[] = [
    { sector: 'Manufacturing', title: 'Predictive maintenance pipeline', problem: 'Unplanned line downtime drained budget every month.', metric: '38%', metricLabel: 'less downtime' },
    { sector: 'E-Commerce', title: 'Omnichannel inventory sync', problem: 'Oversells across four marketplaces hurt ratings.', metric: '0', metricLabel: 'oversells / month' },
    { sector: 'Healthcare', title: 'Claims processing automation', problem: 'Manual claims took six-plus days to clear.', metric: '5x', metricLabel: 'faster claims' },
    { sector: 'Real Estate', title: 'Lead capture & routing', problem: 'Leads leaked across portals, calls, and WhatsApp.', metric: '2.4x', metricLabel: 'more qualified leads' },
]
```

- [ ] **Step 4: Create `src/lib/stats.ts`** (placeholder numbers — user replaces)

```ts
export interface Stat { value: number; suffix: string; label: string }

// PLACEHOLDER metrics — replace with real numbers before launch.
export const stats: Stat[] = [
    { value: 40, suffix: '+', label: 'automations shipped' },
    { value: 12000, suffix: '+', label: 'hours saved' },
    { value: 6, suffix: '', label: 'industries served' },
    { value: 99, suffix: '%', label: 'uptime' },
]
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/services.ts src/lib/industries.ts src/lib/case-studies.ts src/lib/stats.ts
git commit -m "feat: shared data libs (services, industries, case studies, stats)"
```

---

### Task 5: AutomationFlowHero — the animated centerpiece

**Files:**
- Create: `src/components/AutomationFlow.tsx` (the animated SVG graph)
- Create: `src/components/AutomationFlowHero.tsx` (hero layout + flow)

- [ ] **Step 1: Create the animated flow `src/components/AutomationFlow.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Zap, Filter, Bot, Cog, Send, type LucideIcon } from 'lucide-react'

interface FlowNode { id: string; label: string; icon: LucideIcon; x: number; y: number }

const NODES: FlowNode[] = [
    { id: 'trigger', label: 'Trigger', icon: Zap, x: 40, y: 60 },
    { id: 'filter', label: 'Filter', icon: Filter, x: 170, y: 30 },
    { id: 'ai', label: 'AI', icon: Bot, x: 300, y: 90 },
    { id: 'action', label: 'Action', icon: Cog, x: 430, y: 40 },
    { id: 'output', label: 'Output', icon: Send, x: 560, y: 80 },
]

// Curved connector path between two node centers (node box ~ 96x56, center offset).
function connector(a: FlowNode, b: FlowNode): string {
    const ax = a.x + 48, ay = a.y + 28
    const bx = b.x + 48, by = b.y + 28
    const mx = (ax + bx) / 2
    return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`
}

export default function AutomationFlow() {
    const reduce = useReducedMotion()
    const edges = NODES.slice(0, -1).map((n, i) => ({ d: connector(n, NODES[i + 1]), i }))

    return (
        <svg viewBox="0 0 660 160" className="w-full h-auto" role="img"
            aria-label="Animated automation pipeline: Trigger, Filter, AI, Action, Output">
            {/* connectors */}
            {edges.map(({ d, i }) => (
                <g key={i}>
                    <path d={d} fill="none" stroke="var(--border)" strokeWidth={2} />
                    {!reduce && (
                        <circle r={4} fill="var(--accent)">
                            <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                        </circle>
                    )}
                </g>
            ))}
            {/* nodes */}
            {NODES.map((n, i) => {
                const Icon = n.icon
                return (
                    <motion.g key={n.id}
                        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: reduce ? 0 : i * 0.12, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        <rect x={n.x} y={n.y} width={96} height={56} rx={12}
                            fill="var(--card)" stroke="var(--border)" strokeWidth={1.5} />
                        <foreignObject x={n.x} y={n.y} width={96} height={56}>
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                                <span className="font-mono text-[10px] text-muted">{n.label}</span>
                            </div>
                        </foreignObject>
                    </motion.g>
                )
            })}
        </svg>
    )
}
```

- [ ] **Step 2: Create `src/components/AutomationFlowHero.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AutomationFlow from './AutomationFlow'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface Props { onPrimaryCTA?: () => void; onSecondaryCTA?: () => void }

export default function AutomationFlowHero({ onPrimaryCTA, onSecondaryCTA }: Props) {
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
                        <button onClick={onPrimaryCTA}
                            className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button onClick={onSecondaryCTA}
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

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors. (Visual check happens after page assembly in Task 14.)

- [ ] **Step 4: Commit**

```bash
git add src/components/AutomationFlow.tsx src/components/AutomationFlowHero.tsx
git commit -m "feat: animated automation-flow hero (replaces Spline)"
```

---

### Task 6: StatsBand

**Files:**
- Create: `src/components/StatsBand.tsx`

- [ ] **Step 1: Create `src/components/StatsBand.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { stats } from '@/lib/stats'
import { inView } from '@/lib/motion'

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const visible = useInView(ref, { once: true, margin: '-80px' })
    const reduce = useReducedMotion()
    const [n, setN] = useState(reduce ? value : 0)

    useEffect(() => {
        if (!visible || reduce) { setN(value); return }
        let raf = 0
        const start = performance.now()
        const dur = 1200
        const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
            setN(Math.round(value * eased))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [visible, value, reduce])

    return <span ref={ref} className="font-mono tabular-nums">{n.toLocaleString()}{suffix}</span>
}

export default function StatsBand() {
    return (
        <section className="py-16 px-6 border-y border-border bg-accent-soft">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                            <Counter value={s.value} suffix={s.suffix} />
                        </div>
                        <div className="text-sm text-muted">{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/StatsBand.tsx
git commit -m "feat: stats band with count-up on scroll"
```

---

### Task 7: ServicesBento

**Files:**
- Create: `src/components/ServicesBento.tsx`

- [ ] **Step 1: Create `src/components/ServicesBento.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/services'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

// Bento: first card spans 2 cols on desktop for asymmetry.
const spanClass = (i: number) => (i === 0 ? 'md:col-span-2' : '')

export default function ServicesBento() {
    return (
        <section id="services" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">What we build</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Automation, by domain.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid md:grid-cols-3 gap-4">
                    {services.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.slug} variants={fadeUp}
                                className={`group glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40 ${spanClass(i)}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </div>
                                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                                <p className="text-sm text-muted mb-4">{s.description}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="font-mono text-[11px] text-muted border border-border rounded-full px-2.5 py-1">{h}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </motion.div>
                <div className="mt-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors">
                        View all services <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesBento.tsx
git commit -m "feat: services bento grid"
```

---

### Task 8: WorkShowcase

**Files:**
- Create: `src/components/WorkShowcase.tsx`

- [ ] **Step 1: Create `src/components/WorkShowcase.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { caseStudies } from '@/lib/case-studies'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

export default function WorkShowcase() {
    return (
        <section id="work" className="py-24 px-6 bg-card/40">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Selected work</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    Outcomes, not demos.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 gap-4">
                    {caseStudies.map((c) => (
                        <motion.article key={c.title} variants={fadeUp}
                            className="group glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                            <span className="font-mono text-[11px] tracking-wide uppercase text-accent">{c.sector}</span>
                            <h3 className="font-display text-xl font-semibold mt-2 mb-2">{c.title}</h3>
                            <p className="text-sm text-muted mb-6">{c.problem}</p>
                            <div className="flex items-baseline gap-2 border-t border-border pt-5">
                                <span className="font-display text-4xl font-bold text-foreground">{c.metric}</span>
                                <span className="text-sm text-muted">{c.metricLabel}</span>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WorkShowcase.tsx
git commit -m "feat: work/case-studies showcase"
```

---

### Task 9: IndustriesBand

**Files:**
- Create: `src/components/IndustriesBand.tsx`

- [ ] **Step 1: Create `src/components/IndustriesBand.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { industries } from '@/lib/industries'
import { inView } from '@/lib/motion'

export default function IndustriesBand() {
    return (
        <section id="industries" className="py-20 px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-5xl mx-auto text-center">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Industries</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-8">
                    Built for your sector.
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <span key={ind.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                                {ind.label}
                            </span>
                        )
                    })}
                </div>
                <Link href="/industries" className="inline-flex items-center gap-2 text-accent hover:text-accent-dim font-medium transition-colors">
                    Explore industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </motion.div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/IndustriesBand.tsx
git commit -m "feat: industries band"
```

---

### Task 10: ProcessTimeline

**Files:**
- Create: `src/components/ProcessTimeline.tsx`

- [ ] **Step 1: Create `src/components/ProcessTimeline.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { Search, Map, Wrench, TrendingUp, type LucideIcon } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Step { n: string; title: string; desc: string; icon: LucideIcon }

const steps: Step[] = [
    { n: '01', title: 'Audit', desc: 'We map your workflows and find the highest-ROI automation opportunities.', icon: Search },
    { n: '02', title: 'Architect', desc: 'A custom system blueprint with data flows, edge cases, and fail-safes.', icon: Map },
    { n: '03', title: 'Build', desc: 'Incremental delivery with testing, monitoring, and human-in-the-loop.', icon: Wrench },
    { n: '04', title: 'Optimize', desc: 'Continuous tracking and iteration based on real production data.', icon: TrendingUp },
]

export default function ProcessTimeline() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">How we work</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
                    From audit to autopilot.
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((s) => {
                        const Icon = s.icon
                        return (
                            <motion.div key={s.n} variants={fadeUp} className="relative glass-card rounded-2xl p-6">
                                <span className="font-mono text-xs text-accent">{s.n}</span>
                                <span className="absolute top-6 right-6 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <h3 className="font-display text-lg font-semibold mt-3 mb-2">{s.title}</h3>
                                <p className="text-sm text-muted">{s.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProcessTimeline.tsx
git commit -m "feat: process timeline section"
```

---

### Task 11: Rebuild TeamSection

**Files:**
- Rewrite: `src/components/TeamSection.tsx` (replace entire file)

- [ ] **Step 1: Replace `src/components/TeamSection.tsx` entirely**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Member { name: string; role: string; image: string; bio: string; url?: string }

const team: Member[] = [
    { name: 'Sushanth Kasturi', role: 'Founder & CEO', image: '/profile.jpg', bio: 'Drives innovation in AI-powered automation and builds systems that deliver measurable impact.', url: 'https://sushanth.avlokai.com/' },
    { name: 'Rohith', role: 'Co-Founder & CTO', image: '/aboutphoto.png', bio: 'Technical architect in scalable systems and machine learning. Turns complex challenges into elegant solutions.', url: 'https://rohith.avlokai.com/' },
    { name: 'Nathaniel Francis', role: 'Chief of Sales', image: '/nathan.jpg', bio: 'Leads the sales engine — forging partnerships and bringing intelligent automation to enterprises at scale.', url: 'https://nathaniel.avlokai.com/' },
]

export default function TeamSection() {
    return (
        <section className="py-24 px-6 bg-card/40">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Team</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">The people behind it.</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.map((m) => {
                        const card = (
                            <div className="group glass-card rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:border-accent/40">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border">
                                        <Image src={m.image} alt={`${m.name} — ${m.role}`} fill sizes="64px" className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-semibold">{m.name}</h3>
                                        <p className="font-mono text-xs text-accent">{m.role}</p>
                                    </div>
                                    {m.url && <ArrowUpRight className="h-4 w-4 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
                                </div>
                                <p className="text-sm text-muted">{m.bio}</p>
                            </div>
                        )
                        return m.url
                            ? <motion.div key={m.name} variants={fadeUp}><Link href={m.url} target="_blank" rel="noopener noreferrer">{card}</Link></motion.div>
                            : <motion.div key={m.name} variants={fadeUp}>{card}</motion.div>
                    })}
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors. Confirm `/profile.jpg`, `/aboutphoto.png`, `/nathan.jpg` exist in `public/` (they were used by the old component).

- [ ] **Step 3: Commit**

```bash
git add src/components/TeamSection.tsx
git commit -m "feat: rebuilt team section"
```

---

### Task 12: Testimonials (replaces stagger component)

**Files:**
- Create: `src/components/Testimonials.tsx`
- Delete: `src/components/ui/stagger-testimonials.tsx` (after page no longer imports it — page rewrite is Task 14; delete here and ensure nothing else imports it)

- [ ] **Step 1: Confirm importers**

Run: `grep -rn "stagger-testimonials\|StaggerTestimonials" src/`
Expected: only `src/app/page.tsx`. (Page is rewritten in Task 14 to use the new component.)

- [ ] **Step 2: Create `src/components/Testimonials.tsx`** (placeholder quotes — user replaces)

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
                        <motion.figure key={t.quote} variants={fadeUp} className="glass-card rounded-2xl p-7 flex flex-col">
                            <Quote className="h-6 w-6 text-accent mb-4" aria-hidden="true" />
                            <blockquote className="text-foreground mb-6 flex-1">{t.quote}</blockquote>
                            <figcaption>
                                <div className="font-display font-semibold text-sm">{t.name}</div>
                                <div className="font-mono text-xs text-muted">{t.role}</div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
```

- [ ] **Step 3: Delete the old component**

```bash
git rm src/components/ui/stagger-testimonials.tsx
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no errors (page still imports the old one until Task 14; if tsc errors on the missing import, proceed — Task 14 fixes the page; or do Task 14 immediately after). To keep this task green, you may instead delete the old file in Task 14 right after rewriting the page. Choose one; do not leave a dangling import committed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "feat: new testimonials section"
```

---

### Task 13: Rebuild FinalCTA + restyle Header

**Files:**
- Rewrite: `src/components/FinalCTA.tsx`
- Modify: `src/components/Header.tsx` (nav links + display font)

- [ ] **Step 1: Replace `src/components/FinalCTA.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { inView } from '@/lib/motion'

const GMAIL = 'https://mail.google.com/mail/u/0/?fs=1&to=avlokaibusiness@gmail.com&su=Automation%20Project%20Inquiry&tf=cm'

export default function FinalCTA() {
    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-soft pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
                className="max-w-3xl mx-auto text-center relative z-10">
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    Describe your workflow.<br /><span className="gradient-text">We&apos;ll architect the solution.</span>
                </h2>
                <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
                    No lengthy discovery. Share your operational challenge and get a tailored automation blueprint.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={GMAIL} target="_blank" rel="noopener noreferrer"
                        className="px-7 py-3.5 bg-accent hover:bg-accent-dim text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4" aria-hidden="true" /> Contact our team <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a href="tel:+919346672015"
                        className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" aria-hidden="true" /> Call us
                    </a>
                    <a href="https://wa.me/message/PMRZLGVTFGGEB1" target="_blank" rel="noopener noreferrer"
                        className="px-7 py-3.5 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-border">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
```

- [ ] **Step 2: Update Header nav + display font**

In `src/components/Header.tsx`:

(a) Replace the `navLinks` array with:
```tsx
const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/#industries', label: 'Industries' },
    { href: 'https://catalogue.avlokai.com', label: 'Catalogue', external: true },
]
```

(b) On the logo wordmark `<span>`, change `className="text-xl font-bold tracking-tight"` to `className="font-display text-xl font-bold tracking-tight"`.

(c) The `Contact Us` mailto buttons (desktop + mobile): change `text-background` to `text-white` so the label is legible on the blue accent in both themes. (Find both `bg-accent hover:bg-accent-dim text-background` and replace `text-background` → `text-white`.)

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/FinalCTA.tsx src/components/Header.tsx
git commit -m "feat: rebuilt final CTA + restyled header nav"
```

---

### Task 14: Assemble the home page

**Files:**
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` entirely**

```tsx
'use client'

import { useRef } from 'react'
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
    const workRef = useRef<HTMLDivElement>(null)

    const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    const scrollToWork = () => workRef.current?.scrollIntoView({ behavior: 'smooth' })

    return (
        <main className="relative">
            <AutomationFlowHero onPrimaryCTA={scrollToContact} onSecondaryCTA={scrollToWork} />
            <StatsBand />
            <ServicesBento />
            <div ref={workRef}><WorkShowcase /></div>
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

- [ ] **Step 2: Remove any now-orphaned old components**

Run: `grep -rln "AutomationWizard\|DemoPlayground\|ProcessFlow\|Constraints\|AnimatedGrid\|Hero'\|/Hero\"" src/app src/components`
For each old component no longer imported anywhere (`AutomationWizard.tsx`, `DemoPlayground.tsx`, `ProcessFlow.tsx`, `Constraints.tsx`, `Hero.tsx`, and `AnimatedGrid.tsx` if unused), delete it with `git rm`. Verify with a follow-up grep that nothing imports the file before deleting.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds, all 9 routes generate.

- [ ] **Step 4: Visual check**

Run: `npm run start`. Load `/` in both light and dark (toggle in header). Confirm: hero flow animates (pulses travel, nodes fade in), stats count up, all sections render, footer correct, no console errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble new motion-led home page; remove orphaned components"
```

---

### Task 15: Reskin subpages

**Files:**
- Rewrite: `src/app/services/page.tsx` (use shared `services` lib + new visual system)
- Rewrite: `src/app/industries/page.tsx` (use shared `industries` lib + new visual system)
- Modify: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/data-delete/page.tsx` (light reskin only)

- [ ] **Step 1: Rewrite `src/app/services/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { services } from '@/lib/services'

export const metadata: Metadata = {
    title: 'AI Automation Services | AvlokAI',
    description: 'Production-grade AI automation services across IT, e-commerce, manufacturing, healthcare, real estate, and SMB.',
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
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

- [ ] **Step 2: Rewrite `src/app/industries/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { industries } from '@/lib/industries'

export const metadata: Metadata = {
    title: 'Industries We Serve | AvlokAI',
    description: 'AI automation tailored to IT, e-commerce, manufacturing, healthcare, real estate, and small business.',
}

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 pb-20 px-6">
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
                    We tailor automation systems to the realities of each industry we serve.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((ind) => {
                        const Icon = ind.icon
                        return (
                            <div key={ind.label} className="glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent mb-4">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-xl font-semibold">{ind.label}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
```

- [ ] **Step 3: Light reskin of legal pages**

In `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/data-delete/page.tsx`: do NOT restructure. Only (a) add `font-display` to the main page `<h1>` heading class, and (b) confirm they use `text-foreground`/`text-muted`/`bg-accent`/`text-white` tokens (no raw saturated hex). The prior refactor already neutralized `data-delete`; verify with:
```bash
grep -nE "emerald|green-[0-9]|#[0-9a-fA-F]{6}" src/app/privacy/page.tsx src/app/terms/page.tsx src/app/data-delete/page.tsx
```
Fix any hit by swapping to a token. If the pages already look correct and use tokens, this step is a no-op beyond the `font-display` heading tweak.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build passes; `/services` and `/industries` generate.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: reskin services + industries pages; legal page polish"
```

---

### Task 16: Final verification gate

**Files:** none (verification only)

- [ ] **Step 1: Dead-reference grep gate**

Run:
```bash
grep -rn "splinetool\|splinecode\|MilkyGalaxy\|ScrollSplineSection\|FlowDiagram\|@xyflow\|stagger-testimonials\|SplineScene" src/
```
Expected: ZERO matches.

- [ ] **Step 2: Saturated-color gate (excluding the OG brochure)**

Run:
```bash
grep -rnE "emerald|green-[0-9]|(amber|rose|violet|cyan|purple|pink|teal|indigo)-[0-9]{3}" src/ --include=*.tsx | grep -v "whatsapp-brochure"
```
Expected: ZERO matches. (Blue accent is via tokens, not literal `blue-500`. Semantic `text-red-*` for errors/close, if any remain, are acceptable.)

- [ ] **Step 3: Dependency gate**

Run: `grep -nE "splinetool|xyflow" package.json`
Expected: ZERO matches.

- [ ] **Step 4: Full build**

Run: `npm run build`
Expected: succeeds, 9 routes, no type errors.

- [ ] **Step 5: Manual visual + reduced-motion pass**

Run `npm run start`. In BOTH themes (header toggle):
- `/` — hero flow animates; pulses travel; stats count up; bento, work, industries, process, team, testimonials, CTA, footer all render; blue accent reads correctly; AA contrast (white button text on blue, muted text on bg).
- `/services`, `/industries` — new card layouts, accent correct.
- `/privacy`, `/terms`, `/data-delete` — legible, tokenized.
- Toggle persists across reload; no-flash on hard reload.
- Enable OS "reduce motion" → reload `/`: hero renders static (all nodes visible, no pulses), counters show final values, section reveals are instant. No layout breakage.
- Responsive at 375 / 768 / 1024 / 1440: hero stacks, bento reflows, nav collapses to mobile menu, no horizontal scroll.

- [ ] **Step 6: Commit any fixes from the visual pass**

```bash
git add -A
git commit -m "fix: polish from final visual + reduced-motion pass"
```

---

## Notes for the Executor

- **Do NOT touch** `src/app/api/whatsapp-brochure/route.tsx` (gold OG image, out of scope).
- **Do NOT change** the SEO metadata, `jsonLd`, or the theme engine (`ThemeProvider`, no-flash script, toggle) in `src/app/layout.tsx` — preserve them. The new design reuses the existing theme infrastructure.
- Button label color on the blue accent is `text-white` (not `text-background`) so it stays legible in both themes (background flips per theme; the accent stays blue).
- `text-background` on accent would invert wrongly in light mode — always pair accent backgrounds with `text-white`.
- Placeholder content lives in `src/lib/case-studies.ts`, `src/lib/stats.ts`, and `Testimonials.tsx` — the user replaces these with real data; they are clearly commented.
- Tailwind `content` globs already cover `src/components` and `src/app`; the new `src/lib/*.ts` files only contain class strings inside `.tsx` consumers, so no Tailwind safelisting is needed (all classes appear literally in components).
- If `npx tsc --noEmit` is not wired, use `npm run build` for type verification instead.
