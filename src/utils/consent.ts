const MAILCHIMP_SRC =
  'https://chimpstatic.com/mcjs-connected/js/users/d8444475eb02ed17efa7940b0/7863ec2692daba11ff0f80adf.js'

let mailchimpStarted = false

/** Connected-site script. Only after the visitor accepts cookies. */
export function loadMailchimp() {
  if (mailchimpStarted || typeof document === 'undefined') return
  if (document.getElementById('mcjs')) {
    mailchimpStarted = true
    return
  }
  mailchimpStarted = true
  const script = document.createElement('script')
  script.id = 'mcjs'
  script.async = true
  script.src = MAILCHIMP_SRC
  document.body.appendChild(script)
}

export function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return
  const host = window.location.hostname
  const names = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name === '_gid' || name.startsWith('_ga') || name.startsWith('_gat'))
  for (const name of names) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${host}`
  }
}
