import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LEGAL_DOCUMENTS, LEGAL_ENTITY, LEGAL_LAST_UPDATED } from '@/constants/legal'
import { CONTACT, LEGAL_LINKS } from '@/constants/site'
import { Footer } from '@/sections/Footer'
import { cn } from '@/lib/cn'
import type { LegalBlock, LegalDocumentId } from '@/types'

/** Standalone policy page (privacy / terms / cookies), rendered by `src/legal.tsx`. */
export function LegalPage({ id }: { id: LegalDocumentId }) {
  const doc = LEGAL_DOCUMENTS[id]

  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent-strong focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden />
              Back to site
            </a>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main id="main" className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <nav aria-label="Legal documents">
            <ul className="inline-flex flex-wrap gap-1 rounded-3xl border border-line bg-surface p-1">
              {LEGAL_LINKS.map((l) => {
                const current = l.href === `/${id}`
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        'block rounded-full px-4 py-2 text-sm transition-colors',
                        current ? 'bg-accent-strong text-paper' : 'text-muted hover:text-fg',
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <article className="mt-12">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">Legal</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{doc.title}</h1>
            <p className="mt-4 font-mono text-xs text-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
              {doc.intro.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <ol className="mt-12 space-y-10">
              {doc.sections.map((section, i) => (
                <li key={section.heading} className="border-t border-line pt-8">
                  <h2 className="flex gap-3 text-xl font-semibold tracking-tight">
                    <span className="font-mono text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-muted">
                    {section.body.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{block}</p>

  if ('list' in block) {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-accent">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if ('table' in block) {
    return (
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-surface text-fg">
            <tr>
              {block.table.head.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row[0]} className="border-t border-line align-top">
                {row.map((cell, k) => (
                  <td key={k} className={cn('px-4 py-3', k === 0 && 'font-mono text-fg')}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <ContactBlock />
}

interface ContactRow {
  label: string
  value: string
  href?: string
}

function ContactBlock() {
  const rows = [
    { label: 'Company', value: LEGAL_ENTITY },
    CONTACT.email && { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.phone && { label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}` },
    CONTACT.address && { label: 'Address', value: CONTACT.address },
  ].filter((r): r is ContactRow => Boolean(r))

  return (
    <>
      <p>For questions about this policy or to exercise your rights, contact us:</p>
      <dl className="grid gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-[auto_1fr]">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-sm text-muted">{r.label}</dt>
            <dd className="font-medium break-words text-fg">
              {r.href ? (
                <a href={r.href} className="transition-colors hover:text-accent">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      {!CONTACT.email && !CONTACT.phone && (
        <p>
          You can also reach us through the channels listed in our{' '}
          <a href="/#contact" className="underline underline-offset-2 hover:text-accent">
            contact section
          </a>
          .
        </p>
      )}
    </>
  )
}
