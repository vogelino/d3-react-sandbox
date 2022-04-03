import React, { useRef, useMemo, useEffect } from 'react'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import {
  scaleTime,
  scaleLinear,
  max,
  extent,
  timeMonths,
  timeFormat,
  select,
  brushX,
  brushSelection,
} from 'd3'
import { bin, sum } from 'd3-array'
import './NavigationHistogram.css'

const margin = {
  top: 10,
  right: 40,
  bottom: 60,
  left: 80,
}
const xAxisLabelOffset = 45
const yAxisLabelOffset = 55

interface DataItem {
  id: string
  value: number
  date: Date
}

interface DateHistogramProps {
  data: DataItem[]
  top: number
  height: number
  width: number
  setBrushExtent: (extent: Date[] | null) => void
  xValue: (d: { date: Date }) => Date
  yValue: (d: { value: number }) => number
  xAxisLabel?: string
  xAxisTickFormat?: (d: Date) => string
  yAxisLabel?: string
}

const defaultFormatter = timeFormat('%Y')

export const NavigationHistogram = ({
  data,
  top,
  height,
  width,
  setBrushExtent,
  xValue,
  yValue,
  xAxisLabel = 'Date',
  xAxisTickFormat = defaultFormatter,
  yAxisLabel = 'Value',
}: DateHistogramProps) => {
  const brushRef = useRef(null)

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xScale = useMemo(() => {
    if (!data) return
    const dataExtent = extent(data, xValue)

    if (
      typeof dataExtent[0] === 'undefined' ||
      typeof dataExtent[1] === 'undefined'
    )
      return
    return scaleTime()
      .domain(dataExtent as Date[])
      .range([0, innerWidth])
      .nice()
  }, [data, xValue, innerWidth])

  const binnedData = useMemo(() => {
    if (!xScale || !data) return
    const [start, stop] = xScale.domain()
    return bin<DataItem, Date>()
      .value(xValue)
      .domain([start, stop])
      .thresholds(timeMonths(start, stop))(data)
      .map((array, idx) => {
        const sumBin = sum(array, yValue)
        return {
          id: array.map((d) => d.id).join('-') || `empty-${idx}`,
          y: sumBin,
          x0: array.x0 || new Date(),
          x1: array.x1 || new Date(),
        }
      })
  }, [xValue, xScale, yValue, data])

  const yScale = useMemo(() => {
    if (!data || !binnedData) return
    return scaleLinear()
      .domain([0, max(binnedData, ({ y }) => y) || 100])
      .range([innerHeight, 0])
      .nice()
  }, [data, binnedData, innerHeight])

  useEffect(() => {
    if (!brushRef.current || !xScale) return
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ])
    brush(select(brushRef.current))
    brush.on('brush end', function onBrush() {
      const selection = brushSelection(this)
      // @ts-ignore
      setBrushExtent(selection ? selection.map(xScale.invert) : null)
    })
  }, [setBrushExtent, xScale, innerWidth, innerHeight])

  if (!xScale || !data || !yScale || !binnedData) return null
  return (
    <g transform={`translate(0,${top})`} className="navigation-histogram">
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
          label={xAxisLabel}
          labelOffset={xAxisLabelOffset}
        />
        <AxisLeft
          label={yAxisLabel}
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={7}
          innerHeight={innerHeight}
          labelOffset={yAxisLabelOffset}
        />
        {binnedData && (
          <Marks
            toolTipFormat={defaultFormatter}
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            innerHeight={innerHeight}
          />
        )}
        <g ref={brushRef} />
      </g>
    </g>
  )
}
