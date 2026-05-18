import { privacySectionsNl } from './legal/privacy-sections.nl-BE'
import { termsSectionsNl } from './legal/terms-sections.nl-BE'

export const legalNl = {
  label: 'JURIDISCH',
  privacy: {
    title: 'Privacybeleid',
    lastUpdated: 'Laatst bijgewerkt: januari 2026',
    intro:
      'Je privacy is belangrijk voor ons. Dit beleid legt uit hoe we je persoonsgegevens verzamelen, gebruiken en beschermen (conform GDPR / AVG).',
    sections: privacySectionsNl,
  },
  terms: {
    title: 'Algemene voorwaarden',
    lastUpdated: 'Laatst bijgewerkt: januari 2026',
    intro: 'Lees deze voorwaarden zorgvuldig door voordat je onze diensten gebruikt.',
    sections: termsSectionsNl,
  },
}
