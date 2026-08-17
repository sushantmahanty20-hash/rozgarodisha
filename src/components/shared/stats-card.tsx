"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  change?: number
  sparkline?: number[]
  className?: string
}

function MiniSparkline({ data }: { data: number[] }) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((value, i) => {
        const height = ((value - min) / range) * 100
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(height, 10)}%` }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={cn(
              "w-1.5 rounded-full",
              data[data.length - 1] >= data[0]
                ? "bg-emerald-500/60"
                : "bg-red-500/60"
            )}
          />
        )
      })}
    </div>
  )
}

function StatsCard({
  icon,
  title,
  value,
  change,
  sparkline,
  className,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Card variant="glass" className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                {icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {value}
                </p>
              </div>
              {change !== undefined && (
                <div className="flex items-center gap-1.5">
                  {isPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isPositive ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {change}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs last month
                  </span>
                </div>
              )}
            </div>

            {sparkline && (
              <div className="flex-1 flex justify-end items-end">
                <MiniSparkline data={sparkline} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { StatsCard }
export type { StatsCardProps }
