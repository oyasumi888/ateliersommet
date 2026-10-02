import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/Button'
import { FormField } from '@/components/FormField'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from '@/constants/content'
import { CONTACT_DETAILS, SITE } from '@/constants/site'
import { useContactForm } from '@/hooks/useContactForm'
import { MESSAGE_MAX } from '@/lib/validation'
import { cn } from '@/lib/cn'

export function Contact() {
  const { values, errors, status, handleChange, handleBlur, handleSubmit } = useContactForm()
  const submitting = status === 'submitting'
  const fieldProps = { onChange: handleChange, onBlur: handleBlur, disabled: submitting }

  return (
    <Section id="contact" labelledBy="contact-title" className="border-t border-line">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-olive-600/15 blur-3xl" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Tell us what you're building."
            description="Share a few details and a senior engineer — not a salesperson — will reply with next steps and, where it makes sense, a fixed-scope proposal."
          />
          <ul className="mt-10 space-y-5">
            {CONTACT_DETAILS.map((d) => {
              const Icon = d.icon
              return (
                <li key={d.label} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="font-medium transition-colors hover:text-accent">
                        {d.value}
                      </a>
                    ) : (
                      <span className="font-medium">{d.value}</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby="contact-title"
          className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-2xl shadow-black/10 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="name" label="Name" error={errors.name}>
              {(a) => <input {...a} {...fieldProps} name="name" type="text" autoComplete="name" value={values.name} placeholder="Jane Doe" />}
            </FormField>
            <FormField id="email" label="Work email" error={errors.email}>
              {(a) => (
                <input {...a} {...fieldProps} name="email" type="email" autoComplete="email" inputMode="email" value={values.email} placeholder="jane@company.com" />
              )}
            </FormField>
            <FormField id="company" label="Company" optional error={errors.company}>
              {(a) => <input {...a} {...fieldProps} name="company" type="text" autoComplete="organization" value={values.company} placeholder="Company Inc." />}
            </FormField>
            <FormField id="service" label="I need help with" error={errors.service}>
              {(a) => (
                <select {...a} {...fieldProps} name="service" value={values.service}>
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
            <FormField id="budget" label="Budget" optional className="sm:col-span-2">
              {(a) => (
                <select {...a} {...fieldProps} name="budget" value={values.budget}>
                  <option value="">Not sure yet</option>
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
            <FormField
              id="message"
              label="Project details"
              error={errors.message}
              hint={`${values.message.trim().length}/${MESSAGE_MAX} · Goals, timeline, current stack — anything helps.`}
              className="sm:col-span-2"
            >
              {(a) => (
                <textarea
                  {...a}
                  {...fieldProps}
                  name="message"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  value={values.message}
                  placeholder="We need a new landing page for our Q1 launch and want proper conversion tracking…"
                  className={cn(a.className, 'resize-y')}
                />
              )}
            </FormField>
          </div>

          {/* Honeypot — hidden from people and assistive tech, catches naive bots. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
          </div>

          <div className="mt-5">
            <label className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                {...fieldProps}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                className="mt-0.5 size-4 shrink-0 accent-olive-600"
              />
              <span>
                I agree that {SITE.name} may store these details to respond to my enquiry. See our{' '}
                <a href="#privacy" className="underline underline-offset-2 hover:text-accent">
                  privacy policy
                </a>
                .
              </span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                {errors.consent}
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
            <div role="status" aria-live="polite" className="text-sm">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="size-4" aria-hidden /> Thanks — we'll be in touch {SITE.responseTime.toLowerCase()}.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-red-500 dark:text-red-400">
                  <AlertCircle className="size-4" aria-hidden /> Something went wrong. Please email{' '}
                  <a className="underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </Section>
  )
}
