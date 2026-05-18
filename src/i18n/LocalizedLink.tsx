import { Link, type LinkProps } from 'react-router-dom'
import { useLocale } from './LocaleProvider'

export default function LocalizedLink({ to, ...props }: LinkProps) {
  const { localizedPath } = useLocale()
  const resolved = typeof to === 'string' ? localizedPath(to) : to
  return <Link to={resolved} {...props} />
}
