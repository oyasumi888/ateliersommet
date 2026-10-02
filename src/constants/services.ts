import { Gauge, LineChart, Workflow } from 'lucide-react'
import type { Service, ServiceId } from '@/types'

/**
 * The agency's core services. Rendered by the Services section (tabs) and used to build
 * the "service" select in the contact form. Add an entry here to add a service — see
 * DOCUMENTATION.md → "Adding a new service".
 */
export const SERVICES: Service[] = [
  {
    id: 'web',
    shortTitle: 'High-Conversion Web',
    title: 'High-Conversion Web',
    summary:
      'Landing pages and marketing sites engineered for speed and persuasion. We design around your funnel, build on a modern stack, and keep it fast long after launch.',
    icon: Gauge,
    features: [
      {
        title: 'Conversion-led landing pages',
        description:
          'Message hierarchy, offer framing and CTA placement driven by your funnel data — not templates.',
      },
      {
        title: 'Performance engineering',
        description:
          'Core Web Vitals in the green: optimized media, code-splitting, edge caching and lean bundles.',
      },
      {
        title: 'Care & maintenance plans',
        description:
          'Monthly updates, uptime monitoring, security patches and A/B iteration on a predictable retainer.',
      },
    ],
    deliverables: [
      'UX wireframes & UI design',
      'Responsive build (React / Next.js / Astro)',
      'CMS integration',
      'A/B testing setup',
      'Uptime & performance monitoring',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Headless CMS'],
    metric: { value: '< 1.2s', label: 'median LCP on shipped pages' },
  },
  {
    id: 'seo',
    shortTitle: 'Technical SEO & Analytics',
    title: 'Technical SEO & Analytics',
    summary:
      'Data-driven growth starts with a healthy site and trustworthy numbers. We fix what search engines trip over and instrument what your team actually needs to measure.',
    icon: LineChart,
    features: [
      {
        title: 'Technical audits & site health',
        description:
          'Crawlability, indexation, structured data, internal linking and Core Web Vitals — prioritized by impact.',
      },
      {
        title: 'Analytics & tracking architecture',
        description:
          'GA4, server-side tagging, consent mode and clean event schemas your team can trust.',
      },
      {
        title: 'Growth dashboards',
        description:
          'Looker Studio or custom dashboards connecting traffic, leads and revenue in one view.',
      },
    ],
    deliverables: [
      'Technical SEO audit & roadmap',
      'Schema.org structured data',
      'GA4 / GTM implementation',
      'Conversion tracking & attribution',
      'Monthly reporting',
    ],
    stack: ['Google Search Console', 'GA4', 'GTM (server-side)', 'BigQuery', 'Looker Studio'],
    metric: { value: '+62%', label: 'avg. organic sessions after 6 months' },
  },
  {
    id: 'software',
    shortTitle: 'Bespoke Software & ERP',
    title: 'Bespoke Software & ERP Systems',
    summary:
      'Custom business automation and internal tools built around how your company really works — replacing spreadsheets, glue scripts and tools that almost fit.',
    icon: Workflow,
    features: [
      {
        title: 'Tailored ERP modules',
        description:
          'Inventory, orders, invoicing, HR or production planning — scoped to your process, integrated with your stack.',
      },
      {
        title: 'Workflow automation',
        description:
          'Integrations and background jobs that eliminate copy-paste work between your systems.',
      },
      {
        title: 'Internal tools & portals',
        description:
          'Admin panels, client portals and dashboards with roles, audit logs and secure access.',
      },
    ],
    deliverables: [
      'Discovery & process mapping',
      'System architecture & data model',
      'Web application build',
      'Third-party integrations & APIs',
      'Training, docs & support',
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST / GraphQL', 'Docker'],
    metric: { value: '20+ h', label: 'saved per employee each month' },
  },
]

export const getServiceById = (id: ServiceId): Service | undefined =>
  SERVICES.find((service) => service.id === id)
