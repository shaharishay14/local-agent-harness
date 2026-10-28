import type { CSSProperties, ReactNode } from 'react'
import type { BrandName, IconName } from '../components/icons'
import { Icon, Logo } from '../components/icons'
import { site } from '../config'

function Step({ flip, title, children, art, artStyle }: {
  flip?: boolean
  title: string
  children: ReactNode
  art: ReactNode
  artStyle?: CSSProperties
}) {
  return (
    <article className={`step glass ${flip ? 'step--flip' : ''}`}>
      <div className="step-text">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
      <div className="step-art" style={artStyle}>
        {art}
      </div>
    </article>
  )
}

function Term({ bar, children }: { bar?: string; children: ReactNode }) {
  return (
    <div className="term" style={{ width: '100%' }}>
      {bar !== undefined && (
        <div className="term-bar" aria-hidden="true">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span>{bar}</span>
        </div>
      )}
      <div className="term-body">{children}</div>
    </div>
  )
}

const Prompt = () => <span className="t-dim">$</span>

type Item = { label: string; brand?: BrandName; icon?: IconName }

function LogoRow({ items }: { items: Item[] }) {
  return (
    <div className="logos">
      {items.map((it) => (
        <span key={it.label} className="logo-item">
          <span className="tile tile--lg">
            {it.brand ? <Logo name={it.brand} size={32} /> : <Icon name={it.icon!} size={32} />}
          </span>
          {it.label}
        </span>
      ))}
    </div>
  )
}

const APPS: BrandName[] = ['gmail', 'gcal', 'slack', 'github', 'notion', 'drive']

export function HowItWorks() {
  const cmd = site.command
  return (
    <section className="sec" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="h2">
            Four steps to <em>your own agent</em>
          </h2>
        </div>
        <div className="how">
          <Step
            title="Install it"
            art={
              <Term bar="~">
                <span className="tl"><Prompt /> {site.install}</span>
                <span className="tl"><Prompt /> {cmd} onboard</span>
                <span className="tl t-dim">  model, search, Telegram, background service</span>
                <span className="tl"><Prompt /> {cmd} doctor</span>
                <span className="tl"><span className="t-ok">✓</span> All good. Try: {cmd} chat</span>
              </Term>
            }
          >
            One command with uv or pipx, then <code>{cmd} onboard</code> sets up the rest. <code>doctor</code> checks it
            and tells you how to fix anything wrong, <code>audit</code> checks it against the security rules,{' '}
            <code>update</code> upgrades it. macOS or Linux, Python 3.12+.
            {site.inDevelopment && ' Not on PyPI yet: this is the command for the first release.'}
          </Step>

          <Step
            flip
            title="Bring a model"
            art={
              <LogoRow
                items={[
                  { label: 'OpenAI', brand: 'openai' },
                  { label: 'Anthropic', brand: 'anthropic' },
                  { label: 'Ollama', brand: 'ollama' },
                ]}
              />
            }
          >
            An OpenAI or Anthropic key, kept in your OS keychain, or a free local model through Ollama. Web search comes
            with it: your model provider’s own, no extra key. SerpAPI if you want Google.
          </Step>

          <Step
            title="Talk to it"
            art={
              <LogoRow
                items={[
                  { label: 'Terminal', icon: 'term' },
                  { label: 'Web page', icon: 'globe' },
                  { label: 'Telegram', brand: 'telegram' },
                ]}
              />
            }
          >
            Chat in the terminal, open the local web page, or pair your Telegram bot with a code. The background service
            (<code>{cmd} daemon</code>) keeps schedules and reminders firing with the terminal closed.
          </Step>

          <Step
            flip
            title="Connect your tools"
            artStyle={{ flexDirection: 'column', gap: 18, alignItems: 'stretch' }}
            art={
              <>
                <div className="app-row" aria-hidden="true">
                  {APPS.map((b) => (
                    <span key={b} className="tile">
                      <Logo name={b} />
                    </span>
                  ))}
                </div>
                <Term>
                  <span className="tl"><Prompt /> {cmd} mcp add gmail --provides email \</span>
                  <span className="tl">    --env GMAIL_TOKEN -- &lt;command&gt;</span>
                  <span className="tl t-dim">  Added gmail, providing email.</span>
                  <span className="tl"><Prompt /> {cmd} mcp tools gmail</span>
                  <span className="tl"><span className="t-dim">  search_emails  </span><span className="t-ok">read-only</span></span>
                  <span className="tl"><span className="t-dim">  send_email     </span><span className="t-ask">asks</span></span>
                </Term>
              </>
            }
          >
            Gmail, your calendar, anything with an MCP server. Add it with one command; its keys go to your keychain and
            only to that server. Reads run freely. Anything else asks first, until you mark it “always allow.”
          </Step>
        </div>
      </div>
    </section>
  )
}
