type IconProps = { size?: number; className?: string }

/** The temporary logo mark: two nodes joined by a bar. Dark glyph, meant for a white tile. */
export function MarkGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <circle cx="7.5" cy="7.5" r="5" />
      <rect x="12" y="12" width="10" height="10" rx="2.6" />
      <path d="M9 9l5 5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  )
}

export function Mark({ size = 30, className = '' }: IconProps) {
  return (
    <span
      className={`s-mark ${className}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.3) }}
    >
      <MarkGlyph />
    </span>
  )
}

/** GitHub outline glyph (lucide no longer ships brand icons). */
export function GithubIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V22" />
    </svg>
  )
}
