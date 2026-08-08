import { proofPoints } from '@/lib/stats'

/**
 * Server component on purpose. This band previously used JS count-up
 * animations whose initial DOM value was 0, so every crawler, LLM, social
 * scraper, and slow connection saw a company advertising zero of everything.
 * The values now ship in the static HTML.
 */
export default function StatsBand() {
    return (
        <section className="py-8 md:py-12 px-5 sm:px-6 border-y border-border bg-accent-soft">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                {proofPoints.map((p) => (
                    <div key={p.label} className="text-center">
                        <div className="font-display text-lg md:text-2xl font-bold text-foreground mb-0.5 tabular-nums">
                            {p.value}
                        </div>
                        <div className="text-xs md:text-sm text-muted leading-snug">{p.label}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
