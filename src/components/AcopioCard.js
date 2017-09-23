import React, { Component } from 'react'
import getDistance from '../utils/getDistance'

class AcopioCard extends Component {
  distanceString () {
    const { acopio, currentLocation } = this.props
    if (!currentLocation) {
      return ''
    }

    const { geopos } = acopio
    const distance = getDistance([geopos.lat, geopos.lng], currentLocation)
    return `a ${distance} km`
  }

  render () {
    const {
      acopio,
    } = this.props

    const {
      nombre,
    } = acopio

    return (
      <li>
        {nombre} {this.distanceString()}
        <ul>
          {acopio.products && acopio.products.map(product => (
            <li
              key={`product-${product.id}`}
              data-date={product.fechaDeActualizacion}
            >
              {product.nombre}
            </li>
          ))}
        </ul>
      </li>
    )
  }
}

export default AcopioCard
