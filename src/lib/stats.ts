export interface ProofPoint {
    /** Rendered verbatim in static HTML — no count-up, nothing that starts at zero. */
    value: string
    label: string
}

/**
 * These are operating facts, not performance metrics. Unsubstantiated outcome
 * numbers ("40+ automations shipped", "99% uptime") were removed: the uptime
 * figure directly contradicted the availability disclaimer in the Terms of
 * Service, and none of them could be evidenced on request.
 */
export const proofPoints: readonly ProofPoint[] = [
    { value: '2–6 wk', label: 'typical time to first workflow live' },
    { value: 'Fixed price', label: 'quoted against a written scope' },
    { value: 'Your cloud', label: 'deployed to your accounts and API keys' },
    { value: 'Security-led', label: 'built by a VAPT and forensics team' },
]
