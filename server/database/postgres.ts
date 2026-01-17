import { Pool } from 'pg'

// Create a connection pool (reused across invocations)
let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    // Use POSTGRES_URL from environment (works with Neon, Vercel Postgres, etc.)
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    
    if (!connectionString) {
      const error = new Error('POSTGRES_URL or DATABASE_URL environment variable is required')
      console.error('Database connection error:', error.message)
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE')))
      throw error
    }
    
    console.log('Initializing PostgreSQL connection pool...')
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('sslmode=require') || connectionString.includes('neon.tech') 
        ? { rejectUnauthorized: false } 
        : undefined,
      max: 1, // Serverless-friendly: single connection per function
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err)
      pool = null // Reset pool on error
    })
  }
  
  return pool
}

// Export sql for compatibility
export const sql = {
  query: async (query: string, params: any[] = []) => {
    try {
      const pool = getPool()
      const result = await pool.query(query, params)
      return {
        rows: result.rows,
        rowCount: result.rowCount || 0
      }
    } catch (error: any) {
      console.error('SQL query error:', error.message)
      console.error('Query:', query.substring(0, 100))
      throw error
    }
  }
}

// PostgreSQL schema initialization
const schema = `
-- Submissions table for contact form submissions
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  businessName TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  businessDescription TEXT NOT NULL,
  package TEXT NOT NULL,
  packageOther TEXT,
  hasExistingWebsite TEXT,
  existingWebsiteUrl TEXT,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'scheduled', 'in-progress', 'completed', 'rejected')),
  submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  internalNotes TEXT
);

-- Chat messages table for chatbot
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  sessionId TEXT NOT NULL,
  userName TEXT,
  userEmail TEXT,
  message TEXT NOT NULL,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded INTEGER DEFAULT 0 CHECK(responded IN (0, 1)),
  response TEXT
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  email TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_submittedAt ON submissions(submittedAt);
CREATE INDEX IF NOT EXISTS idx_chat_sessionId ON chat_messages(sessionId);
CREATE INDEX IF NOT EXISTS idx_chat_sentAt ON chat_messages(sentAt);
`

let schemaInitialized = false

export async function initializeDatabase(): Promise<void> {
  if (schemaInitialized) {
    return
  }

  try {
    // Split schema into individual statements and execute them one by one
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql.query(statement + ';')
        } catch (stmtError: any) {
          // Ignore "already exists" errors for tables and indexes
          if (stmtError.message && (
            stmtError.message.includes('already exists') ||
            stmtError.message.includes('duplicate')
          )) {
            console.log('Schema element already exists, skipping:', statement.substring(0, 50))
          } else {
            // Re-throw other errors
            throw stmtError
          }
        }
      }
    }
    
    schemaInitialized = true
    console.log('PostgreSQL schema initialized successfully')
  } catch (error: any) {
    console.error('PostgreSQL schema initialization error:', error)
    console.error('Error details:', error.message, error.stack)
    throw error
  }
}

// Database query methods compatible with SQLite interface
export interface RunResult {
  lastID?: number
  changes?: number
}

export const dbRun = async (query: string, params: any[] = []): Promise<RunResult> => {
  try {
    let pgQuery = query
    const isInsert = pgQuery.trim().toUpperCase().startsWith('INSERT')
    
    // For INSERT queries, add RETURNING id if not already present
    if (isInsert && !pgQuery.toUpperCase().includes('RETURNING')) {
      // Add RETURNING id before semicolon or at the end
      if (pgQuery.includes(';')) {
        pgQuery = pgQuery.replace(';', ' RETURNING id;')
      } else {
        pgQuery = pgQuery + ' RETURNING id'
      }
    }
    
    // Convert SQLite parameter placeholders (?) to PostgreSQL ($1, $2, etc.)
    const converted = convertToPostgresQuery(pgQuery, params)
    const result = await sql.query(converted.query, converted.params)
    
    // For INSERT queries, extract the returned ID
    if (isInsert && result.rows && result.rows.length > 0) {
      return {
        lastID: parseInt(result.rows[0]?.id || '0'),
        changes: result.rowCount || 0
      }
    }
    
    return {
      changes: result.rowCount || 0
    }
  } catch (error: any) {
    console.error('Database run error:', error)
    throw error
  }
}

export const dbGet = async <T = any>(query: string, params: any[] = []): Promise<T | undefined> => {
  try {
    const pgQuery = convertToPostgresQuery(query, params)
    const result = await sql.query(pgQuery.query, pgQuery.params)
    return result.rows[0] as T | undefined
  } catch (error: any) {
    console.error('Database get error:', error)
    throw error
  }
}

export const dbAll = async <T = any>(query: string, params: any[] = []): Promise<T[]> => {
  try {
    const pgQuery = convertToPostgresQuery(query, params)
    const result = await sql.query(pgQuery.query, pgQuery.params)
    return result.rows as T[]
  } catch (error: any) {
    console.error('Database all error:', error)
    throw error
  }
}

// Convert SQLite queries to PostgreSQL format
function convertToPostgresQuery(query: string, params: any[]): { query: string; params: any[] } {
  let pgQuery = query
  const pgParams: any[] = []
  let paramIndex = 1

  // Replace ? placeholders with $1, $2, etc.
  pgQuery = pgQuery.replace(/\?/g, () => {
    pgParams.push(params[paramIndex - 1])
    return `$${paramIndex++}`
  })

  // Convert SQLite-specific syntax to PostgreSQL
  // AUTOINCREMENT -> SERIAL (already handled in schema)
  // DATETIME -> TIMESTAMP (already handled in schema)
  // INTEGER PRIMARY KEY AUTOINCREMENT -> SERIAL PRIMARY KEY (already handled in schema)

  return { query: pgQuery, params: pgParams }
}

// No-op for compatibility (PostgreSQL doesn't need explicit closing)
export function closeDatabase(): Promise<void> {
  return Promise.resolve()
}
