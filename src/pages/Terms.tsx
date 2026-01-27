import { motion } from 'framer-motion'

export default function Terms() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">LEGAL</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-white/60 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-text-primary"
          >
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">1. Agreement to Terms</h2>
              <p className="text-body leading-relaxed mb-4">
                By accessing or using the services of Studio Thielman ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-body leading-relaxed">
                These terms apply to all services provided by Studio Thielman, including but not limited to web design, web development, branding, and digital marketing services.
              </p>
            </div>

            {/* Company Information */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">2. Company Information</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-body leading-relaxed mb-2">
                  <strong>Company Name:</strong> Studio Thielman
                </p>
                <p className="text-body leading-relaxed mb-2">
                  <strong>Address:</strong> Pereboomsteenweg 49, 9180 Moerbeke, Belgium
                </p>
                <p className="text-body leading-relaxed mb-2">
                  <strong>Email:</strong> ruben.thielman@gmail.com
                </p>
                <p className="text-body leading-relaxed">
                  <strong>Phone:</strong> +32 493 50 56 41
                </p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">3. Services</h2>
              <p className="text-body leading-relaxed mb-4">
                We provide web design, web development, branding, and digital marketing services as described on our website. Service details, timelines, and deliverables will be specified in individual project agreements or service packages.
              </p>
              <p className="text-body leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.
              </p>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">4. Payment Terms</h2>
              <p className="text-body leading-relaxed mb-4">
                <strong>Payment Schedule:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4 mb-4">
                <li>For one-time projects: [To be specified - e.g., 50% deposit upon agreement, 50% upon completion]</li>
                <li>For monthly packages: Payment is due monthly in advance</li>
                <li>All prices are in EUR</li>
              </ul>
              <p className="text-body leading-relaxed mb-4">
                <strong>Late Payment:</strong> If payment is not received within [X] days of the due date, we reserve the right to suspend services until payment is received. Late payments may incur interest charges as permitted by Belgian law.
              </p>
              <p className="text-body leading-relaxed">
                <strong>Refunds:</strong> [To be specified - e.g., Refunds are available within 14 days of service commencement if services have not yet been delivered. Once work has begun, refunds are at our discretion.]
              </p>
            </div>

            {/* Client Responsibilities */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">5. Client Responsibilities</h2>
              <p className="text-body leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4">
                <li>Provide accurate and complete information necessary for project completion</li>
                <li>Respond to requests for feedback, content, or approvals in a timely manner</li>
                <li>Provide all necessary materials, content, and assets required for the project</li>
                <li>Ensure you have the legal right to use any content, images, or materials you provide</li>
                <li>Make timely payments as agreed</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p className="text-body leading-relaxed mt-4">
                Delays in providing required materials or feedback may result in project timeline extensions. We are not responsible for delays caused by client inaction.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">6. Intellectual Property Rights</h2>
              <p className="text-body leading-relaxed mb-4">
                <strong>Client Content:</strong> You retain ownership of all content, materials, and intellectual property you provide to us.
              </p>
              <p className="text-body leading-relaxed mb-4">
                <strong>Work Product:</strong> Upon full payment, ownership of the final deliverables (website, designs, code) transfers to you. We retain the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4 mb-4">
                <li>Use the work in our portfolio and for marketing purposes</li>
                <li>Retain copies for our records</li>
                <li>Use any pre-existing code, templates, or tools we own</li>
              </ul>
              <p className="text-body leading-relaxed">
                <strong>Third-Party Materials:</strong> Any third-party materials (fonts, images, plugins) used in your project remain subject to their respective licenses. You are responsible for obtaining necessary licenses.
              </p>
            </div>

            {/* Warranties and Disclaimers */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">7. Warranties and Disclaimers</h2>
              <p className="text-body leading-relaxed mb-4">
                We warrant that our services will be performed with reasonable skill and care. However:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4">
                <li>We do not guarantee that services will be uninterrupted, error-free, or meet all your requirements</li>
                <li>We are not responsible for third-party services, hosting, or platforms</li>
                <li>We do not guarantee specific business results or outcomes from our services</li>
                <li>Website performance depends on various factors beyond our control (hosting, internet speed, browser compatibility)</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
              <p className="text-body leading-relaxed mb-4">
                To the maximum extent permitted by Belgian law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4 mb-4">
                <li>Our total liability for any claim shall not exceed the total amount paid by you for the specific service in question</li>
                <li>We are not liable for indirect, consequential, or special damages</li>
                <li>We are not liable for loss of profits, data, or business opportunities</li>
              </ul>
              <p className="text-body leading-relaxed">
                Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
              </p>
            </div>

            {/* Cancellation and Termination */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">9. Cancellation and Termination</h2>
              <p className="text-body leading-relaxed mb-4">
                <strong>By Client:</strong> You may cancel services with written notice. Cancellation terms:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4 mb-4">
                <li>For monthly packages: [To be specified - e.g., 30 days written notice required]</li>
                <li>For one-time projects: [To be specified - e.g., Cancellation after work has begun will result in payment for work completed]</li>
                <li>No refunds for services already delivered</li>
              </ul>
              <p className="text-body leading-relaxed mb-4">
                <strong>By Us:</strong> We may terminate services if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body ml-4">
                <li>You breach these terms</li>
                <li>Payment is overdue</li>
                <li>You engage in illegal or harmful activities</li>
                <li>We are unable to continue providing services for reasons beyond our control</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">10. Confidentiality</h2>
              <p className="text-body leading-relaxed">
                We will keep confidential all information you provide to us in connection with our services, except where disclosure is required by law or with your consent. We expect the same confidentiality from you regarding our business information and methodologies.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">11. Modifications to Services or Terms</h2>
              <p className="text-body leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Material changes will be communicated to you via email or through our website. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
              <p className="text-body leading-relaxed">
                We may modify or update services, features, or pricing with reasonable notice. Existing agreements will be honored according to their original terms.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-body leading-relaxed mb-4">
                These terms are governed by Belgian law. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Belgium.
              </p>
              <p className="text-body leading-relaxed">
                Before initiating legal proceedings, parties agree to attempt to resolve disputes through good faith negotiation. If negotiation fails, disputes may be resolved through mediation or arbitration as agreed by both parties.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">13. Contact Information</h2>
              <p className="text-body leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-body leading-relaxed mb-2">
                  <strong>Email:</strong> ruben.thielman@gmail.com
                </p>
                <p className="text-body leading-relaxed mb-2">
                  <strong>Phone:</strong> +32 493 50 56 41
                </p>
                <p className="text-body leading-relaxed">
                  <strong>Address:</strong> Pereboomsteenweg 49, 9180 Moerbeke, Belgium
                </p>
              </div>
            </div>

            {/* Severability */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">14. Severability</h2>
              <p className="text-body leading-relaxed">
                If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely reflects the intent of the original.
              </p>
            </div>

            {/* Entire Agreement */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">15. Entire Agreement</h2>
              <p className="text-body leading-relaxed">
                These Terms of Service, together with any project-specific agreements or service packages, constitute the entire agreement between you and Studio Thielman regarding the use of our services and supersede all prior agreements and understandings.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
