import Link from 'next/link'
import { Clock, Mail, MapPin, Phone, Wrench, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HavenPageShell } from '@/components/haven/haven-page-shell'
import { HavenContactForm } from '@/components/haven/haven-contact-form'

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@yehwooyeh.com'
  const contactEmailHref = `mailto:${contactEmail}`

  const channels = [
    { icon: Phone, label: 'Phone', value: '+1 (512) 555-0100', href: 'tel:+15125550100', sub: 'Mon-Fri 9:00-18:00' },
    { icon: Mail, label: 'Email', value: contactEmail, href: contactEmailHref, sub: 'Replies within one business day' },
    { icon: MapPin, label: 'Service area', value: 'Austin & surrounding', href: '/about', sub: 'Virtual consults available' },
  ]

  const quick = [
    {
      title: 'Schedule a showing',
      text: 'Mention a listing link or address and preferred times-we will confirm with the property contact.',
      href: '/listings',
    },
    { title: 'Owner & landlord inquiries', text: 'Questions about management, marketing, and tenant support.', href: '/help' },
    {
      title: 'Press & partnerships',
      text: 'Media, brokerage collaborations, and API access-get routed to the right person.',
      href: contactEmailHref,
    },
  ]

  return (
    <HavenPageShell
      title="Get in touch"
      description="We route every message to the right specialist-listings, showings, care, and billing. Tell us a bit about your situation; we will respond with a clear next step."
      eyebrow="Contact"
      actions={
        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild variant="outline" className="rounded-md border-white/70 bg-transparent text-white hover:bg-white/15">
            <Link href={contactEmailHref}>Email us</Link>
          </Button>
          <Button asChild className="rounded-md bg-white text-slate-900 hover:bg-slate-100">
            <Link href="tel:+15125550100">Call now</Link>
          </Button>
        </div>
      }
      heroTall
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm text-slate-500">
            Prefer a call?{' '}
            <Link className="font-medium text-blue-600 hover:underline" href="tel:+15125550100">
              +1 (512) 555-0100
            </Link>
          </p>
          {channels.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.label}
                href={c.href}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{c.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{c.sub}</p>
                </div>
              </a>
            )
          })}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-blue-600" />
            Weekend coverage for maintenance emergencies where properties are under management.
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Send a message</h2>
          <p className="mt-1 text-sm text-slate-600">
            Fields marked in your browser can be autofill; your note goes only to our team for this request.
          </p>
          <div className="mt-6">
            <HavenContactForm />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {quick.map((q) => (
          <div key={q.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
            <h3 className="font-semibold text-slate-900">{q.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{q.text}</p>
            <Link href={q.href} className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline">
              Open &rarr;
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 space-y-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10" id="maintenance">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
            <Wrench className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Maintenance requests</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            If you are a tenant in a Yehwooyeh-managed home, use this contact form with &ldquo;maintenance&rdquo; in the
            topic, include the unit address, a short description, and any photos. For urgent water or electrical issues
            that affect safety, call the phone number above and ask for the maintenance line. We will triage and, when
            applicable, dispatch a vetted partner from our network.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10" id="rent-payments">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Rent &amp; payments</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            For billing questions, due dates, receipts, and payment plan options, message us with your lease or listing ID
            in the form. We never ask for full bank details over email-once we verify your file, you will get the secure
            portal or accepted payment method for your account. If you are an owner, we can walk through payout
            timing and tax documents.
          </p>
        </section>
      </div>
    </HavenPageShell>
  )
}
