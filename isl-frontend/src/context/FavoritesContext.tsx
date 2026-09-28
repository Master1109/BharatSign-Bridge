import { createContext, useContext } from 'react'
import { useFavorites } from '@/hooks/useFavorites'

type FavoritesContextValue = ReturnType<typeof useFavorites>

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const value = useFavorites()
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be used within a FavoritesProvider')
  return ctx
}
