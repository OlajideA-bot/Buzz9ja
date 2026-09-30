import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { Icon } from '../ui/Icon'
import { MobileDrawer } from './MobileDrawer'
import { navLinks } from './navLinks'

export function Header() {
  const { toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const solid = !isHome || scrolled

  useEffect(() => {
    if (!isHome) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (wasOpen.current && !drawerOpen) menuBtnRef.current?.focus()
    wasOpen.current = drawerOpen
  }, [drawerOpen])

  return (
    <>
      <header className={`site${solid ? ' solid' : ''}`} id="siteHeader">
        <div className="wrap nav">
          <Link to="/" className="brand" aria-label="Buzz 9ja home">
            <img src="/assets/brand/buzz9ja-logo.png" alt="Buzz 9ja" width={50} height={52} />
          </Link>

          <nav className="links" aria-label="Main">
            {navLinks.map((link) => (
              <Link key={link.hash} to={`/${link.hash}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Switch between light and dark mode"
            >
              <Icon name="moon" />
            </button>
            <Link to="/#download" className="btn btn-primary btn-sm">
              Get the app
            </Link>
            <button
              ref={menuBtnRef}
              className="icon-btn menu-btn"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={navLinks} />
    </>
  )
}
