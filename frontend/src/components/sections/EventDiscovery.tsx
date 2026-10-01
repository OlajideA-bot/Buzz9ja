import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'
import { Label } from '../ui/Label'
import { Reveal } from '../ui/Reveal'
import { discoveryFilters } from './featuresContent'

function useDiscoveryDrift(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let frame: number | null = null

    const update = () => {
      frame = null
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const span = rect.height + window.innerHeight
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span))
      const offset = 24 - progress * 48
      node.style.transform = `translateY(${offset.toFixed(1)}px)`
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [ref])
}

export function EventDiscovery() {
  const visualRef = useRef<HTMLDivElement>(null)
  useDiscoveryDrift(visualRef)
  const showImage = siteConfig.features.showDiscoveryImage

  return (
    <section className={`discovery${showImage ? '' : ' no-image'}`} id="event-discovery">
      <div className={`wrap${showImage ? ' discovery-grid' : ''}`}>
        <Reveal>
          <Label reveal>Event discovery</Label>
          <h2 className="display">
            Find what&apos;s happening
            <br />
            <em>around you, in seconds.</em>
          </h2>
          <p className="lead">Browse and search events by category, location, or date.</p>
          <div className="discovery-pills">
            {discoveryFilters.map((filter) => (
              <span key={filter} className="discovery-pill">
                {filter}
                <Icon name="chevron-down" className="ic" />
              </span>
            ))}
          </div>
          <div className="discovery-actions">
            <Link to="/#download" className="btn btn-primary">
              Get the app
              <Icon name="arrow" />
            </Link>
          </div>
        </Reveal>

        {showImage ? (
          <Reveal delay={120}>
            <div ref={visualRef} className="discovery-visual">
              <div className="discovery-glow discovery-glow-orange" />
              <div className="discovery-glow discovery-glow-green" />
              <img
                className="discovery-phone"
                src={siteConfig.discoveryImage}
                alt="Events screen with search, date, category and location filters and a list of event cards"
                width={1000}
                height={2072}
                loading="lazy"
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
