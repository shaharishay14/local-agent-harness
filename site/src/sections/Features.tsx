import { Brain, Clock, FileText, History, Laptop, MessageCircle, Plug, Sparkles, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Laptop,
    title: 'Runs on your machine',
    body: 'One process on your Mac or Linux box. Its state is plain files and one SQLite file in your home folder. No account, no server of ours.',
  },
  {
    icon: MessageCircle,
    title: 'Chat where you are',
    body: 'The terminal, a local web page, or your own Telegram bot. Send it photos, voice notes and files; it sees, transcribes and reads them.',
  },
  {
    icon: Brain,
    title: 'Persistent memory',
    body: 'Remembers your preferences, projects and people from one conversation to the next, as markdown notes you can open and edit.',
  },
  {
    icon: Sparkles,
    title: 'Skills',
    body: 'Morning brief, inbox triage, research report, meeting prep, weekly review. Each loads only when you need it. Adjust them or write your own.',
  },
  {
    icon: Plug,
    title: 'Connect your apps',
    body: 'Gmail, your calendar, anything with an MCP server, in one command. Reads run on their own; anything else asks you first.',
  },
  {
    icon: Clock,
    title: 'Works while you’re away',
    body: '“Every weekday at 8.” “Remind me Friday.” Schedules fire with the terminal closed, and the answer lands in Telegram.',
  },
  {
    icon: FileText,
    title: 'Reads the web and your files',
    body: 'Searches the web with no extra key, opens pages, and reads PDFs, Word files and spreadsheets in its own folder.',
  },
  {
    icon: History,
    title: 'Every step on the record',
    body: 'Each run is a timeline of events. Open one with runs show and see exactly what it did and why.',
  },
]

export function Features() {
  return (
    <section className="l-sec" id="what" aria-labelledby="what-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">What it does</p>
          <h2 id="what-title" className="l-h2">
            An agent that <em>gets things done</em>
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
