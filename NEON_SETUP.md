# Neon Database Setup

## ✅ Database Created

Your Neon database has been created and is ready to use!

## 🔧 Environment Variables

Add these environment variables to **Vercel Dashboard → Your Project → Settings → Environment Variables**:

```env
# Neon Database Connection (Primary - with connection pooling)
POSTGRES_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require

# Non-pooling connection (for migrations, etc.)
POSTGRES_URL_NON_POOLING=postgresql://<user>:<password>@<host>/<db>?sslmode=require

# Individual connection parameters
POSTGRES_USER=<user>
POSTGRES_HOST=<host>
POSTGRES_PASSWORD=<password>
POSTGRES_DATABASE=<db>

# Prisma URL (if using Prisma)
POSTGRES_PRISMA_URL=postgresql://<user>:<password>@<host>/<db>?connect_timeout=15&sslmode=require

# Existing environment variables (keep these)
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Studio Thielman <contact@yourdomain.com>
RESEND_NOTIFY_EMAIL=you@yourdomain.com
JWT_SECRET=your-secret-key-change-this-in-production
FRONTEND_URL=https://studiothielman.com
```

## 🔐 Security note
Never commit real database URLs/passwords to git. If credentials were previously committed, **rotate them in Neon immediately** and treat them as leaked.

## 🚀 Next Steps

1. **Add Environment Variables to Vercel:**
   - Copy all the `POSTGRES_*` variables above
   - Paste them into Vercel's environment variables
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

2. **Deploy:**
   - The code is already updated to use Neon
   - Push to GitHub (or it's already pushed)
   - Vercel will automatically redeploy

3. **Test:**
   - After deployment, test the admin login at `/admin`
   - Submit a test contact form
   - Send a test chat message

## 📊 Database Schema

The schema will be automatically created on the first API call. Tables:
- `submissions` - Contact form submissions
- `chat_messages` - Chat widget messages  
- `admin_users` - Admin authentication

## 🔐 Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Change the default password after first login!**

## 🐛 Troubleshooting

### Connection Issues
- Verify all environment variables are set in Vercel
- Check that the connection string is correct
- Ensure SSL mode is set to `require`

### Schema Not Created
- The schema is created automatically on first API call
- Check Vercel function logs for any errors
- You can manually run the schema from `server/database/schema.postgres.sql` if needed
