import { Globe, KeyRound, Send, SquareTerminal } from 'lucide-react'
import { site } from '../config'
import { Reveal } from '../components/Reveal'

function InstallArt() {
  return (
    <div className="mini-term" aria-hidden="true">
      <p>
        <span className="term-dim">$</span> {site.install}
      </p>
      <p>
        <span className="term-dim">$</span> {site.command} onboard
      </p>
      <p className="term-dim">  model, search, Telegram, background service</p>
      <p>
        <span className="term-dim">$</span> {site.command} doctor
      </p>
      <p>
        <span className="term-ok">✓</span> All good. Try: {site.command} chat
      </p>
    </div>
  )
}

function ModelArt() {
  return (
    <div className="art-stack">
      <div className="chip-row">
        <span className="s-chip">OpenAI</span>
        <span className="s-chip">Anthropic</span>
        <span className="s-chip">Ollama</span>
      </div>
      <div className="chip-row">
        <span className="s-chip">Any OpenAI-compatible API</span>
      </div>
      <span className="s-badge">
        <KeyRound size={14} strokeWidth={1.7} aria-hidden="true" />
        Keys live in your OS keychain
      </span>
    </div>
  )
}

function ChannelArt() {
  const channels = [
    { icon: SquareTerminal, name: 'Terminal', note: `${site.command} chat` },
    { icon: Globe, name: 'Local web page', note: 'Chat, approvals, runs, memory' },
    { icon: Send, name: 'Telegram', note: 'Paired with a code, approvals as buttons' },
  ]
  return (
    <ul className="art-stack" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {channels.map(({ icon: Icon, name, note }) => (
        <li key={name} className="channel-card s-glass">
          <span className="channel-ic">
            <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span>
            <b>{name}</b>
            <small>{note}</small>
          </span>
        </li>
      ))}
    </ul>
  )
}

function ConnectArt() {
  return (
    <div className="mini-term" aria-hidden="true">
      <p>
        <span className="term-dim">$</span> {site.command} mcp add gmail --provides email \
      </p>
      <p>{'    '}--env GMAIL_TOKEN -- &lt;command&gt;</p>
      <p className="term-dim">  Added gmail, providing email.</p>
      <p>
        <span className="term-dim">$</span> {site.command} mcp tools gmail
      </p>
      <p className="term-dim">  search_emails   read-only</p>
      <p className="term-dim">  send_email      asks</p>
      <p>
        <span className="term-dim">$</span> {site.command} mcp allow gmail send_email
      </p>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="l-sec" id="how" aria-labelledby="how-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">How it works</p>
          <h2 id="how-title" className="l-h2">
            Four steps to <em>your own agent</em>
          </h2>
        </Reveal>
        <div className="s-how">
          <Reveal as="article" className="s-how-step s-panel">
            <div className="s-how-text">
              <h3>Install it</h3>
              <p>
                One command with uv or pipx, then <code>{site.command} onboard</code> sets up the rest.{' '}
                <code>doctor</code> checks it and tells you how to fix anything wrong, <code>audit</code> checks it
                against the security rules, <code>update</code> upgrades it. macOS or Linux, Python 3.12+.
              </p>
            </div>
            <div className="s-how-art s-photo-blur">
              <InstallArt />
            </div>
          </Reveal>
          <Reveal as="article" className="s-how-step s-how-step--flip s-panel">
            <div className="s-how-text">
              <h3>Bring a model</h3>
              <p>
                An OpenAI or Anthropic key, kept in your OS keychain, or a free local model through Ollama. Web
                search comes with it: your model provider’s own, no extra key. SerpAPI if you want Google.
              </p>
            </div>
            <div className="s-how-art s-photo-blur">
              <ModelArt />
            </div>
          </Reveal>
          <Reveal as="article" className="s-how-step s-panel">
            <div className="s-how-text">
              <h3>Talk to it</h3>
              <p>
                Chat in the terminal, open the local web page, or pair your Telegram bot with a code. The
                background service (<code>{site.command} daemon</code>) keeps schedules and reminders firing with
                the terminal closed.
              </p>
            </div>
            <div className="s-how-art s-photo-blur">
              <ChannelArt />
            </div>
          </Reveal>
          <Reveal as="article" className="s-how-step s-how-step--flip s-panel">
            <div className="s-how-text">
              <h3>Connect your tools</h3>
              <p>
                Gmail, your calendar, anything with an MCP server. Add it with one command; its keys go to your
                keychain and only to that server. Reads run freely. Anything else asks first, until you mark it
                “always allow.”
              </p>
            </div>
            <div className="s-how-art s-photo-blur">
              <ConnectArt />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
