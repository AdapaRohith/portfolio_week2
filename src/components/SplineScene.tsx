'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
    scene: string
    className?: string
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
    const [loaded, setLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // We only need this for loaded state and other side effects if any
    }, [loaded])

    // When mouse leaves the 3D area, we previously dispatched a synthetic mousemove.
    const handleMouseLeave = useCallback(() => {
        const canvas = containerRef.current?.querySelector('canvas')
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        canvas.dispatchEvent(
            new MouseEvent('mousemove', {
                clientX: centerX,
                clientY: centerY,
                bubbles: true,
            })
        )
    }, [])

    return (
        <div
            ref={containerRef}
            className={`spline-scene-container relative w-full h-full flex items-center justify-center ${className ?? ''}`}
            onMouseLeave={handleMouseLeave}
        >
            {/* Loading indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <Spline
                scene={scene}
                onLoad={() => setLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center'
                }}
            />

            {/* Invisible overlay that captures wheel events to force window scroll, 
                but ignores other pointer events so the 3D model still reacts to hover */}
            <div
                className="absolute inset-0 z-20"
                style={{ touchAction: 'pan-y' }} // Allows native touch scrolling
                onWheel={(e) => {
                    window.scrollBy({
                        top: e.deltaY,
                        behavior: 'auto'
                    })
                }}
                onPointerMove={(e) => {
                    if (e.pointerType !== 'mouse') return
                    const canvas = containerRef.current?.querySelector('canvas')
                    if (canvas) {
                        canvas.dispatchEvent(
                            new PointerEvent('pointermove', {
                                bubbles: true,
                                cancelable: true,
                                clientX: e.clientX,
                                clientY: e.clientY,
                            })
                        )
                    }
                }}
            />
        </div>
    )
}
