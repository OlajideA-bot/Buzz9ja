import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      return
    }

    root.classList.add('js-reveal')

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    let observer: IntersectionObserver | null = null
    let safety: number | undefined

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      )
      items.forEach((el) => observer?.observe(el))
      safety = window.setTimeout(() => {
        items.forEach((el) => el.classList.add('in'))
      }, 4500)
    } else {
      items.forEach((el) => el.classList.add('in'))
    }

    return () => {
      observer?.disconnect()
      if (safety) window.clearTimeout(safety)
    }
  }, [])
}
