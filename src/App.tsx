import { BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from './i18n/LocaleProvider'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <Router>
      <LocaleProvider>
        <AppRoutes />
      </LocaleProvider>
    </Router>
  )
}

export default App
