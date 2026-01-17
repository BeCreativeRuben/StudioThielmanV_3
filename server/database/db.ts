import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import { readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getDbPath(): string {
  // Use environment variable if set, otherwise default
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH
  }
  return join(__dirname, 'submissions.db')
}

let db: sqlite3.Database | null = null

export function getDatabase(): sqlite3.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.')
  }
  return db
}

export async function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const dbPath = getDbPath()
    
    // Ensure directory exists (for /tmp or custom paths)
    try {
      const dbDir = dirname(dbPath)
      if (dbDir && dbDir !== '.' && dbDir !== '/') {
        mkdirSync(dbDir, { recursive: true })
      }
    } catch (dirError: any) {
      // Ignore errors if directory already exists
      if (dirError.code !== 'EEXIST') {
        console.warn('Could not create database directory:', dirError.message)
      }
    }
    
    // Open database with WAL mode for better concurrency
    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.error('Database open error:', err)
        reject(err)
        return
      }
      
      // Enable foreign keys
      db!.run('PRAGMA foreign_keys = ON', (err) => {
        if (err) {
          reject(err)
          return
        }
        
        // Read and execute schema
        const schemaPath = join(__dirname, 'schema.sql')
        const schema = readFileSync(schemaPath, 'utf-8')
        
        db!.exec(schema, (err) => {
          if (err) {
            // Ignore "table already exists" errors (schema might have been run before)
            if (err.message && err.message.includes('already exists')) {
              console.log('Database schema already initialized')
              resolve()
            } else {
              reject(err)
            }
          } else {
            resolve()
          }
        })
      })
    })
  })
}

// Promisified database methods
export const dbRun = (query: string, params: any[] = []): Promise<sqlite3.RunResult> => {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.run(query, params, function(err) {
      if (err) reject(err)
      else resolve(this)
    })
  })
}

export const dbGet = <T = any>(query: string, params: any[] = []): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.get(query, params, (err, row) => {
      if (err) reject(err)
      else resolve(row as T)
    })
  })
}

export const dbAll = <T = any>(query: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const database = getDatabase()
    database.all(query, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows as T[])
    })
  })
}

export function closeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) reject(err)
        else {
          db = null
          resolve()
        }
      })
    } else {
      resolve()
    }
  })
}
