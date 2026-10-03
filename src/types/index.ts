import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Site & navigation                                                   */
/* ------------------------------------------------------------------ */

/** Ids of the page sections; used for anchors and nav highlighting. */
export type SectionId = 'home' | 'services' | 'demo' | 'about' | 'contact'

export interface NavLink {
  label: string
  /** Root-relative so the links also work from the legal pages. */
  href: `/#${SectionId}`
}

export interface ContactDetail {
  label: string
  value: string
  /** Optional link target (mailto:, tel:, https://). */
  href?: string
  icon: LucideIcon
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  /** Production URL. Placeholder until the domain is attached. */
  url: string
  /** Typical first-response time shown next to the contact form. */
  responseTime: string
}

/** Contact details read from `VITE_CONTACT_*` env vars; empty string = not configured. */
export interface ContactInfo {
  name: string
  email: string
  phone: string
  address: string
  bookingUrl: string
}

export interface LegalLink {
  label: string
  href: string
}

/* ------------------------------------------------------------------ */
/* Legal pages                                                         */
/* ------------------------------------------------------------------ */

export type LegalDocumentId = 'privacy' | 'terms' | 'cookies'

/** A paragraph, a bullet list, a table, or the site's contact details. */
export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { contact: true }

export interface LegalSection {
  heading: string
  body: LegalBlock[]
}

export interface LegalDocument {
  id: LegalDocumentId
  title: string
  /** Short summary, used for the meta description. */
  description: string
  intro: string[]
  sections: LegalSection[]
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceId = 'web' | 'seo' | 'software'

export interface ServiceFeature {
  title: string
  description: string
}

export interface ServiceMetric {
  /** Display value, e.g. "+38%" or "< 1.2s". */
  value: string
  label: string
}

export interface Service {
  id: ServiceId
  /** Short label used in tabs. */
  shortTitle: string
  title: string
  summary: string
  icon: LucideIcon
  features: ServiceFeature[]
  deliverables: string[]
  /** Representative tech used for this service. */
  stack: string[]
  metric: ServiceMetric
}

/* ------------------------------------------------------------------ */
/* About, team & social proof                                          */
/* ------------------------------------------------------------------ */

export interface Principle {
  title: string
  description: string
  icon: LucideIcon
}

export interface Stat {
  value: string
  label: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  /** Shown as an avatar fallback until real photos exist. */
  initials: string
  /** Optional photo URL (put files in /public/team). */
  avatarUrl?: string
  links?: { label: string; href: string }[]
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  /** Which service the testimonial relates to. */
  serviceId?: ServiceId
}
