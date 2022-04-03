import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { BubbleMap } from './components/BubbleMap/BubbleMap'
import { NavigationHistogram } from './components/NavigationHistogram/NavigationHistogram'
import './styles.css'
import { useWindowSize } from './hooks/useWindowSize'
import { useMissingMigrantsData } from './hooks/useMissingMigrantsData'

const xValue = ({ date }: { date: Date }) => date
const yValue = ({ value }: { value: number }) => value

const App = () => {
  const data = useMissingMigrantsData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const height = windowSize.height || 600
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

  const mapHeight = Math.floor(height * 0.7)
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
        height={height - mapHeight}
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
