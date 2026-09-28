import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { dictionary } from '@/data/dictionary'
import Badge from '@/components/atoms/Badge'

/** A simple searchable dictionary of the signs this MVP can recognize. */
export default function ISLDictionary() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dictionary
    return dictionary.filter(
      (entry) =>
        entry.sign.toLowerCase().includes(q) ||
        entry.meaning.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section className="mx-auto w-full max-w-2xl" aria-labelledby="dictionary-heading">
      <div className="mb-5">
        <h1 id="dictionary-heading" className="text-2xl font-semibold text-ink">
          {t('dictionary.title')}
        </h1>
        <p className="text-sm text-muted">{t('dictionary.subtitle')}</p>
      </div>

      <div className="mb-5 flex flex-col gap-1.5">
        <label htmlFor="dictionary-search" className="sr-only">
          {t('dictionary.search')}
        </label>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="dictionary-search"
            type="text"
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3.5
              text-sm text-ink placeholder:text-muted"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('dictionary.search')}
          />
        </div>
      </div>

      {results.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">{t('dictionary.empty')}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {results.map((entry) => (
            <li key={entry.id} className="card p-4">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <h2 className="font-medium text-ink">{entry.sign}</h2>
                <Badge tone="primary">{entry.category}</Badge>
              </div>
              <p className="text-sm text-muted">{entry.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
