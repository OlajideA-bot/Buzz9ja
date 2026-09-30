import { useEffect, useState } from 'react'
import { externalOrDownload, isExternal, siteConfig } from '../../config/site'
import { Icon } from './Icon'

type Platform = 'ios' | 'android' | 'other'

type StoreKey = 'ios' | 'android'

const specs: Record<StoreKey, { url: string; small: string; strong: string; icon: string }> = {
  ios: { url: siteConfig.appStoreUrl, small: 'Download on the', strong: 'App Store', icon: 'apple' },
  android: { url: siteConfig.playStoreUrl, small: 'Get it on', strong: 'Google Play', icon: 'play' },
}

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/android/.test(ua)) return 'android'
  return 'other'
}

type Tone = 'default' | 'on-dark'

type Props = {
  className?: string
  reveal?: boolean
  delay?: number
  tone?: Tone
}

export function StoreButtons({ className = '', reveal, delay, tone = 'default' }: Props) {
  const [platform, setPlatform] = useState<Platform>('other')

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  const order: StoreKey[] = platform === 'android' ? ['android', 'ios'] : ['ios', 'android']

  const revealProps = reveal
    ? { 'data-reveal': '', style: delay ? { ['--d' as string]: `${delay}ms` } : undefined }
    : {}

  return (
    <div className={`stores ${className}`} {...revealProps}>
      {order.map((key) => {
        const spec = specs[key]
        const external = isExternal(spec.url)
        return (
          <a
            key={key}
            href={externalOrDownload(spec.url)}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            className={`store${tone === 'default' ? ' store-hero' : ''}`}
          >
            <Icon name={spec.icon} className="ic-fill" />
            <span>
              <small>{spec.small}</small>
              <strong>{spec.strong}</strong>
            </span>
          </a>
        )
      })}
    </div>
  )
}
