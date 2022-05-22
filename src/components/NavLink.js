import React from 'react'
import Link from 'gatsby-link'

import './NavLink.css'

const A = props => <a {...props} />

export default ({ className, children, to, ...props }) => {
  let Comp = to ? Link : A
  return (
    <Comp {...props} to={to} className={`NavLink ${className || ''}`}>
      {children}
    </Comp>
  )
}
