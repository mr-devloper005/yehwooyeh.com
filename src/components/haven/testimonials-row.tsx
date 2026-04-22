'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const REVIEWS = [
  {
    name: 'David Elson',
    date: 'March 12, 2026',
    text: 'The team made renting out our property completely stress-free. Communications were clear and maintenance was handled quickly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Sarah Mitchell',
    date: 'February 2, 2026',
    text: 'We found a great home in days. The listing details were accurate and the showing process was smooth from start to finish.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'James Ruiz',
    date: 'January 18, 2026',
    text: 'Professional, responsive, and great at maximizing rental income while keeping our tenants happy. Highly recommend.',
    avatar: 'https://images.unsplash.com/photo-1472099643955-5658abf4ff4e?w=200&q=80',
  },
]

export function TestimonialsRow() {
  const [offset, setOffset] = useState(0)
  const len = REVIEWS.length
  const prev = () => setOffset((o) => (o - 1 + len) % len)
  const next = () => setOffset((o) => (o + 1) % len)
  const ordered = [...REVIEWS.slice(offset), ...REVIEWS.slice(0, offset)]

  return (
    <div className="relative">
      <div className="md:flex md:items-stretch md:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="mb-4 hidden h-10 w-10 shrink-0 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 md:mb-0 md:flex"
          onClick={prev}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {ordered.map((r) => (
            <div key={`${r.name}-${offset}`} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border border-slate-200">
                  <AvatarImage src={r.avatar} alt={r.name} />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.date}</p>
                  <div className="mt-1 flex text-blue-600">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="ml-auto mt-4 hidden h-10 w-10 shrink-0 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 md:mb-0 md:mt-0 md:flex"
          onClick={next}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4 flex justify-center gap-3 md:hidden">
        <Button type="button" variant="outline" size="icon" className="rounded-full border-blue-200 text-blue-600" onClick={prev} aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="rounded-full border-blue-200 text-blue-600" onClick={next} aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
