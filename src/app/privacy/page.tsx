import Link from 'next/link'
import { HavenPageShell } from '@/components/haven/haven-page-shell'

const sections = [
  {
    title: 'Who we are',
    body: `Yehwooyeh ("we", "us") operates this website to help you discover property listings, request tours, and contact our team. This policy explains what we collect, why we process it, and the choices you have. It applies to visitors, account holders, and people who message us through forms or email.`,
  },
  {
    title: 'Information we collect',
    body: `We may collect: (1) account details such as name, email, and phone when you register or save a listing; (2) content you submit—messages, application materials you choose to upload, and maintenance reports; (3) device and usage data like approximate region, pages viewed, and search queries, to keep the product fast and safe; (4) communications you send to support, including optional attachments. We do not require sensitive government IDs on public pages unless a specific application flow needs them, and we ask you to redact what you can.`,
  },
  {
    title: 'How we use your information',
    body: `We use data to run the service: show listings, send transactional email (alerts, confirmations), improve search relevance, prevent abuse, and comply with law. We may send product updates you can opt out of; we will always allow you to manage marketing preferences where applicable. We do not sell your personal information for third-party ad profiling on this experience.`,
  },
  {
    title: 'Sharing',
    body: `We share information with service providers who host our infrastructure, deliver email, or help with fraud prevention—under contracts that limit use. When you request a tour or apply for a home, we may pass your contact details to the party responsible for that property, as you would expect. We may disclose information if required by law or to protect rights and safety.`,
  },
  {
    title: 'Retention & security',
    body: `We keep account and message data as long as your account is active and for a reasonable period afterward for legal, tax, and dispute needs. We use industry-standard safeguards; no system is 100% secure, so protect your password and let us know if you see suspicious activity.`,
  },
  {
    title: 'Your rights',
    body: `Depending on where you live, you may have the right to access, correct, delete, or export your data, or to object to certain processing. Contact us with the subject line "Privacy request" and we will verify and respond within the timeframes required by law. You may also lodge a complaint with a supervisory authority in your country.`,
  },
  {
    title: 'Children',
    body: `Our service is not directed at children under 16. We do not knowingly collect their data. If you believe we have, contact us and we will delete it promptly.`,
  },
  {
    title: 'International transfers',
    body: `If you access the site from outside the country where we operate primary servers, your data may be processed in countries with different rules. We use appropriate safeguards as required (e.g. standard contractual clauses) where applicable.`,
  },
  {
    title: 'Changes',
    body: `We may update this policy; the "Last updated" date will change. Material changes will be posted here and, when appropriate, highlighted in the product. Continued use after updates means you accept the revised policy.`,
  },
  {
    title: 'Contact (privacy)',
    body: `Questions about this policy: use our contact form or write to the privacy address shown in your account area when logged in. For data subject requests, include enough detail to locate your file without over-sharing sensitive documents in email bodies.`,
  },
]

export default function PrivacyPage() {
  return (
    <HavenPageShell
      title="Privacy policy"
      description="How Yehwooyeh handles personal data when you browse listings, create an account, and work with our team."
      eyebrow="Legal"
      heroImageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=2000&q=80"
    >
      <p className="mb-10 text-sm text-slate-500">Last updated: April 22, 2026</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <article
            key={s.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
            <p className="mt-3 whitespace-pre-line text-slate-600 leading-relaxed">{s.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-slate-500">
        Related:{' '}
        <Link href="/terms" className="font-medium text-blue-600 hover:underline">
          Terms of service
        </Link>
      </p>
    </HavenPageShell>
  )
}
