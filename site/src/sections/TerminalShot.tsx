import { useEffect, useState, type ReactNode } from 'react'
import { site } from '../config'
import { useInView, usePrefersReducedMotion } from '../hooks'

// One line per entry; they appear one after another once the mockup is in view.
const lines: ReactNode[] = [
  <>
    <span className="term-dim">$</span> {site.command} chat
  </>,
  <span className="term-dim">
    {site.name} · anthropic · 14 memory notes
  </span>,
  ' ',
  <span className="term-row">
    <span className="term-who">you</span>
    <span>Remind Dana about Tuesday's review. Keep it short, the way I like.</span>
  </span>,
  <span className="term-row">
    <span className="term-who">agent</span>
    <span>
      <span className="term-ok">✓</span> <span className="term-tool">memory</span> read preferences/writing.md{' '}
      <span className="term-dim">short replies, no greetings</span>
    </span>
  </span>,
  <span className="term-row">
    <span />
    <span>
      <span className="term-ok">✓</span> <span className="term-tool">memory</span> read people/dana.md
    </span>
  </span>,
  <span className="term-row">
    <span />
    <span>
      <span className="term-ok">✓</span> <span className="term-tool">gmail</span> draft email to dana@example.com
    </span>
  </span>,
  <span className="term-row">
    <span />
    <span className="term-quote">  "Quick reminder: review Tuesday at 10. Bring the Q3 numbers."</span>
  </span>,
  <span className="term-row">
    <span />
    <span>
      <span className="term-ask">?</span> <span className="term-tool">gmail</span> send_email needs your approval
    </span>
  </span>,
  <span className="term-row">
    <span />
    <span>
      {'  '}
      <span className="term-ask">Send it? [y/N]</span> y
    </span>
  </span>,
  <span className="term-row">
    <span />
    <span>
      <span className="term-ok">✓</span> Sent. Logged as run 0142{' '}
      <span className="term-dim">
        ({site.command} runs show 0142)
      </span>
    </span>
  </span>,
]

export function TerminalShot() {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>(0.3)
  const [shown, setShown] = useState(1)

  useEffect(() => {
    if (!inView || reduced || shown >= lines.length) return
    const id = window.setTimeout(() => setShown(shown + 1), 520)
    return () => window.clearTimeout(id)
  }, [inView, reduced, shown])

  const visible = reduced ? lines.length : shown
  const done = visible >= lines.length

  return (
    <div className="l-wrap l-shot">
      <figure className="s-browser" ref={ref} style={{ margin: '0 auto' }}>
        <div className="s-browser-bar" aria-hidden="true">
          <span className="s-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="s-url">~ — {site.command} chat</span>
        </div>
        <pre className="term">
          {lines.map((line, i) => (
            <span key={i} className={`term-line ${i < visible ? '' : 'is-hidden'}`}>
              {line}
              {done && i === lines.length - 1 && <span className="term-caret" aria-hidden="true" />}
            </span>
          ))}
        </pre>
        {site.inDevelopment && (
          <figcaption className="shot-caption">Example session. {site.name} is still in development.</figcaption>
        )}
      </figure>
    </div>
  )
}
