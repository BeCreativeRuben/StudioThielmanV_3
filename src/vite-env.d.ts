/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  /** Optional external booking URL (e.g. Cal.com). When unset, Book a Call goes to the contact form. */
  readonly VITE_BOOKING_URL?: string
  readonly VITE_CAL_LINK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
