# Neutral Minimal Refactor — Design

**Date:** 2026-06-01
**Project:** portfolio_week2 (AvlokAI marketing site, Next.js 14 + Tailwind + Spline 3D)
**Goal:** Replace the current dark-only emerald theme with a completely minimal, cool-neutral (zinc/slate) design that supports both light and dark modes. Keep the 3D Spline models; recolor them to neutral via CSS filters.

---

## 1. Theme Engine

- Convert the single `:root` block in `src/app/globals.css` into **two token sets** sharing identical variable names:
  - `:root` → light theme values
  - `.dark` → dark theme values
- Because Tailwind tokens already map to these CSS vars (`background`, `foreground`, `accent`, `accent-dim`, `muted`, `border`, `card`, `card-hover`), all tokenized component markup requires **zero changes**. Only the variable values change.
- `<html>` element carries `class="dark"` when dark mode active.
- **Theme selection logic** (`ThemeProvider`, client component, no new dependency):
  - On mount, read `localStorage.theme`. If absent, fall back to `window.matchMedia('(prefers-color-scheme: dark)')`.
  - Apply/remove `dark` class on `document.documentElement`.
- **No-flash guarantee:** an inline blocking `<script>` injected in `layout.tsx` (in `<head>` via Next.js) runs before first paint, reading `localStorage.theme` ?? system preference and setting the `dark` class immediately. This prevents the light-flash-then-dark flicker on load.
- **Toggle UI:** a button in `Header.tsx` (desktop nav + mobile menu) using lucide `Sun` / `Moon` icons. Click toggles theme, updates `document.documentElement` class, and writes choice to `localStorage.theme`. Accessible: `aria-label`, visible focus ring.

## 2. Palette — Cool Neutral (zinc/slate), Monochrome + Ink Accent

No saturated color anywhere in site chrome. "Accent" is ink (near-black on light, near-white on dark), not a hue.

| Token         | Light (`:root`)    | Dark (`.dark`)     |
|---------------|--------------------|--------------------|
| `--background`| `#fafafa` (zinc-50)| `#09090b` (zinc-950)|
| `--foreground`| `#18181b` (zinc-900)| `#fafafa` (zinc-50)|
| `--card`      | `#ffffff`          | `#18181b` (zinc-900)|
| `--card-hover`| `#f4f4f5` (zinc-100)| `#27272a` (zinc-800)|
| `--border`    | `#e4e4e7` (zinc-200)| `#27272a` (zinc-800)|
| `--muted`     | `#71717a` (zinc-500)| `#a1a1aa` (zinc-400)|
| `--accent`    | `#3f3f46` (zinc-700)| `#e4e4e7` (zinc-200)|
| `--accent-dim`| `#27272a` (zinc-800)| `#a1a1aa` (zinc-400)|

**Derived treatments:**
- `gradient-text` utility → drop the emerald gradient; render flat `var(--foreground)` (keep class name so markup is untouched).
- CTA buttons (`bg-accent text-background`) become high-contrast neutral: dark button on light bg, light button on dark bg. `accent-dim` is the hover state.
- `glass-card` background → theme-aware translucent surface (`var(--card)` at ~0.8 alpha) for both modes.
- `::selection` → neutral (`var(--accent)` at low alpha), not emerald.
- Focus ring (`outline: 2px solid var(--accent)`) → now neutral automatically.
- `.animated-grid` and React Flow edge/control styles already reference vars → inherit neutral automatically; verify legibility in both modes.

## 3. 3D Spline Models

- Scene files (`/scene-clean.splinecode`) are binary and cannot be edited without the Spline editor. Recolor via CSS on the canvas wrapper instead.
- Wrap `SplineScene` canvas in a container with theme-aware filter:
  - Light: `filter: grayscale(1) contrast(0.95);`
  - Dark: `filter: grayscale(1) brightness(0.9);`
- Implement as a `.spline-neutral` class in `globals.css` with a `.dark .spline-neutral` override, applied to the Spline wrapper. Values tunable after visual check.
- Background behind the canvas uses `var(--background)` in both modes so the model sits cleanly in the minimal layout.

## 4. Hardcoded Color Fixes

Replace all non-tokenized colors in **site chrome** with tokens or neutral equivalents:

| File | Current | Change |
|------|---------|--------|
| `components/DemoPlayground.tsx` | `text-green-400` | neutral status color (token-based, e.g. `text-foreground` or `text-muted`) |
| `components/FinalCTA.tsx` | `bg-emerald-500/*`, `text-emerald-500`, `from-accent/5` gradient | neutral CTA via tokens; gradient overlay → neutral/removed |
| `components/FloatingPhonePopup.tsx` | `text-emerald-500`, `hover:text-emerald-400` | `text-accent` / hover token |
| `app/data-delete/page.tsx` | `hover:shadow-[...rgba(16,185,129,0.4)]` | neutral shadow or token-based |
| `app/services/page.tsx` | per-category colorful gradients (`from-blue-500/20`, `from-amber-500/20`, `from-rose-500/20`, `from-emerald-500/20`, etc.) + `border-emerald-500/30`, `text-emerald-400` | single shared neutral treatment: `from-zinc-500/10 to-zinc-400/10`, neutral border + token text. Removes the rainbow category coding. |

Audit `industries/page.tsx`, `TeamSection.tsx`, `CustomNode.tsx`, `MilkyGalaxy.tsx`, `ScrollSplineSection.tsx`, `ProcessFlow.tsx`, `Constraints.tsx`, `AutomationWizard.tsx`, `stagger-testimonials.tsx` for any remaining hardcoded emerald/green/saturated values and convert to tokens.

## 5. Out of Scope

- `src/app/api/whatsapp-brochure/route.tsx` — a generated OG/brochure image (gold `#c9a84c` theme) served to WhatsApp, not website chrome. **Leave untouched.**
- No content/copy changes, no layout restructure, no new pages. This is a theming + light/dark refactor only.

## 6. Verification

- **Contrast:** all text/background pairs meet WCAG AA (4.5:1 body, 3:1 large) in both modes. ui-ux-pro-max validates palette.
- **No-flash:** hard reload in both system preferences shows correct theme with no flicker.
- **Toggle:** persists across reloads via `localStorage`; overrides system preference.
- **Spline:** models render neutral in both modes, no color bleed.
- **Grep gate:** no remaining `emerald`, `green-`, or stray saturated hex in `src/` except the out-of-scope brochure route.
- **Build:** `next build` passes clean.

## 7. Build Approach

1. ui-ux-pro-max: validate final palette + contrast, confirm token values.
2. Token + theme-engine changes (`globals.css`, `layout.tsx`, new `ThemeProvider`, `Header.tsx` toggle).
3. caveman builder agents: mechanical hardcoded-color swaps, file-by-file (bounded edits).
4. Spline filter wrapper.
5. Verification gate (grep + build + visual both modes).
