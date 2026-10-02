import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { ContactDetail, LegalLink, NavLink, SiteConfig } from '@/types'

/**
 * Global site configuration. Every piece of company info rendered on the page comes from
 * here, so updating it before launch is a one-file change.
 * TODO(launch): replace placeholder contact details and the production URL.
 */
export const SITE: SiteConfig = {
  name: 'Atelier Sommet',
  tagline: 'Engineering-grade marketing & software',
  description:
    'A software development and technical marketing agency building high-converting websites, measurable growth and bespoke business software.',
  url: 'https://example.com',
  email: 'hello@example.com',
  phone: '+1 (555) 010-0000',
  location: 'Remote-first · Working worldwide',
  responseTime: 'Within 1 business day',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#demo' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const CONTACT_DETAILS: ContactDetail[] = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
  { label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  { label: 'Location', value: SITE.location, icon: MapPin },
  { label: 'Response time', value: SITE.responseTime, icon: Clock },
]

/** TODO(launch): create these pages (or link to hosted policies). */
export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookie Policy', href: '#cookies' },
]
