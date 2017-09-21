import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, Popup } from "react-mapbox-gl";
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
  }

  componentWillReceiveProps (nextProps, nextState) {

    const component = this;

    component.setState({ collectionCenters: nextProps.collectionCenters });
  }

  markerClick (collectionCenter) {

    this.setState({
      center: [collectionCenter.lng, collectionCenter.lat],
      zoom: [14],
      collectionCenterData: collectionCenter
    });
  }

  onDrag () {

    if (this.state.collectionCenterData) {
      // this.setState({ collectionCenterData: undefined });
    }
  }


  render() {

    const { collectionCenterData } = this.state;
    const component = this;
    const config = component.state.config;

    let features = this.state.collectionCenters.map((center,index) =>(
       <Feature
        key={center.id}
        coordinates={[center.longitud, center.latitud]}
        onClick={component.markerClick.bind(component, center)} />
    ));

    console.log('features', features);

    return (
      <Map
      style="mapbox://styles/mapbox/streets-v10"
      center={config.style.center}
      onDrag={component.onDrag.bind(component)}
      containerStyle={{
        height: "88vh",
        width: "100vw"
      }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{"icon-image": "marker-15", "icon-size": 3}}
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
                        [collectionCenterData.ResponsableDeCentro].map(responsable =>(
                          <ul>
                            <li>Nombre: {responsable.nombreResponsable}</li>
                            <li>Telefono: {responsable.telefonoResponsable}</li>
                            <li>Twitter: {responsable.twitterResponsable}</li>
                            <li>Facebook: {responsable.facebookResponsable}</li>
                            <li>Email: {responsable.emailResponsable}</li>
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
