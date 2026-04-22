'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function HavenContactForm() {
  const { toast } = useToast()
  const [sending, setSending] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      toast({
        title: 'Message sent',
        description: 'We will reply within one business day.',
      })
      e.currentTarget.reset()
    }, 500)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-slate-700">
            Name
          </Label>
          <Input id="contact-name" name="name" required className="h-11 border-slate-200 bg-white" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-slate-700">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            className="h-11 border-slate-200 bg-white"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-topic" className="text-slate-700">
          Topic
        </Label>
        <Input
          id="contact-topic"
          name="topic"
          className="h-11 border-slate-200 bg-white"
          placeholder="e.g. Listing a property, showings, billing"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-slate-700">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          className="min-h-[160px] border-slate-200 bg-white"
          placeholder="How can we help? Include the address or listing link if relevant."
        />
      </div>
      <Button
        type="submit"
        disabled={sending}
        className="h-12 rounded-md bg-blue-600 text-base font-semibold text-white hover:bg-blue-700"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send message'}
      </Button>
    </form>
  )
}
