import { Gauge, LineChart, Workflow } from 'lucide-react'
import type { Dictionary, Service, ServiceId } from '@/types'

/**
 * The agency's core services: the language-independent part (id, icon, stack). Their copy
 * lives in `constants/i18n/*.ts` under `services.items`. Add an entry here and in each
 * dictionary to add a service — see DOCUMENTATION.md → "Adding a new service".
 */
const SERVICE_BASE: Pick<Service, 'id' | 'icon' | 'stack'>[] = [
  { id: 'web', icon: Gauge, stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Headless CMS'] },
  {
    id: 'seo',
    icon: LineChart,
    stack: ['Google Search Console', 'GA4', 'GTM (server-side)', 'BigQuery', 'Looker Studio'],
  },
  { id: 'software', icon: Workflow, stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST / GraphQL', 'Docker'] },
]

/** Services in display order, with copy in the given language. */
export const getServices = (t: Dictionary): Service[] =>
  SERVICE_BASE.map((base) => ({ ...base, ...t.services.items[base.id] }))

export const getServiceById = (t: Dictionary, id: ServiceId): Service | undefined =>
  getServices(t).find((service) => service.id === id)
