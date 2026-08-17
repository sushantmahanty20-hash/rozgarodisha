"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full transition-all duration-500",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-emerald-500/20",
        warning: "bg-amber-500/20",
        danger: "bg-destructive/20",
      },
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const indicatorColors = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
}

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number
  showLabel?: boolean
  animated?: boolean
}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value = 0, variant = "default", size, showLabel, animated = true, ...props },
    ref
  ) => (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ variant, size, className }))}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 rounded-full transition-all",
            indicatorColors[variant || "default"],
            animated && "duration-700 ease-out"
          )}
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
