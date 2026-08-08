import type { MetadataRoute } from 'next'
import { url } from '@/lib/company'
import { services } from '@/lib/services'

/**
 * Generated from the same route data the site renders, on the canonical host,
 * so a new service page can never be missing from the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/ai-automation-agency-hyderabad', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/data-delete', priority: 0.3, changeFrequency: 'yearly' },
    ]

    return [
        ...staticRoutes.map((r) => ({
            url: url(r.path),
            lastModified: now,
            changeFrequency: r.changeFrequency,
            priority: r.priority,
        })),
        ...services.map((s) => ({
            url: url(`/services/${s.slug}`),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    ]
}
