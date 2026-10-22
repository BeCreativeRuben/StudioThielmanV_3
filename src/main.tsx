import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { preloadPath } from './routePages'
import './index.css'

const rootEl = document.getElementById('root')!

preloadPath(window.location.pathname).then(() => {
  const app = (
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  )

  if (rootEl.hasChildNodes()) {
    hydrateRoot(rootEl, app)
  } else {
    createRoot(rootEl).render(app)
  }
})
