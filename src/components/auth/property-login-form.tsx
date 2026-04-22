'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export function PropertyLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return
    await login(email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="property-login-email" className="text-slate-700">
          Email
        </Label>
        <Input
          id="property-login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 border-slate-200 bg-white"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="property-login-password" className="text-slate-700">
          Password
        </Label>
        <Input
          id="property-login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 border-slate-200 bg-white"
          placeholder="••••••••"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-md bg-blue-600 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
      </Button>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <Link href="/forgot-password" className="hover:text-blue-700 hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="font-semibold text-blue-600 hover:underline">
          Create account
        </Link>
      </div>
    </form>
  )
}
