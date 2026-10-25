import { Reveal } from '../components/Reveal'

const groups = [
  { title: 'Bring your own model', items: ['OpenAI', 'Anthropic', 'Ollama', 'Any OpenAI-compatible API'] },
  { title: 'Talk to it where you are', items: ['Terminal', 'Local web page', 'Telegram'] },
  { title: 'Connect apps', items: ['Any MCP server'] },
]

export function ModelsStrip() {
  return (
    <section className="l-sec" aria-label="Models, channels and apps">
      <div className="l-wrap">
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
      </div>
    </section>
  )
}
