import { ClosingCta } from './sections/ClosingCta'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { ModelsStrip } from './sections/ModelsStrip'
import { TerminalShot } from './sections/TerminalShot'
import { YourMachine } from './sections/YourMachine'

export default function App() {
  return (
    <div className="s-root" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <TerminalShot />
        <Features />
        <HowItWorks />
        <YourMachine />
        <ModelsStrip />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
