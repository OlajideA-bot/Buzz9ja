import { QrCode } from '../ui/QrCode'
import { ticketInfo } from './featuresContent'

export function TicketVisual() {
  return (
    <div className="ticket">
      <div className="ticket-main">
        <small>Admit one</small>
        <h4>{ticketInfo.eventName}</h4>
        <p>{ticketInfo.meta}</p>
      </div>
      <div className="ticket-stub">
        <QrCode size={72} fgVar="--forest" fgFallback="#0a2517" bgVar="--ivory-dim" bgFallback="#e7e0ce" />
      </div>
    </div>
  )
}
