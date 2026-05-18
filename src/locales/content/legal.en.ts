import { privacySectionsEn } from './legal/privacy-sections.en'
import { termsSectionsEn } from './legal/terms-sections.en'

export const legalEn = {
  label: 'LEGAL',
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2026',
    intro:
      'Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.',
    sections: privacySectionsEn,
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: January 2026',
    intro: 'Please read these terms carefully before using our services.',
    sections: termsSectionsEn,
  },
}
