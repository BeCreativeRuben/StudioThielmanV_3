import React, { startTransition } from 'react'
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
    // Hydrate as a transition so React yields to the browser between chunks instead of one long task.
    startTransition(() => {
      hydrateRoot(rootEl, app)
    })
  } else {
    createRoot(rootEl).render(app)
  }
})
