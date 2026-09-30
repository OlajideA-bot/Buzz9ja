import { forwardRef, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'

const PIN_INTERVAL = 450
const CYCLE_START_DELAY = 500
const HOLD = 2800
const FADE_OUT = 700

export const LagosMap = forwardRef<HTMLDivElement>(function LagosMap(_props, heroArtRef) {
  const pins = siteConfig.mapPins
  const mapRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])
  const runningRef = useRef(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const node = mapRef.current
    if (!node || reducedMotion) return

    const clearTimers = () => {
      for (const id of timersRef.current) window.clearTimeout(id)
      timersRef.current = []
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timersRef.current.push(window.setTimeout(resolve, ms))
      })

    const cycle = async () => {
      while (runningRef.current) {
        setFadingOut(false)
        setVisibleCount(0)
        await wait(CYCLE_START_DELAY)
        for (let i = 0; i < pins.length && runningRef.current; i++) {
          setVisibleCount(i + 1)
          await wait(PIN_INTERVAL)
        }
        if (!runningRef.current) break
        await wait(HOLD)
        if (!runningRef.current) break
        setFadingOut(true)
        await wait(FADE_OUT)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting && !runningRef.current) {
          runningRef.current = true
          cycle()
        } else if (!entry.isIntersecting && runningRef.current) {
          runningRef.current = false
          clearTimers()
          setFadingOut(false)
          setVisibleCount(0)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      runningRef.current = false
      clearTimers()
    }
  }, [pins, reducedMotion])

  return (
    <div ref={heroArtRef} className="hero-art" id="heroArt" data-reveal style={{ ['--d' as string]: '200ms' }}>
      <div ref={mapRef} className={`map${fadingOut ? ' out' : ''}`} id="map">
        <div className="glow" />
        <img
          className="base"
          width={880}
          height={1200}
          alt="Map of Lagos at night showing places to visit"
          src="/assets/hero/lagos-night.webp"
        />
        {pins.map((pin, index) => {
          const shown = reducedMotion || index < visibleCount
          return (
            <img
              key={pin.label}
              className={`pin${shown ? ' in' : ''}`}
              alt=""
              src={pin.src}
              style={{ left: `${pin.left}%`, top: `${pin.top}%`, width: `${pin.width}%` }}
            />
          )
        })}
        <div className="chip chip-a">
          <Icon name="shield" />
          Verified vendors
        </div>
        <div className="chip chip-b">
          <i />
          Now on iOS &amp; Android
        </div>
      </div>
      <p className="sr">
        Places shown on the map: {pins.map((pin) => pin.label).join(', ')}.
      </p>
    </div>
  )
})
