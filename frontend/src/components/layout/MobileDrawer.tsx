import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { externalOrDownload, siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'
import type { NavLink } from './navLinks'

type Props = {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileDrawer({ open, onClose, links }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 60)

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  return (
    <div
      className={`drawer${open ? ' open' : ''}`}
      id="drawer"
      aria-hidden={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div ref={panelRef} className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <button ref={closeBtnRef} className="icon-btn" aria-label="Close menu" onClick={onClose}>
          <Icon name="close" />
        </button>
        <nav>
          {links.map((link) => (
            <Link key={link.hash} to={`/${link.hash}`} onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/#download" className="btn btn-primary" onClick={onClose}>
          Get the app
          <Icon name="arrow" />
        </Link>
        <a href={externalOrDownload(siteConfig.vendorPortalUrl)} target="_blank" rel="noopener" className="dv">
          Vendor login
        </a>
      </div>
    </div>
  )
}
