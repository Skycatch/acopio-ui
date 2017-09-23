import React, { Component } from 'react'
import getDistance from '../utils/getDistance'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class AcopioCard extends Component {
  mostRecetProductDate(products) {
    let bestDate =  products.reduce((mostRecent, product) => {
      let productDate = Date.parse(product.fechaDeActualizacion)
      return productDate > mostRecent ? productDate : mostRecent
    },0)
    return new Date(bestDate).toLocaleString()
  }

  render () {
    const {
      acopio,
      currentPosition
    } = this.props

    const {
      nombre,
      products
    } = acopio

    const kms = getDistance(currentPosition, acopio.geopos)

    return (
      <Card style={{marginBottom: '0.5rem'}}>
        <CardHeader
          title={nombre}
          subtitle={kms != null && `a ${kms} kms.`}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <ul>
            <li>Última actualización: {this.mostRecetProductDate(products)}</li>
            {products.sort((a, b) => a.nombre.localeCompare(b.nombre)).map(product => (
              <li
                key={`product-${product.id}`}
                data-date={product.fechaDeActualizacion}
              >
                {product.nombre}
              </li>
            ))}
          </ul>
        </CardText>
      </Card>
    )
  }
}

export default AcopioCard
