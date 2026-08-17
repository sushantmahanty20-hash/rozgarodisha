"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean
}

function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-muted",
        shimmer && "animate-pulse relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent dark:before:via-white/5 before:animate-[shimmer_2s_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
