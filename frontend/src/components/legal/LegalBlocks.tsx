import type { LegalBlock } from '../../config/legal'
import { RichText } from './RichText'

export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === 'p') {
          return (
            <p key={index} className="legal-p">
              <RichText text={block.text} />
            </p>
          )
        }

        if (block.kind === 'list') {
          return (
            <ul key={index} className="legal-list">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <span>
                    {item.label ? (
                      <>
                        <span className="legal-item-label">{item.label}:</span>{' '}
                      </>
                    ) : null}
                    <RichText text={item.text} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <dl key={index} className="legal-defs">
            {block.items.map((item, itemIndex) => (
              <div key={itemIndex} className="legal-def-row">
                <dt className="legal-term">{item.term}</dt>
                <dd className="legal-def-text">
                  <RichText text={item.text} />
                </dd>
              </div>
            ))}
          </dl>
        )
      })}
    </>
  )
}
