"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

interface DonutChartData {
  data: { name: string; value: number; color: string }[]
  height?: number
  innerRadius?: number
  outerRadius?: number
  showLegend?: boolean
  showTooltip?: boolean
  centerLabel?: string
  centerValue?: string | number
  className?: string
}

export function DonutChartComponent({
  data, height = 300, innerRadius = 60, outerRadius = 90, showLegend = true, showTooltip = true, centerLabel, centerValue, className,
}: DonutChartData) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          {showTooltip && <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />}
          {showLegend && <Legend />}
          {centerLabel && (
            <>
              <text x="50%" y="48%" textAnchor="middle" className="fill-[#64748b] text-xs dark:fill-gray-400">{centerLabel}</text>
              <text x="50%" y="56%" textAnchor="middle" className="fill-[#0f172a] text-2xl font-bold dark:fill-white">{centerValue}</text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
