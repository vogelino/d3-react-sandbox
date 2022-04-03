import React from 'react'
import { LandMarks } from './LandMarks'
import { useData } from './useData'

interface BubbleMapProps {
  data: ReturnType<typeof useData>
}

export const BubbleMap = ({ data }: BubbleMapProps) => {
  return <LandMarks data={data} />
}
