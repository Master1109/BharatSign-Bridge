import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import {
  SunIcon,
  MoonIcon,
  StarIcon,
  ChevronUpDownIcon,
  CheckIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from '@/hooks/useTheme'
import { supportedLanguages } from '@/i18n'
import FavoritesPanel from '@/components/molecules/FavoritesPanel'
import { Favorite } from '@/types'

interface HeaderProps {
  favorites: Favorite[]
  onRemoveFavorite: (id: string) => void
}

export default function Header({
  favorites,
  onRemoveFavorite,
}: HeaderProps) {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  const currentLang =
    supportedLanguages.find((l) => l.code === i18n.language) ??
    supportedLanguages[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('isl-language', code)
  }

  return (
    <>
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        {/* Main header */}
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
          
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              aria-hidden="true"
            >
              IC
            </div>

            <span className="truncate font-semibold text-ink">
              {t('app.name')}
            </span>
          </div>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 sm:flex"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:text-ink'
                }`
              }
            >
              {t('nav.home')}
            </NavLink>

            <NavLink
              to="/dictionary"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:text-ink'
                }`
              }
            >
              {t('nav.dictionary')}
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            
            {/* Favorites */}
            <button
              type="button"
              onClick={() => setFavoritesOpen(true)}
              aria-label={t('favorites.title')}
              title={t('favorites.title')}
              className="relative rounded-full p-2 text-ink transition-colors hover:bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <StarIcon
                className="h-5 w-5"
                aria-hidden="true"
              />

              {favorites.length > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-0.5 text-[10px] font-semibold text-white"
                  aria-label={`${favorites.length} favorites`}
                >
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </button>

            {/* Language selector */}
            <Listbox
              value={currentLang.code}
              onChange={changeLanguage}
            >
              <div className="relative">
                <Listbox.Button
                  className="flex items-center gap-1 rounded-full p-2 text-ink transition-colors hover:bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={t('language.label')}
                  title={t('language.label')}
                >
                  <LanguageIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />

                  <ChevronUpDownIcon
                    className="h-3.5 w-3.5 text-muted"
                    aria-hidden="true"
                  />
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg focus:outline-none">
                    {supportedLanguages.map((lang) => (
                      <Listbox.Option
                        key={lang.code}
                        value={lang.code}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm ${
                              active ? 'bg-base' : ''
                            }`}
                          >
                            <span>{lang.label}</span>

                            {selected && (
                              <CheckIcon
                                className="h-4 w-4 text-primary"
                                aria-hidden="true"
                              />
                            )}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={t('theme.toggle')}
              title={t('theme.toggle')}
              className="rounded-full p-2 text-ink transition-colors hover:bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {theme === 'dark' ? (
                <SunIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <MoonIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav
          aria-label="Mobile primary navigation"
          className="flex w-full items-center gap-1 overflow-x-auto border-t border-border px-3 py-2 sm:hidden"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-ink'
              }`
            }
          >
            {t('nav.home')}
          </NavLink>

          <NavLink
            to="/dictionary"
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-ink'
              }`
            }
          >
            {t('nav.dictionary')}
          </NavLink>
        </nav>
      </header>

      {/* Favorites panel */}
      <FavoritesPanel
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemove={onRemoveFavorite}
      />
    </>
  )
}