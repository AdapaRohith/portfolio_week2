import { NextRequest, NextResponse } from 'next/server'
import { company } from '@/lib/company'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX = { name: 120, email: 200, company: 160, phone: 40, message: 5000 }

/** Simple in-process limiter. Good enough for a marketing form on one region. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string) {
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
    recent.push(now)
    hits.set(ip, recent)
    if (hits.size > 5000) hits.clear()
    return recent.length > MAX_PER_WINDOW
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function clean(value: unknown, max: number) {
    return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        req.headers.get('x-real-ip') ??
        'unknown'

    if (rateLimited(ip)) {
        return NextResponse.json(
            { error: 'Too many submissions. Please try again shortly, or email us directly.' },
            { status: 429 }
        )
    }

    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
    }

    // Honeypot: real users never fill a hidden field. Accept and drop silently.
    if (clean(body.website, 200)) return NextResponse.json({ ok: true })

    const name = clean(body.name, MAX.name)
    const email = clean(body.email, MAX.email)
    const org = clean(body.company, MAX.company)
    const phone = clean(body.phone, MAX.phone)
    const message = clean(body.message, MAX.message)
    const consent = body.consent === true

    const errors: Record<string, string> = {}
    if (name.length < 2) errors.name = 'Please tell us your name.'
    if (!isEmail(email)) errors.email = 'Please enter a valid work email address.'
    if (message.length < 20) errors.message = 'Please describe the workflow in a little more detail.'
    if (!consent) errors.consent = 'We need your consent to store and reply to this enquiry.'

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 422 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL || company.email
    const from = process.env.CONTACT_FROM_EMAIL

    if (!apiKey || !from) {
        // Never report success for a message that was not delivered.
        console.error('[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured')
        return NextResponse.json(
            {
                error: `The contact form is not configured to send right now. Please email ${company.email} directly.`,
            },
            { status: 503 }
        )
    }

    const lines = [
        `Name: ${name}`,
        `Email: ${email}`,
        org ? `Company: ${org}` : null,
        phone ? `Phone: ${phone}` : null,
        '',
        message,
        '',
        `Submitted from ${ip} at ${new Date().toISOString()}`,
    ].filter((l) => l !== null)

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [to],
                reply_to: email,
                subject: `Website enquiry — ${name}${org ? ` (${org})` : ''}`,
                text: lines.join('\n'),
            }),
        })

        if (!res.ok) {
            console.error('[contact] delivery failed', res.status, await res.text())
            return NextResponse.json(
                { error: `We could not send that. Please email ${company.email} directly.` },
                { status: 502 }
            )
        }
    } catch (err) {
        console.error('[contact] delivery threw', err)
        return NextResponse.json(
            { error: `We could not send that. Please email ${company.email} directly.` },
            { status: 502 }
        )
    }

    return NextResponse.json({ ok: true })
}
