import React, { Component } from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'
import DocumentTitle from 'react-document-title'
import normalize from '../utils/normalize'

const ACOPIOS_LIMIT = 30

const getLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(position => {
    resolve({lat: position.coords.latitude, lng: position.coords.longitude})
  }, reject)
})

const getNearbyAcopios = (position) => {
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

class Supply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopioIds: [],
      acopioData: {},
      currentPosition: null,
      isLoading: true
    }

    // eslint-disable-next-line
    const featuredAcopioIds = []

    this.tryToLoadNearbyCenters()
  }

  tryToLoadNearbyCenters () {
    getLocation()
      .then(currentPosition => {
        this.setState({ currentPosition })
        return getNearbyAcopios(currentPosition)
      })
      .then(response => {
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
        this.setState({
          acopioData,
          acopioIds
        })

        return getProductosForAcopioIds(acopioIds)
      })
      .then(response => {
        const { acopioData } = this.state
        response.data.forEach((product) => {
          const acopio = acopioData[product.acopioId]
          acopio.products.push(product)
        }, {})
        this.setState({
          acopioData,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
        })
        console.error(err)
      })
  }

  render () {
    const { acopioIds, acopioData, isLoading, currentPosition } = this.state
    const acopios = acopioIds.map(id => acopioData[id])
    const title = process.env.REACT_APP_NAME
    return (
      <DocumentTitle title={title}>
        <AcopioList
          isLoading={isLoading}
          acopios={acopios}
          currentPosition={currentPosition} />
      </DocumentTitle>
    )
  }
}

export default Supply
