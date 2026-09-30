import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useParallax(ref: RefObject<HTMLElement | null>, factor: number) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const node = ref.current
        const y = window.scrollY || 0
        if (node && y < window.innerHeight * 1.3) {
          node.style.transform = `translate3d(0, ${(y * -factor).toFixed(1)}px, 0)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, factor])
}
