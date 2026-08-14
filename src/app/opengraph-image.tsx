import { ImageResponse } from 'next/og'

/**
 * The share card, rendered at build time.
 *
 * Before this the only image any page offered was the 512x512 logo, declared as
 * `og:image` on a `summary_large_image` Twitter card. Every share — X, LinkedIn,
 * Slack, WhatsApp — letterboxed or centre-cropped that square into a 1.91:1
 * frame, so the card read as a small logo floating on grey.
 *
 * Living at the app root means the file convention covers every route, and Next
 * reuses it for `twitter:image` when no `twitter-image` file exists. No custom
 * font is loaded: fetching one at build time would add a network dependency to
 * the build for a marginal typographic gain.
 */
/**
 * Edge, not nodejs. The node build of `@vercel/og` calls `fileURLToPath` on its
 * own module URL, which throws `TypeError: Invalid URL` when the project sits
 * under a Windows OneDrive path — it fails at prerender, not at compile. Edge
 * sidesteps that and is the runtime this route is meant for anyway.
 */
export const runtime = 'edge'
export const alt = 'AvlokAI — AI automation agency in Hyderabad'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#09090b',
                    padding: '72px 80px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: '#3b82f6',
                            display: 'flex',
                        }}
                    />
                    <div
                        style={{
                            fontSize: 26,
                            letterSpacing: 6,
                            textTransform: 'uppercase',
                            color: '#a1a1aa',
                            display: 'flex',
                        }}
                    >
                        AI automation agency · Hyderabad
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: -2,
                            color: '#fafafa',
                            display: 'flex',
                        }}
                    >
                        Automations that
                    </div>
                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: -2,
                            color: '#3b82f6',
                            display: 'flex',
                        }}
                    >
                        hold up under audit.
                    </div>
                    <div
                        style={{
                            marginTop: 28,
                            fontSize: 30,
                            lineHeight: 1.4,
                            color: '#a1a1aa',
                            maxWidth: 900,
                            display: 'flex',
                        }}
                    >
                        RAG chatbots, CRM and n8n workflows, and official WhatsApp automation — built in
                        your own cloud accounts.
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #27272a',
                        paddingTop: 28,
                    }}
                >
                    <div style={{ fontSize: 38, fontWeight: 700, color: '#fafafa', display: 'flex' }}>
                        AvlokAI
                    </div>
                    <div style={{ fontSize: 28, color: '#a1a1aa', display: 'flex' }}>
                        www.avlokai.com
                    </div>
                </div>
            </div>
        ),
        size,
    )
}
