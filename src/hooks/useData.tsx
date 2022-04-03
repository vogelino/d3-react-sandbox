import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature, mesh } from 'topojson'
import { Topology } from 'topojson-specification'

const jsonUrl = `https://unpkg.com/world-atlas@2.0.2/countries-50m.json`

export type UseDataOutput = {
  land: ReturnType<typeof feature>
  interiors: ReturnType<typeof mesh>
}

export const useData = (): UseDataOutput | null => {
  const [data, setData] = useState<UseDataOutput | null>(null)

  useEffect(() => {
    json<Topology>(jsonUrl).then((topology) => {
      if (!topology?.objects) return
      const { countries, land } = topology.objects
      if (!countries || !land) return
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      })
    })
  }, [])

  return data
}
