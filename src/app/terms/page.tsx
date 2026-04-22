import Link from 'next/link'
import { HavenPageShell } from '@/components/haven/haven-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Agreement',
    body: `By accessing or using the Yehwooyeh website and related services (the "Service"), you agree to these Terms. If you use the Service on behalf of a business, you confirm you have authority to bind that business. If you do not agree, do not use the Service.`,
  },
  {
    title: 'The Service',
    body: `We provide tools to search and view property-related content, communicate with us, and in some cases apply or list subject to our policies. Listings and availability are often supplied by third parties; we do not warrant that every description is error-free. You are responsible for verifying material facts (condition, legal status, square footage) before you commit to a lease or purchase.`,
  },
  {
    title: 'Accounts & security',
    body: `You must provide accurate registration information and keep your credentials confidential. You are responsible for activity under your account. Notify us promptly of any unauthorized use. We may suspend accounts that risk the platform, other users, or our infrastructure.`,
  },
  {
    title: 'User content & license',
    body: `If you post listings, images, or messages, you represent you have the rights to do so. You grant Yehwooyeh a non-exclusive, worldwide, royalty-free license to host, display, and distribute that content in connection with operating the Service. You may remove or request removal of your content as described in our processes, subject to legal retention needs.`,
  },
  {
    title: 'Prohibited conduct',
    body: `You will not: misuse the site (scraping in violation of our rules, introducing malware, probing security); harass others; post false, misleading, or discriminatory content; or use the Service for fraud. Fair housing and anti-discrimination laws apply to how you market and select tenants and buyers. We may remove content and cooperate with authorities when required.`,
  },
  {
    title: 'Disclaimers',
    body: `The Service is provided "as is" to the maximum extent permitted by law. We disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We are not a party to your rental or purchase agreement; those transactions are between you and the counterparty, though we may facilitate introductions.`,
  },
  {
    title: 'Limitation of liability',
    body: `To the fullest extent permitted, Yehwooyeh and its suppliers will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising from your use of the Service. Our aggregate liability for any claim is limited to the greater of (a) amounts you paid us in the twelve months before the claim or (b) one hundred dollars, except where the law does not allow such a cap.`,
  },
  {
    title: 'Indemnity',
    body: `You will defend and indemnify Yehwooyeh against claims arising from your content, your use of the Service, or your violation of these Terms or others' rights, including reasonable legal fees.`,
  },
  {
    title: 'Governing law & disputes',
    body: `These Terms are governed by the laws applicable to our operating company, without regard to conflict-of-law rules. You agree to bring disputes in the courts located there, except where consumer rules require otherwise; if you are a consumer, mandatory rights in your country are not limited.`,
  },
  {
    title: 'Changes & contact',
    body: `We may change these Terms; the updated date will be posted. Continued use can constitute acceptance. For questions, contact us through the site. The Service is offered by ${SITE_CONFIG.name} in line with our Privacy Policy.`,
  },
]

export default function TermsPage() {
  return (
    <HavenPageShell
      title="Terms of service"
      description={`The rules for using ${SITE_CONFIG.name}—listings, search, accounts, and communications.`}
      eyebrow="Legal"
      heroImageUrl="https://images.unsplash.com/photo-1589829085416-56d4d4d0e6c3?w=2000&q=80"
    >
      <p className="mb-10 text-sm text-slate-500">Last updated: April 22, 2026</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
            <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">{s.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-slate-500">
        <Link href="/privacy" className="font-medium text-blue-600 hover:underline">
          Privacy policy
        </Link>
      </p>
    </HavenPageShell>
  )
}
