import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import {
  XMarkIcon,
  TrashIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Favorite } from '@/types'

interface FavoritesPanelProps {
  isOpen: boolean
  onClose: () => void
  favorites: Favorite[]
  onRemove: (id: string) => void
}

export default function FavoritesPanel({
  isOpen,
  onClose,
  favorites,
  onRemove,
}: FavoritesPanelProps) {
  const { t } = useTranslation()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex h-full w-full max-w-sm flex-col overflow-hidden bg-surface p-4 shadow-xl sm:p-5">
              <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
                <Dialog.Title className="text-base font-semibold text-ink">
                  {t('favorites.title')}
                </Dialog.Title>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('common.close')}
                  title={t('common.close')}
                  className="rounded-full p-2 text-muted transition-colors hover:bg-base hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <XMarkIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {favorites.length === 0 ? (
                <div
                  className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted"
                  role="status"
                >
                  <StarIcon
                    className="h-8 w-8"
                    aria-hidden="true"
                  />

                  <p className="text-sm">
                    {t('favorites.empty')}
                  </p>
                </div>
              ) : (
                <ul
                  className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1"
                  aria-label={t('favorites.title')}
                >
                  {favorites.map((fav) => (
                    <li
                      key={fav.id}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-medium text-ink">
                          {fav.text}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          {format(
                            new Date(fav.savedAt),
                            'MMM d, h:mm a'
                          )}{' '}
                          · {Math.round(fav.confidence * 100)}%
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(fav.id)}
                        aria-label={`${t('favorites.remove')}: ${fav.text}`}
                        title={t('favorites.remove')}
                        className="shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-base hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                      >
                        <TrashIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}