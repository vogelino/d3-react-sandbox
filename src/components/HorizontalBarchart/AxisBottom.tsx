import { ScaleLinear } from 'd3'
import React from 'react'

interface AxisBottomProps {
  labelOffset?: number
  innerHeight: number
  innerWidth: number
  xScale: ScaleLinear<number, number, never>
}

export const AxisBottom = ({
  labelOffset = 8,
  innerHeight,
  innerWidth,
  xScale,
}: AxisBottomProps) => (
  <>
    {xScale.ticks().map((tickValue) => (
      <g
        key={tickValue}
        transform={`translate(${xScale(tickValue)},0)`}
        className="tick-group"
      >
        <rect
          className="tick-line"
          x={0}
          y={0}
          width={1}
          height={innerHeight}
        />
        <text
          x={0}
          y={innerHeight + labelOffset * 2}
          className="tick tick-bottom"
          textAnchor="middle"
        >
          {tickValue}
        </text>
      </g>
    ))}
    <g transform={`translate(${0},${innerHeight})`}>
      <line className="x-axis-line" x1={0} y1={0} x2={innerWidth} y2={0} />
    </g>
  </>
)
