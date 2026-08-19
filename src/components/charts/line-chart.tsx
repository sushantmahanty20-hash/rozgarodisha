"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface LineChartData {
  data: Record<string, unknown>[]
  xKey: string
  lines: { key: string; color: string; name: string; dashed?: boolean }[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function LineChartComponent({
  data, xKey, lines, height = 300, showGrid = true, showLegend = true, showTooltip = true, className,
}: LineChartData) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          {showTooltip && <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />}
          {showLegend && <Legend />}
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              strokeDasharray={line.dashed ? "5 5" : undefined}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
