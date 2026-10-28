import { GithubLink } from '../components/GithubLink'
import { Mark } from '../components/icons'
import { site } from '../config'

type Link = [label: string, href: string | null]

const COLUMNS: [string, Link[]][] = [
  [
    'Product',
    [
      ['What it does', '#what'],
      ['Use cases', '#uses'],
      ['How it works', '#how'],
      ['Where we differ', '#differ'],
    ],
  ],
  [
    'Resources',
    [
      ['README', site.readmeUrl],
      ['FAQ', '#faq'],
      ['Issues', site.issuesUrl],
    ],
  ],
  [
    'Project',
    [
      ['GitHub', site.githubUrl],
      ['MIT license', site.licenseUrl],
    ],
  ],
]

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="brand">
              <Mark />
              {site.name}
            </a>
            <p>An open-source AI agent that runs on your own machine and answers to one owner: you.</p>
            {site.githubUrl && (
              <div className="socials">
                <GithubLink className="glass" href={site.githubUrl} size={18} label={`${site.name} on GitHub`} />
              </div>
            )}
          </div>
          <nav className="foot-cols" aria-label="Footer">
            {COLUMNS.map(([heading, links]) => (
              <div key={heading} className="foot-col">
                <h3>{heading}</h3>
                {links
                  .filter(([, href]) => href)
                  .map(([label, href]) => (
                    <a key={label} href={href!}>
                      {label}
                    </a>
                  ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="foot-bot">
          <span>
            © {site.year} {site.name}
          </span>
          <span>MIT licensed · No telemetry · No account</span>
        </div>
      </div>
    </footer>
  )
}
