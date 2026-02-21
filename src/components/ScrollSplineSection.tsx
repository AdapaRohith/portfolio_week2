'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

interface ScrollSplineSectionProps {
    scene: string
    className?: string
}

export default function ScrollSplineSection({ scene, className }: ScrollSplineSectionProps) {
    const [inView, setInView] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    // Use Intersection Observer to detect when the section scrolls into view
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect() // Only trigger once
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className={`relative w-full ${className ?? ''}`}
            style={{ minHeight: '80vh' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-full"
                style={{ minHeight: '80vh' }}
            >
                {/* Only load the Spline scene once scrolled into view */}
                {inView && (
                    <>
                        {!loaded && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                        <Spline
                            scene={scene}
                            onLoad={() => setLoaded(true)}
                            style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '80vh',
                                opacity: loaded ? 1 : 0,
                                transition: 'opacity 0.6s ease-in-out',
                            }}
                        />
                    </>
                )}
            </motion.div>
        </section>
    )
}
