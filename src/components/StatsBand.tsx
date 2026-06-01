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
            const eased = 1 - Math.pow(1 - p, 3)
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
