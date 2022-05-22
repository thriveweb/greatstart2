import React from 'react'

import Image from './Image'
import Content from './Content'
import Button from './Button'
import Link from "gatsby-link"
import { ICONEye } from './Icons'
import headerMain from '../images/header-main.png'
import header from '../images/header.png'
import './PageHeader.css'

const PageHeader = ({ title, subtitle, backgroundImage, large, button, className = '' }) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      <div className="container relative content">
        <div className="PageHeader--Inner">
          <h1 className="PageHeader--Title">{title}</h1>
          {subtitle && (
            <Content className="PageHeader--Subtitle" src={subtitle} />
          )}
          {button && <Button to={button.linkTo}>{button.title}</Button>}
        </div>
      </div>
      {large &&
        backgroundImage && (
          <Image src={backgroundImage} alt={title} />
      )}
        <Link className='fixed-button' to='/enrolments/book/'><ICONEye/>Book a Tour</Link>
    </div>
  )
}

export default PageHeader
