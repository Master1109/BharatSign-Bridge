import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '@/hooks/useFavorites'

describe('useFavorites', () => {
  beforeEach(() => localStorage.clear())

  it('adds and de-duplicates favorites by text', () => {
    const { result } = renderHook(() => useFavorites())
    const sample = { text: 'Hello', confidence: 0.9, timestamp: new Date().toISOString() }

    act(() => result.current.add(sample))
    act(() => result.current.add(sample))

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.isSaved('Hello')).toBe(true)
  })

  it('removes a favorite by id', () => {
    const { result } = renderHook(() => useFavorites())
    act(() =>
      result.current.add({ text: 'Thank you', confidence: 0.8, timestamp: new Date().toISOString() })
    )
    const id = result.current.favorites[0].id
    act(() => result.current.remove(id))
    expect(result.current.favorites).toHaveLength(0)
  })
})
