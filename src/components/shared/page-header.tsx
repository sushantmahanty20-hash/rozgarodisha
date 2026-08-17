"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/shared/breadcrumb"

interface PageHeaderProps {
  title: string
  titleGradient?: boolean
  description?: string
  breadcrumb?: boolean
  breadcrumbSegments?: { label: string; href?: string }[]
  actions?: React.ReactNode
  backButton?: {
    onClick: () => void
    label?: string
  }
  className?: string
}

function PageHeader({
  title,
  titleGradient = false,
  description,
  breadcrumb = true,
  breadcrumbSegments,
  actions,
  backButton,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {breadcrumb && (
        <Breadcrumb customSegments={breadcrumbSegments} />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {backButton && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={backButton.onClick}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-2xl font-bold tracking-tight sm:text-3xl",
                titleGradient &&
                  "bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent"
              )}
            >
              {title}
            </motion.h1>
          </div>
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export { PageHeader }
export type { PageHeaderProps }
