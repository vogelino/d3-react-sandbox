import { GeoGeometryObjects, geoGraticule, geoNaturalEarth1, geoPath } from 'd3'
import { useMemo } from 'react'

interface UseProjectionInput {
  width: number
  height: number
  data?: GeoGeometryObjects | null
}

export const useProjection = ({ width, height, data }: UseProjectionInput) => {
  return useMemo(() => {
    if (!data) return null
    const projection = geoNaturalEarth1().fitSize([width, height], data)
    const path = geoPath(projection)
    const graticule = geoGraticule()
    return { projection, path, graticule }
  }, [data, width, height])
}
