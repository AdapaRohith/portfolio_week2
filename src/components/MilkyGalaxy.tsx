'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Star {
    id: number
    x: number
    y: number
    size: number
    brightness: number
    twinkleDelay: number
}

export default function MilkyGalaxy() {
    const [stars, setStars] = useState<Star[]>([])

    useEffect(() => {
        const generateStars = () => {
            const newStars: Star[] = []
            for (let i = 0; i < 200; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: 0.5 + Math.random() * 2,
                    brightness: 0.2 + Math.random() * 0.8,
                    twinkleDelay: Math.random() * 5,
                })
            }
            setStars(newStars)
        }

        generateStars()
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Star field */}
            <div className="absolute inset-0">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        animate={{
                            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: star.twinkleDelay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Floating cosmic particles */}
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-px h-px bg-accent rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>
    )
}