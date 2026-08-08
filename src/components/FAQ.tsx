import { faqs } from '@/lib/faq'

/**
 * Native <details>, not a JS accordion. The answers are present in the static
 * HTML either way — crawlers and LLMs read collapsed <details> content — but
 * ten expanded long-form answers made the page unreadably tall on a phone.
 * Server component, no client JS.
 */
export default function FAQ({
    items = faqs,
    heading = 'Questions we get asked.',
}: {
    items?: readonly { question: string; answer: string }[]
    heading?: string
}) {
    return (
        <section id="faq" className="py-12 md:py-20 px-5 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-accent mb-2">FAQ</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-6 md:mb-8">{heading}</h2>
                <div className="divide-y divide-border border-y border-border">
                    {items.map((item, i) => (
                        <details key={item.question} open={i === 0} className="group">
                            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-4 [&::-webkit-details-marker]:hidden">
                                <h3 className="font-display text-base md:text-lg font-semibold">{item.question}</h3>
                                <span aria-hidden="true"
                                    className="text-accent text-xl leading-none mt-0.5 flex-shrink-0 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="text-sm md:text-base text-muted leading-relaxed pb-5 pr-8">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
