/**
 * Single source of truth for entity, contact, and canonical-host data.
 *
 * The site previously mixed two contact addresses and declared canonicals on a
 * host that 301s elsewhere. Everything now reads from here.
 *
 * Fields left as empty strings are not yet confirmed. Nothing renders them
 * until they are filled in, so the site never shows a placeholder.
 */

/** Canonical host. The server 301s apex -> www, so www is canonical. */
export const SITE_URL = 'https://www.avlokai.com'

export const url = (path = '/') => new URL(path, SITE_URL).toString()

export const company = {
    name: 'AvlokAI',

    /** Registered entity name as it appears on the incorporation certificate. */
    legalName: '',
    /** CIN (Pvt Ltd) or LLPIN (LLP). */
    cin: '',
    /** GSTIN — required by Indian clients to claim input credit. */
    gstin: '',

    email: 'hello@avlokai.com',
    phone: '+919346672015',
    phoneDisplay: '+91 93466 72015',
    whatsapp: 'https://wa.me/message/PMRZLGVTFGGEB1',

    address: {
        street: '',
        locality: 'Hyderabad',
        region: 'Telangana',
        postalCode: '',
        country: 'IN',
        countryName: 'India',
    },

    /** Mandatory under India's DPDP Act 2023 and the IT Rules 2021. */
    grievanceOfficer: {
        name: 'Sushanth Kasturi',
        title: 'Grievance Officer',
        email: 'grievance@avlokai.com',
    },

    foundingDate: '2024',

    /** Entity disambiguation signals — see audit #28 (brand collision). */
    sameAs: [
        'https://www.linkedin.com/company/avlokai/',
        'https://www.instagram.com/avlok.ai/',
    ],
} as const

/** Human-readable single-line address, omitting unconfirmed parts. */
export const addressLine = [
    company.address.street,
    company.address.locality,
    company.address.region,
    company.address.postalCode,
    company.address.countryName,
]
    .filter(Boolean)
    .join(', ')

/** Effective date shown on legal pages. Bump when terms materially change. */
export const LEGAL_EFFECTIVE_DATE = '2026-08-08'
export const LEGAL_EFFECTIVE_DATE_DISPLAY = '8 August 2026'
