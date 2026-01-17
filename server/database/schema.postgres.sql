-- PostgreSQL Schema for Studio Thielman
-- This schema is automatically applied via postgres.ts

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
