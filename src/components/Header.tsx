'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/#industries', label: 'Industries' },
    { href: 'https://catalogue.avlokai.com', label: 'Catalogue', external: true },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" aria-label="AvlokAI Home">
                    <div className="w-10 h-10 relative">
                        <Image
                            src="/AvlokAi.png"
                            alt="AvlokAI — Intelligent Automation Solutions logo"
                            fill
                            sizes="40px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-display text-xl font-bold tracking-tight">
                        Avlok<span className="gradient-text">AI</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        link.external ? (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="text-muted hover:text-foreground transition-colors p-2 rounded-lg"
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <a
                        href="mailto:hello@avlokai.com"
                        className="px-4 py-2 bg-accent hover:bg-accent-dim text-background text-sm font-medium rounded-lg transition-all"
                    >
                        Contact Us
                    </a>
                </nav>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-foreground p-2"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md overflow-hidden"
                        aria-label="Mobile navigation"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                link.external ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted hover:text-foreground transition-colors py-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-muted hover:text-foreground transition-colors py-2"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <button
                                onClick={() => { toggleTheme(); setMenuOpen(false) }}
                                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors py-2"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                            </button>
                            <a
                                href="mailto:hello@avlokai.com"
                                className="px-4 py-2 bg-accent hover:bg-accent-dim text-background text-sm font-medium rounded-lg transition-all text-center"
                            >
                                Contact Us
                            </a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}