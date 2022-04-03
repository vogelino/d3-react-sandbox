import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const VizLayout: FC = ({ children }) => (
  <>
    <Link to="/" className="viz-layout-backlink">
      {`< Back to all visualizations`}
    </Link>
    {children}
  </>
)
