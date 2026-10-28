// Everything a rename or a release touches lives here.

/** Set to null to hide every GitHub link on the page. */
const githubUrl: string | null = 'https://github.com/shaharishay14/local-agent-harness'

export const site = {
  name: 'Local Agent',
  command: 'local-agent',
  install: 'uv tool install local-agent',
  stateDir: '~/.local-agent',
  githubUrl,
  readmeUrl: githubUrl ? `${githubUrl}#readme` : null,
  issuesUrl: githubUrl ? `${githubUrl}/issues` : null,
  licenseUrl: githubUrl ? `${githubUrl}/blob/main/LICENSE` : null,
  /** While true, the page says the project isn't released yet. Flip to false at the first release. */
  inDevelopment: true,
  year: 2026,
}
