import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Config from '../../config/Config';

const Map = ReactMapboxGl({
  accessToken: Config.mapbox.token
});

class Mapbox extends Component {
  render() {
    return (
      <Map
      style="mapbox://styles/mapbox/streets-v10"
      center={Config.mapbox.style.center}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
      </Map>
    );
  }
}

export default Mapbox;
