'use client'

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay = 500
): T {
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [timeoutId])

  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    const id = setTimeout(() => callback(...args), delay)
    setTimeoutId(id)
  }) as T
}
