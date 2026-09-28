import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useFavoritesContext } from '@/context/FavoritesContext'

export default function MainLayout() {
  const { t } = useTranslation()
  const { favorites, remove } = useFavoritesContext()

  return (
    <div className="flex min-h-screen flex-col bg-base">
      <a href="#main-content" className="skip-link">
        {t('nav.skip')}
      </a>
      <Header favorites={favorites} onRemoveFavorite={remove} />
      <main id="main-content" className="flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
