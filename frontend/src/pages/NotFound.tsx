import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Icon } from '../components/ui/Icon'

export function NotFound() {
  useDocumentTitle('Page not found: Buzz 9ja')

  return (
    <section className="about">
      <div className="wrap" style={{ maxWidth: '760px' }}>
        <span className="label">404</span>
        <h1 className="display" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', marginTop: '20px' }}>
          We can&apos;t find that page.
        </h1>
        <p className="about-copy" style={{ marginTop: '24px', fontSize: '1.2rem' }}>
          The link may be old, or the page may have moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '36px' }}>
          Back to home
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  )
}
