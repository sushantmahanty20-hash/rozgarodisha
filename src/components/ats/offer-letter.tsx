"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Send,
  Check,
  Clock,
  Eye,
  Download,
  Edit3,
  DollarSign,
  Calendar,
  Gift,
  Building,
} from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type OfferStatus = "draft" | "sent" | "accepted" | "declined"

interface OfferLetterProps {
  className?: string
}

function OfferLetter({ className }: OfferLetterProps) {
  const [isEditing, setIsEditing] = React.useState(true)
  const [showPreview, setShowPreview] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const [status, setStatus] = React.useState<OfferStatus>("draft")

  const [form, setForm] = React.useState({
    position: "Senior Frontend Developer",
    department: "Engineering",
    salary: "150000",
    currency: "USD",
    startDate: "2026-09-01",
    employmentType: "Full-time",
    benefits: [
      "Health, Dental & Vision Insurance",
      "401(k) with 4% company match",
      "Unlimited PTO",
      "Remote work flexibility",
      "$5,000 annual learning budget",
      "Stock options",
    ],
    additionalNotes: "",
  })

  const handleSend = async () => {
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSending(false)
    setStatus("sent")
  }

  const statusConfig: Record<OfferStatus, { label: string; variant: "success" | "warning" | "info" | "destructive"; icon: React.ReactNode }> = {
    draft: { label: "Draft", variant: "info", icon: <Edit3 className="h-3 w-3" /> },
    sent: { label: "Sent", variant: "warning", icon: <Send className="h-3 w-3" /> },
    accepted: { label: "Accepted", variant: "success", icon: <Check className="h-3 w-3" /> },
    declined: { label: "Declined", variant: "destructive", icon: <Clock className="h-3 w-3" /> },
  }

  const currentStatus = statusConfig[status]

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant={currentStatus.variant} size="md" className="gap-1">
            {currentStatus.icon}
            {currentStatus.label}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-1" />
            {showPreview ? "Edit" : "Preview"}
          </Button>
          {status === "draft" && (
            <Button variant="gradient" size="sm" onClick={handleSend} loading={sending}>
              <Send className="h-4 w-4 mr-1" />
              Send Offer
            </Button>
          )}
        </div>
      </div>

      {showPreview ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glass">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">Offer Letter</h2>
                <p className="text-muted-foreground">Official Employment Offer</p>
              </div>

              <Separator />

              <div className="space-y-4 text-sm">
                <p>Dear <strong>Candidate</strong>,</p>
                <p>
                  We are pleased to extend an offer of employment for the position of{" "}
                  <strong>{form.position}</strong> in the <strong>{form.department}</strong> department.
                </p>

                <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/30 p-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Position</p>
                    <p className="font-medium">{form.position}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{form.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Compensation</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: form.currency, maximumFractionDigits: 0 }).format(parseInt(form.salary))}/year
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formatDate(form.startDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Employment Type</p>
                    <p className="font-medium">{form.employmentType}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    Benefits
                  </h4>
                  <ul className="space-y-1.5">
                    {form.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-muted-foreground">
                  We are excited about the possibility of you joining our team. This offer is valid for 14 days from the date of this letter.
                </p>

                <p className="text-muted-foreground">Sincerely,<br /><strong>HR Department</strong></p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Offer Details</CardTitle>
              <CardDescription>Fill in the offer letter details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Position
                  </label>
                  <Input
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-muted-foreground" />
                    Department
                  </label>
                  <Input
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    Annual Salary
                  </label>
                  <Input
                    type="number"
                    value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Gift className="h-3.5 w-3.5 text-muted-foreground" />
                  Benefits
                </label>
                <div className="flex flex-wrap gap-2">
                  {form.benefits.map((benefit, i) => (
                    <Badge key={i} variant="secondary" size="sm" className="gap-1">
                      <Check className="h-3 w-3 text-emerald-500" />
                      {benefit}
                      <button
                        onClick={() => setForm({ ...form, benefits: form.benefits.filter((_, j) => j !== i) })}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add benefit..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                        setForm({ ...form, benefits: [...form.benefits, (e.target as HTMLInputElement).value.trim()] })
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea
                  placeholder="Any additional notes or conditions..."
                  value={form.additionalNotes}
                  onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export { OfferLetter }
