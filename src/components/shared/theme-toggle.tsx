"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sun,
  Moon,
  Sparkles,
  Leaf,
  Droplets,
  Gem,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "neo-dark", label: "Neo Dark", icon: Sparkles },
  { value: "neo-emerald", label: "Neo Emerald", icon: Leaf },
  { value: "neo-blue", label: "Neo Blue", icon: Droplets },
  { value: "neo-purple", label: "Neo Purple", icon: Gem },
] as const

interface ThemeToggleProps {
  className?: string
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentIndex = themes.findIndex((t) => t.value === theme)
  const nextTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex].value)
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const Icon = currentTheme.icon

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn("h-10 w-10", className)}>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-10 w-10 relative overflow-hidden", className)}
            onClick={nextTheme}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{currentTheme.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ThemeToggle }
