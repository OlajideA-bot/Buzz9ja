import type { LegalDocument } from '../../config/legal'
import { Icon } from '../ui/Icon'
import { LegalBlocks } from './LegalBlocks'

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <div className="legal-article">
      {document.nodes.map((node, index) => {
        if (node.kind === 'intro') {
          return (
            <div key={index} className="legal-intro legal-part">
              <h2>{node.title}</h2>
              <LegalBlocks blocks={node.blocks} />
            </div>
          )
        }

        if (node.kind === 'part') {
          return (
            <div key={index} className="legal-part">
              <h2>{node.title}</h2>
              <LegalBlocks blocks={node.blocks} />
            </div>
          )
        }

        return (
          <div key={index} id={node.id} className="legal-section">
            <span className="legal-num">{node.number}</span>
            <h3>{node.title}</h3>
            <LegalBlocks blocks={node.blocks} />
            {node.subsections.map((sub) => (
              <div key={sub.id} id={sub.id} className="legal-subsection">
                <h4>
                  <span className="legal-num">{sub.number}</span>
                  {sub.title}
                </h4>
                <LegalBlocks blocks={sub.blocks} />
              </div>
            ))}
          </div>
        )
      })}

      {document.footerLines.length > 0 ? (
        <div className="legal-footer-lines">
          {document.footerLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <a href="#top" className="legal-back-to-top">
            <Icon name="arrow-up" />
            Back to top
          </a>
        </div>
      ) : null}
    </div>
  )
}
