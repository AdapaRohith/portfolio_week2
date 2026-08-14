import type { MetadataRoute } from 'next'
import { url } from '@/lib/company'
import { services } from '@/lib/services'

/**
 * Generated from the same route data the site renders, on the canonical host,
 * so a new service page can never be missing from the sitemap.
 *
 * `lastModified` is a hand-maintained constant per route, not `new Date()`. The
 * old version stamped build time onto all 14 URLs, so every deploy told Google
 * the whole site had changed — which is the same information as telling it
 * nothing changed, and it degrades crawl scheduling. Bump the date below only
 * when that route's visible content actually changes.
 */
const CONTENT_UPDATED = '2026-08-14'

type Route = {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    lastModified?: string
}

const staticRoutes: Route[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ai-automation-agency-hyderabad', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-08-08' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-08-08' },
    { path: '/data-delete', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-08-08' },
]

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...staticRoutes.map((r) => ({
            url: url(r.path),
            lastModified: new Date(r.lastModified ?? CONTENT_UPDATED),
            changeFrequency: r.changeFrequency,
            priority: r.priority,
        })),
        ...services.map((s) => ({
            url: url(`/services/${s.slug}`),
            lastModified: new Date(CONTENT_UPDATED),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]
}
