import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl';

let Map;

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        token: 'pk.eyJ1IjoicmhhbWxleSIsImEiOiJjajd0cjZvN3MzbzlpMnFycnBtM3dmbWFyIn0.Toml4RrSL38x7vVqkm3JeQ',
        style: {
          "attributionControl": false,
          "center": [-99.133209, 19.4326],
          "keyboard": false,
          "layers": [],
          "maxZoom": 24,
          "minZoom": 12,
          "sources": {},
          "style": "mapbox://styles/mapbox/streets-v10",
          "version": 8,
          "zoom": 16
        }
      }
    };
  }

  componentWillMount() {
    Map = ReactMapboxGl({
      accessToken: this.state.config.token
    });
  }

  render() {
    const config = this.state.config;

    return (
      <Map
      style={config.style.style}
      center={config.style.center}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <ZoomControl/>
      </Map>
    );
  }
}

export default Mapbox;
