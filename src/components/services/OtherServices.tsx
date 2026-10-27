import { useLocale } from '../../i18n/LocaleProvider'
import ServiceCard from './ServiceCard'
import SectionHeader from './SectionHeader'

/** "Andere diensten" block: cross-links to the other service pages. */
export default function OtherServices({ current }: { current: string }) {
  const { messages } = useLocale()
  const offer = messages.offerOverview
  const cards = offer.cards.filter((c) => c.href !== current)
  return (
    <section id="andere-diensten" className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={offer.nav.otherLabel} title={offer.nav.otherTitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <ServiceCard key={card.href} href={card.href} tag={card.tag} title={card.title} description={card.description} meta={card.meta} linkLabel={card.linkLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}
