import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import rubenImage from '../images/WhatsApp Image 2026-01-11 at 13.25.54.jpeg'

function sanitizeMailchimpText(input: string): string {
  return (input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeMailchimpPhone(input: string): string {
  return (input || '').replace(/\D+/g, '').trim()
}

const PACKAGE_OPTIONS = [
  { value: 'Starter', labelKey: 'starter' as const },
  { value: 'Growth', labelKey: 'growth' as const },
  { value: 'Pro Max', labelKey: 'promax' as const },
  { value: 'Other', labelKey: 'other' as const },
]

export default function Contact() {
  const { messages } = useLocale()
  const c = messages.contact
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    businessDescription: '',
    package: '',
    packageOther: '',
    hasExistingWebsite: '',
    existingWebsiteUrl: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, boolean> = {}
    let isValid = true
    let firstInvalidField: string | null = null

    if (formData.businessName.trim() === '') {
      errors.businessName = true
      if (!firstInvalidField) firstInvalidField = 'businessName'
      isValid = false
    }

    if (formData.name.trim() === '') {
      errors.name = true
      if (!firstInvalidField) firstInvalidField = 'name'
      isValid = false
    }

    if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
      errors.email = true
      if (!firstInvalidField) firstInvalidField = 'email'
      isValid = false
    }

    if (formData.phone.trim() === '') {
      errors.phone = true
      if (!firstInvalidField) firstInvalidField = 'phone'
      isValid = false
    }

    if (formData.businessDescription.trim() === '') {
      errors.businessDescription = true
      if (!firstInvalidField) firstInvalidField = 'businessDescription'
      isValid = false
    } else if (formData.businessDescription.length > 100) {
      errors.businessDescription = true
      if (!firstInvalidField) firstInvalidField = 'businessDescription'
      isValid = false
    }

    if (formData.package === '') {
      errors.package = true
      if (!firstInvalidField) firstInvalidField = 'package'
      isValid = false
    } else if (formData.package === 'Other' && formData.packageOther.trim() === '') {
      errors.packageOther = true
      if (!firstInvalidField) firstInvalidField = 'packageOther'
      isValid = false
    }

    setFieldErrors(errors)

    if (!isValid && firstInvalidField) {
      setTimeout(() => {
        const fieldElement = document.querySelector(`[data-field="${firstInvalidField}"]`)
        if (fieldElement) {
          const headerHeight = 80
          const elementPosition = fieldElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight - 20

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })

          setTimeout(() => {
            const input = fieldElement.querySelector('input, textarea, select') as HTMLElement
            if (input) {
              input.focus()
            }
          }, 500)
        }
      }, 200)
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        businessName: sanitizeMailchimpText(formData.businessName),
        name: sanitizeMailchimpText(formData.name),
        phone: sanitizeMailchimpPhone(formData.phone),
        businessDescription: sanitizeMailchimpText(formData.businessDescription),
        package: sanitizeMailchimpText(formData.package),
        packageOther: formData.packageOther ? sanitizeMailchimpText(formData.packageOther) : '',
        hasExistingWebsite: formData.hasExistingWebsite ? sanitizeMailchimpText(formData.hasExistingWebsite) : '',
        existingWebsiteUrl: (formData.existingWebsiteUrl || '').trim(),
      }

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to submit form'
        try {
          const data = await response.json()
          errorMessage = data?.message || data?.error || errorMessage
        } catch {
          // ignore
        }
        throw new Error(errorMessage)
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      setTimeout(() => {
        setSubmitted(true)
      }, 300)
    } catch (error: unknown) {
      console.error('Submission error:', error)
      setTimeout(() => {
        const getInTouchSection = document.getElementById('get-in-touch')
        if (getInTouchSection) {
          const headerHeight = 80
          const elementPosition = getInTouchSection.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight - 20

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })

          getInTouchSection.classList.add('ring-4', 'ring-red-500', 'ring-opacity-50')
          setTimeout(() => {
            getInTouchSection.classList.remove('ring-4', 'ring-red-500', 'ring-opacity-50')
          }, 3000)
        }
      }, 100)

      alert(c.form.submitError)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4">
        <motion.div
          className="max-w-2xl mx-auto w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">{c.success.title}</h2>
            <p className="text-body-lg text-text-primary mb-6">{c.success.message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedLink to="/">
                <Button variant="outline">{c.success.home}</Button>
              </LocalizedLink>
              <LocalizedLink to="/packages">
                <Button variant="cta">{c.success.packages}</Button>
              </LocalizedLink>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }} />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">{c.hero.label}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{c.hero.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{c.hero.subtitle}</p>
        </motion.div>
      </section>

      <section id="get-in-touch" className="py-20 bg-gray-50 scroll-mt-20 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center md:justify-start">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cta shadow-lg">
                <img src={rubenImage} alt="Ruben Thielman" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{c.info.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-lg text-text-primary font-medium">{c.info.address}</p>
                      <p className="text-body text-text-primary">Pereboomsteenweg 49</p>
                      <p className="text-body text-text-primary">Moerbeke 9180</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-lg text-text-primary font-medium">{c.info.email}</p>
                      <a href="mailto:ruben.thielman@gmail.com" className="text-body text-cta hover:text-cta/80 transition-colors">
                        ruben.thielman@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-lg text-text-primary font-medium">{c.info.phone}</p>
                      <a href="tel:+32493505641" className="text-body text-cta hover:text-cta/80 transition-colors">
                        +32 493 50 56 41
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact-form" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} noValidate>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div data-field="businessName">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.businessName ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.businessName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 ${
                      fieldErrors.businessName
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                    }`}
                  />
                  {fieldErrors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{c.form.errors.required}</p>
                  )}
                </div>

                <div data-field="name">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.name ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 ${
                      fieldErrors.name
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                    }`}
                  />
                  {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{c.form.errors.required}</p>}
                </div>

                <div data-field="email">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.email ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 ${
                      fieldErrors.email
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                    }`}
                  />
                  {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{c.form.errors.email}</p>}
                </div>

                <div data-field="phone">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.phone ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 ${
                      fieldErrors.phone
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                    }`}
                  />
                  {fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{c.form.errors.required}</p>}
                </div>

                <div data-field="businessDescription">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.businessDescription ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.businessDescription}{' '}
                    <span className="text-text-secondary font-normal">{c.form.businessDescriptionHint}</span>
                  </label>
                  <textarea
                    required
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    maxLength={100}
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 resize-none ${
                      fieldErrors.businessDescription
                        ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {fieldErrors.businessDescription && (
                      <p className="text-sm text-red-600">{c.form.errors.required}</p>
                    )}
                    <p className={`text-sm ml-auto ${formData.businessDescription.length > 100 ? 'text-red-600' : 'text-text-secondary'}`}>
                      {formData.businessDescription.length}/100
                    </p>
                  </div>
                </div>

                <div data-field="package">
                  <label className={`block text-sm font-semibold mb-3 ${fieldErrors.package ? 'text-red-600' : 'text-text-primary'}`}>
                    {c.form.package}
                  </label>
                  <div className="space-y-3">
                    {PACKAGE_OPTIONS.map((pkg) => (
                      <label
                        key={pkg.value}
                        className={`flex items-center p-4 border-2 rounded-lg hover:border-cta hover:bg-cta/5 transition-all cursor-pointer ${
                          fieldErrors.package ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package"
                          value={pkg.value}
                          checked={formData.package === pkg.value}
                          onChange={(e) => handleInputChange('package', e.target.value)}
                          className="mr-3 w-4 h-4 text-cta focus:ring-cta"
                          required
                        />
                        <span className="text-body text-text-primary font-medium">{c.form.packages[pkg.labelKey]}</span>
                      </label>
                    ))}
                  </div>
                  {formData.package === 'Other' && (
                    <div data-field="packageOther" className="mt-4">
                      <input
                        type="text"
                        value={formData.packageOther}
                        onChange={(e) => handleInputChange('packageOther', e.target.value)}
                        placeholder={c.form.packageOtherPlaceholder}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 mt-2 ${
                          fieldErrors.packageOther
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                        }`}
                      />
                      {fieldErrors.packageOther && (
                        <p className="mt-1 text-sm text-red-600">{c.form.errors.packageOther}</p>
                      )}
                    </div>
                  )}
                  {fieldErrors.package && formData.package !== 'Other' && (
                    <p className="mt-2 text-sm text-red-600">{c.form.errors.package}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">{c.form.existingWebsite}</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-cta hover:bg-cta/5 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="hasExistingWebsite"
                        value="yes"
                        checked={formData.hasExistingWebsite === 'yes'}
                        onChange={(e) => handleInputChange('hasExistingWebsite', e.target.value)}
                        className="mr-3 w-4 h-4 text-cta focus:ring-cta"
                      />
                      <span className="text-body text-text-primary font-medium">{c.form.yes}</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-cta hover:bg-cta/5 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="hasExistingWebsite"
                        value="no"
                        checked={formData.hasExistingWebsite === 'no'}
                        onChange={(e) => handleInputChange('hasExistingWebsite', e.target.value)}
                        className="mr-3 w-4 h-4 text-cta focus:ring-cta"
                      />
                      <span className="text-body text-text-primary font-medium">{c.form.no}</span>
                    </label>
                  </div>
                  {formData.hasExistingWebsite === 'yes' && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        {c.form.websiteUrl} <span className="text-text-secondary font-normal">{c.form.optional}</span>
                      </label>
                      <input
                        type="url"
                        value={formData.existingWebsiteUrl}
                        onChange={(e) => handleInputChange('existingWebsiteUrl', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-cta focus:ring-cta/20 transition-all bg-gray-50"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? c.form.submitting : c.form.submit}
                  </Button>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
