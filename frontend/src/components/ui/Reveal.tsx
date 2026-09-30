import type { CSSProperties, ElementType, ReactNode } from 'react'

type Props = {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
  style?: CSSProperties
}

export function Reveal({ as: Tag = 'div', delay, className, children, style }: Props) {
  const revealStyle: CSSProperties = { ...style }
  if (delay) {
    ;(revealStyle as Record<string, string>)['--d'] = `${delay}ms`
  }

  return (
    <Tag data-reveal="" className={className} style={revealStyle}>
      {children}
    </Tag>
  )
}
