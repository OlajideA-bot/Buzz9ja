import { Link } from 'react-router-dom'
import { legalDocSwitcher } from '../../config/legal'

export function LegalDocSwitcher({ currentRoute }: { currentRoute: string }) {
  return (
    <div className="legal-switcher">
      <p className="legal-switcher-line">Terms and Conditions &amp; Privacy Policy</p>
      <nav className="legal-pills" aria-label="Legal documents">
        {legalDocSwitcher.map((doc) => {
          const active = doc.route === currentRoute
          return (
            <Link
              key={doc.route}
              to={doc.route}
              className={`legal-pill${active ? ' active' : ''}`}
              {...(active ? { 'aria-current': 'page' } : {})}
            >
              {doc.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
