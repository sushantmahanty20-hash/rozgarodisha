"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"
import { cn, truncate } from "@/lib/utils"

interface BreadcrumbProps {
  className?: string
  customSegments?: { label: string; href?: string }[]
  maxItems?: number
}

function Breadcrumb({
  className,
  customSegments,
  maxItems = 4,
}: BreadcrumbProps) {
  const pathname = usePathname()

  const segments = React.useMemo(() => {
    if (customSegments) return customSegments

    const parts = pathname.split("/").filter(Boolean)
    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/")
      const label = part
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
      const isLast = index === parts.length - 1
      return { label, href: isLast ? undefined : href }
    })
  }, [pathname, customSegments])

  const shouldTruncate = segments.length > maxItems
  const visibleSegments = shouldTruncate
    ? [
        segments[0],
        { label: "...", href: undefined },
        ...segments.slice(-2),
      ]
    : segments

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm", className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              {isLast || !segment.href ? (
                <span
                  className={cn(
                    "font-medium text-foreground",
                    isLast && "text-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                  title={
                    shouldTruncate && index === visibleSegments.length - 1
                      ? segments[segments.length - 1].label
                      : undefined
                  }
                >
                  {shouldTruncate && index === visibleSegments.length - 1
                    ? truncate(segment.label, 20)
                    : segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {segment.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
export type { BreadcrumbProps }
