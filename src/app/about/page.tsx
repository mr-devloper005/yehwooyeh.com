import Link from 'next/link'
import { CheckCircle2, Home, KeyRound, Shield, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HavenPageShell } from '@/components/haven/haven-page-shell'
import { ContentImage } from '@/components/shared/content-image'

const process = [
  {
    step: '01',
    title: 'Search & shortlist',
    text: 'Filter by area, price, and property type. Save favorites and get alerts when similar homes hit the market.',
  },
  {
    step: '02',
    title: 'Tour with confidence',
    text: 'Schedule in-person or virtual showings. Every listing is reviewed for accuracy and clear disclosure.',
  },
  {
    step: '03',
    title: 'Move forward',
    text: 'Whether you rent, buy, or need ongoing management, we help you through applications and handover.',
  },
]

const values = [
  { icon: Shield, title: 'Transparency', text: 'Plain-language listings, clear fees, and honest timelines—no hidden surprises.' },
  { icon: Users, title: 'People first', text: 'Our team brings local market sense and a calm, professional tone to every touchpoint.' },
  { icon: Home, title: 'Full journey', text: 'From the first search to move-in day (and property care after), we support the whole path.' },
]

export default function AboutPage() {
  return (
    <HavenPageShell
      title="How we work at Yehwooyeh"
      description="We are a property-first platform: fewer distractions, more signal, and a process built around real showings, real homes, and real people."
      eyebrow="Our process"
      actions={
        <>
          <Button
            asChild
            className="rounded-md border-0 bg-blue-600 px-5 text-white hover:bg-blue-700"
          >
            <Link href="/listings">Browse properties</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-md border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            <Link href="/contact">Talk to us</Link>
          </Button>
        </>
      }
      heroTall
    >
      <div className="space-y-16 sm:space-y-20">
        <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why Yehwooyeh exists</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Property decisions are some of the biggest you will make. Yehwooyeh exists to make discovery feel
              modern—crisp photos, real addresses, and filters that work—while keeping a human line open when you need
              a question answered.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We focus exclusively on property listings, search, and related services so you are not wading through
              unrelated content to find a place to live or work.
            </p>
            <ul className="mt-6 space-y-3">
              {['Listing quality that puts clarity before clutter', 'Support for renters, buyers, and owners in one system', 'Tools that feel fast on mobile and on desktop'].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
            <ContentImage
              src="https://images.unsplash.com/photo-1600566753190-acf4e79ef68d?w=1200&q=80"
              alt="Modern interior"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 flex items-center gap-2 text-blue-600">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Our process</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">A simple, repeatable flow</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="relative rounded-xl border border-slate-100 bg-slate-50/80 p-6">
                <span className="text-3xl font-light text-blue-200">{p.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">What we stand for</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col items-center rounded-2xl border border-blue-200 bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12 text-center text-white sm:px-10">
          <KeyRound className="h-10 w-10 text-blue-300" />
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Ready to open the next chapter?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Browse active listings, or message us for management and off-market options.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-md bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/listings">View listings</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/search">Search</Link>
            </Button>
          </div>
        </section>
      </div>
    </HavenPageShell>
  )
}
