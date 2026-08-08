import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import LegalLayout, { LegalSection, LegalList } from '@/components/LegalLayout'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { company, addressLine } from '@/lib/company'

export const metadata = pageMetadata({
    title: 'Terms of Service | AvlokAI',
    description:
        'AvlokAI’s terms of service: scope and change control, payment milestones, IP ownership of deliverables, warranties, limitation of liability, data protection, termination, and governing law (Hyderabad, Telangana).',
    path: '/terms',
})

const entityName = company.legalName || company.name

export default function TermsOfService() {
    return (
        <>
            <JsonLd
                data={breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Terms of Service', path: '/terms' },
                ])}
            />
            <LegalLayout
                title="Terms of Service"
                intro="These terms govern use of this website and, where no separate signed agreement exists, our delivery of automation work. Where a signed statement of work or master services agreement covers an engagement, that document prevails over these terms to the extent of any conflict."
            >
                <LegalSection id="parties" heading="1. Parties and acceptance">
                    <p>
                        These terms are between <strong>{entityName}</strong> (&ldquo;AvlokAI&rdquo;, &ldquo;we&rdquo;),
                        of {addressLine}, and the person or entity engaging us (&ldquo;Client&rdquo;, &ldquo;you&rdquo;).
                        You accept them by using this website, by submitting an enquiry, or by instructing us to begin
                        work.
                    </p>
                </LegalSection>

                <LegalSection id="services" heading="2. Services, scope, and change control">
                    <LegalList
                        items={[
                            'Each engagement is defined by a written statement of work (SOW) setting out deliverables, acceptance criteria, assumptions, dependencies, fees, and a delivery schedule.',
                            'Anything not in the SOW is out of scope. Requests outside it are quoted as a written change order and take effect only when you approve it in writing; approved changes may move the delivery schedule.',
                            'Delivery dates assume you meet the dependencies named in the SOW — access, credentials, sample data, and review turnaround. Delay in those moves the schedule by at least the equivalent period.',
                            'We may engage sub-contractors and sub-processors, and we remain responsible for their work.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="client-obligations" heading="3. Your responsibilities">
                    <LegalList
                        items={[
                            'Provide accurate information, timely access to the systems named in the SOW, and a nominated decision-maker who can approve work.',
                            'Hold the licences and accounts a build depends on — CRM seats, model-provider accounts, messaging platform access — in your own name.',
                            'Ensure you have the lawful basis and consents needed for any personal data you make available to us or ask us to process.',
                            'Review and test deliverables against the acceptance criteria within the review window in the SOW.',
                            'Comply with the terms of the third-party platforms a build runs on. Section 6 sets out where we will not build regardless of instruction.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="fees" heading="4. Fees, milestones, and taxes">
                    <LegalList
                        items={[
                            'Work is quoted fixed-price against the SOW and invoiced across milestones — typically scoping and design, build, and handover — unless the SOW states otherwise.',
                            'Invoices are payable within 15 days of the invoice date unless a different period is agreed in the SOW.',
                            'Fees are exclusive of GST and any other applicable taxes, which are charged additionally at the prevailing rate.',
                            'Overdue amounts carry interest at 1.5% per month, or the maximum permitted by law if lower, from the due date until paid.',
                            'We may suspend work and withhold handover on invoices more than 30 days overdue, after giving 7 days’ written notice.',
                            'Third-party costs incurred on your behalf — model-provider usage, hosting, messaging fees, paid connectors — are yours, and are billed at cost where we front them.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="acceptance" heading="5. Acceptance">
                    <p>
                        Deliverables are deemed accepted when they meet the acceptance criteria in the SOW, or if you do
                        not raise a written defect within the review window stated there (10 business days if none is
                        stated). We fix defects against the acceptance criteria at no charge; changes to those criteria
                        are handled as change orders under section 2.
                    </p>
                </LegalSection>

                <LegalSection id="platform-compliance" heading="6. Platform and messaging compliance">
                    <p>
                        Some things we will not build, whatever the instruction, because they put your accounts and
                        business at risk:
                    </p>
                    <LegalList
                        items={[
                            <><strong>Unsolicited bulk messaging.</strong> We build only on the official WhatsApp Business Platform, with documented opt-in for every recipient, pre-approved templates for business-initiated messages, and working opt-out handling. We do not build on unofficial APIs or broadcast tools.</>,
                            <><strong>Review gating.</strong> Google prohibits soliciting reviews only from customers predicted to be satisfied, and prohibits incentivised reviews. Review-request automations we build send to every eligible customer, unfiltered by sentiment. This is a design constraint, not a preference.</>,
                            <><strong>Scraping or messaging without a lawful basis</strong>, and any flow whose purpose is to evade a platform’s rate limits, verification, or policy enforcement.</>,
                        ]}
                    />
                    <p>
                        Promotional messaging in India is additionally subject to TRAI&rsquo;s TCCCPA regulations and DLT
                        registration. Registration, sender-ID, and template obligations under that regime sit with you as
                        the sender. We will build to them and will tell you what they require, but we cannot register on
                        your behalf.
                    </p>
                </LegalSection>

                <LegalSection id="ip" heading="7. Intellectual property">
                    <LegalList
                        items={[
                            <><strong>Your material.</strong> You keep all rights in the data, content, trademarks, and systems you give us access to. You grant us a licence to use them only to deliver the engagement.</>,
                            <><strong>Deliverables.</strong> On full payment of all sums due for an engagement, we assign to you all rights in the bespoke deliverables built for you under that SOW — workflow definitions, prompts, configuration, and custom code.</>,
                            <><strong>Our background IP.</strong> We keep ownership of everything we brought to the engagement or develop generally — internal libraries, templates, tooling, patterns, and know-how. Where a deliverable includes our background IP, you get a perpetual, worldwide, non-exclusive, royalty-free licence to use, modify, and maintain it as part of that deliverable, including through another vendor.</>,
                            <><strong>Third-party components.</strong> Open-source and third-party components stay under their own licences, which we identify at handover.</>,
                            <><strong>Reference.</strong> We may describe the engagement in general terms as a representative scenario. We will not name you, use your logo, or quote you without your written permission.</>,
                        ]}
                    />
                </LegalSection>

                <LegalSection id="confidentiality" heading="8. Confidentiality">
                    <p>
                        Each party will keep the other&rsquo;s confidential information in confidence, use it only for the
                        engagement, protect it with at least reasonable care, and disclose it only to people who need it
                        and are under equivalent obligations. This does not cover information that is public through no
                        breach, was already lawfully known, is independently developed, or must be disclosed by law —
                        with notice to the other party where notice is lawful. These obligations run for 3 years after
                        the engagement ends, and indefinitely for trade secrets.
                    </p>
                </LegalSection>

                <LegalSection id="data-protection" heading="9. Data protection">
                    <p>
                        Where we process personal data on your behalf, we do so as a processor on your documented
                        instructions under a data-processing agreement, which is offered as standard and forms part of
                        the engagement. Our sub-processors, transfer position, retention periods, and breach-notification
                        commitments are published in our <Link href="/privacy">Privacy Policy</Link>.
                    </p>
                    <p>
                        <strong>Health data.</strong> AvlokAI is not an accredited auditor and issues no HIPAA, ISO 27001,
                        or SOC 2 attestation or certification. We do not accept protected health information from a US
                        covered entity unless a Business Associate Agreement has been executed first, and any engagement
                        involving PHI is governed by that BAA in addition to these terms.
                    </p>
                </LegalSection>

                <LegalSection id="warranty" heading="10. Warranties and disclaimers">
                    <LegalList
                        items={[
                            'We warrant that we will perform with reasonable skill and care, in a professional manner, and that deliverables will conform to the acceptance criteria in the SOW for 30 days after acceptance. Our sole obligation for a breach of that warranty is to correct the deliverable, or to refund the fees paid for it if correction is not practicable.',
                            'Automations depend on third-party systems — model providers, messaging platforms, CRMs, cloud infrastructure — whose availability, pricing, and policies we do not control. We give no guarantee of uninterrupted availability of those systems or of any automation running on them, and no availability or uptime commitment exists unless a separate support agreement states one in writing.',
                            'Language-model outputs are probabilistic. We build validation, confidence thresholds, and human-review paths where the SOW calls for them, and we do not warrant that any AI-generated output will be accurate, complete, or fit for a purpose not stated in the SOW. Where output affects a decision with legal, financial, or clinical consequences, a human review step is required and is your responsibility to operate.',
                            'Except as expressly stated here, all other warranties, conditions, and terms implied by statute or common law are excluded to the fullest extent permitted by law.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="liability" heading="11. Limitation of liability">
                    <LegalList
                        items={[
                            'Neither party excludes liability for death or personal injury caused by its negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.',
                            'Neither party is liable for indirect, incidental, special, or consequential loss, or for loss of profit, revenue, anticipated savings, business, goodwill, or data, however arising, even if advised of the possibility.',
                            'Subject to the above, each party’s total aggregate liability arising out of or in connection with an engagement — whether in contract, tort (including negligence), or otherwise — is capped at the total fees paid by you to us under that engagement in the 12 months preceding the event giving rise to the claim.',
                            'Claims must be brought within 12 months of the date the claiming party knew, or ought reasonably to have known, of the circumstances giving rise to them.',
                        ]}
                    />
                    <p>
                        These limits reflect the fixed-price basis on which work is quoted. If you need a higher cap for
                        a particular engagement, say so at scoping — it is negotiable, and it is priced.
                    </p>
                </LegalSection>

                <LegalSection id="indemnity" heading="12. Indemnities">
                    <LegalList
                        items={[
                            'You indemnify us against claims arising from the content and data you provide, from your use of a deliverable in a way the SOW did not contemplate, from your breach of a third-party platform’s terms after handover, and from your failure to hold the consents needed for data you asked us to process.',
                            'We indemnify you against third-party claims that a bespoke deliverable, as delivered by us, infringes that third party’s intellectual property rights — excluding claims arising from your material, from third-party components under their own licences, or from modifications made after handover. Our liability under this indemnity is subject to the cap in section 11.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="termination" heading="13. Term and termination">
                    <LegalList
                        items={[
                            'Either party may terminate an engagement on 30 days’ written notice, or immediately on the other’s material breach that is not cured within 15 days of written notice, or on the other’s insolvency.',
                            'On termination you pay for all work performed and all third-party costs committed up to the termination date, and we hand over work in progress in the state it has reached.',
                            'Sections on confidentiality, intellectual property, data protection, liability, indemnities, and governing law survive termination.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="force-majeure" heading="14. Force majeure">
                    <p>
                        Neither party is liable for delay or failure caused by events beyond its reasonable control —
                        including natural disaster, war, civil unrest, epidemic, government action, failure of internet
                        or power infrastructure, or the outage or discontinuation of a third-party platform an engagement
                        depends on. The affected party notifies the other promptly and both work in good faith to
                        reschedule. If the event continues for more than 60 days, either party may terminate the affected
                        engagement.
                    </p>
                </LegalSection>

                <LegalSection id="disputes" heading="15. Governing law and dispute resolution">
                    <LegalList
                        items={[
                            'These terms and any engagement are governed by the laws of India.',
                            'The parties will first attempt in good faith to resolve any dispute by discussion between senior representatives within 30 days of written notice of the dispute.',
                            'Failing that, the dispute is referred to arbitration by a sole arbitrator under the Arbitration and Conciliation Act 1996. The seat and venue of arbitration is Hyderabad, Telangana, and the language is English.',
                            'Subject to the above, the courts at Hyderabad, Telangana have exclusive jurisdiction. Nothing prevents either party from seeking urgent interim relief from those courts.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="general" heading="16. General">
                    <LegalList
                        items={[
                            'These terms, together with the applicable SOW and data-processing agreement, are the entire agreement between the parties on their subject matter.',
                            'If any provision is held unenforceable, the rest continues in force and the provision is read down to the minimum extent needed to make it enforceable.',
                            'A failure to enforce a right is not a waiver of it.',
                            'Neither party may assign the agreement without the other’s written consent, except to a successor to substantially all of its business.',
                            'Nothing here creates a partnership, joint venture, employment, or agency relationship.',
                            'Notices are given in writing to the email addresses the parties nominate in the SOW, and to us at ' + company.email + '.',
                            'We may update these terms for future engagements. The effective date at the top reflects the current version, and the version in force when an engagement was signed continues to govern it.',
                        ]}
                    />
                </LegalSection>

                <LegalSection id="contact" heading="17. Contact">
                    <p>
                        Questions about these terms: <a href={`mailto:${company.email}`}>{company.email}</a>, or write to
                        us at {addressLine}.
                    </p>
                </LegalSection>
            </LegalLayout>
        </>
    )
}
