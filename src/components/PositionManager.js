import React, { Component } from 'react'
import { Broadcast } from 'react-broadcast'

export const STORAGE_KEY = 'acopio:position'
export const channel = 'currentPosition'

const parseLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch (e) {
    return null
  }
}

const getPosition = (options = {}) => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(position => {
    resolve({lat: position.coords.latitude, lng: position.coords.longitude})
  }, reject, options)
})

class PositionManager extends Component {
  constructor (props) {
    super(props)
    const value = parseLocalStorage()
    this.state = {
      value: value == null ? { positionUnknown: true } : value
    }
  }

  handlePositionRequest = () => {
    getPosition()
      .then(({lat, lng}) => {
        const value = {
          currentPosition: {
            lat,
            lng,
          },
          date: new Date(),
        }

        this.setState({ value })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      })
      .catch(reason => {
        // https://developer.mozilla.org/en-US/docs/Web/API/PositionError/code
        const value = {
          date: new Date()
        }

        if (reason.code === 1) {
          value.positionDeclined = true
        } else if (reason.code === 2) {
          value.positionUnavailable = true
        }

        this.setState({ value })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      })
  }

  handleStorageEvent = (e) => {
    if (e.key !== STORAGE_KEY) {
      return
    }

    if (e.value !== e.oldValue) {
      let value = null
      try {
        value = JSON.parse(e.value)
      } catch (err) { }
      this.setState({
        value: value == null ? { positionUnknown: true } : value
      })
    }
  }

  componentDidMount () {
    window.addEventListener('storage', this.handleStorageEvent)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.handleStorageEvent)
  }

  render () {
    return (
      <Broadcast channel={channel} value={this.state.value}>
        {this.props.children(this.handlePositionRequest)}
      </Broadcast>
    )
  }
}

export default PositionManager
