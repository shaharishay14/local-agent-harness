import { useEffect, useRef, useState } from 'react'
import { site } from '../config'
import { Icon } from './icons'

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
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="install glass">
      <span>
        <span className="install-p" aria-hidden="true">
          ${' '}
        </span>
        {site.install}
      </span>
      <button type="button" onClick={copy} aria-label="Copy install command">
        <Icon name={copied ? 'check' : 'copy'} size={15} />
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="sr" role="status">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  )
}
