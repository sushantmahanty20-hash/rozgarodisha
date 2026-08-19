"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

const themes = ["light", "dark", "neo-dark", "neo-emerald", "neo-blue", "neo-purple"] as const

export type Theme = (typeof themes)[number]

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
