import { useId, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Gauge, Moon, Palette, Sun } from 'lucide-react'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { useLocale } from '@/hooks/useLocale'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import type { OptimizationId } from '@/types'

type DemoTab = 'theme' | 'performance'

/**
 * "Proof of work" — two small interactive labs that demonstrate front-end polish:
 * a live theme/design-token switcher and a performance-budget simulator.
 */
export function CapabilityDemo() {
  const [tab, setTab] = useState<DemoTab>('theme')
  const { t } = useLocale()

  return (
    <Section id="demo" labelledBy="demo-title" className="overflow-hidden border-t border-line">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative">
        <SectionHeading
          id="demo-title"
          eyebrow={t.demo.eyebrow}
          title={t.demo.title}
          description={t.demo.description}
        />

        <div role="radiogroup" aria-label={t.demo.chooseDemo} className="mt-10 inline-flex rounded-full border border-line bg-surface p-1">
          {(
            [
              { id: 'theme', label: t.demo.themeLab, icon: Palette },
              { id: 'performance', label: t.demo.performanceLab, icon: Gauge },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors',
                tab === id ? 'bg-accent-strong text-paper' : 'text-muted hover:text-fg',
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">{tab === 'theme' ? <ThemeLab /> : <PerformanceLab />}</div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Theme lab                                                           */
/* ------------------------------------------------------------------ */

const ACCENTS = [
  { label: 'Olive 400', value: 'var(--color-olive-400)' },
  { label: 'Olive 500', value: 'var(--color-olive-500)' },
  { label: 'Olive 600', value: 'var(--color-olive-600)' },
  { label: 'Olive 700', value: 'var(--color-olive-700)' },
] as const

const RADII = [
  { id: 'sharp', value: '4px' },
  { id: 'soft', value: '14px' },
  { id: 'round', value: '28px' },
] as const

function ThemeLab() {
  const { theme, setTheme } = useTheme()
  const { t } = useLocale()
  const d = t.demo
  const [accent, setAccent] = useState<string>(ACCENTS[2].value)
  const [radius, setRadius] = useState<string>(RADII[1].value)

  // Scoped CSS variables: the preview re-themes instantly without touching the rest of the page.
  const previewStyle = { '--demo-accent': accent, '--demo-radius': radius } as CSSProperties

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="space-y-7 rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <Control label={d.siteTheme} hint={d.siteThemeHint}>
          <div className="grid grid-cols-2 gap-2">
            {(['dark', 'light'] as const).map((mode) => (
              <OptionButton key={mode} pressed={theme === mode} onClick={() => setTheme(mode)}>
                {mode === 'dark' ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
                {d.themes[mode]}
              </OptionButton>
            ))}
          </div>
        </Control>

        <Control label={d.accentToken} hint={d.accentHint}>
          <div className="flex gap-3">
            {ACCENTS.map((a) => (
              <button
                key={a.value}
                type="button"
                aria-label={a.label}
                aria-pressed={accent === a.value}
                title={a.label}
                onClick={() => setAccent(a.value)}
                className={cn(
                  'size-9 rounded-full ring-offset-2 ring-offset-surface transition-shadow',
                  accent === a.value ? 'ring-2 ring-fg' : 'ring-0 hover:ring-2 hover:ring-line',
                )}
                style={{ background: a.value }}
              />
            ))}
          </div>
        </Control>

        <Control label={d.cornerRadius}>
          <div className="grid grid-cols-3 gap-2">
            {RADII.map((r) => (
              <OptionButton key={r.value} pressed={radius === r.value} onClick={() => setRadius(r.value)}>
                {d.radii[r.id]}
              </OptionButton>
            ))}
          </div>
        </Control>

        <pre className="overflow-x-auto rounded-xl bg-bg p-4 font-mono text-[11px] leading-relaxed text-muted">
          <code>
            {`[data-theme="${theme}"]\n--accent: ${accent.replace('var(--color-', '').replace(')', '')};\n--radius: ${radius};`}
          </code>
        </pre>
      </div>

      {/* Live preview */}
      <div
        style={previewStyle}
        aria-label={d.previewLabel}
        role="img"
        className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg transition-colors"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="font-semibold">Acme Analytics</span>
          <span className="rounded-[var(--demo-radius)] bg-[var(--demo-accent)] px-4 py-1.5 text-xs font-medium text-paper transition-all">
            {d.preview.getStarted}
          </span>
        </div>
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-[var(--demo-accent)] brightness-125 transition-colors">{d.preview.badge}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{d.preview.headline}</p>
            <p className="mt-3 text-sm text-muted">{d.preview.body}</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-[var(--demo-radius)] bg-[var(--demo-accent)] px-4 py-2 text-sm text-paper transition-all">
                {d.preview.startTrial}
              </span>
              <span className="rounded-[var(--demo-radius)] border border-line px-4 py-2 text-sm transition-all">{d.preview.bookDemo}</span>
            </div>
          </div>
          <div className="space-y-3">
            {[72, 48, 88].map((w, i) => (
              <div key={i} className="rounded-[var(--demo-radius)] border border-line bg-surface p-4 transition-all">
                <div className="flex justify-between text-xs text-muted">
                  <span>{d.preview.channel(i + 1)}</span>
                  <span className="font-mono">{w}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-[var(--demo-accent)] transition-all duration-500" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Control({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-sm font-medium">
        {label}
      </p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

function OptionButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors',
        pressed ? 'border-accent bg-accent-soft text-fg' : 'border-line text-muted hover:text-fg',
      )}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Performance lab                                                     */
/* ------------------------------------------------------------------ */

interface Optimization {
  id: OptimizationId
  /** Effect on each metric (milliseconds / unitless CLS / kilobytes). */
  lcp: number
  tbt: number
  cls: number
  kb: number
}

const BASELINE = { lcp: 4800, tbt: 780, cls: 0.24, kb: 4200 }

const OPTIMIZATIONS: Optimization[] = [
  { id: 'images', lcp: -1700, tbt: 0, cls: -0.06, kb: -2300 },
  { id: 'split', lcp: -450, tbt: -330, cls: 0, kb: -620 },
  { id: 'third', lcp: -500, tbt: -300, cls: -0.03, kb: -540 },
  { id: 'fonts', lcp: -350, tbt: 0, cls: -0.1, kb: -180 },
  { id: 'edge', lcp: -700, tbt: -40, cls: 0, kb: -260 },
]

/** Rough, illustrative score — the real Lighthouse uses log-normal curves per metric. */
function scoreFor({ lcp, tbt, cls }: typeof BASELINE): number {
  const lcpScore = Math.max(0, Math.min(1, (4000 - lcp) / (4000 - 1200)))
  const tbtScore = Math.max(0, Math.min(1, (600 - tbt) / (600 - 100)))
  const clsScore = Math.max(0, Math.min(1, (0.25 - cls) / (0.25 - 0.05)))
  return Math.round(25 + 75 * (0.45 * lcpScore + 0.35 * tbtScore + 0.2 * clsScore))
}

function PerformanceLab() {
  const { t } = useLocale()
  const d = t.demo
  const [enabled, setEnabled] = useState<Set<OptimizationId>>(new Set(['images']))

  const metrics = useMemo(() => {
    const m = { ...BASELINE }
    for (const o of OPTIMIZATIONS) {
      if (!enabled.has(o.id)) continue
      m.lcp += o.lcp
      m.tbt += o.tbt
      m.cls += o.cls
      m.kb += o.kb
    }
    m.cls = Math.max(0.01, m.cls)
    return m
  }, [enabled])

  const score = scoreFor(metrics)

  const toggle = (id: OptimizationId) =>
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <fieldset className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <legend className="sr-only">{d.optimizationsLegend}</legend>
        <p className="text-sm font-medium">{d.toggleOptimizations}</p>
        <p className="mt-0.5 text-xs text-muted">{d.baseline}</p>
        <ul className="mt-5 space-y-2">
          {OPTIMIZATIONS.map((o) => {
            const on = enabled.has(o.id)
            return (
              <li key={o.id}>
                <label
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors',
                    on ? 'border-accent/60 bg-accent-soft' : 'border-line hover:border-accent/40',
                  )}
                >
                  <span>
                    <span className="block text-sm font-medium">{d.optimizations[o.id].label}</span>
                    <span className="block text-xs text-muted">{d.optimizations[o.id].detail}</span>
                  </span>
                  <input type="checkbox" checked={on} onChange={() => toggle(o.id)} className="peer sr-only" />
                  <span
                    aria-hidden
                    className={cn(
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
                      on ? 'bg-accent-strong' : 'bg-surface-2',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 size-4 rounded-full bg-paper shadow transition-transform',
                        on && 'translate-x-5',
                      )}
                    />
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8" aria-live="polite">
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <ScoreRing score={score} label={d.score} />
          <div className="w-full flex-1 space-y-5">
            <MetricBar label={d.metrics.lcp} value={`${(metrics.lcp / 1000).toFixed(1)} s`} ratio={metrics.lcp / BASELINE.lcp} good={metrics.lcp <= 2500} />
            <MetricBar label={d.metrics.tbt} value={`${Math.round(metrics.tbt)} ms`} ratio={metrics.tbt / BASELINE.tbt} good={metrics.tbt <= 200} />
            <MetricBar label={d.metrics.cls} value={metrics.cls.toFixed(2)} ratio={metrics.cls / BASELINE.cls} good={metrics.cls <= 0.1} />
            <MetricBar label={d.metrics.weight} value={`${(metrics.kb / 1000).toFixed(1)} MB`} ratio={metrics.kb / BASELINE.kb} good={metrics.kb <= 1500} />
          </div>
        </div>
        <p className="mt-6 text-xs text-muted">
          {d.disclaimer}
        </p>
      </div>
    </div>
  )
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 52
  const c = 2 * Math.PI * r
  const color = score >= 90 ? 'var(--color-olive-400)' : score >= 50 ? '#d4a72c' : '#e5534b'
  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="transition-[stroke-dashoffset,stroke] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-mono text-4xl font-semibold" style={{ color }}>
            {score}
          </p>
          <p className="text-[11px] text-muted">{label}</p>
        </div>
      </div>
    </div>
  )
}

function MetricBar({ label, value, ratio, good }: { label: string; value: string; ratio: number; good: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-muted">{label}</span>
        <span className={cn('font-mono font-medium', good ? 'text-accent' : 'text-fg')}>{value}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', good ? 'bg-accent' : 'bg-muted/60')}
          style={{ width: `${Math.max(4, Math.min(100, ratio * 100))}%` }}
        />
      </div>
    </div>
  )
}
