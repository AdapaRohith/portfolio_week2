import { company, addressLine, url } from '@/lib/company'
import type { Service } from '@/lib/services'
import type { FaqItem } from '@/lib/faq'

const postalAddress = () => ({
    '@type': 'PostalAddress',
    ...(company.address.street ? { streetAddress: company.address.street } : {}),
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    ...(company.address.postalCode ? { postalCode: company.address.postalCode } : {}),
    addressCountry: company.address.country,
})

/**
 * Organization + LocalBusiness in one node. `sameAs` and the identifiers are
 * how the brand gets disambiguated from the unrelated "Avlok" entity that
 * currently owns the token in search results.
 */
export const organizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': url('/#organization'),
    name: company.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    url: url('/'),
    logo: url('/AvlokAi.png'),
    image: url('/AvlokAi.png'),
    description:
        'AvlokAI builds production AI automation — RAG chatbots, CRM workflows, and WhatsApp automation — for businesses in Hyderabad and across India, engineered by a team with an offensive-security background.',
    email: company.email,
    telephone: company.phone,
    address: postalAddress(),
    areaServed: [
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'Country', name: 'India' },
    ],
    foundingDate: company.foundingDate,
    sameAs: [...company.sameAs],
    ...(company.gstin || company.cin
        ? {
              identifier: [
                  ...(company.gstin
                      ? [{ '@type': 'PropertyValue', propertyID: 'GSTIN', value: company.gstin }]
                      : []),
                  ...(company.cin
                      ? [{ '@type': 'PropertyValue', propertyID: 'CIN', value: company.cin }]
                      : []),
              ],
          }
        : {}),
    contactPoint: [
        {
            '@type': 'ContactPoint',
            email: company.email,
            telephone: company.phone,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi', 'te'],
        },
        {
            '@type': 'ContactPoint',
            email: company.grievanceOfficer.email,
            contactType: 'customer support',
            name: company.grievanceOfficer.title,
        },
    ],
    founder: [
        {
            '@type': 'Person',
            name: 'Sushanth Kasturi',
            jobTitle: 'Founder and CEO',
            knowsAbout: ['AI automation', 'VAPT', 'digital forensics', 'application security'],
        },
        { '@type': 'Person', name: 'Rohith', jobTitle: 'Co-Founder and CTO' },
    ],
})

export const websiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': url('/#website'),
    url: url('/'),
    name: company.name,
    publisher: { '@id': url('/#organization') },
})

export const serviceSchema = (service: Service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: url(`/services/${service.slug}`),
    provider: { '@id': url('/#organization') },
    areaServed: [
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${service.title} automations`,
        itemListElement: service.highlights.map((h) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: h },
        })),
    },
})

export const faqSchema = (items: readonly FaqItem[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
})

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: url(crumb.path),
    })),
})

/** Kept for the organization address string used in the footer. */
export const organizationAddressLine = addressLine
