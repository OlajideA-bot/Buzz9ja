import { Icon } from '../ui/Icon'
import { DashboardVisual } from './DashboardVisual'
import { DiscoveryVisual } from './DiscoveryVisual'
import { TicketVisual } from './TicketVisual'
import { VerifyVisual } from './VerifyVisual'
import { VisitorVisual } from './VisitorVisual'

export function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label" data-reveal>
              Features
            </span>
            <h2 className="display" data-reveal style={{ ['--d' as string]: '80ms' }}>
              Everything you need in <em>one app</em>
            </h2>
          </div>
          <p data-reveal style={{ ['--d' as string]: '140ms' }}>
            Powerful tools designed for both event-goers and vendors across Nigeria.
          </p>
        </div>

        <div className="bento">
          <article className="tile t-discover" data-reveal>
            <DiscoveryVisual />
            <div className="tile-copy">
              <div className="ico">
                <Icon name="search" />
              </div>
              <h3>Event discovery</h3>
              <p>Browse and search events by category, location, or date. Find what&apos;s happening around you in seconds.</p>
            </div>
          </article>

          <article className="tile t-ticket" data-reveal style={{ ['--d' as string]: '100ms' }}>
            <TicketVisual />
            <div className="tile-copy">
              <div className="ico">
                <Icon name="ticket" />
              </div>
              <h3>Secure ticketing</h3>
              <p>Book and receive tickets instantly with secure in-app payments and digital QR access.</p>
            </div>
          </article>

          <article className="tile t-verify" data-reveal>
            <VerifyVisual />
            <div className="tile-copy">
              <div className="ico">
                <Icon name="shield" />
              </div>
              <h3>Vendor verification</h3>
              <p>All vendors complete NIN-based verification so you can book with confidence every time.</p>
            </div>
          </article>

          <article className="tile t-dash" data-reveal style={{ ['--d' as string]: '100ms' }}>
            <DashboardVisual />
            <div className="tile-copy">
              <div className="ico">
                <Icon name="chart" />
              </div>
              <h3>Vendor dashboard</h3>
              <p>Manage listings, track bookings, and analyze performance from the dedicated web admin portal.</p>
            </div>
          </article>

          <article className="tile t-visit" data-reveal style={{ ['--d' as string]: '200ms' }}>
            <VisitorVisual />
            <div className="tile-copy">
              <div className="ico">
                <Icon name="globe" />
              </div>
              <h3>Visitor friendly</h3>
              <p>Tourists and visitors can easily discover Nigerian events and experiences while in the country.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
