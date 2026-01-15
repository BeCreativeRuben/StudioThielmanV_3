-- Submissions table for contact form submissions
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  internalNotes TEXT
);

-- Chat messages table for chatbot
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sessionId TEXT NOT NULL,
  userName TEXT,
  userEmail TEXT,
  message TEXT NOT NULL,
  sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded INTEGER DEFAULT 0 CHECK(responded IN (0, 1)),
  response TEXT
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  email TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_submittedAt ON submissions(submittedAt);
CREATE INDEX IF NOT EXISTS idx_chat_sessionId ON chat_messages(sessionId);
CREATE INDEX IF NOT EXISTS idx_chat_sentAt ON chat_messages(sentAt);
