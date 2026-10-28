import { useState } from 'react'
import type { BrandName } from '../components/icons'
import { Icon, Logo } from '../components/icons'
import { FlowWiring } from '../components/Wiring'

type UseCase = {
  title: string
  /** One to three tools on the left of the wiring. */
  tools: BrandName[]
  /** Where the answer arrives, on the right. */
  reply: BrandName
  flow: string
  body: string
  needs: string
}

const CASES: UseCase[] = [
  {
    title: 'Morning brief',
    tools: ['gmail', 'gcal'],
    reply: 'telegram',
    flow: 'Gmail and Google Calendar wired to the agent, which replies in Telegram',
    body: 'Every weekday at 8: today’s meetings, the emails that need a reply, and who everyone is. On your phone before coffee, with the terminal closed.',
    needs: 'With Gmail and Google Calendar MCP servers',
  },
  {
    title: 'Inbox triage',
    tools: ['gmail'],
    reply: 'term',
    flow: 'Gmail wired to the agent, which replies in the terminal',
    body: 'Sorts what came in, skips the newsletters, drafts the replies, and sends nothing until you say yes.',
    needs: 'With a Gmail MCP server',
  },
  {
    title: 'Meeting prep',
    tools: ['gcal', 'slack'],
    reply: 'telegram',
    flow: 'Google Calendar and Slack wired to the agent, which replies in Telegram',
    body: 'One page before the 3pm: who’s coming, what you know about them, the open Slack threads, what to decide.',
    needs: 'With Google Calendar and Slack MCP servers',
  },
  {
    title: 'Weekly PR digest',
    tools: ['github', 'slack'],
    reply: 'term',
    flow: 'GitHub and Slack wired to the agent, which replies in the terminal',
    body: 'What the team merged this week, grouped and in plain words, posted to Slack once you approve.',
    needs: 'With GitHub and Slack MCP servers',
  },
  {
    title: 'Voice note to reminder',
    tools: ['mic'],
    reply: 'telegram',
    flow: 'A voice note to the agent, which replies in Telegram',
    body: '“Remind me to call the bank Friday at 10.” Say it into Telegram; it transcribes, schedules, and pings you on time.',
    needs: 'Works out of the box, no app to connect',
  },
  {
    title: 'Read this contract',
    tools: ['doc'],
    reply: 'telegram',
    flow: 'A PDF to the agent, which replies in Telegram',
    body: 'Send a PDF, Word file or spreadsheet. Get the terms, the dates and anything unusual back in plain words.',
    needs: 'Works out of the box, no app to connect',
  },
]

/** A squeeze carousel: one case open, the rest folded to a tab with its title and logos. */
export function UseCases() {
  const [active, setActive] = useState(0)
  return (
    <section className="sec" id="uses" aria-labelledby="uses-title">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">Use cases</p>
          <h2 id="uses-title" className="h2">
            What you can <em>build with it</em>
          </h2>
          <p className="sub">Connect the tools, ask once, get the result where you are.</p>
        </div>
        <div className="sq">
          {CASES.map((c, i) => (
            <div key={c.title} className={`sq-item glass ${i === active ? 'is-open' : ''}`}>
              {i === active ? (
                <div className="sq-body">
                  <div className="sq-left">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <p className="needs">
                      <Icon name="plug" size={16} />
                      {c.needs}
                    </p>
                  </div>
                  <div className="sq-vis" role="img" aria-label={c.flow}>
                    <FlowWiring tools={c.tools} reply={c.reply} />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="sq-tab"
                  onClick={() => setActive(i)}
                  aria-label={`Show use case: ${c.title}`}
                >
                  <span className="sq-title">{c.title}</span>
                  <span className="sq-logos">
                    {[...c.tools, c.reply].map((b) => (
                      <span key={b} className="tile tile--sm">
                        <Logo name={b} size={18} />
                      </span>
                    ))}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
