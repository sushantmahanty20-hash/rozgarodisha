"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground",
        outline:
          "border border-input text-foreground bg-transparent",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm",
        success:
          "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
        warning:
          "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20",
        info:
          "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
