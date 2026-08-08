import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LEGAL_EFFECTIVE_DATE, LEGAL_EFFECTIVE_DATE_DISPLAY } from '@/lib/company'

/**
 * Shared shell for the legal pages. Server component: these pages were client
 * components purely for a fade-in, which meant they could not export their own
 * metadata and all three inherited the homepage's canonical, title, and
 * description — so Google treated them as duplicates of the homepage.
 */
export default function LegalLayout({
    title,
    intro,
    children,
}: {
    title: string
    intro: string
    children: React.ReactNode
}) {
    return (
        <main className="bg-background pt-24 pb-14 px-5 sm:px-6">
            <article className="max-w-3xl mx-auto">
                <nav className="font-mono text-[10px] sm:text-xs text-muted mb-5" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" /> Home
                    </Link>
                </nav>

                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">{title}</h1>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wide text-muted mb-5">
                    Effective from{' '}
                    <time dateTime={LEGAL_EFFECTIVE_DATE}>{LEGAL_EFFECTIVE_DATE_DISPLAY}</time>
                    {' · '}Last updated{' '}
                    <time dateTime={LEGAL_EFFECTIVE_DATE}>{LEGAL_EFFECTIVE_DATE_DISPLAY}</time>
                </p>
                <p className="text-sm sm:text-base text-muted border-l-2 border-accent/40 pl-4 mb-8">{intro}</p>

                <div className="space-y-7">{children}</div>
            </article>
        </main>
    )
}

export function LegalSection({
    id,
    heading,
    children,
}: {
    id: string
    heading: string
    children: React.ReactNode
}) {
    return (
        <section id={id} className="scroll-mt-20">
            <h2 className="font-display text-lg md:text-xl font-semibold mb-3">{heading}</h2>
            <div className="space-y-3 text-sm sm:text-base text-muted leading-relaxed [&_strong]:text-foreground [&_a]:text-accent [&_a:hover]:underline">
                {children}
            </div>
        </section>
    )
}

export function LegalList({ items }: { items: readonly (string | React.ReactNode)[] }) {
    return (
        <ul className="space-y-1.5">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">—</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}
