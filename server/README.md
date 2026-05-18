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
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Studio Thielman <contact@yourdomain.com>
RESEND_NOTIFY_EMAIL=you@yourdomain.com
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hashed-password-here
FRONTEND_URL=http://localhost:5173
```

See [RESEND_SETUP.md](./RESEND_SETUP.md) for Resend domain verification and API key setup.

**Important Notes:**

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

When a new form submission or chat message is received, Resend sends:

1. A notification to `RESEND_NOTIFY_EMAIL` (with `replyTo` set to the visitor)
2. An auto-reply thank-you email to the visitor

## Troubleshooting

**Database errors:** Ensure the `server/database/` directory exists and is writable.

**Email not sending:** See [RESEND_SETUP.md](./RESEND_SETUP.md). Confirm `RESEND_API_KEY`, `RESEND_FROM`, and `RESEND_NOTIFY_EMAIL` are set and your domain is verified in Resend.

**CORS errors:** Update `FRONTEND_URL` in `.env` to match your frontend URL.
