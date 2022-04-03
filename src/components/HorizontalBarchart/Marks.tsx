import React from 'react'

export const Marks = ({ data, barGap, xScale }) => (
  <>
    {data.map(({ id, y, sum, height }) => (
      <g key={id} transform={`translate(0,${y + barGap / 2})`}>
        <rect
          x={0}
          y={0}
          height={height - barGap}
          width={Math.max(2, xScale(sum))}
          className="bar"
        />
      </g>
    ))}
  </>
)
