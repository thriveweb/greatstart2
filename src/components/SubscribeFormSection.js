import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import SubscribeForm from './SubscribeForm'

import './SubscribeForm.css'

class SubscribeFormSection extends React.Component {
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

    return (
      <section className='subscribe-section'>
        {centres.map((centreItem, index) => 
          <SubscribeForm
            key={centreItem + 'Subscribe' + index}
            active={centre === centreItem}
            formName={`${centreItem} Subscribe Form`}
            fields={fields}
            handleChange={this.handleChange}
          /> 
        )}
      </section>  
    )
  }
}

export default SubscribeFormSection












