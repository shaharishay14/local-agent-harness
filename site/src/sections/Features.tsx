import { Brain, Clock, Cpu, FileText, History, Plug, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Brain,
    title: 'Remembers you',
    body: 'Preferences, people and projects go into markdown files on your disk. Open them, edit them, delete them.',
  },
  {
    icon: Sparkles,
    title: 'Follows your skills',
    body: 'A starter pack of skills comes included. Adjust one to fit how you work, or add your own folder.',
  },
  {
    icon: Clock,
    title: 'Runs on a schedule',
    body: '“Every weekday at 8” or “remind me Friday.” It runs in the background and messages you on Telegram.',
  },
  {
    icon: Plug,
    title: 'Connects to your apps',
    body: 'Add any MCP server, local or remote, with one command. Its keys stay in your keychain and go only to that server.',
  },
  {
    icon: ShieldCheck,
    title: 'Asks before acting',
    body: 'Anything that changes something in your apps, and every shell command, waits for your yes. Read-only tools just run.',
  },
  {
    icon: History,
    title: 'Logs every run',
    body: 'Every step is an event. Replay a run or open it in the inspector to see why it did what it did.',
  },
  {
    icon: FileText,
    title: 'Files and the web',
    body: 'Reads and writes files in its own workspace folder, fetches web pages, and searches the web with no extra key: the search built into your model provider, or DuckDuckGo with a local model.',
  },
  {
    icon: Cpu,
    title: 'The right model for the job',
    body: 'A skill can ask for the stronger model when the task is subtle, so everyday chat stays cheap.',
  },
]

export function Features() {
  return (
    <section className="l-sec" id="what" aria-labelledby="what-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">What it does</p>
          <h2 id="what-title" className="l-h2">
            A small agent that does <em>real work</em>
          </h2>
        </Reveal>
        <Reveal className="s-hfgrid">
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title} className="s-hf">
              <span className="s-hf-ic">
                <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="s-hf-t">
                <span className="s-hf-bar" aria-hidden="true" />
                <span className="s-hf-tt">{title}</span>
              </h3>
              <p>{body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
