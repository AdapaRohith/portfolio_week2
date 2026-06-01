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
