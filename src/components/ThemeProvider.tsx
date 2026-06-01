'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    // Sync state with the class the inline no-flash script already applied.
    useEffect(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }, [])

    const applyTheme = (next: Theme) => {
        setTheme(next)
        document.documentElement.classList.toggle('dark', next === 'dark')
        window.localStorage.setItem('theme', next)
    }

    const toggleTheme = () => applyTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MotionConfig reducedMotion="user">
                {children}
            </MotionConfig>
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
