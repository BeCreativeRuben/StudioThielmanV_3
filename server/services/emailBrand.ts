/** Studio Thielman email design tokens — keep in sync with public/brand.json */

export const EMAIL_BRAND = {
  siteUrl: 'https://studiothielman.com',
  siteName: 'Studio Thielman',
  tagline: 'Professional websites starting at €25/month',
  logoUrl: 'https://studiothielman.com/logo.png',
  colors: {
    primary: '#000000',
    white: '#FFFFFF',
    accent: '#F5F5F5',
    textPrimary: '#2D2D2D',
    textSecondary: '#666666',
    border: '#E5E5E5',
    heroDark: '#111827',
    footerBorder: '#1F2937',
  },
  font:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
} as const

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export function emailSectionLabel(text: string): string {
  const { colors, font } = EMAIL_BRAND
  return `<p style="margin:0 0 8px 0;font-family:${font};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${colors.textSecondary};">${escapeHtml(text)}</p>`
}

export function emailParagraph(text: string, options?: { marginBottom?: string }): string {
  const { colors, font } = EMAIL_BRAND
  const mb = options?.marginBottom ?? '20px'
  return `<p style="margin:0 0 ${mb} 0;font-family:${font};font-size:16px;line-height:1.6;color:${colors.textPrimary};">${text}</p>`
}

export function emailCallout(title: string, body: string): string {
  const { colors, font } = EMAIL_BRAND
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border-collapse:collapse;">
  <tr>
    <td style="background-color:${colors.accent};border-left:4px solid ${colors.primary};padding:20px 24px;border-radius:0 8px 8px 0;">
      <p style="margin:0 0 8px 0;font-family:${font};font-size:15px;font-weight:700;color:${colors.textPrimary};">${escapeHtml(title)}</p>
      <p style="margin:0;font-family:${font};font-size:15px;line-height:1.6;color:${colors.textSecondary};">${body}</p>
    </td>
  </tr>
</table>`
}

export function emailFieldTable(
  rows: Array<{ label: string; value: string; valueIsHtml?: boolean }>
): string {
  const { colors, font } = EMAIL_BRAND
  const rowHtml = rows
    .map(
      (row, index) => `
  <tr>
    <td colspan="2" style="padding:${index === 0 ? '0' : '16px'} 0 8px 0;font-family:${font};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${colors.textSecondary};">${escapeHtml(row.label)}</td>
  </tr>
  <tr>
    <td colspan="2" style="padding:0 0 ${index === rows.length - 1 ? '0' : '4px'} 0;font-family:${font};font-size:16px;line-height:1.5;color:${colors.textPrimary};font-weight:600;">${row.valueIsHtml ? row.value : escapeHtml(row.value)}</td>
  </tr>`
    )
    .join('')

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;border-collapse:collapse;background-color:${colors.accent};border:1px solid ${colors.border};border-radius:12px;">
  <tr>
    <td style="padding:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${rowHtml}
      </table>
    </td>
  </tr>
</table>`
}

export function emailButton(label: string, href: string): string {
  const { colors, font } = EMAIL_BRAND
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px 0;border-collapse:collapse;">
  <tr>
    <td style="border-radius:8px;background-color:${colors.primary};">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${font};font-size:15px;font-weight:700;color:${colors.white};text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
    </td>
  </tr>
</table>`
}

export function emailList(items: string[]): string {
  const { colors, font } = EMAIL_BRAND
  const itemsHtml = items
    .map(
      (item) =>
        `<li style="margin:0 0 10px 0;font-family:${font};font-size:16px;line-height:1.6;color:${colors.textPrimary};">${escapeHtml(item)}</li>`
    )
    .join('')
  return `<ul style="margin:0 0 20px 0;padding-left:20px;">${itemsHtml}</ul>`
}

export function wrapEmailLayout(options: {
  title: string
  preheader?: string
  badge?: string
  heading: string
  subheading?: string
  bodyHtml: string
  showLogo?: boolean
}): string {
  const { colors, font, siteName, logoUrl, siteUrl, tagline } = EMAIL_BRAND
  const preheader = options.preheader || options.heading
  const badgeHtml = options.badge
    ? `<p style="margin:0 0 16px 0;"><span style="display:inline-block;background-color:${colors.white};color:${colors.primary};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${escapeHtml(options.badge)}</span></p>`
    : ''
  const subheadingHtml = options.subheading
    ? `<p style="margin:8px 0 0 0;font-family:${font};color:rgba(255,255,255,0.8);font-size:16px;line-height:1.5;">${escapeHtml(options.subheading)}</p>`
    : ''
  const logoHtml =
    options.showLogo !== false
      ? `<a href="${siteUrl}" style="text-decoration:none;display:inline-block;margin-bottom:20px;"><img src="${logoUrl}" alt="${escapeHtml(siteName)}" width="160" style="display:block;max-width:160px;height:auto;border:0;" /></a>`
      : `<p style="margin:0 0 8px 0;font-family:${font};font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.65);">${escapeHtml(siteName)}</p>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.accent};font-family:${font};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.accent};border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-collapse:collapse;">
          <tr>
            <td style="background-color:${colors.heroDark};padding:32px;border-radius:12px 12px 0 0;">
              ${logoHtml}
              ${badgeHtml}
              <h1 style="margin:0;font-family:${font};color:${colors.white};font-size:28px;font-weight:700;line-height:1.25;">${escapeHtml(options.heading)}</h1>
              ${subheadingHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:${colors.white};padding:32px;border-left:1px solid ${colors.border};border-right:1px solid ${colors.border};">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:${colors.heroDark};padding:28px 32px;border-radius:0 0 12px 12px;text-align:center;border-top:1px solid ${colors.footerBorder};">
              <p style="margin:0 0 8px 0;font-family:${font};font-size:15px;font-weight:600;color:${colors.white};">${escapeHtml(siteName)}</p>
              <p style="margin:0 0 16px 0;font-family:${font};font-size:13px;line-height:1.5;color:rgba(255,255,255,0.65);">${escapeHtml(tagline)}</p>
              <a href="${siteUrl}" style="display:inline-block;background-color:${colors.white};color:${colors.primary};font-family:${font};font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">Visit website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
