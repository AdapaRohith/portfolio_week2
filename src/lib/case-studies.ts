export interface CaseStudy {
    sector: string
    title: string
    problem: string
    metric: string
    metricLabel: string
}

// PLACEHOLDER data — replace with real client outcomes before launch.
export const caseStudies: CaseStudy[] = [
    { sector: 'Manufacturing', title: 'Predictive maintenance pipeline', problem: 'Unplanned line downtime drained budget every month.', metric: '38%', metricLabel: 'less downtime' },
    { sector: 'E-Commerce', title: 'Omnichannel inventory sync', problem: 'Oversells across four marketplaces hurt ratings.', metric: '0', metricLabel: 'oversells / month' },
    { sector: 'Healthcare', title: 'Claims processing automation', problem: 'Manual claims took six-plus days to clear.', metric: '5x', metricLabel: 'faster claims' },
    { sector: 'Real Estate', title: 'Lead capture & routing', problem: 'Leads leaked across portals, calls, and WhatsApp.', metric: '2.4x', metricLabel: 'more qualified leads' },
]
