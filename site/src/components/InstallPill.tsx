import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '../config'

export function InstallPill() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.install)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="install">
      <div className="install-pill">
        <code>
          <span className="install-prompt" aria-hidden="true">$</span>
          {site.install}
        </code>
        <button type="button" className="install-copy" onClick={copy} aria-label="Copy install command">
          {copied ? <Check size={16} strokeWidth={1.7} /> : <Copy size={16} strokeWidth={1.7} />}
        </button>
        <span className="s-sr" role="status">
          {copied ? 'Copied to clipboard' : ''}
        </span>
      </div>
      {site.inDevelopment && (
        <p className="install-note">Not on PyPI yet. This is the command for the first release.</p>
      )}
    </div>
  )
}
