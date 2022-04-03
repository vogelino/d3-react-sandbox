import React from 'react'

interface AxisLeftProps {
  data: { id: number; y: number; height: number }[]
  offset: number
  barGap: number
}

export const AxisLeft = ({ data, offset, barGap }: AxisLeftProps) => (
  <>
    {data.map(({ id, y, height }) => (
      <text
        className="tick tick-left"
        key={id}
        x={-offset}
        y={y + Math.round(height / 2) + barGap / 2}
        textAnchor="end"
      >
        {id}
      </text>
    ))}
  </>
)
