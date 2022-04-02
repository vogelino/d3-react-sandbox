import React from 'react'
import { useWindowSize } from './useWindowSize'
import { useData } from './useData'
import { Marks } from './Marks'

export const Map = () => {
  const { width, height } = useWindowSize()
  const data = useData()

  if (!data) return 'Loading...'

  return (
    <svg width={width} height={height} viewport={`0 0 ${width} ${height}`}>
      <Marks data={data} />
    </svg>
  )
}
