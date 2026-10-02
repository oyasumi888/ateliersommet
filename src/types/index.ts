import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Site & navigation                                                   */
/* ------------------------------------------------------------------ */

/** Ids of the page sections; used for anchors and nav highlighting. */
export type SectionId = 'home' | 'services' | 'demo' | 'about' | 'contact'

export interface NavLink {
  label: string
  href: `#${SectionId}`
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
  email: string
  phone: string
  location: string
  /** Typical first-response time shown next to the contact form. */
  responseTime: string
}

export interface LegalLink {
  label: string
  href: string
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

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export type BudgetRange = '' | 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus'

export interface ContactFormValues {
  name: string
  email: string
  company: string
  /** Service the visitor is interested in; empty string = not selected. */
  service: ServiceId | 'other' | ''
  budget: BudgetRange
  message: string
  consent: boolean
  /** Honeypot field: real users never fill it. */
  website: string
}

export type ContactFormField = keyof ContactFormValues

export type ContactFormErrors = Partial<Record<ContactFormField, string>>

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}
