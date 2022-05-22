import React from 'react'

import Image from './Image'
import Button from './Button'
import './FamilyHandbookBanner.css'

export default ({ downloadBanner }) => {

  if(!downloadBanner) return null
  const { file, title, preview } = downloadBanner

  if (!file || !title || !preview) return null
  return (
    <div className="section col6 downloadBanner">
      <div className="container content DownloadBanner--Container">
        {preview &&
          file && (
            <a className="DownloadBanner--Image" href={file.publicURL}>
              <img className='hasShadow' src={preview.publicURL} alt={title} />
            </a>
          )}
        <div className="DownloadBanner--Content">
          <h5>{title}</h5>
          {file && (
            <Button
              href={file.publicURL}
              target="_blank"
              rel="noopener"
              className="DownloadBanner--Button"
            >
              Click Here
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
