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
import { aiTalksNl } from './content/aiTalks.nl-BE'
import { groupWorkshopNl } from './content/groupWorkshop.nl-BE'
import { masterclassNl } from './content/masterclass.nl-BE'
import { reviewsNl } from './content/reviews.nl-BE'
import { websitesNl } from './content/websites.nl-BE'
import { workshopsPageNl } from './content/workshopsPage.nl-BE'
import { startUpsNl } from './content/startUps.nl-BE'
import { platformsNl } from './content/platforms.nl-BE'
import { aiAgentsNl } from './content/aiAgents.nl-BE'
import { offerOverviewNl } from './content/offerOverview.nl-BE'

export const nlBEMessages = {
  common: {
    nav: {
      home: 'Home',
      packages: 'Pakketten',
      websites: 'Websites',
      portfolio: 'Portfolio',
      blog: 'Blog',
      howItWorks: 'Werkwijze',
      about: 'Over ons',
      reviews: 'Reviews',
      contact: 'Contact',
      workshops: 'Workshops',
      startUps: 'Start-ups',
      platforms: 'Platformen',
      aiAgents: 'AI-agents',
      whatWeDo: 'Wat wij doen',
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
      websites: 'Websites',
      workshops: 'Workshops',
      aiTalks: 'AI-lezingen',
      startUps: 'Start-ups',
      platforms: 'Platformen',
      aiAgents: 'AI-agents',
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
        title: 'Website laten maken Lokeren',
        description:
          'Website laten maken voor KMO’s in Lokeren & Oost-Vlaanderen. Websites, AI-workshops en platforms vanaf €25/maand. Boek gratis gesprek.',
      },
      '/packages': {
        title: 'Websitepakketten & prijzen',
        description:
          'Vergelijk Starter, Growth en Pro Max. Transparante prijzen vanaf €25/maand voor Belgische bedrijven.',
      },
      '/websites': {
        title: 'Website laten maken voor KMO’s | Prijzen',
        description:
          'Website laten maken in Lokeren/Oost-Vlaanderen. Starter €25/m + €150, Growth €40/m + €250 excl. btw. Bewijs eerst, dan prijs.',
      },
      '/workshops': {
        title: 'AI workshop bedrijven | Incompany',
        description:
          'AI workshop voor bedrijven: hands-on incompany vanaf €500, 1:1 €1.000 excl. btw. Geen demo-theater. Prompt-pack + 7-dagenplan.',
      },
      '/start-ups': {
        title: 'Website voor start-up | Snel online',
        description:
          'Website voor je start-up: lean starten met Starter (€25/m + €150). Heldere CTA, live in 1–2 weken na input.',
      },
      '/platformen': {
        title: 'Platform op maat | Maatwerk software',
        description:
          'Platform op maat voor tickets, inschrijvingen en admin. Maatwerk software i.p.v. generiek CRM. Offerte na scope.',
      },
      '/ai-agents': {
        title: 'Lokale AI agents voor bedrijven',
        description:
          'Lokale AI agents voor de interne werking van je bedrijf — privé en on-prem. Teaser; plan een gesprek of start met een workshop.',
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
      '/ai-talks': {
        title: 'AI-lezing voor bedrijven',
        description:
          'AI-workshops en lezingen: hands-on vanaf €500, 1:1 €1.000 excl. btw met huiswerk vóór dag 2, keynotes vanaf €450. Open groepsles via interesselijst.',
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
  aiTalks: aiTalksNl,
  groupWorkshop: groupWorkshopNl,
  masterclass: masterclassNl,
  reviews: reviewsNl,
  websites: websitesNl,
  workshopsPage: workshopsPageNl,
  startUps: startUpsNl,
  platforms: platformsNl,
  aiAgents: aiAgentsNl,
  offerOverview: offerOverviewNl,
}
