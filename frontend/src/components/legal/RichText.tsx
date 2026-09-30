import { Fragment } from 'react'

const PATTERN = /([\w.+-]+@[\w-]+\.[\w.-]+)|(www\.ndpc\.gov\.ng)|(Section 20)/g

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0

  for (const match of text.matchAll(PATTERN)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, index)}</Fragment>)
    }

    const [full, email, ndpc, sectionTwenty] = match

    if (email) {
      nodes.push(
        <a key={key++} href={`mailto:${email}`} className="legal-link">
          {email}
        </a>,
      )
    } else if (ndpc) {
      nodes.push(
        <a key={key++} href="https://www.ndpc.gov.ng" target="_blank" rel="noopener" className="legal-link">
          {ndpc}
        </a>,
      )
    } else if (sectionTwenty) {
      nodes.push(
        <a key={key++} href="#section-20" className="legal-link">
          {sectionTwenty}
        </a>,
      )
    }

    lastIndex = index + full.length
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }

  return <>{nodes}</>
}
