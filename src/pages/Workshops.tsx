import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookCallLink from '../components/BookCallLink'
import FaqAccordion from '../components/FaqAccordion'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import ServiceHero from '../components/services/ServiceHero'
import ProofStrip from '../components/services/ProofStrip'
import PlanCard from '../components/services/PlanCard'
import CtaBand from '../components/services/CtaBand'
import SectionHeader from '../components/services/SectionHeader'
import ServiceJsonLd from '../components/services/ServiceJsonLd'
import ServiceSubNav from '../components/services/ServiceSubNav'
import OtherServices from '../components/services/OtherServices'

export default function Workshops() {
  const { messages } = useLocale()
  const w = messages.workshopsPage

  const sn = messages.offerOverview.nav.workshops
  const cardTitle = (h: string) => messages.offerOverview.cards.find((c) => c.href === h)?.title ?? ''
  return (
    <div>
      <ServiceJsonLd
        path="/workshops"
        serviceName={w.hero.title}
        serviceDescription={w.hero.subtitle}
        breadcrumbName="Workshops"
        faqs={w.faqs}
        offers={[
          { name: 'Hands-on AI-workshop', price: '€500', priceNumeric: 500, description: 'Incompany tot 8 personen' },
          { name: '1:1 AI-traject', price: '€1000', priceNumeric: 1000, description: 'Twee dagen' },
          { name: 'Keynote', price: '€450', priceNumeric: 450 },
        ]}
      />

      <ServiceHero
        label={w.hero.label}
        title={w.hero.title}
        subtitle={w.hero.subtitle}
        actions={
          <>
            <a href="#formats">
              <Button variant="secondary" size="lg">{w.hero.primaryCta}</Button>
            </a>
            <BookCallLink notes="Workshops" metadata={{ source: 'workshops-hero' }}>
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
                {w.hero.secondaryCta}
              </Button>
            </BookCallLink>
          </>
        }
      />

      <ServiceSubNav current={cardTitle('/workshops')} notes="Workshops — subnav" items={[{ id: 'formats', label: sn.formats }, { id: 'reviews', label: sn.reviews }, { id: 'faq', label: sn.faq }, { id: 'gesprek', label: sn.talk }]} />

      <div id="reviews" className="scroll-mt-36">
      <ProofStrip
        label={w.proof.label}
        title={w.proof.title}
        intro={w.proof.intro}
        quote={w.proof.quote}
      />
      </div>

      <section id="formats" className="scroll-mt-36 py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={w.formats.label} title={w.formats.title} intro={w.formats.intro} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {w.formats.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <PlanCard
                  name={item.name}
                  price={item.price}
                  priceSub={item.priceSub}
                  description={item.description}
                  features={item.features}
                  badge={'badge' in item ? item.badge : undefined}
                  featured={'featured' in item ? Boolean(item.featured) : false}
                  exclVatLabel={w.formats.exclVat}
                  cta={
                    <LocalizedLink to={item.href}>
                      <Button variant={'featured' in item && item.featured ? 'cta' : 'outline'} size="md" className="w-full">
                        {item.cta}
                      </Button>
                    </LocalizedLink>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-36 py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={w.faqSection.label} title={w.faqSection.title} />
          <FaqAccordion items={w.faqs} />
        </div>
      </section>

      <OtherServices current="/workshops" />

      <div id="gesprek" className="scroll-mt-36" />
      <CtaBand title={w.cta.title} subtitle={w.cta.subtitle}>
        <BookCallLink notes="Workshops" metadata={{ source: 'workshops-cta' }}>
          <Button variant="secondary" size="lg">{w.cta.button}</Button>
        </BookCallLink>
        <LocalizedLink to="/ai-talks">
          <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
            {w.cta.detailLink}
          </Button>
        </LocalizedLink>
      </CtaBand>
    </div>
  )
}
