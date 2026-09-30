export type MapPin = {
  label: string
  src: string
  left: number
  top: number
  width: number
}

export type SiteConfig = {
  siteUrl: string
  appStoreUrl: string
  playStoreUrl: string
  smartDownloadUrl: string
  vendorPortalUrl: string
  supportEmail: string
  legalEmail: string
  privacyEmail: string
  companyAddress: string
  instagramUrl: string
  xUrl: string
  mapPins: MapPin[]
}

export const routes = {
  terms: '/terms',
  privacy: '/privacy',
  refundPolicy: '/refund-policy',
} as const

export const siteConfig: SiteConfig = {
  siteUrl: 'https://buzz9ja.netlify.app',
  appStoreUrl: '',
  playStoreUrl: '',
  smartDownloadUrl: 'https://buzz9ja.netlify.app',
  vendorPortalUrl: 'https://admin.buzz9ja.com',
  supportEmail: 'support@buzz-9ja.com',
  legalEmail: 'legal@buzz-9ja.com',
  privacyEmail: 'privacy@buzz-9ja.com',
  companyAddress: '25 Titiloye Street Isolo Lagos, Nigeria',
  instagramUrl: '',
  xUrl: '',
  mapPins: [
    { label: 'Eko Hotel', src: '/assets/hero/pins/pin-eko-hotel.webp', left: 42.27, top: 26.83, width: 15.8 },
    { label: 'Muritala', src: '/assets/hero/pins/pin-muritala.webp', left: 15.23, top: 12.17, width: 13.86 },
    { label: 'WhiteHouse', src: '/assets/hero/pins/pin-whitehouse.webp', left: 14.09, top: 30.17, width: 20.57 },
    { label: 'Ikeja', src: '/assets/hero/pins/pin-ikeja.webp', left: 36.82, top: 15.0, width: 10.45 },
    { label: 'Shopping', src: '/assets/hero/pins/pin-shopping.webp', left: 58.98, top: 14.33, width: 16.02 },
    { label: 'Bola Ahmed', src: '/assets/hero/pins/pin-bola-ahmed.webp', left: 65.0, top: 32.17, width: 19.77 },
    { label: 'Wizkid', src: '/assets/hero/pins/pin-wizkid.webp', left: 31.93, top: 46.17, width: 11.93 },
    { label: 'Otedola', src: '/assets/hero/pins/pin-otedola.webp', left: 71.7, top: 50.17, width: 13.64 },
    { label: 'Asake', src: '/assets/hero/pins/pin-asake.webp', left: 60.8, top: 63.5, width: 10.91 },
    { label: 'Ajoke', src: '/assets/hero/pins/pin-ajoke.webp', left: 31.82, top: 67.5, width: 10.45 },
    { label: 'Oleku', src: '/assets/hero/pins/pin-oleku.webp', left: 64.55, top: 83.67, width: 10.45 },
  ],
}

export const DOWNLOAD_ANCHOR = '#download'

export function externalOrDownload(url: string): string {
  return url.trim().length > 0 ? url : DOWNLOAD_ANCHOR
}

export function isExternal(url: string): boolean {
  return url.trim().length > 0
}
