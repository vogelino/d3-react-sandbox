import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3'
import { useMemo } from 'react'

export const useProjection = ({ width, height, data }) => {
  return useMemo(() => {
    const projection = geoNaturalEarth1().fitSize([width, height], data)
    const path = geoPath(projection)
    const graticule = geoGraticule()
    return { path, graticule }
  }, [data, width, height])
}
