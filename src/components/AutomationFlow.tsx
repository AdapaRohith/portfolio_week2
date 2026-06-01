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
