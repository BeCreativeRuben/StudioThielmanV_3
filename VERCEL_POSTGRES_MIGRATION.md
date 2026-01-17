# Vercel Postgres Migration Guide

## ✅ Migration Complete

Your application has been migrated from SQLite to Vercel Postgres!

## 📋 Setup Steps

### 1. Create Vercel Postgres Database

1. Go to your Vercel Dashboard
2. Navigate to your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `studio-thielman-db`)
7. Select a region (choose closest to your users)
8. Click **Create**

### 2. Get Connection String

After creating the database:
1. Click on your database
2. Go to the **.env.local** tab
3. Copy the `POSTGRES_URL` connection string
4. You'll also see:
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Add Environment Variables to Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

```env
# Vercel Postgres (automatically added when you create the database)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...

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
