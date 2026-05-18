import { getBlogPostBySlug } from '../data/blog'
import { getPortfolioItemBySlug } from '../data/portfolio'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from './site'

export interface PageSeoMeta {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
}

const titleSuffix = ` | ${SITE_NAME}`

function pageTitle(primary: string): string {
  return `${primary}${titleSuffix}`
}

const staticRoutes: Record<string, Omit<PageSeoMeta, 'path'>> = {
  '/': {
    title: pageTitle(SITE_TAGLINE),
    description: DEFAULT_DESCRIPTION,
  },
  '/packages': {
    title: pageTitle('Website Packages & Pricing'),
    description:
      'Compare Starter, Growth, and Pro Max website packages. Transparent pricing from €25/month for Belgian businesses.',
  },
  '/portfolio': {
    title: pageTitle('Portfolio & Case Studies'),
    description:
      'Explore websites built by Studio Thielman: portals, booking systems, portfolios, and platforms for clients across Belgium.',
  },
  '/blog': {
    title: pageTitle('Blog & Insights'),
    description:
      'Practical articles on web design, SEO, AI, and online visibility for entrepreneurs and SMEs in Belgium.',
  },
  '/current-projects': {
    title: pageTitle('Current Projects'),
    description:
      'See what Studio Thielman is building now - active client work, experiments, and upcoming launches.',
  },
  '/how-it-works': {
    title: pageTitle('How It Works'),
    description:
      'Our step-by-step process from discovery call to launch: strategy, design, development, and ongoing support.',
  },
  '/about': {
    title: pageTitle('About Us'),
    description:
      'Meet Studio Thielman - a Belgian web studio focused on professional, accessible, and results-driven websites.',
  },
  '/contact': {
    title: pageTitle('Contact'),
    description:
      'Book a free discovery call or send a message. Tell us about your business and the website you need.',
  },
  '/privacy': {
    title: pageTitle('Privacy Policy'),
    description: 'How Studio Thielman collects, uses, and protects your personal data.',
  },
  '/terms': {
    title: pageTitle('Terms of Service'),
    description: 'Terms and conditions for Studio Thielman website and service offerings.',
  },
  '/admin': {
    title: pageTitle('Admin'),
    description: 'Studio Thielman admin area.',
    noindex: true,
  },
}

export function resolvePageSeo(pathname: string): PageSeoMeta {
  const path = pathname.replace(/\/+$/, '') || '/'

  const portfolioMatch = path.match(/^\/portfolio\/([^/]+)$/)
  if (portfolioMatch) {
    const slug = portfolioMatch[1]
    const project = getPortfolioItemBySlug(slug)
    if (project && !project.comingSoon) {
      return {
        path,
        title: pageTitle(project.title),
        description: project.description,
        ogImage: project.screenshots[0]?.startsWith('http')
          ? project.screenshots[0]
          : undefined,
      }
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]
    const post = getBlogPostBySlug(slug)
    if (post) {
      return {
        path,
        title: pageTitle(post.title),
        description: post.excerpt,
        ogImage: post.featuredImage,
      }
    }
  }

  const staticRoute = staticRoutes[path]
  if (staticRoute) {
    return { path, ...staticRoute }
  }

  return {
    path,
    title: pageTitle(SITE_TAGLINE),
    description: DEFAULT_DESCRIPTION,
    noindex: true,
  }
}
