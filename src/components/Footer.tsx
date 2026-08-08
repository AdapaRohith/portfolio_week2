import Link from 'next/link'
import { company, addressLine } from '@/lib/company'
import { services } from '@/lib/services'

/**
 * Site-wide footer, rendered from the root layout so every page carries the
 * same contact address, entity details, and legal links. Entity fields that
 * are not yet confirmed simply do not render.
 */
export default function Footer() {
    const entityRows = [
        company.legalName && { label: 'Registered entity', value: company.legalName },
        company.cin && { label: 'CIN / LLPIN', value: company.cin },
        company.gstin && { label: 'GSTIN', value: company.gstin },
        addressLine && { label: 'Registered address', value: addressLine },
    ].filter(Boolean) as { label: string; value: string }[]

    const link = 'text-xs sm:text-sm text-muted hover:text-foreground transition-colors'

    return (
        <footer className="py-10 px-5 sm:px-6 border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                    <div>
                        <h2 className="font-display text-xs sm:text-sm font-semibold mb-3">Company</h2>
                        <ul className="space-y-1.5">
                            <li><Link href="/" className={link}>Home</Link></li>
                            <li><Link href="/services" className={link}>Services</Link></li>
                            <li><Link href="/industries" className={link}>Industries</Link></li>
                            <li><Link href="/ai-automation-agency-hyderabad" className={link}>Hyderabad</Link></li>
                            <li><Link href="/contact" className={link}>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-display text-xs sm:text-sm font-semibold mb-3">Services</h2>
                        <ul className="space-y-1.5">
                            {services.slice(0, 4).map((s) => (
                                <li key={s.slug}>
                                    <Link href={`/services/${s.slug}`} className={link}>{s.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-display text-xs sm:text-sm font-semibold mb-3">Legal</h2>
                        <ul className="space-y-1.5">
                            <li><Link href="/privacy" className={link}>Privacy Policy</Link></li>
                            <li><Link href="/terms" className={link}>Terms of Service</Link></li>
                            <li><Link href="/data-delete" className={link}>Data Deletion</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-display text-xs sm:text-sm font-semibold mb-3">Contact</h2>
                        <ul className="space-y-1.5">
                            <li><a href={`mailto:${company.email}`} className={`${link} break-all`}>{company.email}</a></li>
                            <li><a href={`tel:${company.phone}`} className={link}>{company.phoneDisplay}</a></li>
                            <li><a href={company.sameAs[0]} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn</a></li>
                            <li><a href={company.sameAs[1]} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a></li>
                        </ul>
                    </div>
                </div>

                {entityRows.length > 0 && (
                    <dl className="border-t border-border pt-6 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
                        {entityRows.map((row) => (
                            <div key={row.label}>
                                <dt className="font-mono text-[10px] uppercase tracking-wide text-muted">{row.label}</dt>
                                <dd className="text-xs sm:text-sm text-foreground">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} {company.legalName || company.name}. All rights reserved.
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs text-muted">Hyderabad, Telangana · India</p>
                </div>
            </div>
        </footer>
    )
}
