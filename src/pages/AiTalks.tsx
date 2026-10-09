import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import AiTalksHeader from '../components/aiTalks/AiTalksHeader'
import AiTalksFooter from '../components/aiTalks/AiTalksFooter'
import AiTalksRequestForm from '../components/aiTalks/AiTalksRequestForm'
import { scrollToSection } from '../components/aiTalks/scroll'
import BookCallLink from '../components/BookCallLink'
import CookieConsentBanner from '../components/CookieConsentBanner'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'

const PACKAGE_FORMAT_INDEX: Record<string, number> = { keynote: 0, workshop: 1, fullday: 2, school: 3 }
const PRICE_NUMBERS: Record<string, number> = { keynote: 450, workshop: 500, fullday: 900, school: 250 }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-3">
      <span className="inline-block h-px w-8 bg-white/30" />
      {children}
    </div>
  )
}

/** /ai-talks — dedicated landing in its own shell (own header/footer, dark "frontier" look in Studio Thielman's black/white palette). */
export default function AiTalks() {
  const { locale, messages, localizedPath } = useLocale()
  const a = messages.aiTalks
  const [formatChoice, setFormatChoice] = useState<{ value?: string; nonce: number }>({ nonce: 0 })

  const choosePackage = (key: string) => {
    const idx = PACKAGE_FORMAT_INDEX[key]
    setFormatChoice((prev) => ({ value: a.request.fields.formatOptions[idx], nonce: prev.nonce + 1 }))
    setTimeout(() => scrollToSection('request'), 0)
  }

  const pageUrl = `${SITE_URL}${localizedPath('/ai-talks')}`
  const inLanguage = locale === 'nl-BE' ? 'nl-BE' : 'en'

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: a.seo.serviceName,
    serviceType: 'AI training, lectures and workshops',
    description: a.seo.serviceDescription,
    url: pageUrl,
    inLanguage,
    availableLanguage: ['nl', 'en'],
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Netherlands' },
    ],
    audience: a.audiences.items.map((i) => ({ '@type': 'Audience', audienceType: i.title })),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: BUSINESS.email,
      telephone: BUSINESS.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        postalCode: BUSINESS.address.postalCode,
        addressLocality: BUSINESS.address.locality,
        addressCountry: 'BE',
      },
      founder: { '@type': 'Person', name: 'Ruben Thielman', sameAs: [BUSINESS.linkedIn] },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: a.packages.title,
      itemListElement: a.packages.items.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        description: `${p.duration}. ${p.description}`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: PRICE_NUMBERS[p.key],
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: false,
        },
      })),
    },
  }

  const courseListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: a.themes.title,
    itemListElement: a.themes.items.map((th, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: th.title,
        description: th.hook,
        inLanguage: ['nl', 'en'],
        provider: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL },
      },
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: a.seo.breadcrumbHome, item: `${SITE_URL}${localizedPath('/')}` },
      { '@type': 'ListItem', position: 2, name: a.seo.breadcrumbPage, item: pageUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(courseListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <AiTalksHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at 30% 30%, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%, black 20%, transparent 75%)',
            }}
          />
          <div aria-hidden className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 mb-6">{a.hero.label}</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">{a.hero.title}</h1>
              <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10">{a.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('request')}
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-7 py-4 font-semibold hover:bg-white/90 transition-colors"
                >
                  {a.hero.primaryCta} →
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('themes')}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-4 font-semibold text-white hover:border-white transition-colors"
                >
                  {a.hero.secondaryCta}
                </button>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/55">
                {a.hero.meta.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-xl border border-white/15 bg-white/[0.04] shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-3 font-mono text-xs text-white/45">{a.hero.terminal.title}</span>
                </div>
                <div className="p-5 font-mono text-[12.5px] sm:text-sm leading-7 overflow-x-auto">
                  {a.hero.terminal.lines.map((l, i) => (
                    <div key={i} className="whitespace-pre text-white/80">
                      <span className="text-white/40 mr-2">{l.prompt}</span>
                      {l.text}
                    </div>
                  ))}
                  <div className="text-white/80">
                    <span className="text-white/40 mr-2">$</span>
                    <span className="inline-block h-4 w-2 translate-y-0.5 bg-white/80 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Audiences */}
        <section id="audiences" className="scroll-mt-20 border-t border-white/10 py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel>{a.audiences.label}</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.audiences.title}</h2>
            <p className="text-lg text-white/65 max-w-2xl mb-12">{a.audiences.subtitle}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {a.audiences.items.map((item, i) => (
                <div key={item.key} className="rounded-xl border border-white/15 bg-white/[0.03] p-7 flex flex-col">
                  <div className="font-mono text-xs text-white/40 mb-6">0{i + 1}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6 flex-grow">{item.description}</p>
                  <div className="font-mono text-xs text-white/80 mb-1">{item.recommended}</div>
                  <div className="font-mono text-xs text-white/45">{item.formats}</div>
                  {item.key === 'enthusiasts' && (
                    <LocalizedLink to="/workshops#waitlist" className="mt-5 text-sm font-semibold underline underline-offset-4 hover:text-white/80">
                      {a.audiences.enthusiastsNote} →
                    </LocalizedLink>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 font-mono text-xs text-white/50">{a.audiences.developersNote}</p>
          </div>
        </section>

        {/* Themes */}
        <section id="themes" className="scroll-mt-20 bg-white text-black py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-black/50 mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-black/30" />
              {a.themes.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.themes.title}</h2>
            <p className="text-lg text-black/60 max-w-2xl mb-14">{a.themes.subtitle}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {a.themes.items.map((th) => (
                <article key={th.number} className="group rounded-xl border border-black/10 bg-gray-50 p-7 md:p-8 flex flex-col hover:border-black/40 transition-colors">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-mono text-sm text-black/40">{th.number}</span>
                    <h3 className="text-xl md:text-2xl font-bold leading-snug">{th.title}</h3>
                  </div>
                  <p className="text-black/75 leading-relaxed mb-6">{th.hook}</p>
                  <div className="text-sm mb-5">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-black/45 mr-2">{a.themes.audienceLabel}</span>
                    <span className="text-black/75">{th.audience}</span>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-black/45 mb-3">{a.themes.takeawaysLabel}</div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {th.takeaways.map((t) => (
                      <li key={t} className="flex gap-3 text-[15px] text-black/80">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-black/10 pt-4 font-mono text-xs text-black/60">
                    <span className="uppercase tracking-[0.15em] text-black/40 mr-2">{a.themes.formatLabel}</span>
                    {th.format}
                  </div>
                </article>
              ))}
              <div className="rounded-xl bg-black text-white p-7 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-sm text-white/40">+</span>
                  <h3 className="text-xl md:text-2xl font-bold leading-snug mt-3 mb-3">{a.themes.custom.title}</h3>
                  <p className="text-white/70 leading-relaxed">{a.themes.custom.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('request')}
                  className="mt-8 self-start inline-flex items-center rounded-lg bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  {a.themes.custom.cta} →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="formats" className="scroll-mt-20 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel>{a.packages.label}</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.packages.title}</h2>
            <p className="text-lg text-white/65 max-w-2xl mb-12">{a.packages.subtitle}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {a.packages.items.map((p) => (
                <div
                  key={p.key}
                  className={`rounded-xl p-7 flex flex-col border ${
                    p.highlight ? 'bg-white text-black border-white' : 'bg-white/[0.03] border-white/15'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                  <div className={`font-mono text-xs mb-6 ${p.highlight ? 'text-black/55' : 'text-white/50'}`}>{p.duration}</div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className={`text-sm ${p.highlight ? 'text-black/60' : 'text-white/60'}`}>{a.packages.fromLabel}</span>
                    <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  </div>
                  <div className={`text-xs mb-6 ${p.highlight ? 'text-black/55' : 'text-white/50'}`}>
                    {a.packages.vatLabel}
                    {p.priceSuffix ? ` · ${p.priceSuffix}` : ''}
                  </div>
                  <p className={`text-[15px] leading-relaxed mb-5 ${p.highlight ? 'text-black/75' : 'text-white/70'}`}>{p.description}</p>
                  <ul className="space-y-2 mb-8 flex-grow">
                    {p.includes.map((inc) => (
                      <li key={inc} className={`flex gap-2 text-sm ${p.highlight ? 'text-black/80' : 'text-white/75'}`}>
                        <span aria-hidden>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => choosePackage(p.key)}
                    className={`w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      p.highlight ? 'bg-black text-white hover:bg-black/85' : 'border border-white/30 text-white hover:border-white'
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {a.packages.extras.map((x) => (
                <div key={x.name} className="rounded-xl border border-dashed border-white/20 p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <h3 className="font-bold mb-1">{x.name}</h3>
                    <p className="text-sm text-white/65">{x.text}</p>
                  </div>
                  {x.to.startsWith('#') ? (
                    <button type="button" onClick={() => scrollToSection(x.to.slice(1))} className="text-sm font-semibold underline underline-offset-4 whitespace-nowrap">
                      {x.linkLabel} →
                    </button>
                  ) : (
                    <LocalizedLink to={x.to} className="text-sm font-semibold underline underline-offset-4 whitespace-nowrap">
                      {x.linkLabel} →
                    </LocalizedLink>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/45">{a.packages.note}</p>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="scroll-mt-20 border-t border-white/10 py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel>{a.process.label}</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">{a.process.title}</h2>
            <ol className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
              {a.process.steps.map((step, i) => (
                <li key={step.title} className="bg-black p-6">
                  <div className="font-mono text-xs text-white/40 mb-4">{locale === 'nl-BE' ? 'STAP' : 'STEP'} {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 bg-white text-black py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 items-start">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <img
                src="/images/ai-talks/ruben-desk.webp"
                alt={a.about.photoAlt}
                width={1764}
                height={1176}
                decoding="async"
                className="w-full rounded-xl object-cover aspect-[4/3] grayscale-[20%]"
              />
              <ul className="mt-6 space-y-2">
                {a.about.facts.map((f) => (
                  <li key={f} className="flex gap-3 font-mono text-xs text-black/70">
                    <span className="text-black/35">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-black/50 mb-4 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-black/30" />
                {a.about.label}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">{a.about.title}</h2>
              <div className="space-y-5 text-lg text-black/75 leading-relaxed mb-10">
                {a.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <figure className="rounded-xl border border-black/10 bg-gray-50 p-6 md:p-7">
                <blockquote className="text-lg italic text-black/80 mb-4">“{a.about.quote}”</blockquote>
                <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="font-semibold">{a.about.quoteAttribution}</span>
                  <a href={a.about.quoteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-black/60 hover:text-black">
                    {a.about.quoteLinkLabel} ↗
                  </a>
                </figcaption>
              </figure>
              <a href={BUSINESS.linkedIn} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
                {a.about.linkedInLabel} ↗
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel>{a.faq.label}</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">{a.faq.title}</h2>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {a.faq.items.map((f) => (
                <details key={f.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                    {f.question}
                    <span className="font-mono text-white/50 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-white/70 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Request */}
        <section id="request" className="scroll-mt-20 border-t border-white/10 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel>{a.request.label}</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.request.title}</h2>
              <p className="text-lg text-white/65 mb-10">{a.request.subtitle}</p>
              <AiTalksRequestForm key={formatChoice.nonce} initialFormat={formatChoice.value} />
            </div>
            <aside className="lg:col-span-5 lg:pt-28">
              <div className="rounded-xl border border-white/15 bg-white/[0.03] p-7">
                <h3 className="text-xl font-bold mb-2">{a.request.side.title}</h3>
                <p className="text-white/65 mb-6">{a.request.side.text}</p>
                <BookCallLink
                  notes={a.request.side.bookingNote}
                  metadata={{ source: 'ai-talks' }}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition-colors"
                >
                  {a.request.side.book} →
                </BookCallLink>
                <div className="mt-6 border-t border-white/10 pt-5 text-sm">
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/45 mb-1">{a.request.side.emailLabel}</div>
                  <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(a.request.mailSubject)}`} className="text-white underline underline-offset-4">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <AiTalksFooter />
      <CookieConsentBanner />
    </div>
  )
}
