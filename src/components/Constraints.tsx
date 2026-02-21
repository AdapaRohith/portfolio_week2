'use client'

import { motion } from 'framer-motion'

const principles = [
    {
        icon: '🚫',
        title: 'No aimless chatbots.',
        description: 'Every AI component we deploy has a defined purpose, measurable outcomes, and a fallback strategy.',
    },
    {
        icon: '⚠️',
        title: 'No automating broken processes.',
        description: 'Automation amplifies problems. If your workflow is flawed, we fix the foundation first.',
    },
    {
        icon: '📦',
        title: 'No black-box systems.',
        description: 'Our clients understand how their automation works, why it makes decisions, and how to maintain it.',
    },
    {
        icon: '🎪',
        title: 'No demos without purpose.',
        description: "If it won't run in production and solve a real business problem, we don't build it.",
    },
]

export default function Constraints() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Our <span className="text-red-400">principles</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Clear standards lead to better outcomes. These are the commitments we make to every client.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="glass-card rounded-xl p-5 hover:bg-card-hover transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className="text-2xl shrink-0">{principle.icon}</span>
                                <div>
                                    <h3 className="font-medium mb-1">{principle.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{principle.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
