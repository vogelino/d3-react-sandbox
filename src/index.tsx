import React from 'react'
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

  if (!data) return <>Loading...</>

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <BubbleMap data={data} width={width} height={Math.floor(height * 0.8)} />
      <NavigationHistogram
        data={data}
        width={width}
        height={Math.floor(height * 0.2)}
      />
    </svg>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
