import type { InterestListContent } from './interestList.types'

export const masterclassEn: InterestListContent = {
  shell: {
    brandTag: 'AI MASTERCLASS',
    navCta: 'Join the list',
    backToTalks: 'AI talks & workshops',
  },
  hero: {
    eyebrow: 'AI masterclass · interest list',
    title: 'AI masterclass: the next step',
    nextLevel: 'Is the group workshop too basic for you? Think you’re already further along? Take the next step: the AI masterclass.',
    pitch:
      'A deeper group session for people who already use AI a lot. On the same day as the group workshop, date to follow. Easy to step into, with real depth for advanced users.',
  },
  promise: {
    title: 'How it works',
    text:
      'Leave your email. As soon as there are enough sign-ups and the date and location are fixed, you get one email with all the info.',
    noSpam: 'Your email is only used for this. No newsletter, no spam.',
  },
  learn: {
    label: 'WHAT YOU WILL DO',
    title: 'What you do in the masterclass',
    items: [
      'Build your own AI agents and have them work together as a multi-agent team',
      'Connect AI to your tools: MCP connectors, APIs and automations',
      'Build websites and apps with AI coding agents',
      'Advanced prompting: give the right context and evaluate the output critically',
      'Run AI locally and put it to work on your own data',
    ],
  },
  audience: {
    label: 'FOR WHO',
    text: 'For people who already use ChatGPT, Claude or other AI tools every day and want more out of them.',
  },
  form: {
    title: 'Join the interest list',
    email: 'Email',
    firstName: 'First name',
    optional: '(optional)',
    role: 'I use AI',
    roleOptions: [
      { value: '', label: 'Choose…' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'building', label: 'I already build with it' },
    ],
    submit: 'Put me on the list',
    submitting: 'Sending…',
    privacy: 'By signing up you agree to the',
    privacyLink: 'privacy policy',
    errorEmail: 'Enter a valid email address',
    errorSubmit: 'Something went wrong and you are not on the list yet. Try again, or email',
    successTitle: 'You are on the list.',
    successText:
      'You will get one email as soon as the date and location are fixed. A short confirmation is on its way to your inbox.',
  },
  talksLink: {
    text: 'For companies or schools:',
    cta: 'see tailored AI talks & workshops',
  },
  backLink: {
    text: 'Rather start with the basics?',
    cta: 'See the group workshop',
    to: '/group-workshop',
  },
}
