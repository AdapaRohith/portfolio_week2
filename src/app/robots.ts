import type { MetadataRoute } from 'next'
import { url } from '@/lib/company'

/**
 * Generated rather than a static file, so the sitemap URL can never drift from
 * the canonical host again. Nothing is disallowed except the contact endpoint,
 * which has nothing to index.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
        sitemap: url('/sitemap.xml'),
        host: url('/'),
    }
}
