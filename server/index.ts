import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDatabase } from './database/db.js'
import submissionsRouter from './routes/submissions.js'
import chatRouter from './routes/chat.js'
import adminRouter, { initializeAdminUser } from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize database
initializeDatabase().then(async () => {
  console.log('Database initialized successfully')
  // Initialize admin user after database is ready
  await initializeAdminUser()
}).catch((error) => {
  console.error('Database initialization failed:', error)
  process.exit(1)
})

// Routes
app.use('/api/submissions', submissionsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/admin', adminRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
