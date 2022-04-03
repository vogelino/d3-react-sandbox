import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { BubbleMap } from './components/BubbleMap/BubbleMap'
import { NavigationHistogram } from './components/NavigationHistogram/NavigationHistogram'
import './styles.css'
import { useWindowSize } from './hooks/useWindowSize'
import { useMissingMigrantsData } from './hooks/useMissingMigrantsData'

const xValue = ({ date }: { date: Date }) => date
const yValue = ({ value }: { value: number }) => value
const mapAspectRatio = 0.5389784946236559
const histogramHeight = 240

const App = () => {
  const data = useMissingMigrantsData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const mapHeight = Math.round(width * mapAspectRatio)
  const height = mapHeight + histogramHeight
  const [brushExtent, setBrushExtent] = useState<null | Date[]>(null)

  const filteredData = useMemo(() => {
    return data && brushExtent
      ? data.filter((d) => {
          const date = xValue(d)
          return date >= brushExtent[0] && date < brushExtent[1]
        })
      : data
  }, [data, brushExtent])

  if (!data) return <>Loading...</>

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap
        data={data}
        filteredData={filteredData}
        width={width}
        height={mapHeight}
      />
      <NavigationHistogram
        top={mapHeight}
        data={data}
        width={width}
        height={histogramHeight}
        setBrushExtent={setBrushExtent}
        xValue={xValue}
        yValue={yValue}
        xAxisLabel="Incident Date"
        yAxisLabel="Dead & Missing Total"
      />
    </svg>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
