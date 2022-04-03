import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { MapWithHistogramBrush } from './components/MapWithHistogramBrush/MapWithHistogramBrush'

const App = () => (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ul>
            <li>
              <Link to="horizontal-bar-chart">Horizontal bar chart</Link>
            </li>
            <li>
              <Link to="world-map-with-histogram-brush">
                World map with brushable histogram
              </Link>
            </li>
          </ul>
        }
      />
      <Route
        path="world-map-with-histogram-brush"
        element={<MapWithHistogramBrush />}
      />
    </Routes>
  </HashRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
