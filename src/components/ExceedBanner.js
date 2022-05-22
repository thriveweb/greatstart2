import React from 'react'
import _get from 'lodash/get'
import PopoutBanner from './PopoutBanner'
import './ExceedBanner.css'

export default ({ footerSettings = {} }) => {
  const { exceedLogo, exceedText, exceedTextLong, long } = footerSettings

  if(!!footerSettings.length) return null

  return long ? (
    <PopoutBanner image={exceedLogo} title={exceedTextLong} />
  ) : (
    <div className="ExceedBanner">
      {exceedLogo && (
        <img
          className="ExceedBanner--image"
          src={exceedLogo}
          alt={exceedText}
        />
      )}
      <h3 className="ExceedBanner--title">{exceedText}</h3>
    </div>
  )
}
