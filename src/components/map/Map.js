import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Marker, ZoomControl } from "react-mapbox-gl";

let Map;

class Mapbox extends Component {

  constructor(props) {

    super(props);
    this.state = {
      data: [],
      config: {
        token: 'pk.eyJ1IjoicmhhbWxleSIsImEiOiJjajd0cjZvN3MzbzlpMnFycnBtM3dmbWFyIn0.Toml4RrSL38x7vVqkm3JeQ',
        style: {
          "attributionControl": false,
          "center": [-99.133209, 19.4326],
          "keyboard": false,
          "height": "88vh",
          "layers": [],
          "maxZoom": 24,
          "minZoom": 12,
          "sources": {},
          "style": "mapbox://styles/mapbox/streets-v10",
          "version": 8,
          "width": "100vw",
          "zoom": 16
        }
      },
      collectionCenters: []
    };
  }

  componentWillMount() {

    Map = ReactMapboxGl({
      accessToken: this.state.config.token,
      attributionControl: this.state.config.style.attributionControl
    });
  }

  componentWillReceiveProps(nextProps) {

    const component = this;

    component.setState({ collectionCenters: nextProps.collectionCenters });
  }

  markerClick(collectionCenter) {

    const component = this;

    component.props.onSelect(collectionCenter);
  }

  render() {

    const component = this;
    const style = component.state.config.style;

    let markers = this.state.collectionCenters.map((center,index) =>(
      <Marker
        key={center.id}
        coordinates={[center.longitud, center.latitud]}
        onClick={component.markerClick.bind(component, center)}>
      </Marker>
    ));

    return (
      <Map
      style={style.style}
      center={style.center}
      containerStyle={{
        height: style.height,
        width: style.width
      }}>
        <Layer
          id="marker"
          type="symbol"
          layout={{
            "icon-image": "marker-15",
            "icon-size": 3
          }}>
          {markers}
        </Layer>
        <ZoomControl />
      </Map>
    );
  }
}

export default Mapbox;
