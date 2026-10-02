import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className="font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  )
}
