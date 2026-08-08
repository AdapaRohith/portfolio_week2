import type { Metadata } from 'next'
import { SITE_URL, company, url } from '@/lib/company'

const DEFAULT_IMAGE = '/AvlokAi.png'

/**
 * Every page gets a self-referencing canonical on the single canonical host,
 * plus complete Open Graph and Twitter cards. Previously the legal pages
 * inherited the homepage canonical (so Google treated them as duplicates of
 * home) and /services and /industries shipped the homepage's twitter:title
 * with no og:image at all.
 *
 * Note: no `keywords` field. Google has ignored meta keywords since 2009; the
 * only thing the old 15-term block did was publish the keyword strategy to
 * anyone viewing source.
 */
export function pageMetadata({
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
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

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: company.name,
            locale: 'en_IN',
            type: 'website',
            images: [{ url: image, width: 512, height: 512, alt }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [{ url: image, alt }],
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
