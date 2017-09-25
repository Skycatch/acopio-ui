import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Marker, ZoomControl } from 'react-mapbox-gl'

import withCurrentPosition from '../withCurrentPosition'

let Map

class Mapbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      config: {
        token: 'pk.eyJ1IjoicmhhbWxleSIsImEiOiJjajd0cjZvN3MzbzlpMnFycnBtM3dmbWFyIn0.Toml4RrSL38x7vVqkm3JeQ',
        style: {
          'attributionControl': false,
          'center': [-99.133209, 19.4326],
          'keyboard': false,
          'height': '88vh',
          'layers': [],
          'maxZoom': 20,
          'minZoom': 12,
          'sources': {},
          'style': 'mapbox://styles/mapbox/streets-v10',
          'version': 8,
          'width': '100vw',
          'zoom': [11]
        }
      },
      collectionCenters: [],
      currentMarker: undefined,
    }
  }

  componentWillMount () {
    Map = ReactMapboxGl({
      accessToken: this.state.config.token,
      attributionControl: this.state.config.style.attributionControl
    })
  }

  componentWillReceiveProps (nextProps) {
    const { currentPosition } = this.props
    if (currentPosition) {
      this.centerOnLocation(currentPosition, 13)
      const currentMarker = <Marker
        key={1}
        coordinates={[currentPosition.lng, currentPosition.lat]}
        style={ { color: '#2196F3' }}
      />
      this.setState(() => ({ currentMarker }))
    }
    
    this.setState({ collectionCenters: nextProps.collectionCenters })
  }

  markerClick (collectionCenter) {
    // component.props.onSelect(collectionCenter)

    const markerLocation = [collectionCenter.geopos.lng, collectionCenter.geopos.lat]
    this.centerOnLocation(markerLocation)
  }

  centerOnUserLocation (zoom) {
    // Centers the map on the user location.
    // The user location is obtained using the navigator.geolocation api.
    // Params:
    //   zoom: Array of Number.

    navigator.geolocation.getCurrentPosition(position => {
      this.centerOnLocation([position.coords.longitude, position.coords.latitude], zoom)
    })
  }

  centerOnLocation (position, zoom) {
    // Centers the map at the specified position, optionally set zoom too.
    // Params:
    //   position: Array. [longitude, latitude]
    //   zoom: Array of Number. Default [11], will never go above max zoom.

    const config = this.state.config
    const newConfig = Object.assign({}, config)
    newConfig.style.center = position
    newConfig.style.zoom = (zoom === undefined) && zoom !== config.style.zoom[0]
      ? [11] : [Math.floor(zoom, config.style.maxZoom)]
    this.setState({
      config: newConfig
    })
  }

  render () {
    const component = this
    const style = component.state.config.style
    const centersWithPosition = this.state.collectionCenters.filter(center => center.geopos)
    let markers = centersWithPosition.map((center) => (
      <Marker
        key={center.id}
        coordinates={[center.geopos.lng, center.geopos.lat]}
        onClick={component.markerClick.bind(component, center)}
        style={ { color: '#2196F3' }}
      />
    ))

    return (
      <Map
        style={style.style}
        center={style.center}
        zoom={style.zoom}
        containerStyle={{
          height: style.height,
          width: style.width
        }}>
        <Layer
          id="center"
          type="symbol"
          layout={{
            'icon-image': 'pharmacy-11',
            'icon-size': 2
          }}>
          {markers}
        </Layer>
        <Layer
          id="current"
          type="symbol"
          layout={{
            'icon-image': 'star-11',
            'icon-size': 2
          }}>
          {this.state.currentMarker}
        </Layer>
        <ZoomControl />
      </Map>
    )
  }
}

export default withCurrentPosition(Mapbox)
