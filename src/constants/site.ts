import { Clock, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import type { ContactDetail, ContactInfo, LegalLink, NavLink, SiteConfig } from '@/types'

const env = (value: string | undefined) => value?.trim() ?? ''

/**
 * Global site configuration. Every piece of company info rendered on the page comes from
 * here, so updating it before launch is a one-file change.
 * The production URL comes from `VITE_SITE_URL` (see `.env.example`).
 */
export const SITE: SiteConfig = {
  name: 'Atelier Sommet',
  tagline: 'Engineering-grade marketing & software',
  description:
    'A software development and technical marketing agency building high-converting websites, measurable growth and bespoke business software.',
  url: env(import.meta.env.VITE_SITE_URL).replace(/\/+$/, '') || 'https://example.com',
  responseTime: 'Within 1 business day',
}

/**
 * Contact details come from `VITE_CONTACT_*` environment variables (see `.env.example`),
 * so they live in `.env.local` / the hosting dashboard instead of the repository.
 */
export const CONTACT: ContactInfo = {
  name: env(import.meta.env.VITE_CONTACT_NAME),
  email: env(import.meta.env.VITE_CONTACT_EMAIL),
  phone: env(import.meta.env.VITE_CONTACT_PHONE),
  address: env(import.meta.env.VITE_CONTACT_ADDRESS),
  bookingUrl: env(import.meta.env.VITE_CONTACT_BOOKING_URL),
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Capabilities', href: '/#demo' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

/** Only the details that are configured are listed. */
export const CONTACT_DETAILS: ContactDetail[] = [
  CONTACT.name && { label: 'Contact', value: CONTACT.name, icon: UserRound },
  CONTACT.email && { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
  CONTACT.phone && { label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  CONTACT.address && { label: 'Location', value: CONTACT.address, icon: MapPin },
  { label: 'Response time', value: SITE.responseTime, icon: Clock },
].filter((d): d is ContactDetail => Boolean(d))

/** Standalone pages (`privacy.html`, ...) served at clean URLs. Content: `constants/legal.ts`. */
export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]
