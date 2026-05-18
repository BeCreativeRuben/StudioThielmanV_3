# Resend Email Setup

Contact form and chat notifications are sent via [Resend](https://resend.com).

## Environment variables

Add these in Vercel (Production + Preview) and in `server/.env` for local development:

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Studio Thielman <contact@yourdomain.com>
RESEND_NOTIFY_EMAIL=you@yourdomain.com
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend → API Keys](https://resend.com/api-keys) |
| `RESEND_FROM` | Verified sender (domain must be verified in Resend) |
| `RESEND_NOTIFY_EMAIL` | Inbox for new form/chat notifications |

## Resend dashboard

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your domain (DNS records).
3. Create an API key and add it as `RESEND_API_KEY`.
4. Use an address on that domain for `RESEND_FROM` (e.g. `Studio Thielman <hello@studiotielman.com>`).

For testing only, Resend allows sending from `onboarding@resend.dev` to your own verified email.

## What gets sent

| Event | To you (`RESEND_NOTIFY_EMAIL`) | To visitor |
|-------|-------------------------------|------------|
| Contact form | Notification with all fields, `replyTo` = visitor email | Auto-reply thank-you |
| Chat (with email) | Notification with message | Auto-reply thank-you |

Submissions are always stored in the database; email failures are logged but do not block the form.

## Troubleshooting

- **Emails not sending**: Confirm all three env vars are set and redeploy.
- **Domain errors**: Verify DNS in Resend; `RESEND_FROM` must use that domain.
- **Only test address works**: Complete domain verification before production use.
