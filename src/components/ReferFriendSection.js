import React, { Component } from 'react'

import ReferFriendForm from './ReferFriendForm'


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
			{centres.map((centreItem, index) => {
				return <ReferFriendForm
					key={centreItem + 'Referal' + index}
					active={centre === centreItem}
		            formName={`${centreItem} Referal Form`}
		            fields={fields}
		            handleChange={this.handleChange}
				/>
			})}
		</div>		
	}
}

export default BookingSection