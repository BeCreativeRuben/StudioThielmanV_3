# Neon Postgres Migration Guide

## ✅ Migration Complete

Your application has been migrated from SQLite to Neon (Serverless Postgres)!

## 📋 Setup Steps

### 1. Neon Database Setup

✅ **Already Created!** Your Neon database is set up.

### 2. Add Environment Variables to Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add the following from your Neon quickstart:

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

```env
# Neon Database Connection
POSTGRES_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://<user>:<password>@<host>/<db>?sslmode=require
POSTGRES_USER=<user>
POSTGRES_HOST=<host>
POSTGRES_PASSWORD=<password>
POSTGRES_DATABASE=<db>
POSTGRES_PRISMA_URL=postgresql://<user>:<password>@<host>/<db>?connect_timeout=15&sslmode=require

# Existing environment variables (keep these)
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Studio Thielman <contact@yourdomain.com>
RESEND_NOTIFY_EMAIL=you@yourdomain.com
JWT_SECRET=your-secret-key-change-this-in-production
FRONTEND_URL=https://studiothielman.com
```

## 🔐 Security note
Do not commit real database credentials. If credentials were ever committed, **rotate them in Neon** and update Vercel env vars.

**Note:** Vercel automatically adds the Postgres environment variables when you create the database, but make sure they're present in your project settings.

### 4. Deploy

1. Push your code to GitHub (already done ✅)
2. Vercel will automatically redeploy
3. The database schema will be created automatically on first API call

## 🔄 What Changed

### Database Layer
- **Before:** SQLite (`sqlite3` package, file-based)
- **After:** Vercel Postgres (`@vercel/postgres` package, cloud-based)

### Files Updated
- `server/database/postgres.ts` - New PostgreSQL database service
- `server/database/schema.postgres.sql` - PostgreSQL schema
- All API endpoints now use `postgres.js` instead of `db.js`

### Benefits
- ✅ Persistent data (no resets on deployment)
- ✅ Better performance
- ✅ Scalable
- ✅ Reliable connection pooling
- ✅ No native bindings issues

## 🧪 Testing

After deployment:

1. **Test Admin Login:**
   - Go to `https://studiothielman.com/admin`
   - Login with: `admin` / `admin123`
   - Should work without errors

2. **Test Contact Form:**
   - Submit a test form
   - Check admin panel to see the submission

3. **Test Chat Widget:**
   - Send a test message
   - Check admin panel to see the message

## 📊 Database Schema

The following tables are automatically created:
- `submissions` - Contact form submissions
- `chat_messages` - Chat widget messages
- `admin_users` - Admin authentication

## 🔐 Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change the default password after first login!

## 🐛 Troubleshooting

### "Database initialization failed"
- Check that `POSTGRES_URL` is set in Vercel environment variables
- Verify the database was created successfully
- Check Vercel function logs for detailed error messages

### "Connection refused"
- Ensure the database is in the same region as your functions
- Check that the database is not paused (Vercel Postgres can be paused on free tier)

### Schema not created
- The schema is created automatically on first API call
- Check Vercel function logs for any SQL errors
- You can manually run the schema from `server/database/schema.postgres.sql` if needed

## 📚 Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [@vercel/postgres Package](https://www.npmjs.com/package/@vercel/postgres)
