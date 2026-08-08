'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { company } from '@/lib/company'

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent' | 'form', string>>

// 16px base font size on inputs — anything smaller makes iOS Safari zoom on focus.
const field =
    'w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
    const [errors, setErrors] = useState<Errors>({})

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('sending')
        setErrors({})

        const data = Object.fromEntries(new FormData(e.currentTarget).entries())
        const payload = { ...data, consent: data.consent === 'on' }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const json = await res.json().catch(() => ({}))

            if (res.ok) {
                setStatus('sent')
                return
            }
            setErrors(json.errors ?? { form: json.error ?? 'Something went wrong. Please try again.' })
        } catch {
            setErrors({ form: `Network error. Please email ${company.email} directly.` })
        }
        setStatus('idle')
    }

    if (status === 'sent') {
        return (
            <div className="glass-card rounded-xl p-6 text-center" role="status">
                <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-4" aria-hidden="true" />
                <h2 className="font-display text-2xl font-semibold mb-2">Message received.</h2>
                <p className="text-muted">
                    We reply to every enquiry within one working day. If it is urgent, call{' '}
                    <a href={`tel:${company.phone}`} className="text-accent hover:underline">
                        {company.phoneDisplay}
                    </a>
                    .
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="glass-card rounded-xl p-5 md:p-6 space-y-4" noValidate>
            {/* Honeypot — hidden from users, ignored by the server when filled. */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                        Name <span className="text-accent">*</span>
                    </label>
                    <input id="name" name="name" required autoComplete="name" className={field}
                        aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p id="name-error" className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                        Work email <span className="text-accent">*</span>
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={field}
                        aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <p id="email-error" className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company</label>
                    <input id="company" name="company" autoComplete="organization" className={field} />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    What workflow are you trying to fix? <span className="text-accent">*</span>
                </label>
                <textarea id="message" name="message" rows={4} required className={field}
                    placeholder="What happens today, which systems it touches, and roughly how often."
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                {errors.message && <p id="message-error" className="text-sm text-red-500 mt-1">{errors.message}</p>}
            </div>

            <div>
                <label htmlFor="consent" className="flex gap-3 text-sm text-muted">
                    <input id="consent" name="consent" type="checkbox" required
                        className="mt-1 h-4 w-4 flex-shrink-0"
                        aria-describedby={errors.consent ? 'consent-error' : undefined} />
                    <span>
                        I consent to AvlokAI storing these details to respond to this enquiry, as described in the{' '}
                        <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                    </span>
                </label>
                {errors.consent && <p id="consent-error" className="text-sm text-red-500 mt-1">{errors.consent}</p>}
            </div>

            {errors.form && (
                <p role="alert" className="text-sm text-red-500 border border-red-500/30 rounded-lg p-3">
                    {errors.form}
                </p>
            )}

            <button type="submit" disabled={status === 'sending'}
                className="px-7 py-3.5 bg-accent hover:bg-accent-dim disabled:opacity-60 text-background font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                {status === 'sending'
                    ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
                    : <>Send enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
            </button>
        </form>
    )
}
