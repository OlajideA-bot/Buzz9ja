import type { CSSProperties, ReactNode } from 'react'

type Props = {
  className: string
  delay?: number
  stage: ReactNode
  icon: ReactNode
  title: string
  description: string
}

export function Tile({ className, delay, stage, icon, title, description }: Props) {
  const style: CSSProperties = {}
  if (delay) {
    ;(style as Record<string, string>)['--d'] = `${delay}ms`
  }

  return (
    <article className={`tile ${className}`} data-reveal style={style}>
      <div className="tile-stage">{stage}</div>
      <div className="tile-copy">
        <div className="ico">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}
