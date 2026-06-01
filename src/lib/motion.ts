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
