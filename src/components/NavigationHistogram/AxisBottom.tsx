import { ScaleTime } from 'd3'
import React, { useMemo } from 'react'

interface AxisBottomProps {
  xScale: ScaleTime<number, number, number>
  innerHeight: number
  tickFormat: (d: Date) => string
  tickOffset?: number
}

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}: AxisBottomProps) =>
  useMemo(
    () => (
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
      </>
    ),
    [xScale, innerHeight, tickFormat, tickOffset],
  )
