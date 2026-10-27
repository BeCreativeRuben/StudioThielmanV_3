import LocalizedLink from '../../i18n/LocalizedLink'

type Props = {
  href: string
  tag: string
  title: string
  description: string
  meta: string
  linkLabel: string
  badge?: string
  dashed?: boolean
}

/** Homepage / overview card linking into a service detail page. */
export default function ServiceCard({ href, tag, title, description, meta, linkLabel, badge, dashed }: Props) {
  const inner = (
    <>
      {badge ? (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-accent text-text-secondary px-2.5 py-1 rounded-full mb-3">
          {badge}
        </span>
      ) : null}
      <span className="block text-xs uppercase tracking-wider text-text-secondary mb-2">{tag}</span>
      <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 group-hover:text-black transition-colors">
        {title}
      </h3>
      <p className="text-body text-text-primary mb-4 flex-grow">{description}</p>
      <p className="text-body-sm text-text-secondary mb-4">{meta}</p>
      <span className="text-sm font-semibold text-primary">{linkLabel}</span>
    </>
  )

  const className = `group h-full flex flex-col p-6 md:p-8 rounded-xl border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
    dashed ? 'border-dashed border-gray-300 bg-accent' : 'border-gray-200'
  }`

  if (dashed && href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <LocalizedLink to={href} className={className}>
      {inner}
    </LocalizedLink>
  )
}
