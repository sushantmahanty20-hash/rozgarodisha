"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Clock,
  Heart,
  ArrowRight,
  Briefcase,
  Zap,
  Star,
} from "lucide-react"
import { cn, formatRelativeTime, formatSalary } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobData {
  id: string
  title: string
  company: {
    name: string
    logo?: string
  }
  location: string
  salaryMin: number
  salaryMax: number
  currency?: string
  employmentType: string
  workMode: string
  skills: string[]
  postedAt: string | Date
  isSaved?: boolean
  isFeatured?: boolean
  isUrgent?: boolean
}

type JobCardVariant = "default" | "compact" | "detailed"

interface JobCardProps {
  job: JobData
  variant?: JobCardVariant
  onSave?: (jobId: string) => void
  onApply?: (jobId: string) => void
  className?: string
}

function JobCard({
  job,
  variant = "default",
  onSave,
  onApply,
  className,
}: JobCardProps) {
  const [saved, setSaved] = React.useState(job.isSaved ?? false)

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
    onSave?.(job.id)
  }

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    onApply?.(job.id)
  }

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={className}
      >
        <Card
          variant="glass"
          className="group relative cursor-pointer overflow-hidden p-4"
        >
          {job.isFeatured && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10" />
          )}
          <div className="relative flex items-center gap-3">
            <Avatar size="md">
              <AvatarImage src={job.company.logo} alt={job.company.name} />
              <AvatarFallback>{job.company.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold">{job.title}</h4>
              <p className="truncate text-xs text-muted-foreground">
                {job.company.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleSave}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  saved
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Card
        variant="glass"
        className={cn(
          "group relative cursor-pointer overflow-hidden",
          job.isFeatured &&
            "border-amber-500/30 shadow-amber-500/10 dark:border-amber-400/20",
          job.isUrgent && "border-red-500/30 shadow-red-500/10"
        )}
      >
        {job.isFeatured && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
        )}
        {job.isFeatured && (
          <div className="absolute right-4 top-4">
            <Badge
              variant="warning"
              className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
            >
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}
        {job.isUrgent && !job.isFeatured && (
          <div className="absolute right-4 top-4">
            <Badge
              variant="destructive"
              className="gap-1"
            >
              <Zap className="h-3 w-3" />
              Urgent
            </Badge>
          </div>
        )}

        <CardContent className="relative p-6">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="shrink-0">
              <AvatarImage src={job.company.logo} alt={job.company.name} />
              <AvatarFallback className="text-lg font-bold">
                {job.company.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {job.company.name}
                </p>
                <h3 className="mt-0.5 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="font-semibold text-foreground">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" size="sm">
                  <Briefcase className="mr-1 h-3 w-3" />
                  {job.employmentType}
                </Badge>
                <Badge variant="info" size="sm">
                  {job.workMode}
                </Badge>
                {variant === "detailed" &&
                  job.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="outline" size="sm">
                      {skill}
                    </Badge>
                  ))}
                {variant === "default" &&
                  job.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" size="sm">
                      {skill}
                    </Badge>
                  ))}
                {variant === "default" && job.skills.length > 3 && (
                  <Badge variant="outline" size="sm">
                    +{job.skills.length - 3}
                  </Badge>
                )}
              </div>

              {variant === "detailed" && job.skills.length > 6 && (
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(6).map((skill) => (
                    <Badge key={skill} variant="outline" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {formatRelativeTime(job.postedAt)}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleSave}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-200",
                    saved
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-muted-foreground hover:text-red-500"
                  )}
                />
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={handleApply}
                className="gap-1.5"
              >
                Apply
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { JobCard }
export type { JobData, JobCardVariant, JobCardProps }
