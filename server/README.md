# Studio Thielman Backend

Custom backend implementation for form submissions, chatbot messages, and admin panel.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=3001
DATABASE_PATH=./server/database/submissions.db
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hashed-password-here
FRONTEND_URL=http://localhost:5173

# Mailchimp Configuration (for contact management and auto-replies)
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your-audience-id-here
```

**Important Notes:**

- **Gmail App Password**: To get a Gmail app password:
  1. Go to your Google Account settings
  2. Enable 2-Step Verification
  3. Go to App Passwords
  4. Generate a new app password for "Mail"
  5. Use this password (not your regular Gmail password) in `GMAIL_APP_PASSWORD`

- **Admin Password**: The admin password should be hashed using bcrypt. You can use the included script or hash it manually:
  ```bash
  node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash));"
  ```

- **JWT Secret**: Use a strong random string for production. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### 3. Initialize Admin User

The admin user will be automatically created on first server start if it doesn't exist. If no `ADMIN_PASSWORD_HASH` is provided, a default admin user will be created with:
- Username: `admin`
- Password: `admin123`

**⚠️ Change the default password immediately after first login!**

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

## API Endpoints

### Form Submissions

- `POST /api/submissions` - Submit contact form (public)
- `GET /api/submissions` - Get all submissions (admin only)
- `GET /api/submissions/:id` - Get single submission (admin only)
- `PATCH /api/submissions/:id` - Update submission (admin only)

### Chatbot

- `POST /api/chat/messages` - Send chatbot message (public)
- `GET /api/chat/messages` - Get all messages (admin only)
- `GET /api/chat/sessions/:sessionId` - Get messages for a session (admin only)

### Admin

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/stats` - Dashboard statistics (admin only)

### Health Check

- `GET /health` - Server health check

## Frontend Configuration

Add to your frontend `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

## Database

The SQLite database is automatically created on first run at `server/database/submissions.db`.

**Backup:** Simply copy the `.db` file to backup your data.

**Reset:** Delete the `.db` file and restart the server to recreate the database.

## Security Features

- Rate limiting on form submissions (5 per 15 minutes)
- Rate limiting on chat messages (10 per minute)
- Rate limiting on login attempts (5 per 15 minutes)
- JWT authentication for admin routes
- Input validation and sanitization
- CORS protection

## Email Notifications

When a new form submission is received, an email notification is sent to the address specified in `GMAIL_USER`. The email includes all submission details and the reply-to is set to the submitter's email for easy response.

## Troubleshooting

**Database errors:** Ensure the `server/database/` directory exists and is writable.

**Email not sending:** 
- Verify Gmail app password is correct
- Check that 2-Step Verification is enabled
- Ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set correctly

**CORS errors:** Update `FRONTEND_URL` in `.env` to match your frontend URL.
