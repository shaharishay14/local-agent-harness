import type { ReactNode } from 'react'
import { Logo } from './icons'

/** A GitHub link that renders nothing when the URL in config.ts is null. */
export function GithubLink({
  href,
  className,
  dark = false,
  size = 16,
  label,
  children,
}: {
  href: string | null
  className?: string
  /** Dark glyph, for a white button. */
  dark?: boolean
  size?: number
  label?: string
  children?: ReactNode
}) {
  if (!href) return null
  return (
    <a className={className} href={href} aria-label={label}>
      <Logo name="github" size={size} color={dark ? '#181717' : undefined} />
      {children}
    </a>
  )
}
