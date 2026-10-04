import { CalendarDays, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/Button'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { CONTACT, getContactDetails, SITE, telHref } from '@/constants/site'
import { useLocale } from '@/hooks/useLocale'

/**
 * Static contact section: no form and no backend. Visitors reach out through the channels
 * configured in `VITE_CONTACT_*` env vars; unset channels are not rendered.
 */
export function Contact() {
  const { t } = useLocale()
  const c = t.contact
  const hasChannel = Boolean(CONTACT.email || CONTACT.phone || CONTACT.bookingUrl)
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(c.mailSubject(SITE.name))}&body=${encodeURIComponent(c.mailBody)}`

  return (
    <Section id="contact" labelledBy="contact-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} description={c.description} />
          {hasChannel && (
            <div className="mt-8 flex flex-wrap gap-3">
              {CONTACT.email && (
                <Button href={mailto} size="lg">
                  <Mail className="size-4" aria-hidden />
                  {c.emailUs}
                </Button>
              )}
              {CONTACT.bookingUrl && (
                <Button href={CONTACT.bookingUrl} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
                  <CalendarDays className="size-4" aria-hidden />
                  {c.bookCall}
                </Button>
              )}
              {CONTACT.phone && !CONTACT.bookingUrl && (
                <Button href={telHref(CONTACT.phone)} size="lg" variant="secondary">
                  <Phone className="size-4" aria-hidden />
                  {c.callUs}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-2xl shadow-black/10 sm:p-8">
          <ul className="grid gap-5 sm:grid-cols-2">
            {getContactDetails(t).map((d) => {
              const Icon = d.icon
              return (
                <li key={d.label} className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-bg text-accent">
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
            {c.helpful} {c.privacyBefore}{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-accent">
              {c.privacyLink}
            </a>{' '}
            {c.privacyAfter}
          </p>
          {!hasChannel && import.meta.env.DEV && (
            <p className="mt-4 rounded-md border border-dashed border-line p-4 font-mono text-xs text-muted">{c.devNote}</p>
          )}
        </div>
      </div>
    </Section>
  )
}
