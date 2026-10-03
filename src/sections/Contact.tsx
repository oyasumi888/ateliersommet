import { CalendarDays, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/Button'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { CONTACT, CONTACT_DETAILS, SITE } from '@/constants/site'

const MAIL_SUBJECT = encodeURIComponent(`Project enquiry: ${SITE.name}`)
const MAIL_BODY = encodeURIComponent(
  'Hi,\n\nA few details about our project:\n\n- Company:\n- What we need help with:\n- Timeline:\n- Budget (optional):\n\nThanks!',
)

/**
 * Static contact section: no form and no backend. Visitors reach out through the channels
 * configured in `VITE_CONTACT_*` env vars; unset channels are not rendered.
 */
export function Contact() {
  const hasChannel = Boolean(CONTACT.email || CONTACT.phone || CONTACT.bookingUrl)

  return (
    <Section id="contact" labelledBy="contact-title" className="border-t border-line">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-olive-600/15 blur-3xl" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Tell us what you're building."
            description="Share a few details and a senior engineer, not a salesperson, will reply with next steps and, where it makes sense, a fixed-scope proposal."
          />
          {hasChannel && (
            <div className="mt-8 flex flex-wrap gap-3">
              {CONTACT.email && (
                <Button href={`mailto:${CONTACT.email}?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`} size="lg">
                  <Mail className="size-4" aria-hidden />
                  Email us
                </Button>
              )}
              {CONTACT.bookingUrl && (
                <Button href={CONTACT.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
                  <CalendarDays className="size-4" aria-hidden />
                  Book a call
                </Button>
              )}
              {CONTACT.phone && !CONTACT.bookingUrl && (
                <Button href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} size="lg" variant="secondary">
                  <Phone className="size-4" aria-hidden />
                  Call us
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-2xl shadow-black/10 sm:p-8">
          <ul className="grid gap-5 sm:grid-cols-2">
            {CONTACT_DETAILS.map((d) => {
              const Icon = d.icon
              return (
                <li key={d.label} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="font-medium break-words transition-colors hover:text-accent">
                        {d.value}
                      </a>
                    ) : (
                      <span className="font-medium break-words">{d.value}</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">
            Helpful to include: your company, what you need help with (web, SEO &amp; analytics, or bespoke software), your
            timeline and, if you have one, a budget range.
          </p>
          {!hasChannel && import.meta.env.DEV && (
            <p className="mt-4 rounded-xl border border-dashed border-line p-4 font-mono text-xs text-muted">
              Dev note: no contact channel is configured. Set VITE_CONTACT_EMAIL, VITE_CONTACT_PHONE or
              VITE_CONTACT_BOOKING_URL in .env.local.
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
