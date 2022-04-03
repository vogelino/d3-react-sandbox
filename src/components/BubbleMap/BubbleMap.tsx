import React, { useMemo } from 'react'
import { LandMarks } from './LandMarks'
import { useProjection } from '../../hooks/useProjection'
import { useWorldMapLandMarksData } from '../../hooks/useWorldMapLandMarksData'
import { scaleSqrt, max } from 'd3'
import './BubbleMap.css'

interface BubbleMapProps {
  data: {
    id: string
    value: number
    date: Date
    latitude: number
    longitude: number
  }[]
  width: number
  height: number
}

const sizeValue = (d: { value: number }) => d.value
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
      {data.map(({ id, value, latitude, longitude }) => {
        const [x, y] = projection.projection([latitude, longitude]) || []
        return (
          <circle
            className="data-circle"
            key={id}
            cx={x}
            cy={y}
            r={sizeScale(value)}
          />
        )
      })}
    </g>
  )
}
