import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

type HavenPageShellProps = {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children: ReactNode
  /** Subtle background image in hero (optional) */
  heroImageUrl?: string
  /** Taller hero for key landing sections */
  heroTall?: boolean
}

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80'

export function HavenPageShell({
  title,
  description,
  eyebrow = 'Yehwooyeh',
  actions,
  children,
  heroImageUrl = DEFAULT_HERO,
  heroTall = false,
}: HavenPageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavbarShell />
      <header className="relative min-h-[220px] overflow-hidden sm:min-h-[260px]">
        <div className="absolute inset-0 min-h-full">
          <ContentImage src={heroImageUrl} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        <div
          className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
            heroTall ? 'py-16 sm:py-20' : 'py-12 sm:py-16'
          }`}
        >
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">{eyebrow}</p>
          )}
          <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h1>
              {description && (
                <p className="mt-3 text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
              )}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">{children}</main>
      <Footer />
    </div>
  )
}
