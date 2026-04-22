import Link from 'next/link'
import { CheckCircle2, Home } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { PropertyRegisterForm } from '@/components/auth/property-register-form'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const perks = [
  'Save properties and get notified when new matches appear',
  'Faster showings and applications with one profile',
  'Optional listing tools when you are ready to rent or sell',
]

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen bg-[#f0f4fb] text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
          <div className="grid gap-0 lg:min-h-[560px] lg:grid-cols-2">
            <div className="relative min-h-[260px] p-8 text-white lg:order-2 lg:min-h-0 lg:p-10">
              <div className="absolute inset-0" aria-hidden>
                <ContentImage
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67aa0?w=1200&q=80"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-900/50" />
              <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between lg:min-h-full">
                <div>
                  <Link
                    href="/"
                    className="inline-flex w-fit items-center gap-2 text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    <Home className="h-4 w-4" />
                    Back to home
                  </Link>
                  <h1 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl lg:mt-8">Create your Yehwooyeh account</h1>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-200">
                    Join the same calm, property-first experience you see on the homepage—built for search, shortlists, and
                    when you are ready, publishing.
                  </p>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-slate-200 lg:mt-0">
                  {perks.map((line) => (
                    <li key={line} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">New account</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Sign up in under a minute</h2>
              <p className="mt-1 text-sm text-slate-600">
                Your data stays in local storage for this preview—use a real email when a backend is connected.
              </p>
              <PropertyRegisterForm />
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          Browsing as a guest?{' '}
          <Link href="/listings" className="font-semibold text-blue-600 hover:underline">
            View listings
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}
