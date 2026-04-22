import Link from 'next/link'
import { MapPin, Bath, Bed, Maximize2, ArrowRight } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Button } from '@/components/ui/button'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG } from '@/lib/site-config'
import { FeaturedListingsSlider } from '@/components/haven/featured-listings-slider'
import { TestimonialsRow } from '@/components/haven/testimonials-row'
import { RealEstateInquiryForm } from '@/components/haven/real-estate-inquiry-form'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80'
const COLLAGE = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67aa0?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-acf4e79ef68d?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-0ef3e50e1b69?w=800&q=80',
]
const WHY_IMAGE =
  'https://images.unsplash.com/photo-1600566752224-0fbcf8d5d09e?w=2000&q=80'

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const m = media[0]?.url
  if (m) return m
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  if (typeof c.image === 'string') return c.image
  if (Array.isArray(c.images) && typeof c.images[0] === 'string') return c.images[0] as string
  return '/placeholder.svg?height=640&width=960'
}

function getAddress(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  if (typeof c.address === 'string') return c.address
  if (typeof c.location === 'string') return c.location
  return 'Austin, TX, 78731'
}

function statForIndex(i: number) {
  const beds = [2, 3, 4, 3, 2, 4, 3, 5]
  const baths = [1, 2, 2, 2, 1, 3, 2, 3]
  const sq = [1200, 1950, 2400, 1800, 1500, 2200, 1700, 3200]
  return { b: beds[i % beds.length], t: baths[i % baths.length], s: sq[i % sq.length] }
}

type Props = {
  posts: SitePost[]
}

export function HavenHomeView({ posts }: Props) {
  const grid = posts.length >= 8 ? posts.slice(0, 8) : posts
  const featured = posts.length >= 3 ? posts : posts
  const name = SITE_CONFIG.name

  return (
    <div className="text-slate-900">
      <section className="relative min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          <ContentImage src={HERO_IMAGE} alt="Interior" fill className="object-cover" />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-28 text-center sm:pt-32">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            &ldquo;Your Trusted Partner in Property Management&rdquo;
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Experience seamless property management with {name}. From tenant screening to maintenance, we handle it
            all—so your investment stays protected and profitable.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-md bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700">
              <Link href="/listings">Request a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-md border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="/#inquiry">Send an inquiry</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="explore">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Explore our properties</h2>
          <p className="mt-2 text-slate-600">Enjoy a wide variety of 100+ properties in the market.</p>
        </div>
        {grid.length === 0 ? (
          <p className="mt-8 text-center text-slate-600">No published listings yet. Add a listing to see it here, or check back soon.</p>
        ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {grid.map((post, i) => {
            const { b, t, s } = statForIndex(i)
            const sale = i % 2 === 0
            return (
              <Link
                key={post.id}
                href={`/listings/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ContentImage
                    src={getImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      sale ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {sale ? 'For sale' : 'For rent'}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-slate-900/85 px-2 py-1.5 text-[10px] text-white sm:text-xs">
                    <span className="inline-flex items-center gap-0.5">
                      <Bed className="h-3 w-3" />
                      {b}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Bath className="h-3 w-3" />
                      {t}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Maximize2 className="h-3 w-3" />
                      {s} ft²
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="line-clamp-1 font-bold text-slate-900">{post.title}</h3>
                  <p className="mt-1 flex items-start gap-1.5 text-xs text-slate-500 sm:text-sm">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                    {getAddress(post)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
        )}
        {grid.length > 0 ? (
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-md border-2 border-blue-600 bg-white px-8 text-blue-600 hover:bg-blue-50"
          >
            <Link href="/listings">Load more</Link>
          </Button>
        </div>
        ) : null}
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {COLLAGE.map((src, idx) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[200px]">
                  <ContentImage src={src} alt={`Property interior ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Wide selection of properties</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Explore a wide selection of properties tailored to your needs—from modern apartments to spacious
                family homes. Every listing is vetted and presented with the details you need to decide with confidence.
              </p>
              <Button asChild className="mt-6 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/listings" className="inline-flex items-center gap-2">
                  View listings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0">
          <ContentImage src={WHY_IMAGE} alt="Living space" fill className="object-cover" />
          <div className="absolute inset-0 bg-slate-950/78" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start" id="inquiry">
            <div className="text-white">
              <h2 className="text-2xl font-bold sm:text-3xl">Why our service is the perfect choice</h2>
              <ol className="mt-8 space-y-6">
                {[
                  { n: '01', t: 'Hassle-free property management', d: 'Leasing, renewals, and tenant communication in one place.' },
                  { n: '02', t: 'Maximized rental income', d: 'Pricing guidance and marketing to keep units performing.' },
                  { n: '03', t: '24/7 support & maintenance', d: 'Fast response when something needs fixing—day or night.' },
                ].map((x) => (
                  <li key={x.n} className="flex gap-4">
                    <span className="text-2xl font-light text-blue-300">{x.n}</span>
                    <div>
                      <p className="font-semibold">{x.t}</p>
                      <p className="mt-1 text-sm text-slate-200">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8" id="contact">
              <h3 className="text-lg font-bold text-slate-900">Real estate inquiry form</h3>
              <p className="mt-1 text-sm text-slate-500">Tell us how we can help— we&apos;ll follow up within one business day.</p>
              <div className="mt-6">
                <RealEstateInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Featured listings</h2>
            <p className="mt-1 text-slate-600">Browse a snapshot of our featured properties.</p>
          </div>
          <div className="mt-10">
            <FeaturedListingsSlider posts={featured} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Testimonials</h2>
            <p className="mt-1 text-slate-600">What our clients say about us</p>
          </div>
          <div className="relative mt-10">
            <TestimonialsRow />
          </div>
        </div>
      </section>
    </div>
  )
}
