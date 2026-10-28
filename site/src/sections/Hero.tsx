import { GithubLink } from '../components/GithubLink'
import { GridPulse } from '../components/GridPulse'
import { Icon, Mark } from '../components/icons'
import { InstallPill } from '../components/InstallPill'
import { site } from '../config'

const NAV = [
  ['#what', 'What it does'],
  ['#uses', 'Use cases'],
  ['#how', 'How it works'],
  ['#differ', 'Where we differ'],
  ['#faq', 'FAQ'],
]

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <GridPulse />
      <div className="wrap">
        <header className="nav glass">
          <a href="#top" className="brand">
            <Mark />
            {site.name}
          </a>
          <nav aria-label="Main" className="nav-links">
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-end">
            <GithubLink className="btn btn--glass btn--sm" href={site.githubUrl}>
              GitHub
            </GithubLink>
            <a className="btn btn--white btn--sm" href="#how">
              Get started
            </a>
          </div>
        </header>
        <div className="hero-in">
          <p className="hero-eyebrow guard" data-grid-avoid="">
            Open source · Runs on your machine
          </p>
          <h1 id="hero-title" className="display guard" data-grid-avoid="">
            The AI agent that
            <br />
            <em>does the work.</em>
          </h1>
          <p className="lead guard" data-grid-avoid="">
            Searches the web, reads your PDFs, turns a voice note into a reminder. Connect your apps and it briefs you
            every morning, triages your inbox and preps your meetings. Talk to it from the terminal, a local web page or
            Telegram.
          </p>
          {site.inDevelopment && (
            <span className="badge glass">
              <span className="dot" aria-hidden="true" />
              In development · not released yet
            </span>
          )}
          <InstallPill />
          <div className="ctas">
            <a className="btn btn--white" href="#how">
              Get started
              <Icon name="arrow" />
            </a>
            <GithubLink className="btn btn--glass" href={site.githubUrl}>
              View on GitHub
            </GithubLink>
          </div>
        </div>
      </div>
    </section>
  )
}
