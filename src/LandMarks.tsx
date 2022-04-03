import React from 'react'
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3'
import { useData } from './useData'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

interface BubbleMapLandMarksProps {
  data: ReturnType<typeof useData>
}

export const LandMarks = ({
  data: { land, interiors },
}: BubbleMapLandMarksProps) => (
  <g className="landmarks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    <path className="land" d={path(land.features[0])} />
    <path className="interiors" d={path(interiors)} />
  </g>
)
