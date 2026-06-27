import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const logoUrl = new URL('/AvlokAi.png', req.url).toString()

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1080px',
                    height: '1080px',
                    background: '#07070f',
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Dot-grid background texture */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(rgba(201,168,76,0.12) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                {/* Top-right glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-160px',
                        right: '-160px',
                        width: '520px',
                        height: '520px',
                        background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)',
                        borderRadius: '50%',
                    }}
                />
                {/* Bottom-left glow */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-140px',
                        left: '-80px',
                        width: '440px',
                        height: '440px',
                        background: 'radial-gradient(circle, rgba(124,111,224,0.1) 0%, transparent 65%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Outer frame */}
                <div
                    style={{
                        position: 'absolute',
                        top: '22px',
                        left: '22px',
                        right: '22px',
                        bottom: '22px',
                        border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: '8px',
                    }}
                />
                {/* Corner brackets */}
                {[
                    { top: '34px', left: '34px', borderTop: '2.5px solid #c9a84c', borderLeft: '2.5px solid #c9a84c' },
                    { top: '34px', right: '34px', borderTop: '2.5px solid #c9a84c', borderRight: '2.5px solid #c9a84c' },
                    { bottom: '34px', left: '34px', borderBottom: '2.5px solid #c9a84c', borderLeft: '2.5px solid #c9a84c' },
                    { bottom: '34px', right: '34px', borderBottom: '2.5px solid #c9a84c', borderRight: '2.5px solid #c9a84c' },
                ].map((s, i) => (
                    <div key={i} style={{ position: 'absolute', width: '32px', height: '32px', ...s }} />
                ))}

                {/* ── CONTENT WRAPPER ── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        padding: '60px 72px 52px',
                        gap: '0px',
                        zIndex: 1,
                    }}
                >
                    {/* ── HEADER: Logo ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <img
                            src={logoUrl}
                            width={64}
                            height={64}
                            style={{ borderRadius: '14px' }}
                        />
                        <span style={{ color: '#ffffff', fontSize: '44px', fontWeight: '800', letterSpacing: '1px' }}>
                            Avlok<span style={{ color: '#c9a84c' }}>AI</span>
                        </span>
                    </div>

                    {/* ── HEADLINE ── */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '40px',
                            gap: '2px',
                        }}
                    >
                        <span
                            style={{
                                color: '#ffffff',
                                fontSize: '76px',
                                fontWeight: '900',
                                textAlign: 'center',
                                lineHeight: '1.0',
                                letterSpacing: '-2px',
                            }}
                        >
                            Stop Losing Leads.
                        </span>
                        <span
                            style={{
                                color: '#c9a84c',
                                fontSize: '76px',
                                fontWeight: '900',
                                textAlign: 'center',
                                lineHeight: '1.0',
                                letterSpacing: '-2px',
                            }}
                        >
                            Start Closing Deals.
                        </span>
                        <p
                            style={{
                                color: '#8080a0',
                                fontSize: '20px',
                                textAlign: 'center',
                                maxWidth: '660px',
                                lineHeight: '1.6',
                                marginTop: '20px',
                            }}
                        >
                            Intelligent AI systems built for real estate teams —
                            follow up instantly, qualify faster, convert more.
                        </p>
                    </div>

                    {/* ── SERVICE CARDS ── */}
                    <div style={{ display: 'flex', gap: '18px', marginTop: '44px' }}>
                        {[
                            {
                                num: '01',
                                title: 'WhatsApp Follow-Ups',
                                desc: 'Automated drip sequences nurture every prospect 24/7 without lifting a finger',
                                accent: '#25D366',
                            },
                            {
                                num: '02',
                                title: 'CRM Integration',
                                desc: 'Every lead, call, and message synced to your CRM in real time — no manual entry',
                                accent: '#c9a84c',
                            },
                            {
                                num: '03',
                                title: 'Property Inquiry Bots',
                                desc: 'AI bots qualify buyers instantly and book site visits while you sleep',
                                accent: '#7c6fe0',
                            },
                        ].map((card) => (
                            <div
                                key={card.num}
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderTop: `3px solid ${card.accent}`,
                                    borderRadius: '12px',
                                    padding: '28px 22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <span style={{ color: card.accent, fontSize: '12px', fontWeight: '700', letterSpacing: '1.5px', opacity: 0.7 }}>
                                    {card.num}
                                </span>
                                <span style={{ color: '#e0e0f0', fontSize: '17px', fontWeight: '700', lineHeight: '1.3' }}>
                                    {card.title}
                                </span>
                                <span style={{ color: '#58587a', fontSize: '13.5px', lineHeight: '1.6' }}>
                                    {card.desc}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ── STATS ROW ── */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0px',
                            marginTop: '40px',
                            background: 'rgba(201,168,76,0.06)',
                            border: '1px solid rgba(201,168,76,0.15)',
                            borderRadius: '12px',
                            padding: '22px 0',
                        }}
                    >
                        {[
                            { value: '24 / 7', label: 'Always Active' },
                            { value: '< 60s', label: 'Response Time' },
                            { value: '3×', label: 'More Conversions' },
                        ].map((stat, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flex: 1,
                                        gap: '4px',
                                    }}
                                >
                                    <span style={{ color: '#c9a84c', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                                        {stat.value}
                                    </span>
                                    <span style={{ color: '#58587a', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>
                                        {stat.label}
                                    </span>
                                </div>
                                {i < 2 && (
                                    <div style={{ width: '1px', height: '40px', background: 'rgba(201,168,76,0.2)' }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── BOTTOM: CTA + Contact ── */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 'auto',
                            paddingTop: '32px',
                        }}
                    >
                        {/* CTA pill */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                                borderRadius: '999px',
                                padding: '14px 32px',
                            }}
                        >
                            <span style={{ color: '#07070f', fontSize: '16px', fontWeight: '800', letterSpacing: '0.3px' }}>
                                Book a Free Demo
                            </span>
                        </div>

                        {/* Contact info */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                            <span style={{ color: '#c9a84c', fontSize: '16px', fontWeight: '700' }}>avlokai.com</span>
                            <span style={{ color: '#58587a', fontSize: '14px' }}>+91 93466 72015</span>
                            <span style={{ color: '#58587a', fontSize: '14px' }}>hello@avlokai.com</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1080,
            headers: {
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
        }
    )
}
