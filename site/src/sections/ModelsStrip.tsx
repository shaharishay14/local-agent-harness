import { Reveal } from '../components/Reveal'

const groups = [
  { title: 'Chat from', items: ['Terminal', 'Local web page', 'Telegram'] },
  { title: 'Models', items: ['OpenAI', 'Anthropic', 'Ollama', 'Any OpenAI-compatible API'] },
  {
    title: 'Tools',
    items: [
      'Web search, no extra key',
      'SerpAPI (optional)',
      'PDF, Word, spreadsheets',
      'Voice: OpenAI, Whisper, ElevenLabs',
      'Any MCP server',
    ],
  },
]

const scores = [
  { model: 'gpt-4o', score: '9/10' },
  { model: 'Claude Sonnet 5.5', score: '10/10' },
]

export function ModelsStrip() {
  return (
    <section className="l-sec" id="works-with" aria-labelledby="works-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">Works with</p>
          <h2 id="works-title" className="l-h2">
            Bring what <em>you already use</em>
          </h2>
        </Reveal>
        <Reveal className="strip s-panel">
          {groups.map((g) => (
            <div key={g.title} className="strip-group">
              <h3>{g.title}</h3>
              <ul className="strip-pills" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {g.items.map((item) => (
                  <li key={item} className="s-pill">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
        <Reveal className="evals s-panel" delay={120}>
          <div>
            <h3>Same harness, tested on real models</h3>
            <p>
              Ten end-to-end tasks in a fake world: an inbox with a prompt injection and a leaked key, a calendar,
              the web, a broken weather service. Graded on the event log and by a judge model; one run per task,
              October 2026.
            </p>
          </div>
          {scores.map((s) => (
            <div key={s.model} className="eval-score">
              <b>{s.score}</b>
              <span>{s.model}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
