import { LegalLayout } from '../components/legal/LegalLayout'
import { refundDocument } from '../config/legal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

export function RefundPolicy() {
  useDocumentMeta(
    'Buzz 9ja: Refund, Payout and Enhanced Data Protection Policy',
    'Refund, payout and enhanced data protection policy for the Buzz9ja app, effective September 2026.',
  )
  useReveal()

  return <LegalLayout document={refundDocument} />
}
