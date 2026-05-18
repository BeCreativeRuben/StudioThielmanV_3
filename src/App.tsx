import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import SeoRouteSync from './components/SeoRouteSync'
import CookieConsentBanner from './components/CookieConsentBanner'
import { LocaleProvider } from './i18n/LocaleProvider'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import CurrentProjects from './pages/CurrentProjects'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'

function MainLayout({ children }: { children: React.ReactNode }) {
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
  { path: '/', element: <Home /> },
  { path: '/packages', element: <Packages /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/portfolio/:slug', element: <PortfolioDetail /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <BlogDetail /> },
  { path: '/current-projects', element: <CurrentProjects /> },
  { path: '/how-it-works', element: <HowItWorks /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
] as const

function App() {
  return (
    <Router>
      <LocaleProvider>
        <ScrollToTop />
        <SeoRouteSync />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<MainLayout>{element}</MainLayout>}
            />
          ))}
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={`nl-${path}`}
              path={path === '/' ? '/nl' : `/nl${path}`}
              element={<MainLayout>{element}</MainLayout>}
            />
          ))}
        </Routes>
      </LocaleProvider>
    </Router>
  )
}

export default App
