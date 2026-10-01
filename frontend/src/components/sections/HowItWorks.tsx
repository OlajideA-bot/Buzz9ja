import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePinnedProgress } from '../../hooks/usePinnedProgress'
import { Icon } from '../ui/Icon'

type FlowKey = 'guest' | 'host'

const steps: Record<FlowKey, Array<{ title: string; body: string }>> = {
  guest: [
    { title: 'Discover', body: 'Browse events happening near you or search by category, date, or location.' },
    { title: 'Book', body: 'Get your ticket or RSVP directly in the app with secure, instant confirmation.' },
    { title: 'Attend', body: 'Show up and enjoy. Your ticket and access pass are right there on your phone.' },
  ],
  host: [
    { title: 'Get verified', body: 'Complete NIN-based verification to become a trusted vendor on the platform.' },
    { title: 'List your event', body: 'Create and manage your own events on the platform with full control.' },
    { title: 'Manage', body: 'Track bookings and manage your listings from the vendor web portal.' },
  ],
}

const subs: Record<FlowKey, string> = {
  guest: 'Discover & book events',
  host: 'List & manage events',
}

export function HowItWorks() {
  const [flow, setFlow] = useState<FlowKey>('guest')
  const trackRef = useRef<HTMLDivElement>(null)
  const { pinned, activeIndex, progress, scrollToStep } = usePinnedProgress(trackRef, 3)

  return (
    <section className="how" id="how">
      <div ref={trackRef} className="how-track" id="howTrack">
        <div className="how-sticky">
          <div className="wrap how-grid">
            <div>
              <span className="label">How it works</span>
              <h2 className="display">
                Getting started is <em>simple</em>
              </h2>
              <p className="lead">
                Whether you&apos;re attending an event or hosting one, Buzz 9ja makes the entire process
                seamless.
              </p>
              <div className="seg" role="tablist" aria-label="Choose your journey">
                <button
                  role="tab"
                  id="tab-guest"
                  aria-selected={flow === 'guest'}
                  aria-controls="flow-guest"
                  onClick={() => setFlow('guest')}
                >
                  For attendees
                </button>
                <button
                  role="tab"
                  id="tab-host"
                  aria-selected={flow === 'host'}
                  aria-controls="flow-host"
                  onClick={() => setFlow('host')}
                >
                  For vendors
                </button>
              </div>
              <p className="flow-sub">{subs[flow]}</p>

              {flow === 'guest' ? (
                <div className="flow-cta">
                  <Link to="/#download" className="btn btn-primary">
                    Get the app
                    <Icon name="arrow" />
                  </Link>
                </div>
              ) : (
                <div className="flow-cta">
                  <Link to="/#download" className="btn btn-primary">
                    Register as a vendor
                    <Icon name="arrow" />
                  </Link>
                </div>
              )}

              <div className="prog" aria-hidden="true">
                <i style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>

            <div>
              <ol className="steps" id="flow-guest" role="tabpanel" aria-labelledby="tab-guest" hidden={flow !== 'guest'}>
                {steps.guest.map((step, index) => (
                  <li
                    key={step.title}
                    className={pinned && activeIndex === index ? 'active' : ''}
                    onClick={() => scrollToStep(index)}
                  >
                    <span className="num">{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
              <ol className="steps" id="flow-host" role="tabpanel" aria-labelledby="tab-host" hidden={flow !== 'host'}>
                {steps.host.map((step, index) => (
                  <li
                    key={step.title}
                    className={pinned && activeIndex === index ? 'active' : ''}
                    onClick={() => scrollToStep(index)}
                  >
                    <span className="num">{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
