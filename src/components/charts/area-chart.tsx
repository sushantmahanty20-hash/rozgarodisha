"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface AreaChartData {
  data: Record<string, unknown>[]
  xKey: string
  areas: { key: string; color: string; name: string; gradient?: boolean }[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function AreaChartComponent({
  data, xKey, areas, height = 300, showGrid = true, showLegend = true, showTooltip = true, className,
}: AreaChartData) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {areas.map((area) => (
              <linearGradient key={area.key} id={`gradient-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={area.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} className="text-xs" />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} className="text-xs" />
          {showTooltip && <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />}
          {showLegend && <Legend />}
          {areas.map((area) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              name={area.name}
              stroke={area.color}
              strokeWidth={2}
              fill={area.gradient !== false ? `url(#gradient-${area.key})` : area.color}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
