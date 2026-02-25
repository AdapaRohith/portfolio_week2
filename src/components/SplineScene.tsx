'use client'

import { useState, useRef, useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

interface SplineSceneProps {
    scene: string
    className?: string
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
    const [loaded, setLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const splineRef = useRef<Application | null>(null)

    // Intercept wheel events on the container so Spline can't hijack page scroll.
    // We use a native listener with { passive: false } to call preventDefault(),
    // then manually scroll the window instead.
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation()
            window.scrollBy({ top: e.deltaY, behavior: 'auto' })
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [])

    // Disable Spline's built-in scroll/zoom controls once loaded
    // so it doesn't fight with page scrolling
    const handleLoad = (splineApp: Application) => {
        splineRef.current = splineApp
        setLoaded(true)

        // Spline runtime exposes setZoom; disable scroll-zoom if available
        try {
            splineApp.setZoom(1)
        } catch {
            // older runtime versions may not have this
        }
    }

    return (
        <div
            ref={containerRef}
            className={`spline-scene-container relative w-full h-full flex items-center justify-center ${className ?? ''}`}
            style={{ touchAction: 'pan-y' }}
        >
            {/* Loading indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <Spline
                scene={scene}
                onLoad={handleLoad}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center',
                    pointerEvents: 'auto',
                }}
            />
        </div>
    )
}
