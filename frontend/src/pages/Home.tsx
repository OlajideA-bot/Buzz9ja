import { About } from '../components/sections/About'
import { Download } from '../components/sections/Download'
import { Faq } from '../components/sections/Faq'
import { Features } from '../components/sections/Features'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Marquee } from '../components/sections/Marquee'
import { Trust } from '../components/sections/Trust'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReveal } from '../hooks/useReveal'

export function Home() {
  useDocumentTitle("Buzz 9ja: Discover Nigeria's Best Events")
  useReveal()

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <HowItWorks />
      <Features />
      <Trust />
      <Faq />
      <Download />
    </>
  )
}
