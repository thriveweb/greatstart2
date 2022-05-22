import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import { ICONEye } from './Icons'

import './EnquiryForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Subscribe Form',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your submission, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  renderOption = (name, value) => {
    const { fields } = this.props
    const { centre } = fields

    return <label className="checkbox-container" key={value}>
      <input 
        className="EnquiryForm--Input" 
        type="radio" 
        name={name}
        value={value}
        checked={centre === value ? true : false}
        onChange={this.props.handleChange}
      /> 
      {value}
      <span className='checkbox'></span>
    </label>
  }


  render() {
    const { name, subject, action, formName, active, fields } = this.props
    const { emailaddress = '' } = fields

    return (
      <form
        className={`SubscribeForm ${active ? 'active' : ''}`}
        name={formName}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="email"
      >
        {this.state.alert && (
          <div className="EnquiryForm--Alert">{this.state.alert}</div>
        )}
        <div className='EnquiryForm--Label'>
          {[ 
            this.renderOption('centre', 'East Malvern'),
            this.renderOption('centre', 'Mildura'),
            this.renderOption('centre', 'Mildura Central')
          ]}
        </div>
        <div className='Button'>
          <label className="EnquiryForm--Label">
            <input
              className="EnquiryForm--Input"
              type="email"
              placeholder="your email"
              name="emailaddress"
              value={emailaddress}
              onChange={this.props.handleChange}
              required
            />
          </label>
          <input type="text" name="_gotcha" style={{ display: 'none' }} />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={formName} />
          <input
            className="EnquiryForm--SubmitButton"
            type="submit"
            value='&#x2192;'
            disabled={this.state.disabled}
          />
        </div>
      </form>
    )
  }
}

export default Form
