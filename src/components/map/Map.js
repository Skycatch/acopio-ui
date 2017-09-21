import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, Mark } from "react-mapbox-gl";
import Config from '../../config/Config';
import Locator from './Locator';

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

  getLatLng(centers) {
    const transformed = [];
    return Promise.all(centers.map((center) => {
      console.log('Converting', { center });
      Locator.locate(center.direccionCentroDeAcopio, (err, result) => {
        if (err) {
          console.error('ERROR PARSING ADDRESS:', center.direccionCentroDeAcopio);
          return center;
        }
        console.log('Geoloc result:', result, result.lat, result.lng);
        transformed.push(Object.assign(center, {
          center: [result.lng, result.lat],
          lat: result.lat,
          lng: result.lng
        }));
      });
    }))
    .then(() => {
      return transformed;
    });
  }

  render() {
    return (
      <Map
      style="mapbox://styles/mapbox/streets-v10"
      center={Config.mapbox.style.center}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>

        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>

          {this.state.data.map((center) =>

            <Marker
              coordinates={center.center}>
            </Marker>
          )}


        </Layer>

      </Map>
    );
  }
}

export default Mapbox;
