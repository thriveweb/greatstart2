import React from 'react'
import Check from 'react-feather/dist/icons/check'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'

export default () => (
  <div className="pretty p-svg p-curve p-plain">
    <input type="checkbox" />
    <div className="state">
      <Check className="svg svg-icon" />
      <label />
    </div>
  </div>
)
