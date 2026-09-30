import { QRCodeSVG } from 'qrcode.react'
import { useCssVariable } from '../../hooks/useCssVariable'
import { siteConfig } from '../../config/site'

type Props = {
  size: number
}

export function QrCode({ size }: Props) {
  const dark = useCssVariable('--deep', '#0a2517')
  const light = useCssVariable('--ivory', '#f5f1e8')

  return (
    <QRCodeSVG
      value={siteConfig.smartDownloadUrl}
      size={size}
      fgColor={dark}
      bgColor={light}
      level="M"
    />
  )
}
