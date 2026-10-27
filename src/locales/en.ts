import { homeEn } from './content/home.en'
import { packagesEn } from './content/packages.en'
import { howItWorksEn } from './content/howItWorks.en'
import { aboutEn } from './content/about.en'
import { contactEn } from './content/contact.en'
import { blogEn } from './content/blog.en'
import { portfolioEn } from './content/portfolio.en'
import { currentProjectsEn } from './content/currentProjects.en'
import { legalEn } from './content/legal.en'
import { hackersAndRaversEn } from './content/hackersAndRavers.en'
import { aiTalksEn } from './content/aiTalks.en'
import { groupWorkshopEn } from './content/groupWorkshop.en'
import { masterclassEn } from './content/masterclass.en'
import { reviewsEn } from './content/reviews.en'
import { websitesEn } from './content/websites.en'
import { workshopsPageEn } from './content/workshopsPage.en'
import { startUpsEn } from './content/startUps.en'
import { platformsEn } from './content/platforms.en'
import { aiAgentsEn } from './content/aiAgents.en'
import { offerOverviewEn } from './content/offerOverview.en'

export const enMessages = {
  common: {
    nav: {
      home: 'Home',
      packages: 'Packages',
      websites: 'Websites',
      portfolio: 'Portfolio',
      blog: 'Blog',
      howItWorks: 'How we work',
      about: 'About',
      reviews: 'Reviews',
      contact: 'Contact',
      workshops: 'Workshops',
      startUps: 'Start-ups',
      platforms: 'Platforms',
      aiAgents: 'AI agents',
      whatWeDo: 'What we do',
    },
    cta: {
      bookCall: 'Book a Call',
      clientPortal: 'Client portal',
      viewPackages: 'View Packages',
      getQuote: 'Get a Quote',
      learnMore: 'Learn More',
      discoverMore: 'Discover More',
      getStarted: 'Get Started',
      contactUs: 'Contact Us',
      readMore: 'Read More',
    },
    lang: {
      switchToNl: 'Nederlands (België)',
      switchToEn: 'English (International)',
      label: 'Language',
    },
    footer: {
      contactLabel: 'CONTACT US',
      contactUs: 'Contact Us',
      tagline: 'From development to marketing, we bring your vision to life.',
      quickLinks: 'Quick Links',
      aboutUs: 'About Us',
      services: 'Services',
      projects: 'Projects',
      socialMedia: 'Social Media',
      customWeb: 'Custom Web',
      branding: 'Branding',
      seo: 'SEO',
      ecommerce: 'E-commerce',
      websites: 'Websites',
      workshops: 'Workshops',
      aiTalks: 'AI Talks & Lectures',
      startUps: 'Start-ups',
      platforms: 'Platforms',
      aiAgents: 'AI agents',
      copyright: '© {{year}} Studio Thielman. All rights reserved.',
      companyNumber: 'Company no.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Preferences',
    },
    cookie: {
      title: 'Cookies & tracking',
      description:
        'We use cookies for analytics and to improve your experience. You can accept or reject non-essential cookies.',
      accept: 'Accept all',
      reject: 'Reject all',
      privacyLink: 'Privacy Policy',
    },
    notFound: {
      title: 'Page not found',
      body: 'That page does not exist. Try the homepage, packages, or contact.',
      home: 'Home',
      packages: 'Packages',
      contact: 'Contact',
    },
    a11y: {
      toggleMenu: 'Toggle menu',
      logoAlt: 'Studio Thielman Logo',
      opensInNewTab: '(opens in new tab)',
    },
    brand: 'STUDIO THIELMAN',
    comingSoon: 'Coming Soon',
    caseStudy: 'Case Study',
    article: 'Article',
    progress: 'Progress',
    keyBenefit: 'Key Benefit',
    whatsIncluded: "What's Included:",
    viewPackagesArrow: 'View Packages →',
    contactDirectly: 'Contact directly →',
    pressEnter: 'Press Enter to send',
    projectImage: 'Project Image',
    blogImage: 'Blog Image',
  },
  seo: {
    siteName: 'Studio Thielman',
    tagline: 'Professional Websites Starting at €25/month',
    defaultDescription:
      'Professional websites for businesses worldwide. Custom web design, SEO, and AI integrations from €25/month. Book your free discovery call.',
    routes: {
      '/': {
        title: 'Web design studio Lokeren',
        description:
          'Websites, AI workshops and custom platforms for SMEs. From €25/month. Based in Lokeren, Belgium. Book a free call.',
      },
      '/packages': {
        title: 'Website Packages & Pricing',
        description:
          'Compare Starter, Growth, and Pro Max website packages. Transparent pricing from €25/month.',
      },
      '/websites': {
        title: 'Website design for SMEs | Pricing',
        description:
          'Get a clear website that leads to contact or booking. Starter €25/mo + €150, Growth €40/mo + €250 excl. VAT.',
      },
      '/workshops': {
        title: 'AI workshop for companies',
        description:
          'Hands-on AI workshop for teams from €500, 1:1 €1,000 excl. VAT. No demo theatre. Prompt pack + 7-day plan.',
      },
      '/start-ups': {
        title: 'Website for start-ups | Launch lean',
        description:
          'Website for your start-up: start lean with Starter (€25/mo + €150). Clear CTA, live in 1–2 weeks after input.',
      },
      '/platformen': {
        title: 'Custom platform | Bespoke software',
        description:
          'Custom platform for tickets, registrations and admin. Bespoke software when a generic CRM no longer fits.',
      },
      '/ai-agents': {
        title: 'Local AI agents for companies',
        description:
          'Local AI agents for internal company operations — private and on-prem. Teaser; book a call or start with a workshop.',
      },
      '/portfolio': {
        title: 'Portfolio & Case Studies',
        description:
          'Explore websites built by Studio Thielman: portals, booking systems, portfolios, and platforms.',
      },
      '/blog': {
        title: 'Blog & Insights',
        description:
          'Articles on web design, SEO, AI, and online visibility for entrepreneurs and SMEs.',
      },
      '/current-projects': {
        title: 'Current Projects',
        description: 'See what Studio Thielman is building now — active client work and upcoming launches.',
      },
      '/how-it-works': {
        title: 'How It Works',
        description:
          'Our step-by-step process from discovery call to launch: strategy, design, development, and support.',
      },
      '/reviews': {
        title: 'Client Reviews',
        description:
          'Read what Studio Thielman clients say about our websites, process, and results.',
      },
      '/about': {
        title: 'About Us',
        description:
          'Meet Studio Thielman — a web studio focused on professional, accessible, and results-driven websites.',
      },
      '/contact': {
        title: 'Contact',
        description: 'Book a free discovery call or send a message about the website you need.',
      },
      '/privacy': {
        title: 'Privacy Policy',
        description: 'How Studio Thielman collects, uses, and protects your personal data.',
      },
      '/terms': {
        title: 'Terms of Service',
        description: 'Terms and conditions for Studio Thielman website and service offerings.',
      },
      '/ai-talks': {
        title: 'AI workshops and talks',
        description:
          'Hands-on workshops from €500, 1:1 two days at €1,000 excl. VAT with homework before day 2, talks from €450. Open group class by interest.',
      },
      '/group-workshop': {
        title: 'Group AI Workshop: Join the Interest List',
        description:
          'Group AI workshop interest list with Ruben Thielman. One email when the date and location are set.',
      },
      '/ai-masterclass': {
        title: 'AI Masterclass: Join the Interest List',
        description:
          'AI masterclass interest list: agents, MCP, APIs and building with AI. One email when the date and location are set.',
      },
    },
    structured: {
      areaServed: 'Worldwide',
      serviceDescription:
        'Web design and development studio offering professional websites, SEO, and AI integrations.',
    },
  },
  home: homeEn,
  packages: packagesEn,
  howItWorks: howItWorksEn,
  about: aboutEn,
  contact: contactEn,
  blog: blogEn,
  portfolio: portfolioEn,
  currentProjects: currentProjectsEn,
  legal: legalEn,
  hackersAndRavers: hackersAndRaversEn,
  aiTalks: aiTalksEn,
  groupWorkshop: groupWorkshopEn,
  masterclass: masterclassEn,
  reviews: reviewsEn,
  websites: websitesEn,
  workshopsPage: workshopsPageEn,
  startUps: startUpsEn,
  platforms: platformsEn,
  aiAgents: aiAgentsEn,
  offerOverview: offerOverviewEn,
}
