import BookCallLink from '../BookCallLink'
import LocalizedLink from '../../i18n/LocalizedLink'
import { useLocale } from '../../i18n/LocaleProvider'

type Item = { id: string; label: string }
type Props = { current: string; items: Item[]; notes: string }

/** Sticky per-service sub-navigation with breadcrumb + anchor links + Book-a-Call. */
export default function ServiceSubNav({ current, items, notes }: Props) {
  const { messages } = useLocale()
  const nav = messages.offerOverview.nav
  return (
    <nav aria-label={nav.subnavAria} className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 h-14 overflow-x-auto whitespace-nowrap">
        <ol className="hidden md:flex items-center gap-2 text-sm text-text-secondary shrink-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li><LocalizedLink to="/" className="hover:text-primary">Home</LocalizedLink></li>
          <li aria-hidden="true">›</li>
          <li><LocalizedLink to="/#diensten" className="hover:text-primary">{nav.services}</LocalizedLink></li>
          <li aria-hidden="true">›</li>
          <li className="font-semibold text-primary" aria-current="page">{current}</li>
        </ol>
        <span className="hidden md:block w-px h-6 bg-gray-200 shrink-0" aria-hidden="true" />
        <ul className="flex items-center gap-5 text-sm font-medium uppercase tracking-wider">
          {items.map((it) => (
            <li key={it.id}><a href={`#${it.id}`} className="text-text-primary hover:text-primary">{it.label}</a></li>
          ))}
        </ul>
        <div className="ml-auto shrink-0">
          <BookCallLink notes={notes} metadata={{ source: 'subnav' }}>
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold cursor-pointer">{nav.talk}</span>
          </BookCallLink>
        </div>
      </div>
    </nav>
  )
}
