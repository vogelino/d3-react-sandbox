import { extent, timeYears, sum, scaleTime, scaleLinear } from 'd3'
import { bin } from 'd3-array'
import React, { useMemo } from 'react'
import { useMissingMigrantsData } from '../../hooks/useMissingMigrantsData'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AxisLeft } from './AxisLeft'
import { AxisBottom } from './AxisBottom'
import './HorizontalBarchart.css'
import { Marks } from './Marks'

interface DataItem {
  id: string
  value: number
  date: Date
}

const margins = {
  top: 0,
  left: 60,
  right: 20,
  bottom: 60,
}
const xValue = (d: DataItem) => d.value
const yValue = (d: DataItem) => d.date
const barGap = 8
const xAxisOffset = 8
const yAxisOffset = xAxisOffset

export const HorizontalBarchart = () => {
  const data = useMissingMigrantsData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const height = Math.max(400, (windowSize.height || 500) - 100)
  const innerWidth = width - margins.left - margins.right
  const innerHeight = height - margins.top - margins.bottom

  const yScale = useMemo(() => {
    if (!data) return
    const dataExtent = extent(data, yValue)

    if (
      typeof dataExtent[0] === 'undefined' ||
      typeof dataExtent[1] === 'undefined'
    )
      return null
    return scaleTime()
      .domain(dataExtent as Date[])
      .range([0, innerHeight])
      .nice()
  }, [data, innerHeight])

  const binnedData = useMemo(() => {
    if (!data || !yScale) return null
    const [start, stop] = yScale.domain()
    return bin<DataItem, Date>()
      .value(yValue)
      .domain([start, stop])
      .thresholds(timeYears(start, stop))(data)
      .map((array) => {
        const sumBin = sum(array, xValue)
        const start = yScale(array.x0 || new Date())
        const end = yScale(array.x1 || new Date())
        return {
          id: (array.x0 || new Date()).getFullYear(),
          y: Math.round(start),
          sum: sumBin,
          height: Math.round(end - start),
        }
      })
  }, [data, yScale])

  const xScale = useMemo(() => {
    if (!binnedData || !innerWidth) return null
    const dataExtent = extent(binnedData, (d) => d.sum)
    if (
      typeof dataExtent[0] === 'undefined' ||
      typeof dataExtent[1] === 'undefined'
    )
      return null
    return scaleLinear()
      .domain(dataExtent as number[])
      .range([0, innerWidth])
      .nice()
  }, [binnedData, innerWidth])

  if (!binnedData || !yScale || !xScale) return <>Loading...</>

  return (
    <svg height={height} width={width} className="horizontal-barchart">
      <g transform={`translate(${margins.left},${margins.top})`}>
        <AxisBottom
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          xScale={xScale}
          labelOffset={xAxisOffset}
        />
        <AxisLeft data={binnedData} offset={yAxisOffset} barGap={barGap} />
        <Marks barGap={barGap} data={binnedData} xScale={xScale} />
      </g>
    </svg>
  )
}
