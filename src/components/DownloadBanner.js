import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Image from './Image'

import './DownloadForm.css'

import Form from './DownloadForm'

class DownloadBanner extends React.Component {
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
    const { name, subject, action, handbookDownload } = this.props

    const centres = ['East Malvern', 'Mildura', 'Mildura Central']

    const { fields } = this.state
    const { centre } = fields

    const title = ''
    const description = 'Download our Family Handbook for all you need to know about enroling your child at one of our centres.'

    return (
      <section className='download-banner'>
        <Image background src='/images/uploads/handbook.jpg' alt='image of handbook' />
        {centres.map((centreItem, index) =>
          <Form
            key={centreItem + 'Download' + index}
            active={centre === centreItem}
            formName={`${centreItem} Download Form`}
            fields={fields}
            handleChange={this.handleChange}
            title={title}
            description={description}
            handbookDownload={handbookDownload}
          />
        )}
      </section>
    )
  }
}

export default DownloadBanner
