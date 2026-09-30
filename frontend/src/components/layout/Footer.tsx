import { Link } from 'react-router-dom'
import { externalOrDownload, isExternal, siteConfig } from '../../config/site'
import { Icon } from '../ui/Icon'

export function Footer() {
  const socials = [
    { url: siteConfig.instagramUrl, label: 'Instagram', icon: 'ig' },
    { url: siteConfig.xUrl, label: 'X', icon: 'x' },
  ]

  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <Link to="/" aria-label="Buzz 9ja home">
              <img src="/assets/brand/buzz9ja-logo.png" alt="Buzz 9ja" width={61} height={64} />
            </Link>
            <p>Nigeria&apos;s go-to app for discovering events, securing tickets, and connecting with trusted vendors.</p>
            <div className="socials">
              {socials.map((social) => {
                const external = isExternal(social.url)
                return (
                  <a
                    key={social.label}
                    href={externalOrDownload(social.url)}
                    aria-label={social.label}
                    {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    <Icon name={social.icon} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="f-col">
            <h4>Product</h4>
            <ul>
              <li>
                <Link to="/#features">Features</Link>
              </li>
              <li>
                <Link to="/#how">How it works</Link>
              </li>
              <li>
                <Link to="/#download">Download app</Link>
              </li>
            </ul>
          </div>

          <div className="f-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.supportEmail}`}>Contact us</a>
              </li>
              <li>
                <Link to="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="f-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/terms">Terms &amp; conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund &amp; payout policy</Link>
              </li>
              <li>
                <a href={externalOrDownload(siteConfig.vendorPortalUrl)} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Vendor login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="f-bottom">
          &copy; {new Date().getFullYear()} Maekandex Communications Limited. All rights reserved.
        </div>
      </div>
      <div className="f-word" aria-hidden="true">
        Buzz 9ja
      </div>
    </footer>
  )
}
