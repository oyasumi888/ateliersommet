import { Clock, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { parseSiteEnv } from '@/lib/env'
import type { ContactDetail, ContactInfo, Dictionary, LegalDocumentId, LegalLink, NavLink, SiteConfig } from '@/types'

/** Cleaned and validated `VITE_*` values; invalid ones are '' (and fail the production build). */
export const ENV = parseSiteEnv(import.meta.env).env

/**
 * Language-independent site settings. Translated copy (tagline, response time, labels)
 * lives in `constants/i18n/*.ts`.
 * The production URL comes from `VITE_SITE_URL` (see `.env.example`).
 */
export const SITE: SiteConfig = {
  name: 'Atelier Sommet',
  url: ENV.siteUrl || 'https://example.com',
}

/**
 * Contact details come from `VITE_CONTACT_*` environment variables (see `.env.example`),
 * so they live in `.env.local` / the hosting dashboard instead of the repository.
 */
export const CONTACT: ContactInfo = {
  name: ENV.contactName,
  email: ENV.contactEmail,
  phone: ENV.contactPhone,
  address: ENV.contactAddress,
  bookingUrl: ENV.bookingUrl,
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`

export const NAV_SECTIONS = ['services', 'demo', 'about', 'contact'] as const

/** Root-relative section links, so they also work from the legal pages. */
export const getNavLinks = (t: Dictionary): NavLink[] =>
  NAV_SECTIONS.map((id) => ({ label: t.nav.links[id], href: `/#${id}` }))

/** Only the details that are configured are listed. */
export const getContactDetails = (t: Dictionary): ContactDetail[] => {
  const l = t.contact.labels
  return [
    CONTACT.name && { label: l.contact, value: CONTACT.name, icon: UserRound },
    CONTACT.email && { label: l.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
    CONTACT.phone && { label: l.phone, value: CONTACT.phone, href: telHref(CONTACT.phone), icon: Phone },
    CONTACT.address && { label: l.location, value: CONTACT.address, icon: MapPin },
    { label: l.responseTime, value: t.common.responseTime, icon: Clock },
  ].filter((d): d is ContactDetail => Boolean(d))
}

const LEGAL_PAGES: LegalDocumentId[] = ['privacy', 'terms', 'cookies']

/** Standalone pages (`privacy.html`, ...) served at clean URLs. Content: `constants/legal`. */
export const getLegalLinks = (t: Dictionary): LegalLink[] =>
  LEGAL_PAGES.map((id) => ({ label: t.legal.links[id], href: `/${id}` }))
