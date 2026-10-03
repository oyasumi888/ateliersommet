import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/Button'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { getServices } from '@/constants/services'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/cn'
import type { ServiceId } from '@/types'

/**
 * Services as an accessible tab list (WAI-ARIA tabs pattern: arrow keys, Home/End).
 * Content comes from `constants/services.ts` and the `services` key of the i18n dictionaries.
 */
export function Services() {
  const { t } = useLocale()
  const services = getServices(t)
  const [activeId, setActiveId] = useState<ServiceId>(services[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const active = services.find((s) => s.id === activeId) ?? services[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = services.findIndex((s) => s.id === activeId)
    const nextIndex = {
      ArrowRight: (i + 1) % services.length,
      ArrowDown: (i + 1) % services.length,
      ArrowLeft: (i - 1 + services.length) % services.length,
      ArrowUp: (i - 1 + services.length) % services.length,
      Home: 0,
      End: services.length - 1,
    }[e.key]
    if (nextIndex === undefined) return
    e.preventDefault()
    const next = services[nextIndex]
    setActiveId(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <Section id="services" labelledBy="services-title" className="border-t border-line">
      <SectionHeading
        id="services-title"
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        description={t.services.description}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div role="tablist" aria-label={t.services.tablistLabel} aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-3">
          {services.map((service, index) => {
            const selected = service.id === activeId
            const Icon = service.icon
            return (
              <button
                key={service.id}
                ref={(el) => {
                  tabRefs.current[service.id] = el
                }}
                role="tab"
                type="button"
                id={`tab-${service.id}`}
                aria-selected={selected}
                aria-controls={`panel-${service.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(service.id)}
                className={cn(
                  'group flex items-start gap-4 rounded-2xl border p-5 text-left transition-colors',
                  selected ? 'border-accent/60 bg-accent-soft' : 'border-line bg-surface hover:border-accent/40',
                )}
              >
                <span
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl transition-colors',
                    selected ? 'bg-accent-strong text-paper' : 'bg-surface-2 text-accent',
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <span className="mt-0.5 block font-medium">{service.shortTitle}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className="animate-fade-up rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{active.summary}</p>
            </div>
            <div className="shrink-0 rounded-2xl border border-line bg-bg px-5 py-4 sm:text-right">
              <p className="font-mono text-2xl font-semibold text-accent">{active.metric.value}</p>
              <p className="mt-1 max-w-[12rem] text-xs text-muted">{active.metric.label}</p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {active.features.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line bg-bg/60 p-5">
                <h4 className="font-medium">{f.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{t.services.deliverables}</h4>
              <ul className="mt-4 space-y-2.5">
                {active.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{t.services.typicalStack}</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
              <Button href="#contact" variant="secondary" className="mt-8">
                {t.services.discuss(active.shortTitle)}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
