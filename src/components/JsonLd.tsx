/** Renders a JSON-LD block. Server component — the markup ships in static HTML. */
export default function JsonLd({ data }: { data: object | object[] }) {
    // Escaping `<` prevents a `</script>` sequence in any value from closing the tag early.
    const json = JSON.stringify(data).replace(/</g, '\\u003c')

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
