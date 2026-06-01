export interface PortfolioMetaItem {
  label: string
  value: string
  href?: string
}

export interface PortfolioStorySection {
  title: string
  paragraphs: string[]
}

export interface PortfolioCaseStudy {
  subtitle?: string
  meta?: PortfolioMetaItem[]
  sections?: PortfolioStorySection[]
}

export interface PortfolioItem {
  slug: string
  title: string
  package: 'Starter' | 'Growth' | 'Pro Max'
  description: string
  longDescription: string
  clientType: string
  date: string
  liveUrl: string
  githubUrl?: string
  keyFeatures: string[]
  screenshots: string[]
  packageFitExplanation: string
  comingSoon?: boolean
  results?: string
  caseStudy?: PortfolioCaseStudy
}
