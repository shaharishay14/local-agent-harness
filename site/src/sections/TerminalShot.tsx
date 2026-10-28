import { site } from '../config'

export function TerminalShot() {
  return (
    <div className="wrap">
      <figure className="shot">
        <div className="term">
          <div className="term-bar" aria-hidden="true">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span>~ — {site.command} chat</span>
          </div>
          <div className="term-body">
            <span className="tl">
              <span className="t-dim">$</span> {site.command} chat
            </span>
            <span className="tl t-dim">{site.name} · anthropic · 14 memory notes</span>
            <span className="tl"> </span>
            <span className="tl">
              <span className="t-you">you   </span>Remind Emma about Tuesday's review. Keep it short, the way I like.
            </span>
            <span className="tl">
              <span className="t-dim">agent </span>
              <span className="t-ok">✓</span> <span className="t-tool">memory</span> read preferences/writing.md{' '}
              <span className="t-dim">short replies, no greetings</span>
            </span>
            <span className="tl">
              {'      '}
              <span className="t-ok">✓</span> <span className="t-tool">memory</span> read people/emma.md
            </span>
            <span className="tl">
              {'      '}
              <span className="t-ok">✓</span> <span className="t-tool">gmail</span> draft email to emma@example.com
            </span>
            <span className="tl">{'        '}"Quick reminder: review Tuesday at 10. Bring the Q3 numbers."</span>
            <span className="tl">
              {'      '}
              <span className="t-ask">?</span> <span className="t-tool">gmail</span> send_email needs your approval
            </span>
            <span className="tl">
              {'        '}
              <span className="t-ask">Send it? [y/N]</span> y
            </span>
            <span className="tl">
              {'      '}
              <span className="t-ok">✓</span> Sent. Logged as run 0142{' '}
              <span className="t-dim">({site.command} runs show 0142)</span>
            </span>
          </div>
        </div>
        <figcaption className="shot-cap">
          Example session, with a Gmail MCP server connected.
          {site.inDevelopment && ` ${site.name} is still in development.`}
        </figcaption>
      </figure>
    </div>
  )
}
