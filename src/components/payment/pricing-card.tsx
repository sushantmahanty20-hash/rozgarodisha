"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, X, Zap, Crown, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Feature {
  name: string
  included: boolean
}

interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: Feature[]
  popular?: boolean
  icon: React.ReactNode
}

interface PricingCardProps {
  plans?: PricingPlan[]
  onSelect?: (planId: string) => void
  className?: string
}

const defaultPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for getting started",
    icon: <Star className="h-5 w-5" />,
    features: [
      { name: "5 job applications/month", included: true },
      { name: "Basic resume builder", included: true },
      { name: "Email notifications", included: true },
      { name: "AI resume scoring", included: false },
      { name: "Priority support", included: false },
      { name: "Advanced analytics", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For serious job seekers",
    icon: <Zap className="h-5 w-5" />,
    popular: true,
    features: [
      { name: "Unlimited applications", included: true },
      { name: "Advanced resume builder", included: true },
      { name: "All notification types", included: true },
      { name: "AI resume scoring", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "For teams and companies",
    icon: <Crown className="h-5 w-5" />,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Team management", included: true },
      { name: "ATS integration", included: true },
      { name: "AI candidate ranking", included: true },
      { name: "Dedicated support", included: true },
      { name: "Advanced analytics", included: true },
    ],
  },
]

function PricingCard({
  plans = defaultPlans,
  onSelect,
  className,
}: PricingCardProps) {
  const [annual, setAnnual] = React.useState(false)

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !annual && "text-foreground")}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors duration-200",
            annual ? "bg-primary" : "bg-muted"
          )}
        >
          <motion.div
            animate={{ x: annual ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-md"
          />
        </button>
        <span className={cn("text-sm font-medium", annual && "text-foreground")}>
          Yearly
          <Badge variant="success" size="sm" className="ml-1.5">Save 20%</Badge>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -inset-[1px] rounded-[17px] bg-gradient-to-br from-primary via-accent to-primary opacity-75 blur-[1px]" />
            )}
            <Card
              variant={plan.popular ? "default" : "glass"}
              className={cn("relative h-full", plan.popular && "border-primary/50")}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-to-r from-primary to-accent text-white gap-1">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    plan.popular ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                          <Check className="h-3 w-3 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                          <X className="h-3 w-3 text-muted-foreground/50" />
                        </div>
                      )}
                      <span className={cn(!feature.included && "text-muted-foreground")}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  onClick={() => onSelect?.(plan.id)}
                >
                  {plan.monthlyPrice === 0 ? "Get Started" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { PricingCard }
export type { PricingPlan, PricingCardProps }
