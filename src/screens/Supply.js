import React, { Component } from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'
import normalize from '../utils/normalize'
import withCurrentPosition from '../components/withCurrentPosition'

const ACOPIOS_LIMIT = 30

const getNearbyAcopios = (position) => {
  if (!position) {
    return Promise.reject(new Error('no location'))
  }

  const filter = {
    where: {
      geopos: {
        near: position,
        maxDistance: 20,
        unit: 'kilometers'
      }
    },
    limit: ACOPIOS_LIMIT
  }

  return api.getAcopiosWhere(JSON.stringify(filter))
}

const getProductosForAcopioIds = (acopioIds) => {
  const query = acopioIds.map(id => ({ acopioId: id }))
  const filter = { where: { or: query } }

  return api.getProductosWhere(JSON.stringify(filter))
}

const getNormalizedAcopios = (response) => {
  if (!(response && response.data && response.data.length)) {
    return Promise.resolve({
      acopioIds: [],
      acopioData: {}
    })
  }

  const acopios = response.data
    .map(acopio => ({
      id: acopio.id,
      direccion: acopio.direccion,
      geopos: acopio.geopos,
      nombre: acopio.nombre,
      products: [],
    }))

  const acopioIds = acopios.map(acopio => acopio.id)
  const acopioData = normalize(acopios)

  return getProductosForAcopioIds(acopioIds)
    .then(response => {
      response.data.forEach((product) => {
        const acopio = acopioData[product.acopioId]
        acopio.products.push(product)
      }, {})

      return {
        acopioIds,
        acopioData,
      }
    })
}

class Supply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopioIds: [],
      acopioData: {},
    }

    this.tryToLoadNearbyCenters(props.currentPosition)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentPosition !== this.props.currentPosition) {
      this.tryToLoadNearbyCenters(nextProps.currentPosition)
    }
  }

  tryToLoadNearbyCenters (currentPosition) {
    if (!currentPosition) {
      return
    }

    this.setState({ isLoading: true })
    return getNearbyAcopios(currentPosition)
      .then(getNormalizedAcopios)
      .then(({acopioIds, acopioData}) => {
        this.setState({
          acopioIds,
          acopioData,
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

  render () {
    const { acopioIds, acopioData, isLoading } = this.state
    const { positionUnknown, positionUnavailable } = this.props

    if (positionUnknown) {
      return <span>Permite tu ubicación arriba</span>
    }

    if (positionUnavailable) {
      return <span>Ubicación no disponible</span>
    }

    const acopios = acopioIds.map(id => acopioData[id])

    return <AcopioList
      isLoading={isLoading}
      acopios={acopios}
    />
  }
}

export default withCurrentPosition(Supply)
