# Neutral Minimal Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark-only emerald theme with a minimal cool-neutral (zinc/slate) design system supporting light + dark modes, recoloring the 3D Spline models to neutral via CSS filters.

**Architecture:** All theme colors live as CSS custom properties in `globals.css`, split into a `:root` (light) set and a `.dark` (dark) set with identical variable names. Tailwind tokens already map to these vars, so tokenized markup is untouched. A no-flash inline script + a `ThemeProvider` + a header toggle manage the `dark` class on `<html>`. Remaining hardcoded emerald/green/saturated colors in site chrome get swapped to tokens.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, framer-motion, lucide-react, @splinetool/react-spline. No new dependencies.

**Verification model:** This is a theming refactor, not logic — there are no unit tests. Each task verifies via (a) `npx tsc --noEmit` or `npm run build`, (b) `grep` gates for banned color tokens, and (c) a manual visual check in both themes. Commit after each task.

**Banned-token grep gate (used repeatedly):**
```bash
# Must return ZERO matches in src/ EXCEPT src/app/api/whatsapp-brochure/route.tsx
grep -rnE "emerald|green-[0-9]|10b981|34d399|059669" src/ --include=*.tsx --include=*.ts --include=*.css | grep -v "whatsapp-brochure"
```

---

### Task 1: Theme tokens — light + dark CSS variable sets

**Files:**
- Modify: `src/app/globals.css:7-16` (`:root` block) and the derived utilities below it.

- [ ] **Step 1: Replace the `:root` block with light + dark token sets**

Replace lines 7-16 (current `:root { ... }`) with:

```css
:root {
    --background: #fafafa;
    --foreground: #18181b;
    --accent: #3f3f46;
    --accent-dim: #27272a;
    --muted: #71717a;
    --border: #e4e4e7;
    --card: #ffffff;
    --card-hover: #f4f4f5;
}

.dark {
    --background: #09090b;
    --foreground: #fafafa;
    --accent: #e4e4e7;
    --accent-dim: #a1a1aa;
    --muted: #a1a1aa;
    --border: #27272a;
    --card: #18181b;
    --card-hover: #27272a;
}

html {
    color-scheme: light dark;
}
```

- [ ] **Step 2: Neutralize the derived utilities**

In the same file, change `gradient-text`, `glass-card`, and `::selection` so they use neutral tokens (no emerald). Replace the existing `.gradient-text` rule (lines ~58-63) with:

```css
.gradient-text {
    color: var(--foreground);
}
```

Replace the existing `.glass-card` rule (lines ~65-69) with:

```css
.glass-card {
    background: color-mix(in srgb, var(--card) 80%, transparent);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
}
```

Replace the `::selection` rule (lines ~132-134) with:

```css
::selection {
    background: color-mix(in srgb, var(--accent) 30%, transparent);
}
```

- [ ] **Step 3: Add the Spline neutral-filter classes**

Append to `globals.css`:

```css
/* Neutralize 3D Spline models to match minimal palette */
.spline-neutral {
    filter: grayscale(1) contrast(0.95);
}

.dark .spline-neutral {
    filter: grayscale(1) brightness(0.9);
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: build succeeds (site still renders; default theme now light since no `.dark` class yet — that is added in Task 3).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: neutral zinc/slate light+dark token sets"
```

---

### Task 2: ThemeProvider + no-flash script

**Files:**
- Create: `src/components/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx` (add no-flash `<head>` script + wrap children)

- [ ] **Step 1: Create the ThemeProvider**

Create `src/components/ThemeProvider.tsx`:

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    // Sync state with the class the inline no-flash script already applied.
    useEffect(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }, [])

    const applyTheme = (next: Theme) => {
        setTheme(next)
        document.documentElement.classList.toggle('dark', next === 'dark')
        window.localStorage.setItem('theme', next)
    }

    const toggleTheme = () => applyTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
```

- [ ] **Step 2: Add the no-flash script + ThemeProvider to layout**

In `src/app/layout.tsx`, add the import at the top with the other imports:

```tsx
import { ThemeProvider } from '@/components/ThemeProvider'
```

Replace the `return ( ... )` body (currently lines ~99-111) with:

```tsx
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
                    }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ThemeProvider>
                    <Header />
                    {children}
                    <FloatingPhonePopup />
                </ThemeProvider>
            </body>
        </html>
    )
```

- [ ] **Step 3: Verify build + no-flash**

Run: `npm run build && npm run start`
Expected: build passes. Load the site: theme matches OS preference with no light→dark flicker on hard reload.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeProvider.tsx src/app/layout.tsx
git commit -m "feat: theme provider with no-flash system-preference init"
```

---

### Task 3: Header theme toggle

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Import the toggle deps**

At the top of `src/components/Header.tsx`, add to the existing imports:

```tsx
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
```

- [ ] **Step 2: Read theme in the component**

Inside `export default function Header()`, just below `const [menuOpen, setMenuOpen] = useState(false)`, add:

```tsx
    const { theme, toggleTheme } = useTheme()
```

- [ ] **Step 3: Add the desktop toggle button**

In the desktop `<nav>` (the `hidden md:flex` block), immediately before the `Contact Us` anchor, insert:

```tsx
                    <button
                        onClick={toggleTheme}
                        className="text-muted hover:text-foreground transition-colors p-2 rounded-lg"
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
```

- [ ] **Step 4: Add the mobile toggle button**

In the mobile menu `<div className="px-6 py-4 flex flex-col gap-4">`, immediately before the `Contact Us` anchor, insert:

```tsx
                            <button
                                onClick={() => { toggleTheme(); setMenuOpen(false) }}
                                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors py-2"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                            </button>
```

- [ ] **Step 5: Verify toggle works**

Run: `npm run build`
Expected: build passes. In browser, clicking the toggle flips theme instantly, persists across reload (check `localStorage.theme`), and overrides OS preference.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: header light/dark toggle (desktop + mobile)"
```

---

### Task 4: Spline neutral filter wrapper

**Files:**
- Modify: `src/components/SplineScene.tsx:51`

- [ ] **Step 1: Add `spline-neutral` class to the container**

In `SplineScene.tsx`, change the container `className` (line ~51) from:

```tsx
            className={`spline-scene-container relative w-full h-full flex items-center justify-center ${className ?? ''}`}
```

to:

```tsx
            className={`spline-scene-container spline-neutral relative w-full h-full flex items-center justify-center ${className ?? ''}`}
```

- [ ] **Step 2: Verify both themes**

Run: `npm run build`
Expected: build passes. In browser, the 3D model renders grayscale/neutral in both light and dark modes with no saturated color bleed. If too dark/washed, tune the `.spline-neutral` filter values in `globals.css` (Task 1 Step 3).

- [ ] **Step 3: Commit**

```bash
git add src/components/SplineScene.tsx
git commit -m "feat: neutralize 3D Spline models via css filter"
```

---

### Task 5: Fix hardcoded emerald in FinalCTA

**Files:**
- Modify: `src/components/FinalCTA.tsx:71`

- [ ] **Step 1: Neutralize the WhatsApp button**

Change the WhatsApp anchor `className` (line ~71) from:

```tsx
                        className="px-8 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 border border-emerald-500/20 group hover:scale-105"
```

to:

```tsx
                        className="px-8 py-4 glass-card hover:bg-card-hover text-foreground font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 border border-border group hover:scale-105"
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build passes. WhatsApp button now matches the other neutral CTA buttons. (The `from-accent/5` gradient on line 9 is now neutral automatically via the token — leave it.)

- [ ] **Step 3: Commit**

```bash
git add src/components/FinalCTA.tsx
git commit -m "fix: neutralize emerald whatsapp cta in FinalCTA"
```

---

### Task 6: Fix hardcoded emerald in FloatingPhonePopup

**Files:**
- Modify: `src/components/FloatingPhonePopup.tsx:36`

- [ ] **Step 1: Neutralize the WhatsApp link**

Change the WhatsApp anchor `className` (line ~36) from:

```tsx
                                className="text-emerald-500 tracking-wide font-semibold hover:text-emerald-400 transition-colors flex items-center gap-2"
```

to:

```tsx
                                className="text-foreground tracking-wide font-semibold hover:text-accent transition-colors flex items-center gap-2"
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build passes. (Note line 50 already uses `text-red-500` for the close state — leave that; it is a destructive/close affordance, not brand color. See Task 9 note.)

- [ ] **Step 3: Commit**

```bash
git add src/components/FloatingPhonePopup.tsx
git commit -m "fix: neutralize emerald whatsapp link in FloatingPhonePopup"
```

---

### Task 7: Neutralize sentiment colors in DemoPlayground

**Files:**
- Modify: `src/components/DemoPlayground.tsx:34-43`

- [ ] **Step 1: Replace the `getSentimentColor` hue map with weight/opacity**

Per the spec's neutral mandate, sentiment is conveyed by weight/opacity, not hue. Replace the `getSentimentColor` function (lines ~34-43) with:

```tsx
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'Positive':
                return 'text-foreground font-semibold'
            case 'Negative':
                return 'text-muted'
            default:
                return 'text-muted'
        }
    }
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build passes. No `green-`/`yellow-` sentiment hues remain in this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/DemoPlayground.tsx
git commit -m "fix: neutralize sentiment colors in DemoPlayground"
```

---

### Task 8: Neutralize service-category colors

**Files:**
- Modify: `src/app/services/page.tsx:32-34,46-48,61-63,75-77,90-92,106-108`

- [ ] **Step 1: Replace all six category color triples with one neutral treatment**

Each of the six service objects has `color`, `borderColor`, `textColor` keys with a unique hue. Set ALL of them to the same neutral values. The six current `color` values are: `from-blue-500/20 to-cyan-500/20`, `from-amber-500/20 to-orange-500/20`, `from-slate-500/20 to-zinc-500/20`, `from-rose-500/20 to-pink-500/20`, `from-emerald-500/20 to-teal-500/20`, `from-violet-500/20 to-purple-500/20`.

For each of the six objects, replace its three color lines with exactly:

```tsx
        color: 'from-zinc-500/10 to-zinc-400/10',
        borderColor: 'border-border',
        textColor: 'text-foreground',
```

(Apply to all six: IT Services, E-Commerce, Manufacturing, Healthcare, Real Estate, SMB.)

- [ ] **Step 2: Verify no saturated category colors remain**

Run:
```bash
grep -nE "from-(blue|amber|slate|rose|emerald|violet|cyan|orange|pink|teal|purple)-500" src/app/services/page.tsx
```
Expected: ZERO matches.

Run: `npm run build`
Expected: build passes.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "fix: neutralize service category colors to zinc tints"
```

---

### Task 9: Sweep remaining hardcoded colors + final verification

**Files:**
- Modify (as found): `src/app/data-delete/page.tsx:100`, any others surfaced by grep.

- [ ] **Step 1: Fix the data-delete emerald shadow**

In `src/app/data-delete/page.tsx` line ~100, change:

```tsx
                                className="inline-block py-4 px-10 rounded-full bg-accent text-background font-bold text-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1"
```

to:

```tsx
                                className="inline-block py-4 px-10 rounded-full bg-accent text-background font-bold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1"
```

- [ ] **Step 2: Run the full banned-token grep gate**

Run:
```bash
grep -rnE "emerald|green-[0-9]|10b981|34d399|059669|185,129" src/ --include=*.tsx --include=*.ts --include=*.css | grep -v "whatsapp-brochure"
```
Expected: ZERO matches. If any appear, replace with the nearest token (`text-accent`, `bg-card`, `border-border`, `text-foreground`, `text-muted`) and re-run.

- [ ] **Step 3: Audit remaining components for stray saturated colors**

Run:
```bash
grep -rnE "(blue|amber|rose|violet|cyan|orange|pink|teal|purple|indigo|fuchsia|lime|yellow)-[0-9]{3}" src/components src/app --include=*.tsx | grep -v "whatsapp-brochure"
```
Review each hit. Convert brand/decorative uses to neutral tokens. **Keep** genuinely semantic state colors only where they signal status (e.g. `text-red-*` close/destructive affordance in `FloatingPhonePopup.tsx:50` and `text-red-400` negative in DemoPlayground if still present). Document any kept exception in the commit message.

- [ ] **Step 4: Full build**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 5: Manual visual pass (both themes)**

Run: `npm run start`. Check every route in BOTH themes (toggle in header):
- `/` (hero + Spline, FlowDiagram, AutomationWizard, DemoPlayground, ProcessFlow, Constraints, industries banner, TeamSection, testimonials, FinalCTA, footer)
- `/services`, `/industries`, `/privacy`, `/terms`, `/data-delete`

Confirm: text legible (no low-contrast), no emerald/saturated bleed, cards/borders visible in both modes, Spline neutral, toggle persists.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: sweep remaining hardcoded colors; neutral theme complete"
```

---

## Notes for the Executor

- **Do NOT touch** `src/app/api/whatsapp-brochure/route.tsx` — it is a generated OG/brochure image with an intentional gold theme, not site chrome.
- The `.next/` build artifacts in git status are noise; do not commit them (they are/should be gitignored — if not, leave them alone).
- Tailwind `content` globs already include `src/components` and `src/app`; no config change needed for the new `ThemeProvider`.
- `color-mix()` is supported in all evergreen browsers (Chrome 111+, Safari 16.2+, Firefox 113+). If wider support is required, fall back to fixed `rgba()` per theme via the `.dark` selector.
