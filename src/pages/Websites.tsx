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

function packageQuery(name: string) {
  return `/contact?package=${encodeURIComponent(name)}#contact-form`
}

export default function Websites() {
  const { messages } = useLocale()
  const w = messages.websites
  const packages = messages.packages

  const tiers = packages.tiers.map((tier) => ({
    ...tier,
    highlighted: 'highlighted' in tier ? Boolean(tier.highlighted) : false,
    priceTbd: 'priceTbd' in tier ? Boolean(tier.priceTbd) : false,
  }))

  const sn = messages.offerOverview.nav.websites
  const cardTitle = (h: string) => messages.offerOverview.cards.find((c) => c.href === h)?.title ?? ''
  return (
    <div>
      <ServiceJsonLd
        path="/websites"
        serviceName={w.hero.title}
        serviceDescription={w.hero.subtitle}
        breadcrumbName="Websites"
        faqs={w.faqs}
        offers={[
          { name: 'Starter', price: '€25/maand + €150 opstart', priceNumeric: 25, description: 'Starter website plan' },
          { name: 'Growth', price: '€40/maand + €250 opstart', priceNumeric: 40, description: 'Growth website plan' },
        ]}
      />

      <ServiceHero
        label={w.hero.label}
        title={w.hero.title}
        subtitle={w.hero.subtitle}
        actions={
          <>
            <a href="#plannen">
              <Button variant="secondary" size="lg">{w.hero.primaryCta}</Button>
            </a>
            <BookCallLink notes="Websites" metadata={{ source: 'websites-hero' }}>
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
                {w.hero.secondaryCta}
              </Button>
            </BookCallLink>
          </>
        }
      />

      <ServiceSubNav current={cardTitle('/websites')} notes="Websites — subnav" items={[{ id: 'plannen', label: sn.plans }, { id: 'portfolio', label: sn.portfolio }, { id: 'faq', label: sn.faq }, { id: 'gesprek', label: sn.talk }]} />

      <div id="portfolio" className="scroll-mt-36">
      <ProofStrip label={w.proof.label} title={w.proof.title} intro={w.proof.intro} names={w.proof.names} />
      </div>

      <section id="plannen" className="scroll-mt-36 py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={w.plans.label} title={w.plans.title} intro={w.plans.intro} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <PlanCard
                  name={pkg.name}
                  price={pkg.price}
                  priceSub={pkg.startupFee || undefined}
                  description={pkg.description}
                  idealFor={`${packages.perfectFor} ${pkg.idealFor.join(', ')}`}
                  features={pkg.features}
                  badge={pkg.highlighted ? w.plans.mostPopular : undefined}
                  featured={pkg.highlighted}
                  exclVatLabel={w.plans.exclVat}
                  cta={
                    pkg.priceTbd ? (
                      <LocalizedLink to={packageQuery('Pro Max')}>
                        <Button variant="outline" size="md" className="w-full">
                          {w.plans.contactPro}
                        </Button>
                      </LocalizedLink>
                    ) : (
                      <LocalizedLink to={packageQuery(pkg.name)}>
                        <Button variant={pkg.highlighted ? 'cta' : 'outline'} size="md" className="w-full">
                          {w.plans.choose.replace('{{name}}', pkg.name)}
                        </Button>
                      </LocalizedLink>
                    )
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-36 py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={w.faqSection.label} title={w.faqSection.title} intro={w.faqSection.subtitle} />
          <FaqAccordion items={w.faqs} />
        </div>
      </section>

      <OtherServices current="/websites" />

      <div id="gesprek" className="scroll-mt-36" />
      <CtaBand title={w.cta.title} subtitle={w.cta.subtitle}>
        <BookCallLink notes="Websites" metadata={{ source: 'websites-cta' }}>
          <Button variant="secondary" size="lg">{w.cta.button}</Button>
        </BookCallLink>
      </CtaBand>
    </div>
  )
}
