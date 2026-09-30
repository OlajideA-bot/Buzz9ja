type Props = {
  name: string
  className?: string
}

export function Icon({ name, className = 'ic' }: Props) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  )
}
