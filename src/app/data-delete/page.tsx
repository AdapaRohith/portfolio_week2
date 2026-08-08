import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import LegalLayout, { LegalSection, LegalList } from '@/components/LegalLayout'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { company, addressLine } from '@/lib/company'

/**
 * Meta / WhatsApp Business API verification requires a reachable, indexable
 * data-deletion URL. This page previously canonicalised to the homepage, which
 * would have dropped it from the index entirely.
 */
export const metadata = pageMetadata({
    title: 'Data Deletion Request | AvlokAI',
    description:
        'How to request deletion of personal data held by AvlokAI: what to send, how we verify it, what gets deleted, what we are legally required to retain, and our response timeline.',
    path: '/data-delete',
})

export default function DataDeletion() {
    return (
        <>
            <JsonLd
                data={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Data Deletion', path: '/data-delete' },
                ])}
            />
            <LegalLayout
                title="Data deletion request"
                intro="You can ask us to delete personal data we hold about you. This page tells you exactly how to make that request, how we verify it, what gets deleted, what we are required by law to keep, and how long it takes."
            >
                <LegalSection id="how" heading="1. How to make a request">
                    <p>
                        Email{' '}
                        <a href={`mailto:${company.grievanceOfficer.email}`}>{company.grievanceOfficer.email}</a> with
                        the subject line <strong>&ldquo;Data deletion request&rdquo;</strong>, from the email address you
                        contacted us from, and include:
                    </p>
                    <LegalList
                        items={[
                            'The email address, phone number, or WhatsApp number the data is associated with',
                            'How you interacted with us — website enquiry, WhatsApp, phone, or as a customer of one of our clients',
                            'Whether you want everything deleted, or only a specific set of data',
                        ]}
                    />
                    <p>
                        There is no fee. You can also write to us at {addressLine}, or call{' '}
                        <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> and we will guide you through it.
                    </p>
                </LegalSection>

                <LegalSection id="verification" heading="2. How we verify it">
                    <p>
                        We confirm the request comes from you before acting on it — usually by replying to the address or
                        number the data is held against. If we cannot verify a request, we will say so rather than delete
                        someone else&rsquo;s data on an unverified instruction. Verification data itself is deleted once
                        the request is closed.
                    </p>
                </LegalSection>

                <LegalSection id="what" heading="3. What gets deleted">
                    <LegalList
                        items={[
                            'Your name, email address, phone number, and company details',
                            'Enquiry content and subsequent correspondence, including WhatsApp message history held by us',
                            'Phone numbers and message logs held in automation workflows we operate',
                            'Personal identifiers held in workflow state, queues, and caches',
                            'API tokens and access credentials associated with you',
                            'Backups, on their normal rotation cycle — within 30 days of the primary deletion',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="exceptions" heading="4. What we may have to keep">
                    <p>
                        Deletion is not always absolute. We may retain a minimum set of data where the law requires it,
                        and we will tell you what we kept and why:
                    </p>
                    <LegalList
                        items={[
                            'Invoices and accounting records, for 8 years under Indian tax and company law',
                            'Records needed to establish, exercise, or defend a legal claim, for as long as that claim is live',
                            'Records of the deletion request itself, so we can show it was honoured',
                            'Consent and opt-out records for messaging, which platform rules require us to be able to produce',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="client-data" heading="5. If you are a customer of one of our clients">
                    <p>
                        Where AvlokAI runs an automation for a business, that business is the data fiduciary for its own
                        customer data and we act as its processor. If your data reached us through one of our clients,
                        send your request to that business — and if you send it to us, we will forward it to them within
                        3 business days and confirm to you that we have. We act on their instruction, and we delete our
                        copy at their direction or when the engagement ends.
                    </p>
                </LegalSection>

                <LegalSection id="timeline" heading="6. Timeline">
                    <LegalList
                        items={[
                            'Acknowledgement within 24 hours',
                            'Verification and deletion completed within 7 days of verification',
                            'Backup rotation completed within 30 days',
                            'Written confirmation to you when it is done, listing anything retained under section 4',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="escalate" heading="7. If you are not satisfied">
                    <p>
                        Our Grievance Officer is <strong>{company.grievanceOfficer.name}</strong> —{' '}
                        <a href={`mailto:${company.grievanceOfficer.email}`}>{company.grievanceOfficer.email}</a>.
                        Grievances are acknowledged within 24 hours and resolved within 15 days. If we do not resolve it
                        to your satisfaction, you may complain to the Data Protection Board of India. Your wider rights,
                        including access and correction, are set out in our{' '}
                        <Link href="/privacy">Privacy Policy</Link>.
                    </p>
                </LegalSection>
            </LegalLayout>
        </>
    )
}
