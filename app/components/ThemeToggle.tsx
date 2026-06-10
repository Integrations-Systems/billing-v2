"use client"

import * as React from "react"
import { Moon, SunMedium, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const themeOptions = [
  { value: "light", label: "Claro", icon: SunMedium },
  { value: "dark", label: "Oscuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Laptop },
] as const

export default function ThemeToggle() {
  const { theme = "system", setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
      aria-label="Seleccionar modo de color"
      className="rounded-lg border border-input bg-background p-1"
      size="sm"
      variant="outline"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon
        return (
          <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
