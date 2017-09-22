import React, { Component } from 'react';
import api from './api';
import Map from './components/map/Map';
import Drawer from 'rc-drawer';

import './InfoPanel.css';
import 'rc-drawer/assets/index.css';
import './App.css';

class App extends Component {

  constructor () {

    super();
    this.state = {
      collectionCenters: [],
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

    api.getAcopios()
    .then((result) => {

      this.setState({
        activeCenter: null,
        collectionCenters: result.data
      });
    });
  }

  selectCenter (center) {
    this.setState({
      activeCenter: center
    });
  }

  closeDrawer () {
    console.log('closeDrawer');
    this.setState({
      activeCenter: null
    });
  }

  render () {

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
        <div className="pad"></div>
        <h3>{collectionCenterData.nombre}</h3>
        <address>
          Direccion: {collectionCenterData.direccion}
        </address>
        <div className="close" onClick={this.closeDrawer.bind(this)}><span>Close</span></div>
        <div className="pad"></div>
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
            <h1 className="title">Sismo MX</h1>
            <h1 className="sub-title">Información de centros de acopio</h1>
            <img src={process.env.PUBLIC_URL + 'CMX_SISMO_ICON_04-01.png'} alt="CMX"/>
          </div>
          <Map collectionCenters={ this.state.collectionCenters } onSelect={ this.selectCenter.bind(this) } ></Map>
        </Drawer>
      </div>
    );
  }
}

export default App;
