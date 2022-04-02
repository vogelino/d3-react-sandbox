import React from 'react'
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3'

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const graticule = geoGraticule()

export const Marks = ({ data: { land, interiors } }) => (
  <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    <path className="land" d={path(land.features[0])} />
    <path className="interiors" d={path(interiors)} />
  </g>
)
