import { LegalLayout } from '../components/legal/LegalLayout'
import { privacyDocument } from '../config/legal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

export function Privacy() {
  useDocumentMeta('Buzz 9ja: Privacy Policy', 'Privacy Policy for the Buzz9ja app, effective September 2026.')
  useReveal()

  return <LegalLayout document={privacyDocument} />
}
