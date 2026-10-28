import { useState, type ReactNode } from 'react'
import { GithubLink } from '../components/GithubLink'
import { Icon } from '../components/icons'
import { site } from '../config'

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
        It stays in <code>{site.stateDir}</code> on your computer. What leaves: requests to your model
        provider (nothing, with a local model), messages through Telegram if you pair it, web searches, and the
        pages and apps you ask it to use. No telemetry.
      </>
    ),
  },
  {
    q: 'Will it act without asking?',
    a: 'Not on anything risky. App actions that aren’t read-only, and every shell command, wait for your yes: a y/N in the terminal, a card on the web page, buttons in Telegram. Read-only tools run on their own, and you can mark an app tool “always allow.” It reads and writes files in its own folder without asking.',
  },
  {
    q: 'Does it work with the terminal closed?',
    a: (
      <>
        Yes. <code>{site.command} onboard</code> installs a background service (launchd on macOS, systemd on
        Linux). Schedules and reminders fire on time and the answer arrives in Telegram. Unattended, it only
        does what you pre-approved and never runs the shell.
      </>
    ),
  },
  {
    q: 'How do I see what it did?',
    a: (
      <>
        Every step of every run is an event. <code>{site.command} runs show &lt;id&gt;</code> prints the
        timeline, the web page has a run inspector, and <code>{site.command} audit</code> checks your setup
        against the security rules.
      </>
    ),
  },
  {
    q: 'Which apps can it use?',
    a: (
      <>
        Anything with an MCP server: <code>{site.command} mcp add &lt;name&gt; -- &lt;command&gt;</code>. Skills
        that need email or a calendar appear once a matching server is connected. Web search, documents and
        voice notes work without one.
      </>
    ),
  },
  {
    q: 'Windows or a phone app?',
    a: 'Not for now: macOS and Linux only, and no mobile app. Telegram lets you reach it from your phone.',
  },
]

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="faq">
          <div className="faq-side">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">
              Questions, <em>answered</em>
            </h2>
            <p className="sub">The short version of what people ask first. The README has the rest.</p>
            {site.issuesUrl && (
              <div className="faq-ask glass">
                <b>Still wondering about something?</b>
                <p>Open an issue on GitHub. It’s built in the open.</p>
                <GithubLink className="btn btn--white btn--sm" href={site.issuesUrl} dark size={15}>
                  Ask on GitHub
                </GithubLink>
              </div>
            )}
          </div>
          <div className="acc glass">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`qa ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      className="qa-q"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      {f.q}
                      <span className="plus" aria-hidden="true">
                        <Icon name="plus" size={16} />
                      </span>
                    </button>
                  </h3>
                  <p className="qa-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                    {f.a}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
