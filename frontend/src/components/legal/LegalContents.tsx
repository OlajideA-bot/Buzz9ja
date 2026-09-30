import { useEffect, useMemo, useRef, useState } from 'react'
import type { LegalDocument } from '../../config/legal'
import { Icon } from '../ui/Icon'

type Entry = { kind: 'label'; text: string } | { kind: 'link'; id: string; title: string }

function buildEntries(document: LegalDocument): Entry[] {
  const entries: Entry[] = []
  for (const node of document.nodes) {
    if (node.kind === 'part') {
      entries.push({ kind: 'label', text: node.title })
    } else if (node.kind === 'section') {
      entries.push({ kind: 'link', id: node.id, title: `${node.number}. ${node.title}` })
    }
  }
  return entries
}

export function LegalContents({ document }: { document: LegalDocument }) {
  const entries = useMemo(() => buildEntries(document), [document])
  const sectionIds = useMemo(
    () => entries.filter((e): e is Extract<Entry, { kind: 'link' }> => e.kind === 'link').map((e) => e.id),
    [entries],
  )
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const activeRef = useRef(new Set<string>())

  useEffect(() => {
    const targets = sectionIds
      .map((id) => window.document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeRef.current.add(entry.target.id)
          else activeRef.current.delete(entry.target.id)
        }
        const first = sectionIds.find((id) => activeRef.current.has(id))
        if (first) setActiveId(first)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMobileOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.document.addEventListener('keydown', onKeyDown)
    return () => window.document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <div>
      <button
        ref={toggleRef}
        type="button"
        className="legal-contents-toggle"
        aria-expanded={mobileOpen}
        aria-controls="legal-contents-panel"
        onClick={() => setMobileOpen((v) => !v)}
      >
        On this page
        <Icon name="chevron-down" />
      </button>

      {mobileOpen ? (
        <div className="legal-contents-panel" id="legal-contents-panel">
          {entries.map((entry, index) =>
            entry.kind === 'label' ? (
              <p key={index} className="legal-part-label">
                {entry.text}
              </p>
            ) : (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className={entry.id === activeId ? 'active' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {entry.title}
              </a>
            ),
          )}
        </div>
      ) : null}

      <nav className="legal-contents" aria-label="Contents">
        {entries.map((entry, index) =>
          entry.kind === 'label' ? (
            <p key={index} className="legal-part-label">
              {entry.text}
            </p>
          ) : (
            <a key={entry.id} href={`#${entry.id}`} className={entry.id === activeId ? 'active' : ''}>
              {entry.title}
            </a>
          ),
        )}
      </nav>
    </div>
  )
}
