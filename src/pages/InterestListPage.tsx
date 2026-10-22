import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import AiTalksFooter from '../components/aiTalks/AiTalksFooter'
import CookieConsentBanner from '../components/CookieConsentBanner'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { BUSINESS, SITE_NAME, SITE_URL } from '../seo/site'
import type { Messages } from '../i18n/messages'
import type { InterestListContent } from '../locales/content/interestList.types'

const logoImage = '/images/ai-talks/st-mark-light.png'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type InterestListKind = 'group-workshop' | 'masterclass'

interface KindConfig {
  path: string
  source: string
  businessName: string
  description: string
  listLabel: string
  rolePrefix: string
  content: (m: Messages) => InterestListContent
}

export const INTEREST_LISTS: Record<InterestListKind, KindConfig> = {
  'group-workshop': {
    path: '/group-workshop',
    source: 'group-workshop-waitlist',
    businessName: 'Groepsworkshop interesselijst',
    description: 'Interesselijst AI-groepsworkshop',
    listLabel: 'Interesselijst groepsworkshop',
    rolePrefix: 'Ik ben',
    content: (m) => m.groupWorkshop,
  },
  masterclass: {
    path: '/ai-masterclass',
    source: 'masterclass-waitlist',
    businessName: 'Masterclass AI interesselijst',
    description: 'Interesselijst masterclass AI',
    listLabel: 'Interesselijst masterclass AI',
    rolePrefix: 'Ik gebruik AI',
    content: (m) => m.masterclass,
  },
}

const inputClass = (hasError?: boolean) =>
  `w-full rounded-lg border bg-white/5 px-4 py-3 sm:py-3.5 text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-colors ${
    hasError ? 'border-red-400 focus:ring-red-400/30' : 'border-white/20 focus:border-white/60 focus:ring-white/20'
  }`

function WaitlistForm({ kind }: { kind: InterestListKind }) {
  const { locale, messages } = useLocale()
  const cfg = INTEREST_LISTS[kind]
  const g = cfg.content(messages)
  const f = g.form
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [role, setRole] = useState('')
  const [hp, setHp] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError(true)
      document.getElementById('gw-email')?.focus()
      return
    }
    setStatus('submitting')
    const roleLabel = f.roleOptions.find((o) => o.value === role && o.value)?.label || ''
    const lang = locale === 'nl-BE' ? 'NL' : 'EN'
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: cfg.businessName,
          name: firstName.trim() || '-',
          email: trimmed,
          phone: '-',
          businessDescription: cfg.description,
          package: cfg.source,
          packageOther: [cfg.listLabel, roleLabel && `${cfg.rolePrefix}: ${roleLabel}`, `Taal: ${lang}`].filter(Boolean).join(' · '),
          hasExistingWebsite: 'no',
          existingWebsiteUrl: '',
          source: cfg.source,
          website: hp,
          waitlist: {
            firstName: firstName.trim(),
            role,
            roleLabel,
            language: locale === 'nl-BE' ? 'nl-BE' : 'en',
            pageUrl: window.location.href.split(/[?#]/)[0],
          },
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch (err) {
      console.error('Waitlist signup failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 sm:p-7" role="status">
        <div className="font-mono text-xs text-white/60 mb-3">$ ok</div>
        <h2 className="text-2xl font-bold mb-3">{f.successTitle}</h2>
        <p className="text-white/80 leading-relaxed">{f.successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="p-4 sm:p-7 space-y-3.5 sm:space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold leading-tight">{f.title}</h2>
      <label className="block">
        <span className="block font-mono text-xs uppercase tracking-[0.15em] text-white/70 mb-2">{f.email}</span>
        <input
          id="gw-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={emailError || undefined}
          aria-describedby={emailError ? 'gw-email-error' : undefined}
          className={inputClass(emailError)}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (emailError) setEmailError(false)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="naam@voorbeeld.be"
        />
        {emailError && <span id="gw-email-error" className="mt-1 block text-sm text-red-300">{f.errorEmail}</span>}
      </label>
      <div className="grid gap-3 sm:gap-4 grid-cols-2">
        <label className="block">
          <span className="block font-mono text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
            {f.firstName} <span className="normal-case tracking-normal">{f.optional}</span>
          </span>
          <input id="gw-first-name" name="given-name" type="text" autoComplete="given-name" className={inputClass()} value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={80} />
        </label>
        <label className="block">
          <span className="block font-mono text-xs uppercase tracking-[0.15em] text-white/70 mb-2">
            {f.role} <span className="normal-case tracking-normal">{f.optional}</span>
          </span>
          <select id="gw-role" name="role" className={inputClass()} value={role} onChange={(e) => setRole(e.target.value)}>
            {f.roleOptions.map((o) => (
              <option key={o.value || 'none'} value={o.value} className="text-black">{o.label}</option>
            ))}
          </select>
        </label>
      </div>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>
      {status === 'error' && (
        <p className="rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200" role="alert">
          {f.errorSubmit} <a href={`mailto:${BUSINESS.email}`} className="font-semibold underline underline-offset-4">{BUSINESS.email}</a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-3.5 sm:py-4 text-base font-semibold hover:bg-white/90 disabled:opacity-60 transition-colors"
      >
        {status === 'submitting' ? f.submitting : `${f.submit} →`}
      </button>
      <p className="text-xs text-white/60">
        {f.privacy}{' '}
        <LocalizedLink to="/privacy" className="underline underline-offset-4 hover:text-white">{f.privacyLink}</LocalizedLink>.
      </p>
    </form>
  )
}

/** Standalone interest-list page in the AI talks shell (group workshop, AI masterclass). */
export default function InterestListPage({ kind }: { kind: InterestListKind }) {
  const { locale, messages, localizedPath, t } = useLocale()
  const cfg = INTEREST_LISTS[kind]
  const g = cfg.content(messages)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const pageUrl = `${SITE_URL}${localizedPath(cfg.path)}`
  const graphLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: g.hero.title,
        description: g.hero.pitch,
        inLanguage: locale === 'nl-BE' ? 'nl-BE' : 'en',
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        about: { '@id': `${SITE_URL}/#ruben-thielman` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}${localizedPath('/')}` },
          { '@type': 'ListItem', position: 2, name: messages.aiTalks.shell.brandTag, item: `${SITE_URL}${localizedPath('/ai-talks')}` },
          { '@type': 'ListItem', position: 3, name: g.hero.title, item: pageUrl },
        ],
      },
    ],
  }

  const scrollToForm = () => {
    const el = document.getElementById('signup')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => document.getElementById('gw-email')?.focus({ preventScroll: true }), 400)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(graphLd)}</script>
      </Helmet>

      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-3">
          <LocalizedLink to="/ai-talks" className="flex items-center gap-2.5 text-white min-w-0">
            <img src={logoImage} alt={t('common.a11y.logoAlt')} className="h-8 md:h-9 w-auto" width={36} height={36} />
            <span className="flex flex-col leading-none">
              <span className="font-bold tracking-tight text-sm">STUDIO THIELMAN</span>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-white/60 mt-1">{g.shell.brandTag}</span>
            </span>
          </LocalizedLink>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="text-white" />
            <button
              type="button"
              onClick={scrollToForm}
              className="hidden sm:inline-flex items-center rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {g.shell.navCta}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden pt-5 sm:pt-12 lg:pt-20 pb-14 lg:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at 30% 20%, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 30% 20%, black 20%, transparent 75%)',
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:gap-8 lg:gap-x-14 lg:grid-cols-12 lg:items-start">
            {/* Intro */}
            <div className="lg:col-span-6 lg:row-start-1">
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/60 mb-3 sm:mb-4">{g.hero.eyebrow}</div>
              <h1 className="text-[1.9rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight mb-3 sm:mb-4">{g.hero.title}</h1>
              {g.hero.nextLevel && (
                <p className="mb-3 sm:mb-4 border-l-2 border-white pl-3 sm:pl-4 text-base sm:text-xl font-semibold text-white leading-snug">
                  {g.hero.nextLevel}
                </p>
              )}
              <p className="text-[15px] sm:text-lg text-white/75 leading-relaxed">{g.hero.pitch}</p>
              {g.backLink && (
                <p className="mt-3 text-sm text-white/55">
                  {g.backLink.text}{' '}
                  <LocalizedLink to={g.backLink.to} className="underline underline-offset-4 hover:text-white">
                    {g.backLink.cta}
                  </LocalizedLink>
                </p>
              )}
            </div>

            {/* Form card */}
            <div id="signup" className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 scroll-mt-20">
              <div className="rounded-2xl border border-white/15 bg-[#0b0b0b] shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
                  <span className="ml-2 font-mono text-[11px] text-white/60">$ join --interest-list</span>
                </div>
                <div className="mx-4 sm:mx-7 mt-4 sm:mt-7 rounded-xl border border-white/25 bg-white/[0.06] p-3.5 sm:p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70 mb-2">{g.promise.title}</p>
                  <p className="text-[15px] sm:text-base text-white leading-relaxed">{g.promise.text}</p>
                  <p className="mt-3 flex items-start gap-2 text-[15px] sm:text-base font-semibold text-white">
                    <svg className="mt-1 h-4 w-4 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                    </svg>
                    <span>{g.promise.noSpam}</span>
                  </p>
                </div>
                <WaitlistForm kind={kind} />
              </div>
            </div>

            {/* What you do + who */}
            <div className="lg:col-span-6 lg:row-start-2 space-y-8">
              <div>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/60 mb-3">{g.learn.label}</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{g.learn.title}</h2>
                <ul className="space-y-3">
                  {g.learn.items.map((item) => (
                    <li key={item} className="flex gap-3 text-white/85 leading-relaxed">
                      <span className="font-mono text-white/60 select-none" aria-hidden="true">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/60 mb-2">{g.audience.label}</div>
                <p className="text-white/85 leading-relaxed">{g.audience.text}</p>
              </div>
              <div>
                <p className="border-t border-white/10 pt-6 text-white/75">
                  {g.talksLink.text}{' '}
                  <LocalizedLink to="/ai-talks" className="font-semibold text-white underline underline-offset-4 hover:no-underline">
                    {g.talksLink.cta} →
                  </LocalizedLink>
                </p>
                {g.nextStepLink && (
                  <p className="mt-3 text-white/75">
                    {g.nextStepLink.before}
                    <LocalizedLink to={g.nextStepLink.to} className="font-semibold text-white underline underline-offset-4 hover:no-underline">
                      {g.nextStepLink.cta}
                    </LocalizedLink>
                    {g.nextStepLink.after}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AiTalksFooter hideWorkshops />
      {mounted && <CookieConsentBanner />}
    </div>
  )
}
