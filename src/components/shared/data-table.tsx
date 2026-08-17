"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  EyeOff,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface Column<T> {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
  hidden?: boolean
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[]
  data: T[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKey?: keyof T
  selectable?: boolean
  bulkActions?: {
    label: string
    icon?: React.ReactNode
    onClick: (selectedIds: (string | number)[]) => void
    variant?: "default" | "destructive"
  }[]
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: { label: string; onClick: () => void }
  loading?: boolean
  loadingRows?: number
  pageSize?: number
  className?: string
}

function DataTable<T extends { id: string | number }>({
  columns: initialColumns,
  data,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKey,
  selectable = false,
  bulkActions = [],
  emptyTitle = "No results",
  emptyDescription = "No items found.",
  emptyAction,
  loading = false,
  loadingRows = 5,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("")
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(
    new Set()
  )
  const [currentPage, setCurrentPage] = React.useState(1)
  const [columns, setColumns] = React.useState(initialColumns)

  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data
    return data.filter((row) => {
      const value = row[searchKey]
      return String(value).toLowerCase().includes(search.toLowerCase())
    })
  }, [data, search, searchKey])

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey as keyof T]
      const bVal = b[sortKey as keyof T]
      if (aVal === bVal) return 0
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filteredData, sortKey, sortDir])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const visibleColumns = columns.filter((col) => !col.hidden)

  const allPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.has(row.id))

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const toggleSelectAll = () => {
    if (allPageSelected) {
      const newSet = new Set(selectedIds)
      paginatedData.forEach((row) => newSet.delete(row.id))
      setSelectedIds(newSet)
    } else {
      const newSet = new Set(selectedIds)
      paginatedData.forEach((row) => newSet.add(row.id))
      setSelectedIds(newSet)
    }
  }

  const toggleSelect = (id: string | number) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedIds(newSet)
  }

  const toggleColumn = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, hidden: !col.hidden } : col
      )
    )
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const renderSortIcon = (columnId: string, sortable?: boolean) => {
    if (!sortable) return null
    if (sortKey === columnId) {
      return sortDir === "asc" ? (
        <ArrowUp className="ml-1 h-3.5 w-3.5" />
      ) : (
        <ArrowDown className="ml-1 h-3.5 w-3.5" />
      )
    }
    return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-50" />
  }

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {searchable && <Skeleton className="h-10 w-72" />}
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-muted/50 p-4">
            <div className="flex gap-4">
              {initialColumns.map((col) => (
                <Skeleton key={col.id} className="h-4 flex-1" />
              ))}
            </div>
          </div>
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="border-t p-4">
              <div className="flex gap-4">
                {initialColumns.map((col) => (
                  <Skeleton key={col.id} className="h-4 flex-1" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3 flex-wrap">
        {searchable && (
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-3.5 w-3.5" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={!col.hidden}
                  onCheckedChange={() => toggleColumn(col.id)}
                >
                  {col.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence>
        {selectedIds.size > 0 && bulkActions.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
              <Badge variant="default" size="sm">
                {selectedIds.size} selected
              </Badge>
              <div className="flex items-center gap-2">
                {bulkActions.map((action, i) => (
                  <Button
                    key={i}
                    variant={
                      action.variant === "destructive" ? "destructive" : "outline"
                    }
                    size="sm"
                    onClick={() => action.onClick(Array.from(selectedIds))}
                    className="gap-1.5"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-7 w-7"
                onClick={() => setSelectedIds(new Set())}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {sortedData.length === 0 && !loading ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {selectable && (
                    <th className="w-12 px-4 py-3">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded border cursor-pointer transition-all",
                          allPageSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-primary/50"
                        )}
                        onClick={toggleSelectAll}
                      >
                        {allPageSelected && (
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.map((col) => (
                    <th
                      key={col.id}
                      className={cn(
                        "px-4 py-3 text-left font-medium text-muted-foreground",
                        col.sortable && "cursor-pointer select-none group",
                        col.className
                      )}
                      onClick={() => col.sortable && toggleSort(col.id)}
                    >
                      <div className="flex items-center">
                        {col.header}
                        {renderSortIcon(col.id, col.sortable)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "border-b transition-colors last:border-0",
                      selectedIds.has(row.id) && "bg-primary/5"
                    )}
                  >
                    {selectable && (
                      <td className="w-12 px-4 py-3">
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border cursor-pointer transition-all",
                            selectedIds.has(row.id)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input hover:border-primary/50"
                          )}
                          onClick={() => toggleSelect(row.id)}
                        >
                          {selectedIds.has(row.id) && (
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                    )}
                    {visibleColumns.map((col) => (
                      <td key={col.id} className={cn("px-4 py-3", col.className)}>
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                            ? String(row[col.accessorKey] ?? "")
                            : null}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <nav className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number
              if (totalPages <= 5) {
                page = i + 1
              } else if (currentPage <= 3) {
                page = i + 1
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i
              } else {
                page = currentPage - 2 + i
              }
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}

export { DataTable }
export type { Column, DataTableProps }
