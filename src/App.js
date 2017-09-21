import React, { Component } from 'react';
import api from './api';
import './App.css';
import Map from './components/map/Map';
import Drawer from 'rc-drawer';

import './components/infoPanel/InfoPanel.css';
import 'rc-drawer/assets/index.css';

class App extends Component {

  constructor () {

    super();
    this.state = {
      // this.testApi(); // This should be uncommented only in local testing!!!!!
      gatheringCenters: [],

      docked: true,
      open: true,
      transitions: true,
      touch: true,
      enableDragHandle: true,
      position: 'bottom',
      dragToggleDistance: 30,
    };
  }

  onOpenChange (open) {
    console.log('onOpenChange', open);
    this.setState({ open });
  }

  onDock () {
    const docked = !this.state.docked;
    this.setState({
      docked,
    });
    if (!docked) {
      this.onOpenChange(false);
    }
  }

  componentDidMount () {

    // Use this block with dummy testing -----
    return fetch(`http://localhost:3000/acopios.json`)
    .then((result) => {
      console.log('======> ACOPIOS FETCH RESULT::', result);
      return result.json();
    })
    // ----------
    // api.getAcopios()
    // .then((result) => {
    //   console.log('===> result', result);
    //   return result.data;
    // })
    .then((centers) => {
      console.log('CENTERS ARE::', centers);
      this.setState({
        gatheringCenters: centers,
        activeCenter: null
      });
    });
  }

  selectCenter (center) {
    this.setState({
      activeCenter: center
    });
  }

  render() {

    let sidebar;
    if (!this.state.activeCenter) {
      sidebar = (<div>
        <h3>
          {/*
            <button onClick={ this.onDock.bind(this) }>
              {this.state.docked ? 'unpin' : 'pin'}
            </button>
          */}
          Selecciona un centro de apoyo en el mapa

          {/* Later on there will be search option here */}
        </h3>
      </div>);
    }
    else {
      const collectionCenterData = this.state.activeCenter;
      sidebar = (<div>
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
      </div>);
    }

    const drawerProps = {
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      enableDragHandle: this.state.enableDragHandle,
      position: this.state.position,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onOpenChange: this.onOpenChange.bind(this),
    };

    return (
      <div className="App drawer-container">

        <Drawer sidebar={sidebar} {...drawerProps} style={{ overflow: 'auto' }}>
          <div className="App-header">
            <h1 className="title left">Sismo MX</h1>
            <h1 className="sub-title">Información de centros de acopio</h1>
          </div>
          <Map collectionCenters={ this.state.gatheringCenters } onSelect={ this.selectCenter.bind(this) } ></Map>
        </Drawer>
      </div>
    );
  }

  testApi() {
    try {
      api.getAcopios();

      api.getProductos('1');

      api.postAcopio({});
      api.postProducto({});

      api.postResponsable({});

      api.updateAcopio('1', {});
      api.updateProducto('1', {});
      api.updateResponsable('1', {});

      api.deleteAcopio('1');
      api.deleteProducto('1');
      api.deleteResponsable('1');
    } catch (error) {
      console.log(error);
    }
  }

}

export default App;
