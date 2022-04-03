import React, { useMemo } from 'react'
import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule,
  ExtendedFeatureCollection,
} from 'd3'
import { UseDataOutput } from '../../hooks/useData'

interface BubbleMapLandMarksProps {
  data: UseDataOutput
  width: number
  height: number
}

export const LandMarks = ({
  data: { land, interiors },
  width,
  height,
}: BubbleMapLandMarksProps) => {
  const { path, graticule } = useMemo(() => {
    const projection = geoNaturalEarth1().fitSize([width, height], land)
    const path = geoPath(projection)
    const graticule = geoGraticule()
    return { path, graticule }
  }, [land, width, height])
  return (
    <g className="landmarks">
      <path className="sphere" d={path({ type: 'Sphere' }) || ''} />
      <path className="graticules" d={path(graticule()) || ''} />
      <path
        className="land"
        d={path((land as ExtendedFeatureCollection).features[0]) || ''}
      />
      <path className="interiors" d={path(interiors) || ''} />
    </g>
  )
}
