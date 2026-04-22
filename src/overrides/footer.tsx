'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl border-b border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Newsletter signup</h2>
            <p className="mt-1 text-sm text-slate-400">Get new listings and market updates in your inbox.</p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
            action="#"
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="h-12 flex-1 rounded-md border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-md bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-blue-600/40 p-1">
                <img
                  src="/favicon.png?v=20260401"
                  alt=""
                  width="32"
                  height="32"
                  className="h-full w-full origin-center scale-[1.35] object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {SITE_CONFIG.tagline} — your partner for property listings, tours, and management support.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/listings" className="hover:text-white">
                  Find rental &amp; sale listings
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  Learn about our process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/help#listing-support" className="hover:text-white">
                  Listing support
                </Link>
              </li>
              <li>
                <Link href="/help#showings" className="hover:text-white">
                  Showings &amp; applications
                </Link>
              </li>
              <li>
                <Link href="/contact#maintenance" className="hover:text-white">
                  Maintenance requests
                </Link>
              </li>
              <li>
                <Link href="/contact#rent-payments" className="hover:text-white">
                  Rent &amp; payments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500 sm:text-sm">
          © {new Date().getFullYear()} {SITE_CONFIG.name} — All rights reserved
        </p>
      </div>
    </footer>
  )
}
