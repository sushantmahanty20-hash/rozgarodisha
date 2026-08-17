"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Lock,
  Tag,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CheckoutFormProps {
  plan?: {
    name: string
    price: number
    interval: "monthly" | "yearly"
  }
  onPay?: () => void
  className?: string
}

function CheckoutForm({
  plan = { name: "Pro", price: 29, interval: "monthly" },
  onPay,
  className,
}: CheckoutFormProps) {
  const [loading, setLoading] = React.useState(false)
  const [promoCode, setPromoCode] = React.useState("")
  const [promoApplied, setPromoApplied] = React.useState(false)
  const [cardDetails, setCardDetails] = React.useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })
  const [billing, setBilling] = React.useState({
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  })

  const discount = promoApplied ? Math.round(plan.price * 0.2) : 0
  const total = plan.price - discount

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setPromoApplied(true)
    }
  }

  const handlePay = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    onPay?.()
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Card Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Card Number</label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  leftIcon={<CreditCard className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name on Card</label>
                <Input
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Expiry</label>
                  <Input
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">CVC</label>
                  <Input
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={billing.email}
                  onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Address</label>
                <Input
                  placeholder="123 Main St"
                  value={billing.address}
                  onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    placeholder="San Francisco"
                    value={billing.city}
                    onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">ZIP</label>
                  <Input
                    placeholder="94102"
                    value={billing.zip}
                    onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    placeholder="US"
                    value={billing.country}
                    onChange={(e) => setBilling({ ...billing, country: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{plan.name} Plan ({plan.interval})</span>
                  <span className="font-medium">${plan.price.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-emerald-500 flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      Promo Discount (20%)
                    </span>
                    <span className="text-emerald-500">-${discount.toFixed(2)}</span>
                  </motion.div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                  >
                    {promoApplied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-emerald-500 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Promo code SAVE20 applied!
                  </p>
                )}
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={handlePay}
                loading={loading}
              >
                <Lock className="h-4 w-4 mr-2" />
                Pay ${total.toFixed(2)}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { CheckoutForm }
