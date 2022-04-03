import { ScaleLinear, ScaleTime } from 'd3'
import React from 'react'

interface DataItem {
  id: string
  y: number
  x0: Date
  x1: Date
}

interface MarksProps {
  binnedData: DataItem[]
  xScale: ScaleTime<number, number, never>
  yScale: ScaleLinear<number, number, never>
  innerHeight: number
  toolTipFormat: (val: Date) => string | number
}

export const Marks = ({
  binnedData,
  yScale,
  xScale,
  toolTipFormat,
  innerHeight,
}: MarksProps) => (
  <g className="marks">
    {binnedData.map((d) => {
      const y = yScale(d.y)
      return (
        <rect
          key={d.id}
          x={xScale(d.x0)}
          y={y}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - y}
        >
          <title>{toolTipFormat(d.x0)}</title>
        </rect>
      )
    })}
  </g>
)
