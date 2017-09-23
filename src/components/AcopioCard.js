import React, { Component } from 'react'
import getDistance from '../utils/getDistance'

const ProductItem = ({ product }) => (
  <li key={product.id} data-date={product.fechaDeActualizacion}>{product.nombre}</li>
)

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
            <ProductItem product={product} />
          ))}
        </ul>
      </li>
    )
  }
}

export default AcopioCard
