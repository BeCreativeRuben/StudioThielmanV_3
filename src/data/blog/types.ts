export interface BlogSection {
  type: 'heading' | 'paragraph' | 'image' | 'html'
  content: string
  level?: number
  alt?: string
}

export type BlogLocale = 'en' | 'nl-BE'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage?: string
  sections: BlogSection[]
  cta: {
    text: string
    link: string
  }
  visibleFrom?: string
  /** Defaults to nl-BE for existing posts */
  locale?: BlogLocale
}
