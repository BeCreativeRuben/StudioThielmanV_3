export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ps'; texts: string[] }
  | { kind: 'ul'; items: string[] }
  | { kind: 'box'; rows: { label: string; value: string }[] }
  | { kind: 'pWithLink'; before: string; linkText: string; href: string; after?: string }

export type LegalSection = {
  title: string
  blocks: LegalBlock[]
}

export type LegalPageContent = {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}
