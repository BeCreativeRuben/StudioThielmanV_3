import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookCallLink from '../components/BookCallLink'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import ServiceHero from '../components/services/ServiceHero'
import CtaBand from '../components/services/CtaBand'
import SectionHeader from '../components/services/SectionHeader'
import ServiceJsonLd from '../components/services/ServiceJsonLd'

/** Tasteful teaser only — no prices or claims. */
export default function AiAgents() {
  const { messages } = useLocale()
  const a = messages.aiAgents

  return (
    <div>
      <ServiceJsonLd
        path="/ai-agents"
        serviceName={a.hero.title}
        serviceDescription={a.hero.subtitle}
        breadcrumbName="AI-agents"
      />

      <ServiceHero
        label={a.hero.label}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        actions={
          <>
            <BookCallLink notes="AI-agents teaser" metadata={{ source: 'ai-agents-hero' }}>
              <Button variant="secondary" size="lg">{a.hero.primaryCta}</Button>
            </BookCallLink>
            <LocalizedLink to="/workshops">
              <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
                {a.hero.secondaryCta}
              </Button>
            </LocalizedLink>
          </>
        }
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label={a.teaser.label} title={a.teaser.title} />
          <div className="space-y-4 mb-10">
            {a.teaser.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-body-lg text-text-primary">
                {para}
              </p>
            ))}
          </div>
          <ul className="space-y-3">
            {a.teaser.bullets.map((b) => (
              <motion.li
                key={b}
                className="flex items-start gap-3 text-body text-text-primary"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="mt-1 text-cta font-bold" aria-hidden>
                  ✓
                </span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-10 text-body-sm text-text-secondary">
            <LocalizedLink to="/workshops" className="underline hover:no-underline">
              /workshops
            </LocalizedLink>
            {' · '}
            <LocalizedLink to="/platformen" className="underline hover:no-underline">
              /platformen
            </LocalizedLink>
          </p>
        </div>
      </section>

      <CtaBand title={a.cta.title} subtitle={a.cta.subtitle}>
        <BookCallLink notes="AI-agents teaser" metadata={{ source: 'ai-agents-cta' }}>
          <Button variant="secondary" size="lg">{a.cta.button}</Button>
        </BookCallLink>
        <LocalizedLink to="/workshops">
          <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-black">
            {a.cta.workshopsLink}
          </Button>
        </LocalizedLink>
      </CtaBand>
    </div>
  )
}
