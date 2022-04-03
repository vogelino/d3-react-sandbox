import React from 'react'
import { ExtendedFeatureCollection } from 'd3'
import { useWorldMapLandMarksData } from '../../hooks/useWorldMapLandMarksData'
import { useProjection } from '../../hooks/useProjection'

interface BubbleMapLandMarksProps {
  data: ReturnType<typeof useWorldMapLandMarksData>
  projection: ReturnType<typeof useProjection>
}

export const LandMarks = ({ data, projection }: BubbleMapLandMarksProps) => {
  if (!data || !projection) return null
  const { path, graticule } = projection
  const { land, interiors } = data
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
