import type { CSSProperties, ReactNode } from 'react'
import { Icon, Logo } from '../components/icons'
import { HubWiring } from '../components/Wiring'
import { site } from '../config'

function Cell({ span, art, artStyle, title, children }: {
  span: 2 | 4
  art: ReactNode
  artStyle?: CSSProperties
  title: string
  children: ReactNode
}) {
  return (
    <article className={`cell c${span} glass`}>
      <div className="art" style={artStyle} aria-hidden="true">
        {art}
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

const WAVE = [6, 12, 16, 9, 14, 7, 12, 5]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const SKILLS = ['Morning brief', 'Inbox triage', 'Research report', 'Meeting prep']
const RUN = [
  ['8:00', '', 'Run started'],
  ['8:00', 'ok', 'Read Emma’s note'],
  ['8:01', 'ok', 'Drafted the email'],
  ['8:01', 'ask', 'Asked to send it'],
  ['8:03', 'ok', 'Approved and sent'],
]

export function Features() {
  return (
    <section className="sec" id="what" aria-labelledby="what-title">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">What it does</p>
          <h2 id="what-title" className="h2">
            An agent that <em>gets things done</em>
          </h2>
          <p className="sub">Eight things it does today, on your own computer.</p>
        </div>
        <div className="bento">
          <Cell
            span={2}
            title="Runs on your machine"
            art={
              <div className="pane">
                <div className="pane-h">
                  <span>{site.stateDir}/</span>
                  <span>your home folder</span>
                </div>
                <div className="pane-b">
                  <span className="row"><span>config.toml</span><span>settings</span></span>
                  <span className="row"><span>state.db</span><span>SQLite</span></span>
                  <span className="row"><span>workspace/</span><span>notes, files</span></span>
                  <span className="row" style={{ marginTop: 4 }}>
                    <span style={{ color: 'var(--ok)' }}>● 127.0.0.1</span>
                    <span>no cloud</span>
                  </span>
                </div>
              </div>
            }
          >
            One process on your Mac or Linux box. Its state is plain files and one SQLite file in your home folder. No
            account, no server of ours.
          </Cell>

          <Cell
            span={2}
            title="Chat where you are"
            art={
              <div className="stack">
                <div className="bub bub--out bub-row">
                  <span className="wave">
                    {WAVE.map((h, i) => (
                      <i key={i} style={{ height: h }} />
                    ))}
                  </span>
                  <span style={{ fontSize: 12, color: '#B6D3EC' }}>0:07</span>
                </div>
                <div className="bub bub--in">“Call the bank Friday at 10.” Reminder set.</div>
                <div className="bub bub--out bub-row">
                  <Icon name="clip" size={15} />
                  lease-2026.pdf
                </div>
              </div>
            }
          >
            The terminal, a local web page, or your own Telegram bot. Send it photos, voice notes and files; it sees,
            transcribes and reads them.
          </Cell>

          <Cell
            span={2}
            title="Persistent memory"
            art={
              <div className="pane">
                <div className="pane-h">
                  <span>memory/people/emma.md</span>
                  <span>edited 2d ago</span>
                </div>
                <div className="pane-b">
                  <span style={{ color: '#fff', fontWeight: 600 }}>Emma Clarke</span>
                  <span>Design lead, reports to you</span>
                  <span><span className="hl">Prefers mornings, short emails</span></span>
                  <span>Owns the Q3 review</span>
                </div>
              </div>
            }
          >
            Remembers your preferences, projects and people from one conversation to the next, as markdown notes you can
            open and edit.
          </Cell>

          <Cell span={4} title="Connect your tools with MCP" artStyle={{ padding: 8 }} art={<HubWiring />}>
            Gmail, your calendar, Slack, GitHub: anything with an MCP server, in one command. Its keys go to your keychain
            and only to that server. Reads run on their own; anything else asks you first.
          </Cell>

          <Cell
            span={2}
            title="Works while you’re away"
            art={
              <div className="stack" style={{ gap: 14 }}>
                <div className="week">
                  {DAYS.map((d) => (
                    <span key={d} className="day">
                      {d}
                      <b>8:00</b>
                    </span>
                  ))}
                </div>
                <div className="toast glass">
                  <span className="tile tile--sm">
                    <Logo name="telegram" size={18} />
                  </span>
                  <span>
                    <b>Your morning brief</b>
                    <small>3 meetings · 2 replies waiting</small>
                  </span>
                </div>
              </div>
            }
          >
            “Every weekday at 8.” “Remind me Friday.” Schedules fire with the terminal closed, and the answer lands in
            Telegram.
          </Cell>

          <Cell
            span={2}
            title="Skills"
            art={
              <div className="stack" style={{ gap: 6 }}>
                {SKILLS.map((s) => (
                  <span key={s} className={`skill ${s === 'Inbox triage' ? 'skill--on' : ''}`}>
                    <span>{s}</span>
                    <span>{s === 'Inbox triage' ? 'loaded' : 'skill'}</span>
                  </span>
                ))}
                <span className="skill" style={{ borderStyle: 'dashed' }}>
                  <span>Your own</span>
                  <span>+ new</span>
                </span>
              </div>
            }
          >
            Morning brief, inbox triage, research report, meeting prep, weekly review. Each loads only when you need it.
            Adjust them or write your own.
          </Cell>

          <Cell
            span={2}
            title="Reads the web and your files"
            art={
              <div className="stack" style={{ alignItems: 'center', gap: 16 }}>
                <div className="search">
                  <Icon name="search" size={15} />
                  flights to Lisbon in March
                </div>
                <div className="files">
                  <span className="file"><i /><i /><b style={{ background: '#C8402F' }}>PDF</b></span>
                  <span className="file" style={{ height: 88 }}><i /><i /><i /><b style={{ background: '#2B5797' }}>DOCX</b></span>
                  <span className="file"><i /><i /><b style={{ background: '#1E7145' }}>XLSX</b></span>
                </div>
              </div>
            }
          >
            Searches the web with no extra key, opens pages, and reads PDFs, Word files and spreadsheets in its own
            folder.
          </Cell>

          <Cell
            span={2}
            title="Every step on the record"
            art={
              <div className="tlx">
                {RUN.map(([time, kind, text], i) => (
                  <div key={i} className="ev">
                    <time>{time}</time>
                    <span className={`ev-dot ${kind ? `ev-dot--${kind}` : ''}`} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            }
          >
            Each run is a timeline of events. Open one with <code>runs show</code> and see exactly what it did and why.
          </Cell>
        </div>
      </div>
    </section>
  )
}
