"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, getInitials } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
        xl: "h-20 w-20 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  fallback?: string
}

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

type StatusIndicatorProps = {
  status: "online" | "offline" | "busy" | "away"
  className?: string
}

function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-muted-foreground/50",
    busy: "bg-destructive",
    away: "bg-amber-500",
  }

  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
        statusColors[status],
        status === "online" && "h-2.5 w-2.5",
        status === "offline" && "h-2.5 w-2.5",
        status === "busy" && "h-2.5 w-2.5",
        status === "away" && "h-2.5 w-2.5",
        className
      )}
    />
  )
}

interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  className?: string
}

function AvatarGroup({ children, max = 4, className }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children)
  const visible = childArray.slice(0, max)
  const remaining = childArray.length - max

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {visible.map((child, i) => (
        <div key={i} className="relative ring-2 ring-background rounded-full">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
          +{remaining}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, StatusIndicator, AvatarGroup }
