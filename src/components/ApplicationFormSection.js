import React, { Component } from 'react'

import ApplicationForm from './ApplicationForm'


class BookingSection extends Component {

	state = {
		fields: {
			centre: 'East Malvern Learning Centre'
		}
	}

    handleChange = e => {
        if(e.persist && {}.toString.call(e.persist) === '[object Function]') {
        	e.persist()
        }

        this.setState(prevState => {
	        return {
	          fields: {
	            ...prevState.fields,
	            [e.target.name]: e.target.value
	          }
	        }
      	})
    }

	render() {
		const { name, subject, action } = this.props

	    const centres = ['East Malvern Learning Centre', 'Mildura Early Learning Centre', 'Mildura Central Early Learning Centre']

	    const { fields } = this.state
	    const { centre } = fields

		return <div className='bookingsection'>
			<div className='container'>
				{centres.map((centreItem, index) => {
					return <ApplicationForm
						key={centreItem + index}
						active={centre === centreItem}
			            formName={`${centreItem} Application Form`}
			            fields={fields}
			            handleChange={this.handleChange}
					/>
				})}
			</div> 
		</div>		
	}
}

export default BookingSection