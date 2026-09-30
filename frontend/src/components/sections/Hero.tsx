import { useRef } from 'react'
import { useParallax } from '../../hooks/useParallax'
import { StoreButtons } from '../ui/StoreButtons'
import { LagosMap } from './LagosMap'

export function Hero() {
  const heroArtRef = useRef<HTMLDivElement>(null)
  useParallax(heroArtRef, 0.06)

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1 className="display hero-h1" data-reveal>
            Discover Nigeria&apos;s <em>best</em> events,
            <span className="h1-sub">book tickets &amp; connect with trusted vendors.</span>
          </h1>
          <p className="hero-copy" data-reveal style={{ ['--d' as string]: '120ms' }}>
            From concerts to conferences, find what&apos;s happening around you, secure your spot in
            seconds, and connect with verified vendors, all in one place.
          </p>
          <StoreButtons reveal delay={220} />
        </div>

        <LagosMap ref={heroArtRef} />
      </div>
      <div className="hero-cue" aria-hidden="true">
        <i />
        Scroll
      </div>
    </section>
  )
}
