import React, { useMemo } from 'react'
import { LandMarks } from './LandMarks'
import { useMissingMigrantsData } from '../../hooks/useMissingMigrantsData'
import { useProjection } from '../../hooks/useProjection'
import { useWorldMapLandMarksData } from '../../hooks/useWorldMapLandMarksData'
import { scaleSqrt, max } from 'd3'
import './BubbleMap.css'

interface BubbleMapProps {
  data: ReturnType<typeof useMissingMigrantsData>
  width: number
  height: number
}

const sizeValue = (d: { deadOrMissingTotal: number }) => d.deadOrMissingTotal
const maxRadius = 20

export const BubbleMap = ({ data, width, height }: BubbleMapProps) => {
  const landMarksData = useWorldMapLandMarksData()
  const projection = useProjection({ data: landMarksData?.land, width, height })
  const sizeScale = useMemo(() => {
    if (!data) return
    return scaleSqrt()
      .domain([0, max(data, sizeValue) || 100])
      .range([1, maxRadius])
  }, [data])

  if (!data || !sizeScale || !projection?.projection) return null
  return (
    <g className="bubble-map">
      <LandMarks projection={projection} data={landMarksData} />
      {data.map(({ id, deadOrMissingTotal, latitude, longitude }) => {
        const [x, y] = projection.projection([latitude, longitude]) || []
        return (
          <circle
            className="data-circle"
            key={id}
            cx={x}
            cy={y}
            r={sizeScale(deadOrMissingTotal)}
          />
        )
      })}
    </g>
  )
}
