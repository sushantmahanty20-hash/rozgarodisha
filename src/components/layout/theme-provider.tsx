"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

const themes = ["light", "dark", "neo-dark", "neo-emerald", "neo-blue", "neo-purple"] as const

export type Theme = (typeof themes)[number]

function applyThemeClass(theme: string) {
  if (typeof document === "undefined") return
  const root = document.documentElement

  // Remove all theme classes
  themes.forEach((t) => root.classList.remove(t))

  // Determine if dark variant
  const isDark = theme.startsWith("neo-") || theme === "dark"
  if (isDark) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

  // Apply neo theme modifier
  if (theme.startsWith("neo-")) {
    root.classList.add(theme)
  }

  root.classList.add(theme)
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      themes={[...themes]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
