import { cn } from '@/lib/cn'

/**
 * Decorative silhouette of Pico de Orizaba (Citlaltépetl): a lone, near-symmetric
 * stratovolcano with a glaciated summit, rising above lower ranges. Colours come from the
 * `--mtn-*` tokens in `index.css`, so it follows the theme. The caller sizes and positions it.
 */
export function MountainBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none', className)}>
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMin slice" className="size-full">
        <defs>
          <linearGradient id="mtn-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--mtn-top)" />
            <stop offset="0.75" stopColor="var(--mtn-base)" />
          </linearGradient>
          <linearGradient id="mtn-snow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--mtn-snow)" />
            <stop offset="1" stopColor="var(--mtn-snow)" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Distant ranges */}
        <path
          fill="var(--mtn-far)"
          d="M0 600V430l110-46 90 30 120-62 110 48 90-34 70 20 140 40 200 4 110-40 120 34 130-58 120 42 30-8v200Z"
        />

        {/* Main cone */}
        <path
          fill="url(#mtn-cone)"
          d="M0 600V478c200-26 380-98 520-198l120-120 60-62 18-6 24 4 48 44 110 120c140 120 340 180 540 210v130Z"
        />
        {/* Shaded eastern flank */}
        <path
          fill="var(--color-olive-950)"
          fillOpacity="0.18"
          d="M742 96l48 44 110 120c140 120 340 180 540 210v130H880L800 380l-40-160Z"
        />

        {/* Glaciers */}
        <path
          fill="url(#mtn-snow)"
          d="M700 98l18-6 24 4 48 44 70 75-15 7-17-12-16 22-16-12-14 25-16-17-14 24-14-20-16 24-14-20-16 14-16-24-16 14-12-18-20 10-18-18Z"
        />
        <path
          fill="var(--color-olive-950)"
          fillOpacity="0.1"
          d="M742 96l48 44 70 75-15 7-17-12-16 22-16-12-14 25-16-17-14 24-6-60Z"
        />

        {/* Foreground foothills */}
        <path
          fill="var(--mtn-front)"
          d="M0 600v-80c120-20 200-50 300-30s160-20 260 10 200-10 300 10 220-30 340-10 180-5 240 5v95Z"
        />
      </svg>
    </div>
  )
}
