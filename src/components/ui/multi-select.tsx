"use client"

import * as React from "react"
import { X, ChevronDown, Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  label?: string
  error?: string
  className?: string
  disabled?: boolean
  searchPlaceholder?: string
  maxItems?: number
}

function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  className,
  disabled,
  searchPlaceholder = "Search...",
  maxItems,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean)

  const handleToggle = (optionValue: string) => {
    if (maxItems && value.length >= maxItems && !value.includes(optionValue)) {
      return
    }
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue))
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("w-full space-y-1.5", className)} ref={containerRef}>
      {label && <label className="text-sm font-medium leading-none">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen(!open)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
          disabled={disabled}
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            open && "ring-2 ring-ring ring-offset-2"
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {selectedLabels.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selectedLabels.map(
              (item) =>
                item && (
                  <span
                    key={item.value}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(item.value)
                      }}
                      className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )
            )}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border bg-popover p-1 shadow-xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length === 0 && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              )}
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className={cn(
                    "flex w-full items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors duration-150 hover:bg-accent",
                    value.includes(option.value) && "bg-accent"
                  )}
                >
                  <span
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      value.includes(option.value)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-input"
                    )}
                  >
                    {value.includes(option.value) && (
                      <Check className="h-3 w-3" />
                    )}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export { MultiSelect }
