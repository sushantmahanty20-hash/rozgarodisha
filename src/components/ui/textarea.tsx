"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-xl bg-background px-4 py-3 text-sm ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border border-input shadow-sm",
        glass:
          "border border-white/20 bg-white/10 backdrop-blur-xl text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/20 dark:bg-white/5 dark:border-white/10",
        underline:
          "border-0 border-b-2 border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, maxLength, id, onChange, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || generatedId
    const [charCount, setCharCount] = React.useState(0)

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length)
        onChange?.(e)
      },
      [onChange]
    )

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            textareaVariants({ variant, className }),
            error && "border-destructive focus-visible:ring-destructive/20"
          )}
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : (
            <span />
          )}
          {maxLength !== undefined && (
            <p
              className={cn(
                "text-xs text-muted-foreground",
                charCount >= maxLength && "text-destructive"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
