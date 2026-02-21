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

    // Use MutationObserver to detect and remove the Spline watermark
    // as soon as it appears in the DOM
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const hideWatermark = () => {
            // The watermark is typically an <a> or <div> sibling/descendant
            // near the canvas with a link to spline.design
            const allLinks = container.querySelectorAll('a')
            allLinks.forEach((el) => {
                const href = el.getAttribute('href') || ''
                const text = el.textContent || ''
                if (
                    href.includes('spline') ||
                    text.toLowerCase().includes('spline') ||
                    text.toLowerCase().includes('built with')
                ) {
                    el.style.display = 'none'
                    el.style.visibility = 'hidden'
                    el.style.opacity = '0'
                    el.style.pointerEvents = 'none'
                    el.style.width = '0'
                    el.style.height = '0'
                    el.style.overflow = 'hidden'
                    el.style.position = 'absolute'
                    el.remove()
                }
            })

            // Also target any non-canvas, non-loading child divs
            // that might contain the watermark
            const allDivs = container.querySelectorAll('div')
            allDivs.forEach((el) => {
                const text = el.textContent || ''
                if (
                    text.toLowerCase().includes('built with spline') &&
                    !el.classList.contains('spline-scene-container')
                ) {
                    el.style.display = 'none'
                    el.remove()
                }
            })

            // Target images that could be the Spline logo
            const allImgs = container.querySelectorAll('img')
            allImgs.forEach((el) => {
                const src = el.getAttribute('src') || ''
                const alt = el.getAttribute('alt') || ''
                if (
                    src.includes('spline') ||
                    alt.toLowerCase().includes('spline')
                ) {
                    el.style.display = 'none'
                    el.remove()
                }
            })
        }

        // Run immediately
        hideWatermark()

        // Watch for DOM changes and remove watermark whenever it appears
        const observer = new MutationObserver(() => {
            hideWatermark()
        })

        observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
        })

        return () => observer.disconnect()
    }, [loaded])

    // When mouse leaves the 3D area (e.g. moves over the text overlay),
    // dispatch a synthetic mousemove to the canvas center so the robot
    // returns to its default/resting position.
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
            className={`spline-scene-container relative w-full h-full ${className ?? ''}`}
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
                }}
            />

            {/* Cover for Spline watermark in bottom-right corner */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '300px',
                    height: '60px',
                    background: 'var(--background, #0a0a0b)',
                    zIndex: 50,
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
