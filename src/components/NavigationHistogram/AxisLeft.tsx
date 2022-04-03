import { ScaleLinear } from 'd3'
import React from 'react'

interface AxisLeftProps {
  yScale: ScaleLinear<number, number, number>
  innerWidth: number
  tickOffset?: number
  label?: string
  labelOffset?: number
  innerHeight: number
}

export const AxisLeft = ({
  yScale,
  innerWidth,
  tickOffset = 3,
  labelOffset = 30,
  label = '',
  innerHeight,
}: AxisLeftProps) => (
  <>
    {yScale.ticks(5).map((tickValue: number) => (
      <g
        key={tickValue}
        className="tick"
        transform={`translate(0,${yScale(tickValue)})`}
      >
        <line x2={innerWidth} />
        <text
          key={tickValue}
          style={{ textAnchor: 'end' }}
          dy=".32em"
          x={-tickOffset}
        >
          {tickValue}
        </text>
      </g>
    ))}
    {label && (
      <text
        className="axis-label"
        textAnchor="middle"
        transform={` translate(${-labelOffset},
      ${innerHeight / 2}) rotate(-90)`}
      >
        {label}
      </text>
    )}
  </>
)
