'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'

export function PropertyRegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    const n = name.trim()
    if (!n || !email.trim() || !password) {
      setFormError('Please fill in name, email, and password.')
      return
    }
    if (password.length < 6) {
      setFormError('Use at least 6 characters for your password.')
      return
    }
    if (password !== confirm) {
      setFormError('Passwords do not match.')
      return
    }
    if (!accepted) {
      setFormError('Please accept the terms to continue.')
      return
    }
    await signup(n, email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      {formError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {formError}
        </p>
      )}
      <div className="grid gap-2">
        <Label htmlFor="reg-name" className="text-slate-700">
          Full name
        </Label>
        <Input
          id="reg-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 border-slate-200 bg-white"
          placeholder="Alex Morgan"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg-email" className="text-slate-700">
          Email
        </Label>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 border-slate-200 bg-white"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        <div className="space-y-2">
          <Label htmlFor="reg-pw" className="text-slate-700">
            Password
          </Label>
          <Input
            id="reg-pw"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border-slate-200 bg-white"
            placeholder="min. 6 characters"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-pw2" className="text-slate-700">
            Confirm
          </Label>
          <Input
            id="reg-pw2"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-12 border-slate-200 bg-white"
            placeholder="repeat password"
          />
        </div>
      </div>
      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="reg-terms"
          checked={accepted}
          onCheckedChange={(v) => setAccepted(!!v)}
          className="mt-0.5 border-slate-300"
        />
        <label htmlFor="reg-terms" className="text-sm leading-snug text-slate-600">
          I agree to the{' '}
          <Link href="/terms" className="font-medium text-blue-600 hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          . I understand that Yehwooyeh may send listing alerts and account messages.
        </label>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-md bg-blue-600 text-base font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
      </Button>
      <p className="text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
