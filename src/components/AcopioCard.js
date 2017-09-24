import React, { Component } from 'react'
import getDistance from '../utils/getDistance'
import withCurrentPosition from '../components/withCurrentPosition'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

class AcopioCard extends Component {
  mostRecetProductDate(products) {
    let bestDate =  products.reduce((mostRecent, product) => {
      let productDate = new Date(product.fechaDeActualizacion).valueOf()
      return productDate > mostRecent ? productDate : mostRecent
    },0)
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
      products,
      direccion,
      geopos
    } = acopio

    const kms = getDistance(currentPosition, acopio.geopos)
    const hasProducts = products.length !== 0

    let mapsQuery, mapsUrl
    if (geopos && geopos.hasOwnProperty('lat') && geopos.hasOwnProperty('lng')) {
      mapsQuery = `${geopos.lat},${geopos.lng}`
    } else {
      mapsQuery = direccion
    }
    mapsUrl = `https://maps.google.com/?q=${mapsQuery}`

    return (
      <Card style={{marginBottom: '0.5rem'}}>
        <CardHeader
          title={nombre}
          subtitle={kms != null && `a ${kms} kms.`}
          children={displayProducts ? <p style={{ fontSize: '14px' }}>Última actualización: {this.mostRecetProductDate(products)}</p> : ''}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          {
            displayProducts ? (
              <div>
                <p style={{ fontWeight: 'bold' }}>
                  {hasProducts ? 'Productos necesitados:' : 'No sabemos qué productos necesitan.'}
                </p>
                { hasProducts &&
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
                }
              </div>
            ) : (
              <div>
                <strong>Dirección:</strong> {direccion}
              </div>
            )
          }
        </CardText>
        <CardActions expandable>
          <FlatButton label="Ver en Google Maps" href={mapsUrl} target="_blank" />
        </CardActions>
      </Card>
    )
  }
}

export default withCurrentPosition(AcopioCard)
