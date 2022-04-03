import { useState, useEffect } from 'react'
import { ExtendedFeatureCollection, json } from 'd3'
import { feature, mesh } from 'topojson'
import { Topology } from 'topojson-specification'

const jsonUrl = `https://unpkg.com/world-atlas@2.0.2/countries-50m.json`

type UseDataOutput = null | {
  land: ExtendedFeatureCollection
  interiors: ExtendedFeatureCollection
}

export const useData = (): UseDataOutput => {
  const [data, setData] = useState(null)

  useEffect(() => {
    json<Topology>(jsonUrl).then((topology) => {
      const { countries, land } = topology.objects
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      })
    })
  }, [])

  return data
}
