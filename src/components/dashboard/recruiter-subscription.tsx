"use client";

import * as React from "react";
import { Check, Crown, Zap, Building2, Sparkles, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: 0,
    period: "/month",
    desc: "For individual consultants starting out",
    icon: Zap,
    features: ["Up to 25 candidates", "5 active clients", "2 team members", "Basic pipeline", "Community support"],
    current: false,
    accent: "from-slate-500 to-slate-700",
  },
  {
    name: "Professional",
    price: 4999,
    period: "/month",
    desc: "For growing agencies with active client work",
    icon: Building2,
    features: ["Unlimited candidates", "Unlimited clients", "10 team members", "Full pipeline + analytics", "Verification badge", "Priority support"],
    current: true,
    accent: "from-[#2563eb] to-[#06b6d4]",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 14999,
    period: "/month",
    desc: "For large staffing firms and RPO providers",
    icon: Crown,
    features: ["Everything in Professional", "Unlimited team members", "API access", "Dedicated account manager", "Custom reporting", "SSO / SAML"],
    current: false,
    accent: "from-violet-600 to-fuchsia-600",
  },
];

export function SubscriptionPage() {
  const plan = (p: (typeof PLANS)[number]) => {
    toast.success(`Subscribed to the ${p.name} plan`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] dark:text-white">Subscription</h1>
        <p className="text-sm text-muted-foreground">Choose a plan that scales with your agency</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <Card key={p.name} className={cn("relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-none", p.current && "border-[#2563eb]/50 ring-2 ring-[#2563eb]/20")}>
            {p.popular && (
              <div className="absolute right-4 top-4">
                <Badge className="gap-1 bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <div className={cn("mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white", p.accent)}>
                <p.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{p.name}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</span>
                <span className="pb-1 text-sm text-muted-foreground">{p.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className={cn("mt-6 w-full", p.current && "bg-gradient-to-r from-[#2563eb] to-[#06b6d4]")}
                variant={p.current ? "default" : "outline"}
                disabled={p.current}
                onClick={() => plan(p)}
              >
                {p.current ? (
                  <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Current Plan</span>
                ) : (
                  `Choose ${p.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}