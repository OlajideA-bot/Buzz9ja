import type { ReactNode } from 'react'
import { GrainOverlay } from '../ui/GrainOverlay'
import { IconSprite } from '../ui/IconSprite'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <IconSprite />
      <GrainOverlay />
      <Header />
      <main id="top">{children}</main>
      <Footer />
    </>
  )
}
