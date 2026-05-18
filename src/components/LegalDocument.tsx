import type { LegalBlock, LegalSection } from '../types/legal'

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p
          className="text-body leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      )
    case 'ps':
      return (
        <>
          {block.texts.map((text, i) => (
            <p key={i} className={`text-body leading-relaxed ${i < block.texts.length - 1 ? 'mb-4' : ''}`}>
              {text}
            </p>
          ))}
        </>
      )
    case 'ul':
      return (
        <ul className="list-disc list-inside space-y-2 text-body ml-4">
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
    case 'box':
      return (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          {block.rows.map((row, i) => (
            <p key={i} className={`text-body leading-relaxed ${i < block.rows.length - 1 ? 'mb-2' : ''}`}>
              {row.label ? (
                <>
                  <strong>{row.label}</strong>
                  {row.value ? ` ${row.value}` : null}
                </>
              ) : (
                row.value
              )}
            </p>
          ))}
        </div>
      )
    case 'pWithLink':
      return (
        <p className="text-body leading-relaxed mt-4">
          {block.before}
          <a href={block.href} target="_blank" rel="noopener noreferrer" className="text-cta hover:underline">
            {block.linkText}
          </a>
          {block.after ?? ''}
        </p>
      )
    default:
      return null
  }
}

export default function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-8 text-text-primary">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-3xl font-bold text-primary mb-4">{section.title}</h2>
          <div className="space-y-4">
            {section.blocks.map((block, blockIndex) => (
              <Block key={blockIndex} block={block} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
