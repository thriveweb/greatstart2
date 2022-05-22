import React, { Component } from 'react'
import Helmet from 'react-helmet'
import _debounce from 'lodash/debounce'

import './GoogleMaps.css'

let mapkey = ''
if (process.env.NETLIFY_MAP_KEY) {
  mapkey = process.env.NETLIFY_MAP_KEY
}

export default class GoogleMap extends Component {
  static defaultProps = {
    apiKey: mapkey,
    lat: -28.078287,
    lng: 153.444221,
    zoom: 15,
    disableDefaultUI: false,
    icon: '',
    styles: '{}'
  }

  mapElement = null
  map = null

  state = {}

  componentDidMount () {
    window.initMap = this.initMap
    if (window.google) {
      this.initMap()
      this.addListeners()
    }

    setTimeout(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentDidUpdate() {
    if(!this.state.mapSet) {
      window.initMap = this.initMap

      this.initMap()
      this.addListeners()
    }
  }

  addListeners = () => {
    if (!this.map) return false
    window.addEventListener('resize', _debounce(this.setMapCenter), 100)
  }

  setMapCenter = () => {
    if (!this.map) return false
    const { lat, lng } = this.props
    const center = { lat, lng }
    this.map.setCenter(center)
  }

  initMap = () => {
    const google = window.google
    const { lat, lng, zoom, disableDefaultUI } = this.props
    const styles = JSON.parse(this.props.styles)
    const center = { lat, lng }

    if(!google) {
      return null
    }

    const map = new google.maps.Map(this.mapElement, {
      zoom,
      disableDefaultUI,
      styles
    })
    // pan offset
    const icon = this.props.icon
      ? {
        url: this.props.icon
      }
      : ''
    this.marker = new google.maps.Marker({
      position: center,
      icon,
      map
    })

    this.map = map
    this.setMapCenter()
    this.addListeners()
    this.setState({
      mapSet: true
    })
  }

  render () {
    return (
      <div className='GoogleMap--Wrap'>
        <div
          className='GoogleMap'
          ref={el => {
            this.mapElement = el
          }}
        />
      </div>
    )
  }
}
