"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { PropsWithChildren } from "react"

type ThemeProviderProps = PropsWithChildren<{
  attribute?: "class" | "data-theme"
  defaultTheme?: "system" | "light" | "dark"
  enableSystem?: boolean
}>

export default function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
