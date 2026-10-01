import { Icon } from '../ui/Icon'
import { Tile } from '../ui/Tile'
import { DashboardVisual } from './DashboardVisual'
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
          <Tile
            className="t-ticket"
            stage={<TicketVisual />}
            icon={<Icon name="ticket" />}
            title="Secure ticketing"
            description="Book and receive tickets instantly with secure in-app payments and digital QR access."
          />

          <Tile
            className="t-verify"
            delay={100}
            stage={<VerifyVisual />}
            icon={<Icon name="shield" />}
            title="Vendor verification"
            description="All vendors complete NIN-based verification so you can book with confidence every time."
          />

          <Tile
            className="t-dash"
            stage={<DashboardVisual />}
            icon={<Icon name="chart" />}
            title="Vendor dashboard"
            description="Manage listings, track bookings, and analyze performance from the dedicated web admin portal."
          />

          <Tile
            className="t-visit"
            delay={100}
            stage={<VisitorVisual />}
            icon={<Icon name="globe" />}
            title="Visitor friendly"
            description="Tourists and visitors can easily discover Nigerian events and experiences while in the country."
          />
        </div>
      </div>
    </section>
  )
}
