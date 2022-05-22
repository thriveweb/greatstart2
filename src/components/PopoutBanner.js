import React from 'react'

import './PopoutBanner.css'

export default ({ title, image }) => (
  <div className="section PopoutBanner">
    <div className="container PopoutBanner--Container col2-light hasShadow">
      {image && <div className='PopoutBanner--Image'><img src={image} alt={title}/></div>}
      <div className="PopoutBanner--Content">
        <h5>{title}</h5>
      </div>
    </div>
  </div>
)
