import { sql } from '@vercel/postgres'

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
    // Execute schema (PostgreSQL will ignore IF NOT EXISTS for tables that already exist)
    await sql.query(schema)
    schemaInitialized = true
    console.log('PostgreSQL schema initialized successfully')
  } catch (error: any) {
    // Ignore "already exists" errors
    if (error.message && error.message.includes('already exists')) {
      console.log('PostgreSQL schema already initialized')
      schemaInitialized = true
    } else {
      console.error('PostgreSQL schema initialization error:', error)
      throw error
    }
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
