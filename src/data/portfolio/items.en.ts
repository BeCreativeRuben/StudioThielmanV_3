import type { PortfolioItem } from './types'

// Newest first (by launch date)
export const portfolioItemsEn: PortfolioItem[] = [
  {
    slug: 'la-vie-nomade',
    title: 'ERPA — La Vie Nomade',
    package: 'Pro Max',
    description:
      'Frequency as a field — custom brand platform with phased launch, members area, and hidden interactions.',
    longDescription:
      'ERPA La Vie Nomade is a brand and community platform built around sound, frequency, and healing — rooted in Het Sas, Ghent. Not a standard business site, but a living digital field: slow, breathing, with hidden layers for those who keep listening.',
    clientType: 'Brand platform · Community · Bookings',
    date: 'APR 2026',
    liveUrl: 'https://lavienomade.com',
    keyFeatures: [],
    screenshots: ['/images/portfolio/ERPA/Erpa Source Lovable edit.jpeg'],
    packageFitExplanation: '',
    results:
      'A production-ready brand platform that grows through four phases — from whisper to full community with bookings and magazine — without rebuilding. The site feels like ERPA: no noise, just resonance.',
    caseStudy: {
      subtitle: 'A website that behaves like a frequency',
      meta: [{ label: 'URL', value: 'lavienomade.com', href: 'https://lavienomade.com' }],
      sections: [
        {
          title: 'Where I started',
          paragraphs: [
            'ERPA isn\'t a brand you explain with five bullet points. Before I typed a single page, I sat in the feeling first: gold on black, slow scrolling, silence between sections. The goal wasn\'t to "display information" but to set a frequency — something that feels like walking into the practice at Het Sas.',
            'The challenge was clear: this brand lives in atmosphere, rhythm, and trust. The site had to open in phases, carry an exclusive members area, enable bookings and magazine later, and work in eight languages — from Ghent to an international audience. All without breaking the sense of calm.',
          ],
        },
        {
          title: 'Whisper first, then open',
          paragraphs: [
            'I built the site deliberately in two tempos. The whisper phase came first: only a countdown, an email field, no menu. Visitors can sign up, but the brand stays closed until the moment is right.',
            'When ERPA was ready to be fully visible, I unlocked the live site — origin story, seven fields (art, sport, gastronomy, hospitality, wellbeing, B2B), a living journey timeline, teasers toward shop and magazine. The whisper remains part of the story; the brand "tunes in" before fully opening.',
          ],
        },
        {
          title: 'Motion as part of the brand',
          paragraphs: [
            'I didn\'t want to "add animations" afterward. Scroll-reactive waves, magnetic hover states, and a loading portal on entry are built into the first scroll experience. Smooth scroll gives it that breathing tempo; motion responds to where the visitor is, not what I want to show.',
            'Optionally, you can activate a 432 Hz soundscape. And for those who keep looking: hidden layers — a Morse quote, a breath moment, a response when you long-press the monogram. Not gimmicks; the brand rewards those who keep listening.',
          ],
        },
        {
          title: 'Maison de Resonance',
          paragraphs: [
            'The members area was the most delicate piece. I didn\'t want a classic login screen, but a ritual: request access, wait for approval, enter via magic link. Each member gets a personal card with a unique frequency.',
            'From there they can book sessions — everything connected to the same calm and rhythm as the public site. I built the admin panel so ERPA can approve members, manage slots, and follow bookings without a technical middle step.',
          ],
        },
        {
          title: 'Everything behind the surface',
          paragraphs: [
            'Behind the atmosphere sits a fully working platform. I set up member management, booking slots, waitlists, and payments — bookings, membership, donations — with confirmation emails that keep the same tone as the site.',
            'Contact forms, waitlists, and portal signups send automatic confirmations. Rate limiting and captcha where needed, so the field stays open but protected. Everything end-to-end: concept, UX, frontend, backend, database, payments, email flows, admin, and deploy.',
          ],
        },
        {
          title: 'Multilingual from Ghent to the world',
          paragraphs: [
            'ERPA wants to resonate internationally. I built content in eight languages — NL, EN, FR, ES, AR, JA, RU, PT — through translation files and MDX. No heavy CMS locking content in place; something that can grow phase by phase without breaking the architecture.',
          ],
        },
        {
          title: 'Growing in phases',
          paragraphs: [
            'I structured the platform in four phases: whisper, live, community, magazine. Each phase unlocks features without breaking the foundation. What\'s live today is phase one and two; the rest grows with the brand — without starting over.',
          ],
        },
      ],
    },
  },
  {
    slug: 'de-storme-design',
    title: 'De Storme Design - Interior Architecture',
    package: 'Growth',
    description: 'A website for an interior architect, built entirely around showcasing results and maximising visibility for the studio.',
    longDescription: 'De Storme Design needed a portfolio-first website that lets the work speak for itself. We focused on strong visuals, project highlights, and discoverability, so potential clients immediately see the quality of the studio\'s interiors. The result is a refined, image-led experience built to attract the right audience and support new commissions.',
    clientType: 'Interior Architecture',
    date: 'APR 2026',
    liveUrl: 'https://destormedesign.be',
    keyFeatures: [
      'Portfolio & project showcase',
      'Image-led gallery layouts',
      'Studio story & expertise',
      'SEO-focused structure',
      'Responsive across devices',
      'Contact & inquiry integration'
    ],
    screenshots: [
      '/images/portfolio/destormedesign/hero-home.webp',
      '/images/portfolio/destormedesign/brand-mark.webp',
    ],
    packageFitExplanation: 'An interior architect\'s site lives or dies on presentation. Growth gave De Storme Design the visual flexibility, smooth interactions, and structured portfolio sections needed to compete online - without overbuilding backend complexity.',
    results: 'Stronger online visibility with a portfolio that puts finished interiors at the centre'
  },
  {
    slug: 'tr-car-detail',
    title: 'TR Car Detail - Mobile Detailing & Booking',
    package: 'Growth',
    description: 'A mobile car detailing service that visits customers at home. The site works as a virtual business card and booking system in one.',
    longDescription: 'TR Car Detail brings professional detailing to the customer\'s doorstep. Their website doubles as a digital business card and a practical booking channel: explaining services, building trust, and making it easy to get in touch or schedule an appointment. Every section is tuned for clarity and conversion on mobile, where most visitors arrive.',
    clientType: 'Automotive Services',
    date: 'APR 2026',
    liveUrl: 'https://www.trcardetail.be',
    keyFeatures: [
      'Virtual business card layout',
      'Online booking system',
      'Service showcase',
      'Mobile-first design',
      'Contact & appointment flows',
      'Trust-building brand presentation'
    ],
    screenshots: ['/images/portfolio/trcardetail/about-story.webp'],
    packageFitExplanation: 'TR Car Detail combines presentation with functionality - exactly what Growth is for. The booking system and structured service pages go beyond Starter, while staying focused and fast for a local service business.',
    results: 'A single website that represents the business and captures bookings from mobile customers'
  },
  {
    slug: 'binnenhof',
    title: 'Binnenhof - School Communication Platform',
    package: 'Growth',
    description: 'Built for Michiel Lippens - a school communication platform to improve communication between school and parents, with focus on language barriers and learning disabilities.',
    longDescription: 'Built for Michiel Lippens, Binnenhof is a school communication platform with a clear mission: make it easier for schools and parents to stay connected, especially where language barriers or learning disabilities add friction. The interface prioritises clarity, accessibility, and straightforward messaging, so important updates reach every family, not just those who find traditional channels easy.',
    clientType: 'Education',
    date: 'APR 2026',
    liveUrl: 'https://binnenhof-mvp.vercel.app',
    keyFeatures: [
      'School-parent messaging',
      'Accessible, clear UI',
      'Support for diverse family needs',
      'Structured information delivery',
      'Role-based communication flows',
      'Mobile-friendly access'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&q=80'
    ],
    packageFitExplanation: 'Binnenhof goes beyond a static school website: it needed thoughtful UX for real communication challenges. The Growth package provided the interactive, user-centred foundation to prototype a platform that addresses language barriers and accessibility in education.',
    results: 'Clearer school-parent communication designed for inclusivity and everyday use'
  },
  {
    slug: 'party-up',
    title: 'PartyUp — Party Supplies Rental',
    package: 'Growth',
    description: 'A high-end party supplies rental service needed a website where customers can browse and source rental items with ease.',
    longDescription: 'PartyUp offers premium party supplies for hire. We built a website that puts their catalogue front and centre, helping customers discover and source the right items for their event without friction. Clean presentation, clear categories, and a professional look match the high-end positioning of the brand.',
    clientType: 'Event Rental',
    date: 'FEB 2026',
    liveUrl: 'https://party-up.be',
    keyFeatures: [
      'Product & rental catalogue',
      'Clear category browsing',
      'High-end brand presentation',
      'Mobile-friendly layout',
      'Contact & inquiry flows',
      'Fast, modern frontend'
    ],
    screenshots: [
      '/images/portfolio/party-up/hero-home.webp',
      '/images/portfolio/party-up/brand-mark.webp',
    ],
    packageFitExplanation: 'PartyUp needed dynamic, polished pages and a structured way to showcase inventory - a natural fit for the Growth package. Beyond a simple landing page, the site supports real business goals: helping customers find and request the right rental items online.',
    results: 'Customers can explore and source party rental items through a professional, on-brand website'
  },
  {
    slug: 'battle-dashboard',
    title: 'BattleDashboard - Custom Dashboard with Admin Panel',
    package: 'Growth',
    description: 'A public demo of a custom client dashboard we built. The live system contains sensitive data, so this version showcases the interface and features without exposing real information.',
    longDescription: 'BattleDashboard started as a real client project: a custom internal dashboard with admin panel, statistics tracking, and dynamic data visualisation. Because the production environment contains sensitive business data, we created this public demo to show what we delivered - same structure and capabilities, with safe sample data instead. The demo includes user management, analytics views, interactive charts, and a responsive admin interface.',
    clientType: 'Client Demo',
    date: 'JAN 2025',
    liveUrl: 'https://becreativeruben.github.io/BattleDashboard_DEMO/',
    githubUrl: 'https://github.com/BeCreativeRuben/BattleDashboard_DEMO',
    keyFeatures: [
      'Public demo of a real client build',
      'Admin panel with user management',
      'Statistics dashboard',
      'Dynamic data visualization',
      'Interactive charts and graphs',
      'Responsive admin interface'
    ],
    screenshots: [
      '/images/portfolio/battle-dashboard/banner.png'
    ],
    packageFitExplanation: 'This demo reflects a Growth-tier client delivery: dynamic content management, advanced interactions, and CMS-like functionality. It shows how businesses can manage content and data without technical knowledge, with real-time updates and interactive elements that go beyond simple static pages.',
    results: 'A shareable demo that proves our dashboard capabilities while protecting the client\'s confidential production data'
  },
  {
    slug: 'chromattic',
    title: 'Chromattic - Music Band Portfolio',
    package: 'Starter',
    description: 'A stunning music band portfolio showcasing releases, tour dates, and media galleries. Built with clean design and smooth animations to let the music speak for itself.',
    longDescription: 'Chromattic is a professional music band portfolio website that demonstrates the power of the Starter package. The site features a beautiful one-page design with multiple sections including a hero section, releases showcase, tour dates calendar, media gallery, band biography, and contact information. The website is fully responsive, ensuring a perfect experience on all devices from mobile phones to desktop computers.',
    clientType: 'Music Band',
    date: 'DEC 2024',
    liveUrl: 'https://chromattic.rocks',
    githubUrl: 'https://github.com/BeCreativeRuben/Chrommatic',
    keyFeatures: [
      'Responsive one-page design',
      'Music releases showcase',
      'Tour dates calendar',
      'Media gallery (photos & videos)',
      'Band biography section',
      'Contact & social media integration',
      'Smooth scroll animations',
      'SEO optimized'
    ],
    screenshots: [
      '/images/portfolio/chromattic/logo.jpg'
    ],
    packageFitExplanation: 'This project perfectly demonstrates the Starter package capabilities. It showcases how a professional, multi-section website can be built with static pages, responsive design, and simple animations. The site includes all essential features a music band needs: showcasing their work, tour information, and contact details. Built with modern technologies (React, Vite, Tailwind CSS), it proves that Starter package websites can be both beautiful and functional without requiring complex backend systems or advanced features.',
    results: 'Professional online presence for the band with seamless user experience'
  }
]
