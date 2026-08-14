import type { MetadataRoute } from 'next'
import { url } from '@/lib/company'

/**
 * Generated rather than a static file, so the sitemap URL can never drift from
 * the canonical host again. Nothing is disallowed except the contact endpoint,
 * which has nothing to index.
 *
 * No `host` directive. It is a Yandex-only extension that Google and Bing
 * ignore, and the value it emitted (`https://www.avlokai.com/`) was malformed
 * anyway — the directive expects a bare hostname, not a URL. Canonical host is
 * already asserted by the `rel=canonical` on every page.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
        sitemap: url('/sitemap.xml'),
    }
}
