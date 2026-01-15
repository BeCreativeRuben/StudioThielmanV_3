import express from 'express'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import { dbRun, dbGet, dbAll } from '../database/db.js'
import { authenticateToken, generateToken } from '../middleware/auth.js'

const router = express.Router()

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.'
})

// POST /api/admin/login - Admin authentication
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    // Get admin user
    const admin = await dbGet<{ id: number; username: string; passwordHash: string }>(
      'SELECT id, username, passwordHash FROM admin_users WHERE username = ?',
      [username]
    )

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, admin.passwordHash)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(admin.id, admin.username)

    res.json({
      success: true,
      token,
      username: admin.username
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/admin/stats - Dashboard statistics (admin only)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get submission stats
    const totalSubmissions = await dbGet<{ count: number }>(
      'SELECT COUNT(*) as count FROM submissions'
    )

    const newSubmissions = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM submissions WHERE status = 'new'"
    )

    // Get chat stats
    const totalMessages = await dbGet<{ count: number }>(
      'SELECT COUNT(*) as count FROM chat_messages'
    )

    const unreadMessages = await dbGet<{ count: number }>(
      'SELECT COUNT(*) as count FROM chat_messages WHERE responded = 0'
    )

    // Get recent submissions (last 7 days)
    const recentSubmissions = await dbGet<{ count: number }>(
      `SELECT COUNT(*) as count FROM submissions 
       WHERE submittedAt >= datetime('now', '-7 days')`
    )

    res.json({
      submissions: {
        total: totalSubmissions?.count || 0,
        new: newSubmissions?.count || 0,
        recent: recentSubmissions?.count || 0
      },
      chat: {
        total: totalMessages?.count || 0,
        unread: unreadMessages?.count || 0
      }
    })
  } catch (error: any) {
    console.error('Stats error:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
})

// Initialize admin user if it doesn't exist
async function initializeAdminUser(): Promise<void> {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

    // Check if admin exists
    const existing = await dbGet('SELECT id FROM admin_users WHERE username = ?', [adminUsername])

    if (!existing && adminPasswordHash) {
      // Create default admin user
      await dbRun(
        'INSERT INTO admin_users (username, passwordHash, email) VALUES (?, ?, ?)',
        [adminUsername, adminPasswordHash, process.env.GMAIL_USER || '']
      )
      console.log('Default admin user created')
    } else if (!existing) {
      // Create admin with default password if no hash provided
      const defaultPassword = 'admin123'
      const hash = await bcrypt.hash(defaultPassword, 10)
      await dbRun(
        'INSERT INTO admin_users (username, passwordHash, email) VALUES (?, ?, ?)',
        [adminUsername, hash, process.env.GMAIL_USER || '']
      )
      console.log(`Default admin user created with username: ${adminUsername}, password: ${defaultPassword}`)
      console.log('⚠️  Please change the default password after first login!')
    }
  } catch (error) {
    console.error('Failed to initialize admin user:', error)
  }
}

export default router

// Export the initialization function so it can be called after database is ready
export { initializeAdminUser }
