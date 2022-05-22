import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import { navigateTo } from 'gatsby-link'

import './BookTourForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Tour Booking',
    subject: '', // optional subject of the notification email
    action: '/booking-thank-you/',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
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
      navigateTo(this.props.action)
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
    const {
      emailaddress = '',
      yourname = '',
      childname_1 = '',
      childname_2 = '',
      childname_3 = '',
      birthday_1 = '',
      birthday_2 = '',
      birthday_3 = '',
      phone = '',
      startdate = '',
      comments = '',
      firstname = '',
      lastname = ''
    } = fields


    return (
      <form
        className={`BookTour ${active ? 'active' : ''}`}
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
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Email"
            name="emailaddress"
            value={emailaddress}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Child's Name"
            name="childname_1"
            value={childname_1}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label label-text">
          <p>{"Child's Date of Birth:"}</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="DD / MM / YYYY"
            name="birthday_1"
            value={birthday_1}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Child's Name"
            name="childname_2"
            value={childname_2}
            onChange={this.props.handleChange}
          />
        </label>
        <label className="EnquiryForm--Label label-text">
          <p>{"Child's Date of Birth:"}</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="DD / MM / YYYY"
            name="birthday_2"
            value={birthday_2}
            onChange={this.props.handleChange}
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Child's Name"
            name="childname_3"
            value={childname_3}
            onChange={this.props.handleChange}
          />
        </label>
        <label className="EnquiryForm--Label label-text">
          <p>{"Child's Date of Birth:"}</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="DD / MM / YYYY"
            name="birthday_3"
            value={birthday_3}
            onChange={this.props.handleChange}
          />
        </label>
        <div className='EnquiryForm--Label label-text'>
          <p>Choose Centre:</p>
          {[
            this.renderOption('centre', 'East Malvern'),
            this.renderOption('centre', 'Mildura'),
            this.renderOption('centre', 'Mildura Central')
          ]}
        </div>
        <label className="EnquiryForm--Label label-text">
          <p>Preferred Start Date:</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="MM / YYYY"
            name="startdate"
            value={startdate}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label full-width">
          <input
            className="EnquiryForm--Input"
            placeholder="Other Comments"
            name="comments"
            value={comments}
            onChange={this.props.handleChange}
          />
        </label>
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={formName} />
        <input
          className="Button hasShadowHover EnquiryForm--SubmitButton"
          type="submit"
          value="Book Now"
          disabled={this.state.disabled}
        />
        <div className='privacy-check'>
          <input className="EnquiryForm--Input" type="checkbox" name="privacy" required />
          <span className='checkbox'></span>
          <p>Yes, I have read and agree to the Great Start <a href="/parents/our-policies/">Privacy Policy</a></p>
        </div>
      </form>
    )
  }
}

export default Form
