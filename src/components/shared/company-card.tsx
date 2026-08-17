"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Users,
  Briefcase,
  MapPin,
  BadgeCheck,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CompanyData {
  id: string
  name: string
  logo?: string
  industry: string
  employeeCount: string
  jobOpenings: number
  location: string
  isVerified?: boolean
  isFollowing?: boolean
  description?: string
}

interface CompanyCardProps {
  company: CompanyData
  onFollow?: (companyId: string) => void
  onClick?: (companyId: string) => void
  className?: string
}

function CompanyCard({
  company,
  onFollow,
  onClick,
  className,
}: CompanyCardProps) {
  const [following, setFollowing] = React.useState(
    company.isFollowing ?? false
  )

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFollowing(!following)
    onFollow?.(company.id)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Card
        variant="glass"
        className="group cursor-pointer overflow-hidden"
        onClick={() => onClick?.(company.id)}
      >
        <div className="relative h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
        <CardContent className="relative px-6 pb-6">
          <div className="-mt-10 flex items-end justify-between">
            <Avatar size="xl" className="ring-4 ring-background">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="text-xl font-bold bg-primary/10">
                {company.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant={following ? "outline" : "default"}
              size="sm"
              onClick={handleFollow}
              className={cn(
                "transition-all duration-200",
                following && "border-primary/30"
              )}
            >
              {following ? "Following" : "Follow"}
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              {company.isVerified && (
                <BadgeCheck className="h-5 w-5 text-blue-500" />
              )}
            </div>

            <Badge variant="secondary" size="sm">
              {company.industry}
            </Badge>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {company.employeeCount}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {company.jobOpenings} open positions
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {company.location}
              </span>
            </div>

            {company.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {company.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { CompanyCard }
export type { CompanyData, CompanyCardProps }
