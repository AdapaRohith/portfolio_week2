export interface Scenario {
    sector: string
    title: string
    problem: string
    approach: string
}

/**
 * Representative scenarios, not case studies.
 *
 * The previous entries carried outcome figures ("38% less downtime", "2.4x more
 * qualified leads") with no named client, methodology, or timeframe behind
 * them. Under the Consumer Protection Act 2019 and the ASCI code the
 * advertiser must hold substantiation for performance claims, so the numbers
 * are gone until a client agrees in writing to be named alongside them.
 */
export const scenarios: readonly Scenario[] = [
    {
        sector: 'E-Commerce',
        title: 'Inventory sync across marketplaces',
        problem:
            'The same stock count maintained by hand in a website admin and three marketplace dashboards, so oversells happen on the lag between them.',
        approach:
            'One source of truth, pushed to every channel on change, with an alert when a channel rejects an update instead of failing silently.',
    },
    {
        sector: 'Real Estate',
        title: 'Portal lead capture and instant follow-up',
        problem:
            'Enquiries arriving across portals, ad forms, and WhatsApp with no single pipeline, so the first response depends on who happens to be looking.',
        approach:
            'Every channel normalised into one deduplicated pipeline, acknowledged on WhatsApp within a minute, qualified, and routed with an escalation if untouched.',
    },
    {
        sector: 'Professional Services',
        title: 'Assistant over an internal document library',
        problem:
            'Staff asking the same policy and process questions in chat because the answers sit in a folder nobody can search usefully.',
        approach:
            'A retrieval assistant scoped by role, answering with a citation to the source document, and saying it does not know rather than guessing.',
    },
    {
        sector: 'Operations',
        title: 'Invoice and purchase-order matching',
        problem:
            'Finance re-keying invoice data and matching it to purchase orders by eye, with errors surfacing weeks later at reconciliation.',
        approach:
            'Structured extraction, rule-based validation against the PO, automatic filing on a clean match, and a reviewable exception queue for everything else.',
    },
]

export const SCENARIOS_DISCLAIMER =
    'These are representative engagement patterns illustrating the kind of work we do. They are not attributed case studies, and no performance figures are claimed for them. Named references are available on request once a client has agreed to be cited.'
