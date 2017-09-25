import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

import api from '../api'
import Map from '../components/Map'
import './InfoPanel.css'
import './Map.css'

class MapScreen extends Component {
  constructor () {
    super()
    this.state = {
      collectionCenters: [],
    }
  }

  componentDidMount () {
    api.getAcopios()
      .then((result) => {
        this.setState({
          collectionCenters: result.data
        })
      })
  }

  selectCenter = (center) => {
    console.log({ center })
  }

  render () {
    const { currentPosition } = this.props
    return (
      <DocumentTitle title={'Mapa'}>
        <div className="map-container">
          <Map
            collectionCenters={this.state.collectionCenters}
            onSelect={this.selectCenter}
          />
        </div>
      </DocumentTitle>
    )
  }

  centerMapOnUserLocation () {
    this.map.centerOnUserLocation()
  }
}

export default MapScreen
