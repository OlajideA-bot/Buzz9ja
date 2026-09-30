import { Icon } from '../ui/Icon'

const escrow = [
  { icon: 'card', title: 'You pay', body: 'Secure in-app payment, ticket delivered instantly.', hold: false },
  { icon: 'hourglass', title: 'Buzz 9ja holds it', body: "The host isn't paid yet. Your money waits.", hold: true },
  { icon: 'check', title: 'Host is paid after', body: 'Released once the event has ended.', hold: false },
]

export function Trust() {
  return (
    <section className="trust">
      <div className="wrap trust-grid">
        <div>
          <span className="label" data-reveal>
            Peace of mind
          </span>
          <h2 className="display" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Book with confidence, <em>every time.</em>
          </h2>
          <p className="lead" data-reveal style={{ ['--d' as string]: '140ms' }}>
            Vendors are verified before they can list anything, and your ticket money is held until the
            event ends.
          </p>
          <div className="badges" data-reveal style={{ ['--d' as string]: '200ms' }}>
            <span>
              <Icon name="id" />
              NIN verification
            </span>
            <span>
              <Icon name="shield" />
              Payments held until the event ends
            </span>
          </div>
        </div>

        <ol className="escrow">
          {escrow.map((item, index) => (
            <li
              key={item.title}
              className={item.hold ? 'hold' : ''}
              data-reveal
              style={{ ['--d' as string]: `${index * 120}ms` }}
            >
              <div className="dot">
                <Icon name={item.icon} />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
