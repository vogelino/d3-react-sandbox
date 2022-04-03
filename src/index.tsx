import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BubbleMap } from './components/BubbleMap/BubbleMap'
import { NavigationHistogram } from './components/NavigationHistogram/NavigationHistogram'
import './styles.css'
import { useWindowSize } from './hooks/useWindowSize'
import { useMissingMigrantsData } from './hooks/useMissingMigrantsData'

const App = () => {
  const data = useMissingMigrantsData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const height = windowSize.height || 600
  const [brushExtent, setBrushExtent] = useState<null | number[]>(null)

  if (!data) return <>Loading...</>

  const mapHeight = Math.floor(height * 0.7)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap data={data} width={width} height={mapHeight} />
      <NavigationHistogram
        top={mapHeight}
        data={data}
        width={width}
        height={height - mapHeight}
        setBrushExtent={setBrushExtent}
        xValue={({ date }: { date: Date }) => date}
        yValue={({ value }: { value: number }) => value}
        xAxisLabel="Incident Date"
        yAxisLabel="Dead & Missing Total"
      />
    </svg>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
