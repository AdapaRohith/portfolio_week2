export interface Stat { value: number; suffix: string; label: string }

// PLACEHOLDER metrics — replace with real numbers before launch.
export const stats: Stat[] = [
    { value: 40, suffix: '+', label: 'automations shipped' },
    { value: 12000, suffix: '+', label: 'hours saved' },
    { value: 6, suffix: '', label: 'industries served' },
    { value: 99, suffix: '%', label: 'uptime' },
]
