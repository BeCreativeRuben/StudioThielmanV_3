# Neon Database Setup

## ✅ Database Created

Your Neon database has been created and is ready to use!

## 🔧 Environment Variables

Add these environment variables to **Vercel Dashboard → Your Project → Settings → Environment Variables**:

```env
# Neon Database Connection (Primary - with connection pooling)
POSTGRES_URL=postgresql://neondb_owner:npg_Q5kHBRAf1mOd@ep-purple-snow-agroupoz-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Non-pooling connection (for migrations, etc.)
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_Q5kHBRAf1mOd@ep-purple-snow-agroupoz.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Individual connection parameters
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-purple-snow-agroupoz-pooler.c-2.eu-central-1.aws.neon.tech
POSTGRES_PASSWORD=npg_Q5kHBRAf1mOd
POSTGRES_DATABASE=neondb

# Prisma URL (if using Prisma)
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
