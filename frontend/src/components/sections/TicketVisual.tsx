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
        <QrCode size={78} />
      </div>
    </div>
  )
}
