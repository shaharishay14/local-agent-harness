import { ArrowRight } from 'lucide-react'
import { site } from '../config'
import { GithubIcon, Mark } from '../components/icons'
import { InstallPill } from '../components/InstallPill'

const navLinks = [
  { href: '#what', label: 'What it does' },
  { href: '#uses', label: 'Use cases' },
  { href: '#how', label: 'How it works' },
  { href: '#machine', label: 'Your machine' },
  { href: '#faq', label: 'FAQ' },
]

export function Hero() {
  const getStarted = site.readmeUrl ?? '#how'
  return (
    <section className="l-hero" aria-labelledby="hero-title">
      <header className="s-nav s-glass">
        <a href="#top" className="s-logo">
          <Mark />
          {site.name}
        </a>
        <nav aria-label="Main" className="s-nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="s-nav-btn">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="s-nav-end">
          {site.githubUrl && (
            <a className="s-btn s-btn--glass s-btn--sm" href={site.githubUrl} aria-label="GitHub">
              <GithubIcon />
              <span className="nav-gh-label">GitHub</span>
            </a>
          )}
          <a className="s-btn s-btn--white s-btn--sm" href={getStarted}>
            Get started
          </a>
        </div>
      </header>

      <div className="l-hero-in">
        <p className="s-eyebrow s-bf">Open source · Runs on your machine</p>
        <h1 id="hero-title" className="s-display s-bf s-bf1">
          The AI agent that
          <br />
          <em>does the work.</em>
        </h1>
        <p className="s-lead s-bf s-bf2">
          Searches the web, reads your PDFs, turns a voice note into a reminder. Connect your apps and it briefs
          you every morning, triages your inbox and preps your meetings. Talk to it from the terminal, a local
          web page or Telegram. Open source, runs on your machine, answers to one owner: you.
        </p>
        {site.inDevelopment && (
          <span className="s-badge s-bf s-bf2">
            <span className="s-sdot s-sdot--busy" aria-hidden="true" />
            In development · not released yet
          </span>
        )}
        <div className="s-bf s-bf3" style={{ maxWidth: '100%' }}>
          <InstallPill />
        </div>
        <div className="hero-ctas s-bf s-bf4">
          <a className="s-btn s-btn--white" href={getStarted}>
            Get started
            <ArrowRight size={16} strokeWidth={1.7} />
          </a>
          {site.githubUrl && (
            <a className="s-btn s-btn--glass" href={site.githubUrl}>
              <GithubIcon />
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
