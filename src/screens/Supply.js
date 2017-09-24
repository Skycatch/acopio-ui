import React, { Component } from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'
import DocumentTitle from 'react-document-title'
import withCurrentPosition from '../components/withCurrentPosition'

const ACOPIOS_LIMIT = 20

const getNearbyAcopios = (position) => {
  if (!position) {
    return Promise.reject(new Error('no location'))
  }

  const filter = {
    where: {
      geopos: {
        near: position
      }
    },
    include: 'productos',
    limit: ACOPIOS_LIMIT
  }

  return api.getAcopiosWhere(JSON.stringify(filter))
}

const getRecentlyUpdatedAcopios = () => {
  const filter = {
    include: {
      relation: 'productos',
      scope: {
        order: 'fechaDeActualizacion DESC'
      }
    },
    order: 'fechaDeActualizacion DESC',
    limit: ACOPIOS_LIMIT
  }

  return api.getAcopiosWhere(JSON.stringify(filter))
}

class Supply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopios: [],
    }

    this.loadAcopios(props.currentPosition)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentPosition !== this.props.currentPosition) {
      this.loadAcopios(nextProps.currentPosition)
    }
  }

  loadRecentlyUpdatedAcopios () {
    this.setState({ isLoading: true })
    return getRecentlyUpdatedAcopios()
      .then((response) => {
        this.setState({
          acopios: response.data,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
          isLoading: false,
        })
        console.error(err)
      })
  }

  loadNearbyAcopios (currentPosition) {
    this.setState({ isLoading: true })
    return getNearbyAcopios(currentPosition)
      .then((response) => {
        this.setState({
          acopios: response.data,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
          isLoading: false,
        })
        console.error(err)
      })
  }

  loadAcopios (currentPosition) {
    if (currentPosition) {
      return this.loadNearbyAcopios(currentPosition)
    }

    return this.loadRecentlyUpdatedAcopios()
  }

  render () {
    const { acopios, isLoading } = this.state
    const { positionUnavailable } = this.props

    const title = process.env.REACT_APP_NAME

    if (positionUnavailable) {
      return <span>Ubicación no disponible</span>
    }

    return (
      <DocumentTitle title={title}>
        <AcopioList
          isLoading={isLoading}
          acopios={acopios}
        />
      </DocumentTitle>
    )
  }
}

export default withCurrentPosition(Supply)
