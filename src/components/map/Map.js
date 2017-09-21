import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from 'react-mapbox-gl';
import DummyData from './../../data/data.json';
import Where from 'node-where';

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
      accessToken: this.state.config.token,
      attributionControl: this.state.config.style.attributionControl
    });
  }

  componentDidMount() {
    this.getLatLng(DummyData).then((data) => {
      this.setState({data});
      console.log('DummyData', this.state);
    });
  }

  getLatLng(centers) {
    const transformed = [];
    return Promise.all(centers.map((center) => {
      console.log('Converting', { center });
      Where.is(center.direccionCentroDeAcopio, (err, result) => {
        if (err) {
          console.error('ERROR PARSING ADDRESS:', center.direccionCentroDeAcopio);
          return center;
        }
        console.log('Geoloc result:', result, result.get('lat'), result.get('lng'));
        transformed.push(Object.assign(center, {
          lat: result.get('lat'),
          lng: result.get('lng')
        }));
      });
    }))
    .then(() => {
      return transformed;
    });
  }

  render() {
    const config = this.state.config;
    console.log('this.state', this.state);
    return (
      <Map
      style={config.style.style}
      center={config.style.center}
      containerStyle={{
        height: "88vh",
        width: "100vw"
      }}>
        {this.state.data.map((center) =>
          <div>{center.lng}
          <Marker
            coordinates={[center.lng, center.lat]}>
          </Marker>
          </div>
        )}
        <ZoomControl/>
      </Map>
    );
  }
}

export default Mapbox;
