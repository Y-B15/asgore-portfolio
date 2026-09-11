'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react'
import { submitContact, type ContactPayload } from '@/lib/api'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(payload: ContactPayload): FieldErrors {
  const errors: FieldErrors = {}
  if (!payload.name.trim()) errors.name = 'Please enter your name.'
  if (!payload.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(payload.email))
    errors.email = 'Please enter a valid email address.'
  if (!payload.message.trim()) errors.message = 'Please enter a message.'
  else if (payload.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

export function ContactSection() {
  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string>('')

  const update =
    (field: keyof ContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setServerError('')
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  const inputBase =
    'w-full rounded-md border bg-background/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring'

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading
          index="04"
          title="Contact Me"
          description="Have a project, a community to build, or a role in mind? Send a message and I'll get back to you."
        />

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-success/40 bg-success/10 p-10 text-center glow-primary">
            <CheckCircle2 className="size-12 text-success" />
            <div>
              <h3 className="text-xl font-semibold">Message sent!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Thanks for reaching out — I&apos;ll reply as soon as I can.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 rounded-md border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Ada Lovelace"
                  className={cn(
                    inputBase,
                    errors.name ? 'border-destructive' : 'border-border',
                  )}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com"
                  className={cn(
                    inputBase,
                    errors.email ? 'border-destructive' : 'border-border',
                  )}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  placeholder="Tell me about your project or community..."
                  className={cn(
                    inputBase,
                    'resize-y',
                    errors.message ? 'border-destructive' : 'border-border',
                  )}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <XCircle className="mt-0.5 size-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:glow-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
