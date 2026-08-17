'use client'

import { useState, useEffect, useCallback } from 'react'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function readLocalStorage<T>(key: string, initialValue: T | (() => T)): T {
  if (!isBrowser()) return initialValue instanceof Function ? initialValue() : initialValue

  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue instanceof Function ? initialValue() : initialValue
  } catch {
    console.warn(`Error reading localStorage key "${key}":`)
    return initialValue instanceof Function ? initialValue() : initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readLocalStorage(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (isBrowser()) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue instanceof Function ? initialValue() : initialValue)
      if (isBrowser()) {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T)
        } catch {
          // ignore
        }
      }
    }

    if (isBrowser()) {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}
