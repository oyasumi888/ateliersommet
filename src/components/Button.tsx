import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-accent-strong text-accent-fg hover:bg-olive-700',
  secondary: 'border border-line bg-surface text-fg hover:border-accent hover:text-accent',
  ghost: 'text-fg hover:text-accent',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
