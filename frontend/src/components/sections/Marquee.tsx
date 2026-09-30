import { Fragment } from 'react'

const WORDS = ['Discover', 'Book', 'Attend', 'Verified vendors', 'Secure ticketing', 'Visitor friendly']

function MarqueeSet() {
  return (
    <div className="marquee-set">
      {WORDS.map((word) => (
        <Fragment key={word}>
          <span>{word}</span>
          <b />
        </Fragment>
      ))}
    </div>
  )
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  )
}
