import React from 'react'
import Link from 'gatsby-link'

import './Button.css'

const A = props => <a {...props} />

export default ({
  className = '',
  to,
  href,
  children,
  hasShadow = true,
  ...props
}) => {
  if (hasShadow) className += ' hasShadowHover'
  let Comp = to ? Link : A
  return (
    <Comp to={to} href={href} className={`Button ${className}`} {...props}>
      {children}
    </Comp>
  )
}
