import type { ReactNode } from 'react'
import Card from '../Card'

type Props = {
  name: string
  price: string
  priceSub?: string
  description: string
  idealFor?: string
  features: string[]
  cta: ReactNode
  badge?: string
  featured?: boolean
  exclVatLabel?: string
}

/** Pricing / format card — same rhythm on websites, workshops, start-ups, platforms. */
export default function PlanCard({
  name,
  price,
  priceSub,
  description,
  idealFor,
  features,
  cta,
  badge,
  featured = false,
  exclVatLabel,
}: Props) {
  return (
    <Card hover className={`h-full flex flex-col relative ${featured ? 'border-2 border-cta shadow-xl' : ''}`}>
      {badge ? (
        <div className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4 uppercase tracking-wider w-fit">
          {badge}
        </div>
      ) : null}
      <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-2">{name}</h3>
      <div className="mb-4">
        <div className="text-3xl md:text-4xl font-semibold text-primary">{price}</div>
        {priceSub ? <div className="text-body-sm text-text-secondary mt-1">{priceSub}</div> : null}
        {exclVatLabel ? <div className="text-body-sm text-text-secondary mt-1">{exclVatLabel}</div> : null}
      </div>
      <p className="text-body text-text-primary mb-4">{description}</p>
      {idealFor ? <p className="text-body-sm text-text-secondary mb-6">{idealFor}</p> : null}
      <ul className="space-y-2 mb-8 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="text-body-sm text-text-primary flex items-start">
            <span className="text-cta mr-2 mt-1 font-bold" aria-hidden>
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">{cta}</div>
    </Card>
  )
}
