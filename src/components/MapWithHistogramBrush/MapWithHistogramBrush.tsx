import React, { useMemo, useState } from 'react'
import { BubbleMap } from '../../components/BubbleMap/BubbleMap'
import { NavigationHistogram } from '../../components/NavigationHistogram/NavigationHistogram'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useMissingMigrantsData } from '../../hooks/useMissingMigrantsData'

const xValue = ({ date }: { date: Date }) => date
const yValue = ({ value }: { value: number }) => value
const mapAspectRatio = 0.5389784946236559

export const MapWithHistogramBrush = () => {
  const data = useMissingMigrantsData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const mapHeightByRatio = Math.round(width * mapAspectRatio)
  const mapHeight = Math.min(
    windowSize.height ? windowSize.height - 220 : mapHeightByRatio,
    mapHeightByRatio,
  )
  const histogramHeight = Math.max(mapHeight / 5, 140)
  const height = mapHeight + histogramHeight
  const [brushExtent, setBrushExtent] = useState<null | Date[]>(null)

  const filteredData = useMemo(() => {
    return data && brushExtent
      ? data.filter((d) => {
          const date = xValue(d)
          return date >= brushExtent[0] && date < brushExtent[1]
        })
      : data
  }, [data, brushExtent])

  if (!data) return <>Loading...</>

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap
        data={data}
        filteredData={filteredData}
        width={width}
        height={mapHeight}
      />
      <NavigationHistogram
        top={mapHeight}
        data={data}
        width={width}
        height={histogramHeight}
        brushExtent={brushExtent as [Date, Date]}
        setBrushExtent={setBrushExtent}
        xValue={xValue}
        yValue={yValue}
        xAxisLabel="Incident Date"
        yAxisLabel="Dead & Missing"
      />
    </svg>
  )
}
