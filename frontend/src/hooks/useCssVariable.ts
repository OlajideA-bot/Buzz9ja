import { useEffect, useState } from 'react'

export function useCssVariable(name: string, fallback: string): string {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    const read = () => {
      const resolved = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      if (resolved) setValue(resolved)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [name])

  return value
}
