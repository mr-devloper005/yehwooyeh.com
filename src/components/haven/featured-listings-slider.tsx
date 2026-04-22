'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { MapPin, Bath, Bed } from 'lucide-react'

type Props = {
  posts: SitePost[]
}

function getImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  return media[0]?.url || '/placeholder.svg?height=640&width=960'
}

function getAddress(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  if (typeof c.address === 'string') return c.address
  if (typeof c.location === 'string') return c.location
  return 'Austin, TX'
}

export function FeaturedListingsSlider({ posts }: Props) {
  const list = posts.slice(0, 6)
  const [page, setPage] = useState(0)
  const perPage = 3
  const maxPage = Math.max(0, Math.ceil(list.length / perPage) - 1)

  useEffect(() => {
    if (list.length <= perPage) return
    const t = setInterval(() => setPage((p) => (p >= maxPage ? 0 : p + 1)), 5000)
    return () => clearInterval(t)
  }, [list.length, maxPage])

  const visible = list.slice(page * perPage, page * perPage + perPage)
  if (!visible.length) {
    return <p className="text-center text-slate-600">Featured listings will appear when properties are available.</p>
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {visible.map((post) => (
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
              <span className="absolute left-3 top-3 rounded bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">FEATURED</span>
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-slate-900/80 px-3 py-2 text-xs text-white">
                <span className="inline-flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />3
                </span>
                <span className="inline-flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />2
                </span>
                <span>1,950 ft²</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{post.title}</h3>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                {getAddress(post)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {list.length > perPage ? (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${i === page ? 'bg-blue-600' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
