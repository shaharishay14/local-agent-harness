import { GithubLink } from '../components/GithubLink'
import { InstallPill } from '../components/InstallPill'
import { site } from '../config'

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="cta-sec">
      <div className="wrap">
        <div className="cta">
          <h2 id="cta-title">
            Make yourself at home.
            <br />
            <em>It’s your agent.</em>
          </h2>
          <InstallPill />
          <GithubLink className="btn btn--white" href={site.githubUrl} dark>
            View on GitHub
          </GithubLink>
        </div>
      </div>
    </section>
  )
}
