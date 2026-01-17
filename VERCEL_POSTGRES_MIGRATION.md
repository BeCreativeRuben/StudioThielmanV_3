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
POSTGRES_URL=postgresql://neondb_owner:npg_Q5kHBRAf1mOd@ep-purple-snow-agroupoz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_Q5kHBRAf1mOd@ep-purple-snow-agroupoz.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-purple-snow-agroupoz-pooler.c-2.eu-central-1.aws.neon.tech
POSTGRES_PASSWORD=npg_Q5kHBRAf1mOd
POSTGRES_DATABASE=neondb
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_Q5kHBRAf1mOd@ep-purple-snow-agroupoz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

# Existing environment variables (keep these)
MAILCHIMP_API_KEY=your-mailchimp-api-key-here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your-mailchimp-audience-id-here
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
JWT_SECRET=your-secret-key-change-this-in-production
FRONTEND_URL=https://studiothielman.com
```

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
