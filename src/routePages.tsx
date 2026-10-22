import { type ComponentType } from 'react'
import { stripLocalePrefix } from './i18n/paths'

type Loader = () => Promise<{ default: ComponentType }>

const cache = new Map<string, ComponentType>()

export function registerPage(id: string, component: ComponentType) {
  cache.set(id, component)
}

function createRoute(id: string, loader: Loader) {
  function RoutePage() {
    const Comp = cache.get(id)
    if (!Comp) {
      throw loader().then((mod) => {
        cache.set(id, mod.default)
      })
    }
    return <Comp />
  }

  RoutePage.preload = async () => {
    if (cache.has(id)) return
    const mod = await loader()
    cache.set(id, mod.default)
  }

  return RoutePage
}

export const pages = {
  home: createRoute('home', () => import('./pages/Home')),
  packages: createRoute('packages', () => import('./pages/Packages')),
  portfolio: createRoute('portfolio', () => import('./pages/Portfolio')),
  portfolioDetail: createRoute('portfolioDetail', () => import('./pages/PortfolioDetail')),
  blog: createRoute('blog', () => import('./pages/Blog')),
  blogDetail: createRoute('blogDetail', () => import('./pages/BlogDetail')),
  currentProjects: createRoute('currentProjects', () => import('./pages/CurrentProjects')),
  howItWorks: createRoute('howItWorks', () => import('./pages/HowItWorks')),
  reviews: createRoute('reviews', () => import('./pages/Reviews')),
  about: createRoute('about', () => import('./pages/About')),
  contact: createRoute('contact', () => import('./pages/Contact')),
  privacy: createRoute('privacy', () => import('./pages/Privacy')),
  terms: createRoute('terms', () => import('./pages/Terms')),
  admin: createRoute('admin', () => import('./pages/Admin')),
  hackers: createRoute('hackers', () => import('./pages/HackersAndRavers')),
  aiTalks: createRoute('aiTalks', () => import('./pages/AiTalks')),
  groupWorkshop: createRoute('groupWorkshop', () => import('./pages/GroupWorkshop')),
  masterclass: createRoute('masterclass', () => import('./pages/Masterclass')),
  notFound: createRoute('notFound', () => import('./pages/NotFound')),
}

export type PageId = keyof typeof pages

export function pageIdForPath(pathname: string): PageId {
  const path = stripLocalePrefix(pathname.split('?')[0].split('#')[0])
  if (path === '/') return 'home'
  if (path === '/packages') return 'packages'
  if (path === '/portfolio') return 'portfolio'
  if (path.startsWith('/portfolio/')) return 'portfolioDetail'
  if (path === '/blog') return 'blog'
  if (path.startsWith('/blog/')) return 'blogDetail'
  if (path === '/current-projects') return 'currentProjects'
  if (path === '/how-it-works') return 'howItWorks'
  if (path === '/reviews') return 'reviews'
  if (path === '/about') return 'about'
  if (path === '/contact') return 'contact'
  if (path === '/privacy') return 'privacy'
  if (path === '/terms') return 'terms'
  if (path === '/admin') return 'admin'
  if (path === '/hackers-and-ravers') return 'hackers'
  if (path === '/ai-talks') return 'aiTalks'
  if (path === '/group-workshop') return 'groupWorkshop'
  if (path === '/ai-masterclass') return 'masterclass'
  return 'notFound'
}

export function preloadPath(pathname: string) {
  return pages[pageIdForPath(pathname)].preload()
}
