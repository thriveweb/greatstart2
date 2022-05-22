import React, { Component } from 'react'

import BookTourForm from './BookTourForm'


class BookingSection extends Component {

	state = {
		fields: {
			centre: 'East Malvern'
		}
	}

    handleChange = e => {
        e.persist()
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

	    const centres = ['East Malvern', 'Mildura', 'Mildura Central']

	    const { fields } = this.state
	    const { centre } = fields

		return <div className='bookingsection'>
			<div className='container'>
				{centres.map((centreItem, index) => 
					<BookTourForm 
						key={centreItem + index}
						active={centre === centreItem}
			            formName={`${centreItem} Tour Form`}
			            fields={fields}
			            handleChange={this.handleChange}
					/>
				)}
			</div> 
		</div>		
	}
}

export default BookingSection