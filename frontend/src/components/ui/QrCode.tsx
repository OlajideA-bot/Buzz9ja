import { QRCodeSVG } from 'qrcode.react'
import { useCssVariable } from '../../hooks/useCssVariable'
import { siteConfig } from '../../config/site'

type Props = {
  size: number
  fgVar?: string
  fgFallback?: string
  bgVar?: string
  bgFallback?: string
}

export function QrCode({
  size,
  fgVar = '--deep',
  fgFallback = '#0a2517',
  bgVar = '--ivory',
  bgFallback = '#f5f1e8',
}: Props) {
  const fg = useCssVariable(fgVar, fgFallback)
  const bg = useCssVariable(bgVar, bgFallback)

  return (
    <QRCodeSVG
      value={siteConfig.smartDownloadUrl}
      size={size}
      fgColor={fg}
      bgColor={bg}
      level="M"
    />
  )
}
