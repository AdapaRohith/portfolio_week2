'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TeamMember {
    name: string
    role: string
    initials: string
    description: string
    portfolioUrl: string
    gradient: string
    image?: string
}

const teamMembers: TeamMember[] = [
    {
        name: 'Sushanth Kasturi',
        role: 'Founder & CEO',
        initials: 'SK',
        image: '/profile.jpg',
        description:
            'Visionary leader driving innovation in AI-powered automation. Passionate about building intelligent systems that transform businesses and deliver measurable impact.',
        portfolioUrl: 'https://sushanth.avlokai.com/',
        gradient: 'from-emerald-500 to-teal-400',
    },
    {
        name: 'Rohith',
        role: 'Co-Founder & CTO',
        initials: 'R',
        image: '/aboutphoto.png',
        description:
            'Technical architect with deep expertise in scalable systems and machine learning. Committed to engineering excellence and turning complex challenges into elegant solutions.',
        portfolioUrl: 'https://rohith.avlokai.com/',
        gradient: 'from-teal-400 to-cyan-400',
    },
]

export default function TeamSection() {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section heading */}
                <div className="text-center mb-16">
                    <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
                        The Team
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Meet the{' '}
                        <span className="gradient-text">Minds Behind</span>
                    </h2>
                    <p className="mt-4 text-muted max-w-xl mx-auto text-lg">
                        The people architecting intelligent automation for the future.
                    </p>
                </div>

                {/* Team cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member) => (
                        <TeamCard key={member.role} member={member} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TeamCard({ member }: { member: TeamMember }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <a
            href={member.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="glass-card rounded-2xl p-8 transition-all duration-500 ease-out
                    hover:border-accent/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]
                    hover:-translate-y-1"
            >
                {/* Avatar */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                        {member.image ? (
                            <div
                                className={`w-20 h-20 rounded-full overflow-hidden
                                    transition-transform duration-500 ease-out
                                    ${isHovered ? 'scale-110' : 'scale-100'}`}
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div
                                className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient}
                                    flex items-center justify-center text-2xl font-bold text-background
                                    transition-transform duration-500 ease-out
                                    ${isHovered ? 'scale-110' : 'scale-100'}`}
                            >
                                {member.initials}
                            </div>
                        )}
                        {/* Ring animation on hover */}
                        <div
                            className={`absolute inset-0 rounded-full border-2 border-accent/30
                                transition-all duration-500 ease-out
                                ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                            {member.name}
                        </h3>
                        <p className="text-accent font-mono text-sm mt-0.5">
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted leading-relaxed text-[15px]">
                    {member.description}
                </p>

                {/* View Portfolio indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm text-accent/70 group-hover:text-accent transition-colors duration-300">
                    <span>View Portfolio</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </div>
            </div>
        </a>
    )
}
