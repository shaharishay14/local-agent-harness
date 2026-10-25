import type { ElementType, ReactNode } from 'react'
import { useInView } from '../hooks'

/** Blur-fades its children in when they scroll into view (8px blur, 10px rise, 0.8s). */
export function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
}: {
  as?: ElementType
  className?: string
  delay?: number
  children: ReactNode
}) {
  const [ref, inView] = useInView<HTMLElement>(0.15)
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
