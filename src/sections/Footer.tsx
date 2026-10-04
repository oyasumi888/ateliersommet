import { ArrowUp } from 'lucide-react'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { getServices } from '@/constants/services'
import { getLegalLinks, getNavLinks, SITE } from '@/constants/site'
import { useLocale } from '@/hooks/useLocale'

export function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.common.tagline}.</p>
          </div>
          <FooterColumn title={t.footer.navigate} links={getNavLinks(t)} />
          <FooterColumn
            title={t.footer.services}
            links={getServices(t).map((s) => ({ label: s.shortTitle, href: '/#services' }))}
          />
          <FooterColumn title={t.footer.legal} links={getLegalLinks(t)} />
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>{t.footer.rights(year, SITE.name)}</p>
          <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            {t.footer.backToTop} <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
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
