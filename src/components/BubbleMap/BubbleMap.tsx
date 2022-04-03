import React from 'react'
import { LandMarks } from './LandMarks'
import { useData } from '../../hooks/useData'

interface BubbleMapProps {
  data: ReturnType<typeof useData>
  width: number
  height: number
}

export const BubbleMap = ({ data, width, height }: BubbleMapProps) => {
  return <LandMarks data={data} width={width} height={height} />
}
