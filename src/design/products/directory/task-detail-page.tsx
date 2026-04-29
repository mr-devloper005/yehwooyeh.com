'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Tag,
  House,
  Info,
  Calendar,
  Briefcase,
  Contact,
  X,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const websiteHost = website
    ? website.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0]
    : ''

  const sideNavItems = [
    { label: 'Home', icon: House, href: '#home' },
    { label: 'About Us', icon: Info, href: '#about-us' },
    { label: 'Events', icon: Calendar, href: '#events' },
    { label: 'Trade & Markets', icon: Briefcase, href: '#trade-markets' },
    { label: 'Contact', icon: Contact, href: '#contact' },
  ]
  const galleryImages = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images])

  useEffect(() => {
    if (!activeImage) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage])

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#e9ecef] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          ? Back to {taskLabel}
        </Link>

        <section className="overflow-hidden rounded-[22px] border border-slate-300 bg-[#d7dce1]">
          <div className="grid gap-6 bg-[#3756a9] p-6 text-white lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">{category || taskLabel}</p>
              <h1 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{post.title}</h1>
              <RichContent
                html={descriptionHtml}
                className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base [&_p]:m-0 [&_strong]:text-white [&_a]:text-blue-100 [&_a]:underline"
              />
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/20 p-4 backdrop-blur-sm">
              <div className="grid gap-4 sm:grid-cols-[96px_1fr] sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/40 bg-white/20">
                  <button
                    type="button"
                    onClick={() => setActiveImage(images[0] || null)}
                    className="relative block h-full w-full cursor-zoom-in"
                    aria-label="Open image"
                  >
                    <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                  </button>
                </div>
                <div className="space-y-1 text-sm text-blue-50">
                  {location ? <p className="line-clamp-2">{location}</p> : null}
                  {phone ? <p>Tel: {phone}</p> : null}
                  {email ? <p className="break-all">{email}</p> : null}
                  {websiteHost ? <p className="truncate">Url: {websiteHost}</p> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-300 bg-[#dfe4e8] px-6 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700"
              >
                Message
              </button>
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="h-4 w-4" />
                Verified listing
              </span>
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[280px_1fr] lg:items-start">
            <aside className="rounded-2xl border border-slate-300 bg-[#f5f7f8]">
              <div className="border-b border-slate-300 px-4 py-3">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">Company Profile</p>
              </div>
              <nav className="p-2">
                {sideNavItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                      index === 0 ? 'bg-[#d9e9d9] text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ))}
              </nav>
            </aside>

            <div className="rounded-2xl border border-slate-300 bg-[#efefef] p-4">
              <h2 id="home" className="scroll-mt-24 text-4xl font-bold tracking-tight text-slate-900">Home</h2>

              <div id="about-us" className="scroll-mt-24 mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
                <div className="border-b border-slate-200 bg-[#f3f4f6] px-4 py-3">
                  <h3 className="text-2xl font-semibold text-slate-800">Description</h3>
                </div>
                <div className="px-4 py-5">
                  <RichContent html={descriptionHtml} className="text-base leading-8 text-slate-700" />
                  {highlights.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {highlights.slice(0, 6).map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div id="events" className="scroll-mt-24 mt-5 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-800">Business details</p>
                  <div className="mt-3 space-y-2.5 text-sm text-slate-700">
                    {location ? (
                      <div className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <span className="leading-6">{location}</span>
                      </div>
                    ) : null}
                    {phone ? (
                      <div className="flex items-start gap-2.5">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <a href={`tel:${phone}`} className="leading-6 hover:text-slate-900 hover:underline">
                          {phone}
                        </a>
                      </div>
                    ) : null}
                    {email ? (
                      <div className="flex items-start gap-2.5">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <a href={`mailto:${email}`} className="break-all leading-6 hover:text-slate-900 hover:underline">
                          {email}
                        </a>
                      </div>
                    ) : null}
                    {website ? (
                      <div className="flex items-start gap-2.5">
                        <Globe className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <a
                          href={website}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all leading-6 hover:text-slate-900 hover:underline"
                        >
                          {website}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div id="trade-markets" className="scroll-mt-24 rounded-xl border border-slate-300 bg-white p-2">
                  {mapEmbedUrl ? (
                    <iframe
                      src={mapEmbedUrl}
                      title={`${post.title} map`}
                      className="h-[220px] w-full rounded-lg border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="flex h-[220px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
                      Map unavailable
                    </div>
                  )}
                </div>
              </div>

              <div id="contact" className="scroll-mt-24 mt-4 flex flex-wrap gap-2">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Visit website <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Browse more
                </Link>
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700">
                  <Tag className="h-3.5 w-3.5" />
                  {taskLabel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Trusted
                </span>
              </div>

              {images.length > 1 ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className="relative block h-full w-full cursor-zoom-in"
                        aria-label="Open image"
                      >
                        <ContentImage src={image} alt={post.title} fill className="object-cover" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-10 rounded-[22px] border border-slate-300 bg-white p-5">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Related listings</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Keep browsing nearby matches</h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}

        {activeImage ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-slate-950"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
                aria-label="Close image popup"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[16/10] w-full bg-slate-900">
                <ContentImage src={activeImage} alt={post.title} fill className="object-contain" />
              </div>
              {galleryImages.length > 1 ? (
                <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-slate-950 p-3">
                  {galleryImages.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border ${
                        image === activeImage ? 'border-white' : 'border-white/30'
                      }`}
                    >
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
