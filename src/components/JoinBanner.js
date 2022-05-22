import React from 'react'

import Button from './Button'
import Wave from './Wave'
import './JoinBanner.css'

export default ({
  buttonLinkTo = '/enrolments/enrolling-great-start-early-learing-centre/',
  buttonTitle = 'Enrol Now',
  title = 'Join Our Community',
  className,
  ...props
}) => {

	if(className) return <div className="col5 JoinBanner">
		    <h3 className="JoinBanner--title">Join Our Team</h3>
		    <Wave />
		    <Button to='/careers/employment-opportunities/'>Join Now</Button>
		</div>

	return <div className="col5 JoinBanner">
		    <h3 className="JoinBanner--title">{title}</h3>
		    <Wave />
		    <Button to={buttonLinkTo}>{buttonTitle}</Button>
		</div>

}
