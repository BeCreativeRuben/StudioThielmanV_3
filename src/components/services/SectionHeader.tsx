type Props = {
  label: string
  title: string
  intro?: string
  light?: boolean
}

export default function SectionHeader({ label, title, intro, light = false }: Props) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <p className={`text-sm uppercase tracking-wider mb-4 ${light ? 'text-white/60' : 'text-text-secondary'}`}>
        {label}
      </p>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`text-body-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-text-primary'}`}>{intro}</p>
      ) : null}
    </div>
  )
}
