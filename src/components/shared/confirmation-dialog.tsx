"use client"

import * as React from "react"
import { AlertTriangle, Info, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ConfirmVariant = "danger" | "warning" | "info"

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  variant?: ConfirmVariant
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  loading?: boolean
  icon?: React.ReactNode
}

const variantConfig: Record<
  ConfirmVariant,
  { icon: React.ReactNode; iconColor: string; confirmVariant: "destructive" | "default" | "outline" }
> = {
  danger: {
    icon: <Trash2 className="h-6 w-6" />,
    iconColor: "bg-red-500/15 text-red-600 dark:text-red-400",
    confirmVariant: "destructive",
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6" />,
    iconColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    confirmVariant: "default",
  },
  info: {
    icon: <Info className="h-6 w-6" />,
    iconColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    confirmVariant: "outline",
  },
}

function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "danger",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
  icon,
}: ConfirmationDialogProps) {
  const config = variantConfig[variant]

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                config.iconColor
              )}
            >
              {icon || config.icon}
            </div>
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="mt-1.5">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmationDialog }
export type { ConfirmationDialogProps, ConfirmVariant }
