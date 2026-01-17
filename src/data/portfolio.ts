export interface PortfolioItem {
  slug: string
  title: string
  package: 'Starter' | 'Growth' | 'Pro Max'
  description: string
  longDescription: string
  clientType: string
  date: string
  liveUrl: string
  githubUrl?: string
  keyFeatures: string[]
  screenshots: string[]
  packageFitExplanation: string
  comingSoon?: boolean
  results?: string
}

export const portfolioItems: PortfolioItem[] = [
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
  },
  {
    slug: 'battle-dashboard',
    title: 'BattleDashboard - Custom Dashboard with Admin Panel',
    package: 'Growth',
    description: 'A comprehensive custom dashboard solution with advanced admin panel, statistics tracking, and dynamic data visualization. Perfect for businesses needing internal tools and analytics.',
    longDescription: 'BattleDashboard is a sophisticated internal dashboard application that showcases the capabilities of the Growth package. The system features a fully functional admin panel with user management, comprehensive statistics tracking, and dynamic data visualization. The dashboard provides real-time insights and analytics, making it an essential tool for businesses that need to monitor performance, manage users, and make data-driven decisions.',
    clientType: 'Internal Tool',
    date: 'JAN 2025',
    liveUrl: 'https://becreativeruben.github.io/BattleDashboard_DEMO/',
    githubUrl: 'https://github.com/BeCreativeRuben/BattleDashboard_DEMO',
    keyFeatures: [
      'Admin panel with user management',
      'Statistics dashboard',
      'Dynamic data visualization',
      'Real-time analytics',
      'Interactive charts and graphs',
      'User authentication system',
      'Responsive admin interface',
      'Data export capabilities'
    ],
    screenshots: [
      '/images/portfolio/battle-dashboard/banner.png'
    ],
    packageFitExplanation: 'This project exemplifies the Growth package by demonstrating dynamic content management, advanced interactions, and CMS-like functionality. The admin panel showcases how businesses can manage their own content and data without technical knowledge. The statistics dashboard and data visualization features show the power of interactive elements and real-time updates. This type of project requires the advanced features available in the Growth package, including dynamic website capabilities, complex animations, and interactive elements that go beyond simple static pages.',
    results: 'Streamlined internal operations with comprehensive analytics and user management'
  },
  {
    slug: 'starter-coming-soon-1',
    title: 'Starter Project - Coming Soon',
    package: 'Starter',
    description: 'Another exciting Starter package project is in development. Check back soon to see more examples of our work.',
    longDescription: 'We are currently working on additional Starter package projects that will showcase the versatility and quality of our Starter tier offerings.',
    clientType: 'Coming Soon',
    date: 'TBD',
    liveUrl: '#',
    keyFeatures: [],
    screenshots: [],
    packageFitExplanation: '',
    comingSoon: true
  },
  {
    slug: 'growth-coming-soon-1',
    title: 'Growth Project - Coming Soon',
    package: 'Growth',
    description: 'Another impressive Growth package project is in development. Check back soon to see more examples of our advanced solutions.',
    longDescription: 'We are currently working on additional Growth package projects that will demonstrate the full range of capabilities available in our Growth tier.',
    clientType: 'Coming Soon',
    date: 'TBD',
    liveUrl: '#',
    keyFeatures: [],
    screenshots: [],
    packageFitExplanation: '',
    comingSoon: true
  }
]

export const getPortfolioItemBySlug = (slug: string): PortfolioItem | undefined => {
  return portfolioItems.find(item => item.slug === slug)
}
