import React from 'react'
import { ExtendedFeatureCollection } from 'd3'
import { UseDataOutput } from '../../hooks/useData'
import { useProjection } from '../../hooks/useProjection'

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
  const { path, graticule } = useProjection({ data: land, width, height })
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
