import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { site } from '../config'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../hooks'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'Is it free?',
    a: (
      <>
        Yes. {site.name} is MIT licensed, with no account and no subscription. You pay only your model
        provider, or nothing if you run a local model through Ollama.
      </>
    ),
  },
  {
    q: 'Is it ready to use?',
    a: site.inDevelopment ? (
      <>
        Not yet. It’s being built in the open, and the first release will go out on PyPI.
        {site.githubUrl && ' Watch the GitHub repo to follow along.'}
      </>
    ) : (
      <>
        Yes. Install it with <code>{site.install}</code> and run <code>{site.command} onboard</code>.
      </>
    ),
  },
  {
    q: 'What do I need?',
    a: 'macOS or Linux, Python 3.12 or newer, and uv or pipx. Plus a model: an OpenAI or Anthropic key, or Ollama running on your machine.',
  },
  {
    q: 'Where does my data go?',
    a: (
      <>
        It stays in <code>{site.stateDir}</code> on your computer. What leaves: requests to the model you
        chose, messages through Telegram if you pair it, and the web pages, search and apps you ask it to
        use. No telemetry.
      </>
    ),
  },
  {
    q: 'Will it act without asking?',
    a: 'Not on anything risky. Anything that changes something in your apps, and every shell command, waits for your yes, in the terminal or as buttons in Telegram. Read-only tools run on their own, and you can mark a tool “always allow.”',
  },
  {
    q: 'Which apps can it use?',
    a: (
      <>
        Anything with an MCP server. Add one with <code>{site.command} mcp add</code>. Skills that need email
        or a calendar appear once a matching server is connected.
      </>
    ),
  },
  {
    q: 'Windows or a phone app?',
    a: 'Not for now: macOS and Linux only, and no mobile app. Telegram lets you reach it from your phone.',
  },
]

const ADVANCE_MS = 6000

export function Faq() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  // Auto-advance; changing `active` (a click or a key) restarts the timer.
  useEffect(() => {
    if (paused || reduced) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % faqs.length), ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [active, paused, reduced])

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: faqs.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + faqs.length) % faqs.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section className="l-sec" id="faq" aria-labelledby="faq-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">FAQ</p>
          <h2 id="faq-title" className="l-h2">
            Questions, <em>answered</em>
          </h2>
        </Reveal>
        <Reveal>
          <div
            className="s-faq s-photo-blur"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
            }}
          >
            <div className="s-faq-list" role="tablist" aria-label="Questions" aria-orientation="vertical" onKeyDown={onKeyDown}>
              {faqs.map((f, i) => (
                <button
                  key={f.q}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`faq-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="faq-panel"
                  tabIndex={i === active ? 0 : -1}
                  className="s-faq-q"
                  onClick={() => setActive(i)}
                >
                  {f.q}
                </button>
              ))}
            </div>
            <div
              className="s-faq-a s-glass"
              role="tabpanel"
              id="faq-panel"
              aria-labelledby={`faq-tab-${active}`}
              tabIndex={0}
            >
              <h3>{faqs[active].q}</h3>
              <p>{faqs[active].a}</p>
              <div className="s-faq-bar" aria-hidden="true">
                <i style={{ width: `${((active + 1) / faqs.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
