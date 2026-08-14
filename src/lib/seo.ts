import type { Metadata } from 'next'
import { SITE_URL, company, url } from '@/lib/company'

/** Rendered by `app/opengraph-image.tsx`. 1200x630, the size a large card wants. */
const OG_IMAGE = '/opengraph-image'

/**
 * Every page gets a self-referencing canonical on the single canonical host,
 * plus complete Open Graph and Twitter cards. Previously the legal pages
 * inherited the homepage canonical (so Google treated them as duplicates of
 * home) and /services and /industries shipped the homepage's twitter:title
 * with no og:image at all.
 *
 * `title` is emitted as `{ absolute }`. The root layout declares a
 * `'%s | AvlokAI'` template, which the App Router applies to child segments but
 * not to the segment that declares it — so `app/page.tsx` was exempt while all
 * 13 other routes had the brand appended to titles that already ended in
 * `| AvlokAI`, producing `Privacy Policy | AvlokAI | AvlokAI`. Opting out here
 * means the string passed in is exactly the string that ships, on every route.
 * The template stays in the layout as a fallback for anything that skips this
 * helper.
 *
 * The share image points at `app/opengraph-image.tsx`, which renders a real
 * 1200x630 card. It is wired up explicitly rather than left to the file
 * convention: Next resolves that convention per segment and does not propagate
 * it to child segments, so relying on it gave `/` and the 404 an og:image while
 * all twelve other routes shipped none at all. The old code hard-coded the
 * 512x512 logo into a `summary_large_image` card, so every share letterboxed a
 * square logo into a 1.91:1 frame. Pass `image` to override per page.
 *
 * Note: no `keywords` field. Google has ignored meta keywords since 2009; the
 * only thing the old 15-term block did was publish the keyword strategy to
 * anyone viewing source.
 */
export function pageMetadata({
    title,
    description,
    path,
    image,
    imageAlt,
    noIndex = false,
}: {
    title: string
    description: string
    path: string
    image?: string
    imageAlt?: string
    noIndex?: boolean
}): Metadata {
    const canonical = url(path)
    const alt = imageAlt ?? title
    const images = [{ url: image ?? OG_IMAGE, width: 1200, height: 630, alt }]

    return {
        metadataBase: new URL(SITE_URL),
        title: { absolute: title },
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: company.name,
            locale: 'en_IN',
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
        },
        robots: noIndex
            ? { index: false, follow: true }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      'max-video-preview': -1,
                      'max-image-preview': 'large',
                      'max-snippet': -1,
                  },
              },
    }
}
