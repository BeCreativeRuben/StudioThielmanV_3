import { readFileSync, writeFileSync } from 'node:fs'

const path = 'src/pages/Blog.tsx'
let s = readFileSync(path, 'utf8')
const tag = 'div'

s = s.replace(
  `import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { visibleBlogPosts } from '../data/blog'

export default function Blog() {
  return (`,
  `import Button from '../components/Button'
import LocalizedLink from '../i18n/LocalizedLink'
import { useLocale } from '../i18n/LocaleProvider'
import { getVisibleBlogPostsForLocale } from '../data/blog'

export default function Blog() {
  const { locale, messages } = useLocale()
  const copy = messages.blog
  const posts = getVisibleBlogPostsForLocale(locale === 'nl-BE' ? 'nl-BE' : 'en')

  return (`
)

s = s.replace(
  `          <${tag} className="text-sm text-white/60 uppercase tracking-wider mb-4">BLOG</${tag}>`,
  `          <${tag} className="text-sm text-white/60 uppercase tracking-wider mb-4">{copy.hero.label}</${tag}>`
)
s = s.replace(
  '<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Expert Insights</h1>',
  '<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{copy.hero.title}</h1>'
)
s = s.replace(
  '<p className="text-xl text-white/80 max-w-2xl mx-auto">Tips, insights, and strategies to help your business thrive online.</p>',
  '<p className="text-xl text-white/80 max-w-2xl mx-auto">{copy.hero.subtitle}</p>'
)
s = s.replaceAll('visibleBlogPosts', 'posts')
s = s.replaceAll('<Link ', '<LocalizedLink ')
s = s.replaceAll('</Link>', '</LocalizedLink>')
s = s.replace('Read More', '{messages.common.cta.readMore}')
s = s.replace('>Article<', '>{messages.common.article}<')
s = s.replace(
  'Ready to Boost Your Online Presence?',
  '{copy.cta.title}'
)
s = s.replace(
  "Let's discuss how we can help your business stand out online.",
  '{copy.cta.subtitle}'
)
s = s.replace('Get Started Today', '{copy.cta.button}')

writeFileSync(path, s)
console.log('patched blog')
