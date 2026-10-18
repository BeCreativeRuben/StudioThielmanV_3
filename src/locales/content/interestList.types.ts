/** Shared shape for the standalone interest-list pages (group workshop, AI masterclass). */
export interface InlineLink {
  before: string
  cta: string
  after: string
  to: string
}

export interface InterestListContent {
  shell: { brandTag: string; navCta: string; backToTalks: string }
  hero: { eyebrow: string; title: string; nextLevel?: string; pitch: string }
  promise: { title: string; text: string; noSpam: string }
  learn: { label: string; title: string; items: string[] }
  audience: { label: string; text: string }
  form: {
    title: string
    email: string
    firstName: string
    optional: string
    role: string
    roleOptions: { value: string; label: string }[]
    submit: string
    submitting: string
    privacy: string
    privacyLink: string
    errorEmail: string
    errorSubmit: string
    successTitle: string
    successText: string
  }
  talksLink: { text: string; cta: string }
  /** Line directly below the talks link (e.g. group workshop → masterclass). */
  nextStepLink?: InlineLink
  /** Small, subtle link (e.g. masterclass → group workshop). */
  backLink?: { text: string; cta: string; to: string }
}
