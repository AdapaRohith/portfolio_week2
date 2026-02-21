# Spline Watermark Removal Skill

## Problem
The free tier of [Spline](https://spline.design) injects a **"Built with Spline"** badge in the bottom-right corner of the 3D scene. It's injected dynamically by the `@splinetool/runtime` and cannot be targeted by simple CSS selectors.

## Solution — Three Layers

### 1. MutationObserver (DOM removal)
Attach a `MutationObserver` to the Spline container that watches for any new DOM nodes. Whenever a node appears that contains "spline" in its `href`/text or "built with" text, remove it immediately.

```tsx
useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const hideWatermark = () => {
        container.querySelectorAll('a').forEach((el) => {
            const href = el.getAttribute('href') || ''
            const text = el.textContent || ''
            if (
                href.includes('spline') ||
                text.toLowerCase().includes('spline') ||
                text.toLowerCase().includes('built with')
            ) {
                el.remove()
            }
        })

        container.querySelectorAll('div').forEach((el) => {
            if (el.textContent?.toLowerCase().includes('built with spline')) {
                el.remove()
            }
        })

        container.querySelectorAll('img').forEach((el) => {
            const src = el.getAttribute('src') || ''
            if (src.includes('spline')) el.remove()
        })
    }

    hideWatermark()

    const observer = new MutationObserver(() => hideWatermark())
    observer.observe(container, { childList: true, subtree: true, attributes: true })

    return () => observer.disconnect()
}, [loaded])
```

### 2. CSS Cover Div (visual fallback)
Place an absolutely positioned div in the bottom-right corner of the Spline container, matching the page background color. This guarantees the watermark is hidden even if it lives inside a shadow DOM that JS can't reach.

```tsx
<div
    style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '300px',
        height: '60px',
        background: 'var(--background, #0a0a0b)',
        zIndex: 50,
        pointerEvents: 'none',
    }}
/>
```

> **Note:** Adjust `width`, `height`, and `background` to match your layout. The cover should be the same color as the area behind the Spline scene.

### 3. Global CSS (belt-and-suspenders)
Add to `globals.css` as extra insurance:

```css
/* Hide Spline watermark */
spline-viewer::part(logo) {
    display: none !important;
}

spline-viewer a[href*="spline"],
[data-logo],
canvas + a,
canvas ~ div > a[href*="spline"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
}
```

## What Actually Worked
The **CSS cover div** (Layer 2) was the only reliable method. The MutationObserver and CSS selectors are good to have but may not catch the watermark if it's rendered inside a shadow DOM or injected in an unexpected way.

## Key Takeaway
When dealing with third-party watermarks injected dynamically, a **matching-background cover div** is the most reliable visual solution. It's simple, doesn't depend on the internal DOM structure, and works regardless of how the watermark is rendered.
