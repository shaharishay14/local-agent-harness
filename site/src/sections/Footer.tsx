import { site } from '../config'
import { Mark } from '../components/icons'

export function Footer() {
  return (
    <div className="l-wrap" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <footer className="s-foot s-panel">
        <span className="s-foot-ring s-glass">
          <Mark size={52} />
        </span>
        <nav aria-label="Footer" className="s-foot-links">
          <a href="#what">What it does</a>
          <a href="#uses">Use cases</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
          {site.githubUrl && <a href={site.githubUrl}>GitHub</a>}
        </nav>
        <p className="s-foot-meta">MIT licensed · No telemetry · No account</p>
        <p className="s-foot-meta">
          © {site.year} {site.name}
        </p>
      </footer>
    </div>
  )
}
