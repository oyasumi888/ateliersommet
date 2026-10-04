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

/** Language-independent site settings. Translated copy lives in `constants/i18n`. */
export interface SiteConfig {
  name: string
  /** Production URL. Placeholder until the domain is attached. */
  url: string
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

/* ------------------------------------------------------------------ */
/* Internationalization                                                */
/* ------------------------------------------------------------------ */

export type Locale = 'en' | 'es'

export type PrincipleId = 'measure' | 'code' | 'secure' | 'ownership'

export type OptimizationId = 'images' | 'split' | 'third' | 'fonts' | 'edge'

/** Translatable part of a service; id, icon and stack live in `constants/services.ts`. */
export type ServiceText = Omit<Service, 'id' | 'icon' | 'stack'>

/**
 * Every string shown on the site for one language. `constants/i18n/en.ts` and `es.ts`
 * implement it, so TypeScript flags any missing translation.
 */
export interface Dictionary {
  meta: { title: string; description: string }
  common: {
    skipToContent: string
    tagline: string
    responseTime: string
    switchTheme: (next: 'dark' | 'light') => string
    /** Label of the language button: the language it switches to. */
    languageButton: string
    switchLanguage: string
  }
  nav: {
    links: Record<Exclude<SectionId, 'home'>, string>
    primaryLabel: string
    mobileLabel: string
    bookCall: string
    openMenu: string
    closeMenu: string
    home: string
  }
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    primaryCta: string
    secondaryCta: string
    trustLine: string
  }
  services: {
    eyebrow: string
    title: string
    description: string
    tablistLabel: string
    deliverables: string
    typicalStack: string
    discuss: (service: string) => string
    items: Record<ServiceId, ServiceText>
  }
  demo: {
    eyebrow: string
    title: string
    description: string
    chooseDemo: string
    themeLab: string
    performanceLab: string
    siteTheme: string
    siteThemeHint: string
    themes: Record<'dark' | 'light', string>
    accentToken: string
    accentHint: string
    cornerRadius: string
    radii: { sharp: string; soft: string; round: string }
    previewLabel: string
    preview: {
      getStarted: string
      badge: string
      headline: string
      body: string
      startTrial: string
      bookDemo: string
      channel: (n: number) => string
    }
    optimizationsLegend: string
    toggleOptimizations: string
    baseline: string
    optimizations: Record<OptimizationId, { label: string; detail: string }>
    metrics: { lcp: string; tbt: string; cls: string; weight: string }
    score: string
    disclaimer: string
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    howWeWork: string
    team: string
    clientsSay: string
    stats: Stat[]
    principles: Record<PrincipleId, { title: string; description: string }>
    members: TeamMember[]
    testimonials: Testimonial[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    emailUs: string
    bookCall: string
    callUs: string
    labels: { contact: string; email: string; phone: string; location: string; responseTime: string }
    helpful: string
    privacyBefore: string
    privacyLink: string
    privacyAfter: string
    devNote: string
    mailSubject: (site: string) => string
    mailBody: string
  }
  footer: {
    navigate: string
    services: string
    legal: string
    rights: (year: number, site: string) => string
    backToTop: string
  }
  legal: {
    links: Record<LegalDocumentId, string>
    backToSite: string
    documentsLabel: string
    eyebrow: string
    lastUpdated: string
    contactIntro: string
    contactFallbackBefore: string
    contactFallbackLink: string
    contactLabels: { company: string; email: string; phone: string; address: string }
  }
}
