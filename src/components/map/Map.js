import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, Popup } from "react-mapbox-gl";
import Config from '../../config/Config';
import Locator from './Locator';
import styled from 'styled-components';

let Map;

const StyledPopup = styled.div `
  background: white;
  color: #3F618C;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;


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
      },
      collectionCenters: []
    };
  }

  componentWillMount () {
    Map = ReactMapboxGl({
      accessToken: this.state.config.token,
      attributionControl: this.state.config.style.attributionControl
    });
    // this.setState({ 'pointDescription': undefined });
  }

  componentWillReceiveProps (nextProps, nextState) {

    const component = this;
    return this.getLatLng(nextProps.collectionCenters).then((data) => {
      // nextProps.collectionCenters = data;
      component.setState({ collectionCenters: data });
      console.log('DummyData', component.state);
    });
  }

  componentDidMount() {

    const component = this;
    return this.getLatLng(this.props.collectionCenters).then((data) => {
      component.setState({ collectionCenters: data });
      console.log('DummyData', component.state);
    });
  }

  getLatLng (centers) {
    const transformed = [];
    return Promise.all(centers.map((center) => {
      console.log('Converting', { center });
      return Locator.locate(center.direccionCentroDeAcopio, (err, result) => {
        if (err) {
          console.error('ERROR PARSING ADDRESS:', center.direccionCentroDeAcopio);
          return center;
        }
        console.log('Geoloc result:', result, result.lat, result.lng);
        return transformed.push(Object.assign(center, {
          center: [result.lng, result.lat],
          lat: result.lat,
          lng: result.lng
        }));
      });
    }))
    .then(() => {
      console.log('TRANSFORMED::::', transformed);
      return transformed;
    });
  }

  markerClick (collectionCenter) {
    this.setState({
      center: [collectionCenter.longitud, collectionCenter.latitud],
      zoom: [14],
      collectionCenterData:collectionCenter
    });
  }

  onDrag () {
    if (this.state.collectionCenterData) {
      // this.setState({ collectionCenterData: undefined });
    }
  }


  render() {
    const { collectionCenterData } = this.state;
    console.log('RENDEGIN!!!!', this.state.collectionCenters);
    let features =this.state.collectionCenters.map((center,index) =>(
       <Feature
        key={index}
        coordinates={[center.lng, center.lat]}
        onClick={this.markerClick.bind(this,center)} />
    ));
    return (
      <Map
      style="mapbox://styles/mapbox/streets-v10"
      center={Config.mapbox.style.center}
      onDrag={this.onDrag.bind(this)}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <Layer
          type="circle"
          layout={
            {
              "visibility":'visible'

           }
          }
          paint = {
             {
               'circle-radius': 8,
               'circle-color': 'rgba(55,148,179,1)'
             }
           }

          >
          {features}
        </Layer>
          {
            collectionCenterData && (
              <Popup
                key={collectionCenterData}
                offset={[0, -50]}
                coordinates={[collectionCenterData.lng, collectionCenterData.lat]}
              >
                <StyledPopup>
                <h3> Centro de Acopio</h3>
                  <div>
                    Nombre: {collectionCenterData.nombre}
                  </div>
                  <div>
                    Direccion: {collectionCenterData.direccion}
                  </div>
                  <div>
                    Estatus: {collectionCenterData.status}
                  </div>
                  <div>
                    Responsables:

                      {
                        collectionCenterData.responsables.map(responsable =>(
                          <ul>
                            <li>Nombre: {responsable.nombre}</li>
                            <li>Telefono: {responsable.telefono}</li>
                            <li>Twitter: {responsable.twitter}</li>
                            <li>Facebook: {responsable.facebook}</li>
                            <li>Email: {responsable.email}</li>
                          </ul>
                        ))
                      }

                  </div>
                </StyledPopup>
              </Popup>
            )
          }
      </Map>
    );
  }
}

export default Mapbox;
