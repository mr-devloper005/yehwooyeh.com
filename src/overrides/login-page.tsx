import Link from 'next/link'
import { Home } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { PropertyLoginForm } from '@/components/auth/property-login-form'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return (
    <div className="min-h-screen bg-[#f0f4fb] text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-[280px] bg-slate-900 p-8 text-white lg:min-h-[520px] lg:p-10">
              <div className="absolute inset-0" aria-hidden>
                <ContentImage
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-slate-950/70" />
              <div className="relative z-10 flex h-full flex-col">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center gap-2 text-sm text-slate-200 hover:text-white"
                >
                  <Home className="h-4 w-4" />
                  Back to home
                </Link>
                <h1 className="mt-8 text-2xl font-bold leading-tight sm:mt-12 sm:text-3xl">
                  Sign in to pick up where you left off
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-200">
                  Save searches, shortlist properties, and get alerts. Your session is stored on this device after you
                  sign in.
                </p>
              </div>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Account login</h2>
              <p className="mt-1 text-sm text-slate-600">Use your email and password to continue.</p>
              <PropertyLoginForm />
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          Need an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}
