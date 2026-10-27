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

export default function Platforms() {
  const { messages } = useLocale()
  const p = messages.platforms

  return (
    <div>
      <ServiceJsonLd
        path="/platformen"
        serviceName={p.hero.title}
        serviceDescription={p.hero.subtitle}
        breadcrumbName="Platformen"
        faqs={p.faqs}
      />

      <ServiceHero
        label={p.hero.label}
        title={p.hero.title}
        subtitle={p.hero.subtitle}
        actions={
          <>
            <BookCallLink notes="Platformen" metadata={{ source: 'platforms-hero' }}>
              <Button variant="secondary" size="lg">{p.hero.primaryCta}</Button>
            </BookCallLink>
            <LocalizedLink to="/portfolio">
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
                {p.hero.secondaryCta}
              </Button>
            </LocalizedLink>
          </>
        }
      />

      <ProofStrip label={p.proof.label} title={p.proof.title} intro={p.proof.intro} names={p.proof.names} />

      <section id="aanpak" className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={p.plans.label} title={p.plans.title} intro={p.plans.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {p.plans.items.map((item, index) => (
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
                  featured={'featured' in item ? Boolean(item.featured) : false}
                  exclVatLabel={p.plans.exclVat}
                  cta={
                    item.href === 'book' ? (
                      <BookCallLink notes="Platformen" metadata={{ source: 'platforms-plan' }}>
                        <Button variant="cta" size="md" className="w-full">
                          {item.cta}
                        </Button>
                      </BookCallLink>
                    ) : (
                      <LocalizedLink to={item.href}>
                        <Button variant="outline" size="md" className="w-full">
                          {item.cta}
                        </Button>
                      </LocalizedLink>
                    )
                  }
                />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-body-sm text-text-secondary mt-10">
            <LocalizedLink to="/websites" className="underline hover:no-underline">
              /websites
            </LocalizedLink>
            {' · '}
            <LocalizedLink to="/portfolio" className="underline hover:no-underline">
              /portfolio
            </LocalizedLink>
          </p>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={p.faqSection.label} title={p.faqSection.title} />
          <FaqAccordion items={p.faqs} />
        </div>
      </section>

      <CtaBand title={p.cta.title} subtitle={p.cta.subtitle}>
        <BookCallLink notes="Platformen" metadata={{ source: 'platforms-cta' }}>
          <Button variant="secondary" size="lg">{p.cta.button}</Button>
        </BookCallLink>
      </CtaBand>
    </div>
  )
}
