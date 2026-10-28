import { IconSprite } from './components/icons'
import { ClosingCta } from './sections/ClosingCta'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { TerminalShot } from './sections/TerminalShot'
import { UseCases } from './sections/UseCases'
import { WhereWeDiffer } from './sections/WhereWeDiffer'

export default function App() {
  return (
    <div className="la" id="top">
      <IconSprite />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Hero />
      <div className="below">
        {/* The grid below the hero drifts on its own; it never follows the pointer. */}
        <div className="flow" aria-hidden="true">
          <div className="flow-tint" />
          <div className="flow-lines" />
          <div className="flow-lit" />
        </div>
        <main id="main">
          <TerminalShot />
          <Features />
          <UseCases />
          <HowItWorks />
          <WhereWeDiffer />
          <Faq />
          <ClosingCta />
        </main>
        <Footer />
      </div>
    </div>
  )
}
