import { Quote } from 'lucide-react'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'
import { getPrinciples } from '@/constants/content'
import { getServiceById } from '@/constants/services'
import { useLocale } from '@/hooks/useLocale'

export function About() {
  const { t } = useLocale()
  const about = t.about
  return (
    <Section id="about" labelledBy="about-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {about.stats.map((s) => (
              <div key={s.label} className="bg-surface p-5">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-accent">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{about.howWeWork}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {getPrinciples(t).map((p) => {
              const Icon = p.icon
              return (
                <li key={p.title} className="rounded-2xl border border-line bg-surface p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h4 className="mt-4 font-medium">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Team */}
      <div className="mt-20">
        <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{about.team}</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.members.map((m) => (
            <li key={m.role} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt="" width={48} height={48} loading="lazy" className="size-12 shrink-0 rounded-full object-cover" />
              ) : (
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-olive-700 font-mono text-sm font-semibold text-paper">
                  {m.initials}
                </span>
              )}
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-accent">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{about.clientsSay}</h3>
        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {about.testimonials.map((q, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <Quote className="size-5 text-accent" aria-hidden />
                <blockquote className="mt-4 flex-1 leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-medium">{q.author}</span>
                  <span className="text-muted">
                    {' '}
                    · {q.role}, {q.company}
                  </span>
                  {q.serviceId && (
                    <span className="mt-2 block font-mono text-[11px] text-accent">
                      {getServiceById(t, q.serviceId)?.shortTitle}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
