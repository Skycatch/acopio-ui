import React, { Component } from 'react';
import api from './api';
import Map from './components/map/Map';
import Drawer from 'rc-drawer';
import DebounceInput from 'react-debounce-input';
import find from 'lodash.find';

import 'rc-drawer/assets/index.css';
import './InfoPanel.css';
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
        collectionCenters: result.data,
        totalCollectionCenters: result.data
      });
    });
  }

  goToCenter (centerId) {

    const center = find(this.state.totalCollectionCenters, { id: centerId });
    this.selectCenter(center);
  }

  selectCenter (center) {

    const component = this;

    return api.getProductosByAcopioId(center.id)
    .then((products) => {

      center.products = products.data;
      component.setState({
        activeCenter: center
      });
    })
  }

  openSearch () {

    this.setState({
      activeCenter: null,
      search: true
    });
  }

  searchProduct (value) {

    const component = this;
    api.getProductosByPartialName(value)
    .then(function(result) {
      const products = result.data;
      console.log('Products found:', products.length);
      products.forEach((prod) => {
        const center = find(component.state.totalCollectionCenters, { id: prod.acopioId });
        if (center) {
          prod.centerName = center.nombre;
        }
      });
      const centerIds = products.map((prod) => {
        return prod.acopioId;
      });
      component.setState({
        collectionCenters: component.state.collectionCenters.filter((center) => {
          return centerIds.indexOf(center.id) !== -1;
        }),
        productsNeeded: products
      });
    });
  }

  returnToSearch () {
    this.setState({
      activeCenter: null
    });
  }

  closeDrawer () {
    console.log('closeDrawer');
    this.setState({
      activeCenter: null
    });
  }

  render () {

    let drawer;
    let products;

    if (this.state.activeCenter) {
      const collectionCenterData = this.state.activeCenter;

      products = collectionCenterData.products && collectionCenterData.products.map((prod) => {
        return <div>
          { prod.nombre }
        </div>
      });
      drawer = (<div>
        <div className="pad"></div>
        { this.state.productsNeeded && <div className="returnToSearch" onClick={this.returnToSearch.bind(this)}>
            Regresar a resultados
          </div>
        }
        <h3>{collectionCenterData.nombre}</h3>
        <address>
          Direccion: {collectionCenterData.direccion}
        </address>

        {products}
        <div className="close" onClick={this.closeDrawer.bind(this)}><span>Close</span></div>
        <div className="pad"></div>
      </div>);
    }
    else if (this.state.search) {
      console.log('Rendering search');
      const prods = (this.state.productsNeeded || []).map((prod) => {
        return <div className="prodNeeded" onClick={this.goToCenter.bind(this, prod.acopioId)}>
          <span className="prodName">{ prod.nombre }</span>
          <span className="prodCenterName">{ prod.centerName }</span>
        </div>
      });
      drawer = <div>
        <div className="searchBox">
          Buscar centros que necesiten:
          <DebounceInput
          minLength={2}
          debounceTimeout={500}
          onChange={ event => this.searchProduct(event.target.value)} />
        </div>
        <div className="result-list">
          { prods }
        </div>
      </div>
    }
    else {
      drawer = (<div>
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

        <Drawer sidebar={drawer} {...drawerProps} style={{ overflow: 'auto' }}>
          <div className="App-header">
            <div className="logo">
              <img src={process.env.PUBLIC_URL + 'CMX_SISMO_ICON_04-01.png'} alt="CMX"/>
              <h1 className="title">Sismo MX</h1>
              <h2 className="smalltitle">| Centros de acopio</h2>
            </div>
            <h1 className="sub-title">Información de centros de acopio</h1>
            <nav className="navigation">
              <button onClick={ this.centerMapOnUserLocation.bind(this) }>Cerca de mí</button>
            </nav>

          </div>
          <div className="map-container">
            <button className="cta" onClick={ this.openSearch.bind(this) }>Quiero Ayudar</button>
            <Map collectionCenters={ this.state.collectionCenters } onSelect={ this.selectCenter.bind(this) } ref={ map => this.map = map }></Map>
          </div>
        </Drawer>
      </div>
    );
  }

  centerMapOnUserLocation() {
    this.map.centerMapOnUserLocation();
  }
}

export default App;
