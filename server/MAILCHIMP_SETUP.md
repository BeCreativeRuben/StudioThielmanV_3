# Mailchimp Setup Guide

This guide will help you set up Mailchimp integration in just a few minutes! 🚀

## What This Does

- ✅ Automatically adds contacts to your Mailchimp audience when they submit forms or send messages
- ✅ Sends beautiful auto-reply emails to users (24-hour response guarantee)
- ✅ Organizes contacts with tags (Contact Form, Chat Message, Lead)
- ✅ Keeps your contact list organized and ready for marketing campaigns

## Step 1: Get Your Mailchimp API Key

1. **Log in to Mailchimp** (or create a free account at [mailchimp.com](https://mailchimp.com))
2. Go to your **Account** → **Extras** → **API keys**
3. Click **Create A Key**
4. Copy the API key (it looks like: `abc123def456ghi789-us1`)

## Step 2: Get Your Server Prefix

The server prefix is the part after the dash in your API key:
- If your API key is `abc123def456ghi789-us1`, your server prefix is `us1`
- If your API key is `abc123def456ghi789-us2`, your server prefix is `us2`
- Common prefixes: `us1`, `us2`, `us3`, `us6`, `us7`, `us8`, `us9`, `us10`, `us11`, `us12`, `us13`, `us14`, `us15`, `us16`, `us17`, `us18`, `us19`, `us20`, `us21`

## Step 3: Get Your Audience ID

1. In Mailchimp, go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Scroll down to find your **Audience ID** (it looks like: `a1b2c3d4e5`)
4. Copy this ID

## Step 4: Add Environment Variables

Add these to your `.env` file in the `server` directory:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_AUDIENCE_ID=your-audience-id-here

# Gmail Configuration (for sending emails)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
```

### Getting Gmail App Password (if you haven't already)

1. Go to your Google Account settings
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Use this password (not your regular Gmail password) in `GMAIL_APP_PASSWORD`

## Step 5: Test It!

1. Restart your server: `npm run dev` (in the server directory)
2. Submit a test form or send a test message through the chat widget
3. Check:
   - ✅ You received a notification email
   - ✅ The user received an auto-reply email
   - ✅ The contact appears in your Mailchimp audience

## That's It! 🎉

Your Mailchimp integration is now set up. Every time someone:
- Submits the contact form
- Sends a message through the chat widget

They will:
- Receive a friendly auto-reply email (with 24-hour response guarantee)
- Be added to your Mailchimp audience
- Be tagged appropriately for easy organization

## Troubleshooting

### "Mailchimp API key not configured"
- Make sure you added `MAILCHIMP_API_KEY` to your `.env` file
- Restart your server after adding environment variables

### "Failed to add contact to Mailchimp"
- Check that your API key is correct
- Verify your server prefix matches the one in your API key
- Make sure your audience ID is correct

### Auto-reply emails not sending
- Check your Gmail credentials in `.env`
- Make sure you're using an App Password (not your regular password)
- Check server logs for error messages

## Optional: Customize the Auto-Reply Template

The auto-reply template is in `server/services/mailchimpService.ts` in the `getAutoReplyTemplate()` function. You can customize:
- The subject line
- The message content
- The styling and colors
- The list of items to prepare

## Need Help?

If you run into any issues, check the server logs for detailed error messages. Most issues are related to:
- Incorrect API keys or credentials
- Missing environment variables
- Server not restarted after adding new env variables
