import React, { Component } from 'react'
import getDistance from '../utils/getDistance'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class AcopioCard extends Component {
  render () {
    const {
      acopio,
      currentPosition,
      displayProducts
    } = this.props

    const {
      nombre,
      products,
      direccion,
      geopos
    } = acopio

    const kms = getDistance(currentPosition, acopio.geopos)

    let mapsQuery
    if (geopos && geopos.hasOwnProperty('lat') && geopos.hasOwnProperty('lng')) {
      mapsQuery = `${geopos.lat},${geopos.lng}`
    } else mapsQuery = direccion

    return (
      <Card style={{marginBottom: '0.5rem'}}>
        <CardHeader
          title={nombre}
          subtitle={kms != null && `a ${kms} kms.`}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {
            displayProducts ? (
              <ul>
                {products.sort((a, b) => a.nombre.localeCompare(b.nombre)).map(product => (
                  <li
                    key={`product-${product.id}`}
                    data-date={product.fechaDeActualizacion}
                  >
                    {product.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <span style={{ fontWeight: 'bold' }}>Dirección: </span>
                <a href={`https://maps.google.com/?q=${mapsQuery}`}>{direccion}</a>
              </div>
            )
          }

        </CardText>
      </Card>
    )
  }
}

export default AcopioCard
