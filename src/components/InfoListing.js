import React from 'react'

import Content from '../components/Content'
import Image from '../components/Image'
import './InfoListing.css'

export default ({ description, infoListing }) => {

	if(!infoListing.length) {
		return null
	} else {
		return <div className='info-section'>
	      <div className='container content'>
	        {description &&
	          <div className='info-section-heading'>
	            <Content src={description} />
	          </div>
	        }
	        {infoListing && infoListing.map(({ icon, title, content }) => {
	          return <div className='icon-list-item'>
	            <div className='icon-list-item-image'><Image src={icon} alt={title} /></div>
	            <div className=''>
	              {title && <h3>{title}</h3>}
	              {content && <Content src={content} />}
	            </div>
	          </div>
	        })}
	      </div>
	    </div>
	}
}
