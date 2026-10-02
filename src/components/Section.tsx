import type { ReactNode } from 'react'
import type { SectionId } from '@/types'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
  /** Id of the heading that labels this region (for screen readers). */
  labelledBy?: string
}

/** Page section wrapper: anchor id, vertical rhythm and container. */
export function Section({ id, children, className, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-20 sm:py-28', className)}>
      <Container>{children}</Container>
    </section>
  )
}
