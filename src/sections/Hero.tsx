import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { ArrowRight, Check, MousePointerClick, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useLocale } from '@/hooks/useLocale'

export function Hero() {
  const { t } = useLocale()
  const hero = t.hero
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Backdrop: olive glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-olive-600/25 blur-3xl" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-accent" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.headline.split('. ').map((part, i, arr) => (
              <span key={part} className={i === arr.length - 1 ? 'text-accent' : undefined}>
                {part}
                {i < arr.length - 1 ? '. ' : ''}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href="#services" size="lg" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <Check className="size-4 text-accent" aria-hidden />
            {hero.trustLine}
          </p>
        </div>

        <HeroPreview performance={hero.performance} conversionRate={hero.conversionRate} />
      </Container>
    </section>
  )
}

/**
 * Interactive preview: a browser mock-up that tilts toward the pointer, with floating
 * metric cards. Purely decorative (aria-hidden) — replace with a real case study later.
 */
function HeroPreview({ performance, conversionRate }: { performance: string; conversionRate: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 10 })
  }

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative animate-fade-up [animation-delay:150ms] [perspective:1200px]"
    >
      <div
        className="relative rounded-[var(--radius-card)] border border-line bg-surface shadow-2xl shadow-black/40 transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-ink-500" />
          <span className="size-2.5 rounded-full bg-ink-500" />
          <span className="size-2.5 rounded-full bg-olive-500" />
          <div className="ml-3 flex-1 truncate rounded-md bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted">
            https://your-next-launch.com
          </div>
        </div>

        {/* Mini landing page skeleton */}
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded-full bg-fg/80" />
            <div className="flex gap-2">
              <div className="h-2 w-10 rounded-full bg-muted/40" />
              <div className="h-2 w-10 rounded-full bg-muted/40" />
              <div className="h-2 w-10 rounded-full bg-muted/40" />
            </div>
          </div>
          <div className="space-y-2.5 pt-4">
            <div className="h-5 w-4/5 rounded-md bg-fg/85" />
            <div className="h-5 w-3/5 rounded-md bg-accent" />
            <div className="h-2.5 w-11/12 rounded-full bg-muted/35" />
            <div className="h-2.5 w-3/4 rounded-full bg-muted/35" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="flex h-8 w-28 items-center justify-center rounded-full bg-accent-strong">
              <MousePointerClick className="size-3.5 text-paper" />
            </div>
            <div className="h-8 w-24 rounded-full border border-line" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-xl border border-line bg-surface-2/60 p-3">
                <div className="size-5 rounded-md bg-accent-soft" />
                <div className="h-2 w-full rounded-full bg-muted/35" />
                <div className="h-2 w-2/3 rounded-full bg-muted/25" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating metric cards */}
      <MetricCard
        className="-bottom-6 -left-4 sm:-left-8"
        icon={<Zap className="size-4" />}
        label={performance}
        value="98"
        suffix="/100"
      />
      <MetricCard
        className="-top-6 -right-2 [animation-delay:1.5s] sm:-right-6"
        icon={<TrendingUp className="size-4" />}
        label={conversionRate}
        value="+38"
        suffix="%"
      />
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  suffix,
  className,
}: {
  icon: ReactNode
  label: string
  value: string
  suffix: string
  className?: string
}) {
  return (
    <div
      className={`absolute flex animate-float items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur ${className ?? ''}`}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">{icon}</span>
      <span>
        <span className="block text-[11px] text-muted">{label}</span>
        <span className="font-mono text-lg font-semibold">
          {value}
          <span className="text-sm text-muted">{suffix}</span>
        </span>
      </span>
    </div>
  )
}
