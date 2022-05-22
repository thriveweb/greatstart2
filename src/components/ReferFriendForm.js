import React, { Component } from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Select from './Select'

import './ReferFriendForm.css'

class Form extends Component {
  static defaultProps = {
    name: 'Refer Friend Form',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your submission, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef();

    this.state = {
      alert: '',
      disabled: false
    }
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

  render() {
    const { name, subject, action, formName, active, fields } = this.props
    const { youremail = '', yourname = '', phone = '', childname = '', friendemail = '', centre  } = fields

    return (
      <form
        className={`ReferFriend ${active ? 'active' : ''}`}
        name={formName}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        netlify-honeypot="_gotcha"
      >
        {this.state.alert && (
          <div className="EnquiryForm--Alert">{this.state.alert}</div>
        )}
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Name"
            name="yourname"
            value={yourname}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Your Email"
            name="youremail"
            value={youremail}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Friend's Name"
            name="childname"
            value={childname}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Friend's Contact Number"
            name="phone"
            value={phone}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Your Friend's Email"
            name="friendemail"
            value={friendemail}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <Select
          placeholder='Which Centre does your child attend?'
          name='type'
          handleChange={this.props.handleChange}
          options={[
            'Mildura Early Learning Centre',
            'Mildura Central Early Learning Centre',
            'East Malvern Learning Centre'
          ]}
          selectedOption={centre}
        />
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={formName} />
        <input
          className="Button hasShadowHover EnquiryForm--SubmitButton"
          type="submit"
          value="Submit"
          disabled={this.state.disabled}
        />
      </form>
    )
  }
}

export default Form
