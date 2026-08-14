/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },

    /**
     * Apex -> www as a permanent 308.
     *
     * The apex currently answers with a 307 issued by the Vercel edge, which
     * runs before Next.js — so this rule is dormant until the redirect on the
     * `avlokai.com` domain is removed in Vercel -> Settings -> Domains. Once it
     * is, this takes over and returns a permanent redirect instead.
     *
     * The distinction matters: a 307 does not consolidate link equity onto the
     * canonical host, and it leaves crawlers re-requesting the apex forever. It
     * also breaks link unfurling — Vercel's 307 response body is a bare HTML
     * stub with no meta tags, so any unfurler that does not follow the redirect
     * renders a card with no title, no description, and no icon.
     */
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'avlokai.com' }],
                destination: 'https://www.avlokai.com/:path*',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
