import { discoveryEvents } from './featuresContent'

export function DiscoveryVisual() {
  return (
    <div>
      <div className="filters">
        <span>Category</span>
        <span>Date</span>
        <span>Location</span>
      </div>
      {discoveryEvents.map((event) => (
        <div key={event.title} className="ev">
          <div className="ev-d">
            <b>{event.day}</b>
            <small>{event.month}</small>
          </div>
          <div>
            <h4>{event.title}</h4>
            <p>{event.meta}</p>
          </div>
          <span className="ev-p">{event.price}</span>
        </div>
      ))}
    </div>
  )
}
