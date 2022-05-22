import React from 'react'

import Button from './Button'
import Image from './Image'
import './FamilyHandbookSection.css'

export default ({ image, file, ...props }) => (
  <div className="FamilyHandbookSection">
    <div className="FamilyHandbookSection--column section col3">
      <div className="container">
        <div className="FamilyHandbookSection--form">
          <h3>Download Our Family Handbook</h3>
          <Button className="FamilyHandbookSection--Button" to={file}>
            Download
          </Button>
        </div>
      </div>
    </div>
    <div className="FamilyHandbookSection--image dark">
      {image && (
        <Image background src={image} alt="Download Our Family Handbook" />
      )}
    </div>
  </div>
)
