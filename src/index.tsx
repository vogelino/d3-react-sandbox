import React from 'react'
import ReactDOM from 'react-dom'
import { BubbleMap } from './components/BubbleMap/BubbleMap'
import { NavigationHistogram } from './components/NavigationHistogram/NavigationHistogram'
import './styles.css'
import { useData } from './hooks/useData'
import { useWindowSize } from './hooks/useWindowSize'

const App = () => {
  const data = useData()
  const windowSize = useWindowSize()
  const width = windowSize.width || 900
  const height = windowSize.height || 600

  if (!data) return <>Loading...</>

  return (
    <svg width={width} height={height}>
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
