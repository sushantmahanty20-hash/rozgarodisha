"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  error?: string
  placeholder?: string
  className?: string
  min?: string
  max?: string
  disabled?: boolean
}

function DatePicker({
  value,
  onChange,
  label,
  error,
  placeholder = "Select date",
  className,
  min,
  max,
  disabled,
}: DatePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.showPicker()
  }

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label className="text-sm font-medium leading-none">{label}</label>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          className={cn(
            "pr-10 cursor-pointer",
            !value && "text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive/20"
          )}
          onClick={handleClick}
        />
        <button
          type="button"
          onClick={handleClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          disabled={disabled}
        >
          <Calendar className="h-4 w-4" />
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export { DatePicker }
