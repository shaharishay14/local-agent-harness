import { Plug } from 'lucide-react'
import { Reveal } from '../components/Reveal'

// Each one works with today's built-in tools; `needs` names the MCP server it takes, if any.
const cases: { title: string; tags: string[]; body: string; needs?: string }[] = [
  {
    title: 'Morning brief on Telegram',
    tags: ['schedules', 'briefings', 'Telegram'],
    body: 'Every weekday at 8: today’s meetings, the emails that need a reply, and who everyone is. On your phone before coffee.',
    needs: 'With email and calendar MCP servers',
  },
  {
    title: 'Inbox triage you sign off on',
    tags: ['email', 'drafts', 'approval'],
    body: 'Sorts what came in, skips the newsletters, drafts the replies, and sends nothing until you say yes.',
    needs: 'With a Gmail MCP server',
  },
  {
    title: 'Research report into a file',
    tags: ['web search', 'research', 'files'],
    body: 'Searches the web, reads the sources, and writes a report with links into its folder, ready to open.',
  },
  {
    title: 'Meeting prep from memory',
    tags: ['calendar', 'memory', 'people'],
    body: 'One page before the 3pm: who’s coming, what you know about them, the open threads, what to decide.',
    needs: 'With a calendar MCP server',
  },
  {
    title: 'Voice note to reminder',
    tags: ['voice', 'reminders', 'Telegram'],
    body: '“Remind me to call the bank Friday at 10.” Say it into Telegram; it transcribes, schedules, and pings you on time.',
  },
  {
    title: 'Read this contract for me',
    tags: ['documents', 'PDF', 'summaries'],
    body: 'Send a PDF, Word file or spreadsheet. Get the terms, the dates and anything unusual back in plain words.',
  },
]

export function UseCases() {
  return (
    <section className="l-sec" id="uses" aria-labelledby="uses-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">Use cases</p>
          <h2 id="uses-title" className="l-h2">
            What you can <em>build with it</em>
          </h2>
          <p className="l-sub">Six things it does today. Some need an app connected first; those say which.</p>
        </Reveal>
        <Reveal as="ul" className="uses">
          {cases.map((c) => (
            <li key={c.title} className="use s-panel">
              <h3>{c.title}</h3>
              <ul className="use-tags" aria-label="Tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p>{c.body}</p>
              {c.needs && (
                <p className="use-needs">
                  <Plug size={14} strokeWidth={1.7} aria-hidden="true" />
                  {c.needs}
                </p>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
