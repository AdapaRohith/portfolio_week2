'use client'

import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { motion } from 'framer-motion'
import { BarChart3, Bot, GitBranch, Send, Zap, type LucideIcon } from 'lucide-react'

export type NodeType = 'trigger' | 'logic' | 'ai' | 'data' | 'output'

interface CustomNodeData extends Record<string, unknown> {
    label: string
    type: NodeType
    description: string
}

const nodeStyles: Record<NodeType, { icon: LucideIcon; color: string; bg: string }> = {
    trigger: { icon: Zap, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    logic: { icon: GitBranch, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    ai: { icon: Bot, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    data: { icon: BarChart3, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    output: { icon: Send, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
}

interface CustomNodeProps {
    data: CustomNodeData
    selected?: boolean
}

function CustomNode({ data, selected }: CustomNodeProps) {
    const style = nodeStyles[data.type]
    const Icon = style.icon

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className={`
        relative px-6 py-4 rounded-xl cursor-pointer transition-all duration-200
        ${selected ? 'ring-2 ring-accent shadow-lg shadow-accent/20' : ''}
      `}
            style={{
                background: style.bg,
                border: `1px solid ${style.color}40`,
                minWidth: '160px',
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-card !border-2"
                style={{ borderColor: style.color }}
            />

            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0" style={{ color: style.color }} aria-hidden="true" />
                <div>
                    <div className="font-medium text-foreground text-sm">{data.label}</div>
                    <div className="text-xs text-muted mt-0.5">{data.description}</div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-card !border-2"
                style={{ borderColor: style.color }}
            />
        </motion.div>
    )
}

export default memo(CustomNode)
