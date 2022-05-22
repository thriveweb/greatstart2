import React from 'react'
import wave from '../images/waves.svg'
import './Wave.css'

export default ({ className = '', short, ...props }) => (
  <div
    className={`Wave ${short ? 'short' : ''}`}
    style={{ backgroundImage: `url(${wave})` }}
    {...props}
  />
)
