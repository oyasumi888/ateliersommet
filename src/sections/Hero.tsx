import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { MountainBackdrop } from '@/components/MountainBackdrop'
import { useLocale } from '@/hooks/useLocale'

export function Hero() {
  const { t } = useLocale()
  const hero = t.hero
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 sm:pt-40">
      <Container className="relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <p className="flex items-center gap-3 text-sm font-medium text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.subheadline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              {hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href="#services" size="lg" variant="secondary">
              {hero.secondaryCta}
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {hero.trustLine.split(' · ').map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rotate-45 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Pico de Orizaba, sitting under the copy and fading into the next section. */}
      <div className="relative mt-6 aspect-[12/5] max-h-[34rem] min-h-44 w-full sm:-mt-4 lg:-mt-16">
        <MountainBackdrop className="absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
      </div>
    </section>
  )
}
