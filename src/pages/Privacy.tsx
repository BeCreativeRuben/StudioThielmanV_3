import { motion } from 'framer-motion'

export default function Privacy() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.
          </p>
          <p className="text-sm text-white/60 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-text-primary">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">1. Introduction</h2>
                <p className="text-body leading-relaxed mb-4">
                  Studio Thielman ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-body leading-relaxed">
                  This policy complies with the General Data Protection Regulation (GDPR) (EU) 2016/679 and Belgian data protection laws.
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
                    <strong>Address:</strong> [Your Business Address, Belgium]
                  </p>
                  <p className="text-body leading-relaxed mb-2">
                    <strong>Email:</strong> [Your Contact Email]
                  </p>
                  <p className="text-body leading-relaxed">
                    <strong>VAT Number:</strong> [Your VAT Number]
                  </p>
                </div>
              </div>

              {/* Data We Collect */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">3. Data We Collect</h2>
                <p className="text-body leading-relaxed mb-4">
                  We may collect the following types of personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, business name</li>
                  <li><strong>Communication Data:</strong> Messages, inquiries, and correspondence you send to us</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, pages visited, time spent on pages</li>
                  <li><strong>Usage Data:</strong> How you interact with our website and services</li>
                  <li><strong>Marketing Data:</strong> Your preferences for receiving marketing communications</li>
                </ul>
              </div>

              {/* How We Use Your Data */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">4. How We Use Your Data</h2>
                <p className="text-body leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li>To provide and deliver our services</li>
                  <li>To respond to your inquiries and communicate with you</li>
                  <li>To process and manage your requests and orders</li>
                  <li>To improve our website and services</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </div>

              {/* Legal Basis */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">5. Legal Basis for Processing</h2>
                <p className="text-body leading-relaxed mb-4">
                  We process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li><strong>Consent:</strong> When you have given clear consent for us to process your data</li>
                  <li><strong>Contract:</strong> To perform a contract with you or take steps at your request before entering into a contract</li>
                  <li><strong>Legal Obligation:</strong> To comply with legal obligations</li>
                  <li><strong>Legitimate Interests:</strong> For our legitimate business interests, such as improving our services and website security</li>
                </ul>
              </div>

              {/* Data Sharing */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">6. Data Sharing and Disclosure</h2>
                <p className="text-body leading-relaxed mb-4">
                  We do not sell your personal data. We may share your data with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (hosting, email services, analytics)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  All third parties are required to maintain the confidentiality of your data and use it only for the purposes we specify.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">7. Data Retention</h2>
                <p className="text-body leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When we no longer need your data, we will securely delete or anonymize it.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">8. Your Rights</h2>
                <p className="text-body leading-relaxed mb-4">
                  Under GDPR and Belgian law, you have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  To exercise any of these rights, please contact us using the information provided in Section 11.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-body leading-relaxed mb-4">
                  Our website uses cookies and similar tracking technologies to enhance your experience. We use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">10. Data Security</h2>
                <p className="text-body leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">11. Contact Us</h2>
                <p className="text-body leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-body leading-relaxed mb-2">
                    <strong>Email:</strong> [Your Contact Email]
                  </p>
                  <p className="text-body leading-relaxed">
                    <strong>Address:</strong> [Your Business Address, Belgium]
                  </p>
                </div>
              </div>

              {/* Data Protection Authority */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">12. Right to Lodge a Complaint</h2>
                <p className="text-body leading-relaxed mb-4">
                  If you believe we have not addressed your concerns adequately, you have the right to lodge a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit / Autorité de protection des données):
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-body leading-relaxed mb-2">
                    <strong>Gegevensbeschermingsautoriteit</strong>
                  </p>
                  <p className="text-body leading-relaxed mb-2">
                    Drukpersstraat 35, 1000 Brussel
                  </p>
                  <p className="text-body leading-relaxed mb-2">
                    Tel: +32 (0)2 274 48 00
                  </p>
                  <p className="text-body leading-relaxed">
                    Email: contact@apd-gba.be
                  </p>
                  <p className="text-body leading-relaxed mt-4">
                    Website: <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-cta hover:underline">www.gegevensbeschermingsautoriteit.be</a>
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">13. Changes to This Policy</h2>
                <p className="text-body leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
