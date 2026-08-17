"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  className?: string
  label?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
}

function Rating({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  readonly = false,
  className,
  label,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState(0)

  const displayValue = hoverValue || value

  return (
    <div className={cn("space-y-1", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const starIndex = i + 1
          const isFilled = starIndex <= displayValue

          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              onClick={() => onChange?.(starIndex)}
              onMouseEnter={() => !readonly && setHoverValue(starIndex)}
              onMouseLeave={() => !readonly && setHoverValue(0)}
              className={cn(
                "transition-all duration-150 focus:outline-none",
                !readonly && "cursor-pointer hover:scale-110",
                readonly && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  "transition-colors duration-150",
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-muted-foreground/30"
                )}
              />
            </button>
          )
        })}
        {value > 0 && (
          <span className="ml-1 text-sm text-muted-foreground">{value}/{max}</span>
        )}
      </div>
    </div>
  )
}

export { Rating }
