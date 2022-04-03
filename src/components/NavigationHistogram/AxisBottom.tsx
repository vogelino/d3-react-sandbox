import { ScaleTime } from 'd3'
import React, { useMemo } from 'react'

interface AxisBottomProps {
  xScale: ScaleTime<number, number, number>
  innerHeight: number
  innerWidth: number
  tickFormat: (d: Date) => string
  tickOffset?: number
  labelOffset?: number
  label?: string
}

export const AxisBottom = ({
  xScale,
  innerHeight,
  innerWidth,
  tickFormat,
  tickOffset = 3,
  labelOffset = 30,
  label,
}: AxisBottomProps) => (
  <>
    {xScale.ticks().map((tickValue) => (
      <g
        className="tick"
        key={tickValue.toISOString()}
        transform={`translate(${xScale(tickValue)},0)`}
      >
        <line y2={innerHeight} />
        <text
          style={{ textAnchor: 'middle' }}
          y={innerHeight + tickOffset}
          dy=".71em"
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    ))}
    {label && (
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + labelOffset}
        textAnchor="middle"
      >
        {label}
      </text>
    )}
  </>
)
