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
      <p className="term-dim">  Model: anthropic · key saved to keychain</p>
      <p className="term-dim">  Workspace: {site.stateDir}/workspace</p>
      <p>
        <span className="term-ok">✓</span> Ready. Try: {site.command} chat
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

export function HowItWorks() {
  return (
    <section className="l-sec" id="how" aria-labelledby="how-title">
      <div className="l-wrap">
        <Reveal className="l-head">
          <p className="s-eyebrow">How it works</p>
          <h2 id="how-title" className="l-h2">
            Three steps to <em>your own agent</em>
          </h2>
        </Reveal>
        <div className="s-how">
          <Reveal as="article" className="s-how-step s-panel">
            <div className="s-how-text">
              <h3>Install it</h3>
              <p>One command with uv or pipx. You need macOS or Linux and Python 3.12 or newer.</p>
            </div>
            <div className="s-how-art s-photo-blur">
              <InstallArt />
            </div>
          </Reveal>
          <Reveal as="article" className="s-how-step s-how-step--flip s-panel">
            <div className="s-how-text">
              <h3>Bring a model</h3>
              <p>
                Use an OpenAI or Anthropic key, kept in your OS keychain, or a free local model through Ollama.{' '}
                <code>{site.command} onboard</code> walks you through it.
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
                Chat in the terminal, open the local web page, or pair Telegram with a code. Turn on the
                background service and schedules run with the terminal closed.
              </p>
            </div>
            <div className="s-how-art s-photo-blur">
              <ChannelArt />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
