import { Suspense, type ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SeoRouteSync from './components/SeoRouteSync'
import CookieConsentBanner from './components/CookieConsentBanner'
import { pages } from './routePages'

const AdminPage = pages.admin
const AiTalksPage = pages.aiTalks
const GroupWorkshopPage = pages.groupWorkshop
const MasterclassPage = pages.masterclass
const HackersPage = pages.hackers
const NotFoundPage = pages.notFound

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieConsentBanner />
    </div>
  )
}

const publicRoutes = [
  { path: '/', Page: pages.home },
  { path: '/packages', Page: pages.packages },
  { path: '/portfolio', Page: pages.portfolio },
  { path: '/portfolio/:slug', Page: pages.portfolioDetail },
  { path: '/blog', Page: pages.blog },
  { path: '/blog/:slug', Page: pages.blogDetail },
  { path: '/current-projects', Page: pages.currentProjects },
  { path: '/how-it-works', Page: pages.howItWorks },
  { path: '/reviews', Page: pages.reviews },
  { path: '/about', Page: pages.about },
  { path: '/contact', Page: pages.contact },
  { path: '/workshops', Page: pages.workshops },
  { path: '/workshops/incompany', Page: pages.workshopsIncompany },
  { path: '/workshops/1-1', Page: pages.workshopsOneOnOne },
  { path: '/privacy', Page: pages.privacy },
  { path: '/terms', Page: pages.terms },
] as const

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ScrollToTop />
      <SeoRouteSync />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ai-talks" element={<AiTalksPage />} />
        <Route path="/nl/ai-talks" element={<AiTalksPage />} />
        <Route path="/group-workshop" element={<GroupWorkshopPage />} />
        <Route path="/nl/groepsworkshop" element={<GroupWorkshopPage />} />
        <Route path="/ai-masterclass" element={<MasterclassPage />} />
        <Route path="/nl/masterclass-ai" element={<MasterclassPage />} />
        <Route
          path="/hackers-and-ravers"
          element={
            <MainLayout>
              <HackersPage />
            </MainLayout>
          }
        />
        <Route
          path="/nl/hackers-and-ravers"
          element={
            <MainLayout>
              <HackersPage />
            </MainLayout>
          }
        />
        {publicRoutes.map(({ path, Page }) => (
          <Route key={path} path={path} element={<MainLayout><Page /></MainLayout>} />
        ))}
        {publicRoutes.map(({ path, Page }) => (
          <Route
            key={`nl-${path}`}
            path={path === '/' ? '/nl' : `/nl${path}`}
            element={<MainLayout><Page /></MainLayout>}
          />
        ))}
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
      </Routes>
    </Suspense>
  )
}
