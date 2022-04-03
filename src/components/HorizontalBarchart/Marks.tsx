import React from 'react'
import { ScaleLinear } from 'd3'

interface MarksProps {
  data: { id: number; y: number; sum: number; height: number }[]
  barGap: number
  xScale: ScaleLinear<number, number, never>
}

export const Marks = ({ data, barGap, xScale }: MarksProps) => (
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
