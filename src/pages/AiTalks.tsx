import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import AiTalksHeader from '../components/aiTalks/AiTalksHeader'
import AiTalksFooter from '../components/aiTalks/AiTalksFooter'
import AiTalksRequestForm from '../components/aiTalks/AiTalksRequestForm'
import { scrollToSection } from '../components/aiTalks/scroll'
import BookCallLink from '../components/BookCallLink'
import CookieConsentBanner from '../components/CookieConsentBanner'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'

const IMG_BASE = '/images/ai-talks'
export const HERO_IMG = {
  src: `${IMG_BASE}/ruben-thielman-ai-spreker-podium-960.webp`,
  srcSet: [640, 960, 1600].map((w) => `${IMG_BASE}/ruben-thielman-ai-spreker-podium-${w}.webp ${w}w`).join(', '),
  sizes: '(min-width: 1024px) 45vw, 100vw',
}
const WORKSHOP_IMG = {
  src: `${IMG_BASE}/ruben-thielman-ai-workshop-groep-960.webp`,
  srcSet: [640, 960, 1600].map((w) => `${IMG_BASE}/ruben-thielman-ai-workshop-groep-${w}.webp ${w}w`).join(', '),
}

const PACKAGE_FORMAT_INDEX: Record<string, number> = { keynote: 0, workshop: 1, fullday: 2, school: 3 }
const PRICE_NUMBERS: Record<string, number> = { keynote: 450, workshop: 500, fullday: 900, school: 250 }

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 mb-4 flex items-center gap-3">
      <span className="inline-block h-px w-8 bg-white/30" />
      {children}
    </div>
  )
}

/** /ai-talks — dedicated landing in its own shell (own header/footer, dark "frontier" look in Studio Thielman's black/white palette). */
export default function AiTalks() {
  const { locale, messages, localizedPath } = useLocale()
  const a = messages.aiTalks
  // Cookie banner is client-only so the prerendered HTML never ships a banner that then disappears.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [formatChoice, setFormatChoice] = useState<{ value?: string; nonce: number }>({ nonce: 0 })

  const choosePackage = (key: string) => {
    const idx = PACKAGE_FORMAT_INDEX[key]
    setFormatChoice((prev) => ({ value: a.request.fields.formatOptions[idx], nonce: prev.nonce + 1 }))
    setTimeout(() => scrollToSection('request'), 0)
  }

  const pageUrl = `${SITE_URL}${localizedPath('/ai-talks')}`
  const inLanguage = locale === 'nl-BE' ? 'nl-BE' : 'en'

  const orgId = `${SITE_URL}/#organization`
  const personId = `${SITE_URL}/#ruben-thielman`
  const serviceId = `${pageUrl}#service`
  const heroImageUrl = `${SITE_URL}/images/ai-talks/ruben-thielman-ai-spreker-podium-1600.webp`
  const workshopImageUrl = `${SITE_URL}/images/ai-talks/ruben-thielman-ai-workshop-groep-1600.webp`

  const graphLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: a.seo.pageTitle,
        description: a.seo.serviceDescription,
        inLanguage,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME },
        about: { '@id': serviceId },
        primaryImageOfPage: { '@type': 'ImageObject', url: heroImageUrl, width: 1600, height: 1063, caption: a.hero.imageAlt },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: a.seo.breadcrumbHome, item: `${SITE_URL}${localizedPath('/')}` },
          { '@type': 'ListItem', position: 2, name: a.seo.breadcrumbPage, item: pageUrl },
        ],
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Ruben Thielman',
        jobTitle: a.seo.personJobTitle,
        description: a.seo.personDescription,
        image: [heroImageUrl, workshopImageUrl],
        url: pageUrl,
        worksFor: { '@id': orgId },
        knowsLanguage: ['nl', 'en'],
        knowsAbout: a.seo.knowsAbout,
        address: { '@type': 'PostalAddress', addressLocality: BUSINESS.address.locality, addressCountry: 'BE' },
        sameAs: [BUSINESS.linkedIn],
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        taxID: BUSINESS.enterpriseNumber,
        vatID: BUSINESS.vatNumber,
        founder: { '@id': personId },
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.address.street,
          postalCode: BUSINESS.address.postalCode,
          addressLocality: BUSINESS.address.locality,
          addressRegion: 'Oost-Vlaanderen',
          addressCountry: 'BE',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Vlaanderen' },
          { '@type': 'Country', name: 'België' },
          { '@type': 'Country', name: 'Nederland' },
        ],
        priceRange: '€€',
        sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.linkedIn],
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: a.seo.serviceName,
        serviceType: a.seo.serviceType,
        description: a.seo.serviceDescription,
        url: pageUrl,
        image: heroImageUrl,
        provider: { '@id': orgId },
        brand: { '@id': orgId },
        availableLanguage: ['nl', 'en'],
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Vlaanderen' },
          { '@type': 'Country', name: 'België' },
          { '@type': 'Country', name: 'Nederland' },
        ],
        audience: a.audiences.items.map((i) => ({ '@type': 'Audience', audienceType: i.title })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: a.packages.title,
          itemListElement: a.packages.items.map((p) => ({
            '@type': 'Offer',
            name: p.name,
            description: `${p.duration}. ${p.description}`,
            url: `${pageUrl}#formats`,
            availability: 'https://schema.org/InStock',
            seller: { '@id': orgId },
            priceCurrency: 'EUR',
            price: PRICE_NUMBERS[p.key],
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: PRICE_NUMBERS[p.key],
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
            },
            itemOffered: { '@type': 'Service', name: p.name, provider: { '@id': orgId } },
          })),
        },
      },
      ...a.themes.items.map((th) => ({
        '@type': 'Course',
        '@id': `${pageUrl}#theme-${th.number}`,
        name: th.title,
        description: `${th.hook} ${th.takeaways.join('. ')}.`,
        url: `${pageUrl}#themes`,
        inLanguage: ['nl', 'en'],
        audience: { '@type': 'Audience', audienceType: th.audience },
        teaches: th.takeaways,
        provider: { '@id': orgId },
        instructor: { '@id': personId },
        offers: {
          '@type': 'Offer',
          category: 'Paid',
          priceCurrency: 'EUR',
          price: 450,
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 250, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
          url: `${pageUrl}#request`,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          courseWorkload: 'PT3H30M',
          instructor: { '@id': personId },
          location: { '@type': 'Place', name: a.seo.courseLocation, address: { '@type': 'PostalAddress', addressRegion: 'Vlaanderen', addressCountry: 'BE' } },
        },
      })),
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: a.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Helmet>
        <link rel="preload" as="image" type="image/webp" href={HERO_IMG.src} imageSrcSet={HERO_IMG.srcSet} imageSizes={HERO_IMG.sizes} {...({ fetchpriority: 'high' } as Record<string, string>)} />
        <script type="application/ld+json">{JSON.stringify(graphLd)}</script>
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 mb-6">{a.hero.label}</div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight mb-5">{a.hero.title}</h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90 mb-5">{a.hero.lead}</p>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mb-10">{a.hero.subtitle}</p>
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
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/60">
                {a.hero.meta.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 relative">
              <img
                src={HERO_IMG.src}
                srcSet={HERO_IMG.srcSet}
                sizes={HERO_IMG.sizes}
                width={1600}
                height={1063}
                alt={a.hero.imageAlt}
                {...({ fetchpriority: 'high' } as Record<string, string>)}
                decoding="async"
                className="w-full rounded-xl border border-white/10 object-cover aspect-[3/2]"
              />
              <div className="hidden md:block relative z-10 -mt-12 -ml-6 w-[78%] rounded-xl border border-white/15 bg-black/85 backdrop-blur shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="ml-2 font-mono text-[11px] text-white/60">{a.hero.terminal.title}</span>
                </div>
                <div className="px-4 py-3 font-mono text-[12px] leading-6">
                  {a.hero.terminal.lines.map((l, i) => (
                    <div key={i} className="whitespace-pre text-white/80">
                      <span className="text-white/60 mr-2">{l.prompt}</span>
                      {l.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  <div className="font-mono text-xs text-white/60 mb-6">0{i + 1}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6 flex-grow">{item.description}</p>
                  <div className="font-mono text-xs text-white/80 mb-1">{item.recommended}</div>
                  <div className="font-mono text-xs text-white/60">{item.formats}</div>
                  {item.key === 'enthusiasts' && (
                    <LocalizedLink to="/workshops#waitlist" className="mt-5 text-sm font-semibold underline underline-offset-4 hover:text-white/80">
                      {a.audiences.enthusiastsNote} →
                    </LocalizedLink>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 font-mono text-xs text-white/60">{a.audiences.developersNote}</p>
          </div>
        </section>

        {/* Themes */}
        <section id="themes" className="scroll-mt-20 bg-white text-black py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-black/60 mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-black/30" />
              {a.themes.label}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.themes.title}</h2>
            <p className="text-lg text-black/60 max-w-2xl mb-14">{a.themes.subtitle}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {a.themes.items.map((th) => (
                <article key={th.number} className="group rounded-xl border border-black/10 bg-gray-50 p-7 md:p-8 flex flex-col hover:border-black/40 transition-colors">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-mono text-sm text-black/60">{th.number}</span>
                    <h3 className="text-xl md:text-2xl font-bold leading-snug">{th.title}</h3>
                  </div>
                  <p className="text-black/75 leading-relaxed mb-6">{th.hook}</p>
                  <div className="text-sm mb-5">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-black/60 mr-2">{a.themes.audienceLabel}</span>
                    <span className="text-black/75">{th.audience}</span>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-black/60 mb-3">{a.themes.takeawaysLabel}</div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {th.takeaways.map((t) => (
                      <li key={t} className="flex gap-3 text-[15px] text-black/80">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-black/10 pt-4 font-mono text-xs text-black/60">
                    <span className="uppercase tracking-[0.15em] text-black/60 mr-2">{a.themes.formatLabel}</span>
                    {th.format}
                  </div>
                </article>
              ))}
              <div className="rounded-xl bg-black text-white p-7 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-sm text-white/60">+</span>
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
                  <div className={`font-mono text-xs mb-6 ${p.highlight ? 'text-black/60' : 'text-white/60'}`}>{p.duration}</div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className={`text-sm ${p.highlight ? 'text-black/60' : 'text-white/60'}`}>{a.packages.fromLabel}</span>
                    <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                  </div>
                  <div className={`text-xs mb-6 ${p.highlight ? 'text-black/60' : 'text-white/60'}`}>
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
            <p className="mt-6 text-xs text-white/60">{a.packages.note}</p>
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
                  <div className="font-mono text-xs text-white/60 mb-4">{locale === 'nl-BE' ? 'STAP' : 'STEP'} {String(i + 1).padStart(2, '0')}</div>
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
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-black/60 mb-4 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-black/30" />
                {a.about.label}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{a.about.title}</h2>
              <p className="text-xl md:text-2xl font-semibold text-black/85 mb-8">{a.about.lead}</p>
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
              <a href={BUSINESS.linkedIn} target="_blank" rel="noopener noreferrer me" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
                {a.about.linkedInLabel} ↗
              </a>
            </div>
            <div className="order-2 lg:order-1 lg:col-span-5">
              <figure>
                <img
                  src={WORKSHOP_IMG.src}
                  srcSet={WORKSHOP_IMG.srcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={1600}
                  height={1200}
                  alt={a.about.photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl object-cover aspect-[4/3]"
                />
                <figcaption className="mt-3 text-sm text-black/60">{a.about.photoCaption}</figcaption>
              </figure>
              <ul className="mt-6 space-y-2">
                {a.about.facts.map((f) => (
                  <li key={f} className="flex gap-3 font-mono text-xs text-black/70">
                    <span className="text-black/35">—</span>
                    {f}
                  </li>
                ))}
              </ul>
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
                    <span className="font-mono text-white/60 transition-transform group-open:rotate-45">+</span>
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
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/60 mb-1">{a.request.side.emailLabel}</div>
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
      {mounted && <CookieConsentBanner />}
    </div>
  )
}
