import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const inputClasses =
  'w-full rounded-xl border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:outline-none focus-visible:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  /** Render prop gives the control the ARIA attributes it needs. */
  children: (aria: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => ReactNode
  className?: string
}

/** Label + control + hint/error, wired together for screen readers. */
export function FormField({ id, label, error, hint, optional, children, className }: FormFieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        className: cn(inputClasses, error ? 'border-red-500/70' : 'border-line'),
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
