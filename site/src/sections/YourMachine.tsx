import { FileText, KeyRound, Lock, ScanEye, Scale, ShieldCheck, type LucideIcon } from 'lucide-react'
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

const points: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileText,
    title: 'Plain files',
    body: 'Memory and skills are markdown you can read, edit and back up. One SQLite file holds the log.',
  },
  { icon: KeyRound, title: 'Keys in your keychain', body: 'API keys never sit in a config file.' },
  {
    icon: ShieldCheck,
    title: 'Nothing risky without you',
    body: 'Anything that changes something in your apps, and every shell command, waits for your yes. Read-only tools just run. The shell stays off until you turn it on.',
  },
  {
    icon: Lock,
    title: 'Locked to your machine',
    body: 'The web page and API listen only on 127.0.0.1, behind a token.',
  },
  {
    icon: ScanEye,
    title: 'Untrusted content is tracked',
    body: 'Content from emails, web pages and apps is tracked as untrusted, and risky actions after reading it need your approval. Web fetches can’t reach your local network.',
  },
  { icon: Scale, title: 'MIT licensed', body: 'Read every line and change anything.' },
]

export function YourMachine() {
  return (
    <section className="l-sec" id="machine" aria-labelledby="machine-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">Privacy and control</p>
          <h2 id="machine-title" className="l-h2">
            Your machine, <em>your rules</em>
          </h2>
          <p className="l-sub">
            Everything {site.name} knows sits in one folder in your home directory. No account, no server of
            ours, no telemetry.
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
