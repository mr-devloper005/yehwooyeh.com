'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Phone, MapPin, Info, Home } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const nav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/listings', icon: MapPin },
  { name: 'About us', href: '/about', icon: Info },
  { name: 'Contact us', href: '/contact', icon: Phone },
] as const

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-950/95 text-white shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-blue-600 p-1 sm:h-12 sm:w-12 sm:p-1.5">
            <img
              src="/favicon.png?v=20260401"
              alt=""
              width="40"
              height="40"
              className="h-full w-full origin-center scale-[1.35] object-contain sm:scale-[1.28]"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-lg font-bold tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">Property listings</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            const ItemIcon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('inline-flex items-center gap-1.5 text-sm font-medium transition-colors', isActive ? 'text-white' : 'text-slate-300 hover:text-white')}
              >
                <ItemIcon className="h-3.5 w-3.5 opacity-80" aria-hidden />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild className="h-9 rounded-md px-2.5 text-slate-200 hover:bg-white/10 hover:text-white sm:px-3">
                <Link href="/login" className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button size="sm" asChild className="h-9 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 sm:text-sm">
                <Link href="/listings">Browse</Link>
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
          {nav.map((item) => {
            const MIcon = item.icon
            return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200"
              onClick={() => setOpen(false)}
            >
              <MIcon className="h-4 w-4" />
              {item.name}
            </Link>
          )})}
        </div>
      )}
    </header>
  )
}
