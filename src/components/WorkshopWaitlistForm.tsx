import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'

type FieldKey = 'name' | 'email' | 'privacyConsent'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 ${
    hasError
      ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-cta focus:ring-cta/20'
  }`

/** Group-class waitlist form — same field styling as the contact form. Posts to /api/waitlist (Resend). */
export default function WorkshopWaitlistForm() {
  const { locale, messages } = useLocale()
  const w = messages.workshops.hub.waitlist
  const startedAt = useRef(Date.now())

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    language: '',
    privacyConsent: false,
    website: '', // honeypot
  })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field in fieldErrors) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field as FieldKey]
        return next
      })
    }
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Partial<Record<FieldKey, boolean>> = {}
    if (!form.name.trim()) errors.name = true
    if (!EMAIL_REGEX.test(form.email.trim())) errors.email = true
    if (!form.privacyConsent) errors.privacyConsent = true
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0]
      const el = document.querySelector<HTMLElement>(`[data-waitlist-field="${first}"] input`)
      el?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          language: form.language,
          consent: form.privacyConsent,
          website: form.website,
          startedAt: startedAt.current,
          locale,
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.success) throw new Error(data?.error || `HTTP ${response.status}`)
      setStatus('success')
    } catch (error) {
      console.error('Waitlist signup error:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        role="status"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-4">{w.success.title}</h3>
        <p className="text-body-lg text-text-primary">{w.success.message}</p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl relative z-10">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Honeypot: hidden from humans */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </label>
        </div>

        <div data-waitlist-field="name">
          <label htmlFor="waitlist-name" className={`block text-sm font-semibold mb-2 ${fieldErrors.name ? 'text-red-600' : 'text-text-primary'}`}>
            {w.fields.name}
          </label>
          <input
            id="waitlist-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass(Boolean(fieldErrors.name))}
          />
          {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{w.errors.required}</p>}
        </div>

        <div data-waitlist-field="email">
          <label htmlFor="waitlist-email" className={`block text-sm font-semibold mb-2 ${fieldErrors.email ? 'text-red-600' : 'text-text-primary'}`}>
            {w.fields.email}
          </label>
          <input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass(Boolean(fieldErrors.email))}
          />
          {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{w.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="waitlist-company" className="block text-sm font-semibold text-text-primary mb-2">
            {w.fields.company} <span className="text-text-secondary font-normal">{w.fields.optional}</span>
          </label>
          <input
            id="waitlist-company"
            type="text"
            autoComplete="organization"
            maxLength={150}
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClass(false)}
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-text-primary mb-3">
            {w.fields.language} <span className="text-text-secondary font-normal">{w.fields.optional}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: 'nl', label: w.fields.languageNl },
              { value: 'en', label: w.fields.languageEn },
              { value: '', label: w.fields.languageAny },
            ].map((option) => (
              <label
                key={option.value || 'any'}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-cta hover:bg-cta/5 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="waitlist-language"
                  value={option.value}
                  checked={form.language === option.value}
                  onChange={(e) => update('language', e.target.value)}
                  className="mr-3 w-4 h-4 text-cta focus:ring-cta"
                />
                <span className="text-body text-text-primary font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div data-waitlist-field="privacyConsent">
          <label
            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer ${
              fieldErrors.privacyConsent ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={form.privacyConsent}
              onChange={(e) => update('privacyConsent', e.target.checked)}
              className="mt-1 w-4 h-4 text-cta focus:ring-cta"
            />
            <span className="text-body-sm text-text-primary">
              {w.privacyConsent}{' '}
              <LocalizedLink to="/privacy" className="underline font-semibold hover:no-underline">
                {w.privacyLink}
              </LocalizedLink>
              .
            </span>
          </label>
          {fieldErrors.privacyConsent && <p className="mt-2 text-sm text-red-600">{w.errors.privacyConsent}</p>}
        </div>

        {status === 'error' && (
          <p className="p-4 border-2 border-red-500 bg-red-50 rounded-lg text-sm text-red-700" role="alert">
            {w.errors.submit}
          </p>
        )}

        <div className="pt-2">
          <Button type="submit" variant="cta" className="w-full" disabled={status === 'submitting'}>
            {status === 'submitting' ? w.submitting : w.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}
