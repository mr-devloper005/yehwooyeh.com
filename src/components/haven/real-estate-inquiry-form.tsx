'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export function RealEstateInquiryForm() {
  const { toast } = useToast()
  const [inquiry, setInquiry] = useState('buying')
  const [sending, setSending] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      toast({
        title: 'Message received',
        description: 'We will get back to you shortly.',
      })
    }, 600)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label className="text-slate-700">Inquiry Type</Label>
        <Select value={inquiry} onValueChange={setInquiry}>
          <SelectTrigger className="h-11 border-slate-200 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buying">Buying</SelectItem>
            <SelectItem value="selling">Selling</SelectItem>
            <SelectItem value="renting">Renting</SelectItem>
            <SelectItem value="management">Property management</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inq-name" className="text-slate-700">
          Name
        </Label>
        <Input id="inq-name" required className="h-11 border-slate-200" placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inq-email" className="text-slate-700">
          Email
        </Label>
        <Input id="inq-email" type="email" required className="h-11 border-slate-200" placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inq-phone" className="text-slate-700">
          Phone (optional)
        </Label>
        <Input id="inq-phone" type="tel" className="h-11 border-slate-200" placeholder="+1 555 010 2030" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="inq-msg" className="text-slate-700">
          Message
        </Label>
        <Textarea id="inq-msg" className="min-h-[100px] border-slate-200" placeholder="Tell us what you are looking for…" />
      </div>
      <Button
        type="submit"
        disabled={sending}
        className="h-12 w-full rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700"
      >
        {sending ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  )
}
