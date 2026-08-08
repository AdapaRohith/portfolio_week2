'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, staggerContainer, inView } from '@/lib/motion'

interface Member { name: string; role: string; image: string; bio: string; url?: string }

// Bios name what each person actually did before this, because "drives
// innovation" is not a credential anyone can check.
const team: Member[] = [
    { name: 'Sushanth Kasturi', role: 'Founder & CEO', image: '/profile.jpg', bio: 'From vulnerability assessment, penetration testing, and digital forensics. Sets how access, secrets, and logging are handled in every build.', url: 'https://sushanth.avlokai.com/' },
    { name: 'Rohith', role: 'Co-Founder & CTO', image: '/aboutphoto.png', bio: 'Builds the retrieval and orchestration layer — ingestion pipelines, vector search, and the n8n workflows that hold a system together.', url: 'https://rohith.avlokai.com/' },
    { name: 'Nathaniel Francis', role: 'Chief of Sales', image: '/nathan.jpg', bio: 'Runs scoping and commercials: turning a described problem into a written scope with a fixed price and a delivery window.', url: 'https://nathaniel.avlokai.com/' },
]

export default function TeamSection() {
    return (
        <section className="py-12 md:py-20 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">Team</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-6 md:mb-8">The people behind it.</h2>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={inView}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {team.map((m) => {
                        const card = (
                            <div className="group glass-card rounded-xl p-4 md:p-5 h-full transition-all hover:-translate-y-1 hover:border-accent/40">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border flex-shrink-0">
                                        <Image src={m.image} alt={`${m.name} — ${m.role}`} fill sizes="44px" className="object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-display text-sm font-semibold truncate">{m.name}</h3>
                                        <p className="font-mono text-[10px] text-accent">{m.role}</p>
                                    </div>
                                    {m.url && <ArrowUpRight className="h-4 w-4 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />}
                                </div>
                                <p className="text-xs sm:text-sm text-muted">{m.bio}</p>
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
