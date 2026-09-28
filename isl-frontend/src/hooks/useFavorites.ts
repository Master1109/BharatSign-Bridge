import { useCallback, useEffect, useState } from 'react'
import { Favorite, RecognitionResult } from '@/types'

const STORAGE_KEY = 'isl-favorites'

function load(): Favorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Favorite[]) : []
  } catch {
    return []
  }
}

/** Persists favorited recognition results to localStorage. */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isSaved = useCallback(
    (text: string) => favorites.some((f) => f.text === text),
    [favorites]
  )

  const add = useCallback((result: RecognitionResult) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.text === result.text)) return prev
      const entry: Favorite = {
        id: `${Date.now()}`,
        text: result.text,
        confidence: result.confidence,
        savedAt: result.timestamp,
      }
      return [entry, ...prev].slice(0, 30)
    })
  }, [])

  const remove = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const removeByText = useCallback((text: string) => {
    setFavorites((prev) => prev.filter((f) => f.text !== text))
  }, [])

  return { favorites, add, remove, removeByText, isSaved }
}
