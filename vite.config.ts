import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In production on Vercel the frontend and the `/api/*` serverless
    // functions are served from the same origin. Locally the API runs as a
    // separate Express server (see `server/`), so proxy relative `/api`
    // requests to it to reproduce the same-origin behaviour during dev.
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
