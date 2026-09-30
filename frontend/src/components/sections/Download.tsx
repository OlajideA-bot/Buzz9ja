import { useMediaQuery } from '../../hooks/useMediaQuery'
import { QrCode } from '../ui/QrCode'
import { StoreButtons } from '../ui/StoreButtons'

export function Download() {
  const wide = useMediaQuery('(min-width: 900px)')

  return (
    <section className="dl" id="download">
      <div className="wrap">
        <div className="dl-panel" data-reveal>
          <div>
            <span className="label">Get the app</span>
            <h2 className="display">
              Download Buzz 9ja <em>today</em>
            </h2>
            <p className="lead">Available on the App Store and Google Play. Start discovering events in seconds.</p>
            <StoreButtons tone="on-dark" />
          </div>
          {wide ? (
            <div className="qr">
              <QrCode size={176} />
              <span>Scan to download on your phone</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
