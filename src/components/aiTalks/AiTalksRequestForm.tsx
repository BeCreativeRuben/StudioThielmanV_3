import { useState } from 'react'
import LocalizedLink from '../../i18n/LocalizedLink'
import { useLocale } from '../../i18n/LocaleProvider'
import { BUSINESS } from '../../seo/site'

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
    message: '',
    coaching: false,
    privacyConsent: false,
  })
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: false }))
    if (status === 'error') setStatus('idle')
  }

  const summaryLines = () => [
    `Audience: ${form.audience}`,
    `Format: ${form.format}`,
    `Theme: ${form.theme}`,
    form.groupSize.trim() && `Group size: ${form.groupSize.trim()}`,
    form.date.trim() && `Date/period: ${form.date.trim()}`,
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      {text} {optional && <span className="normal-case tracking-normal text-white/40">{r.fields.optional}</span>}
    </span>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" data-field="name">
          {label(r.fields.name)}
          <input className={inputClass(errors.name)} value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" required />
          {errors.name && <span className="mt-1 block text-sm text-red-300">{r.errors.required}</span>}
        </label>
        <label className="block">
          {label(r.fields.organisation, true)}
          <input className={inputClass()} value={form.organisation} placeholder={r.fields.organisationPlaceholder} onChange={(e) => update('organisation', e.target.value)} autoComplete="organization" />
        </label>
        <label className="block" data-field="email">
          {label(r.fields.email)}
          <input type="email" className={inputClass(errors.email)} value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" required />
          {errors.email && <span className="mt-1 block text-sm text-red-300">{r.errors.email}</span>}
        </label>
        <label className="block">
          {label(r.fields.phone, true)}
          <input type="tel" className={inputClass()} value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
        </label>
        <label className="block">
          {label(r.fields.audience)}
          <select className={inputClass()} value={form.audience} onChange={(e) => update('audience', e.target.value)}>
            {r.fields.audienceOptions.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
          </select>
        </label>
        <label className="block">
          {label(r.fields.format)}
          <select className={inputClass()} value={form.format} onChange={(e) => update('format', e.target.value)}>
            {r.fields.formatOptions.map((o) => <option key={o} value={o} className="text-black">{o}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          {label(r.fields.theme)}
          <select className={inputClass()} value={form.theme} onChange={(e) => update('theme', e.target.value)}>
            <option value={r.fields.themeAny} className="text-black">{r.fields.themeAny}</option>
            {themes.map((th) => {
              const v = `${th.number} · ${th.title}`
              return <option key={th.number} value={v} className="text-black">{v}</option>
            })}
          </select>
        </label>
        <label className="block">
          {label(r.fields.groupSize, true)}
          <input className={inputClass()} value={form.groupSize} inputMode="numeric" onChange={(e) => update('groupSize', e.target.value)} />
        </label>
        <label className="block">
          {label(r.fields.date, true)}
          <input className={inputClass()} value={form.date} onChange={(e) => update('date', e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          {label(r.fields.message, true)}
          <textarea className={`${inputClass()} min-h-[120px]`} value={form.message} placeholder={r.fields.messagePlaceholder} maxLength={1500} onChange={(e) => update('message', e.target.value)} />
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
