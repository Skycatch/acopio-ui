import React, { Component } from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import spanish from 'date-fns/locale/es'

import getDistance from '../utils/getDistance'
import withCurrentPosition from '../components/withCurrentPosition'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const mostRecentProductDate = products => {
  const bestDate = products.reduce((mostRecent, product) => {
    let productDate = new Date(product.fechaDeActualizacion).valueOf()
    return productDate > mostRecent ? productDate : mostRecent
  }, 0)
  if (bestDate === 0) {
    return null
  }
  return new Date(bestDate)
}

class AcopioCard extends Component {
  render () {
    const {
      acopio,
      currentPosition,
      skipProducts
    } = this.props

    const {
      nombre,
      productos,
      direccion,
      geopos
    } = acopio

    const kms = getDistance(currentPosition, acopio.geopos)
    const updatedAt = mostRecentProductDate(productos)
    const hasProducts = productos.length !== 0

    let mapsQuery
    if (geopos && geopos.hasOwnProperty('lat') && geopos.hasOwnProperty('lng')) {
      mapsQuery = `${geopos.lat},${geopos.lng}`
    } else {
      mapsQuery = direccion
    }
    const mapsUrl = `https://maps.google.com/?q=${mapsQuery}`

    return (
      <Card style={{marginBottom: '0.5rem'}}>
        <CardHeader
          title={nombre}
          subtitle={kms != null && `a ${kms} kms.`}
          children={updatedAt && (
            <p style={{ fontSize: '12px' }}>
              Última actualización: {distanceInWordsToNow(updatedAt, { locale: spanish })}
            </p>
          )}
          actAsExpander
          showExpandableButton
        />
        <CardActions expandable>
          <FlatButton label="Ver en Google Maps" href={mapsUrl} target="_blank" />
        </CardActions>
        <CardText expandable>
          {
            !skipProducts ? (
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
                <strong>Dirección:</strong> {direccion}
              </div>
            )
          }
        </CardText>
      </Card>
    )
  }
}

export default withCurrentPosition(AcopioCard)
