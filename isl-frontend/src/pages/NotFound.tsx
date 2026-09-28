import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-20 text-center">
      <p className="text-5xl font-semibold text-primary">404</p>
      <h1 className="text-lg font-medium text-ink">Page not found</h1>
      <p className="text-sm text-muted">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-primary
          px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-light"
      >
        {t('nav.home')}
      </Link>
    </div>
  )
}
