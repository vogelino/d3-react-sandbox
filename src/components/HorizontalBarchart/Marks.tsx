import React, { SetStateAction, useCallback } from 'react'
import { ScaleLinear } from 'd3'

interface DataItem {
  id: number
  y: number
  sum: number
  height: number
}

interface MarksProps {
  data: DataItem[]
  barGap: number
  xScale: ScaleLinear<number, number, never>
  onMouseEnter?: (d: DataItem) => void
  onMouseLeave?: (d: null) => void
  hoveredElementId?: number | null
}

export const Marks = ({
  data,
  barGap,
  xScale,
  hoveredElementId,
  onMouseEnter = () => undefined,
  onMouseLeave = () => undefined,
}: MarksProps) => (
  <>
    {data.map(({ id, y, sum, height }) => (
      <g key={id} transform={`translate(0,${y + barGap / 2})`}>
        <rect
          x={0}
          y={0}
          height={height - barGap}
          width={Math.max(2, xScale(sum))}
          className={`bar ${
            hoveredElementId && hoveredElementId !== id ? 'dimmed' : ''
          }`}
          onMouseEnter={() => onMouseEnter({ id, y, sum, height })}
          onMouseLeave={() => onMouseLeave(null)}
        />
      </g>
    ))}
  </>
)
