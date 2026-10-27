import type { ReactNode } from 'react'
import { FileText, Gauge, Globe, History, KeyRound, ScanEye, ShieldCheck, UserRound, type LucideIcon } from 'lucide-react'
import { site } from '../config'
import { Reveal } from '../components/Reveal'

const tree: [string, string][] = [
  ['  config.toml', 'model, channels, tool settings'],
  ['  state.db', 'event log, schedules, approvals'],
  ['  workspace/', ''],
  ['    AGENTS.md', 'standing orders'],
  ['    memory/', 'what it knows about you'],
  ['    skills/', 'your skills and adjustments'],
  ['    files/', 'where it reads and writes'],
]

const points: { icon: LucideIcon; title: string; body: ReactNode }[] = [
  {
    icon: FileText,
    title: 'Plain files',
    body: 'Memory and skills are markdown you can read, edit and back up. One SQLite file holds the log.',
  },
  {
    icon: KeyRound,
    title: 'Keys in your keychain',
    body: 'Never in a config file. Each app gets only its own key, and key-shaped text is scrubbed from what the agent reads and logs.',
  },
  {
    icon: ShieldCheck,
    title: 'The permission gate',
    body: 'App actions that aren’t read-only, and every shell command, wait for your yes. Unknown tools never run. The shell stays off until you turn it on.',
  },
  {
    icon: ScanEye,
    title: 'Untrusted content is tracked',
    body: 'Emails, web pages and app output are marked untrusted. After reading them, a pre-approved send only goes to people you named yourself.',
  },
  {
    icon: Globe,
    title: 'The egress guard',
    body: 'Pages it opens must be on the public internet, on every redirect. A link in an email can’t reach your router or the agent’s own API.',
  },
  {
    icon: Gauge,
    title: 'Budgets',
    body: 'Limits on tokens and tool calls per run, an optional daily budget, and stop rules for loops and broken tools.',
  },
  {
    icon: UserRound,
    title: 'One owner',
    body: 'Your Telegram bot answers only you. The web page and API listen on 127.0.0.1, behind a token.',
  },
  {
    icon: History,
    title: 'Every step inspectable',
    body: (
      <>
        <code>{site.command} runs show</code> prints any run’s timeline. <code>{site.command} audit</code> checks
        your setup against these rules.
      </>
    ),
  },
]

export function YourMachine() {
  return (
    <section className="l-sec" id="machine" aria-labelledby="machine-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">Where we differ</p>
          <h2 id="machine-title" className="l-h2">
            One owner. <em>Hard rules.</em>
          </h2>
          <p className="l-sub">
            Prompts can be talked out of anything, so the rules that must hold live in code. Everything{' '}
            {site.name} knows sits in one folder in your home directory. No account, no telemetry.
          </p>
        </Reveal>
        <div className="machine">
          <Reveal className="tree-wrap s-photo-blur">
            <figure className="tree s-glass" style={{ margin: 0 }}>
              <figcaption className="tree-root">{site.stateDir}/</figcaption>
              {tree.map(([path, note]) => (
                <div key={path} className="tree-row">
                  <span style={{ whiteSpace: 'pre' }}>{path}</span>
                  <span>{note}</span>
                </div>
              ))}
            </figure>
          </Reveal>
          <Reveal as="ul" className="points s-panel" delay={120}>
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="point">
                <h3>
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  {title}
                </h3>
                <p>{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
