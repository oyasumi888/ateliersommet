import { Code2, Compass, Handshake, ShieldCheck } from 'lucide-react'
import type { BudgetRange, Principle, SelectOption, Stat, TeamMember, Testimonial } from '@/types'
import { SERVICES } from './services'

/* Hero ---------------------------------------------------------------- */

export const HERO = {
  eyebrow: 'Software & technical marketing agency',
  headline: 'Websites that convert. Software that scales.',
  subheadline:
    'We build high-converting landing pages, fix the technical SEO and analytics behind your growth, and engineer bespoke software that runs your operations — with the rigor of a product team.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'Explore services', href: '#services' },
  trustLine: 'Fixed-scope proposals · Senior engineers only · You own all the code',
} as const

/* About --------------------------------------------------------------- */

export const ABOUT = {
  eyebrow: 'About us',
  title: 'A small senior team that treats marketing like engineering.',
  paragraphs: [
    'We are developers, designers and analysts who got tired of watching good businesses lose leads to slow pages, broken tracking and software that never quite fit. So we built an agency that works the way a strong product team does.',
    'Every engagement starts with measurement: what is converting, what is leaking, and what is costing your team hours. Then we ship in small, reviewable increments — typed code, automated checks, documented decisions — so you always know what you are paying for and you own everything we build.',
  ],
} as const

export const PRINCIPLES: Principle[] = [
  {
    title: 'Measure first',
    description: 'Decisions come from your data — analytics, field performance and user behavior — not opinions.',
    icon: Compass,
  },
  {
    title: 'Production-grade code',
    description: 'TypeScript, tests, code review and CI on every project, whether it is a landing page or an ERP.',
    icon: Code2,
  },
  {
    title: 'Secure by default',
    description: 'Least-privilege access, dependency hygiene and privacy-respecting analytics from day one.',
    icon: ShieldCheck,
  },
  {
    title: 'No lock-in',
    description: 'You own the repositories, accounts and documentation. We stay because we add value.',
    icon: Handshake,
  },
]

/** TODO(launch): replace with real, verifiable numbers. */
export const STATS: Stat[] = [
  { value: '95+', label: 'Lighthouse performance target' },
  { value: '100%', label: 'Code ownership for clients' },
  { value: '< 24h', label: 'Response time' },
  { value: '3', label: 'Core disciplines, one team' },
]

/** TODO(launch): replace placeholder team members with real profiles. */
export const TEAM: TeamMember[] = [
  {
    name: 'Founder Name',
    role: 'Principal Engineer & Founder',
    bio: 'Full-stack engineer focused on performance, architecture and business software.',
    initials: 'FN',
  },
  {
    name: 'Designer Name',
    role: 'Lead UI/UX Designer',
    bio: 'Designs conversion-focused interfaces and design systems that scale.',
    initials: 'DN',
  },
  {
    name: 'Analyst Name',
    role: 'Technical SEO & Analytics Lead',
    bio: 'Turns crawl data and analytics into prioritized growth roadmaps.',
    initials: 'AN',
  },
]

/** Placeholder testimonials — replace with real, approved client quotes before launch. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The new landing page loads instantly and our demo requests almost doubled in the first quarter. The handover docs were better than anything we had internally.',
    author: 'Client Name',
    role: 'Head of Marketing',
    company: 'B2B SaaS company',
    serviceId: 'web',
  },
  {
    quote:
      'They found indexation issues three previous agencies missed, and for the first time our analytics actually match our CRM.',
    author: 'Client Name',
    role: 'Growth Lead',
    company: 'E-commerce brand',
    serviceId: 'seo',
  },
  {
    quote:
      'Our order-to-invoice process went from four spreadsheets and a lot of copy-paste to one internal tool the whole team likes using.',
    author: 'Client Name',
    role: 'Operations Director',
    company: 'Manufacturing SME',
    serviceId: 'software',
  },
]

/* Contact form options ------------------------------------------------ */

export const SERVICE_OPTIONS: SelectOption[] = [
  ...SERVICES.map((s) => ({ value: s.id, label: s.title })),
  { value: 'other', label: 'Something else' },
]

export const BUDGET_OPTIONS: SelectOption<Exclude<BudgetRange, ''>>[] = [
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5k-15k', label: '$5k – $15k' },
  { value: '15k-50k', label: '$15k – $50k' },
  { value: '50k-plus', label: '$50k+' },
]
