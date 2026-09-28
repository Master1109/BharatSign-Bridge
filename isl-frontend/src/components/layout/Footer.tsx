import { useTranslation } from 'react-i18next'
import FeedbackButton from '@/components/molecules/FeedbackButton'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-medium text-ink">{t('footer.builtFor')}</p>
          <p className="max-w-sm text-xs text-muted">{t('footer.rights')}</p>
        </div>
        <FeedbackButton />
      </div>
    </footer>
  )
}
