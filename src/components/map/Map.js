import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import Config from '../../config/Config';
import styled from 'styled-components';

const Map = ReactMapboxGl({
  accessToken: Config.mapbox.token
});

const StyledPopup = styled.div `
  background: white;
  color: #3F618C;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;





class Mapbox extends Component {
  
  markerClick = (collectionCenter) => {
    this.setState({
      center: [collectionCenter.longitud, collectionCenter.latitud],
      zoom: [14],
      collectionCenterData:collectionCenter
    });
  }

   onDrag() {
    if (this.state.collectionCenterData) {
      this.setState({ collectionCenterData: undefined });
    }
  }

 
  componentWillMount(){
     this.setState({'pointDescription':undefined})
  }
  render() {
    const {collectionCenterData} = this.state
    let features =this.props.collectionCenters.map((center,index) =>(
               <Feature
                key={index}
                coordinates={[center.longitud, center.latitud]} 
                onClick={this.markerClick.bind(this,center)}
                
              />
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
                coordinates={[collectionCenterData.longitud, collectionCenterData.latitud]}
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
