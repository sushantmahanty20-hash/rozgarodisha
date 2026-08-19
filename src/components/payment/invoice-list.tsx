"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  FileText,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Receipt,
} from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  description: string
}

interface InvoiceListProps {
  invoices?: Invoice[]
  className?: string
}

const defaultInvoices: Invoice[] = [
  { id: "1", invoiceNumber: "INV-2026-001", date: "2026-08-01", amount: 29, status: "paid", description: "Pro Plan - Monthly" },
  { id: "2", invoiceNumber: "INV-2026-002", date: "2026-07-01", amount: 29, status: "paid", description: "Pro Plan - Monthly" },
  { id: "3", invoiceNumber: "INV-2026-003", date: "2026-06-01", amount: 29, status: "paid", description: "Pro Plan - Monthly" },
  { id: "4", invoiceNumber: "INV-2026-004", date: "2026-05-01", amount: 29, status: "failed", description: "Pro Plan - Monthly" },
  { id: "5", invoiceNumber: "INV-2026-005", date: "2026-04-01", amount: 24, status: "paid", description: "Pro Plan - Yearly" },
  { id: "6", invoiceNumber: "INV-2026-006", date: "2026-03-15", amount: 99, status: "pending", description: "Enterprise Plan - Upgrade" },
]

const statusConfig: Record<string, { icon: React.ReactNode; variant: "success" | "destructive" | "warning"; label: string }> = {
  paid: { icon: <CheckCircle className="h-3.5 w-3.5" />, variant: "success", label: "Paid" },
  failed: { icon: <XCircle className="h-3.5 w-3.5" />, variant: "destructive", label: "Failed" },
  pending: { icon: <Clock className="h-3.5 w-3.5" />, variant: "warning", label: "Pending" },
}

function InvoiceList({ invoices = defaultInvoices, className }: InvoiceListProps) {
  const [filter, setFilter] = React.useState<string>("all")

  const filteredInvoices = filter === "all"
    ? invoices
    : invoices.filter((inv) => inv.status === filter)

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Invoices
          </h3>
          <p className="text-sm text-muted-foreground">Manage your billing history</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-36 h-9">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card variant="glass" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="p-4 font-medium">Invoice</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredInvoices.map((invoice, i) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium">{invoice.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(invoice.date)}</td>
                    <td className="p-4 text-sm text-muted-foreground">{invoice.description}</td>
                    <td className="p-4 text-sm font-semibold">${invoice.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge
                        variant={statusConfig[invoice.status].variant}
                        size="sm"
                        className="gap-1"
                      >
                        {statusConfig[invoice.status].icon}
                        {statusConfig[invoice.status].label}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No invoices found for this filter.
          </div>
        )}
      </Card>
    </div>
  )
}

export { InvoiceList }
export type { Invoice, InvoiceListProps }
