"use client"

import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { cn } from "@/lib/utils"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  action?: {
    label: string
    onClick: () => void
  }
}

function toast({ title, description, variant = "default", action }: ToastProps) {
  return sonnerToast(title, {
    description,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    className: cn(
      "rounded-xl border bg-background text-foreground shadow-xl backdrop-blur-xl"
    ),
  })
}

function Toaster({ className, ...props }: React.ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border bg-background text-foreground shadow-xl backdrop-blur-xl group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      className={className}
      {...props}
    />
  )
}

export { Toaster, toast }
export type { ToastProps }
