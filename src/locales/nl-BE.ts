import { homeNl } from './content/home.nl-BE'
import { packagesNl } from './content/packages.nl-BE'
import { howItWorksNl } from './content/howItWorks.nl-BE'
import { aboutNl } from './content/about.nl-BE'
import { contactNl } from './content/contact.nl-BE'
import { blogNl } from './content/blog.nl-BE'
import { portfolioNl } from './content/portfolio.nl-BE'
import { currentProjectsNl } from './content/currentProjects.nl-BE'
import { legalNl } from './content/legal.nl-BE'
import { hackersAndRaversNl } from './content/hackersAndRavers.nl-BE'
import { workshopsNl } from './content/workshops.nl-BE'
import { aiTalksNl } from './content/aiTalks.nl-BE'
import { groupWorkshopNl } from './content/groupWorkshop.nl-BE'
import { masterclassNl } from './content/masterclass.nl-BE'
import { reviewsNl } from './content/reviews.nl-BE'

export const nlBEMessages = {
  common: {
    nav: {
      home: 'Home',
      packages: 'Pakketten',
      portfolio: 'Portfolio',
      blog: 'Blog',
      howItWorks: 'Werkwijze',
      about: 'Over ons',
      reviews: 'Reviews',
      contact: 'Contact',
      workshops: 'Workshops',
    },
    cta: {
      bookCall: 'Plan een gesprek',
      clientPortal: 'Klantenportaal',
      viewPackages: 'Bekijk pakketten',
      getQuote: 'Offerte aanvragen',
      learnMore: 'Meer info',
      discoverMore: 'Ontdek meer',
      getStarted: 'Start nu',
      contactUs: 'Contacteer ons',
      readMore: 'Lees meer',
    },
    lang: {
      switchToNl: 'Nederlands (België)',
      switchToEn: 'English (International)',
      label: 'Taal',
    },
    footer: {
      contactLabel: 'CONTACT',
      contactUs: 'Contacteer ons',
      tagline: 'Van ontwikkeling tot marketing — wij brengen je visie tot leven.',
      quickLinks: 'Snelle links',
      aboutUs: 'Over ons',
      services: 'Diensten',
      projects: 'Projecten',
      socialMedia: 'Social media',
      customWeb: 'Custom web',
      branding: 'Branding',
      seo: 'SEO',
      ecommerce: 'E-commerce',
      workshops: 'Workshops',
      aiTalks: 'AI-lezingen',
      copyright: '© {{year}} Studio Thielman. Alle rechten voorbehouden.',
      companyNumber: 'KBO',
      privacy: 'Privacybeleid',
      terms: 'Algemene voorwaarden',
      cookies: 'Cookievoorkeuren',
    },
    cookie: {
      title: 'Cookies & tracking',
      description:
        'We gebruiken cookies voor analytics en om je ervaring te verbeteren. Je kan niet-essentiële cookies accepteren of weigeren.',
      accept: 'Alles accepteren',
      reject: 'Alles weigeren',
      privacyLink: 'Privacybeleid',
    },
    notFound: {
      title: 'Pagina niet gevonden',
      body: 'Die pagina bestaat niet. Ga naar home, pakketten of contact.',
      home: 'Home',
      packages: 'Pakketten',
      contact: 'Contact',
    },
    a11y: {
      toggleMenu: 'Menu openen',
      logoAlt: 'Studio Thielman logo',
      opensInNewTab: '(opent in nieuw venster)',
    },
    brand: 'STUDIO THIELMAN',
    comingSoon: 'Binnenkort',
    caseStudy: 'Case study',
    article: 'Artikel',
    progress: 'Voortgang',
    keyBenefit: 'Belangrijkste voordeel',
    whatsIncluded: 'Inbegrepen:',
    viewPackagesArrow: 'Bekijk pakketten →',
    contactDirectly: 'Direct contact →',
    pressEnter: 'Druk Enter om te versturen',
    projectImage: 'Projectafbeelding',
    blogImage: 'Blogafbeelding',
  },
  seo: {
    siteName: 'Studio Thielman',
    tagline: 'Professionele websites vanaf €25/maand',
    defaultDescription:
      'Professionele websites voor Belgische KMO\'s. Custom webdesign, SEO en AI-integraties vanaf €25/maand. Boek je gratis kennismakingsgesprek.',
    routes: {
      '/': {
        title: 'Professionele websites vanaf €25/maand',
        description:
          'Websites op maat voor Vlaamse en Belgische ondernemers. Webdesign, SEO en AI vanaf €25/maand.',
      },
      '/packages': {
        title: 'Websitepakketten & prijzen',
        description:
          'Vergelijk Starter, Growth en Pro Max. Transparante prijzen vanaf €25/maand voor Belgische bedrijven.',
      },
      '/portfolio': {
        title: 'Portfolio & cases',
        description:
          'Websites en platformen gebouwd door Studio Thielman voor klanten in België en Nederland.',
      },
      '/blog': {
        title: 'Blog & inzichten',
        description:
          'Praktische artikelen over webdesign, SEO, AI en online zichtbaarheid voor Belgische ondernemers.',
      },
      '/current-projects': {
        title: 'Lopende projecten',
        description: 'Wat we nu bouwen — actieve klantprojecten en aankomende launches.',
      },
      '/how-it-works': {
        title: 'Onze werkwijze',
        description:
          'Van kennismaking tot launch: strategie, design, ontwikkeling en ondersteuning.',
      },
      '/reviews': {
        title: 'Klantreviews',
        description:
          'Lees wat klanten van Studio Thielman zeggen over onze websites, aanpak en resultaten.',
      },
      '/about': {
        title: 'Over ons',
        description:
          'Studio Thielman — Belgisch webstudio voor professionele, toegankelijke en resultaatgerichte websites.',
      },
      '/contact': {
        title: 'Contact',
        description: 'Boek een gratis gesprek of stuur een bericht over de website die je nodig hebt.',
      },
      '/privacy': {
        title: 'Privacybeleid',
        description: 'Hoe Studio Thielman je persoonsgegevens verzamelt, gebruikt en beschermt.',
      },
      '/terms': {
        title: 'Algemene voorwaarden',
        description: 'Voorwaarden voor het gebruik van de website en diensten van Studio Thielman.',
      },
      '/workshops': {
        title: 'AI-workshops — teams & 1:1',
        description: 'AI-workshops voor teams (incompany, halve dag) of 1:1 (twee dagen, €1.000 excl. btw). Groepsles binnenkort. Hands-on, geen demo-theater.',
      },
      '/workshops/incompany': {
        title: 'Incompany AI-training voor bedrijven',
        description: 'Incompany AI-training en AI-opleiding voor bedrijven. Halve dag op locatie, max. 15 personen. Richtprijs €500 tot 8 personen, excl. btw.',
      },
      '/workshops/1-1': {
        title: '1:1 AI-workshop, twee dagen',
        description: 'Tweedaagse 1:1 AI-workshop: bouw je eerste app of workflow en ga dieper. €1.000 excl. btw, huiswerk inbegrepen.',
      },
      '/ai-talks': {
        title: 'AI-lezing voor bedrijven',
        description:
          'AI-lezing voor bedrijven, scholen en teams. Keynotes en hands-on AI-workshops door Ruben Thielman, vanaf €450 excl. btw.',
      },
      '/group-workshop': {
        title: 'AI-groepsworkshop: schrijf je in op de interesselijst',
        description:
          'AI-groepsworkshop met Ruben Thielman. Eén mail zodra datum en locatie vastliggen.',
      },
      '/ai-masterclass': {
        title: 'Masterclass AI: schrijf je in op de interesselijst',
        description:
          'Masterclass AI: agents, MCP, API’s en bouwen met AI. Eén mail zodra datum en locatie vastliggen.',
      },
    },
    structured: {
      areaServed: 'België',
      serviceDescription:
        'Webdesign en development voor Belgische bedrijven: professionele websites, SEO en AI-integraties.',
    },
  },
  home: homeNl,
  packages: packagesNl,
  howItWorks: howItWorksNl,
  about: aboutNl,
  contact: contactNl,
  blog: blogNl,
  portfolio: portfolioNl,
  currentProjects: currentProjectsNl,
  legal: legalNl,
  hackersAndRavers: hackersAndRaversNl,
  workshops: workshopsNl,
  aiTalks: aiTalksNl,
  groupWorkshop: groupWorkshopNl,
  masterclass: masterclassNl,
  reviews: reviewsNl,
}
