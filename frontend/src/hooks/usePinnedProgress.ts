import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useMediaQuery } from './useMediaQuery'

export function usePinnedProgress(trackRef: RefObject<HTMLDivElement | null>, stepCount: number) {
  const pinned = useMediaQuery('(min-width: 960px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)')
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('pin-on', pinned)
    return () => {
      document.documentElement.classList.remove('pin-on')
    }
  }, [pinned])

  useEffect(() => {
    if (!pinned) {
      setActiveIndex(0)
      setProgress(0)
      return
    }

    const update = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      setProgress(p)
      setActiveIndex(Math.min(stepCount - 1, Math.floor(p * stepCount)))
    }

    const onScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [pinned, stepCount, trackRef])

  const scrollToStep = (index: number) => {
    const track = trackRef.current
    if (!track || !pinned) return
    const total = track.offsetHeight - window.innerHeight
    const top = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + total * ((index + 0.5) / stepCount), behavior: 'smooth' })
  }

  return { pinned, activeIndex, progress, scrollToStep }
}
