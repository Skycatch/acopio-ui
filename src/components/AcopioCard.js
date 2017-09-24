import React, { Component } from 'react'
import getDistance from '../utils/getDistance'
import withCurrentPosition from '../components/withCurrentPosition'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class AcopioCard extends Component {
  mostRecentProductDate (products) {
    let bestDate = products.reduce((mostRecent, product) => {
      let productDate = new Date(product.fechaDeActualizacion).valueOf()
      return productDate > mostRecent ? productDate : mostRecent
    }, 0)
    return new Date(bestDate).toLocaleString()
  }

  render () {
    const {
      acopio,
      currentPosition,
      displayProducts
    } = this.props

    const {
      nombre,
      productos,
      direccion,
      geopos
    } = acopio

    const kms = getDistance(currentPosition, acopio.geopos)
    const hasProducts = productos.length !== 0

    let mapsQuery
    if (geopos && geopos.hasOwnProperty('lat') && geopos.hasOwnProperty('lng')) {
      mapsQuery = `${geopos.lat},${geopos.lng}`
    } else mapsQuery = direccion

    return (
      <Card style={{marginBottom: '0.5rem'}}>
        <CardHeader
          title={nombre}
          subtitle={kms != null && `a ${kms} kms.`}
          children={displayProducts && <p style={{ fontSize: '14px' }}>Última actualización: {this.mostRecentProductDate(productos)}</p>}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {
            displayProducts ? (
              <div>
                <p style={{ fontWeight: 'bold' }}>
                  {hasProducts ? 'Necesidades:' : 'No sabemos qué necesitan.'}
                </p>
                { hasProducts &&
                  <ul>
                    {productos.sort((a, b) => a.nombre.localeCompare(b.nombre)).map(product => (
                      <li
                        key={`product-${product.id}`}
                        data-date={product.fechaDeActualizacion}
                      >
                        {product.nombre}
                      </li>
                    ))}
                  </ul>
                }
              </div>
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

export default withCurrentPosition(AcopioCard)
