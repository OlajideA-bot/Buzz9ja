type Props = {
  children: React.ReactNode
  reveal?: boolean
}

export function Label({ children, reveal }: Props) {
  return (
    <span className="label" {...(reveal ? { 'data-reveal': true } : {})}>
      {children}
    </span>
  )
}
