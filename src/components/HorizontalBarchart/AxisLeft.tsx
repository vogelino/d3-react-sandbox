import React from 'react'

export const AxisLeft = ({ data, offset, barGap }) => (
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
