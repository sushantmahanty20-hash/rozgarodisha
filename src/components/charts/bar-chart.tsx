"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface BarChartData {
  data: Record<string, unknown>[]
  xKey: string
  bars: { key: string; color: string; name: string; radius?: [number, number, number, number] }[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  layout?: "horizontal" | "vertical"
  className?: string
}

export function BarChartComponent({
  data, xKey, bars, height = 300, showGrid = true, showLegend = true, showTooltip = true, layout = "horizontal", className,
}: BarChartData) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout={layout} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />}
          {layout === "horizontal" ? (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            </>
          ) : (
            <>
              <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={120} />
            </>
          )}
          {showTooltip && <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />}
          {showLegend && <Legend />}
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.name}
              fill={bar.color}
              radius={bar.radius || [6, 6, 0, 0]}
              barSize={bars.length > 1 ? 20 : 32}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
