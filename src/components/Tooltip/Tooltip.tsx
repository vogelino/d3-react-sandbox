import React, { FC } from 'react'
import { createPortal } from 'react-dom';
import './Tooltip.css'

interface TooltipProps {
  x: number;
  y: number;
  label?: string;
  container: Element | null;
  children: JSX.Element;
}

export const Tooltip: FC<TooltipProps> = ({ x, y, label, container, children }) => {
  return container && createPortal(
    <div className='tooltip' style={{ transform: `translate(${x}px,${y}px)` }}>
      <div className="tooltip-content">
        {label && <span className='label'>{label}</span>}
        {children}
      </div>
    </div>,
    container
  );
}