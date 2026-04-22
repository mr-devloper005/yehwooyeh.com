import Link from 'next/link'
import { BookOpen, Building2, Calendar, Search, Wrench, CreditCard, LifeBuoy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HavenPageShell } from '@/components/haven/haven-page-shell'

const faqItems = [
  {
    q: 'How do I list a property on Yehwooyeh?',
    a: 'Create an account, sign in, and use the listing flow to add a new property. Fill in the address, photos, and availability; our checklist flags missing fields so your post goes live clean and complete.',
  },
  {
    q: 'What happens after I request a tour?',
    a: 'We notify the lister or on-site contact with your preferred windows. You will get a confirmation with date, time, and any access notes (lockbox, gate codes, or virtual links).',
  },
  {
    q: 'Do you run background checks for rentals?',
    a: 'For participating landlords, we can outline the screening options available. Requirements vary by owner and local law; we will never charge hidden fees for consent-based checks.',
  },
  {
    q: 'How do I report an incorrect listing detail?',
    a: 'From the listing page, use the contact or flag flow (when shown), or write to support with the URL. We take accuracy seriously and will verify with the owner.',
  },
]

const cards = [
  { icon: BookOpen, title: 'Start here', text: 'New to the site? Open Search, save favorites, and turn on alerts for your price band.', href: '/search' },
  { icon: LifeBuoy, title: 'Need a human', text: 'Stuck on verification or a technical issue? We will get you unstuck in one thread.', href: '/contact' },
  { icon: Search, title: 'Search tips', text: 'Combine neighborhood, beds, and keyword (e.g. &ldquo;garage&rdquo;) to narrow without noise.', href: '/search' },
]

export default function HelpPage() {
  return (
    <HavenPageShell
      title="Help & services"
      description="Practical answers for owners, tenants, and buyers. Jump to listing support, showings, and account basics—or ask us anything."
      eyebrow="Support"
      actions={
        <Button asChild className="rounded-md border-0 bg-white text-slate-900 hover:bg-slate-100">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
      heroImageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=2000&q=80"
      heroTall
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <Icon className="h-8 w-8 text-blue-600" />
              <h2 className="mt-3 text-lg font-bold text-slate-900">{c.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{c.text}</p>
              <Link className="mt-4 text-sm font-semibold text-blue-600 hover:underline" href={c.href}>
                Go
              </Link>
            </div>
          )
        })}
      </div>

      <section
        className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/80 p-8 sm:p-10"
        id="listing-support"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
          <Building2 className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Listing support</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          We help you publish a listing that people trust: good lighting in photos, honest copy, and correct rent or
          price terms. Your account area shows draft vs live status, view counts, and when your listing is due for
          a refresh. For bulk portfolios, ask us about coordinated go-live and branded microsites.
        </p>
        <ul className="mt-6 list-inside list-disc space-y-2 text-slate-600">
          <li>Image guidelines and min resolution so your hero shot looks great on any device</li>
          <li>Category and tag suggestions aligned with how renters actually search</li>
          <li>Compliance reminders for fair housing and local disclosure where applicable</li>
        </ul>
      </section>

      <section
        className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10"
        id="showings"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
          <Calendar className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Showings &amp; applications</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          We coordinate windows that work for you and the occupant, confirm access details, and share what to expect on
          site. Applications are submitted through the property flow when enabled; you can track status and
          follow-ups from your account. If a listing is &ldquo;apply now,&rdquo; have income and ID ready to move quickly.
        </p>
      </section>

      <section
        className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10"
        id="maintenance"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
          <Wrench className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Care &amp; access</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Ongoing care requests for managed properties should include address, a short problem statement, and photos
          for leaks or damage. After-hours triage is described on the{' '}
          <Link href="/contact#maintenance" className="font-medium text-blue-600 hover:underline">
            contact
          </Link>{' '}
          page. We will never ask you to pre-pay a random vendor in cash—our staff coordinates approved partners.
        </p>
      </section>

      <section
        className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50/80 p-8 sm:p-10"
        id="rent"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
          <CreditCard className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Rent &amp; account billing</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Invoices, receipts, and where to pay are listed in your account when applicable. If something does not
          match your lease, open a support thread from{' '}
          <Link href="/contact#rent-payments" className="font-medium text-blue-600 hover:underline">
            contact — rent &amp; payments
          </Link>
          . We will reconcile with the owner file and get you a clear answer, usually within a business day.
        </p>
      </section>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold sm:text-2xl">Frequently asked questions</h2>
        <p className="mt-1 text-slate-300">Short answers—reach out for anything specific to your file.</p>
        <Accordion type="single" collapsible className="mt-6 border-t border-white/10 pt-2 text-left">
          {faqItems.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left text-slate-100 hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-slate-300">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </HavenPageShell>
  )
}
