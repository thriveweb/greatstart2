import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Select from './Select'
import { ICONUpload } from './Icons'
import { withRouter } from 'react-router'
import qs from 'qs'

import './ApplicationForm.css'


class Application extends React.Component {
  static defaultProps = {
    name: 'Application',
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

  componentDidMount = () => {
    const queryString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

    if(queryString.submit) {

      setTimeout(() => {
        window.scrollTo({
            top: this.formRef.current.offsetTop
        });
      }, 100)
    }
  }

  handleUpload = (event, target) => {
    const fileNames = []

    const file = event.target.files
      ? Array.from(event.target.files).forEach(file => {
        fileNames.push(file.name)
      })
      : this.state[target]

    this.setState({
      [target]: !!fileNames.length ? fileNames.join(', ') : file
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const formTarget = e.target

    if (this.state.disabled) return
    const form = e.target
    const data = serialize(form)

    this.setState({ 
      filesUploading: true 
    }, () => {
      formTarget.submit()
    })
  }

  render() {
    const { name, subject, action, formName, active, fields } = this.props
    const { emailaddress = '', yourname = '', phone = '', role = '', qualifications = '', message = '', centre  } = fields

    const queryString = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

    return (
      <form
        className={`ApplicationForm ${active ? 'active' : ''}`}
        name={formName}
        action='?submit=true'
        method='post'
        onSubmit={this.handleSubmit}
        data-netlify=""
        netlify-honeypot="_gotcha"
        encType='multipart/form-data'
        ref={this.formRef}
      >
        {queryString.submit && (
          <div className="EnquiryForm--Alert">Thanks for your submission, we will get back to you soon</div>
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
            placeholder="Preferred Role"
            name="role"
            value={role}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <Select
          placeholder='Preferred Centre'
          name='centre'
          handleChange={this.props.handleChange}
          options={[
            'East Malvern Learning Centre',
            'Mildura Early Learning Centre',
            'Mildura Central Early Learning Centre'
          ]}
          selectedOption={centre}
        />
        <Select
          placeholder='Joining as'
          name='type'
          handleChange={this.props.handleChange}
          options={[
            'Room Leader',
            'Diploma Qualified Educator',
            'Certificate 3 Qualified Educator',
            'Unqualified Educator – working towards qualification',
            'Cook'
          ]}
        />
        <label className="EnquiryForm--Label full-width">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Qualifications"
            name="qualifications"
            value={qualifications}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label full-width word-wrap">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Why do you want to work for Great Start?"
            name="message"
            value={message}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <div className='file-download'>
          <div className='file-download-items'>
            <div className='file-download-item'>
              <label className='EnquiryForm--Label title'>
                <input
                  className='EnquiryForm--Input'
                  type='file'
                  placeholder='Resume'
                  name='resume'
                  onChange={event => this.handleUpload(event, 'resume')}
                  required
                />
                Resume <ICONUpload/>
              </label>
              {this.state.resume && <p className='results'>{this.state.resume}</p>}
            </div>
            <div className='file-download-item'>
              <label className='EnquiryForm--Label title'>
                <input
                  className='EnquiryForm--Input'
                  type='file'
                  placeholder='Cover Letter'
                  name='coverLetter'
                  onChange={event => this.handleUpload(event, 'coverLetter')}
                  required
                />
                Cover Letter <ICONUpload/>
              </label>
              {this.state.coverLetter && <p className='results'>{this.state.coverLetter}</p>}
            </div>
          </div>
        </div>
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

export default withRouter(Application)
