export type FaqItem = { question: string; answer: string }

type Props = {
  items: readonly FaqItem[]
}

/** Accordion FAQ list. Answers stay in the HTML so they match FAQPage JSON-LD. */
export default function FaqAccordion({ items }: Props) {
  return (
    <div className="space-y-4">
      {items.map((faq) => (
        <details
          key={faq.question}
          className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <summary className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer list-none">
            <h3 className="text-lg font-semibold text-primary pr-4">{faq.question}</h3>
            <svg
              className="w-5 h-5 text-cta flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-5 pt-0">
            <p className="text-body-sm text-text-primary leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
