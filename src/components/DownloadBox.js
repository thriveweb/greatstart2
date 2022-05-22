import React from 'react'
import { File } from 'react-feather'
import _get from 'lodash/get'

import './DownloadBox.css'

export default ({ listItems = [] }) => (
  <div className="DownloadBox hasBorder hasShadow">
    <h5 className="DownloadBox--Title">Downloadable Forms</h5>
    {listItems.map(item => {

      if(!!item.length) return null

      const file = _get(item, 'file') || []
      const publicURL = _get(file, 'publicURL') || ''

      return <a
        key={item.title}
        target="_blank"
        rel="noopener"
        href={publicURL}
        className="DownloadBox--Item"
      >
        <File /> {item.title}
      </a>
    })}
  </div>
)
