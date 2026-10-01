import type { LegalDocument } from '../../config/legal'
import { LegalBackButton } from './LegalBackButton'
import { LegalContents } from './LegalContents'
import { LegalDocSwitcher } from './LegalDocSwitcher'
import { LegalDocumentView } from './LegalDocumentView'

export function LegalLayout({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="legal-hero">
        <div className="wrap">
          <LegalBackButton />
          <span className="label" data-reveal>
            Buzz9ja
          </span>
          <h1 data-reveal style={{ ['--d' as string]: '80ms' }}>
            {document.pageTitle}
          </h1>
          <p className="legal-meta">{document.metaLine}</p>
          <LegalDocSwitcher currentRoute={document.route} />
        </div>
      </section>

      <section className="legal-body">
        <div className="wrap legal-body-grid">
          <LegalContents document={document} />
          <LegalDocumentView document={document} />
        </div>
      </section>
    </>
  )
}
