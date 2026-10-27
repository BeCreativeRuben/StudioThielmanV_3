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

export default function StartUps() {
  const { messages } = useLocale()
  const s = messages.startUps

  const sn = messages.offerOverview.nav.startUps
  const cardTitle = (h: string) => messages.offerOverview.cards.find((c) => c.href === h)?.title ?? ''
  return (
    <div>
      <ServiceJsonLd
        path="/start-ups"
        serviceName={s.hero.title}
        serviceDescription={s.hero.subtitle}
        breadcrumbName="Start-ups"
        faqs={s.faqs}
        offers={[
          { name: 'Starter', price: '€25/maand + €150', priceNumeric: 25 },
          { name: 'Growth', price: '€40/maand + €250', priceNumeric: 40 },
        ]}
      />

      <ServiceHero
        label={s.hero.label}
        title={s.hero.title}
        subtitle={s.hero.subtitle}
        actions={
          <>
            <a href="#aanpak">
              <Button variant="secondary" size="lg">{s.hero.primaryCta}</Button>
            </a>
            <BookCallLink notes="Start-ups" metadata={{ source: 'startups-hero' }}>
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
                {s.hero.secondaryCta}
              </Button>
            </BookCallLink>
          </>
        }
      />

      <ServiceSubNav current={cardTitle('/start-ups')} notes="StartUps — subnav" items={[{ id: 'aanpak', label: sn.approach }, { id: 'bewijs', label: sn.proof }, { id: 'faq', label: sn.faq }, { id: 'gesprek', label: sn.talk }]} />

      <div id="bewijs" className="scroll-mt-36">
      <ProofStrip label={s.proof.label} title={s.proof.title} intro={s.proof.intro} names={s.proof.names} />
      </div>

      <section id="aanpak" className="scroll-mt-36 py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={s.plans.label} title={s.plans.title} intro={s.plans.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {s.plans.items.map((item, index) => (
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
                  exclVatLabel={s.plans.exclVat}
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
          <SectionHeader label={s.faqSection.label} title={s.faqSection.title} />
          <FaqAccordion items={s.faqs} />
        </div>
      </section>

      <OtherServices current="/start-ups" />

      <div id="gesprek" className="scroll-mt-36" />
      <CtaBand title={s.cta.title} subtitle={s.cta.subtitle}>
        <BookCallLink notes="Start-ups" metadata={{ source: 'startups-cta' }}>
          <Button variant="secondary" size="lg">{s.cta.button}</Button>
        </BookCallLink>
      </CtaBand>
    </div>
  )
}
