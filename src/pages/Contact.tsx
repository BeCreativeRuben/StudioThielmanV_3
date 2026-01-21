import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import rubenImage from '../images/WhatsApp Image 2026-01-11 at 13.25.54.jpeg'

// Mailchimp Form Configuration
// Form action URL from Mailchimp embedded form
// Extracted from: <form action="https://studiothielman.us1.list-manage.com/subscribe/post?u=d8444475eb02ed17efa7940b0&id=054dfd1817&f_id=002ccee4f0" ...>
const MAILCHIMP_FORM_ACTION = 'https://studiothielman.us1.list-manage.com/subscribe/post?u=d8444475eb02ed17efa7940b0&id=054dfd1817&f_id=002ccee4f0'

// IMPORTANT: Set up these merge fields in Mailchimp:
// 1. Go to Mailchimp > Audience > Settings > Audience fields and |*MERGE*| tags
// 2. Add the following merge fields:
//    - MMERGE1: Business Name (Text)
//    - MMERGE2: Phone (Phone)
//    - MMERGE3: Business Description (Text)
//    - MMERGE4: Package Interest (Text)
//    - MMERGE5: Package Other (Text) - Optional
//    - MMERGE6: Has Existing Website (Text) - Optional
//    - MMERGE7: Existing Website URL (URL) - Optional

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

    // Handle form submission to Mailchimp using hidden iframe (more reliable than JSONP)
    setIsSubmitting(true)
    
    try {
      // Split name into first and last name for Mailchimp
      const nameParts = formData.name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      
      // Create hidden iframe for form submission
      const iframe = document.createElement('iframe')
      iframe.name = 'mailchimp-hidden-iframe'
      iframe.style.display = 'none'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = 'none'
      document.body.appendChild(iframe)
      
      // Create form for Mailchimp submission
      const mailchimpForm = document.createElement('form')
      mailchimpForm.method = 'post'
      mailchimpForm.action = MAILCHIMP_FORM_ACTION
      mailchimpForm.target = 'mailchimp-hidden-iframe'
      mailchimpForm.style.display = 'none'
      
      console.log('Using Mailchimp form action:', MAILCHIMP_FORM_ACTION)
      
      // Create hidden inputs for all fields
      const createInput = (name: string, value: string) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        return input
      }
<<<<<<< HEAD
      
      mailchimpForm.appendChild(createInput('EMAIL', formData.email))
      mailchimpForm.appendChild(createInput('FNAME', firstName))
      mailchimpForm.appendChild(createInput('LNAME', lastName))
      mailchimpForm.appendChild(createInput('MMERGE1', formData.businessName))
      mailchimpForm.appendChild(createInput('MMERGE2', formData.phone))
      mailchimpForm.appendChild(createInput('MMERGE3', formData.businessDescription))
      mailchimpForm.appendChild(createInput('MMERGE4', formData.package))
      mailchimpForm.appendChild(createInput('MMERGE6', formData.hasExistingWebsite || ''))
      
      // Add optional fields
      if (formData.packageOther) {
        mailchimpForm.appendChild(createInput('MMERGE5', formData.packageOther))
      }
      if (formData.existingWebsiteUrl) {
        mailchimpForm.appendChild(createInput('MMERGE7', formData.existingWebsiteUrl))
      }
      
      // Add bot protection field (format: b_[user_id]_[list_id])
      mailchimpForm.appendChild(createInput('b_d8444475eb02ed17efa7940b0_054dfd1817', ''))
      
      // Append form to body and submit
      document.body.appendChild(mailchimpForm)
      
      console.log('Submitting to Mailchimp via iframe:', MAILCHIMP_FORM_ACTION)
      
      // Listen for iframe load to detect completion
      iframe.onload = () => {
        console.log('Mailchimp form submitted (iframe loaded)')
        // Clean up after a short delay
        setTimeout(() => {
          if (document.body.contains(mailchimpForm)) {
            document.body.removeChild(mailchimpForm)
          }
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
          }
        }, 2000)
        
        setIsSubmitting(false)
        
        // Scroll to top of page before showing success message
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // Small delay to ensure scroll completes before showing success message
        setTimeout(() => {
          setSubmitted(true)
          console.log('Form submission complete - check Mailchimp audience to confirm')
        }, 300)
      }
      
      // Submit the form
      mailchimpForm.submit()
      
      // Fallback timeout in case iframe doesn't fire onload
      setTimeout(() => {
        setIsSubmitting(false)
        
        // Scroll to top of page before showing success message
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // Small delay to ensure scroll completes before showing success message
        setTimeout(() => {
          setSubmitted(true)
          console.log('Form submission timeout - assuming success (check Mailchimp audience)')
        }, 300)
      }, 5000)
    } catch (error: any) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
      alert(`Failed to submit form: ${error.message || 'Unknown error'}`)
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

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Picture */}
            <div className="flex justify-center md:justify-start">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cta shadow-lg">
                <img 
                  src={rubenImage} 
                  alt="Ruben Thielman"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-lg text-text-primary font-medium">Address</p>
                      <p className="text-body text-text-primary">Pereboomsteenweg 49</p>
                      <p className="text-body text-text-primary">Moerbeke 9180</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-cta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-lg text-text-primary font-medium">Phone</p>
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

      {/* Form Section */}
      <section id="contact-form" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} action={MAILCHIMP_FORM_ACTION} method="post" noValidate>
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
