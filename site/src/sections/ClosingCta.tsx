import { FileText } from 'lucide-react'
import { site } from '../config'
import { GithubIcon } from '../components/icons'
import { InstallPill } from '../components/InstallPill'
import { Reveal } from '../components/Reveal'

export function ClosingCta() {
  return (
    <section className="l-sec" aria-labelledby="cta-title">
      <div className="l-wrap">
        <Reveal className="s-cta">
          <div className="s-cta-img" aria-hidden="true" />
          <div className="s-cta-in">
            <h2 id="cta-title">
              Your own agent, <em className="s-serif">one command away.</em>
            </h2>
            <InstallPill />
            {site.githubUrl && (
              <div className="hero-ctas">
                <a className="s-btn s-btn--white s-btn--lg" href={site.githubUrl}>
                  <GithubIcon />
                  View on GitHub
                </a>
                {site.planUrl && (
                  <a className="s-btn s-btn--glass s-btn--lg" href={site.planUrl}>
                    <FileText size={16} strokeWidth={1.7} aria-hidden="true" />
                    Read the plan
                  </a>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
