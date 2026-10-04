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
      <p className="flex items-center gap-3 text-sm font-medium text-accent">
        <span aria-hidden className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem] sm:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  )
}
