import { useEffect } from 'react'

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title

    if (!description) return

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = tag?.getAttribute('content') ?? null

    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)

    return () => {
      if (tag && previous !== null) tag.setAttribute('content', previous)
    }
  }, [title, description])
}
