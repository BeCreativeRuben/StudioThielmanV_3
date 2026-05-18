import { useLocation } from 'react-router-dom'
import { resolvePageSeo } from '../seo/routes'
import PageSeo from './PageSeo'
import StructuredData from './StructuredData'

export default function SeoRouteSync() {
  const { pathname } = useLocation()
  const meta = resolvePageSeo(pathname)

  return (
    <>
      <PageSeo meta={meta} />
      {!meta.noindex && <StructuredData />}
    </>
  )
}
