import type { InterestListContent } from './interestList.types'

export const groupWorkshopEn: InterestListContent = {
  shell: {
    brandTag: 'GROUP WORKSHOP',
    navCta: 'Join the list',
    backToTalks: 'AI talks & workshops',
  },
  hero: {
    eyebrow: 'Group workshop · interest list',
    title: 'Hands-on AI workshop, in a group',
    pitch:
      'A practical group workshop where you work with AI yourself. No hype and no wall of slides: you do it, and you leave with things you can use straight away.',
  },
  promise: {
    title: 'How it works',
    text:
      'Leave your email. As soon as there are enough sign-ups and the date and location are fixed, you get one email with all the info.',
    noSpam: 'Your email is only used for this. No newsletter, no spam.',
  },
  learn: {
    label: 'WHAT YOU WILL DO',
    title: 'What you do in the workshop',
    items: [
      'Work hands-on with today’s AI tools (ChatGPT, Claude, Copilot and more)',
      'Write prompts that give better results, faster',
      'Build your own simple AI agent or automation',
      'Apply AI to your own work, studies or business',
    ],
  },
  audience: {
    label: 'FOR WHO',
    text: 'For entrepreneurs, students, employees and anyone who is curious about AI.',
  },
  form: {
    title: 'Join the interest list',
    email: 'Email',
    firstName: 'First name',
    optional: '(optional)',
    role: 'I am',
    roleOptions: [
      { value: '', label: 'Choose…' },
      { value: 'entrepreneur', label: 'An entrepreneur' },
      { value: 'student', label: 'A student' },
      { value: 'employee', label: 'An employee' },
      { value: 'other', label: 'Other' },
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
  nextStepLink: {
    before: 'Already really into AI and using it a lot? Sign up for the ',
    cta: 'AI masterclass',
    after: '.',
    to: '/ai-masterclass',
  },
}
