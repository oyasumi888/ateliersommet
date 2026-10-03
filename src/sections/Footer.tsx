import { ArrowUp } from 'lucide-react'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { SERVICES } from '@/constants/services'
import { LEGAL_LINKS, NAV_LINKS, SITE } from '@/constants/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.tagline}.</p>
          </div>
          <FooterColumn title="Navigate" links={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
          <FooterColumn title="Services" links={SERVICES.map((s) => ({ label: s.shortTitle, href: '/#services' }))} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-sm transition-colors hover:text-accent">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
