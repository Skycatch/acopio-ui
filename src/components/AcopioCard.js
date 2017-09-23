import React, { Component } from 'react'
import getDistance from '../utils/getDistance'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class AcopioCard extends Component {
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
            {products.map(product => (
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
