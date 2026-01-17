import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { getApiUrl } from '../utils/api'

export default function Contact() {
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
    existingWebsiteUrl: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const errors: Record<string, boolean> = {}
    let isValid = true
    let firstInvalidField: string | null = null

    // Business name
    if (formData.businessName.trim() === '') {
      errors.businessName = true
      if (!firstInvalidField) firstInvalidField = 'businessName'
      isValid = false
    }

    // Name
    if (formData.name.trim() === '') {
      errors.name = true
      if (!firstInvalidField) firstInvalidField = 'name'
      isValid = false
    }

    // Email
    if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
      errors.email = true
      if (!firstInvalidField) firstInvalidField = 'email'
      isValid = false
    }

    // Phone
    if (formData.phone.trim() === '') {
      errors.phone = true
      if (!firstInvalidField) firstInvalidField = 'phone'
      isValid = false
    }

    // Business description (max 100 characters)
    if (formData.businessDescription.trim() === '') {
      errors.businessDescription = true
      if (!firstInvalidField) firstInvalidField = 'businessDescription'
      isValid = false
    } else if (formData.businessDescription.length > 100) {
      errors.businessDescription = true
      if (!firstInvalidField) firstInvalidField = 'businessDescription'
      isValid = false
    }

    // Package
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
            behavior: 'smooth'
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

    // Handle form submission
    setIsSubmitting(true)
    
    try {
      const API_URL = getApiUrl()
      const response = await fetch(`${API_URL}/api/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // Read as text first, then try to parse as JSON
        let errorMessage = 'Failed to submit form'
        try {
          const errorText = await response.text()
          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorMessage
          } catch {
            // Not JSON, use text as-is
            errorMessage = errorText || errorMessage
          }
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('Form submitted successfully:', result)
      setSubmitted(true)
    } catch (error: any) {
      console.error('Submission error:', error)
      const errorMessage = error.message || 'Failed to submit form. Please try again.'
      alert(`Failed to submit form: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <motion.div
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4">Success!</h2>
            <p className="text-body-lg text-text-primary mb-6">
              We've received your information. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/packages">
                <Button variant="cta">View Packages</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section - Dark Background */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">GET IN TOUCH</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Get Started</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Tell us about your project and we'll get back to you within 24 hours.</p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section id="contact-form" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Business Name */}
                <div data-field="businessName">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.businessName ? 'text-red-600' : 'text-text-primary'}`}>
                    Business Name *
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
                    <p className="mt-1 text-sm text-red-600">This field is required</p>
                  )}
                </div>

                {/* Name */}
                <div data-field="name">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.name ? 'text-red-600' : 'text-text-primary'}`}>
                    Your Name *
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
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-600">This field is required</p>
                  )}
                </div>

                {/* Email */}
                <div data-field="email">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.email ? 'text-red-600' : 'text-text-primary'}`}>
                    Email *
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
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
                  )}
                </div>

                {/* Phone */}
                <div data-field="phone">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.phone ? 'text-red-600' : 'text-text-primary'}`}>
                    Telephone *
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
                  {fieldErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">This field is required</p>
                  )}
                </div>

                {/* Business Description */}
                <div data-field="businessDescription">
                  <label className={`block text-sm font-semibold mb-2 ${fieldErrors.businessDescription ? 'text-red-600' : 'text-text-primary'}`}>
                    Simple Business Description * <span className="text-text-secondary font-normal">(max 100 characters)</span>
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
                      <p className="text-sm text-red-600">This field is required</p>
                    )}
                    <p className={`text-sm ml-auto ${formData.businessDescription.length > 100 ? 'text-red-600' : 'text-text-secondary'}`}>
                      {formData.businessDescription.length}/100
                    </p>
                  </div>
                </div>

                {/* Package */}
                <div data-field="package">
                  <label className={`block text-sm font-semibold mb-3 ${fieldErrors.package ? 'text-red-600' : 'text-text-primary'}`}>
                    Interested Package *
                  </label>
                  <div className="space-y-3">
                    {['Starter', 'Growth', 'Pro Max', 'Other'].map((pkg) => (
                      <label 
                        key={pkg} 
                        className={`flex items-center p-4 border-2 rounded-lg hover:border-cta hover:bg-cta/5 transition-all cursor-pointer ${
                          fieldErrors.package 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package"
                          value={pkg}
                          checked={formData.package === pkg}
                          onChange={(e) => handleInputChange('package', e.target.value)}
                          className="mr-3 w-4 h-4 text-cta focus:ring-cta"
                          required
                        />
                        <span className="text-body text-text-primary font-medium">{pkg}</span>
                      </label>
                    ))}
                  </div>
                  {formData.package === 'Other' && (
                    <div data-field="packageOther" className="mt-4">
                      <input
                        type="text"
                        value={formData.packageOther}
                        onChange={(e) => handleInputChange('packageOther', e.target.value)}
                        placeholder="Please specify..."
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all bg-gray-50 mt-2 ${
                          fieldErrors.packageOther 
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-cta focus:ring-cta/20'
                        }`}
                      />
                      {fieldErrors.packageOther && (
                        <p className="mt-1 text-sm text-red-600">Please specify your package interest</p>
                      )}
                    </div>
                  )}
                  {fieldErrors.package && formData.package !== 'Other' && (
                    <p className="mt-2 text-sm text-red-600">Please select a package</p>
                  )}
                </div>

                {/* Existing Website */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Do you have an existing website?
                  </label>
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
                      <span className="text-body text-text-primary font-medium">Yes</span>
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
                      <span className="text-body text-text-primary font-medium">No</span>
                    </label>
                  </div>
                  {formData.hasExistingWebsite === 'yes' && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Website URL <span className="text-text-secondary font-normal">(optional)</span>
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

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    variant="cta"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
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
