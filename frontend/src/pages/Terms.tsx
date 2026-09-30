import { LegalLayout } from '../components/legal/LegalLayout'
import { termsDocument } from '../config/legal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

export function Terms() {
  useDocumentMeta('Buzz 9ja: Terms and Conditions', 'Terms and Conditions for the Buzz9ja app, effective September 2026.')
  useReveal()

  return <LegalLayout document={termsDocument} />
}
