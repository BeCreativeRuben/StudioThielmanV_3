/**
 * Static page registry for the prerender bundle only.
 * Importing this from the client would defeat route code-splitting.
 */
import { registerPage } from './routePages'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Websites from './pages/Websites'
import Workshops from './pages/Workshops'
import StartUps from './pages/StartUps'
import Platforms from './pages/Platforms'
import AiAgents from './pages/AiAgents'
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import CurrentProjects from './pages/CurrentProjects'
import HowItWorks from './pages/HowItWorks'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'
import HackersAndRavers from './pages/HackersAndRavers'
import AiTalks from './pages/AiTalks'
import GroupWorkshop from './pages/GroupWorkshop'
import Masterclass from './pages/Masterclass'
import NotFound from './pages/NotFound'

registerPage('home', Home)
registerPage('packages', Packages)
registerPage('websites', Websites)
registerPage('workshops', Workshops)
registerPage('startUps', StartUps)
registerPage('platforms', Platforms)
registerPage('aiAgents', AiAgents)
registerPage('portfolio', Portfolio)
registerPage('portfolioDetail', PortfolioDetail)
registerPage('blog', Blog)
registerPage('blogDetail', BlogDetail)
registerPage('currentProjects', CurrentProjects)
registerPage('howItWorks', HowItWorks)
registerPage('reviews', Reviews)
registerPage('about', About)
registerPage('contact', Contact)
registerPage('privacy', Privacy)
registerPage('terms', Terms)
registerPage('admin', Admin)
registerPage('hackers', HackersAndRavers)
registerPage('aiTalks', AiTalks)
registerPage('groupWorkshop', GroupWorkshop)
registerPage('masterclass', Masterclass)
registerPage('notFound', NotFound)
