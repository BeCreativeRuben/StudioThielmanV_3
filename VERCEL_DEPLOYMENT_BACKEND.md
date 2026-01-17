# Vercel Backend Deployment Guide

## ✅ What's Been Set Up

Your backend is now configured as Vercel serverless functions! All API routes have been converted to work on Vercel.

## 📁 Structure

- `api/` - Vercel serverless functions
  - `api/submissions/` - Contact form endpoints
  - `api/chat/messages/` - Chat widget endpoints  
  - `api/admin/` - Admin panel endpoints
  - `api/health.ts` - Health check endpoint

## 🔧 Environment Variables Needed in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables** and add:

### Required Variables:
```env
# Mailchimp
MAILCHIMP_API_KEY=your-mailchimp-api-key-here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your-mailchimp-audience-id-here

# Gmail (for sending emails)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# JWT Secret (for admin authentication)
JWT_SECRET=your-secret-key-change-this-in-production

# Frontend URL (your Vercel domain)
FRONTEND_URL=https://your-app.vercel.app

# Database (optional - defaults to /tmp)
DATABASE_PATH=/tmp/submissions.db
```

## ⚠️ Important Notes

### SQLite Database Limitation
- SQLite database is stored in `/tmp` on Vercel
- **Data will be reset on each deployment** (this is a Vercel limitation)
- For production, consider migrating to:
  - **Vercel Postgres** (recommended)
  - **Supabase** (free tier available)
  - **PlanetScale** (MySQL)
  - **Railway** or **Render** (for persistent SQLite)

### Current Setup
- ✅ Works for testing and development
- ✅ All API endpoints functional
- ✅ Email notifications working
- ✅ Mailchimp integration working
- ⚠️ Database resets on deploy (use cloud DB for production)

## 🚀 Deployment Steps

1. **Push to GitHub** (already done ✅)

2. **Vercel will auto-deploy** when you push

3. **Add Environment Variables** in Vercel dashboard:
   - Go to your project settings
   - Add all variables listed above
   - **Redeploy** after adding variables

4. **Test the deployment**:
   - Visit `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`
   - Test form submission
   - Test chat widget

## 🔍 Testing API Endpoints

After deployment, test these URLs:
- `https://your-app.vercel.app/api/health` - Health check
- `https://your-app.vercel.app/api/submissions` - POST form submission
- `https://your-app.vercel.app/api/chat/messages` - POST chat message
- `https://your-app.vercel.app/api/admin/login` - POST admin login

## 📝 Next Steps for Production

1. **Migrate to Cloud Database** (recommended):
   - Set up Vercel Postgres or Supabase
   - Update database connection in `server/database/db.ts`
   - Update environment variables

2. **Monitor Logs**:
   - Check Vercel dashboard → Functions → Logs
   - Monitor for any errors

3. **Set up Custom Domain** (optional):
   - Add domain in Vercel settings
   - Update `FRONTEND_URL` environment variable

## 🐛 Troubleshooting

### API returns 500 errors
- Check Vercel function logs
- Verify all environment variables are set
- Check database initialization

### Emails not sending
- Verify Gmail credentials
- Check Mailchimp API key
- Review function logs for errors

### CORS errors
- Verify `FRONTEND_URL` matches your Vercel domain
- Check browser console for specific errors
