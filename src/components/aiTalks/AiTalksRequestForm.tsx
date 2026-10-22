import { useState } from 'react'
import LocalizedLink from '../../i18n/LocalizedLink'
import { useLocale } from '../../i18n/LocaleProvider'
import { BUSINESS } from '../../seo/site'
import MultiDatePicker, { formatDates } from './MultiDatePicker'

type FieldKey = 'name' | 'email' | 'privacyConsent'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const inputBase =
  'w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 transition-colors'
const inputClass = (hasError?: boolean) =>
  `${inputBase} ${hasError ? 'border-red-400 focus:ring-red-400/30' : 'border-white/15 focus:border-white/60 focus:ring-white/20'}`

/**
 * Request form for talks/workshops. Reuses the site's existing contact pipeline (POST /api/submissions:
 * stored in the admin DB + Resend notification to Studio Thielman). Falls back to a prefilled mailto on error.
 */
export default function AiTalksRequestForm({ initialFormat }: { initialFormat?: string }) {
  const { locale, messages } = useLocale()
  const r = messages.aiTalks.request
  const themes = messages.aiTalks.themes.items

  const [form, setForm] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    audience: r.fields.audienceOptions[0],
    format: initialFormat || r.fields.formatOptions[0],
    theme: r.fields.themeAny,
    groupSize: '',
    date: '',
    dates: [] as string[],
    message: '',
    coaching: false,
    privacyConsent: false,
  })
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const update = (field: keyof typeof form, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: false }))
    if (status === 'error') setStatus('idle')
  }

  const summaryLines = () => [
    `Audience: ${form.audience}`,
    `Format: ${form.format}`,
    `Theme: ${form.theme}`,
    form.groupSize.trim() && `Group size: ${form.groupSize.trim()}`,
    form.dates.length > 0 && `${r.fields.datePicker.summaryLabel}: ${formatDates(form.dates, locale).join(', ')}`,
    form.date.trim() && `${r.fields.datePicker.periodLabel}: ${form.date.trim()}`,
    form.coaching && 'Interested in follow-up coaching',
    `Language page: ${locale === 'nl-BE' ? 'NL' : 'EN'}`,
    form.message.trim() && `Message: ${form.message.trim()}`,
  ].filter(Boolean) as string[]

  const mailtoHref = () => {
    const body = [
      `${r.fields.name}: ${form.name}`,
      `${r.fields.organisation}: ${form.organisation}`,
      `${r.fields.email}: ${form.email}`,
      form.phone && `${r.fields.phone}: ${form.phone}`,
      '',
      ...summaryLines(),
    ].filter((l): l is string => typeof l === 'string').join('\n')
    return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(r.mailSubject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: Partial<Record<FieldKey, boolean>> = {}
    if (!form.name.trim()) next.name = true
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = true
    if (!form.privacyConsent) next.privacyConsent = true
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.querySelector<HTMLElement>(`[data-field="${first}"] input`)?.focus()
      return
    }

    setStatus('submitting')
    const website = new FormData(e.currentTarget).get('website')
    const shortDescription = `AI talk request: ${form.format} · ${form.audience}`.slice(0, 100)
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.organisation.trim() || form.audience,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || '-',
          businessDescription: shortDescription,
          package: 'Other',
          packageOther: `AI talk / workshop. ${summaryLines().join(' · ')}`,
          hasExistingWebsite: 'no',
          existingWebsiteUrl: '',
          source: 'ai-talks',
          website: typeof website === 'string' ? website : '',
          aiTalk: {
            name: form.name.trim(),
            organisation: form.organisation.trim(),
            phone: form.phone.trim(),
            audience: form.audience,
            format: form.format,
            theme: form.theme,
            groupSize: form.groupSize.trim(),
            dates: form.dates,
            period: form.date.trim(),
            message: form.message.trim(),
            coaching: form.coaching,
            language: locale === 'nl-BE' ? 'nl-BE' : 'en',
            pageUrl: window.location.href.split('#')[0],
          },
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('success')
    } catch (err) {
      console.error('AI talk request failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-white" role="status">
        <h3 className="text-2xl font-bold mb-3">{r.success.title}</h3>
        <p className="text-white/75">{r.success.message}</p>
      </div>
    )
  }

  const label = (text: string, optional?: boolean) => (
    <span className="block font-mono text-xs uppercase tracking-[0.15em] text-white/60 mb-2">
      {text} {optional && <span className="normal-case tracking-normal text-white/60">{r.fields.optional}</span>}
    </span>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" data-field="name" htmlFor="aitalk-name">
          {label(r.fields.name)}
          <input id="aitalk-name" name="name" className={inputClass(errors.name)} value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" required aria-invalid={errors.name || undefined} aria-describedby={errors.name ? 'aitalk-name-error' : undefined} />
          {errors.name && <span id="aitalk-name-error" className="mt-1 block text-sm text-red-300">{r.errors.required}</span>}
        </label>
        <label className="block" htmlFor="aitalk-org">
          {label(r.fields.organisation, true)}
          <input id="aitalk-org" name="organization" className={inputClass()} value={form.organisation} placeholder={r.fields.organisationPlaceholder} onChange={(e) => update('organisation', e.target.value)} autoComplete="organization" />
        </label>
        <label className="block" data-field="email" htmlFor="aitalk-email">
          {label(r.fields.email)}
          <input id="aitalk-email" name="email" type="email" className={inputClass(errors.email)} value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" required aria-invalid={errors.email || undefined} aria-describedby={errors.email ? 'aitalk-email-error' : undefined} />
          {errors.email && <span id="aitalk-email-error" className="mt-1 block text-sm text-red-300">{r.errors.email}</span>}
        </label>
        <label className="block" htmlFor="aitalk-phone">
          {label(r.fields.phone, true)}
          <input id="aitalk-phone" name="tel" type="tel" className={inputClass()} value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
        </label>
        <label className="block">
          {label(r.fields.audience)}
          <select id="aitalk-audience" name="audience" className={inputClass()} value={form.audience} onChange={(e) => update('audience', e.target.value)}>
            {r.fields.audienceOptions.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
          </select>
        </label>
        <label className="block">
          {label(r.fields.format)}
          <select id="aitalk-format" name="format" className={inputClass()} value={form.format} onChange={(e) => update('format', e.target.value)}>
            {r.fields.formatOptions.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          {label(r.fields.theme)}
          <select id="aitalk-theme" name="theme" className={inputClass()} value={form.theme} onChange={(e) => update('theme', e.target.value)}>
            <option value={r.fields.themeAny} className="text-black">{r.fields.themeAny}</option>
            {themes.map((th) => {
              const v = `${th.number} · ${th.title}`
              return <option key={th.number} value={v} className="text-black">{v}</option>
            })}
          </select>
        </label>
        <label className="block">
          {label(r.fields.groupSize, true)}
          <input id="aitalk-group" name="group-size" className={inputClass()} value={form.groupSize} inputMode="numeric" onChange={(e) => update('groupSize', e.target.value)} />
        </label>
        <fieldset className="block sm:col-span-2">
          <legend className="p-0">{label(r.fields.date, true)}</legend>
          <p id="ai-talks-dates-intro" className="mb-3 text-sm text-white/70">{r.fields.datePicker.intro}</p>
          <div className="grid gap-5 md:grid-cols-[minmax(0,24rem)_1fr] md:items-start">
            <MultiDatePicker
              value={form.dates}
              onChange={(dates) => update('dates', dates)}
              locale={locale}
              labels={r.fields.datePicker}
              describedBy="ai-talks-dates-intro"
            />
            <label className="block">
              <span className="block font-mono text-xs uppercase tracking-[0.15em] text-white/60 mb-2">{r.fields.datePicker.periodLabel}</span>
              <input className={inputClass()} value={form.date} placeholder={r.fields.datePicker.periodPlaceholder} onChange={(e) => update('date', e.target.value)} />
            </label>
          </div>
        </fieldset>
        <label className="block sm:col-span-2">
          {label(r.fields.message, true)}
          <textarea id="aitalk-message" name="message" className={`${inputClass()} min-h-[120px]`} value={form.message} placeholder={r.fields.messagePlaceholder} maxLength={1500} onChange={(e) => update('message', e.target.value)} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-white/75">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-white" checked={form.coaching} onChange={(e) => update('coaching', e.target.checked)} />
        <span>{r.fields.coaching}</span>
      </label>

      <div data-field="privacyConsent">
        <label className="flex items-start gap-3 text-sm text-white/75">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-white" checked={form.privacyConsent} onChange={(e) => update('privacyConsent', e.target.checked)} />
          <span>
            {r.privacyConsent}{' '}
            <LocalizedLink to="/privacy" className="underline underline-offset-4 hover:text-white">{r.privacyLink}</LocalizedLink>.
          </span>
        </label>
        {errors.privacyConsent && <span className="mt-1 block text-sm text-red-300">{r.errors.privacyConsent}</span>}
      </div>

      {status === 'error' && (
        <p className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200" role="alert">
          {r.errors.submit}{' '}
          <a href={mailtoHref()} className="font-semibold underline underline-offset-4">{BUSINESS.email}</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 disabled:opacity-60 transition-colors"
      >
        {status === 'submitting' ? r.submitting : r.submit}
      </button>
    </form>
  )
}
