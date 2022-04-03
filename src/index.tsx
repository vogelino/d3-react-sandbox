import React from 'react'
import ReactDOM from 'react-dom'
import { BubbleMap } from './BubbleMap'
import { NavigationHistogram } from './NavigationHistogram'
import './styles.css'
import { useData } from './useData'
import { useWindowSize } from './useWindowSize'

const App = () => {
  const data = useData()
  const { width, height } = useWindowSize()

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
