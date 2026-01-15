# Vercel Deployment Guide

This guide explains how to deploy the Studio Thielman website to Vercel.

## Project Structure

- **Frontend**: Vite + React (root directory)
- **Backend**: Express API server (`server/` directory)

## Deployment Options

### Option 1: Frontend Only (Recommended for Quick Start)

If you only need the frontend deployed initially:

1. **Vercel Configuration**: The `vercel.json` is already configured for Vite
2. **Build Settings**: 
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `./` (current directory)

3. **Environment Variables** (in Vercel Dashboard):
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Option 2: Full Stack (Frontend + Backend)

For deploying both frontend and backend on Vercel, you'll need to convert Express routes to Vercel serverless functions. This requires additional setup.

**Note**: Vercel serverless functions have limitations:
- SQLite databases may not persist (consider using a cloud database)
- File system is read-only except `/tmp`
- Cold starts can add latency

## Required Environment Variables

Add these in your Vercel project settings (Settings → Environment Variables):

### Frontend Variables
```
VITE_API_URL=https://your-vercel-app.vercel.app/api
```

### Backend Variables (if deploying backend)
```
PORT=3001
DATABASE_PATH=/tmp/submissions.db
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-hashed-password
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `BeCreativeRuben/StudioThielmanV_3`
4. Vercel will auto-detect Vite

### 2. Configure Build Settings

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3. Add Environment Variables

Go to **Settings → Environment Variables** and add:

```
VITE_API_URL=https://your-backend-url.com/api
```

If deploying backend on Vercel, also add the backend variables listed above.

### 4. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies (`npm install`)
2. Build the project (`npm run build`)
3. Deploy to a production URL

## Backend Deployment Options

### Option A: Deploy Backend Separately (Recommended)

Deploy your Express backend to:
- **Railway** (railway.app) - Easy SQLite support
- **Render** (render.com) - Free tier available
- **Fly.io** (fly.io) - Good for persistent storage
- **Heroku** (heroku.com) - Traditional option

Then set `VITE_API_URL` in Vercel to point to your backend.

### Option B: Convert to Vercel Serverless Functions

This requires restructuring your Express routes. See `server/README.md` for API structure.

## Post-Deployment Checklist

- [ ] Verify frontend loads correctly
- [ ] Test contact form submission
- [ ] Test chatbot functionality
- [ ] Verify API endpoints are accessible
- [ ] Check CORS settings match your frontend URL
- [ ] Test admin panel login
- [ ] Verify email notifications work

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 20.x by default)
- Check build logs in Vercel dashboard

### API Calls Fail
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend is deployed and accessible

### Environment Variables Not Working
- Variables must start with `VITE_` to be accessible in frontend
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

## Custom Domain

1. Go to **Settings → Domains** in Vercel
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificates are automatically provisioned

## Continuous Deployment

Vercel automatically deploys on every push to your main branch. For other branches, it creates preview deployments.
